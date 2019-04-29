import React, { useState, useEffect } from "react";

import "./curriculum.css";

import { BASE_PATH } from "../../Constants/apiConstants";

const SpecPlan = ( { spec, name } ) => {

  const [ plan, setPlan ] = useState();

  useEffect( () => {
    fetchData();
  }, [] );

  function fetchData() {
    fetch( `${ BASE_PATH }/${ spec }` )
      .then( res => res.json() )
      .then( result => setPlan( result ) )
      .catch( error => error );
  }

  // console.log( Array.isArray( plan ) );

  return (
    <div className="spec-plan-container">

      {plan && ( plan.map( ( { course, plan } ) => (
        <div className="spec-plan" key={`${ course }${ plan[ 0 ].disciplineName }`}>
          <div className="course">{course}Курс</div>
          <table>
            <tr>
              <th>Найменування дисциплін</th>
              <th>Назва кафедр</th>
              <th className="vertical-text">К р е д и т і в</th>
              <th className="vertical-text">Г о д и н</th>
              <th className="vertical-long-text-container">
                <div className="vertical-long-text">А у д и т о р н и х</div>
                <div className="vertical-long-text">г о д и н</div>
              </th>
              <th className="vertical-text">Л е к ц і ї</th>
              <th className="vertical-text">П р а к т и к и</th>
              <th className="vertical-text">Л а б о р а т о р . </th>
              <th className="vertical-long-text-container">
                <div className="vertical-long-text">С а м о с т і й н а</div>
                <div className="vertical-long-text">р о б о т а</div>
              </th>
              <th>Екзамен, залік</th>
              <th>МКР</th>
              <th>КР</th>
              <th>РГР, ДКР</th>
            </tr>
            {plan.map( ( { disciplineName, departmentName, credits, hours, classroomsHours, lectures, practice, laboratoryWork, selfEducation, control, MKR, KR, RGR }, index ) => (

              <tr>
                <td>{disciplineName}</td>
                <td>{departmentName}</td>
                <td>{credits}</td>
                <td>{hours}</td>
                <td>{classroomsHours}</td>
                <td>{lectures}</td>
                <td>{practice}</td>
                <td>{laboratoryWork}</td>
                <td>{selfEducation}</td>
                <td>{control}</td>
                <td>{MKR}</td>
                <td>{KR}</td>
                <td>{RGR}</td>
              </tr>
            ) )}
          </table>
        </div>
      ) ) )}
    </div>
  );
}

export default SpecPlan;
