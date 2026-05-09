import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { AppCarousel } from '../AppCarousel';
import { ImageArea, Name, Price } from '../CarouselCard/styles';
import { CartButton } from '../CartButton';

export function OffersCarousel() {
	const [offers, setOffers] = useState([]);

	useEffect(() => {
		async function loadProducts() {
			const { data } = await api.get('/products');
			setOffers(data.filter((p) => p.offer));
		}

		loadProducts();
	}, []);

	return (
		<AppCarousel
			title="OFERTAS DO DIA"
			titleColor="#61A120"
			items={offers}
			renderItem={(product) => (
				<>
					<ImageArea imageUrl={product.url} />
					<Name>{product.name}</Name>
					<Price>{formatPrice(product.price)}</Price>
					<CartButton product={product} />
				</>
			)}
		/>
	);
}
