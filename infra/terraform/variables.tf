variable "project_id" {
  type = string
  sensitive = true
}

variable "region" {
  type    = string
  default = "europe-west9" # Région Paris
}

variable "gke_node_public_ip" {
  type = string
  description = "Public IP address of the GKE node"
}

variable "gke_node_private_ip" {
  type = string
  description = "Private IP address of the GKE node"
}

variable "db_password" {
  type = string
  description = "Password for the database"
}

variable "db_user" {
  type = string
  description = "Username for the database"
}
