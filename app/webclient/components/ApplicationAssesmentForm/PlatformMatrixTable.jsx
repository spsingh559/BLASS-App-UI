import React from 'react';
import { Table } from 'react-bootstrap';
import EachPlatformMatrixDetail from './EachPlatformMatrixDetail';

export default class PlatformMatrixTable extends React.Component {


    render() {
        let newData = this.props.data.map((data, i) => {
            return (
                <EachPlatformMatrixDetail
                    key={i}
                    data={data}
                />
            )
        })
        return (
            <div>
                <Table bordered style={{ color: "white",marginTop:"20px",width:"600px",fontSize:"13px"}}>
                    <thead style={{ backgroundColor: "#ffe4b2", color: "black" }}>
                        <tr>
                            <th>Criteria</th>
                            <th>Ethereum</th>
                            <th>Quorum</th>
                            <th>Hyperledger Fabric</th>
                            <th>Corda</th>
                        </tr>
                    </thead>
                    <tbody>

                        {newData}
                    </tbody>
                </Table>

            </div>

        )
    }
}