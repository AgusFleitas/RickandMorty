import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Detail = () => {

    const {id} = useParams()
    const [character, setCharacter] = useState({})

    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);

    return (
        <div>
         <h1>Esto es el Detail.</h1>
        </div>
    )
}

export default Detail;