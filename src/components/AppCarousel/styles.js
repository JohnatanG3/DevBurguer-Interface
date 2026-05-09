import styled from 'styled-components';

export const Container = styled.div`
	padding: 0 1rem;
	position: relative;
  	overflow-x: hidden;

	.carousel-item {
		padding: 0 1.25rem;
	}
`;

export const Title = styled.h2`
	font-family: "Roboto", sans-serif;
	text-align: center;
	margin: 1.25rem;
	font-weight: 800;
	font-size: 4rem;
	color: ${({ $color }) => $color || '#9758A6'};
	margin-bottom: 2.5rem;

	position: relative;
	padding-bottom: 1rem;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 3.563rem;
		height: 0.25rem;
		left: 50%;
		transform: translateX(-50%);
		background-color: ${({ $color }) => $color || '#9758A6'};
		border-radius: 62.438rem;
	}

	@media (max-width: 900px) {
		font-size: 2rem;
	}
`;

export const TrackItem = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 0.75rem;
	margin-bottom: 3.125rem;
`;

export const ArrowButton = styled.button`
	position: absolute;
	top: 40%;
	transform: translateY(-40%);
	z-index: 9999;

	background: none;
	border: none;
	padding: 0;

	cursor: pointer;
	color: ${({ $color }) => $color};

	display: flex;
	align-items: center;
	justify-content: center;

	transition: transform 0.2s ease, opacity 0.2s ease;

	&.left {
		left: -0.75rem;
	}

	&.right {
		right: -0.75rem;
	}

	&:hover {
		opacity: 0.85;
		transform: translateY(-50%) scale(1.1);
	}

	&:active {
		transform: translateY(-50%) scale(0.95);
	}
`;
