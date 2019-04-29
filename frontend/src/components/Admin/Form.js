import React, { useState, useRef } from 'react';

import "./Form.css";

const Form = () => {

  const [ status, setStatus ] = useState();
  const fileInput = useRef();


  function handleUpload( e ) {
    e.preventDefault();

    const data = new FormData();
    data.append( 'file', fileInput.current.files[ 0 ] );

    fetch( 'http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    } )
      .then( ( response ) => {
        switch ( response.status ) {
          case 200:
            setStatus( "Загрузка прошла успешно" );
            break;
          case 406:
            setStatus( "Неправильное имя файла" );
            break;
          case 415:
            setStatus( "Неправильное расширение файла" );
            break;
          case 500:
            setStatus( "Не удалось загрузить файл" );
            break;
          default:
            break;
        }
        console.log( response.status );
      } );
    fileInput.current.value = null;
  }


  return (
    <form onSubmit={handleUpload}>
      <input ref={fileInput} type="file" id="file" />
      <label className={status === "Загрузка прошла успешно" ? "load" : "not_load"}>{status}</label>
      <button className="form_button">Загрузить</button>
    </form>
  );
}

export default Form;
