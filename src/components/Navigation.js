import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalContext";
import Button, { Btn } from "./Button";
import Logo from "./Logo";

const Section = styled.section`
  width: 100vw;
  background-color: ${(props) => props.theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 85%;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;

  .mobile {
    display: none;
  }

  @media (max-width: 64em) {
    .desktop {
      display: none;
    }
    .mobile {
      display: inline-block;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;

  @media (max-width: 64em) {
    /* 1024 px */
    position: fixed;
    top: ${(props) => props.theme.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
    z-index: 50;
    background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.85)`};
    backdrop-filter: blur(2px);

    transform: ${(props) =>
    props.click ? "translateY(0)" : "translateY(1000%)"};
    transition: all 0.3s ease;

    flex-direction: column;
    justify-content: center;

    touch-action: none;
  }
`;

const MenuItem = styled.li`
  margin: 0 1rem;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    background: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 64em) {
    margin: 1rem 0;

    &::after {
      display: none;
    }
  }
`;

const MenuItemLink = styled.a`
  margin: 0 1rem;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    background: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 64em) {
    margin: 1rem 0;

    &::after {
      display: none;
    }
  }
`;

const HamburguerMenu = styled.span`
  width: ${(props) => (props.click ? "2rem" : "1.5rem")};
  height: 2px;
  background: ${(props) => props.theme.text};

  position: absolute;
  top: 2rem;
  left: 50%;
  transform: ${(props) =>
    props.click
      ? "translateX(-50%) rotate(90deg)"
      : "translateX(-50%) rotate(0)"};

  display: none;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 64em) {
    /* 1024 px */
    display: flex;
  }

  &::after,
  &::before {
    content: " ";
    width: ${(props) => (props.click ? "1rem" : "1.5rem")};
    height: 2px;
    right: ${(props) => (props.click ? "-2px" : "0")};
    background: ${(props) => props.theme.text};
    position: absolute;
    transition: all 0.3s ease;
  }

  &::after {
    top: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(-40deg)" : "rotate(0)")};
  }

  &::before {
    bottom: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(40deg)" : "rotate(0)")};
  }
`;

const Navigation = ({setError, setErrMsg}) => {
  const { account, delAccount, web3, ConnectWallet } = useContext(GlobalContext)
  const [click, setClick] = useState(false);

  const scrollTo = (id) => {
    let element = document.getElementById(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });

    setClick(!click);
  };

  return (
    <Section id="navigation">
      <NavBar>
        <Logo />
        <HamburguerMenu click={click} onClick={() => setClick(!click)}>
          &nbsp;
        </HamburguerMenu>
        <Menu click={click}>
          <MenuItem onClick={() => scrollTo("home")}>Home</MenuItem>
          <MenuItem onClick={() => scrollTo("about")}>About</MenuItem>
          <MenuItem onClick={() => scrollTo("roadmap")}>Roadmap</MenuItem>
          <MenuItem onClick={() => scrollTo("mint")}>Mint</MenuItem>
          <MenuItem onClick={() => scrollTo("team")}>Team</MenuItem>
          <MenuItemLink href="./whitepaper.pdf" target="_blank">Whitepaper</MenuItemLink>
          <MenuItem>
            <div className="mobile">
              {account ? (
                <Btn onClick={() => delAccount()}>{account.slice(0, 5) + '...' + account.slice(38, 42)}</Btn>
              ) : (
                <Btn onClick={() => ConnectWallet(setError, setErrMsg)}>Connect Wallet</Btn>
              )}
            </div>
          </MenuItem>
        </Menu>
        <div className="desktop">
          {account ? (
            <Btn onClick={() => delAccount()}>{account.slice(0, 5) + '...' + account.slice(38, 42)}</Btn>
          ) : (
            <Btn onClick={() => ConnectWallet(setError, setErrMsg)}>Connect Wallet</Btn>
          )}
        </div>
      </NavBar>
    </Section>
  );
};

export default Navigation;
