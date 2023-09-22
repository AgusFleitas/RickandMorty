import {useState} from "react";
import style from "./SearchBar.module.css";

export default function SearchBar({onSearch}) {
  const [id, setId] = useState("");

  function changeHandler(event) {
    setId(event.target.value);
  }

  return (
    <div className={style.Search}>
      <input
        type="search"
        onChange={changeHandler}
        value={id}
        placeholder="Search Character"
      />
      <button
        onClick={() => {
          onSearch(id);
        }}
      >
        Add
      </button>
    </div>
  );
}
