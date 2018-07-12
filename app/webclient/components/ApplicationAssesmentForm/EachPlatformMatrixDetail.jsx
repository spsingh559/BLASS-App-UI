import React from 'react';

export default class EachPlatformMatrixDetail extends React.Component {

    render() {
        return (

            <tr>

                <td>
                    {this.props.data.Criteria}
                </td>
                <td>
                    {this.props.data.Ethereum}
                </td>
                <td>
                    {this.props.data.Quorum}
                </td>
                <td>
                    {this.props.data.HyperledgerFab}
                </td>
                <td>
                    {this.props.data.Corda}
                </td>
            </tr>

        )
    }
}