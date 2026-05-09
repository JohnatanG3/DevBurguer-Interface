import TrashIcon from '../../assets/trash.svg';
import { useCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { Table } from '../Table';
import {
	ButtonGroup,
	EmptyCart,
	ProductImage,
	TotalPrice,
	TrashImage,
} from './styles';

export function CartItems() {
	const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } =
		useCart();

	return (
		<div style={{ overflowX: 'auto', width: '100%' }}>
			<Table.Root>
				<Table.Header>
					<Table.Tr>
						<Table.Th></Table.Th>
						<Table.Th>Itens</Table.Th>
						<Table.Th>Preço</Table.Th>
						<Table.Th>Quantidade</Table.Th>
						<Table.Th>Total</Table.Th>
						<Table.Th></Table.Th>
					</Table.Tr>
				</Table.Header>
				<Table.Body>
					{cartProducts?.length ? (
						cartProducts.map((product) => (
							<Table.Tr key={product.id}>
								<Table.Td>
									<ProductImage src={product.url} alt="imagem-produto" />
								</Table.Td>
								<Table.Td>{product.name}</Table.Td>

								<Table.Td>{formatPrice(product.price)}</Table.Td>

								<Table.Td>
									<ButtonGroup>
										<button
											type="button"
											onClick={() => decreaseProduct(product.id)}
										>
											-
										</button>
										{product.quantity}
										<button
											type="button"
											onClick={() => increaseProduct(product.id)}
										>
											+
										</button>
									</ButtonGroup>
								</Table.Td>

								<Table.Td>
									<TotalPrice>
										{formatPrice(product.price * product.quantity)}
									</TotalPrice>
								</Table.Td>

								<Table.Td>
									<TrashImage
										onClick={() => deleteProduct(product.id)}
										src={TrashIcon}
										alt="icone-lixeira"
									/>
								</Table.Td>
							</Table.Tr>
						))
					) : (
						<Table.Tr>
							<Table.Td colSpan={6}>
								<EmptyCart>Carrinho Vazio</EmptyCart>
							</Table.Td>
						</Table.Tr>
					)}
				</Table.Body>
			</Table.Root>
		</div>
	);
}
