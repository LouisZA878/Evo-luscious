import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaTrash } from "react-icons/fa";

const Items = ({ products_url, name, pictureID, gender, age, size, clothingType, productID, price, stock }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product_image", pictureID],
    queryFn: async () => {
      const response = await fetch(`${products_url}/images?imageID=${pictureID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const base64String = await response.json()
      return base64String;
    },
  });

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (bodyData) => {
        const response = await fetch(`${products_url}/delete_product`, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify(bodyData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        
        return response.json();
    },
    onSuccess: (data) => {
        console.log(data)
    },
    onMutate: async (newProducts) => {
        await queryClient.cancelQueries([ "products", gender, age, size, clothingType ]);
        // const previousPostData = queryClient.getQueryData([ "products", gender, age, size, clothingType ]);
        // console.log(newProducts)
        // const formDataToObject = (formData) => {
        //     const obj = {};
        //     formData.forEach((value, key) => {
        //         obj[key] = value;
        //     });
        //     return obj;
        // };
        // const newProductsObj = formDataToObject(newProducts)

        // queryClient.setQueryData([ "products", gender, age, size, clothingType ], (oldProducts) => {
        //     const stuff = formDataToObject(oldProducts)
        //     console.log( oldProducts )
           
        //     let state
            
        //     if ( oldProducts ) {
        //         state = {
        //             productsAmount: oldProducts.productsAmount,
        //             ...oldProducts,
        //             products: [...oldProducts.products, { ...newProductsObj }]
        //         }
        //     }
    //         if ( !oldProducts ) {
    //             state = {
    //                 productsAmount: 1,
    //                 products: [{ ...newProductsObj }]
    //             }
    //         }
        //     return state
        // })

        // return {
        //     previousPostData
        // }
    },
    onError: (error, _post, context) => {
        console.error('Error adding product:', error);
        queryClient.setQueryData(["products"], context.previousPostData)
    },
    onSettled: () => {
        queryClient.invalidateQueries([ "products", gender, age, size, clothingType ]);
    }
});

  return (
    <ul className="items" key={pictureID}>
      <li>
        {!isLoading ? (
          <Image
            src={`data:${data.mime};base64,${data.picture}`}
            fill
            alt="Product Image"
            style={{ objectFit: "cover" }}
          />
        ): <div>Loading Image...</div>}
      </li>
      <li>
        <div>{name}</div>
        <div>${price}</div>
        <div>Av: {stock}</div>
      </li>
      <li onClick={() => mutation.mutate({
          productID,
          imageID: pictureID
        })}>
        <button >
          <FaTrash />
        </button>     
      </li>
      <li>
        <button>
          <FaPlus />
        </button>
      </li>

    </ul>
  );
};

export default Items;
