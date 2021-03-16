import React from "react";
import userservice from '../../services/userService.js';
import Jupatable from '../jupatable/jupatable';
import ttext from '../configTranslate';


const Home = () => {
  const SAMPLE_COL_DATA = [
    {   colTitle: " שם הילד",   colIndex: 2,   isEditable: true, refName:"childName", sortable: true },
    {   colTitle: " שם משפחה",   colIndex: 3,   isEditable: false, refName:"childLastName", sortable: false },
    {   colTitle: "גיל ",   colIndex: 4,   isEditable: true,   refName:"age", sortable: true },
    ];
  const SAMPLE_ROW_DATA = [
    ["liber","1ty",9],
    ["liber","t2y",9],
    ["li3ber","ty",6],
    ["lib4er","ty",9]
  ];
  
  let logged = userservice.getCurrentUser();
 
    return (
      <div className="container">
        <div className="row">
          {!logged?
          <div className="col-12 mt-4">
            <h1>{ttext.msgWelcomeTodo} </h1>
            <p>*** {ttext.msgPleaseRegisterOrLogin}  - {ttext.msgEnjoyChecking} *** </p>            
          </div>
          :
          <div className="col-12 mt-4"> 
          <h1>דף הבית </h1>
          <Jupatable COL_DATA={SAMPLE_COL_DATA}  ROW_DATA={SAMPLE_ROW_DATA} />
          </div>}
        </div>       
      </div>
    );
  
}
 
export default Home;