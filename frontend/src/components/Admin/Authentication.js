import React, { useRef } from "react";
import { LOGIN, PASSWORD } from "../../Constants/Login";

import "./Authentication.css"

const Authentication = ( { setAuth } ) => {

  const Login = useRef();
  const Password = useRef();

  function handleSubmit( e ) {
    e.preventDefault();

    if ( Login.current.value === LOGIN && Password.current.value === PASSWORD ) {
      setAuth( true );
    }
  }

  return (
    <div className="auth" onSubmit={handleSubmit}>
      <div className="auth-form-container">
        <h1 className="auth-title">Войти</h1>
        <form className="auth-form">
          <div className="auth-form-item">
            <input className="login" ref={Login} type="text" placeholder="Логин" />
          </div>
          <div className="auth-form-item">
            <input className="password" ref={Password} type="password" placeholder="Пароль" />
          </div>
          <div className="auth-form-item">
            <button className="auth-form-button" type="submit">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Authentication;
