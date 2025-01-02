"use client";
import React from "react";
import styled from "styled-components";
import Card from "@/components/MembershipCard";

interface Membership {
  id: number;
  name: string;
  detailUrl: string;
  color: string;
  description: string;
  price: string;
}

const memberships: Membership[] = [
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
  return (
    <StyledWrapper>
      <div className="card-container">
        {memberships.map((membership) => (
          <div key={membership.id} className="card-item">
            <Card name={membership.name} color={membership.color} detailUrl={membership.detailUrl} description={membership.description} price={membership.price} />
          </div>
        ))}
      </div>
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
`;

export default MembershipList;
