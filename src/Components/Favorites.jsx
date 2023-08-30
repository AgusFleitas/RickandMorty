import Card from "./Card";
import { connect } from "react-redux";

const Favorites = ({ myfavorites }) => {
  return (
    <div>
      {myfavorites?.map((fav) => {
        return (
          <Card
            key={fav.id}
            id={fav.id}
            name={fav.name}
            status={fav.status}
            species={fav.species}
            gender={fav.gender}
            origin={fav.origin.name}
            image={fav.image}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myfavorites: state.myfavorites,
  };
};

export default connect(mapStateToProps, null)(Favorites);
