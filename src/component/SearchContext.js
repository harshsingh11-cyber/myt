import React, { createContext, useState } from 'react';
export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const[page,setPage] = useState();


  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  const upDatepage = (el)=>{
    setPage(el);
  }

  const contextValue = {
    searchResults,
    updateSearchResults,
    page,
    upDatepage,
  };

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
