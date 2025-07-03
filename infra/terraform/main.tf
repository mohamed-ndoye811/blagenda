# Enable services
resource "google_project_service" "required_apis" {
  for_each = toset([
    "compute.googleapis.com",
    "container.googleapis.com",
    "storage.googleapis.com",
    "servicenetworking.googleapis.com",
    "sqladmin.googleapis.com",
    "cloudresourcemanager.googleapis.com"
  ])
  project = var.project_id
  service = each.key
}

# VPC privé
resource "google_compute_network" "blagenda_network" {
  name                    = "blagenda-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "blagenda_subnet" {
  name          = "blagenda-subnet"
  ip_cidr_range = "10.0.0.0/16"
  region        = var.region
  network       = google_compute_network.blagenda_network.id
}

# Cluster GKE
resource "google_container_cluster" "blagenda_cluster" {
  name     = "blagenda"
  location = var.region

  network    = google_compute_network.blagenda_network.id
  subnetwork = google_compute_subnetwork.blagenda_subnet.id

  remove_default_node_pool = true
  initial_node_count       = 1

  node_locations = [
    "${var.region}-c"
  ]

  ip_allocation_policy {}

  release_channel {
    channel = "REGULAR"
  }

  # Pour activer le LB natif
  addons_config {
    http_load_balancing {
      disabled = false
    }
  }
}

# Node pool auto scalable
resource "google_container_node_pool" "app_pool" {
  name       = "app-pool"
  location   = var.region
  cluster    = google_container_cluster.blagenda_cluster.name
  node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 3
  }

  node_locations = [
    "${var.region}-c"
  ]

  node_config {
    machine_type = "e2-standard-2"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
    tags = ["blagenda"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}

# Database
resource "google_sql_database_instance" "postgres_instance" {
  name             = "blagenda-database"
  region           = var.region
  database_version = "POSTGRES_17"

  settings {
    tier = "db-perf-optimized-N-2"

    backup_configuration {
      enabled = true
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.blagenda_network.id
    }
  }
}

resource "google_sql_database" "blagenda" {
  name     = "blagenda"
  instance = google_sql_database_instance.postgres_instance.name
}

resource "google_sql_user" "postgres_user" {
  name     = "postgres"
  instance = google_sql_database_instance.postgres_instance.name
  password = var.db_password
}
