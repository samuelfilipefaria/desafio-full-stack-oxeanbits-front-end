import { useEffect, useState } from "react";
import axios from "axios";
import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { Input, Rating } from "@progress/kendo-react-inputs";
import { ComboBox } from "@progress/kendo-react-dropdowns";

export const RatingMovies = () => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("user_token");

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState({});
  const [newRating, setNewRating] = useState("");

  const [itemsToRate, setItemsToRate] = useState([]);

  const addToItemsToRate = () => {
    let currentItemsToRate = itemsToRate;
    currentItemsToRate.push({
      movie: selectedMovie,
      score: newRating
    });
    setSelectedMovie("");
    setNewRating("");
    setItemsToRate(currentItemsToRate);
  }

  const rateAllMovies = () => {
    console.log("aqui");
    console.log(itemsToRate.map((movieToRate) => {return {movie_id: movieToRate.movie.id, score: movieToRate.score}}));
    axios.post('http://127.0.0.1:3000/movies/bulk_rating', {
      rating_params: itemsToRate.map((itemToRate) => {return {movie_id: itemToRate.movie.id, score: itemToRate.score}}),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
    });
  }

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/movies")
    .then(function (response) {
      setMovies(response.data);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
    })
  }, []);

  const findMovie = (movie) => {
    setSelectedMovie(movies[parseInt(movie[0]) - 1]);
  }

  return(
    <div style={{textAlign: "center"}}>
      <Form onSubmit={rateAllMovies} render={formRenderProps => <FormElement>
        <ComboBox
          data={movies.map((movie, index) => `${index + 1}° - ${movie.title}`)}
          label="Qual filme avaliar"
          size="small"
          style={{width: "500px"}}
          clearButton={false}
          onChange={(e) => findMovie(e.value)}
        />

        <FieldWrapper>
          <div className='k-form-field-wrap'>
            <Rating max={10} min={1} required onChange={(e) => setNewRating(e.value)}/>
          </div>
        </FieldWrapper>
      </FormElement>} />

        <br/>

        <button onClick={() => {addToItemsToRate()}} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
          Add movie to movies to import
        </button>
        <div>
          <h4>Movies to import:</h4>
          <ul>
          {itemsToRate.map((item, index) => (
            <li key={index}>
              Title: {item.movie.title} | Rating: {item.score}
            </li>
          ))}
          </ul>
        </div>
        <button onClick={() => {rateAllMovies()}} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
          Finish and rate all movies
        </button>
    </div>
  );
}
