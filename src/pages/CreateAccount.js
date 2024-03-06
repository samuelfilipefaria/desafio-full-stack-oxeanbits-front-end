import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import axios from "axios";
import { useEffect, useState } from "react";

export const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const createUser = () => {
    axios.post('http://127.0.0.1:3000/users', {
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    })
    .then(function (response) {
      localStorage.setItem("user_token", response.data.token);
      window.location.href = "/";
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
    } else {
      axios.get("http://127.0.0.1:3000/users/is_admin")
      .then(function (response) {
        if (response.data.is_admin != "true") {
          window.location.href = "/";
        }
      })
      .catch(function (error) {
        window.location.href = "/login";
      })
      .finally(function () {
      });
    }
  }, [])

  return(
    <div style={{textAlign: "center"}}>
      <h1>Create Account</h1>
      <Form onSubmit={createUser} render={formRenderProps => <FormElement style={{textAlign: "center"}}>
        <FieldWrapper>
          <div className='k-form-field-wrap'>
            <Field
              name={"username"}
              component={Input}
              label={"Username"}
              style={{width: "300px"}}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper>
          <div className='k-form-field-wrap'>
            <Field
              type={'email'}
              name={"email"}
              component={Input}
              label={"Email"}
              style={{width: "300px"}}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper>
          <div className='k-form-field-wrap'>
            <Field
              type={'password'}
              name={'password'}
              component={Input}
              label={'Password'}
              style={{width: "300px"}}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </FieldWrapper>

        <FieldWrapper>
          <div className='k-form-field-wrap'>
            <Field
              type={'passwordConfirmation'}
              name={'passwordConfirmation'}
              component={Input}
              label={'Password Confirmation'}
              style={{width: "300px"}}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
        </FieldWrapper>

        <button type={'submit'} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style={{marginTop: "20px"}}>
          Create User
        </button>

        </FormElement>} />
    </div>
  );
}
