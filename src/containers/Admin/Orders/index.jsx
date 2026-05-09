import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from '../../../services/api';
import { orderOptionsStatus } from './orderStatus';
import { Row } from './row';
import { Filter, FilterOptions } from './styles';

export function Orders() {
	const [orders, setOrders] = useState([]); // Backup
	const [activeStatus, setActiveStatus] = useState(orderOptionsStatus[0].id); // Status ativo para filtro

	const filteredOrders = useMemo(() => {
		if (activeStatus === 0) return orders;

		const statusValue = orderOptionsStatus.find(
			(item) => item.id === activeStatus,
		)?.value;

		return orders.filter((order) => order.status === statusValue);
	}, [orders, activeStatus]);

	useEffect(() => {
		async function loadOrders() {
			const { data } = await api.get('/orders');
			setOrders(data);
			setFilteredOrders(data); // Inicialmente, exibe todas as ordens
		}

		loadOrders();
	}, []);

	const updateOrderStatus = useCallback((orderId, newStatus) => {
		setOrders((prev) =>
			prev.map((order) =>
				order._id === orderId ? { ...order, status: newStatus } : order,
			),
		);
	}, []);

	function handleStatus(status) {
		setActiveStatus(status.id);
	}

	return (
		<>
			<Filter>
				{orderOptionsStatus.map((status) => (
					<FilterOptions
						key={status.id}
						onClick={() => handleStatus(status)}
						$isActiveStatus={activeStatus === status.id}
					>
						{status.label}
					</FilterOptions>
				))}
			</Filter>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Pedido</TableCell>
							<TableCell>Cliente</TableCell>
							<TableCell>Data</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{filteredOrders.map((order) => (
							<Row
								key={order._id}
								row={order}
								onUpdateStatus={updateOrderStatus}
								orders={orders}
								setOrders={setOrders}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
