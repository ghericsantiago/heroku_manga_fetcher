import React, { useState, useEffect } from "react";
import usePaginator from "./tableComponent/usePaginator";
import useFilter from "./tableComponent/useFilter";

const useRowSelect = data => {
  const [selected, setSelected] = useState([]);

  const select = e => {
    if (e.target.checked === true) {
      let target = e.target;
      const item = data.find(el => el.href == target.dataset.href);

      setSelected(old => {
        return [...old, item];
      });
    } else {
      let target = e.target;
      const item = data.find(el => el.href == target.dataset.href);
      setSelected(old => {
        return old.filter(el => el != item);
      });
    }
  };

  const selectAll = e => {
    if (e.target.checked) {
      setSelected(data);
    } else {
      setSelected([]);
    }
  };

  const isChecked = item => {
    return typeof selected.find(el => el == item) != "undefined";
  };

  return {
    selected,
    select,
    selectAll,
    isChecked
  };
};

const Table = ({ data, init }) => {
  const { rows, setFilter } = useFilter(data);
  const { selected, select, selectAll, isChecked } = useRowSelect(rows);
  const {
    rows: rows2,
    currentPage,
    next,
    prev,
    first,
    last,
    changeLimit,
    maxPage
  } = usePaginator(rows);

  useEffect(() => {
    init({
      selected,
      rows: rows2,
      currentPage,
      next,
      prev,
      first,
      last,
      changeLimit,
      maxPage
    });
  }, [
    selected,
    rows2,
    currentPage,
    next,
    prev,
    first,
    last,
    changeLimit,
    maxPage
  ]);

  return (
    <div>
      <table className="table">
        <tr>
          <th style={{ width: "20px" }}>
            <input type="checkbox" onChange={selectAll} value="1" />
          </th>
          <th>Name</th>
        </tr>
        {rows2.map((row, index) => (
          <tr key={index}>
            <td scope="row">
              <input
                type="checkbox"
                data-href={row.href}
                onChange={select}
                checked={isChecked(row)}
              />
            </td>
            <td>
              <div>{row.title}</div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
