import { Box, Button, Input } from "@mui/material";
import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import BookCard from "../components/BookCard";

type items = {
  id: string;
  volumeInfo: {
    authors: string[];
    language: string;
    title: string;
    publishedDate: string;
  };
};

type SearchResults = {
  items: items[];
  totalItems: number;
};

const Books = () => {
  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // const [searchParams, setSearchParams] = useSearchParams();

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = e.currentTarget.search.value;
    Search(search);
  };
  const Search = async (search: string) => {
    setIsLoading(true);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.NEXT_PUBLIC_KEY}`
    );
    const data = await res.json();

    setSearchResults(data as SearchResults);
    setIsLoading(false);
    router.push("/books?q=" + search);
  };
  useEffect(() => {
    const q = router.query.q || router.asPath.split("q=")[1];
    if (q) {
      // @ts-ignore
      Search(q);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center scroll pt-2">
      <form onSubmit={(e) => onSearch(e)} className="mb-2">
        <Input type="text" name="search" placeholder="Search" />
        <Button type="submit">search</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {searchResults ? (
          searchResults.totalItems != 0 ? (
            searchResults.items.map((item, i) => (
              <BookCard
                key={i}
                id={item.id}
                title={item.volumeInfo.title}
                publishedDate={item.volumeInfo.publishedDate}
                authors={item.volumeInfo.authors}
              />
            ))
          ) : (
            <p>No Results Found</p>
          )
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Books;
