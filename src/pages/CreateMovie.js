import { useEffect, useState } from 'react';
import axios from "axios";
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Field, FieldWrapper, Form, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';

export const CreateMovie = () => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("user_token");

  const [selected, setSelected] = useState(0);
  const handleSelect = e => {
    setSelected(e.selected);
  };

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");

  const [moviesToImport, setMoviesToImport] = useState([]);

  const createMovie = () => {
    axios.post('http://127.0.0.1:3000/movies', {
      title: title,
      director: director,
    })
    .then(function (response) {
      console.error(response);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
    });
  }

  const addToMoviesToImport = () => {
    let currentMoviesToImport = moviesToImport;
    currentMoviesToImport.push({
      title: title,
      director: director
    });
    setTitle("");
    setDirector("");
    setMoviesToImport(currentMoviesToImport);
  }

  const createAllMovies = () => {
    axios.post('http://127.0.0.1:3000/movies/bulk_create', {
      movies_params: moviesToImport,
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
    if (localStorage.getItem("user_token") == "") {
      window.location.href = "/login";
    }
  }, [])

  return (
    <TabStrip selected={selected} onSelect={handleSelect}>
      <TabStripTab title="Create a new movie">
        <Form onSubmit={createMovie} render={formRenderProps => <FormElement style={{maxWidth: 650}}>
          <FieldWrapper>
            <div className='k-form-field-wrap'>
              <Field
                name={"title"}
                component={Input}
                label={"Title"}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </FieldWrapper>

          <FieldWrapper>
            <div className='k-form-field-wrap'>
              <Field
                name={'director'}
                component={Input}
                label={'Director'}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
          </FieldWrapper>

          <div className="k-form-buttons">
            <button type={'submit'} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
              Create
            </button>
          </div>
        </FormElement>} />
      </TabStripTab>
      <TabStripTab title="Create movie in bulk">
        <Form onSubmit={createAllMovies} render={formRenderProps => <FormElement style={{maxWidth: 650}}>
          <FieldWrapper>
            <div className='k-form-field-wrap'>
              <Field
                name={"title"}
                component={Input}
                label={"Title"}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </FieldWrapper>

          <FieldWrapper>
            <div className='k-form-field-wrap'>
              <Field
                name={'director'}
                component={Input}
                label={'Director'}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
          </FieldWrapper>
        </FormElement>} />

        <br/>

        <button onClick={() => {addToMoviesToImport()}} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
          Add movie to movies to import
        </button>
        <div>
          <h4>Movies to import:</h4>
          <ul>
          {moviesToImport.map((movie, index) => (
            <li key={index}>
              Title: {movie.title} | Director: {movie.director}
            </li>
          ))}
          </ul>
        </div>
        <button onClick={() => {createAllMovies()}} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
          Finish and create all movies
        </button>
      </TabStripTab>
    </TabStrip>
  );
}
