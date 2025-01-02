"use client"
import React from "react";
import MembershipCard from "@/components/MembershipCard";

const MembershipCarousel: React.FC = () => {
    const memberships = [
        { id: 1, name: "Anual", price: 100, description: "Membresía anual con beneficios premium." },
        { id: 2, name: "Mensual", price: 10, description: "Ideal para probar los servicios mensualmente." },
        { id: 3, name: "Trimestral", price: 25, description: "Un buen balance entre flexibilidad y ahorro." },
        { id: 4, name: "Semestral", price: 50, description: "La opción más popular entre nuestros clientes." },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-8">Elige tu Membresía</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {memberships.map((membership) => (
                    <MembershipCard
                        key={membership.id}
                        id={membership.id}
                        name={membership.name}
                        description={membership.description}
                        price={membership.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default MembershipCarousel;
