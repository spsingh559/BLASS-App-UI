import React from 'react';
import Axios from 'axios';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
 
  import Play from 'material-ui/svg-icons/av/play-arrow';
  import Stop from 'material-ui/svg-icons/av/stop';
  import Delete from 'material-ui/svg-icons/action/delete-forever';
  import Report from 'material-ui/svg-icons/action/receipt';
  import IconButton from 'material-ui/IconButton';
  import {Link} from 'react-router';

  import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

  
export default class EachInstance extends React.Component{

  state={
    openCollapse: false
  }


    static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
   onSiteChanged (evt) {
        {
          var val =evt.target.value;
          this.props.updateInstanceName(val);
           
           }
        }

    start = ()=> {
      var requestObj = {
        cloud: this.props.data.cloud,
        vmName: this.props.data.activeExp,
        username: this.props.data.username,
        instanceId: this.props.data.instanceId
      }
      Axios({
        method:'get',
        url:'http://laas-123.eastus.cloudapp.azure.com:4000/startvm?cloudPlatform='+requestObj.cloud+"&instanceId="+requestObj.instanceId+'&username='+requestObj.username
      //  data:requestObj
      })
      .then((data) => {
           console.log(data)
            
            if(data.data.response=="Success") {
              alert("Instance has been started")
            }else{
              alert('Could not start the instance, try again!');
            }

      })
      .catch((error) => {
        console.log(error);
        console.log(error+"error in Login data for post");
      });
    }

    stop = ()=> {
      var requestObj = {
        cloud: this.props.data.cloud,
        vmName: this.props.data.activeExp,
        username: this.props.data.username,
        instanceId: this.props.data.instanceId
      }
      Axios({
        method:'get',
        url:'http://laas-123.eastus.cloudapp.azure.com:4000/stopvm?cloudPlatform='+requestObj.cloud+"&instanceId="+requestObj.instanceId+'&username='+requestObj.username
        //data:requestObj
      })
      .then((data) => {
           console.log(data)
            
            if(data.data.response=="Success") {
              alert("Instance has been stopped")
            }else{
              alert('Could not stop the instance, try again!');
            }

      })
      .catch((error) => {
        
        console.log(error);
        console.log(error+"error in Login data for post");
      });
    }

    delete = ()=> {
      
      
      var requestObj = {
        cloud: this.props.data.cloud,
        vmName: this.props.data.activeExp,
        instanceId: this.props.data.instanceId
      }

      this.props.deleteVM(requestObj);
     
    }
    // navigateReport=()=>{
    //     this.props.context.router.push('/Report/'+this.props.data.instanceID);
    // }
    expand=()=>{
      this.setState({ openCollapse: true })
    }
    handleClose = () => {
      this.setState({openCollapse: false});
    };

    render(){

      var params = {
        sendTxnToAccnt: { 
          "fromAccount": "0x762f1584e99e4b4568547120d4efd4399502601f", 
          "fromPassword": "password", 
          "params": 
          {
            "from": "0x762f1584e99e4b4568547120d4efd4399502601f", 
            "to": "0x90f43613279a61dee6416f0ab08b43105ee43b75",
            "value": 100000
          }
        },
        createContract: {
          "fromAccount":"0x762f1584e99e4b4568547120d4efd4399502601f",
          "fromPassword":"password",
          "source":"contract multiplyContract { function multiplyBy7(uint a) returns(uint d) { return a * 7; } }",
          "contractNames":"{\"main\":\"multiplyContract\",\"abi\":[\"multiplyContract\"],\"txHash\":\"multiplyContract\"}"
        },
        sendTxnToContract: {
          "fromAccount": "0x762f1584e99e4b4568547120d4efd4399502601f", 
          "fromPassword": "password", 
          "params": 
          {
            "from": "0x762f1584e99e4b4568547120d4efd4399502601f", 
            "to": "0x90f43613279a61dee6416f0ab08b43105ee43b75",
            "value": 100000
          },
          "source":"contract multiplyContract { function multiplyBy7(uint a) returns(uint d) { return a * 7; } }","contractNames":"{\"main\":\"multiplyContract\",\"abi\":[\"multiplyContract\"],\"txHash\":\"multiplyContract\"}",
          gas: 1000
        } 
      };
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={this.handleClose}
        />
      ];

        return(
            <tr >
{/*<td style={{textAlign:"center",paddingTop:"20px"}}>
   <input type="checkbox" name="site_name" 
                                   value={this.props.data.name}
                                    onChange={(val)=>this.onSiteChanged(val)} /></td>*/}
            <td onTouchTap={this.expand} style={{textAlign:"center",paddingTop:"20px"}}>{this.props.data.activeExp}</td>
            <td style={{textAlign:"center",paddingTop:"20px"}}>{this.props.data.config.nodes}</td>
            <td style={{textAlign:"center",paddingTop:"20px"}}>{this.props.data.createdAt}</td>
            <td style={{textAlign:"center",paddingTop:"20px"}}>{this.props.data.cloud}</td>
            <td style={{textAlign:"center",paddingTop:"20px"}}>{this.props.data.platform}</td>
            <td style={{textAlign:"center",paddingTop:"20px"}}>{this.props.data.status.currentStatus}</td>
            <td style={{textAlign:"center",paddingTop:"20px"}}>{this.props.data.vmIP}</td>
            <td>
            <IconButton onClick={()=>this.start()}  tooltip="Create" iconStyle={{color:"green"}}>
            <Play />
          </IconButton>
          <IconButton onClick={()=>this.stop()}  tooltip="Stop" iconStyle={{color:"#FF6D00"}}>
      <Stop />
    </IconButton>
    <IconButton onClick={()=>this.delete()} tooltip="Delete" iconStyle={{color:"#F44336"}}>
      <Delete />
    </IconButton>
            </td>
            <td>
            <Link to={'/Report/'+this.props.data.name}>
            <IconButton tooltip="View Report" iconStyle={{color:"white"}} >
      <Report />
    </IconButton>
   </Link>
            </td>
            {/*<Dialog
          title={this.props.data.name+" Detail"}
          actions={actions}
          modal={false}
          open={this.state.openCollapse}
          onRequestClose={this.handleClose}
          style={{borderRadius: "20px"}}
        >
         Related Data will be shown Here
        </Dialog>*/}
            <Dialog
              title={this.props.data.activeExp+" API list"}
              actions={actions}
              modal={false}
              open={this.state.openCollapse}
              onRequestClose={this.handleClose}
              style={{borderRadius: "20px"}}
            >
              <style>{`
                td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                tr:nth-child(even) {
                    background-color: #dddddd;
                }
                table {
                  width: "100%"
                }

              `}</style>
              <div style={{"overflow-y": "auto"}}> 
              <table style={{width:"100%"}}>
              <tr>
               <th>Name</th>
               <td> Create Accounts </td>
              </tr>
              <tr>
               <th>API</th>
               <td>{"http://"+this.props.data.vmIP+":3001/blockchain/v1/account/create"}</td>
              </tr>
              </table>
              <br/>
              <table style={{width:"100%"}}>
              <tr>
               <th>Name</th>
               <td> Get All Accounts </td>
              </tr>
              <tr>
               <th>API</th>
               <td>{"http://" + this.props.data.vmIP + ":3001/blockchain/v1/account/getAll"}</td>
              </tr>
              </table>
              <br/>
              <table style={{width:"100%"}}>
              <tr>
               <th>Name</th>
               <td> Send a transaction to an account </td>
              </tr>
              <tr>
               <th>API</th>
               <td>{"http://" + this.props.data.vmIP + ":3001/blockchain/v1/tx/account"}</td>

              </tr>
              <tr>
              <th>Params</th>
              <td><pre>{JSON.stringify(params.sendTxnToAccnt, null, 2) }</pre></td>
              </tr>
              </table>
              <br/>
              <table style={{width:"100%"}}>
              <tr>
               <th>Name</th>
               <td> Get Transaction Details </td>
              </tr>
              <tr>
               <th>API</th>
               <td>{"http://" + this.props.data.vmIP + ":3001/blockchain/v1/tx/details?txHash={txnHash}"}</td>
              </tr>
              </table>
              <br/>
              <table style={{width:"100%"}}>
              <tr>
               <th>Name</th>
               <td> Create Contract </td>
              </tr>
              <tr>
               <th>API</th>
               <td>{"http://" + this.props.data.vmIP + ":3001/blockchain/v1/contract/create"}</td>
              </tr>
              <tr>
              <th>Params</th>
              <td><pre>{JSON.stringify(params.createContract, null, 2) }</pre></td>
              </tr>
              </table>
              <br/>
              <table style={{width:"100%"}}>
              <tr>
               <th>Name</th>
               <td> Send a transaction to a contract </td>
              </tr>
              <tr>
               <th>API</th>
               <td>{"http://" + this.props.data.vmIP + ":3001/blockchain/v1/tx/contract"}</td>
              </tr>
              <tr>
              <th>Params</th>
              <td><pre>{JSON.stringify(params.sendTxnToContract, null, 2) }</pre></td>
              </tr>
              </table>
              <br/>
              </div>
            </Dialog>
            
          </tr>
        )
    }
}