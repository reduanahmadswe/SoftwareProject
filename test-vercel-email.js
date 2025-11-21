// Test registration with Vercel backend
const testRegistration = async () => {
  const API_URL = "https://git-github-workshop-backend.vercel.app";

  const testData = {
    name: "Vercel Test User",
    universityId: "VERCEL123",
    semester: "Fall 2024",
    batch: "2021",
    email: "test@example.com", // Change this to your email to test
    whatsapp: "+8801234567890",
    github: "verceltest123",
  };

  try {
    console.log("Testing registration with Vercel backend...");
    console.log("API URL:", API_URL);

    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    console.log("Response Status:", response.status);
    console.log("Response:", result);

    if (response.ok) {
      console.log("✅ Registration successful!");
      console.log(
        "📧 Email should be sent if environment variables are configured"
      );
    } else {
      console.log("❌ Registration failed:");
      console.log("Error:", result);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
};

// Run the test
testRegistration();
