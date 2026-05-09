import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ArrowButton, Container, Title, TrackItem } from './styles';

function CustomLeftArrow({ onClick, color }) {
	return (
		<ArrowButton
			type="button"
			className="left"
			onClick={onClick}
			$color={color}
			aria-label="Anterior"
		>
			<ChevronLeft size={40} />
		</ArrowButton>
	);
}

function CustomRightArrow({ onClick, color }) {
	return (
		<ArrowButton
			type="button"
			className="right"
			onClick={onClick}
			$color={color}
			aria-label="Próximo"
		>
			<ChevronRight size={40} />
		</ArrowButton>
	);
}

const responsive = {
	superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
	desktop: { breakpoint: { max: 3000, min: 1280 }, items: 4 },
	tablet: { breakpoint: { max: 1280, min: 690 }, items: 3 },
	mobile: { breakpoint: { max: 690, min: 0 }, items: 2 },
};

export function AppCarousel({
	title,
	titleColor = '#9758A6',
	arrowColor,
	showArrows = true,
	items = [],
	renderItem,
}) {
	const finalArrowColor = arrowColor ?? titleColor;

	return (
		<Container>
			{title && <Title $color={titleColor}>{title}</Title>}

			<Carousel
				responsive={responsive}
				infinite
				arrows={showArrows}
				itemClass="carousel-item"
				customLeftArrow={
					showArrows ? <CustomLeftArrow color={finalArrowColor} /> : undefined
				}
				customRightArrow={
					showArrows ? <CustomRightArrow color={finalArrowColor} /> : undefined
				}
			>
				{items.map((item) => (
					<TrackItem key={item.id}>{renderItem(item)}</TrackItem>
				))}
			</Carousel>
		</Container>
	);
}
