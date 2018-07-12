import React from 'react';
import ContractMethodInfo from './ContractMethodInfo.jsx';

import {
    Table
  } from 'react-bootstrap';

  


export default class ContractMethodComponent extends React.Component{

    render(){
console.log('Method Data',this.props.passedVal);
            return (
        <Table  bordered style={{color:"white",width:"40%",float:"right",marginTop: "-185px"}}>
        <thead style={{backgroundColor:"#ffe4b2",color:"black"}}>
        <tr>
<th>
Select
  </th>

        <th>
          Smart Contract Functionality
          </th>
          </tr>
          </thead>
          <tbody>
            {this.props.passedVal.map((person, i) => <ContractMethodInfo key = {i} 
                     data = {person} />)}
            </tbody>
          </Table>
        
            
  
      )
    }
}