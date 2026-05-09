import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { AppCarousel } from '../AppCarousel';
import { Button } from '../Button';
import { ImageArea } from '../CarouselCard/styles';

export function CategoriesCarousel() {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');
			setCategories(data);
		}

		loadCategories();
	}, []);

	return (
		<AppCarousel
			title="CATEGORIAS"
			titleColor="#9758A6"
			items={categories}
			renderItem={(category) => (
				<>
					<ImageArea imageUrl={category.url} />
					<Button onClick={() => navigate(`/cardapio?category=${category.id}`)}>
						{category.name}
					</Button>
				</>
			)}
		/>
	);
}
