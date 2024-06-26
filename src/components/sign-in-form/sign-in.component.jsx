import React from 'react';
import { useState } from 'react';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { ButtonsContainer, SignInContainer } from './sign-in.styles.jsx';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
      setFormFields(defaultFormFields);
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        await signInAuthUserWithEmailAndPassword(
          email, 
          password
        );
        resetFormFields();
      } catch (error) {
        switch(error.code) {
          case 'auth/invalid-credential':
            alert('invalid login credentials');
            break;
          default:
            console.log(error);
        }
      }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormFields({...formFields, [name]: value});
}

  return (
    <SignInContainer>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput
                label="Email"
                type="email" 
                required 
                onChange={handleChange} 
                name='email' 
                value={email} 
            />
            <FormInput
                label="Password"
                type="password" 
                required 
                onChange={handleChange} 
                name='password' 
                value={password} 
            />
            <ButtonsContainer>
              <Button type="submit">SIGN IN</Button>
              <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                GOOGLE SIGN IN
              </Button>
            </ButtonsContainer>
        </form>
    </SignInContainer>
  )
}

export default SignInForm;
