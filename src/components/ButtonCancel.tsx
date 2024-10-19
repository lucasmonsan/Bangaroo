import styled from "styled-components";
import { useEffect } from "react";
import { useGlobal } from "../contexts/GlobalContext";

export const ButtonCancel = () => {
  const { global, setGlobal } = useGlobal();

  useEffect(() => {
    const buttonCancel = document.getElementById("ButtonCancel");
    if (!buttonCancel) return

    if (global.footer !== "" || global.modal !== "") {
      buttonCancel.style.zIndex = "var(--z-btn-cancel)"
      buttonCancel.style.opacity = "1"
    } else {
      buttonCancel.style.opacity = "0"
      setTimeout(() => buttonCancel.style.zIndex = "var(--z-hide)", 250);
    }
  }, [global.footer, global.modal]);

  return (
    <ButtonStyle id="ButtonCancel" onClick={() => { setGlobal({ field: "footer", payload: "" }), setGlobal({ field: "modal", payload: "" }) }} />
  );
};

/***/

const ButtonStyle = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000000;
  backdrop-filter: blur(0.25em);
  border-radius: 0;
  transition: opacity var(--fast);
`
