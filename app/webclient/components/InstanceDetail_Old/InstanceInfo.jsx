import openSocket from 'socket.io-client';

import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import {Grid} from 'react-bootstrap';
import {Grid,Row,Col,Carousel} from 'react-bootstrap';
import InstanceDetail from './InstanceDetail.jsx';
const socket = openSocket('http://laas-123.eastus.cloudapp.azure.com:8000');

// const instanceData=[
//   {

//     "platform" : "Ethereum",
//     "status" : {
//             "currentStatus" : "CREATING",
//             "lastUpdate" : "Fri, 25 May 2018 06:41:06 GMT"
//     },
//     "vmIP" : "bk5bx4r1q.eastus.cloudapp.azure.com",
//     "cloud" : "azure",
//     "username" : "Pranjul",
//     "createdAt" : "Fri, 25 May 2018 06:41:06 GMT",
//     "config" : {
//             "miners" : "1",
//             "nodes" : "1"
//     },
//     "activeExp" : "bk5bx4r1q"
// }
// ,
//   {
 
//         "platform" : "Ethereum",
//         "status" : {
//                 "currentStatus" : "CREATED",
//                 "lastUpdate" : "Fri, 25 May 2018 06:50:11 GMT"
//         },
//         "vmIP" : "s1zc4h1x.eastus.cloudapp.azure.com",
//         "cloud" : "azure",
//         "username" : "Pranjul",
//         "createdAt" : "Fri, 25 May 2018 06:47:37 GMT",
//         "config" : {
//                 "miners" : "2",
//                 "nodes" : "2"
//         },
//         "activeExp" : "s1zc4h1x"
//       }
// ]



export default class Home extends React.Component {

  state={
    instanceData:[]
  }

 static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  // updateInstancesData = (response)=>{
  //   if(response.length==0){
  //     alert('no data found');
  //     // this.setState({instanceData:this.state.instanceData});
  //   }else{
  //     console.log(response.data );
  //     // this.setState({instanceData,instanceData});
  //     this.setState({ instanceData: response.data});
  //   }
  // }

  componentDidMount=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    // console.log()
    // socket.emit('requestInstances', {"username": retrievedUserDetails.username});
    // socket.on('pushAllInstances', response => this.updateInstancesData(response));

Axios({
  method:'get',
  url:'http://laas-123.eastus.cloudapp.azure.com:8080/api/getInstanceData/'+retrievedUserDetails.username
})
.then(function(response){
 if(response.data.length==0){
   alert('no data found');
 }else{
    this.setState({ instanceData: response.data});
 }
    
  }.bind(this))

  }
  
    navigationPlatformComparisonPage=()=>{
            this.context.router.push('/platformComparisonPage');
     }

     deleteVM=(obj)=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      console.log(obj);
      Axios({
        method:'get',
        url:'http://laas-123.eastus.cloudapp.azure.com:4000/cloud/v1/deletevm?cloudPlatform='+obj.cloud+"&vmName="+obj.instanceId+"&username="+retrievedUserDetails.username
      })
      .then((data) => {
        
           console.log(data)
        alert('VM deleted successfully');    
          //   if(data.data.response=="Success") {
          //     alert("Instance has been deleted") 
          //   }else{
          //     alert('Could not delete the instance, try again!');
          //   }

      })
      .catch((error) => {
        console.log(error);
        console.log(error+"error in Login data for post");
      });
     }
  render() {
  
      return (
        <div className="background">
        <div style={{marginTop:"90px"}}>  
        <InstanceDetail instanceData={this.state.instanceData} deleteVM={this.deleteVM}/>
            
         
			{/* <Row >
			<Col xs={2}><TradePortalComponent />
      </Col>
      <Col xs={7}><TradeStatusAndRecap />
      </Col>
      <Col xs={3}><Notification />
      </Col>
			</Row>
      <Row>
        <Col xs={6}> <ParcelStatusComponent />
        </Col>
        <Col xs={6}> <TradeSummaryPublished />
        </Col>
        </Row>       
           */}<div>
            <RaisedButton label="Platform Comparison" primary={true} onClick={this.navigationPlatformComparisonPage}/>
            </div>
           
          </div>
           
          </div>
      )
    }
  }



