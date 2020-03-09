import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./table";

const Home = props => {
  const [fetching, setFetching] = useState(false);
  const [titles, setTitles] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [tableRef, setTableRef] = useState({ selected: [] });

  useEffect(() => {
    socket.on(`progress_start`, (key, end, start) => {
      console.log("start");
    });
    socket.on(`progress_update`, (key, current) => {
      console.log("update");
    });
    socket.on(`progress_stop`, key => {
      console.log("end");
    });
  }, []);

  useEffect(() => {
    setFilteredItems(titles);
  }, [titles]);

  useEffect(() => {
    setFilteredItems(old => {
      return titles.filter(
        str => str.titwle.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      );
    });
  }, [filter]);

  const getSubmitSelected = e => {
    e.preventDefault();
    const { selected } = tableRef;
    const selectedHrefs = selected.map(el => el.href);

    axios.post("/service/chapters", { manga: selectedHrefs }).then(response => {
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
              <div className="overflow-auto" style={{ height: "400px" }}>
                <Table data={titles} init={setTableRef} />
              </div>
              <button className="btn btn-primary" onClick={getSubmitSelected}>
                Fetch Details
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
