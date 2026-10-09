import { Link } from "react-router";
import type { IProductCardProps } from "../types/products.ts";
import img from "../assets/600x600.png"

const ProductCard = ({
  id,
  name,
  brand,
  price,
  cover,
  productAttributeDto,
}: IProductCardProps) => {
  const attributes = () => {
    return productAttributeDto.map((attributes) => (
      <span
        className="inline-flex"
        key={`${id}-${attributes.type}-${attributes.value}`}
      >
        {`, ${attributes.value}`}
      </span>
    ));
  };

  return (
    <div className="p-6">
      <Link to={`/Products/${id}`}>
        <div className="flex flex-col h-full w-80 p-2 rounded-2xl justify-center items-center hover:shadow-lg/30 bg-brand text-surface">
          <p>{brand}</p>
          <div className="flex flex-row font-bold mb-2 text-center">
            <p>
              {name}
              {attributes()}
            </p>
          </div>
          <img
            className="rounded-sm w-auto h-48 my-2"
            src={img}
            alt={name}
          ></img>
          <p className="my-2">${price}</p>
          <button className="rounded-full bg-brand-dark hover:bg-brand-light hover:cursor-pointer my-2 px-4 py-2">
            Add to cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
