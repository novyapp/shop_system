import React, { useState } from "react";
import {
  createUserDocumentFromAuth,
  SignInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const reserFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await SignInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);

      reserFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-conteiner">
      <h2>Already have account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="E-mail"
          type="email"
          required
          onChange={handleFormChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleFormChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
}
