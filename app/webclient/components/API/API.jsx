import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
    import MenuItem from 'material-ui/MenuItem';
    import SelectField from 'material-ui/SelectField';
    import Axios from 'axios';   

    import {Grid, Row,Col} from 'react-bootstrap';
    import ethAPI from './ethAPI.js';
    import hypAPI from './hypAPI.js';
    import RaisedButton from 'material-ui/RaisedButton'
    import DisplayResponse from '../CheckAPI/DisplayResponse';
    import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/JSONPretty.monikai.styl';
import Dropzone from 'react-dropzone';
import InstallationActivity from './InstallationActivity';
export default class API extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          imageURL: '',
          value:"",
          items:[],
          apiList:[],
          eachApiList:'',
          responseData:[],
          apiResult:{},
          result:false,
          instanceData:{},
          platformAPIData:{},
          installView:false,
          ChainCodefileName:'',
          activity:[]
        };
      }

    

    handleDrpDwnChange = (event, index, value) => {
         
        this.setState({value});

          this.state.responseData.forEach((data)=>{
              console.log(data.instanceId);
                if(data.activeExp==value){
                    this.setState({instanceData:data})
                    if(data.platform=="Ethereum" || data.platform=="Quoram"){
                        
                            console.log('inside eth');
                            ethAPI.forEach((data,i)=>{
                                this.state.apiList.push(<MenuItem value={data.desc} key={i} primaryText={data.desc} />)
                            })
                    }else if(data.platform=="Hyperledger"){
                        console.log('inside hyp');
                        hypAPI.forEach((data,i)=>{
                            this.state.apiList.push(<MenuItem value={data.desc} key={i} primaryText={data.desc} />)
                        })
                    }
                }
        });
        console.log('instance data in drop down');
         console.log(this.state.instanceData);
       
    }

    handleChangeAPITextArea=(e)=>{
        this.setState({apiTextArea:e.target.value});
    }
    handleAPIList = (event, index, value) => {
        this.setState({eachApiList:value});
        ethAPI.forEach((data)=>{
            if(data.desc==value){
                console.log('eth api list ')
                this.setState({platformAPIData:data})
                // JSON.stringify(data.params, null, 2) 
            }
        })
        hypAPI.forEach((data)=>{
            if(data.desc==value){
                console.log('hyp api list');
                console.log(data.params);
                this.setState({platformAPIData:data})
                // JSON.stringify(data.params, null, 2) 
            }
        })

        if(value=="Install and Instantiate Chain Code"){
            this.setState({installView:true})
        }
    }

    componentDidMount=()=>{
       
            let retrievedUserDetails= JSON.parse(sessionStorage.getItem('userLoginDetails'));  
            let runningInstance=[];
    Axios({
      method:'get',
      url:'http://laas-123.eastus.cloudapp.azure.com:8080/api/getInstanceData/'+retrievedUserDetails.username
    })
    .then(function(response){
      if(response.data.length==0){
        alert('no data found');
      }else{
        //   this.setState({responseData:response.data});
        response.data.forEach((data,i)=>{
            if(data.status.currentStatus=="running"){    
                // this.setState({instanceData:data}); 
                runningInstance.push(data);
                       
            this.state.items.push(<MenuItem value={data.activeExp} key={i} primaryText={data.activeExp} />);
            }
            
        })

        this.setState({responseData:runningInstance});
        console.log('response data');
        console.log(this.state.responseData);
        console.log('array record is');
        console.log(runningInstance);
      }
      }.bind(this))
        
    }

    // ---------------------------enroll---------------------------------------
    enroll=()=>{
        var obj={
            username:"Jim",
            orgName:"org1"
        }
        console.log(obj);
        // this.queryHyperleder();
    
        Axios({
            method:'POST',
            url:'http://'+this.state.instanceData.vmIP+':8080/users',
            data:obj,
            headers: {  
                'Content-Type': 'application/json'
            }
            })
            .then((data) => {
                console.log(data);
                sessionStorage.setItem('tokens',JSON.stringify(data.data));
               console.log('---------------enrolled successfull');
               if(this.state.apiList=="Install and Instantiate Chain Code"){
            //    this.installChaincode();
                let activObj={
                    activityName:"User Jim  enrolled to org1"
                }
                let newObj=[activObj].concat(this.state.activity);
                this.setState({activity:newObj});
            this.checkChannelExist();
            }else{

                this.queryHyperleder();
            }
            })
            .catch((error) => {
                console.log(error);
                console.log(error+"error in get Trade");
                });
    }

    // ---------------------------enroll end---------------------------------

    // ------------Channel Exist------------------------------

    checkChannelExist=()=>{
        let tokenData= JSON.parse(sessionStorage.getItem('tokens'));
        Axios({
            method:'GET',
            url:'http://'+this.state.instanceData.vmIP+':8080/channels?peer=peer1',
            headers: {  
                'Authorization': 'Bearer '+ tokenData.token,
                'Content-Type': 'application/json'
            }
            })
            .then((data) => {
                console.log(data);
                var self=this;
                if(data.data.channels.length>0){
                    let activObj={
                        activityName:"channel with mychannel Name Exist"
                    }
                    let newObj=[activObj].concat(this.state.activity);
                    this.setState({activity:newObj});
                    console.log('channel exist');
                    self.installChaincode();
                }else{
                    let activObj={
                        activityName:"Creating Mychannel"
                    }
                    let newObj=[activObj].concat(this.state.activity);
                    this.setState({activity:newObj});
                    self.createChannel();
                }
                console.log(data);
                // sessionStorage.setItem('tokens',JSON.stringify(data.data));
               console.log('---------------channel called successfull');
            //    this.installChaincode();

            // this.checkChannelExist();
            })
            .catch((error) => {
                console.log(error);
                console.log(error+"error in get Trade");
                });
    }
    // -------------------------Create  Channel----------------------------------

    createChannel=()=>{
        let tokenData= JSON.parse(sessionStorage.getItem('tokens'));
        console.log(tokenData);
        Axios({
          method:'POST',
          url:'http://'+this.state.instanceData.vmIP+':8080/channels',
          data:{ channelName:"mychannel",
            channelConfigPath:"../artifacts/channel/mychannel.tx"
          },
          headers: {  
              'Authorization': 'Bearer '+ tokenData.token,
              'Content-Type': 'application/json'
          }
          })
          .then((data) => {
              alert('created channel');
            console.log(data);
            console.log('channel created');
            this.joinChannel();
            // sessionStorage.setItem('tokens',JSON.stringify(data.data));
            // alert('successful sent request to server');
        })
        .catch((error) => {
            alert('channel already created');
            console.log(error);
            console.log(error+"error in get Trade");
            });
    
    }
    // --------------------------Create Channel End-----------------------------

    // -----------------------------Join Channel --------------------------------

    joinChannel=()=>{
        let tokenData= JSON.parse(sessionStorage.getItem('tokens'));
        console.log(tokenData);
        let peerArr= ["peer1","peer2"];
        Axios({
          method:'POST',
          url:'http://'+this.state.instanceData.vmIP+':8080/channels/mychannel/peers ',
          data:{  "peers": peerArr},
          headers: {  
              'Authorization': 'Bearer '+ tokenData.token,
              'Content-Type': 'application/json'
          }
          })
          .then((data) => {
            //   alert('join channel');
              console.log('-----------join channel successfull----------');
              let activObj={
                activityName:"org1 has joined the mychannel"
            }
            let newObj=[activObj].concat(this.state.activity);
            this.setState({activity:newObj});
                // this.installChaincode();
                var obj={
                    username:"Jack",
                    orgName:"org2"
                }
                console.log(obj);
              
            
                // console.log('button clicked');
            var self=this;
                Axios({
                    method:'POST',
                    url:'http://'+this.state.instanceData.vmIP+':8080/users',
                    data:obj,
                    headers: {  
                        'Content-Type': 'application/json'
                    }
                    })
                    .then((data) => {
                        console.log(data);
                        // sessionStorage.setItem('tokens',JSON.stringify(data.data));
                       console.log('--------------- org2 enrolled successfull');

                        var self1=self;
                        let activObj1={
                            activityName:"User Jack has enrolled on org2"
                        }
                        let newObj1=[activObj1].concat(self1.state.activity);
                        self1.setState({activity:newObj1});
        Axios({
          method:'POST',
          url:'http://'+this.state.instanceData.vmIP+':8080/channels/mychannel/peers ',
          data:{  "peers": peerArr},
          headers: {  
              'Authorization': 'Bearer '+ data.data.token,
              'Content-Type': 'application/json'
          }
          })
          .then((data) => {
            let activObj2={
                activityName:"Org2 has joined the mychannel"
            }
            let newObj2=[activObj2].concat(self1.state.activity);
            self1.setState({activity:newObj2});
            self1.installChaincode();
            console.log('----------------installing chain code--------------------')
          }).catch((error) => {
            console.log(error);
            console.log(error+"error in join channel for org2");
            });
                    
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log(error+"error in enrolling org2");
                        });

        })
        .catch((error) => {
            console.log(error);
            console.log(error+"error in joining channel");
            });
           
            
    }
    // -----------------------------Join Channel End--------------------------------

    // ----------------------Install Chain code--------------------------------------
    installChaincode=()=>{
        // this.state.ChainCodefileName)
        // console.log('file name in ins')
        var obj={
            peers:["peer1","peer2"],
            chaincodeName:this.state.ChainCodefileName,
            chaincodePath:'github.com/'+this.state.ChainCodefileName,
            chaincodeVersion:"v0"
        }

        console.log('-------------------obj for installchain code---------------');
        console.log(obj);

        let tokenData= JSON.parse(sessionStorage.getItem('tokens'));
    console.log(tokenData);
    console.log('object details');
    console.log(obj);
    Axios({
      method:'POST',
      url:'http://'+this.state.instanceData.vmIP+':8080/chaincodes',
      data:obj,
      headers: {  
          'Authorization': 'Bearer '+ tokenData.token,
          'Content-Type': 'application/json'
      }
      })
      .then((data) => {
        //   alert('install chaincode');
        console.log(data);
        console.log('----------------installchain code----------------');
        let activObj={
            activityName:"Installing chain code "+ this.state.ChainCodefileName
        }
        let newObj=[activObj].concat(this.state.activity);
        this.setState({activity:newObj});
        this.instantiate();

    })
    .catch((error) => {
       
        console.log(error);
        console.log(error+"error in get Trade");
        });

        this.setState({installChaincodeViewStatus:false});
    }
    // ------------------------Install chain code end--------------------------------

    // ------------------------------Instantiate chain code--------------------------

    instantiate=()=>{

        let tokenData= JSON.parse(sessionStorage.getItem('tokens'));
        console.log(tokenData);
        let obj={
            "chaincodeName":this.state.ChainCodefileName,
	"chaincodeVersion":"v0",
	"args":["a","100","b","200"]
        }
        // console.log('object details');
        // console.log(obj);

        Axios({
          method:'POST',
          url:'http://'+this.state.instanceData.vmIP+':8080/channels/mychannel/chaincodes' ,
          data:obj,
          headers: {  
              'Authorization': 'Bearer '+ tokenData.token,
              'Content-Type': 'application/json'
          }
          })
          .then((data) => {
              console.log('instantiate chaincode ------------------------------------------------');
            console.log(data);
            let activObj={
                activityName:"Instantiating chain code "+ this.state.ChainCodefileName
            }
            let newObj=[activObj].concat(this.state.activity);
            this.setState({activity:newObj});
        })
        .catch((error) => {
           
            console.log(error);
            console.log(error+"error in get Trade");
            });
    }
    // Instantiate chain code end-----------------------------------------------

    // ---------------------Query Hyperledger-------------------------------------
    queryHyperleder=()=>{
        console.log('submit text in text area');
        console.log(this.state.apiTextArea);
        let apiTextData=JSON.parse(this.state.apiTextArea);
        let tokenData= JSON.parse(sessionStorage.getItem('tokens'));
        let obj={};
        let url;
        if(this.state.platformAPIData.api=="hyp"){
            if(this.state.platformAPIData.params!=null){
            if(this.state.eachApiList=="Query Chaincode"){
            url="http://"+this.state.instanceData.vmIP+":8080/channels/mychannel/chaincodes/"+apiTextData.chainCodeName+"?peer=peer1&fcn="+apiTextData.functionName+"&args="+apiTextData.args;
            }else{
                url="http://"+this.state.instanceData.vmIP+":8080/channels/mychannel/chaincodes/"+apiTextData.chainCodeName;
                obj.args=apiTextData.args;
                obj.fcn=apiTextData.functionName;
            }
        }
        }else{
            url="http://"+this.state.instanceData.vmIP+this.state.platformAPIData.apiName;
            obj=this.state.textarea;
        }
        console.log('obj is');
        console.log(obj);
        console.log(url);
        Axios({
            method:this.state.platformAPIData.type,
            url:url,              
            data:obj,
            headers: {  
                'Authorization': 'Bearer '+ tokenData.token,
          'Content-Type': 'application/json'
      }
            })
            .then((data) => {
            console.log(data);
            this.setState({result:true});
            
            this.setState({apiResult:data})
            
                   
            })
            .catch((error) => {
              let obj={
                status:404,
                statusText:'Not Found',
                data:{message:'No Such API exist'}
              }
              this.setState({apiResult:obj})
    
            console.log(error);
            console.log(error+"error in get Trade");
            });
    }
    // ---------------------End Query Hyperledger ----------------------------------

    submit=()=>{
        // let tokenData= JSON.parse(sessionStorage.getItem('tokens'));
       
            console.log(this.state.platformAPIData.type);
            console.log(this.state.platformAPIData.params);
            // apiTextArea
console.log(this.state.apiTextArea);
            console.log('submitted');
            if(this.state.platformAPIData.api=="hyp"){
                    this.enroll();
            }
           else{
            Axios({
                method:this.state.platformAPIData.type,
                url:"http://"+this.state.instanceData.vmIP+this.state.platformAPIData.apiName,               
                data:this.state.apiTextArea,
                headers: {  
             
              'Content-Type': 'application/json'
          }
                })
                .then((data) => {
                console.log(data);
                this.setState({result:true});   
                if(this.state.platformAPIData.api=="hyp"){
                    console.log('inside if in submit');
                    this.setState({apiResult:data.data});    
                }             
                this.setState({apiResult:data})               
                       
                })
                .catch((error) => {
                  let obj={
                    status:404,
                    statusText:'Not Found',
                    data:{message:'No Such API exist'}
                  }
                  this.setState({apiResult:obj})
        
                console.log(error);
                console.log(error+"Technical Issue");
                });
            } 
        // }
    }

   

       onDrop =(acceptedFiles, rejectedFiles) =>{
        const data = new FormData();
        console.log(acceptedFiles[0]);
        console.log(acceptedFiles[0].lastModified);
        let ChainfileName=acceptedFiles[0].name.split('.');
   
        // console.log('file name is'+ chaincodeName);
        this.setState({ChainCodefileName:ChainfileName[0]});
        console.log('----------------set state of chaincode file name-----------');
        console.log(this.state.ChainCodefileName);
        data.append('file', acceptedFiles[0]);
   
    console.log(data);
    Axios({
        method:'POST',
        url:'http://'+this.state.instanceData.vmIP+':8080/upload',
        data:data,
        headers: {
            'content-type': 'multipart/form-data'
        }
      }).then((response) => {
        alert('--------------chain code uploaded---------------');
   
    });
      
             }
    


    render(){

        // let POSTView;
        // let paramData;
       console.log(this.props.params.instance);

       

        return(
            <div className="background">
            <div style={{marginTop:"60px"}} >
            <Grid>
                <Row>
                    <Col xs={2}>
             <SelectField 
          hintText="Select"
         floatingLabelText="Select Instance Name"
         value={this.state.value}
         onChange={this.handleDrpDwnChange}
       >
       {this.state.items}
        
     
       </SelectField>
       </Col>
       <Col xs={1}>
       </Col>
       <Col xs={7}>
       <SelectField 
          
          hintText="Select"
         floatingLabelText="Select API"
         value={this.state.eachApiList}
         onChange={this.handleAPIList}
         fullWidth={true}
       >
       {this.state.apiList}
        
     
       </SelectField>
       </Col>
       <Col xs={2}>
       <RaisedButton label="Submit Request" primary={true} onTouchTap={this.submit} style={{marginTop:"25px"}}/>
       </Col>
       </Row>
       <br />
       <br />
       
           {this.state.platformAPIData.params==null?null:
           <Row>
    <Col xs={6} >
    <h5> Sample Input </h5>
    <JSONPretty id="json-pretty" json={this.state.platformAPIData.params}></JSONPretty>
    </Col>
    <Col xs={6}>
    <h5>API Input </h5>
    <textarea className="api_textareaText" value={this.state.apiTextArea} onChange={this.handleChangeAPITextArea} placeholder="Put Json Data">

</textarea>
    </Col>
    </Row>
           }
           {
               this.state.installView==true?
               <Row>
                   <Col xs={6}>
               <Dropzone onDrop={(files) => this.onDrop(files)}>
<div>Try dropping chaincode here, or click to select check to upload.</div>
</Dropzone></Col>
<Col xs={6} style={{height:"100%", minHeight:"200px", overflowY:"auto"}}>
<center><h4> Activity List on Network </h4> </center>
<InstallationActivity data={this.state.activity} />
</Col>
</Row>
:null
           }
    
{this.state.result==true?
    <Row>
      <DisplayResponse data={this.state.apiResult}/>
      </Row>:null}
</Grid>
                </div>
                </div>
        )
    }
}