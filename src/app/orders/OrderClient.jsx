


'use client';

import { DataGrid } from '@mui/x-data-grid';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md';
import ActionBtn from '../components/ActionBtn';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Status from '../components/Status'
import FormattedPrice from '../components/FormattedPrice';
const OrderClient = ({ orders }) => {
  const router = useRouter();
  let rows = [];

  if (orders) {
    rows = orders.map((order) => ({
      id: order.id,
      Customer: order.user.firstName,
      amount: order.amount,
      paymentStatus: order.status,
      date: formatDistanceToNow(new Date(order.createdAt), { addSuffix: true }),
      deliveryStatus: order.deliveredStatus,
    }));
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'Customer', headerName: 'Customer Name', width: 220 },
    {
      field: 'amount',
      headerName: 'Amount (USD)',
      width: 100,
      renderCell: (params) => <FormattedPrice amount={params.row.amount} />,
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 130,
      renderCell: (params) => (
        <div className='font-bold flex items-center'>
          {params.row.status === 'pending' ? (
            <Status text='pending' Icon={MdAccessTimeFilled} bg='bg-slate-200' color='text-slate-700' />
          ) : params.row.status === 'completed' ? (
            <Status text='completed' Icon={MdDone} bg='bg-green-200' color='text-purple-700' />
          ) : <></>}
        </div>
      ),
    },
    {
      field: 'deliveryStatus',
      headerName: 'Delivery Status',
      width: 130,
      renderCell: (params) => (
        <div className='font-bold text-slate-600'>
          {params.row.deliveryStatus === 'pending' ? (
            <Status text='pending' Icon={MdAccessTimeFilled} bg='bg-slate-200'color='text-slate-700' />
          ) : params.row.deliveryStatus === 'dispatched' ? (
            <Status text='dispatched' Icon={MdDeliveryDining} bg='bg-green-200' color='text-purple-700' />
          ) : params.row.deliveryStatus === 'delivered' ? (
            <Status text='delivered' Icon={MdDone} bg='bg-green-200'  color='text-green-700' />
          ) : null}
        </div>
      ),
    },
    { field: 'date', headerName: 'Date', width: 130 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className='h-full flex items-center'>
          <ActionBtn Icon={MdRemoveRedEye} onClick={() => router.push(`/order/${params.row.id}`)} />
        </div>
      ),
    },
  ];


  return (
    <div>
      <h2 className="text-2xl font-bold text-center py-4"> Orders</h2>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrderClient;


