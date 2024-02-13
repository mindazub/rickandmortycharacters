import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]); // Re-fetch data when the page state changes

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <div className="container-large">
      <h1 className="title-center">Rick and Morty Characters</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pagination-center">
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
          <ul className="character-list">
            {characters.map((character) => (
              <li className="character-item" key={character.id}>
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
              </li>
            ))}
          </ul>
          <div className="pagination-center">
            <button onClick={handlePrevPage} disabled={page === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage}>Next Page</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
