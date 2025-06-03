const API_KEY = "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";
// Función para calcular el costo estimado
function calculateCost(promptLength, responseLength, model = "gpt-3.5-turbo") {
  const tokens = promptLength + responseLength;
  const costPerThousandTokens = 0.002; // Costo para gpt-3.5-turbo
  const cost = (tokens / 1000) * costPerThousandTokens;
  return cost.toFixed(6); // Devuelve el costo con 6 decimales
}

// Función para agregar un retraso entre solicitudes
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Función para obtener la respuesta del bot
async function getCompletion(prompt) {
  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Modelo más barato
        messages: [
          {
            role: "system",
            content: "Eres un psicólogo empático y profesional. Proporcionas apoyo emocional y consejos reflexivos de manera comprensiva.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000, // Limitar tokens para ahorrar costos
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Manejar errores específicos
      if (response.status === 429) {
        throw new Error(
          "Too many requests or quota exceeded. Please try again later."
        );
      } else if (response.status === 403) {
        throw new Error("Access forbidden: Check your API key or permissions.");
      } else {
        throw new Error(errorData.error.message || "Unknown error occurred.");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error; // Propagar el error al nivel superior
  }
}

// Seleccionar elementos del DOM
const promptInput = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const chatContainer = document.querySelector("#chat");
const costDisplay = document.querySelector("#cost");

// Recuperar historial de chat desde localStorage
let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

// Renderizar historial al cargar la página
renderChat();

button.addEventListener("click", async () => {
  const userMessage = promptInput.value.trim();
  if (!userMessage) {
    window.alert("Please enter a message");
    return;
  }

  // Añadir el mensaje del usuario al chat
  chatHistory.push({ role: "user", message: userMessage });
  updateChatHistory();

  try {
    // Agregar un retraso para evitar límites de tasa
    await delay(1000); // Esperar 1 segundo antes de enviar la solicitud

    // Obtener la respuesta del bot
    const response = await getCompletion(userMessage);

    const botMessage =
      response.choices?.[0]?.message?.content.trim() || "No response received.";

    // Calcular y mostrar el costo estimado
    const promptLength = userMessage.split(" ").length;
    const responseLength = botMessage.split(" ").length;
    const estimatedCost = calculateCost(
      promptLength,
      responseLength,
      "gpt-3.5-turbo"
    );
    costDisplay.textContent = `Estimated Cost: $${estimatedCost}`;

    // Añadir el mensaje del bot al chat
    chatHistory.push({ role: "bot", message: botMessage });
    updateChatHistory();
  } catch (error) {
    console.error("Error:", error.message);
    chatHistory.push({
      role: "bot",
      message: `Error: ${error.message}`,
    });
    updateChatHistory();
  }

  // Limpiar el campo de entrada
  promptInput.value = "";
});

// Función para actualizar el historial del chat en la interfaz y guardar en localStorage
function updateChatHistory() {
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  renderChat();
}

// Renderizar el historial del chat
function renderChat() {
  chatContainer.innerHTML = chatHistory
    .map((chat) => {
      if (chat.role === "user") {
        return `<div class="user-message">${chat.message}</div>`;
      } else if (chat.role === "bot") {
        return `<div class="bot-message">${chat.message}</div>`;
      } else {
        return `<div class="error-message">${chat.message}</div>`;
      }
    })
    .join("");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
