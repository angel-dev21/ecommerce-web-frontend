import { useParams } from "react-router";
import MainLayout from "../layouts/MainLayout";
import { useEffect, useState } from "react";
import type { IProductDetail } from "../types/products";
import img from "../assets/600x600.png";

const ProductDetail = () => {
  const params = useParams();

  const [data, setData] = useState<IProductDetail | null>(null);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    fetch(`http://localhost:8080/products/detail/${params.id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [params.id]);

  const showAttributes = () => {
    if (data == null) {
      return <div>Error...</div>;
    } else {
      const options = data.productSkuDto.map((sku) => {
        return (
          <button
            key={sku.id}
            id={sku.id.toString()}
            onClick={() => setSelected(sku.id)}
            className={
              sku.id == selected
                ? "rounded-full bg-brand-light border-brand-dark text-white hover:cursor-pointer my-2 mx-1 px-4 py-2"
                : "rounded-full bg-brand-dark hover:bg-brand-light text-white hover:cursor-pointer my-2 mx-1 px-4 py-2"
            }
          >
            {sku.productAttributeDto.map((attr) => attr.value).join(" ")}
          </button>
        );
      });

      return (
        <div className="flex flex-row justify-center py-4">
          <div className="flex flex-col px-4">
            <img src={img} />
          </div>
          <div className="flex flex-col px-4">
            <div className="max-w-96">
              <p className="font-bold">{data.brand}</p>
              <p>{data.name}</p>
              <div className="flex-row">{options}</div>
              <p>Price: $/. {data.productSkuDto[0].price}</p>
              <p>Description: {data.description} </p>
            </div>
            <button className="rounded-full bg-brand-dark hover:bg-brand-light text-white hover:cursor-pointer px-4 my-2 py-2">
              Add to cart
            </button>
          </div>
        </div>
      );
    }
  };

  return <MainLayout>{showAttributes()}</MainLayout>;
};

export default ProductDetail;
