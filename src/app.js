import {useState, useEffect} from 'react';
import './app.css';
import MovieCard from './moviecard';
// 9ca92cdd
 

const API_URL = 'http://www.omdbapi.com/?apikey=9ca92cdd&'

const App = () => {
    const [movies, SetMovies] = useState([]);
    const [SearchTerm, SetSearchTerm] = useState('');

    const SearchMovie = async (title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        SetMovies(data.Search);
    }
    useEffect(() => {
        SearchMovie('batman');
    }, []);

    return (
        <div className='app'>
            <h1>Mooooovie</h1>

            <div className='search'>
                <input
                    placeholder='search for movies'
                    value={SearchTerm}
                    onChange={(e) => SetSearchTerm(e.target.value)}
                />
                <img
                    src={require('./search.svg').default}
                    alt='search'
                    onClick={() => SearchMovie(SearchTerm)}
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
                        <h2>No movies found T.T</h2>
                    </div>
                    )
            }
        </div>
    )
}

export default App;