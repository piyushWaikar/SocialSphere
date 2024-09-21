"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBox = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const searchInput = async (e: React.FormEvent) => {
    e.preventDefault();

    const encodedSearchQuery = encodeURI(search);
    router.push(`/profile/${encodedSearchQuery}`);
    setSearch("");
  };
  return (
    <div>
      {" "}
      <form
        onSubmit={searchInput}
        className="hidden xl:flex items-center bg-slate-100 p-2 rounded-xl"
      >
        <input
          value={search}
          type="text"
          placeholder="search..."
          className="bg-transparent outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image src="/search.png" alt="" width={14} height={14} />
      </form>
    </div>
  );
};

export default SearchBox;
