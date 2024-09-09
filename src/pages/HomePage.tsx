import { Main, Section } from "../components/Containers"
import { H1, P } from "../components/Texts"

import home_bg from "../assets/home-bg.webp"

export const HomePage = () => {
	return (
		<Main>
			<Section className="relative hidden column">
				<img src={home_bg} alt="Imagem de fundo com uma casa de dois andares." className="z-bg cover w-100" />

				<div className="z-app absolute top-0 flex column ai-center w-100 padd-t-header margin-t-xxxl">
					<H1 className="fs-xxxl center color-white">Saiba o passado do seu Futuro Lar</H1>
					<P className="padd-t-md padd-b-xl fs-md medium center color-white">Aqui você confere tudo sobre o imóvel que você pretende comprar/alugar.</P>
				</div>
			</Section>
		</Main>
	)
}
