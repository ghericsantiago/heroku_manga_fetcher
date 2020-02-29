import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = props => {
  const [fetching, setFetching] = useState(false);
  const [titles, setTitles] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems(titles);
  }, [titles]);

  useEffect(() => {
    setFilteredItems(old => {
      return titles.filter(
        str => str.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      );
    });
  }, [filter]);

  const getTitles = e => {
    e.preventDefault();

    axios.get("/service/titles").then(response => {
      setTitles(response.data);
      setFetching(false);
    });
  };

  return (
    <div className="container">
      <h1>Manga Fetcher</h1>
      <form>
        <div className="form-group">
          <label for="exampleFormControlSelect1">Select Source</label>
          <select className="form-control" id="exampleFormControlSelect1">
            <option value="">Select One</option>
            <option value="mangareader">Mangareader</option>
            <option value="mangafox">Mangafox</option>
          </select>
        </div>
        <button
          className="btn btn-primary"
          onClick={e => {
            getTitles(e);
            setFetching(true);
          }}
          disabled={fetching}
        >
          Fetch Titles
        </button>
      </form>

      {titles.length > 0 && (
        <>
          <h2>Titles ({filteredItems.length})</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Seach"
              onChange={e => setFilter(e.target.value)}
            />
          </div>
          <div className="overflow-auto" style={{ height: "400px" }}>
            <form>
              {filteredItems &&
                filteredItems.map(item => (
                  <div className="form-check">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      value={item.href}
                    />
                    <label class="form-check-label">{item.title}</label>
                  </div>
                ))}
            </form>
          </div>
          <button className="btn btn-primary mt-4">Fetch Chapters</button>
        </>
      )}
    </div>
  );
};

export default Home;
