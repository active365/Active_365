import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
    const [showFaqs, setShowFaqs] = useState(false);

    const faqs = [
        { question: "What are the training hours?", answer: "Our hours are from 6:00 AM to 10:00 PM every day." },
        { question: "What supplements do you recommend for gaining muscle mass?", answer: "We recommend protein powders, creatine, and BCAAs based on your goals." },
        { question: "Do you ship sportswear?", answer: "Yes, we ship nationwide." },
        { question: "How can I enroll in a training plan?", answer: "You can enroll through our website or at the gym reception." },
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
                        <span>Virtual Assistant</span>
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
                            {showFaqs ? "Hide FAQs" : "Show FAQs"}
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
