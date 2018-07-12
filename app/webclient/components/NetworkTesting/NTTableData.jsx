import React from 'react';
import {
    Table
  } from 'react-bootstrap';

  import EachNTData from './EachNTData.jsx';
  import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

export default class NTTableData extends React.Component{

  

    render(){
      console.log('test data');
      // console.log(this.props.testData.Platform);
      let Data;
      let newData;
      let resultName;
      let timeStamp;
      if( this.props.testData[0] !="undefined" && this.props.testData.length!=0){
        // console.log(this.props.testData[0]);
      // // if(this.pro)
      
      //   }else{
      //     console.log('insuide else');
       // Data=[ <Row>
      //   <Col xs={3}>
      //   <b>
      // <h5>Result Name {" "} {this.state.testData[0].resultName} </h5>
      // </b>
      // </Col>

      // <Col xs={4}>
      // <b>
      // <h5>Date {" "} {this.state.testData[0].timeStamp}</h5>
      // </b>
      // </Col>
      // </Row>
      resultName=this.props.testData[0].resultName;
      timeStamp=this.props.testData[0].timeStamp;
    
          newData= this.props.testData[0].Platform.map((data,index)=>{
            return(
                <EachNTData 
                key={index}
                data={data}
               
                />
            )
        });  
      }
    

        
        return(

          <Card>
          <CardHeader
            title={"Result Name: "+ resultName}
            subtitle={"Date and Time: "+timeStamp}
        
          />
         
          <CardText >
          <Table  bordered style={{textAlign:"center"}}>
  <thead style={{backgroundColor:"#ffe4b2",color:"black"}}>
    <tr>
  
           
	
      <th>Ranking</th>
      <th>Instance Name</th>
      <th>Cloud Name</th>
      <th>Platform Name</th>
      <th>Node</th>
      <th>Tx/Sec</th>
      <th>Avg Block Time/Tx</th>
      <th>Tx Volume</th>
      <th>Test Duration</th>
      <th>Avg Tx / Block</th>
      
    </tr>
  </thead>
  <tbody>
            
            {newData}
            </tbody>
            </Table>
           
          </CardText>
        </Card>
          
          
           
        )
    }

}