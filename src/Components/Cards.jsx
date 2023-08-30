import Card from './Card';

export default function Cards({characters, onClose}) {

   return (
    <div>
      {characters.map((character) => {
        return <Card 
          key={character.id} 
          id = {character.id}
          {...character} 
          onClose={onClose} 
        />
      })}
    </div>
   );
}
