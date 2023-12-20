import Card from "../Card/Card";

import style from "./Cards.module.css";

export default function Cards({characters}) {
  return (
    <div className={style.cardsDisplay}>
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}
