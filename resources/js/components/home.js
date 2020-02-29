import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = props => {
  const [fetching, setFetching] = useState(false);
  const [titles, setTitles] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [chapters, setChapters] = useState([]);

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

  const getSubmitSelected = e => {
    e.preventDefault();
    const selected = [];
    for (let checkbox of document.querySelectorAll(
      "input[type=checkbox]:checked"
    )) {
      selected.push(checkbox.value);
    }
    axios.post("/service/chapters", { manga: selected }).then(response => {
      setChapters(response.data);
    });
  };

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
      <div className="row">
        <div className="col-md-6">
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
                          name="manga[]"
                          type="checkbox"
                          class="form-check-input"
                          value={item.href}
                        />
                        <label class="form-check-label">{item.title}</label>
                      </div>
                    ))}
                </form>
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={getSubmitSelected}
              >
                Fetch Manga Details
              </button>
            </>
          )}
        </div>
        <div className="col-md-6">
          <h2>Manga Details ({chapters.length})</h2>
          <div className="overflow-auto" style={{ height: "400px" }}>
            {chapters.length > 0 &&
              chapters.map(chapter => (
                <div className="card bg-light mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{chapter.name}</h5>
                    <p class="card-text">
                      <small class="text-muted">Author: {chapter.author}</small>
                    </p>
                    <p class="card-text">
                      <small class="text-muted">Artist: {chapter.artist}</small>
                    </p>
                    <p class="card-text">
                      <small class="text-muted">
                        Year: {chapter.release_year}
                      </small>
                    </p>
                    <p class="card-text">
                      <small class="text-muted">Status: {chapter.status}</small>
                    </p>
                    <p class="card-text">
                      <small class="text-muted">
                        Reading Direction: {chapter.readingDirection}
                      </small>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
