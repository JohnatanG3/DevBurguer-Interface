import Cart from '../../assets/cart.svg';
import { useCart } from '../../hooks/CartContext';
import { ContainerButton } from './styles';

export function CartButton({ product, ...props }) {
	const { putProductsInCart } = useCart();

	return (
		<ContainerButton
			{...props}
			type="button"
			onClick={() => putProductsInCart(product)}
		>
			<img src={Cart} alt="botao-carrinho" />
		</ContainerButton>
	);
}
