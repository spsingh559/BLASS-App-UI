import React from 'react';
import Edit from 'material-ui/svg-icons/image/edit';
import Delete from 'material-ui/svg-icons/action/delete';
import Save from 'material-ui/svg-icons/content/save';
import TextField from 'material-ui/TextField';
export default class EachRow extends React.Component{

    state={
        editStatus:false,
        key:this.props.data.key,
        value:this.props.data.value
    }

    save=()=>{
        let obj={
            _id:this.props.data._id,
            key:this.state.key,
            value:this.state.value
        }

        console.log('edited data');
        console.log(obj);
        this.props.edit(obj);
        this.setState({editStatus:false});
    }

    remove=()=>{
        this.props.remove(this.props.data._id);
    }

    edit=()=>this.setState({editStatus:true});


    render(){
        if(this.state.editStatus==true){
            return(
                <tr>
                <td>
                <TextField
 
 hintText=" Key"
 value={this.state.key}
 onChange = {(event,newValue) => this.setState({key:newValue})}
 floatingLabelText="Enter Key"
 fullWidth={true}
/>
                    </td>
                    <td>
   
<TextField
  
      hintText=" Value"
      value={this.state.value}
      onChange = {(event,newValue) => this.setState({value:newValue})}
      floatingLabelText="Enter Value"
      fullWidth={true}
    />
                        </td>
                        <td>
                            <Save onTouchTap={this.save} />
                            </td>
                            <td>
                                <Delete onTouchTap={this.remove}/>
                                </td>
                </tr>
            )
        }
        return(
            <tr>
                <td>
                    {this.props.data.key}
                    </td>
                    <td>
                        {this.props.data.value}
                        </td>
                        <td>
                            <Edit onTouchTap={this.edit} />
                            </td>
                            <td>
                                <Delete onTouchTap={this.remove}/>
                                </td>
                </tr>
        )
    }
}