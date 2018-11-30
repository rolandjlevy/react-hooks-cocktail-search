import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSearch(query);
      }}
    >
      <label>
        Name:
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
      </label>
    </form>
  );
};

export default SearchForm;
