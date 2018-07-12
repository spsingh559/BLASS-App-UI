import React from 'react';

import {DropdownButton,FormGroup,Col,Row,Grid,Button,form,ControlLabel,FormControl} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton'
import {Tabs, Tab} from 'material-ui/Tabs';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';
import Axios from 'axios';
import DisplayResponse from './DisplayResponse';
import ShowKeyData from './ShowKeyData';
import ShowKeyDataToken from './ShowKeyDataToken';

export default class CheckAPI extends React.Component{
state={
    value:"",
    apiType:'',
    apiUrl:"",
    postView:false,
    lender:'',
    radioView:false,
    rawView:false,
    raw:"",
    keyData:[],
    keyDataToken:[],
    key:'',
    keyToken:'',
    valueToken:'',
    responseData:[]
}
handleChangeTradeComment = (event, index, value) => this.setState({raw:event.target.value});
handleChangeRaw=(e)=>{
  this.setState({raw:e.target.value});
}

handleChangeAPI=(event, index, value) =>{
this.setState({apiType:value});
if(value=="POST"){
  this.setState({postView:true});
}else{
  this.setState({postView:false});
}
}

handleChangeApiUrl=(e)=>{
  this.setState({apiUrl:e.target.value});
}
submit=()=>{
    // alert(this.state.apiType);
    if(this.state.apiType=="GET"){
      Axios({
        method:'get',
        url:this.state.apiUrl,
        headers: {  
            'Authorization': this.state.valueToken,
            'Content-Type': 'application/json'
        }
        })
        .then((data) => {
        console.log(data);
       
        this.setState({responseData:data})
        
               
        })
        .catch((error) => {
          let obj={
            status:404,
            statusText:'Not Found',
            data:{message:'No Such API exist'}
          }
          this.setState({responseData:obj})

        console.log(error);
        console.log(error+"error in get Trade");
        });
    }
}


radioChange=(e,value)=>{
  console.log(value);
  this.setState({lender:value});
  if(value=="form-data"){
    this.setState({radioView:true,rawView:false});
  }
  if(value=="raw"){
    this.setState({rawView:true,radioView:false});
  }
}

addMore=()=>{
  let obj={
    _id:Date.now(),
    key:this.state.key,
    value:this.state.value
  }

  console.log('obj is');
  console.log(obj);
  let newData=[obj].concat(this.state.keyData);
  this.setState({keyData:newData,key:'',value:''});
}

edit=(obj)=>{
  this.state.keyData.forEach((data,i)=>{          
   
    if(data._id==obj._id){
      var editData=this.state.keyData.splice(i,1,obj);
      editData=null;
       
    }
  }) 
  this.setState({keyData:this.state.keyData});      
}

remove=(_id)=>{
  this.state.keyData.forEach((data,i)=>{          
   
    if(data._id==_id){
      var editData=this.state.keyData.splice(i,1);
      editData=null;
       
    }
  }) 
  this.setState({keyData:this.state.keyData});  
}

addMoreToken=()=>{
  let obj={
    _id:Date.now(),
    keyToken:this.state.keyToken,
    valueToken:this.state.valueToken
  }

  console.log('obj is');
  console.log(obj);
  let newData=[obj].concat(this.state.keyDataToken);
  this.setState({keyDataToken:newData,keyToken:'',valueToken:''});
}

editTokens=(obj)=>{
  this.state.keyDataToken.forEach((data,i)=>{          
   
    if(data._id==obj._id){
      var editData=this.state.keyDataToken.splice(i,1,obj);
      editData=null;
       
    }
  }) 
  this.setState({keyDataToken:this.state.keyDataToken});      
}

removeToken=(_id)=>{
  this.state.keyDataToken.forEach((data,i)=>{          
   
    if(data._id==_id){
      var editData=this.state.keyDataToken.splice(i,1);
      editData=null;
       
    }
  }) 
  this.setState({keyDataToken:this.state.keyDataToken});  
}



    render(){

      let radioViewFormData;
      if(this.state.radioView==true){
        radioViewFormData=[
          <div>
          <Row>
            <Col xs={4}>
          <TextField
  value={this.state.key}
      hintText=" Key"
      onChange = {(event,newValue) => this.setState({key:newValue})}
      floatingLabelText="Enter Key"
      fullWidth={true}
    />
    </Col>
    <Col xs={4}>
          <TextField
   value={this.state.value}
      hintText=" Value"
      onChange = {(event,newValue) => this.setState({value:newValue})}
      floatingLabelText="Enter Value"
      fullWidth={true}
    />
    </Col>
    <Col xs={4}>
    <FloatingActionButton mini={true} >
      <ContentAdd onTouchTap={this.addMore}/>
    </FloatingActionButton>
    </Col>

    </Row>
    <Row>
      <ShowKeyData data={this.state.keyData} edit={this.edit} remove={this.remove}/>
      <RaisedButton label="Add Data" primary={true} onTouchTap={this.submitKeyData} />
      </Row>
      </div>
        ]
      }else {
        radioViewFormData=null;
      }

      let radioViewRaw;
      if(this.state.rawView==true){

        radioViewRaw=[
          <Row>
          <textarea className="newTrade_textarea" value={this.state.raw} onChange={this.handleChangeRaw} placeholder="Put Json Data">

          </textarea>
          <br />
           <RaisedButton label="Add Raw Data" primary={true} onTouchTap={this.addRaw} />
           </Row>

        ]
      }else{
         radioViewRaw=null;
      }


      let postView;
      if(this.state.postView==true){
        postView=[
          <Tabs>
    <Tab label="Headers" >
      <div>
      
      <Row>
            <Col xs={4}>
          <TextField
  value={this.state.keyToken}
      hintText=" Key"
      onChange = {(event,newValue) => this.setState({keyToken:newValue})}
      floatingLabelText="Enter Key"
      fullWidth={true}
    />
    </Col>
    <Col xs={4}>
          <TextField
   value={this.state.valueToken}
      hintText=" Value"
      onChange = {(event,newValue) => this.setState({valueToken:newValue})}
      floatingLabelText="Enter Value"
      fullWidth={true}
    />
    </Col>
    <Col xs={4}>
    <FloatingActionButton mini={true} >
      <ContentAdd onTouchTap={this.addMoreToken}/>
    </FloatingActionButton>
    </Col>

    </Row>
    <Row>
      <ShowKeyDataToken data={this.state.keyDataToken} editTokens={this.editTokens} removeToken={this.removeToken}/>
      <RaisedButton label="Add Header" primary={true} onTouchTap={this.submitToken} />
      </Row>
      
        
      </div>
    </Tab>
    <Tab label="Body" >
     <Row>
     <RadioButtonGroup name="shipSpeed" defaultSelected={this.state.lender} onChange={this.radioChange}>
      <RadioButton
      
        value="form-data"
        label="form-data"
       
      />
      
      <RadioButton
      
        value="raw"
        label="raw"
       
       />
      </RadioButtonGroup>
      {radioViewFormData}
      {radioViewRaw}
    </Row>
      
    </Tab>
  </Tabs>
        ]
      }else{
        postView= null;
      }

     
        return(
            <div style={{marginTop:"60px"}}>
<Grid>
<Row>
  <Col xs={2}>
  <SelectField 
          
           hintText="Select"
          floatingLabelText="Select API Type"
          value={this.state.apiType}
          onChange={this.handleChangeAPI}
        >
          <MenuItem value="GET" primaryText="GET" />
          <MenuItem value="POST" primaryText="POST" />
      
        </SelectField>
  </Col>
  <Col xs={8}>
  <TextField autoComplete="off"
           hintText="API URL"
          floatingLabelText="Enter API URL"
          value={this.state.apiUrl}
          onChange={this.handleChangeApiUrl}
          fullWidth={true}
          />
  </Col>
  <Col xs={2}>
  <RaisedButton label="Submit" primary={true} onTouchTap={this.submit} style={{marginTop:"25px"}}/>
  </Col>
  </Row>

  <Row>
    {postView}
    </Row>

    <Row>
      <DisplayResponse data={this.state.responseData}/>
      </Row>
</Grid>           
            </div>
        )
    }
}