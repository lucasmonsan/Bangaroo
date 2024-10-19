import { FC } from "react";
import { PageContainer } from "../containers/PageContainer";
import { Map } from "../components/Map";
import { Footer } from "../components/Footer";
import { ButtonCancel } from "../components/ButtonCancel";

interface HomePageProps { };

export const HomePage: FC<HomePageProps> = (props) => {
  return (
    <PageContainer>
      <ButtonCancel /> {/*Botão que fica atrás do modal ou de qualquer coisa que precise impedir o toque do usuário*/}
      <Map />
      <Footer />
    </PageContainer>
  );
}
