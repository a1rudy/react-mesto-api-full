import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../hooks/useFormWithValidation";

function Register({ handleRegister }) {

  const { values, handleChange, errors, isValid, setValues } =
  useFormWithValidation();

  const { email, password } = values;

  const handleSubmit = (e) => {
  e.preventDefault();
  isValid &&
    handleRegister({ email, password }, () => {
      setValues({});
    });
  };

  return (
    <>
      <section className='auth'>
        <div className='auth__container'>
          <h2 className="auth__title">Регистрация</h2>
          <form onSubmit={handleSubmit} className='auth__form' >
            <div className='auth__form-wrap'>
              <input value={email || ''} onChange={handleChange} className='auth__input' id="email-input" type="email" placeholder="Email" name="email" minLength="2" maxLength="200" autoComplete="on" required />
              <span className="auth__input-error name-input-error">{errors.email}</span>
            </div>
            <div className='auth__form-wrap'>
              <input value={password || ''} onChange={handleChange} className='auth__input' id="password-input" type="password" placeholder="Пароль" name="password" minLength="2" maxLength="200" autoComplete="on" required />
              <span className="auth__input-error name-input-error" >{errors.password}</span>
            </div>
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