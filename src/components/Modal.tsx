import styled from "styled-components";
import { useEffect, useState } from "react";
import { SearchIcon } from "../assets/SearchIcon";
import { useGlobal } from "../contexts/GlobalContext";
import { LogoIcon } from "../assets/LogoIcon";
import { getCityIndexedDB } from "../api/indexedDB";

export const Modal = () => {
  const [captcha, setCaptcha] = useState(false);
  const [inputCityName, setInputCityName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const { global, setGlobal } = useGlobal();

  const handleCoordRequest = () => {
    console.log("Solicitação de coordenada");
  };

  useEffect(() => {
    const modalStyled = document.getElementById("ModalStyled");
    if (!modalStyled) return

    if (global.modal === "") {
      modalStyled.style.opacity = "0";
      setTimeout(() => {
        setGlobal({ field: "modal", payload: "" })
        modalStyled.style.zIndex = "var(--z-hide)";
      }, 500);
    } else {
      const updateCitySelected = async () => {
        const cityResponse = await getCityIndexedDB(global.cityId, global.country);
        setInputCityName(`${cityResponse.name}, ${cityResponse.state_name}, ${global.country}`);
      };
      updateCitySelected();
      modalStyled.style.opacity = "1";
      modalStyled.style.zIndex = "var(--z-modal)";
    }
  }, [global.modal]);

  return (
    <SectionStyled id="ModalStyled">
      <button id="CancelBtn" onClick={() => { setGlobal({ field: "modal", payload: "" }) }} />

      {global.modal === "Coord_Not_Found" && (
        <DivStyled>
          <LogoIcon />
          <div id="Title">
            <h2>Não existem coordenadas para esse local no sistema.</h2>
          </div>
          <div id="Description">
            <p>Verifique os dados abaixo e envie um alerta para análise.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleCoordRequest(); }}>
            <label>
              <input type="text" placeholder="Cidade, município ou distrito..." value={inputCityName} onChange={(e) => setInputCityName(e.target.value)} />
              <SearchIcon />
            </label>
            <textarea rows={5} placeholder="Digite alguma informação sobre o local..." value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
            <p>Deixe seu email ou telefone para contato:</p>
            <label>
              <input type="text" placeholder="Email ou telefone com DDD..." value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
              <SearchIcon />
            </label>
            <input type="checkbox" id="Checkbox" checked={captcha} onChange={() => setCaptcha(!captcha)} />
            <button type="submit" disabled={!captcha}>
              Enviar
            </button>
          </form>
        </DivStyled>
      )}
    </SectionStyled>
  );
};



/***/

const SectionStyled = styled.section`
  z-index: var(--z-hide);
  position: fixed;
  top: 0;
  left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100dvh;
	background-color: #FFFFFF7f;
  backdrop-filter: blur(0.25em);
  opacity: 0;
  transition: opacity var(--fast);

  button#CancelBtn {
    cursor: auto;
    z-index: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`
const DivStyled = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--sm);
  width: 90%;
  max-width: 480px;
  padding: var(--sm) var(--md) var(--md);
  border-radius: var(--radius-1);
  background-color: var(--black);
  border: solid 1px var(--border);

  svg {height: calc(var(--xxxl) * 1.5);}

  h2, h3, p {text-align: center;}

  p {
      font-size: calc(var(--md) * 0.8);
      opacity: 0.75;
    }

  div#Description {
    display: flex;
    flex-direction: column;
    gap: var(--xs);
    margin-bottom: var(--xs);
    padding: 0 var(--md);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--xs);
    width: 100%;
    padding: 0 var(--xxs);

    label, textarea {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: var(--header-h);
      padding: var(--sm);
      color: var(--white);
      border: solid 2px var(--border);
      border-radius: var(--radius-1);
      background-color: var(--comp);
      transition: border var(--fast);

      svg {
        display: flex;
        width: var(--lg);        
      }
    }

    textarea {
      height: calc(var(--xxxl) * 2.5);
      line-height: var(--lg);
    }

    p {
      font-size: calc(var(--sm) * 0.8);
      opacity: 0.5;
    }

    input#Checkbox {
      width: var(--xxl);
      height: var(--xxl);
      margin: var(--xs) 0;
      border: solid;

      &:checked {
        background-color: red;
      }
    }
  }
`
