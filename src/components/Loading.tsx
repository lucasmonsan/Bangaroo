import styled from "styled-components";
import { useEffect } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import { useLocation } from "react-router-dom";

export const Loading = () => {
  const { global } = useGlobal();
  const { pathname } = useLocation()

  useEffect(() => {
    const divLoading = document.getElementById("DivLoading");
    if (!divLoading) return

    if (pathname === "/splash") {
      divLoading.style.backdropFilter = "blur(0);"
      divLoading.style.alignItems = "flex-end"
    }
    else {
      divLoading.style.alignItems = "center"
      divLoading.style.backdropFilter = "blur(0.25em);"
    }

    if (global.loading === true) {
      divLoading.style.zIndex = "var(--z-loading)"
      divLoading.style.opacity = "1"
    } else {
      divLoading.style.opacity = "0"
      setTimeout(() => divLoading.style.zIndex = "var(--z-hide)", 2000);
    }
  }, [global.loading]);

  return (
    <DivStyled id="DivLoading">
      <div>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </DivStyled>
  );
};

/***/

const DivStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-bottom: var(--xl);
  background: #00000000;
  border-radius: 0;
  transition: opacity var(--fast);

  div {
    --uib-color: var(--color-1);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--xxxl);
    width: var(--xxxl);

    span {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      width: 100%;

      &::before {
        content: '';
        height: 20%;
        width: 20%;
        border-radius: 50%;
        background-color: var(--uib-color);
        transform: scale(0);
        opacity: 0.5;
        animation: pulse0112 calc(1s * 1.111) ease-in-out infinite;
        box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
      }

      &:nth-child(2) {
        transform: rotate(45deg);
      }

      &:nth-child(2)::before {
        animation-delay: calc(1s * -0.875);
      }

      &:nth-child(3) {
        transform: rotate(90deg);
      }

      &:nth-child(3)::before {
        animation-delay: calc(1s * -0.75);
      }

      &:nth-child(4) {
        transform: rotate(135deg);
      }

      &:nth-child(4)::before {
        animation-delay: calc(1s * -0.625);
      }

      &:nth-child(5) {
        transform: rotate(180deg);
      }

      &:nth-child(5)::before {
        animation-delay: calc(1s * -0.5);
      }

      &:nth-child(6) {
        transform: rotate(225deg);
      }

      &:nth-child(6)::before {
        animation-delay: calc(1s * -0.375);
      }

      &:nth-child(7) {
        transform: rotate(270deg);
      }

      &:nth-child(7)::before {
        animation-delay: calc(1s * -0.25);
      }

      &:nth-child(8) {
        transform: rotate(315deg);
      }

      &:nth-child(8)::before {
        animation-delay: calc(1s * -0.125);
      }

      @keyframes pulse0112 {
        0%,
        100% {
          transform: scale(0);
          opacity: 0.5;
        }

        50% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
  }
`
