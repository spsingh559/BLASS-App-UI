import React from 'react';

import {Grid,Row,Col,Table} from 'react-bootstrap';

import Graph from './Graph';

export default class Report extends React.Component{

    render(){ 
console.log('instance id reach to this page');
console.log(this.props.params.instanceID);
        return(
            <div style={{marginTop:"63px"}} className="reportBackGround">
            <Grid>
            <Row style={{marginTop:"50px"}}>
                <Col xs={6}>
                <Table  bordered style={{color:"white"}}>
  <thead>
    <tr>
      <th>Services</th>
    </tr>
  </thead>
  <tbody>
      <tr>
          <td>
          Name : Blockchain
          </td>
          </tr>
          <tr>
          <td>
          Plan : h1-vs-djk-sb
          </td>
          </tr>
            </tbody>
            </Table>
                </Col>
                <Col xs={6} >
                <Table  bordered style={{color:"white"}}>
  <thead>
    <tr>
      <th>Instances</th>
    </tr>
  </thead>
  <tbody>
      <tr>
          <td>
          ID : 1238904sjkdfsdk1`30891238991234u`
          </td>
          </tr>
          <tr>
          <td>
          Name : "Block chain Wipro"
          </td>
          </tr>
            </tbody>
            </Table>
                </Col>
                </Row>
                <Row>
                    <Col xs={12} >
                    <Graph instanceNm={this.props.params.instanceID}/>
                    </Col>
                    </Row>
            </Grid>
                </div>
        )
    }
}