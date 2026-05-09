import { yupResolver } from '@hookform/resolvers/yup';
import { ImageIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { api } from '../../../services/api';
import {
	Container,
	ContainerCheckbox,
	ErrorMessage,
	Form,
	Input,
	InputCheckbox,
	InputGroup,
	Label,
	LabelUpload,
	Select,
	SubmitButton,
} from './styles';

const schema = yup.object({
	name: yup.string().required('Digite o nome do produto'),
	price: yup
		.number()
		.positive()
		.required('Digite o preço do produto')
		.typeError('Digite um valor numérico para o preço'),
	category: yup.object().required('Selecione uma categoria'),
	offer: yup.boolean(),
	file: yup
		.mixed()
		.test(
			'fileType',
			'Apenas arquivos PNG ou JPEG são permitidos com até 5MB',
			(value) => {
				// Se não houver arquivo, não validar
				if (!value || value.length === 0) {
					return true;
				}

				const file = value[0];
				const validTypes = ['image/jpeg', 'image/png'];
				const maxSize = 5 * 1024 * 1024; // 5MB
				return validTypes.includes(file.type) && file.size <= maxSize;
			},
		),
});

export function EditProduct() {
	const [fileName, setFileName] = useState(null);
	const [categories, setCategories] = useState([]);
	const {
		state: { product },
	} = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		async function loadCategories() {
			const { data } = await api.get('/categories');
			setCategories(data);
		}

		loadCategories();
	}, []);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		const productFormData = new FormData();

		productFormData.append('name', data.name);
		productFormData.append('price', data.price * 100);
		productFormData.append('category_id', data.category.id);

		// Só adiciona o arquivo se ele foi selecionado
		if (data.file && data.file.length > 0) {
			productFormData.append('file', data.file[0]);
		}

		productFormData.append('offer', data.offer);

		try {
			await toast.promise(api.put(`/products/${product.id}`, productFormData), {
				pending: 'Editando produto...',
				success: 'Produto editado com sucesso!',
				error: 'Erro ao editar produto. Tente novamente.',
			});

			// Redireciona após 2 segundos
			setTimeout(() => {
				navigate('/admin/produtos');
			}, 2000);
		} catch (error) {
			console.error('Erro ao editar produto:', error);
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<InputGroup>
					<Label>Nome</Label>
					<Input
						type="text"
						{...register('name')}
						defaultValue={product.name}
						autoFocus
					/>
					<ErrorMessage>{errors.name?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<Label>Preço</Label>
					<Input
						type="number"
						step="0.01"
						{...register('price')}
						defaultValue={product.price / 100}
					/>
					<ErrorMessage>{errors.price?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<LabelUpload>
						<ImageIcon />
						<input
							type="file"
							{...register('file')}
							accept="image/png, image/jpeg"
							onChange={(value) => {
								setFileName(value.target.files[0]?.name);
								register('file').onChange(value);
							}}
						/>
						{fileName || 'Carregar imagem do produto'}
						<ErrorMessage>{errors.file?.message}</ErrorMessage>
					</LabelUpload>
				</InputGroup>

				<InputGroup>
					<Label>Categoria</Label>
					<Controller
						name="category"
						control={control}
						defaultValue={product.category}
						render={({ field }) => (
							<Select
								{...field}
								options={categories}
								getOptionLabel={(category) => category.name}
								getOptionValue={(category) => category.id}
								placeholder="Selecione a categoria"
								noOptionsMessage={() => 'Nenhuma categoria encontrada'}
								menuPortalTarget={document.body}
								defaultValue={product.category}
							/>
						)}
					/>
					<ErrorMessage>{errors.category?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<ContainerCheckbox>
						<InputCheckbox
							{...register('offer')}
							type="checkbox"
							defaultChecked={product.offer}
						/>
						<Label>Produto em Oferta?</Label>
						<ErrorMessage>{errors.offer?.message}</ErrorMessage>
					</ContainerCheckbox>
				</InputGroup>

				<SubmitButton type="submit">Editar Produto</SubmitButton>
			</Form>
		</Container>
	);
}
