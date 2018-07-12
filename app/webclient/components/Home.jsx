
import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import {Grid} from 'react-bootstrap';
import {Grid,Row,Col,Carousel} from 'react-bootstrap';

// Component 
import InstanceCount from './Dashboard/InstanceCount';
import InstanceStatus from './Dashboard/InstanceStatus';
import CloudChart from './Dashboard/CloudChart';
import PlatFormChart from './Dashboard/PlatFormChart';

// Component End



const instanceData=[
  {
instanceID:"1273892730",
name:"testInstance1",
nodes:"5",
creationTime:"07/05/2017 07:11:05",
cloud:"Amazon EC2",
status:"Initializing",
externalIP:"34.123.34.23",
platform:"Ethereum"
},
{
  instanceID:"1273892731",
  name:"testInstance2",
  nodes:"5",
  creationTime:"07/05/2017 07:11:05",
  cloud:"Amazon EC2",
  status:"Initializing",
  externalIP:"34.123.34.23",
  platform:"Hyperledger"
  },
  {
    instanceID:"1273892733",
    name:"testInstance3",
    nodes:"5",
    creationTime:"07/05/2017 07:11:05",
    cloud:"Cloud",
    status:"Initializing",
    externalIP:"34.123.34.23",
    platform:"Quoram"
    },
]

const style={
  instanceCountStyle:{
    height:"100px",
    width:"320px",
    borderRadius: "6px",
    border: "solid 1px #d5d5d5",
    align:"center"
  },
  instanceStatusStyle:{
    height:"100px",
    width:"700px",
    marginLeft:"10px",
    textAlign:"center"
  },
  CloudChartStyle:{
    height:"500px",
    marginTop:"50px",
    width:"400px",
    borderRadius: "6px",
    border: "solid 1px #d5d5d5"
  },
  platFormStyle:{
    height:"500px",
    marginLeft:"198px",
    marginTop:"50px",
    width:"400px",
    borderRadius: "6px",
    border: "solid 1px #d5d5d5"
  }
}



export default class Home extends React.Component {

  state={
    instanceData:[],
    running:0,
    stopped:0,
    total:0
  }

  componentDidMount=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    // console.log()

Axios({
  method:'get',
  url:'http://laas-123.eastus.cloudapp.azure.com:8080/api/getInstanceData/'+retrievedUserDetails.username
})
.then(function(response){
  // this.context.router.push('/instanceInfo');
    console.log(response.data);
    var running=0;
  var stopped=0;
  var total=0;
    if(response.length==0){
      alert('no data found');
      this.setState({instanceData:this.state.instanceData});
    }else{
      console.log(response.data + '----------in length>0-----------------');

    response.data.forEach((data)=>{
      if(data.status.currentStatus=="CREATED" ||data.status.currentStatus=="CREATING" || data.status.currentStatus=="VM AGENT UP" || data.status.currentStatus=="running"){
        running++;
      }else if(data.status.currentStatus=="Stopped"){
        stopped++
      }
      if(data.status.currentStatus!=="Deleted"){
        total++;
      }
    })

    this.setState({running,stopped,total});
    
    // this.setState({instanceData,instanceData});
    this.setState({ instanceData: response.data});
    // console.log('state data');
    // console.log(this.state.instanceData);
  }
}.bind(this))

  }

  
  
  render() {
  
      return (
        <div className="background">
        <Grid style={{marginTop:"90px"}}>  
    <Row> 
      <Col xs={4} style={style.instanceCountStyle}>
      <InstanceCount total={this.state.total}/>
      </Col>
      <Col xs={8} style={style.instanceStatusStyle}>
      <InstanceStatus running={this.state.running} stopped={this.state.stopped}/>
      </Col>
      </Row>
      <Row>
      <Col xs={6} style={style.CloudChartStyle}>
      <CloudChart instanceData={this.state.instanceData}/>
      </Col>
      <Col xs={6} style={style.platFormStyle}>
      <PlatFormChart instanceData={this.state.instanceData}/>
      </Col>

      </Row>
           
          </Grid>
          </div>
      )
    }
  }



