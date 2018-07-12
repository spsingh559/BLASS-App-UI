import React from 'react';

import {Grid,Row,Col} from 'react-bootstrap';
import Divider from 'material-ui/Divider/Divider';
import {Card, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';

    import MenuItem from 'material-ui/MenuItem';

    import Axios from 'axios';   


    import RaisedButton from 'material-ui/RaisedButton';
    import NTTableData from './NTTableData';

const style={
    outerStyle:{
        height:'auto',
        width:'370px',    
       marginTop:"10px",
        color:"#DCDCDC"
    },
    outerStyle1:{
        height:'auto',
        width:'370px',    
       marginTop:"10px",
       marginLeft:"30px",
        color:"#DCDCDC"
    },
	outerStyle2:{
        color:"black",
	border:"solid 1px black",
	width:'142px',
	padding:'2px',
	paddingLeft:'55px',
	textAlign:'right',
        fontSize:'15px'
}
};

const performanceTestData=[
  {
    resultID:"2139",
    resultName:"1stEthvsHypTesting",
    userName:'Dimple',
    timeStamp:'06/06/2018',
    Platform:[
      {
        instanceID:"sxcvksd",
        cloudName:"AWS",
        platformName:"Ethereum",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:100,
        testDuration:120,
        avgTxPerBlock:4,
        ranking:1
      },
      {
        instanceID:"adjkds",
        cloudName:"AWS",
        platformName:"Hyperledger",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:90,
        testDuration:100,
        avgTxPerBlock:4,
        ranking:2
      },
      {
        instanceID:"adjkds",
        cloudName:"AWS",
        platformName:"Quoram",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:90,
        testDuration:100,
        avgTxPerBlock:4,
        ranking:3
      }
    ]
  },
  {
    resultID:"2",
    resultName:"2ndEthvsHypTesting",
    userName:"Dimple",
    timeStamp:'06/07/2018',
    Platform:[
      {
        instanceID:"sxcvksd",
        cloudName:"AWS",
        platformName:"Ethereum",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:100,
        testDuration:120,
        avgTxPerBlock:4,
        ranking:2
      },
      {
        instanceID:"adjkds",
        cloudName:"AWS",
        platformName:"Hyperledger",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:90,
        testDuration:100,
        avgTxPerBlock:4,
        ranking:1
      },
      {
        instanceID:"adjkds",
        cloudName:"AWS",
        platformName:"Quoram",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:90,
        testDuration:100,
        avgTxPerBlock:4,
        ranking:3
      }
    ]
  },
  {
    resultID:"3",
    resultName:"3rdEthvsHypTesting",
    userName:"Dimple",
    timeStamp:'06/08/2018',
    Platform:[
      {
        instanceID:"sxcvksd",
        cloudName:"AWS",
        platformName:"Ethereum",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:100,
        testDuration:120,
        avgTxPerBlock:4,
        ranking:3
      },
      {
        instanceID:"adjkds",
        cloudName:"AWS",
        platformName:"Hyperledger",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:90,
        testDuration:100,
        avgTxPerBlock:4,
        ranking:2
      },
      {
        instanceID:"adjkds",
        cloudName:"AWS",
        platformName:"Quoram",
        node:4,
        txPerSec:10,
        avgBlockCreationTime:5,
        txVolume:90,
        testDuration:100,
        avgTxPerBlock:4,
        ranking:1
      }
    ]
  }
]

export default class NetworkTesting extends React.Component{

  state={
    items:[],
    testData:[],
    value:""
  }

  handleDrpDwnChange = (event, index, value) => {

    this.setState({value});
  }

  componentDidMount=()=>{
    console.log('cmd');
    this.setState({testData:[performanceTestData[performanceTestData.length-1]]});  
    console.log(performanceTestData[performanceTestData.length-1]);
performanceTestData.forEach((data,i)=>{
                    
    this.state.items.push(<MenuItem value={data.resultID} key={i} primaryText={data.resultName} />);
       
})


}

submit=()=>{
  console.log( this.state.value);
  performanceTestData.forEach((data)=>{
    if(data.resultID==this.state.value){
      this.setState({testData:[data]});
    }
  })
 }

    render(){
      let Data;
    //  console.log(this.state.testData);
      // if( this.state.testData[0] !="undefined" && this.state.testData.length!=0){
      //   // console.log(this.state.testData[0]);
      // // // if(this.pro)
      
      // //   }else{
      // //     console.log('insuide else');
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

      // ]
        
      // }

    
    
        return(
            <div style ={{marginTop:"50px"}} >
          <Grid>
            <Row>
            <Col xs={6}>
            <SelectField 
          hintText="Select"
         floatingLabelText="Select Result"
         value={this.state.value}
         onChange={this.handleDrpDwnChange}
         fullWidth={true}
       >
       {this.state.items}
        
     
       </SelectField>
            </Col>
            <Col xs={6}>
 <RaisedButton label="Submit Request" primary={true} onTouchTap={this.submit} style={{marginTop:"25px"}}/>
            </Col>
            </Row>
            
           <center>
           
              <h4 style={{marginTop:"20px"}}> Latest Test Result Details </h4>
          
            </center>
              <NTTableData  testData={this.state.testData}/>
              </Grid>

            {/* <Grid>
            <Row>
                    <center><h3 style={{color:"#F9FBE7"}}>Network performance testing
</h3></center>
                    </Row>
                    <Row>
                   <h4 style={{color:"#DCDCDC"}}>Comparison of instances

</h4>
                    </Row>
                    <Row>
                        <Col xs={4} style={style.outerStyle} className="networkColor">
<Card style={{backgroundColor: '#BDBDBD', color: 'white'}}>
<CardText>

                         <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Instance ID :</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>342634271</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Hosting location:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>AWS</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Platform:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>Hyperledger</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>No. of validating nodes:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>4</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Transaction per sec:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>111</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Average Block Creation Time:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>223 ms</h5></Col>
                         </Row>

 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Transaction Volume:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>10000</h5></Col>
                         </Row>

<Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Test Run Duration:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>90 sec</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Average Txn per Block:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>124</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>No. of Virtual Machines:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>1</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Performance ranking :</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>1</h5></Col>
                         </Row>

</CardText>
</Card>
                        </Col>

                        <Col xs={4} style={style.outerStyle1}  className="networkColor">
<Card style={{backgroundColor: '#BDBDBD', color: 'white'}}>
<CardText>

                         <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Instance ID :</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>342634277</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Hosting location:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>AWS</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Platform:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>Ethereum</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>No. of validating nodes:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>4</h5></Col>
                         </Row>

 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Transaction per sec:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>32</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Average Block Creation Time:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>3.4 sec</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Transaction Volume:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>10000</h5></Col>
                         </Row>
<Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Test Run Duration:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>312 sec</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Average Txn per Block:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>13</h5></Col>
                         </Row>
<Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>No. of Virtual Machines:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>1</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Performance ranking :</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>1</h5></Col>
                         </Row>

</CardText>
</Card>
                        </Col>
                        <Col xs={4} style={style.outerStyle1}  className="networkColor">
<Card style={{backgroundColor: '#BDBDBD', color: 'white'}}>
<CardText>

                         <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Instance ID :</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>342634279</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Hosting location:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>AWS</h5></Col>
                         </Row>

 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Platform:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>Quorum</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>No. of validating nodes:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>4</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Transaction per sec:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>320</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Average Block Creation Time:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>182ms</h5></Col>
                         </Row>

 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Transaction Volume:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>10000</h5></Col>
                         </Row>
<Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Test Run Duration:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>31.25 Sec</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Average Txn per Block:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>155</h5></Col>
                         </Row>
<Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>No. of Virtual Machines:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>1</h5></Col>
                         </Row>
 <Row>
                           <Col xs={6}><h5 style={{color:"black",fontSize:'15px'}}>Performance ranking :</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>1</h5></Col>
                         </Row>

</CardText>
</Card>
                                                   </Col>
                        
                        </Row>
                </Grid> */}
            </div>
        )
    }
}