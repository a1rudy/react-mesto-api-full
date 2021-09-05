import React, { useState } from 'react';

function Login({ handleLogin }) {

  const [data, setData] = useState({
    password: '',
    email: '',
  })

  function handleChange(evt) {
    const {name, value} = evt.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { password, email } = data;
    handleLogin({ password, email });
  }
  
  return (
    <>
      <section className='auth'>
        <div className='auth__container'>
        <h2 className="auth__title">Вход</h2>
            <form onSubmit={handleSubmit} className='auth__form' >
              <input value={data.email} onChange={handleChange}  className='auth__input' id="email-input" type="email" placeholder="Email" name="email" minLength="2" maxLength="200" required />
              <input value={data.password} onChange={handleChange}  className='auth__input' id="password-input" type="password" placeholder="Пароль" name="password" minLength="2" maxLength="200" required />
              <button className="auth__save-button save-button" type="submit"><span className="auth__button-span">Войти</span></button>
            </form>
        </div>
      </section>
    </>
  )
}

export default Login;