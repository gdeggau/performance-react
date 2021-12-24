import type { NextPage } from "next";
import { FormEvent, useCallback, useState } from "react";
import { SearchResult } from "../components/SearchResult";
import { Product, ProductWithPriceFormatted } from "../types";

interface Result {
  totalPrice: number;
  results: Array<ProductWithPriceFormatted>;
}

const Home: NextPage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result>({
    results: [],
    totalPrice: 0,
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const products: Array<ProductWithPriceFormatted> = data.map(
      (product: Product) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      })
    );

    const totalPrice = data.reduce((total: number, product: Product) => {
      return total + product.price;
    }, 0);
    setResults({
      totalPrice,
      results: products,
    });
  }

  const handleAddToWishList = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResult
        results={results?.results}
        totalPrice={results?.totalPrice}
        onAddToWishList={handleAddToWishList}
      />
    </div>
  );
};

export default Home;
