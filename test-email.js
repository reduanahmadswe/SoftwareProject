// Test Email Functionality
const testRegistration = async () => {
  const API_URL = "https://git-github-workshop-backend.vercel.app";

  const testData = {
    name: "Test User 2",
    universityId: "TEST456",
    semester: "Fall 2024",
    batch: "2021",
    email: "test@example.com", // Change this to your email
    whatsapp: "+8801234567890",
    github: "testuser456",
  };

  try {
    console.log("Testing registration with email...");

    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ Registration successful!");
      console.log("Response:", result);
      console.log("📧 Check your email for confirmation!");
    } else {
      console.log("❌ Registration failed:");
      console.log("Error:", result);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

// Run the test
testRegistration();
