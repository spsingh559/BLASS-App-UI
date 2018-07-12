import React from 'react';
import {    Table  } from 'react-bootstrap';

import EachRow from './EachRow';
export default class ShowKeyData extends React.Component{

    edit=(obj)=>{
        this.props.edit(obj);
    }

    remove=(_id)=>{
        this.props.remove(_id)
    }

    render(){
        let newData=this.props.data.map((data,i)=>{
            return(
                <EachRow
                key={i}
                data={data}
                edit={this.edit}
                remove={this.remove}
                />
            )
        })
        return(
            <Table  >
            <thead >
              <tr>
              
                <th>Key</th>
                <th>Value</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
                      
                      {newData}
                      </tbody>
                      </Table>

        )
    }
}