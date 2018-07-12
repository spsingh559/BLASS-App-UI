import React from 'react';
import {    Table  } from 'react-bootstrap';

import EachRowToken from './EachRowToken';
export default class ShowKeyDataToken extends React.Component{

    editTokens=(obj)=>{
        this.props.editTokens(obj);
    }

    removeToken=(_id)=>{
        this.props.removeToken(_id)
    }

    render(){
        let newData=this.props.data.map((data,i)=>{
            return(
                <EachRowToken
                key={i}
                data={data}
                editTokens={this.editTokens}
                removeToken={this.removeToken}
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