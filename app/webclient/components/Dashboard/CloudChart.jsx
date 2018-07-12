import React from 'react';
import ReactSvgPieChart from "react-svg-piechart";
import {Row,Col} from 'react-bootstrap';
// const data = [
//     {title: "AWS", value: 4, color: "#BDBDBD"},
//     {title: "Azure", value: 8, color: "#757575"},
//     {title: "Google Cloud", value: 2, color: "#424242"}
//   ]


export default class CloudChart extends React.Component{

    render(){
var azr=0;
var aws=0;
var hyp=0;
console.log('instance data is');
console.log(this.props.instanceData);
    this.props.instanceData.forEach((data)=>{
        if(data.cloud=="azure"){ 
            azr++;
        }else{
            aws++;
        }
    })

    var data=[
        {title: "AWS", value: aws, color: "#BDBDBD"},
        {title: "Azure", value: azr, color: "#757575"},
    ]
    console.log(data);

        return(
            <div >
                 <center><h3>Cloud Wise Instance Detail </h3></center>
            
                 <ReactSvgPieChart
    data={data}
    // If you need expand on hover (or touch) effect
    expandOnHover
    // If you need custom behavior when sector is hovered (or touched)
  />
  <Row >
      <center>
<Col xs={2}>
<div style={{backgroundColor:"#BDBDBD", height:"20px",width:"20px"}}>
</div>
<div>
    AWS
    </div>
</Col>
<Col xs={2}>
<div style={{backgroundColor:"#757575", height:"20px",width:"20px"}}>
</div>
<div>
    Azure
    </div>
</Col>


</center>
      </Row>
                </div>
        )
    }
}