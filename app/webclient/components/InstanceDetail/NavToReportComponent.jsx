
import React from 'react';


import Graph from '../Report/Graph.jsx';
import EachInstance from './EachInstance.jsx';

export default class NavToReportComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      instanceName: 'dummy'
    }
    this.onNavigatinToReport = this.onNavigatinToReport.bind(this);

   
  }

  onNavigatinToReport(name){
    console.log("Outside Func", name);
    this.setState({instanceName: name}, ()=>{
      console.log("Parent Ele state --",this.state);
    })
  }  
  render() {
      return (
        <div>
        <EachInstance updateInstanceName={this.onNavigatinToReport}/>
        <Graph instanceName={this.state.instanceName}/>
         </div>
      )
    }
  }



