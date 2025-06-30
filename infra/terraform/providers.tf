terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 3.5"
    }
  }
  required_version = ">= 0.12"
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = "${var.region}-c"
  credentials = file("blagenda.json")
}
