import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router';
import axios, { post } from 'axios';
import {browserHistory} from 'react-router';
import PropTypes from "prop-types";

import { Redirect } from 'react-router';

// import createHistory from "history/createBrowserHistory";

// const history = createHistory();

const style = {
  outerStyle: {
    height: '650px',
    width: '500px',
    marginTop: "10px",
    borderRadius: "6px",
    border: "solid 1px #DCDCDC",
    color: "#DCDCDC"
  },
  outer1Style: {
    height: '650px',
    width: '500px',
    marginLeft: "100px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "solid 1px #DCDCDC",
    color: "#DCDCDC"
  }
}

class ApplicationAssesmentForm extends React.Component {

  static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }


  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChangeFile = this.onChangeFile.bind(this)
    this.fileUpload = this.fileUpload.bind(this)

    this.state = {
      redirectToRecc: false,
      file: null,
      nwTypeDrpDwn: "",
      industryDrpDwn: "",
      applicationTypeDrpDwn: "",
      ReportingDrpDwn: "",
      useCaseDrpDwn: "",
      assessmentFormValues: {
        useCaseStatus: {value:"no", values: {
          yes: {eth: 1, quorum: 0, hlFabric: 0, corda: 0},
          no: {eth: 0, quorum: 1, hlFabric: 1, corda: 1}}
        },
        participatingPartiesNature: {value:"no", values: {
          yes: {eth: 0, quorum: 1, hlFabric: 1, corda: 1},
          no: {eth: 1, quorum: 0, hlFabric: 0, corda: 0}}
        },
        useCaseDrpDwn: {value:"Supply Chain", values: {
          "Supply Chain": {eth: 0, quorum: 0, hlFabric: 1, corda: 1},
          "Trade Finance": {eth: 0, quorum: 0, hlFabric: 1, corda: 1},
          "Loyalty Points": {eth: 1, quorum: 1, hlFabric: 0, corda: 0},
          "Commodity Trading": {eth: 0, quorum: 0, hlFabric: 1, corda: 1},
          "Asset Transfer": {eth: 1, quorum: 1, hlFabric: 0, corda: 0},
          "P2P Energy Trading": {eth: 1, quorum: 1, hlFabric: 0, corda: 0},
          "Cryptocurrency / Non-cash tokens": {eth: 1, quorum: 1, hlFabric: 0, corda: 0},
          "None of the above": {eth: 1, quorum: 1, hlFabric: 1, corda: 1}},
        },
        applicationType: {value:"p2p", values: {
          "b2b": {eth: 0, quorum: 1, hlFabric: 1, corda: 1},
          "b2c": {eth: 0, quorum: 1, hlFabric: 1, corda: 1},
          "p2p": {eth: 1, quorum: 0, hlFabric: 0, corda: 0}}
        },
        privateTransactionR: {value:"no", values: {
          yes: {eth: 0, quorum: 1, hlFabric: 1, corda: 1},
          no: {eth: 0, quorum: 1, hlFabric: 1, corda: 1}}
        },
        transaction: {value:"no", values: {
          yes: {eth: 0, quorum: 1, hlFabric: 1, corda: 1},
          no: {eth: 0, quorum: 1, hlFabric: 0, corda: 1}}
        },
        complexDataEntities: {value:"no", values: {
          yes: {eth: 0, quorum: 0, hlFabric: 1, corda: 1},
          no: {eth: 1, quorum: 1, hlFabric: 1, corda: 1}}
        },
        isQueryReportCriticalReq: {value:"no", values: {
          yes: {eth: 0, quorum: 0, hlFabric: 1, corda: 1},
          no: {eth: 1, quorum: 1, hlFabric: 1, corda: 1}}
        },

        pKIIntegration: {value:"no", values: {
          yes: {eth: 0, quorum: 0, hlFabric: 1, corda: 0},
          no: {eth: 1, quorum: 1, hlFabric: 1, corda: 1}}
        },

        consensusProcess: {value:"no", values: {
          yes: {eth: 0, quorum: 0, hlFabric: 1, corda: 1},
          no: {eth: 1, quorum: 1, hlFabric: 1, corda: 1}}
        },

        isHighThrputCriticalReq: {value:"briefly", values: {
          extensively: {eth: 0, quorum: 1, hlFabric: 1, corda: 1},
          briefly: {eth: 1, quorum: 1, hlFabric: 1, corda: 1}}
        },
        
        businessEntities: {value:"other", values: {
          "5": {eth: 0, quorum: 0, hlFabric: 0, corda: 0},
          "10": {eth: 0, quorum: 0, hlFabric: 0, corda: 0},
          "15": {eth: 0, quorum: 0, hlFabric: 0, corda: 0},
          "other": {eth: 0, quorum: 0, hlFabric: 0, corda: 0},}
        },
        dataShared: {value:"briefly", values: {
          extensively: {eth: 0, quorum: 0, hlFabric: 0, corda: 0},
          briefly: {eth: 0, quorum: 0, hlFabric: 0, corda: 0},}
        },
        industryDrpDwn: {value:"Healthcare", values: {
          "Finance" : {eth: 0, quorum: 0, hlFabric: 0, corda: 0},
          "Supply Chain": {eth: 0, quorum: 0, hlFabric: 0, corda: 0},
          "Healthcare": {eth: 0, quorum: 0, hlFabric: 0, corda: 0},}
        },
        
        
        
      }
    };

  }

    


  calculateAssessmentScore = ()=> {
    var assessmentFormValues =  this.state.assessmentFormValues;
    var assessmentKeys = Object.keys(assessmentFormValues);
    var scores = {};
    for(let i = 0;i< assessmentKeys.length;i++) {
      let assessmentKey = assessmentKeys[i];
      var scoresForSelectedValues = assessmentFormValues[assessmentKey].values[assessmentFormValues[assessmentKey].value];
      var scoreCategories = Object.keys(scoresForSelectedValues);
      for(let scoreIndex = 0; scoreIndex<scoreCategories.length; scoreIndex++ ){
        if(scores[scoreCategories[scoreIndex]] === undefined) {
          scores[scoreCategories[scoreIndex]] = 0;
        }
        scores[scoreCategories[scoreIndex]] += scoresForSelectedValues[scoreCategories[scoreIndex]];
      }
    }  
    // history.push("/#recommendation", { some: "state" });
    this.context.router.push({
      pathname: '/recommendation',
      state: { scores: scores }
    });
    // window.location.reload();
    // this.props.history.push({
    //   pathname: '/recommendation',
    //   state: { scores: scores }
    // });


    console.log(scores);
    // this.setState({
    //   redirectToRecc: true
    // });
    // this.context.router.push('/recommendation');
    //   this.push('/#/recommendation');
  }

  onChangeFile(e) {
    console.log(e.target.files[0]);
    this.setState({ file: e.target.files[0] });
  }


  onFormSubmit(e) {
    e.preventDefault()// Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      alert('File is uploaded to server');
      // console.log(response.data);
    })
  }




  fileUpload(file) {
    const url = '/StoreFile';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    console.log('File reached to button');
    console.log(file);
    return post(url, formData, config);
  }





  handleChangeuseCaseDrpDwn = (event, index, value) => this.setState({ useCaseDrpDwn: value });
  handleChangenwTypeDrpDwn = (event, index, value) => this.setState({ nwTypeDrpDwn: value });
  handleChangenwPermissionDrpDwn = (event, index, value) => this.setState({ nwPermissionDrpDwn: value });
  handleChangeindustryDrpDwn = (event, index, value) => this.setState({ industryDrpDwn: value });
  handleChangeapplicationTypeDrpDwn = (event, index, value) => this.setState({ applicationTypeDrpDwn: value });
  handleChangeReportingDrpDwn = (event, index, value) => this.setState({ ReportingDrpDwn: value });

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  // submitForm=()=>{
  //     this.context.router.push('/recommendation');
  // }
  onUseCaseNatureChange(event) {
    console.log(event.target.value);
    console.log(event.target.name);
  }
  
  onAssessmentValueChange = (event)=> {
    console.log(this.state);
    var assessmentKeys = Object.keys(this.state.assessmentFormValues);
    var newAssessmentFormValues = {};
    for(let index = 0; index<assessmentKeys.length; index+=1) {
      let assessmentKey =  assessmentKeys[index];
      newAssessmentFormValues[assessmentKey] = {};
       if(event.target.name === assessmentKey) {
        newAssessmentFormValues[assessmentKey].value = event.target.value;
      }
      else
       newAssessmentFormValues[assessmentKey].value = this.state.assessmentFormValues[assessmentKey].value; 
      newAssessmentFormValues[assessmentKey].values = this.state.assessmentFormValues[assessmentKey].values;
    }
    this.setState({
      assessmentFormValues: newAssessmentFormValues
    });

  }
  render() {

    if(this.state.redirectToRecc) {
      return <Redirect push to="/recommendation" />;
    }
    return (
      <div style={{ marginTop: "65px" }} className="assessment">

        <Grid>
          <Row>
            <center><h3 style={{ color: "#DCDCDC" }}>Application Assessment Framework - Input</h3></center>
          </Row>
  <br/>
          <Row>
  <br/>
            <Col xs={8} style={style.outerStyle}>
    <br/>
              <Row>
                <Col xs={6}>
                  Assessment Name
                </Col>
                <Col xs={5}>
                  <TextField
                    floatingLabelFixed={true}
                    value={this.state.nwTypeDrpDwn}
                    onChange={this.handleChangenwTypeDrpDwn}
                    inputStyle={{color:"white",fontSize:"20px"}}
              floatingLabelStyle={{color:"white",fontSize:"20px"}}                 
       fullWidth={true}>
                  </TextField>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={6}>
                  Industry Domain
                            </Col>
                <Col xs={5} style={{marginTop:"-36px"}}>
                  <SelectField
                    floatingLabelText="Based on Type"
                    name="industryDrpDwn"
                    value={this.state.assessmentFormValues.industryDrpDwn.value}
                    onChange={(event, index, value)=>{var fakeEvent = {target: {value: value, name: "industryDrpDwn"}}; this.onAssessmentValueChange(fakeEvent);}}
                    floatingLabelStyle={{ color: "#DCDCDC" }}
                    fullWidth={true}
                  >
                    <MenuItem value="Finance" primaryText="Finance" />
                    <MenuItem value="Supply Chain" primaryText="Supply Chain" />
                    <MenuItem value="Healthcare" primaryText="Healthcare" />

                  </SelectField>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={8}>
                  Are all participants of these usecase unknown / anonymous? 
                </Col>
                <Col xs={2}>
                  <RadioButtonGroup name="useCaseStatus" defaultSelected={this.state.assessmentFormValues.useCaseStatus.value} value = {this.state.assessmentFormValues.useCaseStatus.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={8}>
                  Will the participating members be trusted parties?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup name="participatingPartiesNature" defaultSelected={this.state.assessmentFormValues.participatingPartiesNature.value} value = {this.state.assessmentFormValues.participatingPartiesNature.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={6}>
                  Use Case
                            </Col>
                <Col xs={5} style={{marginTop:"-36px"}}>
                  <SelectField
                    floatingLabelText="Use Case"
                    name="useCaseDrpDwn" defaultSelected={this.state.assessmentFormValues.useCaseDrpDwn.value} value = {this.state.assessmentFormValues.useCaseDrpDwn.value} 
                    onChange={(event, index, value)=>{var fakeEvent = {target: {value: value, name: "useCaseDrpDwn"}}; this.onAssessmentValueChange(fakeEvent);}}
                    
                    floatingLabelStyle={{ color: "#DCDCDC" }}
                    fullWidth={true}
                  >
                    <MenuItem value="Supply Chain" primaryText="Supply Chain" />
                    <MenuItem value="Trade Finance" primaryText="Trade Finance" />
                    <MenuItem value="Loyalty Points" primaryText="Loyalty Points" />
                    <MenuItem value="Commodity Trading" primaryText="Commodity Trading" />
                    <MenuItem value="Asset Transfer" primaryText="Asset Transfer" />
                    <MenuItem value="P2P Energy Trading" primaryText="P2P Energy Trading" />
                    <MenuItem value="Cryptocurrency / Non-cash tokens" primaryText="Cryptocurrency / Non-cash tokens" />
              <MenuItem value="None of the above" primaryText="None of the above" />
                  </SelectField>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={8}>
                  Application Type
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup  name="applicationType" defaultSelected={this.state.assessmentFormValues.applicationType.value} value = {this.state.assessmentFormValues.applicationType.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="b2b"
                      label="B2B"
                      labelStyle={{ color: "#DCDCDC" }}
                      inputStyle={{ color: "#DCDCDC" }}
                      iconStyle={{ color: "#DCDCDC" }}
                      style={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="b2c"
                      label="B2C"
                      labelStyle={{ color: "#DCDCDC" }}
                      inputStyle={{ color: "#DCDCDC" }}
          style={{ color: "#DCDCDC" }}

                    />
                    <RadioButton
                      value="p2p"
                      label="P2P"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                  </RadioButtonGroup>
                </Col>
              </Row>
    <br />
              <Row>
                <Col xs={8}>
                  Are private transaction required between participants?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup  name="privateTransactionR" defaultSelected={this.state.assessmentFormValues.privateTransactionR.value} value = {this.state.assessmentFormValues.privateTransactionR.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
              <br />
         <Row>
                <Col xs={8}>
                  Is transaction privacy requirement known beforehand?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup  name="transaction" defaultSelected={this.state.assessmentFormValues.transaction.value} value = {this.state.assessmentFormValues.transaction.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>


            </Col>
            {/*--------------------------- Form 2 Started------------------------------------------ */}

            <Col xs={8} style={style.outer1Style}>
   <br />
         
       

              <Row>
                <Col xs={8}>
                  Is it required that large, complex data entities be shared between participants?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup  name="complexDataEntities" defaultSelected={this.state.assessmentFormValues.complexDataEntities.value} value = {this.state.assessmentFormValues.complexDataEntities.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={8}>
                  Is rich querying and reporting a critical requirement?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup  name="isQueryReportCriticalReq" defaultSelected={this.state.assessmentFormValues.isQueryReportCriticalReq.value} value = {this.state.assessmentFormValues.isQueryReportCriticalReq.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
              <br />
              <Row>

                <Col xs={8}>
                  Should PKI be integrated with enterprise security systems?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup name="pKIIntegration" defaultSelected={this.state.assessmentFormValues.pKIIntegration.value} value = {this.state.assessmentFormValues.pKIIntegration.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={8}>
                  Will all participants vote/participate in consensus process?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup name="consensusProcess" defaultSelected={this.state.assessmentFormValues.consensusProcess.value} value = {this.state.assessmentFormValues.consensusProcess.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="yes"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="no"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
              <br />
              <Row>
                <Col xs={8}>
                  Is high througput a critical requirement?
                            </Col>
                <Col xs={2}>
                  <RadioButtonGroup name="isHighThrputCriticalReq" defaultSelected={this.state.assessmentFormValues.isHighThrputCriticalReq.value} value = {this.state.assessmentFormValues.isHighThrputCriticalReq.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="extensively"
                      label="Extensively"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="briefly"
                      label="Briefly"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>

              <br />
  <Row>
                <Col xs={8}>
                   How many business entities will actively participate?
                 </Col>
                <Col xs={2}>
                  <RadioButtonGroup name="businessEntities" defaultSelected={this.state.assessmentFormValues.businessEntities.value} value = {this.state.assessmentFormValues.businessEntities.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      label="5"
                      value="5"
                      labelStyle={{ color: "#DCDCDC" }}
                      inputStyle={{ color: "#DCDCDC" }}
                      iconStyle={{ color: "#DCDCDC" }}
                      style={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      label="10"
                     value="10"
                      labelStyle={{ color: "#DCDCDC" }}
                      inputStyle={{ color: "#DCDCDC" }}
          style={{ color: "#DCDCDC" }}

                    />
                    <RadioButton
                      label="15"
                   value="15"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                   <RadioButton
                       label="Other"
                       value="other"
                      labelStyle={{ color: "#DCDCDC" }}
                      inputStyle={{ color: "#DCDCDC" }}
          style={{ color: "#DCDCDC" }}

                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
<br/>
<Row>
                <Col xs={8}>
                  Can data be shared over a public cloud platform?
                 </Col>
                <Col xs={2}>
                  <RadioButtonGroup name="dataShared" defaultSelected={this.state.assessmentFormValues.dataShared.value} value = {this.state.assessmentFormValues.dataShared.value} onChange={(event)=>this.onAssessmentValueChange(event)}>
                    <RadioButton
                      value="extensively"
                      label="Extensively"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="briefly"
                      label="Briefly"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>


            </Col>
            {/*<Link to={'/recommendation'}>*/}

              <FloatingActionButton style={{ float: "right", marginTop: "300px" }}
                onTouchTap={()=>this.calculateAssessmentScore()}
              >
                <ContentAdd />
              </FloatingActionButton>
            {/*</Link>*/}


          </Row>

        </Grid>
      </div>
    )
  }
}   

export default ApplicationAssesmentForm;