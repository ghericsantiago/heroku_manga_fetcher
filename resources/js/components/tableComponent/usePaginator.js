import React, { useState, useEffect } from "react";

const usePaginator = data => {
  const [rows, setRow] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [index, setIndex] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setLimit(10);
  }, []);

  useEffect(() => {
    setMaxPage(Math.max(Math.floor(data.length / limit), 0));
  }, [data, limit]);

  useEffect(() => {
    setRow(data.slice(index, index + limit));
  }, [data, index, limit]);

  useEffect(() => {
    setIndex(currentPage * limit);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(old => Math.max(0, Math.min(old - 1, maxPage - 1)));
  }, [maxPage]);

  const next = () => {
    setCurrentPage(old => Math.max(0, Math.min(old + 1, maxPage - 1)));
  };

  const prev = () => {
    setCurrentPage(old => Math.max(old - 1, 0));
  };

  const last = () => {
    setCurrentPage(maxPage - 1);
  };

  const first = () => {
    setCurrentPage(0);
  };

  const changeLimit = value => {
    setLimit(parseInt(value));
  };

  return {
    rows,
    currentPage,
    index,
    limit,
    maxPage,
    next,
    prev,
    first,
    last,
    changeLimit
  };
};

export default usePaginator;
