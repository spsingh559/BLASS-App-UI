import React from 'react';
import {Row, Col} from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/JSONPretty.monikai.styl';

export default class DisplayResponse extends React.Component{

   state={
       raw:this.props.data.data
   }

   handleChangeRaw=(e)=>{
       this.setState({raw:e.target.value});
   }
    render(){
        console.log('inside Display response');
console.log(this.props.data)
        return(
            <div style={{marginTop:"100px", height:"300px", width:"1100px", borderRadius: "6px",border: "solid 1px #d5d5d5"}}>
    {this.props.data!="undefined"? 
                <Row>
                    <Col xs={10}>
                    <JSONPretty id="json-pretty" json={this.props.data.data}></JSONPretty>
                    {/* {this.props.data.data} */}
</Col>
<Col xs={2}>
<h5> Summary </h5>
Status : {this.props.data.status}
<br />
Status Text : {this.props.data.statusText} 
{/* Time : {this.props.data.headers.date} */}
 </Col>
                    </Row>:
                    null} 
                </div>
        )
    }
}