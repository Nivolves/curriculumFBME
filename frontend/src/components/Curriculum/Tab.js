import React from "react";


const Tab = ( { setActiveTab, name, number, active } ) => (
  <div onClick={() => setActiveTab( number )} className={`tab ${ active }`}>{name}</div>
);

export default Tab;
