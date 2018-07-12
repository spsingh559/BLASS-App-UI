import React from 'react';
import EachActivity from './EachActivity';

const styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

export default class InstallationActivity extends React.Component{

    render(){
        console.log('activity data');
console.log(this.props.data);
        let newData=this.props.data.map((data,i)=>{
            return(
                <EachActivity
                key={i}
                data={data}
                />
            )
        })
        console.log('newData');
        console.log(newData);
        return(
            <div >
                {newData}
                </div>
        )
    }
}