


'use client';
import React, { useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import FormattedPrice from '../../components/FormattedPrice';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from 'react-icons/md';
import Status from '../../components/Status';
import ActionBtn from '../../components/ActionBtn';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

const ManageOrdersClient = ({ orders }) => {
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
          {params.row.paymentStatus === 'pending' ? (
            <Status text='pending' Icon={MdAccessTimeFilled} bg='bg-slate-200' color='text-slate-700' />
          ) : params.row.paymentStatus === 'completed' ? (
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
        <div className='flex h-full items-center justify-between border-[1px] rounded-lg p-3'>
          <ActionBtn Icon={MdDeliveryDining} onClick={() => handleDispatch(params.row.id)} />
          <ActionBtn Icon={MdDone} onClick={() => handleDeliver(params.row.id)} />
          <ActionBtn Icon={MdRemoveRedEye} onClick={() => router.push(`/order/${params.row.id}`)} />
        </div>
      ),
    },
  ];

  

  const handleDispatch = useCallback((id) => {
    axios.put('/api/order', {
      id,
      deliveryStatus: 'dispatched',
    })
    .then((res) => {
      toast.success('Order Dispatched');
      router.refresh();
    })
    .catch((error) => {
      toast.error('Something went wrong');
      console.error(error);
    });
  }, []);

  const handleDeliver = useCallback((id) => {
    axios.put('/api/order', {
      id,
      deliveryStatus: 'delivered',
    })
    .then((res) => {
      toast.success('Order Delivered');
      router.refresh();
    })
    .catch((error) => {
      toast.error('Something went wrong');
      console.error(error);
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center py-4">Manage Orders</h2>
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

export default ManageOrdersClient;


