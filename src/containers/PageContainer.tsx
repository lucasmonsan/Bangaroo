import styled from "styled-components";
import { motion } from "framer-motion"
import { FC, ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode
};

export const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return (
    <Div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {children}
    </Div>
  );
}

const Div = styled(motion.div)`
  border: solid red;
`