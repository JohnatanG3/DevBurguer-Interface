import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatData';
import { orderOptionsStatus } from './orderStatus';
import { ProductImage, SelectStatus } from './styles';

export function Row({ row, onUpdateStatus }) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const cleanStatus = (status) =>
		typeof status === 'string' ? status.replace('!', '').trim() : '';

	async function newStatusOrder(id, status) {
		try {
			setLoading(true);

			const { data } = await api.put(`/orders/${id}`, { status });

			onUpdateStatus(id, data.status); // 🔥 só isso
		} catch (error) {
			console.error('Error updating order status:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<TableRow>
				<TableCell>
					<IconButton onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>

				<TableCell>{row._id}</TableCell>
				<TableCell>{row.user?.name}</TableCell>
				<TableCell>{formatDate(row.createdAt)}</TableCell>

				<TableCell>
					<SelectStatus
						options={orderOptionsStatus.filter((s) => s.id !== 0)}
						value={orderOptionsStatus.find(
							(s) => s.value === cleanStatus(row.status),
						)}
						onChange={(status) => newStatusOrder(row._id, status.value)}
						isLoading={loading}
						isDisabled={loading}
						menuPortalTarget={document.body}
					/>
				</TableCell>
			</TableRow>

			<TableRow>
				<TableCell colSpan={6}>
					<Collapse in={open}>
						<Box sx={{ margin: 1 }}>
							<Typography>Pedido</Typography>

							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell>Qtd</TableCell>
										<TableCell>Produto</TableCell>
										<TableCell>Categoria</TableCell>
										<TableCell>Imagem</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{row.products.map((p) => (
										<TableRow key={p.id}>
											<TableCell>{p.quantity}</TableCell>
											<TableCell>{p.name}</TableCell>
											<TableCell>{p.category}</TableCell>
											<TableCell>
												<ProductImage src={p.url} />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
