import React, { useRef } from 'react';

const Form = () => {


  function handleUploadImage(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', fileInput.current.files[0]);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        console.log(response);
      });
    fileInput.current.value = null;
  }

  const fileInput = useRef();

  return (
    <form onSubmit={handleUploadImage}>
      <input ref={fileInput} type="file" />
      <button>Upload</button>
    </form>
  );
}

export default Form;
