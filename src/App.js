import { useEffect, useState } from 'react'

import MovieCard from './MovieCard';
import './App.css';
import searchIcon from './search.svg';


const apiURL = 'http://www.omdbapi.com?apikey=bea81990'


const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState();

    const searchMovies = async (title) => {
        const response = await fetch(`${apiURL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('batman')
    }, []);

    return (
        <div className='app'>
            <h1>Movie Beach</h1>

            <div className='search'>
             <input 
                placeholder='search for movies' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
             <img 
                src={searchIcon} 
                alt='search' 
                onClick={() => searchMovies(searchTerm)}
             />
            </div>
            {movies?.length > 0 
                ? (
                  <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                  </div>
                    ) : (
                    <div className='empty'>
                      <h2>No movies found</h2>
                    </div>
                )}           
        </div>
    );
}

export default App;
