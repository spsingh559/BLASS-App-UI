import React from 'react';
import {Table} from 'react-bootstrap';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EachApplicationDetail from './EachApplicationDetail';

export default class ApplicationDetail extends React.Component{
    static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }

    naviageCreateAssessment=()=>{
        this.context.router.push('/assesmentForm');
    }

    render(){
        let newData=this.props.data.map((data,i)=>{
            return(
                <EachApplicationDetail 
                key={i}
                data={data}
                />
            )
        })
        return(
           <div>
               <Table  bordered style={{color:"black", marginTop:"100px"}}>
  <thead style={{backgroundColor:"#ffe4b2",color:"black"}}>
    <tr>
      <th>AID</th>
      <th>Assessment Name</th>
      <th>Created Time</th>
      <th>Basic Recommendation</th>
      <th>Advance Analysis</th>
      <th>Action</th>
      <th>View</th>
    </tr>
  </thead>
  <tbody>
            
            {newData}
            </tbody>
            </Table>
            <center>
            <FloatingActionButton style={{marginTop:"20px"}} onTouchTap={this.naviageCreateAssessment}>
      <ContentAdd />
    </FloatingActionButton>
    </center>
    </div>
                
        )
    }
}