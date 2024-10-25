"use client"

import Image from 'next/image'
import { useState } from 'react'
import { useMutation  } from '@tanstack/react-query'




const AddProduct = () => {
const [file, setFile] = useState(undefined)

const [apiFile, setApiFile] = useState(undefined)
const [name, setName] = useState(undefined)
const [price, setPrice] = useState(undefined)
const [gender, setGender] = useState("M")
const [age, setAge] = useState("Toddler")
const [size, setSize] = useState("SM")
const [bundle, setBundle] = useState("Bundle")

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const response = await fetch('http://192.168.1.15:3001/api/products/v1/add_product', {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        },
        onSuccess: (data) => {
            console.log('Product added:', data);
        },
        onError: (error) => {
            console.error('Error adding product:', error);
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
    formData.append('price', price);
    formData.append('gender', gender);
    formData.append('age', age);
    formData.append('size', size);
    formData.append('clothingType', bundle);

    if ( !apiFile || !name || !price ) {
        console.log("No empty fields allowed")
    } else {
        mutation.mutate(formData)
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
        />
        <input
            type="text"
            onChange={e => setPrice(e.target.value)}
        />
        <select onChange={e => setGender(e.target.value)}>
            <option value="M">Man</option>
            <option value="F">Woman</option>
        </select>
        <select onChange={e => setAge(e.target.value)}>
            <option value="Toddler">Toddler</option>
            <option value="Teenager">Teenager</option>
            <option value="Adult">Adult</option>
        </select>
        <select onChange={e => setSize(e.target.value)}>
            <option value="SM">Small</option>
            <option value="M">Medium</option>
            <option value="LG">Large</option>
        </select>
        <select onChange={e => setBundle(e.target.value)}>
            <option value="Bundle">Bundle</option>
            <option value="Shirts">Shirts</option>
            <option value="Pants">Pants</option>
            <option value="Accesories">Accesories</option>
        </select>
        {( !apiFile || !name || !price ) ? (
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