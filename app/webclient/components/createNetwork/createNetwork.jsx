import React from 'react';
import axios from 'axios';
import {Table,Grid,Row,Col,Panel} from 'react-bootstrap';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator, ValidatorForm, SelectValidator } from 'react-material-ui-form-validator';
import CircularProgress from 'material-ui/CircularProgress';
import Axios from 'axios';
export default class createNetwork extends React.Component{



    constructor(props){
        super(props);
        var genericErrorMessage = 'Please fill the mandate field';
        this.state = {
            cloud : "",
            platform:"",
            instanceName:"",
            noOfEthereumnodes : 0,
            noOfEthereumMiners : 0,
            difficultyLevel:0,
          	noOfOrganization:0,
          	noOfPeerAndCANodes:0,
          	noOfOrdererNodes:0,
          	noOfChannels:0,
          	noOfQuorumNodes:0,
          	noOfQuorumMiners:0,
          	queueThresholdLimit:0,
            genericErrorMessage: genericErrorMessage,
            platformErrorMessage: genericErrorMessage,
            cloudErrorMessage: genericErrorMessage,
            loading: true,
            showForm: false

	    
        }
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
          var showForm = true;
          if(response.data.length >=5){
            // showForm = false;

          }
          this.setState({
            loading: false,
            showForm: showForm
          })
          // console.log('state data');
          // console.log(this.state.instanceData);
        
      }.bind(this));

    }
      handleChangePlatform = (event, index, value) => {

        this.setState({platform:value, platformErrorMessage:""})
      };
      handleChangeCloud = (event, index, value) => {

        this.setState({cloud:value, cloudErrorMessage: ""})
      };
      handleChangeinstanceName= (e) => this.setState({instanceName:e.target.value});
      handleChangeDifficulty=(e)=>this.setState({difficultyLevel:e.target.value})
      handleChangenumberOfEthereumMiners=(e)=>this.setState({noOfEthereumMiners :e.target.value})
      handleChangenumberOfEthereumNodes=(e)=>this.setState({noOfEthereumnodes:e.target.value})
      handleChangenoOfOrganization=(e)=>this.setState({noOfOrganization:e.target.value})
      handleChangenoOfPeerAndCANodes=(e)=>this.setState({noOfPeerAndCANodes:e.target.value})
      handleChangeNoOfOrdererNodes=(e)=>this.setState({noOfOrdererNodes:e.target.value})
      handleChangenoOfChannels=(e)=>this.setState({noOfChannels:e.target.value})
      handleChangeNoOfQuorumNodes=(e)=>this.setState({noOfQuorumNodes:e.target.value})
      handleChangeNoOfQuorumMiners=(e)=>this.setState({noOfQuorumMiners:e.target.value})
      handleChangeQueueThresholdLimit=(e)=>this.setState({queueThresholdLimit:e.target.value})


      static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }





handleLaunchClick(e){
       
        const { cloud,platform,instanceName,
            noOfEthereumnodes,
            noOfEthereumMiners,
            difficultyLevel,
            noOfOrganization,
            noOfPeerAndCANodes,
            noOfOrdererNodes,
            noOfChannels,
            noOfQuorumNodes,
            noOfQuorumMiners} = this.state;
            const vmName =  instanceName;

            console.log("File: CreateNetwork.JS: Func:'HandleLaunchClick', Current State Data",this.state)
            var username = JSON.parse(sessionStorage.getItem('userLoginDetails')).username;

        axios.post(`http://laas-123.eastus.cloudapp.azure.com:8000/launchExperiment`,{
            cloud,
            platform,
            vmName,
            noOfEthereumnodes,
            noOfEthereumMiners,
            difficultyLevel,
            noOfOrganization,
            noOfPeerAndCANodes,
            noOfOrdererNodes,
            noOfChannels,
            noOfQuorumNodes,
            noOfQuorumMiners,
            username
        }).then(function(response){
            // var count = JSON.parse(sessionStorage.getItem('instanceInfo')).count;
            // sessionStorage.setItem('instanceInfo',JSON.stringify({"count": count+1}));
            this.context.router.push('/instanceInfo');
            console.log(response.data);
        }.bind(this))
    }
      submitCreateNetwork=()=>{
        var obj={
          instanceID:Date.now(),
          name:this.state.instanceName,
          nodes:this.state.numberOfNodes,
          creationTime:Date.now(),
          cloud:this.state.cloudDrpDwn,
          status:"Initializing",
          externalIP:"34.123.34.23",
          platform:this.state.platformDrpDwn
        }

        console.log('created object for network is------------------');
        console.log(obj);
        this.context.router.push('/instanceInfo');
      }
     
    render(){
      let platformInfo;

      // var count = JSON.parse(sessionStorage.getItem('instanceInfo')).count;s

      // console.log("Instances count :", count);
      
      if(this.state.platform=="Ethereum"){
        platformInfo=[
          <div>
          <Row>
        <Col xs={4}>
        Nodes
        </Col>
        <Col xs={4}>
        <TextValidator
      floatingLabelText="Number of Nodes"
      type="number"
      floatingLabelFixed={true}
      fullWidth={true}
      inputStyle={{color:"white",fontSize:"20px"}}
      floatingLabelStyle={{color:"white",fontSize:"20px"}}
      onChange={this.handleChangenumberOfEthereumNodes}
      value={this.state.noOfEthereumnodes}
      validators={['minNumber:1']}
      name="nodes"
      errorMessages={['Nodes should be more than this']}
    />
        </Col>
        </Row>

        <Row>
        <Col xs={4}>
        Miners
        </Col>
        <Col xs={4}>
        <TextValidator
      floatingLabelText="Number of miners"
      type="number"
      floatingLabelFixed={true}
      fullWidth={true}
      inputStyle={{color:"white",fontSize:"20px"}}
      floatingLabelStyle={{color:"white",fontSize:"20px"}}
      onChange={this.handleChangenumberOfEthereumMiners}
      value={this.state.noOfEthereumMiners }
      validators={['minNumber:1']}
      name="miners"
      errorMessages={['Miners should be more than this']}
    />
        </Col>
        </Row>

        <Row>
        <Col xs={4}>
        Difficulty
        </Col>
        <Col xs={4}>
        <TextValidator
      floatingLabelText="difficulty level "
      type="number"
      floatingLabelFixed={true}
      fullWidth={true}
      inputStyle={{color:"white",fontSize:"20px"}}
      floatingLabelStyle={{color:"white",fontSize:"20px"}}
      onChange={this.handleChangeDifficulty}
      value={this.state.difficultyLevel}
      validators={['minNumber:1']}
      name="difficulty"
      errorMessages={['Difficulty should be more than this']}
    />
        </Col>
        </Row>
        </div>

        ]}
        else if(this.state.platform=="Hyperledger" ){
         
          platformInfo=[
            <div>
            <Row>
          <Col xs={4}>
          Organizations
          </Col>
          <Col xs={4}>
          <TextValidator
        floatingLabelText="Number of organizations"
        type="number"
        floatingLabelFixed={true}
        fullWidth={true}
        inputStyle={{color:"white",fontSize:"20px"}}
        floatingLabelStyle={{color:"white",fontSize:"20px"}}
        onChange={this.handleChangenoOfOrganization}
        value={this.state.noOfOrganization}
        validators={['minNumber:1']}
        name="numberOfOrgs"
        errorMessages={['Organisation should be more than this']}
      />
          </Col>
          </Row>
  
          <Row>
          <Col xs={4}>
          Peers and CA Nodes
          </Col>
          <Col xs={4}>
          <TextValidator
        floatingLabelText="Number of peers and CA nodes in each organization"
        type="number"
        floatingLabelFixed={true}
        fullWidth={true}
        inputStyle={{color:"white",fontSize:"20px"}}
        floatingLabelStyle={{color:"white",fontSize:"20px"}}
        onChange={this.handleChangenoOfPeerAndCANodes}
        value={this.state.noOfPeerAndCANodes}
        validators={['minNumber:1']}
        name="numberOfPeers"
        errorMessages={['Peers should be more than this']}
      />
          </Col>
          </Row>
  
          <Row>
          <Col xs={4}>
          Orderer Nodes
          </Col>
          <Col xs={4}>
          <TextValidator
        floatingLabelText="Number of orderer nodes"
        type="number"
        floatingLabelFixed={true}
        fullWidth={true}
        inputStyle={{color:"white",fontSize:"20px"}}
        floatingLabelStyle={{color:"white",fontSize:"20px"}}
        onChange={this.handleChangeNoOfOrdererNodes}
        value={this.state.noOfOrdererNodes}
        validators={['minNumber:1']}
        name="ordererNodes"
        errorMessages={['Orderer nodes should be more than this']}
      />
          </Col>
          </Row>

          <Row>
          <Col xs={4}>
          Channels
          </Col>
          <Col xs={4}>
          <TextValidator
        floatingLabelText="Number of channels"
        type="number"
        floatingLabelFixed={true}
        fullWidth={true}
        inputStyle={{color:"white",fontSize:"20px"}}
        floatingLabelStyle={{color:"white",fontSize:"20px"}}
        onChange={this.handleChangenoOfChannels}
        value={this.state.noOfChannels}
        validators={['minNumber:1']}
        name="channels"
        errorMessages={['Channels should be more than this']}
      />
          </Col>
          </Row>
          
          </div>]
  
        }else if(this.state.platform=="Quorum"){
         
          platformInfo=[
            <div>
            <Row>
          <Col xs={4}>
          Nodes
          </Col>
          <Col xs={4}>
          <TextValidator
        floatingLabelText="Number of Nodes"
        type="number"
        floatingLabelFixed={true}
        fullWidth={true}
        inputStyle={{color:"white",fontSize:"20px"}}
        floatingLabelStyle={{color:"white",fontSize:"20px"}}
        onChange={this.handleChangeNoOfQuorumNodes}
        value={this.state.noOfQuorumNodes}
        validators={['minNumber:1']}
        name="nodes"
        errorMessages={['Nodes should be more than this']}
      />
          </Col>
          </Row>
  
          {/*<Row>
          <Col xs={4}>
          Consensus algorithm (RAFT or BFT)
          </Col>
          <Col xs={4}>
          <TextField
        floatingLabelText="Number of miners"
        type="number"
        floatingLabelFixed={true}
        fullWidth={true}
        inputStyle={{color:"white",fontSize:"20px"}}
        floatingLabelStyle={{color:"white",fontSize:"20px"}}
        onChange={this.handleChangeNoOfQuorumMiners}
        value={this.state.noOfQuorumMiners}
      />
          </Col>
          </Row>*/}
  
          {/*<Row>
          <Col xs={4}>
          Queue threshold limit
          </Col>
          <Col xs={4}>
          <TextValidator
        floatingLabelText="difficulty level "
        type="number"
        floatingLabelFixed={true}
        fullWidth={true}
        inputStyle={{color:"white",fontSize:"20px"}}
        floatingLabelStyle={{color:"white",fontSize:"20px"}}
        onChange={this.handleChangeQueueThresholdLimit}
        value={this.state.queueThresholdLimit}
        validators={['minNumber:1']}
        name="qThresholdLimit"
        errorMessages={['Queue threshold limit should be more than this']}
      />
          </Col>
          </Row>*/}
          </div>
  
          ]}else if(this.state.platform=="Corda"){
            platformInfo=[
              <div>
              <Row>
            <Col xs={4}>
           Nodes
            </Col>
            <Col xs={4}>
            <TextValidator
          floatingLabelText="Number of Nodes"
          type="number"
          floatingLabelFixed={true}
          fullWidth={true}
          inputStyle={{color:"white",fontSize:"20px"}}
          floatingLabelStyle={{color:"white",fontSize:"20px"}}
          onChange={this.handleChangenumberOfNodes}
          value={this.state.numberOfNodes}
          validators={['minNumber:1']}
          name="numberofNodes"
          errorMessages={['Nodes should be more than this']}
        />
            </Col>
            </Row>
    
            <Row>
            <Col xs={4}>
            Name of Node
            </Col>
            <Col xs={4}>
            <TextValidator
          floatingLabelText="Name of Node"
          
          floatingLabelFixed={true}
          fullWidth={true}
          inputStyle={{color:"white",fontSize:"20px"}}
          floatingLabelStyle={{color:"white",fontSize:"20px"}}
          onChange={this.handleChangeestimatedBudget}
          value={this.state.estimatedBudget}
          validators={['required']}
          name="nameOfNode"
          errorMessages={['this field is required']}
        />
            </Col>
            </Row>
    
            {/*<Row>
            <Col xs={4}>
            Node Role mapping (Notary, Issuer, Participant)

            </Col>
            <Col xs={4}>
            <TextField
          floatingLabelText="  Node – Role mapping (Notary, Issuer, Participant)  "
          type="number"
          floatingLabelFixed={true}
          fullWidth={true}
          inputStyle={{color:"white",fontSize:"20px"}}
          floatingLabelStyle={{color:"white",fontSize:"20px"}}
          onChange={this.handleChangeDifficulty}
          value={this.state.Difficulty}
        />
            </Col>
            </Row>*/}
            </div>
    
            ]
          }

        //   if(this.state.loading) {
        //   return <CircularProgress size={80} thickness={5} />
        // }

        // if(this.state.showForm === false) {
        //   return <h1>You have to delete one or more  instance in order to create a new one.</h1>
        // }
    
        return(
          <div  style={{marginTop:"65px"}}>
            <Grid>
               
              <div style={{marginTop:"30px", fontSize:"20px", color:"white",height:'auto',width:'auto',borderRadius: "6px",border: "solid 1px #d5d5d5"}}>
                
                {(this.state.loading)?<center><CircularProgress size={80} thickness={5} /></center>:""}
                {(this.state.showForm === false)?<h1>You have to delete one or more  instance in order to create a new one.</h1>:""}
                {(this.state.showForm ===true && this.state.loading === false)?<center>
                  <ValidatorForm
                    ref="form"
                    onSubmit={(e)=>this.handleLaunchClick(e)}
                  >
                    <Row>
                      <h2> Create a Network </h2>
                    </Row>
                    <Row>

                      <Col xs={4}>
                        Platform
                      </Col>
                      <Col xs={4}>
                      
                        <SelectValidator
                          floatingLabelText="Platform List"
                          value={this.state.platform}
                          onChange={this.handleChangePlatform}
                          floatingLabelStyle={{color:"white"}}
                          fullWidth={true}
                          labelStyle={{color:"white"}}
                          validators={['required']}
                          name="platform"
                          errorMessages={['this field is required']}
                        >
                          <MenuItem value="Ethereum" primaryText="Ethereum" />
                          <MenuItem value="Hyperledger" primaryText="Hyperledger" />
                          <MenuItem value="Quorum" primaryText="Quorum" />
                          <MenuItem value="Corda" primaryText="Corda" />
                        </SelectValidator>
                        
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                      Cloud
                      </Col>
                      <Col xs={4}>
                        <SelectValidator
                          floatingLabelText="Select Cloud"
                          value={this.state.cloud}
                          onChange={this.handleChangeCloud}
                          floatingLabelStyle={{color:"white"}}
                          fullWidth={true}
                          labelStyle={{color:"white"}}
                          validators={['required']}
                          name="cloud"
                          errorMessages={['this field is required']}

                        >
                          <MenuItem value="azure" primaryText="Microsoft Azure" />
                          <MenuItem value="aws" primaryText="Amazon Web Service" />
                          <MenuItem value="gcloud" primaryText="Google Cloud" />
                        </SelectValidator>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={4}>
                      Instance Name
                      </Col>
                      <Col xs={4}>
                        <TextValidator
                          floatingLabelText="Instance Name"
                          floatingLabelFixed={true}
                          fullWidth={true}
                          inputStyle={{color:"white",fontSize:"20px"}}
                          floatingLabelStyle={{color:"white",fontSize:"20px"}}
                          onChange={this.handleChangeinstanceName}
                          value={this.state.instanceName}
                          validators={['required']}
                          name="instanceName"
                          errorMessages={['this field is required']}
                          
                        />
                      </Col>
                      <Col xs={4}>
            	         <div></div>
                      </Col>
                    </Row>
                    {platformInfo}
                    <br/>
                    <RaisedButton label="Submit" primary={true} type="submit"  style={{width:"180px"}} labelStyle={{fontWeight:"bold",fontSize:"16px"}} />
                  </ValidatorForm>
                  
                </center>:""}
                <br />
                <br />
              </div>
     

            </Grid>
            <video id="createNetwork" loop autoPlay>
              <source src="../images/network.mp4" type="video/mp4" />
            </video>   
          </div>
        )
    }
}