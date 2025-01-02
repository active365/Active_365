"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "@/components/MembershipCard";
import Loader from "@/components/Loader";

interface Membership {
  id: number;
  name: string;
  detailUrl: string;
  color: string;
  description: string;
  price: string;
}

const membershipsData: Membership[] = [
  {
    id: 1,
    name: "Annual",
    detailUrl: "/checkout/annual",
    color: "255, 221, 85",
    description: "Full access for one year with exclusive benefits, product discounts, and priority event access.",
    price: "199.99"
  },
  {
    id: 2,
    name: "Quarterly",
    detailUrl: "/checkout/quarterly",
    color: "255, 189, 70",
    description: "3-month membership with premium features, priority support, and exclusive content.",
    price: "79.99"
  },
  {
    id: 3,
    name: "Monthly",
    detailUrl: "/checkout/monthly",
    color: "255, 204, 102",
    description: "Monthly subscription with access to all features, no long-term commitment, and easy renewal.",
    price: "29.99"
  },
  {
    id: 4,
    name: "Semi-Annual",
    detailUrl: "/checkout/semi-annual",
    color: "255, 221, 102",
    description: "6-month membership with intermediate benefits, access to special products, and priority tech support.",
    price: "129.99"
  },
];

const MembershipList: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setMemberships(membershipsData);
      setLoading(false);
    }, 300); 
  }, []);

  return (
    <StyledWrapper>
      {loading ? (
        <div className="loader">
          <Loader/>
        </div>
      ) : (
        <div className="card-container">
          {memberships.map((membership) => (
            <div key={membership.id} className="card-item">
              <Card name={membership.name} color={membership.color} detailUrl={membership.detailUrl} description={membership.description} price={membership.price} />
            </div>
          ))}
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    margin-top: 80px;
  }

  .card-item {
    flex: 1 1 250px;
    max-width: 300px;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .spinner {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #ffbb66;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default MembershipList;
