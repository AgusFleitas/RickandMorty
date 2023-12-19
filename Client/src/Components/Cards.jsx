import Card from "./Card";


export default function Cards({characters}) {
  console.log(characters);
  return (
    <div>
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
}
