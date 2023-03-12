import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Buttons from '../components/Buttons';
import Inputs from '../components/Inputs';

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
    history.push('/');
  };

  const { email, password } = userInfo;
  return (
    <div>
      <span>Login Page</span>
      <form onSubmit={ handleSubmit }>
        <Inputs
          type="email"
          dataTestid="email-input"
          name="email"
          value={ email }
          onChange={ handleChange }
        />
        <Inputs
          type="password"
          dataTestid="password-input"
          name="password"
          value={ password }
          onChange={ handleChange }
        />

        <Buttons
          type="submit"
          dataTestid="login-submit-btn"
          disabled={ isDisabled }
          labelText="Entrar"
        />
      </form>
    </div>
  );
}

export default Login;
