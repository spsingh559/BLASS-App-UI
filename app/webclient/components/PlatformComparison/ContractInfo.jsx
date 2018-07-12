import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
 
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

  
export default class ContractInfo extends React.Component{



onContractChange (evt) {
   {
console.log("evt ",evt.target.value);
console.log("evt indexval",evt.target.checked);

     this.props.onChildSelectChange(evt.target.value,evt.target.checked); 
     }
  }

    render(){
	    
        return(
            <tr onTouchTap={this.expand}>
<td><input type="radio" name="site_name" 

					checked={this.props.checkval} 
					value={this.props.index}
                                   onChange={(evt,checkval)=>this.onContractChange(evt,checkval)}/> 
              </td>
            
            <td>{this.props.data.name}</td>    
          </tr>
        )
    }
}