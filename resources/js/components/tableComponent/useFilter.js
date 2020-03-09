import React, { useState, useEffect } from "react";

const useFilter = data => {
  const [rows, setRows] = useState([]);
  const [find, setFind] = useState("");

  const setFilter = val => {
    setFind(val);
  };

  useEffect(() => {
    let filteredData = [];
    if (typeof data !== "undefined" && typeof find !== "undefined") {
      filteredData = data.filter(
        val => val.title.toLowerCase().indexOf(find.toLowerCase()) !== -1
      );
    }

    setRows(filteredData);
  }, [data, find]);

  return {
    rows,
    setFilter
  };
};

export default useFilter;
