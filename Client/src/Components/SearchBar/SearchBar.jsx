import {useState} from "react";
import style from "./SearchBar.module.css";
import "boxicons";

export default function SearchBar({onSearch}) {
  const [id, setId] = useState("");

  function handleSearch () {
    onSearch(id);
    setId("");
  }

  function changeHandler(event) {
    setId(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
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
      />
      <button onClick={handleSearch}>
       Search
      </button>
    </div>
  );
}
