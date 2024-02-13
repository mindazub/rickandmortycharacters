import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (let page = 1; page <= 42; page++) {
          const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
          const data = await response.json();
          console.log(data)
          setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ul className='character-list'>
    {characters.map(character => (
      <li className='character-item' key={character.id}>
        <img src={character.image} />
        <p>{character.name}</p>
      </li>
    ))}
  </ul>
    </div>
  );
}

export default App
