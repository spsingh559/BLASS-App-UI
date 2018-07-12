import openSocket from 'socket.io-client';

import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import {Grid} from 'react-bootstrap';
import {Grid,Row,Col,Carousel} from 'react-bootstrap';
import InstanceDetail from './InstanceDetail.jsx';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
// const socket = openSocket('http://laas-123.eastus.cloudapp.azure.com:8000');

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
    instanceData:[],
    open:false,
    actionData:{}
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

 static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired,
      socket:React.PropTypes.object.isRequired
    }
  }

  updateInstancesData = (response)=>{
    console.log(response);
    if(response.length==0){
      alert('no data found');
      // this.setState({instanceData:this.state.instanceData});
    }else{
      console.log(response );
      // this.setState({instanceData,instanceData});
      
      // this.setState({ instanceData: response.data});
      response.vmInfo.forEach((data,i)=>{
        if(data.instanceId==this.state.actionData.instanceId){
          var editData=this.state.instanceData.splice(i,1,data);
          editData=null;
        }
      })

this.setState({instanceData:this.state.instanceData});
    }
  }

  componentDidMount=()=>{
    let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
    // console.log()
    // socket.emit('requestInstances', {"username": retrievedUserDetails.username});
    // socket.on('pushAllInstances', response => this.updateInstancesData(response));
    this.context.socket.on('pushAllInstances', response => this.updateInstancesData(response));
      // console.log('connected to socket');
      // // console.log(msg);
      // msg.vmInfo.forEach((data)=>{

      // })
    // });
  // }

Axios({
  method:'get',
  url:'http://laas-123.eastus.cloudapp.azure.com:8080/api/getInstanceData/'+retrievedUserDetails.username
})
.then(function(response){
  // this.context.router.push('/instanceInfo');
  //   console.log(response.data);
    
  //   console.log('state data');
  //   console.log(this.state.instanceData);
  let ActiveInstance=[];
  if(response.data.length==0){
    alert('no data found');
  }else{
  
    response.data.forEach((data)=>{
      if(data.status.currentStatus!="Deleted"){
        ActiveInstance.push(data);
      }
    })

    this.setState({instanceData:ActiveInstance});
    
   
  }
  
  
  }.bind(this))

  }
  
    navigationPlatformComparisonPage=()=>{
            this.context.router.push('/platformComparisonPage');
     }

     deleteVM=(obj)=>{
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      console.log(obj);
      this.setState({actionData:obj});
      Axios({
        method:'get',
        url:'http://laas-123.eastus.cloudapp.azure.com:4000/cloud/v1/deletevm?cloudPlatform='+obj.cloud+"&instanceId="+obj.instanceId+"&username="+retrievedUserDetails.username
      })
      .then((data) => {
        
           console.log(data)
        // alert('VM deleted successfully');    
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

     stopVM=(obj)=>{
      // this.setState({open:true});
      this.setState({actionData:obj});
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails')); 
      console.log(obj);
      Axios({
        method:'get',
        url:'http://laas-123.eastus.cloudapp.azure.com:4000/cloud/v1/stopvm?cloudPlatform='+obj.cloud+"&instanceId="+obj.instanceId+"&username="+retrievedUserDetails.username
      })
      .then((data) => {
        // this.setState({open:false});
           console.log(data)
        // alert('VM stopped successfully');   

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

     restartVM=(obj)=>{
      this.setState({actionData:obj});
      let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));
      // this.setState({open:true});
      console.log(obj);
      Axios({
        method:'get',
        url:'http://laas-123.eastus.cloudapp.azure.com:4000/cloud/v1/startvm?cloudPlatform='+obj.cloud+"&instanceId="+obj.instanceId+"&username="+retrievedUserDetails.username
      })
      .then((data) => {
        console.log('---------------VM Restarted--------------');
           console.log(data)
          //  this.setState({open:false});
        // alert('VM restarted successfully');    
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
        <InstanceDetail instanceData={this.state.instanceData} deleteVM={this.deleteVM} stopVM={this.stopVM} restartVM={this.restartVM}/>
            
         
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
              <Dialog
          title="Dialog With Actions"
          modal={true}
          open={this.state.open}
        >
        <center>
        <h2> Request is in Progress ...</h2>
        </center>
        <CircularProgress size={80} thickness={5} />
          
        </Dialog>
            <RaisedButton label="Platform Comparison" primary={true} onClick={this.navigationPlatformComparisonPage}/>
            </div>
           
          </div>
           
          </div>
      )
    }
  }



