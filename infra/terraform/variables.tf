variable "project_id" {
  type = string
  sensitive = true
}

variable "region" {
  type    = string
  default = "europe-west9" # Région Paris
}
