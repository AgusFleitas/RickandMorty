import Cards from "../Components/Cards";
import { useSelector, useDispatch } from "react-redux";
import { filterCards, orderCards, reset } from "../redux/actions/actions";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.myfavorites);

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  };

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };

  function resetHandler() {
    dispatch(reset());
  }

  return (
    <div>
      <select onChange={handleFilter}>
        {["Male", "Female", "unknown", "Genderless"].map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <select onChange={handleOrder}>
        {["Ascendente", "Descendente"].map((order) => (
          <option key={order} value={order}>
            {order}
          </option>
        ))}
      </select>
      <button onClick={resetHandler}>Remove Filters</button>
      <Cards characters={favorites} />
    </div>
  );
};

export default Favorites;
