import React from 'react';
import { useState } from 'react';
import Button from '../button/button.component';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

const SignInForm = () => {

  const defaultFormFields = {
    email: '',
    password: '',
};

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
  };

  const resetFormFields = () => {
      setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {

        const response = await signInAuthUserWithEmailAndPassword(email, password);
        console.log(response);
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
    <div className='sign-in-container'>
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
            <div className='buttons-container'>
              <Button type="submit">SIGN IN</Button>
              <Button type="button" buttonType="google" onClick={signInWithGoogle}>
                GOOGLE SIGN IN
              </Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm;
