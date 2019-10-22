import React, { useState, createContext } from "react";

export const AnnualDataContext = createContext({});

export const AnnualDataProvider = ({ children }) => {
  const [annualData, setAnnualData] = useState({});
  return (
    <AnnualDataContext.Provider value={[annualData, setAnnualData]}>
      {children}
    </AnnualDataContext.Provider>
  );
};
