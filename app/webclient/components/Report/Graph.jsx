import React from 'react';

const style={
    divStyle:{
    height:'400px',width:'auto',marginTop:'10px',borderRadius: "6px",border: "solid 1px #d5d5d5",color:"white"}
}
export default class Graph extends React.Component{

    render(){
 console.log("Graph Comp",this.props.instanceNm);
	var instaNm=this.props.instanceNm;
	console.log('var dec',instaNm);
	var imgname='';
 if(instaNm=='testInstance1'){
            imgname="../images/Ethereumexplorer.png";
            console.log(imgname);
         }
         else if(instaNm=='testInstance2'){
            imgname="../images/Hyperledger.png";
            console.log(imgname);
         }
     else if(instaNm=='testInstance3'){
        imgname="../images/Quoram.png";
        console.log(imgname);
         }
         else{
             imgname="else";
        console.log(imgname);
         }
        return(
           <div style={style.divStyle}>
                <img src={imgname} style={{width:'1143px' ,height:'480px'}}/>
                </div>        )
    }
}