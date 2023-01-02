import React, { useState } from 'react';
import { ReactDOM } from 'react';

function Home() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);
    console.log(object);
    console.log(json);
    const collectData = async () => {
      let result = await fetch('http://localhost:5000/register', {
        method: 'post',
        body: json,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      result = await result.json();
      console.warn(result);
    }
    collectData();
  }

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    //Move form data from login into json
    const formData = new FormData(event.target);
    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    const json = JSON.stringify(object);

    console.log(json);
    console.log(object);

    // Call mango db api to see if user/password combo exists
    const loginAttempt = async () => {
        let result = await fetch('http://localhost:5000/login', {
          method: 'post',
          body: json,
          headers: {
            'Content-Type' : 'application/json'
          }
        });
        result = await result.json();
        if (result.status === 'login successful') {
          setIsLoggedIn(true);
          setLoginFailed(false);
        } else {
          setLoginFailed(true);
        }

    }
    loginAttempt();
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // Generate button to switch between register and login forms
  const formSwitch = (
    <button className="button" onClick={() => setIsRegister(!isRegister)}>
      {isRegister ? 'Already a Member? Log in' : 'Not registered yet? Join now!'}
    </button>
  );

  // JSX code for login form
  const renderLoginForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
          <div className="error">
          {loginFailed ? 'We don\'t recognize that email/password, please try again or reset your password' : ''}
          </div>
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  const renderRegisterForm = (
    <div className="form">
      <form onSubmit={handleRegistration}>
        <div className="input-container">
          <label>First Name </label>
          <input type="text" name="firstName" required />
        </div>
        <div className="input-container">
          <label>Last Name </label>
          <input type="text" name="lastName" required />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="confirmPass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  const loggedInHomePage = (
    <div>
      <p>you are logged in!</p>
    </div>
  );
  

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">{isRegister ? 'Register' : 'Login'}</div>
        {isRegister ? renderRegisterForm : renderLoginForm}
      </div>
      <div>
        {formSwitch}
        {isLoggedIn ? loggedInHomePage : ''}
      </div>
    </div>
  );
}

export default Home;