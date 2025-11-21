// Check environment variables on Vercel backend
const checkEnvVars = async () => {
  const API_URL = "https://git-github-workshop-backend.vercel.app";

  try {
    console.log("Checking environment variables...");

    // Check if email config endpoint exists
    const response = await fetch(`${API_URL}/api/admin/env-check`, {
      method: "GET",
    });

    if (response.status === 404) {
      console.log("❗ Environment check endpoint not found. Creating one...");
      return;
    }

    const result = await response.json();
    console.log("Environment check result:", result);
  } catch (error) {
    console.error("Error checking environment:", error);
  }
};

// Run the check
checkEnvVars();
