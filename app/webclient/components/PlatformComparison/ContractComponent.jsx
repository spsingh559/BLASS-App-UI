import React from 'react';
//import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import {
  Table
} from 'react-bootstrap';
import ContractInfo from './ContractInfo.jsx';



export default class ContractComponent extends React.Component {
	
onContractSelect(index,checkval){
    console.log("Child 2",index)
    console.log("Child 2 checkval",checkval)

    this.props.onSelectChange(index);
  }

  render() {
    let newContractData=this.props.contractData.map((data,index)=>{
      return(
          <ContractInfo 
          key={index}
          data={data}
	  index={index}	
	  selectIndex={this.props.indexval}
	  checkval={this.props.checkedval}
          onChildSelectChange={(index,checkval)=>this.onContractSelect(index,checkval)}
          />
      )
  })
    return (
      <Table  bordered style={{color:"white",width:"40%",marginTop:"30px"}}>
      <thead style={{backgroundColor:"#ffe4b2",color:"black"}}>
      <tr>
<th>
Select
        </th>

      <th>
        Smart Contract Template
        </th>
        </tr>
        </thead>
        <tbody>
          {newContractData}
          </tbody>
        </Table>
      
          

    )
  }
}