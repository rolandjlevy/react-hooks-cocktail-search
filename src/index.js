import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";

import SearchForm from "./SearchForm";

import "./styles.css";

const CocktailList = ({ cocktails }) => (
  <ul>
    {cocktails.map(item => (
      <li key={item.idDrink}>{item.strDrink}</li>
    ))}
  </ul>
);

const COCKTAIL_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php";

const useCocktails = query => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [results, setResults] = useState([]);

  useEffect(
    () => {
      if (!query) {
        return;
      }

      setLoading(true);
      setError();
      fetch(`${COCKTAIL_URL}?s=${query}`)
        .then(res => res.json())
        .then(({ drinks }) => {
          setLoading(false);
          setError();
          setResults(drinks);
        })
        .catch(setError);
    },
    [query]
  );

  return [results, loading, error];
};

function App() {
  const [query, setQuery] = useState("");
  const [cocktails, loading, error] = useCocktails(query);

  return (
    <div className="App">
      <h1>Cocktail Search</h1>
      <p>Search for cocktails by name:</p>
      <SearchForm onSearch={setQuery} />
      {loading ? (
        <p>Loading&hellip;</p>
      ) : (
        <CocktailList cocktails={cocktails} />
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
