import React from 'react';
import Chip from 'material-ui/Chip';
const styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };
export default class EachActivity extends React.Component{

    render(){
        
        return(
           
            <Chip style={{marginTop:'5px'}}>
            {this.props.data.activityName}
          </Chip>
         
  
        )
    }
}