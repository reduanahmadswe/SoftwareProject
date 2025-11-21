// Debug script to check frontend API calls
// Open browser console and run this after a registration attempt

console.log("🔍 Debugging Frontend API Configuration...");

// Check environment variables
console.log("Environment Check:");
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("Mode:", import.meta.env.MODE);
console.log("DEV:", import.meta.env.DEV);
console.log("PROD:", import.meta.env.PROD);

// Check API URL resolution
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://git-github-workshop-backend.vercel.app";
console.log("Resolved API_URL:", API_URL);

// Test API connectivity
fetch(API_URL + "/api/admin/env-check")
  .then((response) => response.json())
  .then((data) => {
    console.log("✅ Backend connectivity test:", data);
  })
  .catch((error) => {
    console.error("❌ Backend connectivity error:", error);
  });

// Monitor network requests
const originalFetch = window.fetch;
window.fetch = function (...args) {
  console.log("🌐 Network Request:", args[0]);
  return originalFetch
    .apply(this, args)
    .then((response) => {
      console.log("📥 Response:", response.status, response.statusText);
      return response;
    })
    .catch((error) => {
      console.error("❌ Request failed:", error);
      throw error;
    });
};

console.log("✅ Debug monitoring enabled. Try submitting the form now.");
