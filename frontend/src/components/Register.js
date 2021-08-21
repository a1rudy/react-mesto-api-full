import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header'

function Register({ handleRegister }) {

  const [data, setData] = useState({
    password: '',
    email: '',
  })

  function handleChange(evt) {
    const {name, value} = evt.target;
    setData({
      ...data,
      [name]: value
    });;
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { password, email } = data;
    handleRegister({ password, email });
  }

  return (
    <>
    <Header><Link to="/signin" className="header__login-link">Войти</Link></Header>

    <section className='auth'>
      <div className='auth__container'>
        <h2 className="auth__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className='auth__form' >
          <input value={data.email} onChange={handleChange} className='auth__input' id="email-input" type="email" placeholder="Email" name="email" minLength="2" maxLength="200" required />
          <input value={data.password} onChange={handleChange} className='auth__input' id="password-input" type="password" placeholder="Пароль" name="password" minLength="2" maxLength="200" required />
          <button className="auth__save-button save-button" type="submit"><span className="auth__button-span">Зарегестрироваться</span></button>
        </form>
        <div className="auth__signin">
          <p className="auth__reg-question">Уже зарегистрированы?</p>
          <Link to="/signin" className="auth__login-link">Войти</Link>
        </div>
      </div>
    </section>
    </>
  )
}

export default Register;