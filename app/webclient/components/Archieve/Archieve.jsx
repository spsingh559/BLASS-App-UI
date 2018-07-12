import React from 'react';
import Axios from 'axios';
import {Grid} from 'react-bootstrap';
import DeleteInstance from './DeleteInstance';
export default class Archieve extends React.Component{

    state={
        instanceData:[]
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
       
        if(response.length==0){
          alert('no data found');
          this.setState({instanceData:this.state.instanceData});
        }else{
          console.log(response.data + '----------in length>0-----------------');
    
          let deletedData=[];
        response.data.forEach((data)=>{
          if(data.status.currentStatus=="Deleted"){
            deletedData.push(data);
          }
        })
    
        this.setState({instanceData:deletedData});
        
       
      }
    }.bind(this))
    
      }

    

    render(){

        return(
            <div className="background">
            <div style={{marginTop:"70px"}}>  
            <Grid>
            <DeleteInstance instanceData={this.state.instanceData} />
            </Grid>
            </div>
            </div>
        )
    }
}