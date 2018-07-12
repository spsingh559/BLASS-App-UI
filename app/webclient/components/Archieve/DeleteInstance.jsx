import React from 'react';
import {
    Table
  } from 'react-bootstrap';

  import EachDeleteInstance from './EachDeleteInstance.jsx';


export default class InstanceDetail extends React.Component{

  

    render(){
      var newData = {};
        if(this.props.instanceData !== undefined && this.props.instanceData.length>0) {
          newData=  this.props.instanceData.map((data,index)=>{
              return(
                  <EachDeleteInstance 
                  key={index}
                  data={data}
                 
                  />
              )
          });  
        }
        else
          newData = <div></div>

        
        return(
            <Table  bordered style={{color:"black"}}>
  <thead style={{backgroundColor:"#ffe4b2",color:"black"}}>
    <tr>
	
      <th>Name</th>
      <th>Cloud</th>
      <th>Platform</th>
      <th>Status</th>
      <th>Creation Time</th>
      <th>Last Active Time</th>
      <th>View Bill Charges</th>
      <th>Payment Status</th>
    </tr>
  </thead>
  <tbody>
            
            {newData}
            </tbody>
            </Table>
        )
    }

}