import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Inputs from '../components/Inputs';
import '../styles/pages/Login.sass';
import logo from '../assets/svg/fullLogo.svg';

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const validation = () => {
    const { email, password } = userInfo;
    const MIN_PASSWORD_LENGTH = 7;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailIsValid = emailRegex.test(email);
    const passwordIsValid = password.length >= MIN_PASSWORD_LENGTH;
    if (emailIsValid && passwordIsValid) {
      setIsDisabled(false);
      return true;
    }
    setIsDisabled(true);
    return false;
  };

  useEffect(() => {
    validation();
  }, [userInfo]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email } = userInfo;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  const { email, password } = userInfo;
  return (
    <div className="loginContainer">
      <img src={ logo } alt="logo" />

      <form onSubmit={ handleSubmit }>
        <span>Login</span>
        <Inputs
          type="email"
          dataTestid="email-input"
          name="email"
          value={ email }
          onChange={ handleChange }
          placeholder="Email"
        />
        <Inputs
          type="password"
          dataTestid="password-input"
          name="password"
          value={ password }
          onChange={ handleChange }
          placeholder="Password"
        />

        <Buttons
          type="submit"
          dataTestid="login-submit-btn"
          isDisabled={ isDisabled }
          labelText="Entrar"
        />
      </form>
    </div>
  );
}

export default Login;
