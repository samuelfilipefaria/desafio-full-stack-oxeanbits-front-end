import { Field, FieldWrapper, Form, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);

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
    <Form onSubmit={login} render={formRenderProps => <FormElement style={{
      maxWidth: 650
    }}>
      <FieldWrapper>
        <div className='k-form-field-wrap'>
          <Field
            type={'email'}
            name={"email"}
            component={Input}
            label={"Email"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </FieldWrapper>

      <FieldWrapper>
        <div className='k-form-field-wrap'>
          <Field
            type={'password'}
            name={'lastName'}
            component={Input}
            label={'Password'}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </FieldWrapper>

      <div className="k-form-buttons">
        <button type={'submit'} className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
          Login
        </button>
      </div>
      </FormElement>} />
  );
}
