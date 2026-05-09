import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { ImageArea, Name, Price } from '../../components/CarouselCard/styles';
import { CartButton } from '../../components/CartButton';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import {
	Banner,
	ButtonWrapper,
	CategoryButton,
	CategoryMenu,
	Container,
	Info,
	ProductCard,
	ProductsGrid,
} from './styles';

export function Menu() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const navigate = useNavigate();
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const categoryFromUrl = Number(queryParams.get('category')) || 0;
	const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
	const [filteredProducts, setFilteredProducts] = useState(
		categoryFromUrl === 0 ? products : [],
	);

	useEffect(() => {
		setActiveCategory(categoryFromUrl);
		setSelectedCategory(categoryFromUrl);
	}, [categoryFromUrl]);

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');

			const newCategories = [{ id: 0, name: 'Todas' }, ...data];

			setCategories(newCategories);
		}

		async function loadProducts() {
			const { data } = await api.get('/products');

			const newProducts = data.map((product) => ({
				...product,
				currency: formatPrice(product.price),
			}));

			setProducts(newProducts);
		}

		loadCategories();
		loadProducts();
	}, []);

	useEffect(() => {
		if (activeCategory === 0) {
			setFilteredProducts(products);
		} else {
			const newFilteredProducts = products.filter(
				(product) => product.category_id === activeCategory,
			);

			setFilteredProducts(newFilteredProducts);
		}
	}, [products, activeCategory]);

	return (
		<main>
			<Banner>
				<h1>
					O MELHOR <br /> HAMBÚRGUER <br /> ESTÁ AQUI! <br />
					<span>Esse cardápio está irresistível!</span>
				</h1>
			</Banner>
			<Container>
				<BackButton to="/">Voltar para a home</BackButton>
				<CategoryMenu>
					{categories.map((category) => (
						<CategoryButton
							key={category.id}
							type="button"
							$isActiveCategory={selectedCategory === category.id}
							onClick={() => {
								navigate(
									{
										pathname: '/cardapio',
										search: `?category=${category.id}`,
									},
									{
										replace: true,
									},
								);
								setActiveCategory(category.id);
								setSelectedCategory(category.id);
							}}
						>
							{category.name}
						</CategoryButton>
					))}
				</CategoryMenu>
				<ProductsGrid>
					{filteredProducts.map((product) => (
						<ProductCard key={product.id}>
							<ImageArea imageUrl={product.url} />
							<Info>
								<Name>{product.name}</Name>
								<Price>{product.currency}</Price>
							</Info>

							<ButtonWrapper>
								<CartButton product={product} />
							</ButtonWrapper>
						</ProductCard>
					))}
				</ProductsGrid>
			</Container>
		</main>
	);
}
