import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import MainLayout from "../layouts/MainLayout";
import type { IProductData } from "../types/products.ts";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Products = () => {
  const [data, setData] = useState<IProductData | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/products?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error("Error", error));
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const productsMap = () => {
    if (data == null) {
      return <div>Loading...</div>;
    } else {
      return data.content.map((product) => (
        <div key={product.id} className="flex flex-row">
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            brand={product.brand}
            price={product.productSkuDto[0].price}
            cover={product.productSkuDto[0].cover}
            productAttributeDto={product.productSkuDto[0].productAttributeDto}
          />
        </div>
      ));
    }
  };

  const pageButtons = () => {
    if (data == null) return <div>Loading...</div>;

    const FirstPage = page === 0;
    const LastPage =
      data.page.size * (data.page.number + 1) >= data.page.totalElements;

    return (
      <>
        <div className="flex flex-row justify-center gap-4">
          <button
            className={`flex justify-center items-center h-10 w-10 m-4 rounded-md ${
              FirstPage
                ? "bg-gray-400"
                : `bg-brand hover:bg-brand-light hover:cursor-pointer`
            }`}
            onClick={previousPage}
            disabled={FirstPage}
          >
            <FaArrowLeft className="text-surface" aria-label="Previous page" />
          </button>
          <button
            className={`flex justify-center items-center h-10 w-10 m-4 rounded-md ${
              LastPage
                ? "bg-gray-400"
                : "bg-brand hover:bg-brand-light hover:cursor-pointer"
            }`}
            onClick={nextPage}
            disabled={LastPage}
          >
            <FaArrowRight className="text-surface" aria-label="Next page" />
          </button>
        </div>
      </>
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-row flex-wrap justify-center">
        {productsMap()}
      </div>
      {pageButtons()}
    </MainLayout>
  );
};

export default Products;
