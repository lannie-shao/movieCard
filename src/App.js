import { useState,useEffect } from 'react';
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_URL='http://www.omdbapi.com/?i=tt3896198&apikey=f0d09f8a';

function App() {
  const [movies,setMovies]=useState(null);
  const [searchTerm,setSearchTerm]=useState('');

  const SearchMovies=async(title)=>{
    const response= await fetch(`${API_URL}&s=${title}`);
    const data=await response.json();
    setMovies(data.Search);
  };

  useEffect(()=>{
    SearchMovies('cinder');
  },[]);

  return (
    <div className="App">
       <h1>MovieLand</h1>
      
      <div className='search'>
       <input 
        value={searchTerm} 
        onChange={(e)=>{setSearchTerm(e.target.value)}}
        placeholder='Search for movies'        
       />
       <img 
        src={searchIcon} 
        alt="search"  
        onClick={()=>{SearchMovies(searchTerm)}}       
       />
      </div>

      {movies?.length>0
        ? (
          <div className='container'>
           {movies.map((movie)=>(
             <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )}
    </div>
  );
};

export default App;
