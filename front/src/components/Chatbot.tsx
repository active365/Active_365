"use client";

import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";

const Chatbot = () => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const buildPrompt = (userInput: string) => `
Eres un asistente para una app de fitness. Responde de manera breve, clara y profesional. Mantén las respuestas con un máximo de 2 a 3 oraciones.
Contexto:
- Horarios de entrenamiento: 6:00 AM a 10:00 PM todos los días.
- Suplementos recomendados: proteína, creatina y BCAAs según el objetivo.
- Envíos: Ropa deportiva disponible para envío nacional.
- Planes de entrenamiento: Se pueden adquirir en el sitio web o en la recepción del gimnasio.

Pregunta del usuario:
"${userInput}"
`;


const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: userMessage },
    ]);
    setInput("");

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: buildPrompt(userMessage) }],
                max_tokens: 200,
            }),
        });

        const data = await response.json();
        const botReply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that.";

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: botReply },
        ]);
    } catch (error) {
        console.error("Error fetching data from OpenAI API:", error);
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: "Oops! Something went wrong. Please try again later." },
        ]);
    }
};

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg w-80 h-[32rem] flex flex-col overflow-hidden">
          <div className="bg-yellow-600 text-white p-4 font-bold flex justify-between items-center">
            <span>Virtual Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-xl">×</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
              >
                <p
                  className={`px-4 py-2 rounded-lg max-w-[75%] ${message.sender === "bot"
                    ? "bg-yellow-400 text-black"
                    : "bg-yellow-600 text-white"
                    }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-300 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600"
      >
        <AiOutlineRobot size={24} />
      </button>
    </div>
  );
};

export default Chatbot;
