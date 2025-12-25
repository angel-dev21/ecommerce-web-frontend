interface IProductData {
  content: Array<IProduct>;
  page: IPage;
}

interface IPage {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface IProduct {
  id: number;
  name: string;
  brand: string;
  productSkuDto: Array<IProductSku>;
}

interface IProductSku {
  id: number;
  price: number;
  cover: string;
  productAttributeDto: Array<IProductAttribute>;
}

interface IProductAttribute {
  type: string;
  value: string;
}

interface IProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  cover: string;
  productAttributeDto: Array<IProductAttribute>;
}

export type {
  IProductData,
  IProduct,
  IProductSku,
  IProductAttribute,
  IProductCardProps,
};
