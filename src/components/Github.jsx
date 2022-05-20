import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const getGithubUser = (q = "", page = 1) => {
  return axios("https://api.github.com/search/repositories", {
    method: "GET",
    params: {
      q,
      per_page: 5,
      page,
    },
  });
};

export const Github = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("masai");
  const [page, setPage] = useState(1);

  console.log(data.items);
  //  console.log(query);

  //  axios(" https://api.github.com/search/users", {
  //    params: {
  //      q: "goriens",
  //    },
  //  })
  //    .then((response) => {
  //      setData(response.data);
  //    })
  //    .catch((err) => {
  //      setError(true);
  //      console.log(err);
  //    });
  const handleClick = (q) => {
    setQuery(q);
  };
  //  const handlePageChange = (page) => {
  //
  //  }
  useEffect(() => {
    setLoading(true);
    getGithubUser(query, page)
      .then((response) => {
        setLoading(false);
        setData(response.data);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  }, [query, page]);

  return (
    <div>
      <h2>GitHub Repositories</h2>
      {loading && <div>...loading</div>}
      {error && <div>...error</div>}
      <SearchBox handleClick={handleClick} />
      {data?.items?.map((item) => (
        <GithubCard key={item.id} {...item} />
      ))}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

const SearchBox = ({ handleClick }) => {
  const [text, setText] = useState("");
  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleClick(text)}>Search</button>
    </div>
  );
};

const GithubCard = ({ owner, name, size, visibility }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "400px",
        margin: "auto",
        display: "flex",
        gap: "2rem",
        padding: "10px",
      }}
    >
      <img src={owner.avatar_url} width="110px" alt={name} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>Name: {name}</div>
        <div>Size: {size} KB</div>
        <div>Visibility: {visibility}</div>
      </div>
    </div>
  );
};
