import React from 'react';
import ReactSvgPieChart from "react-svg-piechart"
import {Row,Col} from 'react-bootstrap';

// const data = [
//     {title: "Ethereum", value: 4, color: "#D7CCC8"},
//     {title: "Hyperledger", value: 5, color: "#A1887F"},
//     {title: "Corda", value: 2, color: "#6D4C41"},
//     {title: "Quorum", value: 1, color: "#4E342E"}
//   ]

export default class PlatFormChart extends React.Component{
    static get contextTypes() {
        return {
          router: React.PropTypes.object.isRequired
        }
      }

    navigateInstanceInfo=()=>{
        this.context.router.push('/instanceInfo');
    }

    render(){
        var eth=0;
var qur=0;
var hyp=0;
console.log('instance data is');
console.log(this.props.instanceData);
    this.props.instanceData.forEach((data)=>{
        if(data.platform=="Ethereum"){ 
            eth++;
        }else if(data.platform=="Hyperledger"){
            hyp++;
        }else if(data.platform=="Quorum"){
            qur++;
        }
    })

    // var data=[
    //     {title: "AWS", value: aws, color: "#BDBDBD"},
    //     {title: "Azure", value: azr, color: "#757575"},
    // ]
    var data = [
        {title: "Ethereum", value: eth, color: "#D7CCC8"},
        {title: "Hyperledger", value: hyp, color: "#A1887F"},
        {title: "Quorum", value: qur, color: "#4E342E"}
      ]
    console.log(data);

        return(
            <div onTouchTap={this.navigateInstanceInfo}>
               <center><h3>Platform Wise Instance Detail </h3></center>
               <br />
               <ReactSvgPieChart
    data={data}
    // If you need expand on hover (or touch) effect
    expandOnHover
    // If you need custom behavior when sector is hovered (or touched)
  />
  <Row >
      <center>
<Col xs={3}>
<div style={{backgroundColor:"#A1887F", height:"20px",width:"20px"}}>
</div>
<div>
    Hyperledger
    </div>
</Col>


<Col xs={2}>
<div style={{backgroundColor:"#4E342E", height:"20px",width:"20px"}}>
</div>
<div>
    Quorum
    </div>
</Col>
<Col xs={2}>
<div style={{backgroundColor:"#D7CCC8", height:"20px",width:"20px"}}>
</div>
<div>
    Ethereum
    </div>
</Col>
</center>
      </Row>
                </div>
        )
    }
}