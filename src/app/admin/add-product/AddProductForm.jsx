


'use client'
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { FaAudioDescription, FaBriefcase, FaDollarSign, FaProductHunt } from 'react-icons/fa';
import { categories } from '../../utils/Categories';
import SetColors from '../../components/Admin/SetColors';
import { colors } from '../../components/Admin/Colors';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../utils/firebase.config';
import axios from 'axios';

const FormSchema = z.object({
  name: z.string().nonempty('Description is required.'), 
  description: z.string().nonempty('Description is required.'),
  brand: z.string().nonempty('Brand is required.'),
  price: z.string().nonempty('Price is required.'),
  category: z.string().nonempty('Category is required.'),
  inStock: z.boolean().refine(value => value === true, 'Please tick if the product is available'),
});

const AddProductForm = () => {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleClick = (label) => {
    setSelectedCategory(label);
    setValue('category', label, { shouldValidate: true });
  };

  useEffect(() => {
    if (isProductCreated) {
      setImages([]);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const addImageToState = useCallback((image) => {
    setImages((prev) => [...prev, image]);
    console.log("Image added to state: ", image);
  }, []);

  const removeImageFromState = useCallback((image) => {
    setImages((prev) => prev.filter((item) => item.color !== image.color));
  }, []);

  const handleImageUpload = async () => {
    let uploadedImages = [];
    try {
      for (const item of images) {
        if (item.file) {
          const fileName = new Date().getTime() + '-' + item.file.name;
          const storageRef = ref(storage, `products/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, item.file);

          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                console.log('Upload is ' + progress + '% done');
              },
              (error) => {
                console.log('Error uploading image', error);
                reject(error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                 
                    uploadedImages.push({
                      color: item.color,
                      colorCode: item.colorCode,
                      image: downloadURL
                    });
                
                  console.log('File available at', downloadURL);
                  resolve();
                } catch (error) {
                  console.log('Error getting the download URL', error);
                  reject(error);
                }
              }
            );
          });
        }
      }
    } catch (error) {
      setLoading(false);
      console.log('Error handling image upload', error);
      toast.error('Error handling image upload');
    }
    return uploadedImages;
  };

  const addProduct = async (data) => {
    toast("Creating Product, please wait ....");
    setLoading(true);

    if (!images || images.length === 0) {
      setLoading(false);
      return toast.error('No selected image');
    }

    const uploadedImages = await handleImageUpload();
    const productData = { ...data, images: uploadedImages };
    axios.post('/api/product', productData).then(() => {
      setLoading(false);
      setIsProductCreated(true);
      router.refresh();
      toast.success('Product created successfully!');
      reset();
    }).catch((error) => {
      toast.error('Something went wrong while saving product to the database');
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="container mx-auto">
      <div className="grid justify-center items-center py-16">
        <div className="bg-slate-50 rounded-lg w-full md:w-[600px] shadow-lg">
          <h2 className="text-2xl font-bold text-center py-4">Add new Product</h2>
          <form onSubmit={handleSubmit(addProduct)} className="py-8 px-6 grid grid-cols-2 items-center gap-4">

            <div className={`relative w-full ${errors.title ? 'mb-6' : 'mb-0'}`}>
              <input
                {...register("name")}
                type="text"
                placeholder="Product Title"
                className="rounded-lg py-2 w-full px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500"
              />
              <FaProductHunt className="absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer" />
              {errors.title && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  {errors.title.message}
                </div>
              )}
            </div>

            <div className={`relative w-full ${errors.brand ? 'mb-6' : 'mb-0'}`}>
              <input
                {...register("brand")}
                type="text"
                placeholder="Brand"
                className="rounded-lg w-full py-2 placeholder:text-xs px-10 outline-none border-[1px] border-black focus:outline-slate-500"
              />
              <FaBriefcase className="absolute left-2 text-xs top-1/2 transform -translate-y-1/2 cursor-pointer" />
              {errors.brand && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  {errors.brand.message}
                </div>
              )}
            </div>

            <div className={`relative col-span-2 ${errors.description ? 'mb-6' : 'mb-0'}`}>
              <textarea
                {...register("description")}
                placeholder="Description"
                className="rounded-lg py-2 w-full px-10 outline-none placeholder:text-xs border-[1px] border-black focus:outline-slate-500"
              />
              <FaAudioDescription className="absolute left-2 text-xs top-4 transform -translate-y-1/2 cursor-pointer" />
              {errors.description && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  {errors.description.message}
                </div>
              )}
            </div>

            <div className="w-full relative col-span-2">
              <h2 className="mb-3 font-semibold">Select a Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
                {categories.map((category) => {
                  if (category.label === 'All') {
                    return null;
                  }
                  const IconComponent = category.icon;
                  const isSelected = selectedCategory === category.label;
                  return (
                    <div
                      key={category.label}
                      onClick={() => handleClick(category.label)}
                      className={`flex flex-col items-center gap-4 border-${isSelected ? 'slate-800' : 'slate-400'} border-[1px] rounded-lg shadow-md py-3 cursor-pointer duration-300`}
                    >
                      <IconComponent size={24} />
                      <p>{category.label}</p>
                    </div>
                  );
                })}
                {errors.category && (
                  <div className="text-red-500 text-xs mt-2">{errors.category.message}</div>
                )}
              </div>
            </div>

            <input type="hidden" {...register("category")} value={selectedCategory} />

            <div className={`relative col-span-2 ${errors.price ? 'mb-6' : 'mb-0'}`}>
              <h2 className="mb-3 font-semibold">Price</h2>
              <input
                {...register("price")}
                type="text"
                placeholder="Price"
                className="rounded-lg py-2 w-full px-10 placeholder:text-xs outline-none border-[1px] border-black focus:outline-slate-500"
              />
              <FaDollarSign className="absolute left-2 text-xs top-3/4 transform -translate-y-1/2 cursor-pointer" />
              {errors.price && (
                <div className="absolute left-0 top-full mt-1 text-red-500 text-xs">
                  {errors.price.message}
                </div>
              )}
            </div>

            <div className="col-span-2 flex flex-col gap-4">
              <div className="py-2">
                <p className="font-bold text-sm">Select the available product colors and upload their images.</p>
                <p className="text-xs">You must upload an image for each of the color selected otherwise your color selection will be ignored.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {colors.map((item) => (
                  <SetColors
                    item={item}
                    key={item.color}
                    addImageToState={addImageToState}
                    removeImageFromState={removeImageFromState}
                    isProductCreated={isProductCreated}
                  />
                ))}
              </div>
              {uploadProgress > 0 && (
                <progress value={uploadProgress} max='100' />
              )}
            </div>

            <div className="col-span-2 flex items-center gap-2">
              <input {...register("inStock")} type="checkbox" className="cursor-pointer" />
              <span className="text-xs">This product is in Stock?</span>
              {errors.inStock && (
                <div className="text-red-500 text-xs">{errors.inStock.message}</div>
              )}
            </div>

            <div className="col-span-2 flex justify-center items-center">
              <button disabled={loading} className="mt-5 w-60 bg-slate-800 text-white p-3 text-sm rounded-lg shadow-md">
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;

