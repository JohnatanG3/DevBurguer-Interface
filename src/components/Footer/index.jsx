import { Container } from './styles';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<Container>
			<p>DevBurguer © {currentYear} – Desenvolvido por Johnatan G3</p>
		</Container>
	);
}
