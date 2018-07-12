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


  
export default class ContractMethodInfo extends React.Component{

    render(){
        return(
            <tr onTouchTap={this.expand}>
            <td>
			<input type="radio" name="site_name" 
                                   value="val"
                                     onChange={this.onSiteChanged} /> 

            </td>
            <td>{this.props.data}</td>      
          </tr>
	
        )
    }
}