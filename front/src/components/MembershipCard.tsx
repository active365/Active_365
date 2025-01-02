import React from "react";

interface MembershipCardProps {
    id: number;
    name: string;
    description: string;
    price: number;
}

import styled from 'styled-components';

const Card: React.FC<MembershipCardProps> = ({ name, description, price }) => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="content">
                    <img src="/front/public/logo.png" alt="logo" />
                    <h1>{name}</h1>
                    <p className="para">
                        {description}
                    </p>
                    <h4>Price: ${price}</h4>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    border-radius: 24px;
    line-height: 1.6;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding: 36px;
    border-radius: 22px;
    color: #ffffff;
    overflow: hidden;
    background: #ffff;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content::before {
    position: absolute;
    content: "";
    top: -4%;
    left: 50%;
    width: 90%;
    height: 90%;
    transform: translate(-50%);
    background: rgb(169,169,0);
    background: linear-gradient(108deg, rgba(169,169,0,0.5543009440104167) 0%, rgba(191,192,41,0.32741018770789565) 28%, rgba(244,255,0,0.6075222325258228) 100%);
    z-index: -1;
    transform-origin: bottom;

    border-radius: inherit;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content::after {
    position: absolute;
    content: "";
    top: -8%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%);
    background: #ffff;
    z-index: -2;
    transform-origin: bottom;
    border-radius: inherit;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content svg {
    width: 48px;
    height: 48px;
  }

  .content .para {
    z-index: 1;
    opacity: 1;
    font-size: 18px;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content .link {
    z-index: 1;
    color: #fea000;
    text-decoration: none;
    font-family: inherit;
    font-size: 16px;
    transition: all 0.48s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .content .link:hover {
    text-decoration: underline;
  }

  .card:hover {
    transform: translate(0px, -16px);
  }

  .card:hover .content::before {
    rotate: -8deg;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .card:hover .content::after {
    rotate: 8deg;
    top: 0;
    width: 100%;
    height: 100%;
  }`;

export default Card;
