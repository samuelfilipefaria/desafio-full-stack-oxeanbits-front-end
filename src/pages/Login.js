import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post('http://127.0.0.1:3000/login', {
      email: email,
      password: password,
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

  return(
    <div style={{textAlign: "center"}}>
      <h1>Login</h1>

      <Form onSubmit={login} render={formRenderProps => <FormElement style={{textAlign: "center"}}>
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

        <button type={'submit'} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style={{marginTop: "20px"}}>
          Login
        </button>

        </FormElement>} />
    </div>
  );
}
