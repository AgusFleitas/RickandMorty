import {useState} from "react";
import { useLocation } from "react-router-dom";

import "boxicons";

import style from "./SearchBar.module.css";

export default function SearchBar({onSearch}) {
  const location = useLocation()

  const [id, setId] = useState("");

  function handleSearch () {
    onSearch(id);
    setId("");
  }

  function changeHandler(event) {
    setId(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && id !== "") {
      onSearch(id);
      setId("")
    }
  }

  return (
    <div className={style.Search}>
      <input
        type="search"
        title="Type a number from 1 to 826 then click on 'Search' button or press Enter key to add the character."
        onChange={changeHandler}
        onKeyDown={handleKeyPress}
        value={id}
        placeholder="Number from 1 to 826"
        disabled={location.pathname !== "/home"}
      />
      <button onClick={handleSearch} disabled={(location.pathname !== "/home") || (id === "")}>
       Search
      </button>
    </div>
  );
}
