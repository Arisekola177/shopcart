

'use client';
import React, { useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import FormattedPrice from '../../components/FormattedPrice';
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from 'react-icons/md';
import Status from '../../components/Status'
import ActionBtn from '../../components/ActionBtn'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { deleteObject,  ref } from 'firebase/storage';
import { storage } from '../../utils/firebase.config';


const ManageProductClient = ({ products }) => {
  const router = useRouter();
 
    let rows = []

    if(products){
        rows = products.map((product) => {
          return{
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            brand: product.brand,
            inStock: product.inStock,
            images: product.images
          }
        })
    }

  const columns  = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 220 },
    {
      field: 'price',
      headerName: 'Price (USD)',
      width: 100,
      renderCell: (params) => <FormattedPrice amount={params.row.price} />,
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 120,
      renderCell: (params) => (
        <div className='font-bold text-slate-600'>
          {params.row.inStock ? <Status text='in stock' Icon={MdDone} bg='bg-teal-200' color='text-teal-700'/> 
          : <Status text='out of stock' Icon={MdClose} bg='bg-rose-200' color='text-rose-700'/>}
        </div>
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => <div className='flex h-full items-center justify-between border-[1px] rounded-lg p-3'>
        <ActionBtn Icon={MdCached} onClick={() => {handleToggleStock(params.row.id, params.row.inStock)} } />
        <ActionBtn Icon={MdDelete} onClick={() => {handleDelete(params.row.id, params.row.images)} } />
        <ActionBtn Icon={MdRemoveRedEye} onClick={() => {
            router.push(`/product/${params.row.id}`)
        } } />
        </div>,
    },
  ];

  const handleToggleStock = useCallback((id, inStock) => {
    toast("Updating product, please wait ....... ");
    axios.put('/api/product', {
      id,
      inStock: !inStock
    }).then((res) => {
      toast.success('Product status changed');
      router.refresh();
    }).catch((error) => {
      toast.error('Something went wrong');
      console.log(error);
    });
  }, []);


  const handleDelete = useCallback(async (id, images) => {
    toast("Deleting product, please wait ....... ");
  
    const handleImageDelete = async () => {
      try {
        for (const item of images) {
          if (item.image) {
            const imageRef = ref(storage, item.image);
            await deleteObject(imageRef);
            console.log("Image deleted:", item.image);
          }
        }
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          console.log('Image not found:', error.message);
        } else {
          console.log('Error deleting images:', error);
        }
      }
    };
  
    await handleImageDelete();
  
    try {
      await axios.delete(`/api/product/${id}`);
      toast.success('Product deleted');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      toast.error('Products with reviews can only be deleted from the database');
    }
  }, [router]);

  

  return (
    <div>
        <h2 className="text-2xl font-bold text-center py-4">Manage Product</h2>
        <div className='h-screen py-4 flex justify-center items-center '>
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

export default ManageProductClient;




