import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaTrash } from "react-icons/fa";

const Items = ({ products_url, name, pictureID, gender, age, size, clothingType, productID, price, stock }) => {
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
    queryClient.setQueryData([ "products", gender, age, size, clothingType ], (oldProducts) => {
      let state = {
              pageParams: oldProducts.pageParams,
              pages: oldProducts.pages.map( page => ({
                  ...page,
                  products: page.products.filter( item => newProducts.productID !== item._id)
              }))
          } 
      return state
    })
    
    
    },
    onError: (error, _post, context) => {
        console.error('Error adding product:', error);
        queryClient.setQueryData([ "products", gender, age, size, clothingType ], context.previousPostData)
    },
    onSettled: () => {
        queryClient.invalidateQueries([ "products", gender, age, size, clothingType ]);
    }
});

  return (
    <ul className="items" key={productID}>
      <li>
          <Image
            src={`${products_url}/images?imageID=${pictureID}`}
            fill
            alt="Product Image"
            style={{ objectFit: "cover" }}
            priority
          />
      </li>
      <li>
        <table>
          <thead>
            <tr>
              <th colSpan="3">{name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="2">Price :</td>
              <td colSpan="1">${price}</td>
            </tr>
            <tr>
              <td colSpan="2" >Available :</td>
              <td colSpan="1" >{stock}</td>
            </tr>
          </tbody>
        </table>
      </li>
        <li >
          <button onClick={() => mutation.mutate({
            productID,
            imageID: pictureID
          })}>
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
