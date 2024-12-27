"use client"
import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "¡Hola! ¿En qué puedo ayudarte hoy?" },
    ]);
    const [showFaqs, setShowFaqs] = useState(false);

    const faqs = [
        { question: "¿Cuáles son los horarios de entrenamiento?", answer: "Nuestros horarios son de 6:00 AM a 10:00 PM todos los días." },
        { question: "¿Qué suplementos recomiendan para ganar masa muscular?", answer: "Recomendamos proteínas en polvo, creatina y BCAA según tus objetivos." },
        { question: "¿Tienen envíos de ropa deportiva?", answer: "Sí, realizamos envíos a todo el país." },
        { question: "¿Cómo puedo inscribirme en un plan de entrenamiento?", answer: "Puedes inscribirte a través de nuestra página web o en la recepción del gimnasio." },
    ];

    const handleSelectQuestion = (question: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: question },
        ]);

        const faq = faqs.find((faq) => faq.question === question);
        if (faq) {
            setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: faq.answer }]);
            }, 1000);
        }
        setShowFaqs(false);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="bg-white shadow-lg rounded-lg w-80 h-[32rem] flex flex-col overflow-hidden">
                    <div className="bg-yellow-600 text-white p-4 font-bold flex justify-between items-center">
                        <span>Asistente Virtual</span>
                        <button onClick={() => setIsOpen(false)} className="text-xl">×</button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"
                                    }`}
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
                        <button
                            onClick={() => setShowFaqs(!showFaqs)}
                            className="w-full text-left px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-600 hover:text-white"
                        >
                            {showFaqs ? "Ocultar preguntas frecuentes" : "Mostrar preguntas frecuentes"}
                        </button>

                        {showFaqs && (
                            <ul className="mt-2 space-y-2">
                                {faqs.map((faq, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handleSelectQuestion(faq.question)}
                                            className="w-full text-left px-4 py-2 bg-yellow-300 text-black rounded-lg hover:bg-yellow-500 hover:text-white"
                                        >
                                            {faq.question}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
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
