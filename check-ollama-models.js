// Simple script to check available Ollama models
async function checkOllamaModels() {
  const OLLAMA_API = "http://localhost:11434/api";

  try {
    console.log("Fetching available Ollama models...");
    const response = await fetch(`${OLLAMA_API}/tags`);

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return;
    }

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    if (data.models && Array.isArray(data.models)) {
      console.log("\nAvailable models:");
      data.models.forEach((model) => {
        console.log(`- ${model.name}`);
      });
    } else {
      console.log("Unexpected response format:", data);
    }
  } catch (error) {
    console.error("Error connecting to Ollama:", error.message);
  }
}

// Run the check
checkOllamaModels();
