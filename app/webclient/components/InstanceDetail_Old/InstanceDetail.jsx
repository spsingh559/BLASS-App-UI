import React from 'react';
import {
    Table
  } from 'react-bootstrap';

  import EachInstance from './EachInstance.jsx';


export default class InstanceDetail extends React.Component{

  deleteVM=(obj)=>{
    this.props.deleteVM(obj);
  }

    render(){
      var newData = {};
        if(this.props.instanceData !== undefined && this.props.instanceData.length>0) {
          newData=  this.props.instanceData.map((data,index)=>{
              return(
                  <EachInstance 
                  key={index}
                  data={data}
                  deleteVM={this.deleteVM}
                  />
              )
          });  
        }
        else
          newData = <div></div>

        
        return(
            <Table  bordered style={{color:"white",textAlign:"center"}}>
  <thead style={{backgroundColor:"#ffe4b2",color:"black"}}>
    <tr>
	
      <th>Name</th>
      <th>Nodes</th>
      <th>Creation Time</th>
      <th>Cloud</th>
      <th>Platform</th>
      <th>Status</th>
      <th>External IP</th>
      <th>Action</th>
      <th>View Explorer</th>
    </tr>
  </thead>
  <tbody>
            
            {newData}
            </tbody>
            </Table>
        )
    }

}