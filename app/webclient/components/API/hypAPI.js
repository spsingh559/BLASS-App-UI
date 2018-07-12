var hypAPI=[
    {
        _id:100,
        type:"GET",
        api:"hyp",
        apiName:'/query',
        desc:'Query Chaincode',
        params: {
            "channelName":    "mychannel",
            "chainCodeName":"ProductCC",
            "peerName":"Peer1",
            "functionName":"query",
            "args":"%5B%22a%22%5D"
 
}
    },
    {
        _id:101,
        api:"hyp",
        type:"POST",
        apiName:'/Install',
        desc:'Install and Instantiate Chain Code',
        params: null
    },
    {
        _id:102,
        api:"hyp",
        type:"POST",
        apiName:'/invoke',
        desc:'Invoke Chaincode API',
        params: {     
            "channelName":    "mychannel",
            "chainCodeName":"Chaincode Name",
            "peerName":"Peer1",
            "functionName":"move",
            "args":["a","b","10"]
           }
    },
    {
        _id:103,
        api:"hyp",
        type:"get",
        apiName:':8080/chaincodes?peer=peer1&type=instantiated',
        desc:'Query Instantiated chaincodes',
        params:null
    },
    {
        _id:103,
        api:"hyp",
        type:"get",
        apiName:':8080/channels?peer=peer1',
        desc:'Query Channels',
        params:null
    }
    
]

exports = module.exports = hypAPI;