import React, { useState } from "react";
import SpecPlan from "./specPlan";
import Tab from "./Tab";

import { SPECIALTIES } from "../../Constants/apiConstants";

import "./curriculum.css";


const Curriculum = () => {
  const [ activeTab, setActiveTab ] = useState( 122 );
  return (
    <div className="curriculum-container">
      <div className="tabs-container">
        {SPECIALTIES.map( ( { number, name } ) => (
          <Tab key={number} number={number} name={name} setActiveTab={setActiveTab} active={activeTab === number ? "tab-active" : "tab-default"} />
        ) )}
      </div>
      <div className="plan-container">
        {SPECIALTIES.map( ( { number, name } ) => (
          activeTab === number && <SpecPlan key={number} spec={number} name={name} activeTab={activeTab} />
        ) )}
      </div>
    </div>
  );
}

export default Curriculum;
