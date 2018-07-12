import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import Paper from 'material-ui/Paper';
// import {write} from "node-yaml";
// var yaml = require('write-yaml');
var writeData = require('write-data');
 
  

const style = {
    height: 100,
    width: 300,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    cursor: "pointer"
  };

export default class Hyperledger extends React.Component{

    componentDidMount=()=>{
        var data = {language: 'node_js', node_js: ['0.10', '0.12']};
 
// async
writeData('.travis.yml', data, function(err) {
  // do stuff with "err"
});
 
// sync
writeData.sync('.travis.yml', data);
    }
    render(){

        return(
            <div style ={{marginTop:"90px"}}>
            
            <Grid>
                <center>
                    <h1> Hyperledger Setup </h1>
                    </center>
            <Row style={{marginTop:"50px",fontColor:"blue"}}>
            <Col sm ={4}>
            <Paper style={style} zDepth={5} >
                <h1>Enroll User</h1>
                </Paper>
                </Col>
                <Col sm ={4}>
                <Paper style={style} zDepth={5} >
                <h1>
                Create Channel
                </h1>
                </Paper>
                </Col>
                <Col sm ={4}>
                <Paper style={style} zDepth={5} >
                <h1>
                Join Channel
                </h1>
                </Paper>
                </Col>
                
                </Row>
                </Grid>
                </div>
        )
    }
}