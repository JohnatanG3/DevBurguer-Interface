import styled from 'styled-components';

export const ImageArea = styled.div`
  width: 100%;
  height: 12.5rem;

  cursor: grab;

  background: url(${(props) => props.imageUrl}) no-repeat center;
  background-size: cover;
  background-position: center;
  background-color: #FFFFFF;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  border-radius: 0.75rem;
  overflow: hidden;
`;

export const Name = styled.p`
  max-width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color:#FF8C05;

  /* ✅ trava em 2 linhas e corta o resto */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  @media (max-width: 900px) {
		line-height: 1.2;
    min-height: calc(1.2em * 2); /* reserva espaço de 2 linhas */
	}
`;

export const Price = styled.p`
  max-width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
`;
