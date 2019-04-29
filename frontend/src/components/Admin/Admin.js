import React, { Fragment, useState } from "react";
import Form from "./Form";
import Authentication from "./Authentication";


const Admin = () => {
  const [ Auth, setAuth ] = useState( false );

  return (
    <Fragment>
      {Auth ? <Form /> : <Authentication setAuth={setAuth} />}
    </Fragment>
  );
}

export default Admin;