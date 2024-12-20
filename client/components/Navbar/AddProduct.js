"use client"

import Image from 'next/image'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import useFilter from '@/Store/useFilter'


const AddProduct = ({ products_url }) => {
const { gender, age, size, clothingType } = useFilter()

const [file, setFile] = useState(undefined)

const [apiFile, setApiFile] = useState(undefined)
const [name, setName] = useState('')
const [priceForm, setPriceForm] = useState(undefined)
const [genderForm, setGenderForm] = useState("M")
const [ageForm, setAgeForm] = useState("Toddler")
const [sizeForm, setSizeForm] = useState("SM")
const [bundleForm, setBundleForm] = useState("Bundle")

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(`${products_url}/add_product`, {
                method: "POST",
                body: formData,
            })
            if (!response.ok) throw new Error('Network response was not ok');
            
            return response.json();
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onMutate: async (newProducts) => {
            await queryClient.cancelQueries([ "products", newProducts.gender, newProducts.age, newProducts.size, newProducts.clothingType ]);
            const previousPostData = queryClient.getQueryData([ "products", newProducts.gender, newProducts.age, newProducts.size, newProducts.clothingType ]);

            queryClient.setQueryData([ "products", newProducts.gender, newProducts.age, newProducts.size, newProducts.clothingType ], (oldProducts) => {
                let state
                if ( oldProducts ) {
                    state = {
                        pageParams: oldProducts.pageParams,
                        pages: oldProducts.pages.map( page => ({
                            ...page,
                            products: [...page.products, { skeleton: true, name: "" } ]
                        }))
                    }
                }
                if ( !oldProducts ) {
                    state = {
                        pageParams: [ 1 ],
                        pages: [
                            {
                                productsAmount: 1,
                                products: [{ skeleton: true, name: "" }]
                            }
                        ]
                    }
                }
                return state
            })
            return {
                previousPostData
            }
        },
        onError: (error, _post, context) => {
            console.error('Error adding product:', error);
            queryClient.setQueryData([ "products", gender, age, size, clothingType ], context.previousPostData)
        },
        onSettled: () => {
            queryClient.invalidateQueries([ "products", gender, age, size, clothingType ]);
        }
    });


const handleChange = (e) => {
    const mimetypes = ["image/png", "image/jpeg", "image/jpg"]

    if (e.target.files[0] && mimetypes.includes(e.target.files[0].type)){
        setFile(URL.createObjectURL(e.target.files[0]));
        setApiFile(e.target.files[0])
    }
}

const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('file', apiFile);
    formData.append('name', name);
    formData.append('price', priceForm);
    formData.append('gender', genderForm);
    formData.append('age', ageForm);
    formData.append('size', sizeForm);
    formData.append('clothingType', bundleForm);

    if ( !apiFile || !name || !priceForm ) {
        console.log("No empty fields allowed")
    } else {
        mutation.mutate(formData)
        setName('')
        setFile(undefined)
        setPriceForm('')
    }
}

  return (
    <section>
    <div>
    {file && 
    <Image
        fill
        alt="Product Image Not Accessible"
        style={{ objectFit: "cover" }}
        src={file}
    />}
    </div>
    <form onSubmit={handleSubmit}>

        <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleChange}

        />
        <input
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
        />
        <input
            type="text"
            onChange={e => setPriceForm(e.target.value)}
            value={priceForm}
        />
        <select onChange={e => setGenderForm(e.target.value)}>
            <option value="M">Man</option>
            <option value="F">Woman</option>
        </select>
        <select onChange={e => setAgeForm(e.target.value)}>
            <option value="Toddler">Toddler</option>
            <option value="Teenager">Teenager</option>
            <option value="Adult">Adult</option>
        </select>
        <select onChange={e => setSizeForm(e.target.value)}>
            <option value="SM">Small</option>
            <option value="MD">Medium</option>
            <option value="LG">Large</option>
        </select>
        <select onChange={e => setBundleForm(e.target.value)}>
            <option value="Bundle">Bundle</option>
            <option value="Shirts">Shirts</option>
            <option value="Pants">Pants</option>
            <option value="Accesories">Accesories</option>
        </select>
        {( !apiFile || !name || !priceForm ) ? (
            <button className='closed'>
                Submit Product
            </button>
        ) : (
            <button type="submit" className='open'>
                Submit Product
            </button>
        )}

    </form>
    </section>   
  )
}

export default AddProduct