# Enable services
resource "google_project_service" "required_apis" {
  for_each = toset([
    "compute.googleapis.com",
    "container.googleapis.com",
    "storage.googleapis.com"
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
    max_node_count = 2
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

# BUilder pool pour les builds
resource "google_container_node_pool" "builder_pool" {
  name       = "builder-pool"
  location   = var.region
  cluster    = google_container_cluster.blagenda_cluster.name
  node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 2
  }

  node_locations = [
    "${var.region}-c"
  ]

  node_config {
    machine_type = "e2-standard-2"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
    tags = ["blagenda-builder"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}

# Bucket de stockage
resource "google_storage_bucket" "blagenda_bucket" {
  name                        = "blagenda-bucket-${var.project_id}"
  location                    = var.region
  force_destroy               = true
  uniform_bucket_level_access = true
}
