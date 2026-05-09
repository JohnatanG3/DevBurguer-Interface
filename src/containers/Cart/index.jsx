import { CartItems } from '../../components/CartItems';
import { CartResume } from '../../components/CartResume';
import { Banner, Container, Contet, Title } from './styles';

export function Cart() {
	return (
		<main>
			<Banner />
			<Container>
				<Title>Checkout - Pedido</Title>
				<Contet>
					<CartItems />
					<CartResume />
				</Contet>
			</Container>
		</main>
	);
}
