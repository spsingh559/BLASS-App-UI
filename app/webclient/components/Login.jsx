import React from 'react';
import { Link } from 'react-router';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {Grid} from 'react-bootstrap';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
// import {Link} from 'react-router';
// import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {Image} from 'react-bootstrap';

const userInfo=[
    {
    username: "Jit",
    password: "123456",
    roleType: 'A' 
  },
  {
    username: "Operator",
    password: "123456",
    roleType: 'B'
  }
]

const style = {
  labelStyle: {
      width: 'auto',
      height: '22px',
      family: 'Helvetica',
      size: '18px',
      weight: 'bold',
      style: 'normal',
      stretch: 'normal',
      height: 'normal',
      spacing: 'normal',
      align: 'left',
      color: '#ffffff',
      textTransform: 'lowercase'
     },
     labelStyle1: {
      width: 'auto',
      height: '22px',
      family: 'Helvetica',
      size: '18px',
      marginLeft:"-100px",
      weight: 'bold',
      style: 'normal',
      stretch: 'normal',
      height: 'normal',
      spacing: 'normal',
      align: 'left',
      color: '#ffffff',
      textTransform: 'lowercase'
     },
  buttonBorder:{
    width: '167px',
    height: '48px',
    radius: '6px',
    margin: '8px',
    border: 'solid 1px #ffffff',
    color:'#FFFFFF'
  }
} ;

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      userContactSignUp:'',
      userEmailSignUp:'',
      userPwdSignUp:'',
      signUpStatus:false,
      loginImage:0
    }
    this.handleUsername=this.handleUsername.bind(this);
    this.handlePassword=this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleUsername(e){
    this.setState({ username: e.target.value });
  }
  handlePassword(e){
    this.setState({ password: e.target.value });
  }

  handleUserEmailignUp=(e)=>{
    this.setState({userEmailSignUp:e.target.value});
  }

  handlePasswordSignUp=(e)=>{
    this.setState({userPwdSignUp:e.target.value});
  }
  handleUserConatctSignUp=(e)=>{
    this.setState({userContactSignUp:e.target.value});
  }
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }
  handleClick(e) {
    this.context.router.push('/');
    
  }

  signUp=()=>{
    this.setState({signUpStatus:true});
  }

  handleSignUpClick=()=>{
    let signUpObj={
      _id:Date.now(),
      userEmailSignUp:this.state.userEmailSignUp,
      userPwdSignUp:this.state.userPwdSignUp,
      userContactSignUp:this.state.userContactSignUp
    }
    

  }

  loginClick=()=>{
    
    let obj={
      username:this.state.username,
      password:this.state.password
  }

  Axios({
    method:'post',
    url:'http://laas-123.eastus.cloudapp.azure.com:8080/api/login',
    data:obj
  })
  .then((data) => {
   console.log(data)
    
    if(data.data.response=="Succes"){
      sessionStorage.setItem('userLoginDetails',JSON.stringify(data.data));
      
      


      this.context.router.push('/');



    }else{
      alert('login Failed');
    }

  })
  .catch((error) => {
    console.log(error);
    console.log(error+"error in Login data for post");
  });

   
  }

  navigationLandingPage=()=>{
    this.context.router.push('/landingPage');
  }

  enterUserName=()=>{
    this.setState({loginImage:this.state.loginImage+1});
    // alert('hello');
  }
  enterPass=()=>{
    this.setState({loginImage:this.state.loginImage+1});
  }
  render() {
    let finalImage;
    if(this.state.loginImage==0){
      finalImage= <Image  src="../images/firstImage.jpeg" height="100px" width="200px" circle />;
    }else if(this.state.loginImage==1){
      finalImage= <Image  src="../images/roboWatching.jpeg" height="100px" width="200px" circle />;
    }else  if(this.state.loginImage==2){
      finalImage= <Image  src="../images/robohide.jpeg" height="100px" width="200px" circle />;
    }
    /*console.log("----Session ID Login----");
    sessionStorage.setItem("userId", "A100");
    sessionStorage.setItem("emailId", "jitendra.chauhan2@wipro.com");
    let id =sessionStorage.getItem("userId");
    let emailid =sessionStorage.getItem("emailId");
    console.log(id);
    console.log(emailid);*/
    let title=[<span>
      <Image  src="../images/wipro.jpg" height="50px" width="50px" circle />
      <p className="pull-right" style={{marginRight:"500px"}}>Blockchain Lab as a Service</p>
  </span>
      ]
    
      return (
        <div>
        <AppBar
            title={title}
            style={{position: "fixed",top:'0',backgroundColor: '#1f497d'}}
           >
          <FlatButton style={style.labelStyle1} label="Home" onTouchTap={this.navigationLandingPage} />
          </AppBar>
        <div className="backgroundLogin"> 
        <center>
        <div style={{height:'450px',width:'500px',marginTop:'100px',borderRadius: "6px",border: "solid 1px black"}}  >
        {/* <pap style={{height:'300px',width:'500px',backgroundColor:'white',marginTop:'200px'}}> */}


        <h2 style={{marginTop: '50px',color:"white"}}>
        Secured Authentication System
        </h2>
        {/* <br/>
        {finalImage}
        <br /> */}
        <br />

        <TextField
      
      hintText="User Name"
      hintStyle={{color:"white"}}
      inputStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      floatingLabelText="Enter User Name"
      onChange = {(event,newValue) => this.setState({username:newValue})}
      onMouseDown={this.enterUserName}
    /><br />
    <TextField
    type="password"
      hintText=" Password"
      inputStyle={{color:"white"}}
      hintStyle={{color:"white"}}
      floatingLabelStyle={{color:"white"}}
      onChange = {(event,newValue) => this.setState({password:newValue})}
      floatingLabelText="Enter Password"
      onMouseDown={this.enterPass}
    /><br />
        <div style={{marginTop:"50px"}}>
        <RaisedButton label="Login" primary={true}  onTouchTap={this.loginClick}/>
        </div>
        </div>
        </center>
        </div>
        </div>
        )
    }
  }