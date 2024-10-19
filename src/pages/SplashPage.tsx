import { FC, useEffect, useState } from "react";
import { PageContainer } from "../containers/PageContainer";
import { useNavigate } from "react-router-dom";
import { deleteIndexedDB, getAllDistricts, getAllMunicipalities } from "../api/indexedDB";
import styled from "styled-components";
import { LogoIcon } from "../assets/LogoIcon";
import { useGlobal } from "../contexts/GlobalContext";

interface HomePageProps { }

export const SplashPage: FC<HomePageProps> = () => {
  const navigate = useNavigate();
  const { setGlobal } = useGlobal()

  useEffect(() => {
    document.title = "Bangaroo - Splash";
    sessionStorage.setItem("lastDayAccess", new Date().getDate().toString());
    setGlobal({ field: "loading", payload: true });

    const setupSplash = async () => {
      try {
        await deleteIndexedDB();
        console.log("BangarooDB foi apagado com sucesso.");

        await getAllMunicipalities("Brazil");
        console.log("Municípios salvos.");

        await getAllDistricts("Brazil");
        console.log("Distritos salvos.");

        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        console.error("Erro na busca de cidades:", error);
      } finally {
        setGlobal({ field: "loading", payload: false });
      }
    };

    setupSplash();
  }, [navigate]);

  return (
    <PageContainer>
      <DivStyled>
        <LogoIcon />
        <h1>Bangaroo!</h1>
      </DivStyled>
    </PageContainer>
  );
};

/***/

const DivStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    height: calc(var(--xxxl) * 2);
  }
`