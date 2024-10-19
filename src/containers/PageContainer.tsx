import styled from "styled-components";
import { motion } from "framer-motion"
import { FC, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode
};

export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <>
      <DivStyled
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0.5, scale: 0.9, y: -75, transition: { duration: 0.75, ease: "easeInOut" } }}
      >
        {children}
      </DivStyled>

      <SpanTransition
        initial={{ top: "100dvh" }}
        exit={{ top: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </>
  );
}

const DivStyled = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
`
const SpanTransition = styled(motion.span)`
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100dvh;
  background-color: var(--black);
  box-shadow: var(--shadow-1);
`