import React from 'react';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import Save from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';
export default class EachRowToken extends React.Component{

    state={
        editStatus:false,
        keyToken:this.props.data.keyToken,
        valueToken:this.props.data.valueToken
    }

    save=()=>{
        let obj={
            _id:this.props.data._id,
            keyToken:this.state.keyToken,
            valueToken:this.state.valueToken
        }

        console.log('edited data');
        console.log(obj);
        this.props.editTokens(obj);
        this.setState({editStatus:false});
    }

    removeToken=()=>{
        this.props.removeToken(this.props.data._id);
    }

    editToken=()=>this.setState({editStatus:true});


    render(){
        if(this.state.editStatus==true){
            return(
                <tr>
                <td>
                <TextField
 
 hintText=" Key"
 value={this.state.keyToken}
 onChange = {(event,newValue) => this.setState({keyToken:newValue})}
 floatingLabelText="Enter Key"
 fullWidth={true}
/>
                    </td>
                    <td>
   
<TextField
  
      hintText=" Value"
      value={this.state.valueToken}
      onChange = {(event,newValue) => this.setState({valueToken:newValue})}
      floatingLabelText="Enter Value"
      fullWidth={true}
    />
                        </td>
                        <td>
                            <Save onTouchTap={this.save} />
                            </td>
                            <td>
                                <Delete onTouchTap={this.removeToken}/>
                                </td>
                </tr>
            )
        }
        return( 
            <tr>
                <td>
                    {this.props.data.keyToken}
                    </td>
                    <td>
                        {this.props.data.valueToken}
                        </td>
                        <td>
                            <Edit onTouchTap={this.editToken} />
                            </td>
                            <td>
                                <Delete onTouchTap={this.removeToken}/>
                                </td>
                </tr>
        )
    }
}