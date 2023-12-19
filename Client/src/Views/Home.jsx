import { useSelector } from "react-redux";
import Cards from "../Components/Cards";


const Home = () => {
    const characters = useSelector((state) => state.allCharacters)
    return (
        <>
            <Cards characters={characters}/>
        </>
    )
}

export default Home;