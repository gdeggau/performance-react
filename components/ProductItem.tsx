import { memo, useState } from "react";
import { ProductWithPriceFormatted } from "../types";
import dynamic from "next/dynamic";
import { AddProductToWishListProps } from "./AddProductToWishList";
import lodash from "lodash";

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    return import("./AddProductToWishList").then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    loading: () => <span>Loading...</span>,
  }
);

interface ProductItemProps {
  product: ProductWithPriceFormatted;
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Add to wish list
      </button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);
