import styled from "styled-components"
import { useState, useRef, FC } from "react"
import { CardWallet, CardWalletProps } from "./CardWallet"
import { WalletsProps } from "../contexts/AuthContext"

/*******************************************************/
interface SwiperProps {
	cards: CardWalletProps[] | WalletsProps[]
}

export const SwiperCards: FC<SwiperProps> = ({ cards }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const touchStartX = useRef(0)
	const touchEndX = useRef(0)
	const isDragging = useRef(false)

	const handleStart = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		isDragging.current = true
		touchStartX.current = "touches" in event ? event.touches[0].clientX : event.clientX
		touchEndX.current = touchStartX.current
	}
	const handleMove = (event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>) => {
		if (isDragging.current) {
			touchEndX.current = "touches" in event ? event.touches[0].clientX : event.clientX
		}
	}
	const handleEnd = () => {
		if (isDragging.current) {
			isDragging.current = false
			const moveDistance = touchStartX.current - touchEndX.current

			if (moveDistance > 100) {
				setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? prevIndex : prevIndex + 1))
			} else if (moveDistance < -100) {
				setCurrentIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1))
			}
		}

		touchStartX.current = 0
		touchEndX.current = 0
	}

	return (
		<SectionStyled style={{ minHeight: "calc(var(--base) * 9.5" }}>
			<div
				onMouseDown={handleStart}
				onMouseMove={handleMove}
				onMouseUp={handleEnd}
				onMouseLeave={handleEnd}
				onTouchStart={handleStart}
				onTouchMove={handleMove}
				onTouchEnd={handleEnd}
				className="hidden w-100 h-100 wk-touch-callout-none wk-user-select-none khtml-user-select-none moz-user-select-none"
			>
				<div className="relative w-100 h-100">
					{cards.map((card, index) => (
						<Card key={index} className={`${index === currentIndex ? "active" : ""} ${index === currentIndex - 1 ? "previous" : ""} ${index === currentIndex + 1 ? "next" : ""}`}>
							<CardWallet
								id={card.id}
								name={card.name}
								type={card.type}
								icon={card.icon}
								debit_balance={card.debit_balance.toString()}
								credit_balance={card.credit_balance.toString()}
								color={card.color}
							/>
						</Card>
					))}
				</div>
			</div>
		</SectionStyled>
	)
}

/*******************************************************/

const SectionStyled = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--md);
	width: 100%;
	height: 100%;
	padding: var(--md);
`

const Card = styled.div`
  z-index: 1;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  width: 90%;
  height: 100%;
  border-radius: var(--radius2);
  opacity: 0;
  transform: translateX(-50%); 
  transition: var(--fast);

  &.active { 
    opacity: 1;
    z-index: 2;
  }
  &.previous {
    opacity: 0.25;
    left: 0%; /* Ajusta a posição à esquerda */
    transform: translateX(-87.5%) scale(0.8); 
    /* Centraliza e reduz um pouco */
  }
  &.next {
    opacity: 0.25;
    right: 0%; /* Ajusta a posição à direita */
    transform: translateX(42.5%) scale(0.8); 
    /* Centraliza e reduz um pouco */
  }
`
