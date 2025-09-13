export const base_api_url = import.meta.env.VITE_IA_BASE_URL || "https://lomi-ai.onrender.com/api/v1"
export const base_auth_url = import.meta.env.VITE_AUTH_BASE_URL || "https://lomi-beta-backend.onrender.com"

// Wompi Payment Gateway Configuration
export const WOMPI_CONFIG = {
  public_key: import.meta.env.VITE_WOMPI_PUBLIC_KEY || "",
  sandbox_url: "https://checkout.wompi.co/p/",
  production_url: "https://checkout.wompi.co/p/",
  is_sandbox: import.meta.env.VITE_WOMPI_SANDBOX === "true" || true,
  currency: "COP",
  default_amount: import.meta.env.VITE_WOMPI_DEFAULT_AMOUNT || "50000" // Default amount in cents (500 COP)
}