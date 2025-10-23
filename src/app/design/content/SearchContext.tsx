// app/context/SearchContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type SearchContextType = {
  keyword: string;
  setKeyword: (val: string) => void;
  songs: any[];
  loading: boolean;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [keyword, setKeyword] = useState("the s");
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      if (!keyword.trim()) return;
      const res = await fetch(`/api/deezer?q=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      setSongs(data.data);
      setTimeout(() => setLoading(true), 1000);
    };
    fetchSongs();
  }, [keyword]);

  return (
    <SearchContext.Provider value={{ keyword, setKeyword, songs, loading }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
}
