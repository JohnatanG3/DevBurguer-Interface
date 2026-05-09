import { yupResolver } from '@hookform/resolvers/yup';
import { ImageIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
		.test('required', 'Carregue a imagem do produto', (value) => {
			return value && value.length > 0;
		})
		.test(
			'fileType',
			'Apenas arquivos PNG ou JPEG são permitidos com até 5MB',
			(value) => {
				if (value && value.length > 0) {
					const file = value[0];
					const validTypes = ['image/jpeg', 'image/png'];
					const maxSize = 5 * 1024 * 1024; // 5MB
					return validTypes.includes(file.type) && file.size <= maxSize;
				}

				return true;
			},
		),
});

export function NewProduct() {
	const [fileName, setFileName] = useState(null);
	const [categories, setCategories] = useState([]);
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
		productFormData.append('file', data.file[0]);
		productFormData.append('offer', data.offer);

		try {
			await toast.promise(api.post('/products', productFormData), {
				pending: 'Adicionando produto...',
				success: 'Produto adicionado com sucesso!',
				error: 'Erro ao adicionar produto. Tente novamente.',
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
					<Input type="text" {...register('name')} autoFocus />
					<ErrorMessage>{errors.name?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<Label>Preço</Label>
					<Input type="number" step="0.01" {...register('price')} />
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
						render={({ field }) => (
							<Select
								{...field}
								options={categories}
								getOptionLabel={(category) => category.name}
								getOptionValue={(category) => category.id}
								placeholder="Selecione a categoria"
								noOptionsMessage={() => 'Nenhuma categoria encontrada'}
								menuPortalTarget={document.body}
							/>
						)}
					/>
					<ErrorMessage>{errors.category?.message}</ErrorMessage>
				</InputGroup>

				<InputGroup>
					<ContainerCheckbox>
						<InputCheckbox {...register('offer')} type="checkbox" />
						<Label>Produto em Oferta?</Label>
						<ErrorMessage>{errors.offer?.message}</ErrorMessage>
					</ContainerCheckbox>
				</InputGroup>

				<SubmitButton type="submit">Adicionar Produto</SubmitButton>
			</Form>
		</Container>
	);
}
