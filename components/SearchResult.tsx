import { ProductWithPriceFormatted } from "../types";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";

interface SearchResultProps {
  results: Array<ProductWithPriceFormatted>;
  totalPrice: number;
  onAddToWishList: (id: number) => void;
}

export function SearchResult({
  results,
  onAddToWishList,
  totalPrice,
}: SearchResultProps) {
  const rowRenderer: ListRowRenderer = ({ style, index, key }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishList={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <>
      <div>
        <List
          height={300}
          rowHeight={25}
          width={900}
          overscanRowCount={5}
          rowCount={results.length}
          rowRenderer={rowRenderer}
        />
      </div>
      <h3>Total: {totalPrice}</h3>
    </>
  );
}
