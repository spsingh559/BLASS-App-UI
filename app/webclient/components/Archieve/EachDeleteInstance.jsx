import React from 'react';
import Report from 'material-ui/svg-icons/action/receipt';
import IconButton from 'material-ui/IconButton';
export default class EachDeleteInstance extends React.Component{

    render(){

        return(
            <tr >
            {/*<td >
               <input type="checkbox" name="site_name" 
                                               value={this.props.data.name}
                                                onChange={(val)=>this.onSiteChanged(val)} /></td>*/}
                        <td >                      {this.props.data.activeExp} </td>
                        <td >{this.props.data.cloud}</td>
                        <td >{this.props.data.platform}</td>
                        <td >{this.props.data.status.currentStatus}</td>
                        <td >{this.props.data.createdAt}</td>
                        <td >{this.props.data.createdAt}</td>
                       
                       
                      
                        <td>
                        <IconButton tooltip="View Bill"  >
      <Report />
    </IconButton>
    </td>
    <td >Pending</td>
                            </tr>
        )
    }
}