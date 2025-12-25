import type { IProductCardProps } from "../types/products.ts";

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
    <div className="flex flex-col h-100 w-80 m-4 p-2 rounded-2xl bg-brand justify-center items-center text-surface">
      {brand}
      <div className="flex flex-row font-bold mb-2 text-center">
        <p>
          {name}
          {attributes()}
        </p>
      </div>
      <img className="rounded-sm w-auto h-48 my-2" src={cover} alt={name}></img>
      <p className="my-2">${price}</p>
      <button className="rounded-full bg-brand-dark hover:bg-brand-light hover:cursor-pointer my-2 px-4 py-2">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
