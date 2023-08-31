import Cards from "./Cards";
import { useSelector, useDispatch } from "react-redux";
import { filterCards, orderCards } from "../redux/actions";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.myfavorites)

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  }

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
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
      <Cards characters={favorites} />
    </div>
  );
};

export default Favorites;

// const mapStateToProps = (state) => {
//   return {
//     myfavorites: state.myfavorites,
//   };
// };

// export default connect(mapStateToProps, null)(Favorites);
