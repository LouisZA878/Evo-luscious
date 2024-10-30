import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";


const Items = ({ products_url, age, gender, name, pictureID, price, size, stock }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product_image", pictureID],
    queryFn: async () => {
      const response = await fetch(`${products_url}/images?imageID=${pictureID}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const base64String = await response.json()
      return base64String;
    },
  });

  if (isError) {
    return <div>Error fetching image...</div>;
  }
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
        <div>Gender: {gender}</div>
        <div>Size: {size}</div>
        <div>Av: {stock}</div>
        <div>Age: {age}</div>
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
