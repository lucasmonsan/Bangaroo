import styled from "styled-components";
import { FC, useEffect } from "react";
import { useGlobal } from "../contexts/GlobalContext";
import { ProfileIcon } from "../assets/ProfileIcon";
import { PlusIcon } from "../assets/PlusIcon";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";

interface FooterProps { }

export const Footer: FC<FooterProps> = (props) => {
  const { global, setGlobal } = useGlobal()
  const navigate = useNavigate()

  useEffect(() => {

  }, [global])

  return (
    <FooterStyled id="FooterStyled">
      <Search />

      <ButtonStyled className="small" onClick={() => navigate("/")}>
        <ProfileIcon />
      </ButtonStyled>

      <ButtonStyled className="small" onClick={() => navigate("/newReview")}>
        <PlusIcon />
      </ButtonStyled>
    </FooterStyled>
  );
};

/***/

const FooterStyled = styled.footer`
  z-index: var(--z-footer);
  position: fixed;
  bottom: var(--lg);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: var(--xs);
  width: 100%;
  max-width: calc(var(--base) * 40);
  padding: 0 var(--sm);
  transition: all var(--fast);
`;
const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--header-h);
  max-width: var(--header-h);
	height: var(--header-h);
  padding: var(--xs);
  box-shadow: var(--shadow-1);
`