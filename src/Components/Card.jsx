import { Link } from "react-router-dom";
import { addFav, removeFav } from "../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

function Card({ id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myfavorites}) {

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if(isFav) {
         setIsFav(false);
         removeFav(id);
      } else {
         setIsFav(true);
         addFav({id, name, status, species, gender, origin, image});
      }
   }

   useEffect(() => {
      myfavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myfavorites]);
   
   return (
      <div>
         <button onClick={handleFavorite}>{isFav ? "❤️" : "🤍"}</button>
         <button onClick={() => {onClose(id)}}>X</button>
         <Link to={`/detail/${id}`}>
            <h2>{name}</h2>
         </Link>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <h2>{status}</h2>
         <h2>{origin.name}</h2>
         <img src={image} alt='' />
      </div>
   );
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => dispatch(addFav(character)),
      removeFav: (id) => dispatch(removeFav(id)),
   };
};
const mapStateToProps = (state) => {
   return {
      myfavorites: state.myfavorites
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);