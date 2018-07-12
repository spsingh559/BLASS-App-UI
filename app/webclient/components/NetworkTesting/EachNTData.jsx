import React from 'react';

export default class EachNTData extends React.Component{

    render(){

        return(
            <tr >

       <td>{this.props.data.ranking}</td>
            <td > {this.props.data.instanceID} </td>
             
            <td>{this.props.data.cloudName}</td>
            <td>{this.props.data.platformName}</td>
            <td>{this.props.data.node}</td>
            <td>{this.props.data.txPerSec}</td>
            <td>{this.props.data.avgBlockCreationTime}</td>
            <td>{this.props.data.txVolume}</td>
            <td>{this.props.data.testDuration}</td>
            <td>{this.props.data.avgTxPerBlock}</td>
           
                </tr>
        )
    }
}