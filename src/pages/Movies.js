import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Window } from '@progress/kendo-react-dialogs';
import { Rating } from "@progress/kendo-react-inputs";
import { filterBy } from '@progress/kendo-data-query';

const initialFilter = {
  logic: "and",
  filters: [{
    field: "title",
    operator: "contains",
    value: ""
  }]
};

export const Movies = () => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("user_token");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});

  const [ratingFormVisibility, setRatingFormVisibility] = useState(false);
  const [newRating, setNewRating] = useState(0);

  const [filter, setFilter] = useState(initialFilter);

  const toggleRatingFormVisibility = () => {
    if (ratingFormVisibility) setSelectedMovie({});
    setRatingFormVisibility(!ratingFormVisibility);
  };

  const loadSelectedMovie = (e) => {
    setSelectedMovie(e.dataItem);
    toggleRatingFormVisibility();
  }

  const rateMovie = function() {
    if (selectedMovie.user_score == "Não avaliado") {
      axios.post('http://127.0.0.1:3000/user_movies', {
        movie_id: selectedMovie.id,
        score: newRating,
      })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
      });
    } else {
      axios.put('http://127.0.0.1:3000/user_movies/' + selectedMovie.id, {
        score: newRating,
      })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
      });
    }
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

  return(
    <div style={{textAlign: "center"}}>
      <h1>Movies Page</h1>
      <h3>Click on a movie to rate it or</h3>
      <h3><Link to="/rating-movies">Rate movies (bulk operation)</Link></h3>

      <Grid
        style={{}}
        data={filterBy(movies, filter)} filterable={true} filter={filter} onFilterChange={e => setFilter(e.filter)}
        onRowClick={loadSelectedMovie}
      >
            <GridColumn field="title" title="Title" width="250px" />
            <GridColumn field="director" title="Director(s)" width="250px" />
            <GridColumn field="average_score" title="Average Score" width="250px" />
            <GridColumn field="user_score" title="Your Score" width="250px"/>
          </Grid>;

          {ratingFormVisibility && <Window title={"Avaliar filme ''" + selectedMovie.title + "''"} onClose={toggleRatingFormVisibility} initialHeight={200} initialWidth={500}>
          <form className="k-form" style={{marginTop: "20px", textAlign: "center"}}>
            <label className="k-form-field">
              <Rating max={10} min={1} required onChange={(e) => setNewRating(e.value)} defaultValue={parseInt(selectedMovie.user_score)}/>
            </label>

            <div style={{marginTop: "20px"}}>
              <button type="button" style={{marginRight: "10px"}} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={toggleRatingFormVisibility}>Cancel</button>
              <button type="button" className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={() => rateMovie()}>Submit</button>
            </div>
          </form>
        </Window>}

      <br/> <br/> <br/>
    </div>
  );
}
