
import React from 'react';
import ContractComponent from './ContractComponent.jsx';
import ContractMethodComponent from './ContractMethodComponent.jsx';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {Grid,Row,Col,Carousel} from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Table
  } from 'react-bootstrap';


export default class PlatformComparisonComponent extends React.Component {

navigationNetworkLandingPage=()=>{
    this.context.router.push('/networkTesting');
  }
 static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }
  constructor() {
    super();
    this.state = {
      selectedIndexContract: 0,
	checked:false,
	NoOftransactions:'',
	NoOfParallelTransactions:'',
      data:
        [
          {
            name: "Product Management", contractData: [ "Add Product", "Update Product","Get Product","Get All Products"]
          }

          ,
          {
            name: "Trade Management", contractData: [ "Create Trade","Confirm Trade","Get Trade"]
          },
          {
            name: "Contract Management", contractData: ["Create Contract", "Approve Contract","Check Contract Validity"]
          }


        ]
    },
		this.onContractSelect = this.onContractSelect.bind(this);

   
  }
  onContractSelect(index,checkedval){
    console.log("Outside Func", index);
	console.log("Outside Func CheckVal",checkedval)
    this.setState({selectedIndexContract: index,checked:checkedval}, ()=>{
      console.log("Parent Ele state --",this.state);
    })
    }
transactionValueChanged= (event, index, value) => this.setState({ NoOftransactions: value });
parallelTransactionValueChanged= (event, index, value) => this.setState({ NoOfParallelTransactions: value });


  render() {
   return (
      <div className="assessment">
      <Grid style={{marginTop:"90px"}}>
          <center><h3 style={{ color: "#DCDCDC" }}>Platform Comparison Inputs</h3></center>
           <ContractComponent checkedval={this.state.checked} indexval={this.state.selectedIndexContract} contractData={this.state.data} onSelectChange={this.onContractSelect}/>

      <ContractMethodComponent passedVal={this.state.data[this.state.selectedIndexContract].contractData}/>
	<br/>
	<br/>
 <Row>
            <h3 style={{ color: "#DCDCDC" }}>Platform Parameters</h3>
          </Row>
<br/>
<br/>

<Col style={{borderRadius:"6px",border:"solid 1px #DCDCDC",color: "#DCDCDC",height:"300px"}}>
<br/>
<Row style={{marginLeft:"10px"}}>
	       <Col xs={4}>
                  Number of Transactions to be submitted:
                </Col>
                <Col xs={4}>
                  <TextField
                    floatingLabelFixed={true}
			floatingLabelText="No of Transactions"
                    value={this.state.NoOftransactions}
		   onChange={this.transactionValueChanged}
                    inputStyle={{color:"white",fontSize:"20px"}}
	            floatingLabelStyle={{color:"white",fontSize:"20px"}}                 
		   fullWidth={true}>
                  </TextField>
                </Col>
              </Row>
<br/>

  
 <Row style={{marginLeft:"10px"}}>
	       <Col xs={4}>
                  Number of Parallel Transactions:
                </Col>
                <Col xs={4}>
                  <TextField
                    floatingLabelFixed={true}
			floatingLabelText="No of Parallel Transactions"
                    value={this.state.NoOfParallelTransactions}
		    onChange={this.parallelTransactionValueChanged}
                    inputStyle={{color:"white",fontSize:"20px"}}
	            floatingLabelStyle={{color:"white",fontSize:"20px"}}                 
		   fullWidth={true}>
                  </TextField>
                </Col>
              </Row>
<br/>
<Row style={{marginLeft:"10px"}}>
                <Col xs={4}>
                  Are private transactions required
                 </Col>
                <Col xs={4}>
                  <RadioButtonGroup name="DataShared" defaultSelected="Extensively">
                    <RadioButton
                      value="light"
                      label="Yes"
                      labelStyle={{ color: "#DCDCDC" }}
                    />
                    <RadioButton
                      value="not_light"
                      label="No"
                      labelStyle={{ color: "#DCDCDC" }}
                    />

                  </RadioButtonGroup>
                </Col>
              </Row>
</Col>

       </Grid>
<br/>
 <div>
            <center><RaisedButton label="Compare >>" primary={true} onClick={this.navigationNetworkLandingPage}/></center>
            </div>
       </div>    );
  }
}



