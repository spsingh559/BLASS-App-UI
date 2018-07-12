import React from 'react';
import {Grid} from 'react-bootstrap';
import ApplicationDetail from './ApplicationDetail';

const data=[
    {
    aid:"AID1232489",
     assessmentname:"Supply Chain",
    timeStamp:"20/02/2018 02:05:26",
    recommendation:"Done",
    advanceAnalysis:"N/A",
    customerId:"2137823"},
{
    aid:"AID1232490",
    assessmentname:"Trade Finance",
    timeStamp:"20/02/2018 02:05:26",
    recommendation:"Done",
    advanceAnalysis:"Done",
    customerId:"2137823"}
]

export default class ApplicationAssessmentDashboard extends React.Component{

    render(){
        return(
            <div className="background">
            <div style={{marginTop:"65px"}}>
            <Grid>
                <ApplicationDetail data={data} />
                </Grid>
                </div>
                </div>
        )
    }
}