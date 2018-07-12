import React from 'react';
import {Grid,Col,Row, Image} from 'react-bootstrap';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import axios,{post} from 'axios';
import Dialog from 'material-ui/Dialog';
import PlatformMatrixTable from './PlatformMatrixTable';

const style={
    outerStyle:{
        height:'500px',
        width:'520px',    
       marginTop:"10px",
        borderRadius: "6px",
        border: "solid 1px #DCDCDC",
        color:"#DCDCDC",
	fontSize:'17px'
    },
    outerStyle1:{
        height:'500px',
        width:'520px',    
       marginTop:"10px",
       marginLeft:"100px",
        borderRadius: "6px",
        border: "solid 1px #DCDCDC",
        color:"#DCDCDC",
        fontSize:'17px'
    },
outerStyle2:{
       color:"white",
	border:'solid 1px #dff0d8',
	width:'160px',
	padding:'6px',
        fontSize:'17px'
    }

}
const data=[{
    Criteria:"Permissioned Blockchain",
    Ethereum:"No",
    Quorum:"Yes",
    HyperledgerFab:"Yes",
    Corda:"Yes"
},{
    Criteria:"Data Immutability",
    Ethereum:"Full",
    Quorum:"Full",
    HyperledgerFab:"Full",
    Corda:"Full"
},{
    Criteria:"Smart Contracts",
    Ethereum:"Solidity Smart Contracts",
    Quorum:"Solidity Smart Contracts",
    HyperledgerFab:"Chaincode(GO Lang)",
    Corda:"Kotlin/Java Smart Contracts"
},{
    Criteria:"Data Storage Type",
    Ethereum:"Key-Value Pair DB",
    Quorum:"Key-Value Pair DB",
    HyperledgerFab:"Key-Value Pair DB NoSQL DB",
    Corda:"Relational DB"
},{
    Criteria:"Off-Chain DB Required?",
    Ethereum:"Yes",
    Quorum:"Yes",
    HyperledgerFab:"Yes",
    Corda:"No"
},{
    Criteria:"Consensus Mechanism",
    Ethereum:"Proof-of-Work",
    Quorum:"Quorum Chain RAFT",
    HyperledgerFab:"PBFT",
    Corda:"Notarization Based Consensus"
},{
    Criteria:"Throughput",
    Ethereum:"10-30 TPS(private n/w)",
    Quorum:"100 to 500 TPS*",
    HyperledgerFab:"100 to 500 TPS*",
    Corda:"TBD"
},{
    Criteria:"Querying Support",
    Ethereum:"Basic",
    Quorum:"Basic",
    HyperledgerFab:"Basic",
    Corda:"SQL Queries"
},{
    Criteria:"Product Maturity/Support",
    Ethereum:"High",
    Quorum:"Medium",
    HyperledgerFab:"Medium",
    Corda:"Medium"
},{
    Criteria:"Open Source",
    Ethereum:"Yes",
    Quorum:"Yes",
    HyperledgerFab:"Yes",
    Corda:"Yes"
}]


export default class Recommendation extends React.Component{

constructor(props) {
super(props);

this.onFormSubmit=this.onFormSubmit.bind(this)
this.onChangeFile=this.onChangeFile.bind(this)
this.fileUpload=this.fileUpload.bind(this)

this.state={
file:null,
open: false
};

}


static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
 handleOpen = () => {
    this.setState({open: true});
  };

    
     
      navToAssesmentLandingPage=()=>{
        this.context.router.push('/applicationAssessmentDashboard');
     }

onFormSubmit(e) {
console.log("onFormSubmit Method Invoked",e);

e.preventDefault()// Stop form submit
this.fileUpload(this.state.file).then((response)=>{
alert('File is uploaded to server');
// console.log(response.data);
})
}


fileUpload(file) {
const url='/StoreFile';
const formData=new FormData();
formData.append('file',file)
const config={
headers:{
'content-type':'multipart/form-data'
}
}
console.log('File reached to button');
console.log(file);
return post(url,formData,config);
}

onChangeFile(e) {
console.log(e.target.files[0]);
this.setState({file:e.target.files[0]});
} 


    render(){
      console.log("props.state:",this.props.location.state);
      var scores = this.props.location.state.scores;
      var suggestedPlatforms = [];
      var max = 0;
      var platforms = Object.keys(scores);
      for(let i =0 ; i < platforms.length; i++) {
        if(scores[platforms[i]] > max) {
          max = scores[platforms[i]];
          suggestedPlatforms = [platforms[i]];
        }
        else
          if(scores[platforms[i]] === max) {
            suggestedPlatforms.push(platforms[i]);
          }
      }
      console.log("suggestedPlatforms :", suggestedPlatforms);

      var mapper = {
        eth: "Ethereum",
        quorum: "Quorum",
        hlFabric: "HyperLedger Fabric",
        corda: "Corda"
      }

      suggestedPlatforms.forEach((value, index)=>{
        suggestedPlatforms[index] = mapper[value];
      })
      console.log("suggestedPlatforms :",   );
      var platformString = "";
      if(suggestedPlatforms.indexOf("Ethereum") !== -1) {
        if(suggestedPlatforms.length >1) {
          platformString = "Public, Private Permissioned";
        }
        else
         platformString = "Public"; 

      }
      else
        platformString = "Private Permissioned";

console.log("AID");
console.log(this.props.params.aid);
let advanceAnalysisPage;
var aid=this.props.params.aid;
if(aid=='AID1232490'){
   advanceAnalysisPage= [
        <div>
            <b><h5 style={{color:"white",fontSize:'16px'}}>Advanced Analysis has been done, kindly download the Analysis Report.</h5></b>
        <form method="get" action="../components/ApplicationAssesmentForm/AdvanceAnalysis.docx">
         <button type="submit" style={{color:'black'}}>Download!</button>
       </form>
       </div>
    ]
}   
else{
     advanceAnalysisPage= [<div>
        <Row>
          <h5 style={{marginLeft:'10px',fontSize:'17px',color:'white'}}>Fill and upload the Requirement excel for Advanced Analysis</h5>
        </Row>
        <Row style={{fontSize:"15px",marginLeft:'1px'}}>
 <form onSubmit={this.onFormSubmit}>
    <input type="file" onChange={this.onChangeFile}/>
    <button type="submit" style={{color:'black',marginTop:'10px'}}>Upload</button>
    </form> 
 </Row>
<br/>
<br/>
<Row>
<RaisedButton label="Submit" primary={true} onClick={this.handleOpen} style={{marginLeft:'15px'}}/>

        <Dialog
          title="Advanced Analysis"
          modal={true}
          open={this.state.open}
        ><b><h5 style={{color:"black"}}>Requirement Data has been submitted, kindly wait for 2-3 business days.</h5></b>
		 <RaisedButton label="Ok" primary={true} onClick={this.navToAssesmentLandingPage}/>

        </Dialog>

		</Row>
</div>
    ]
}
        return(
            <div style={{marginTop:"65px"}} className="recommendation">
     <Grid className="recommendation">
                <Row>
                    <center><h3 style={{color:"#DCDCDC"}}>Application Assessment Framework - Output</h3></center>
                    </Row>
                    <Row>
                        <Col xs={6} style={style.outerStyle}>
                        <Row>
                    <center><h3 style={{color:"#DCDCDC"}}>RECOMMENDATION</h3></center>
                    </Row>
<br/>
                  <Row>
                           <Col xs={6}><h5 style={{color:"white",fontSize:'17px'}}>Type of Blockchain Platform:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>{platformString}</h5></Col>
                         </Row><br/>
 <Row>
                           <Col xs={6}><h5 style={{color:"white",fontSize:'17px'}}>Best Fit Platforms:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>{suggestedPlatforms.toString()}</h5></Col>
                         </Row><br/>

 <Row>
                           {/*<Col xs={6}><h5 style={{color:"white",fontSize:'17px'}}>Number of peers / nodes:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>5</h5></Col>*/}
                         </Row><br/>

 <Row>
                           {/*<Col xs={6}><h5 style={{color:"white",fontSize:'17px'}}>No. of nodes:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>3</h5></Col>*/}
                         </Row><br/>

 <Row>
                           <Col xs={6}><h5 style={{color:"white",fontSize:'17px'}}>Hosting Infrastructure:</h5></Col>
                           <Col xs={3}><h5 style={style.outerStyle2}>AWS / Azure </h5></Col>
                         </Row><br/>
         <br />
                                       </Col>
                        <Col xs={6}  style={style.outerStyle1}>
                        <Row>
                    <center><h3 style={{color:"#DCDCDC"}}>ADVANCED ANALYSIS</h3></center>
                    </Row>
<br/>
                    {/* <Row>
                        <center>
                    <Image src="../../../images/analysis.gif" 
        style={{width:'300px',height:'200px'}} />
        </center>
                        </Row>
                            <br />
                            <Row>
                            Suggestions: <ol>
  <li>Storage

</li>
  <li>Integration
</li>
  <li>Xyz</li>
</ol>
                                </Row> */}
                                {advanceAnalysisPage}
                             
                        </Col>
                        </Row>
<br/>
<div>
<h2 style={{color:"white",textDecoration:"underline"}}>Platform Comparison Matrix</h2>

<PlatformMatrixTable data={data}/>
</div>
                    </Grid>

            </div>
        )
    }
}