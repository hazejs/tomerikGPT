const OLLAMA_API = "http://localhost:11434/api";

async function checkModel(modelName: string): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_API}/tags`);
    if (!response.ok) {
      console.error(
        `Failed to fetch models: ${response.status} ${response.statusText}`
      );
      return false;
    }
    const data = await response.json();

    // Check if models property exists and is an array
    if (!data.models || !Array.isArray(data.models)) {
      console.error("Unexpected API response format:", data);
      return false;
    }

    // Model names in Ollama include tags like "llama2:latest"
    // So we need to check if any model starts with our modelName
    const foundModel = data.models.find(
      (model: any) =>
        model.name === modelName || model.name.startsWith(`${modelName}:`)
    );

    if (foundModel) {
      // Use the exact model name from Ollama for future API calls
      return foundModel.name;
    }

    return false;
  } catch (error) {
    console.error("Error checking model:", error);
    return false;
  }
}

export async function chat(messages: { role: string; content: string }[]) {
  try {
    // Define the base model name
    const baseModelName = "llama2";

    // First check if the model exists and get the full model name with tag
    const modelCheck = await checkModel(baseModelName);
    if (!modelCheck) {
      throw new Error(
        `The ${baseModelName} model is not downloaded. Please run:\n\n` +
          `ollama pull ${baseModelName}\n\n` +
          "After downloading completes, try sending a message again."
      );
    }

    // modelCheck now contains the full model name (e.g., "llama2:latest")
    const fullModelName = modelCheck;

    const response = await fetch(`${OLLAMA_API}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: fullModelName,
        prompt: messages[messages.length - 1].content,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Ollama API error: ${errorData.error || response.statusText}`
      );
    }

    const data = await response.json();
    if (!data.response) {
      throw new Error("Unexpected response format from Ollama");
    }

    return {
      role: "assistant",
      content: data.response,
    };
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      throw new Error(
        "Cannot connect to Ollama. Please make sure:\n" +
          "1. Ollama is installed (visit https://ollama.ai)\n" +
          "2. The Ollama service is running\n" +
          "3. Port 11434 is not blocked by another application"
      );
    }
    throw error;
  }
}
