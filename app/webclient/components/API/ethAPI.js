var ethAPI=[
    {
    _id:1,
    api:"eth",
    type:"post",
    apiName:':3001/blockchain/v1/account/create',
    desc:'Create Accounts',
    params: {
        "number": 2, 
        "password": "password"
    }
},
{
    _id:2,
    api:"eth",
    type:"get",
    apiName:':3001/blockchain/v1/account/getAll',
    desc:'Get All Accounts',
    params:null
},
{
    _id:3,
    api:"eth",
    type:"post",
    apiName:':3001/blockchain/v1/tx/account',
    desc:'Send a transaction to an account',
    params:
    { 
        "fromAccount": "0x762f1584e99e4b4568547120d4efd4399502601f", 
        "fromPassword": "password", 
        "params": 
        {
          "from": "0x762f1584e99e4b4568547120d4efd4399502601f", 
          "to": "0x90f43613279a61dee6416f0ab08b43105ee43b75",
          "value": 100000
        }
      }
},
{
    _id:4,
    api:"eth",
    type:"get",
    apiName:':3001/blockchain/v1/tx/details?txHash={txnHash}',
    desc:'Get Transaction Details',
    params:{
        "txnHash":"ac90f43613279a61dee6416f0ab08b43105ee43b75"
    }
},
{
    _id:5,
    api:"eth",
    type:"post",
    apiName:':3001/blockchain/v1/contract/create',
    desc:'Create Contract',
    params: {
        "fromAccount":"0x762f1584e99e4b4568547120d4efd4399502601f",
        "fromPassword":"password",
        "source":"contract multiplyContract { function multiplyBy7(uint a) returns(uint d) { return a * 7; } }",
        "contractNames":"{\"main\":\"multiplyContract\",\"abi\":[\"multiplyContract\"],\"txHash\":\"multiplyContract\"}"
      },
},
{
    _id:6,
    api:"eth",
    type:"post",
    apiName:':3001/blockchain/v1/tx/contract',
    desc:'Send a transaction to a contract',
    params:{
        "fromAccount": "0x762f1584e99e4b4568547120d4efd4399502601f", 
        "fromPassword": "password", 
        "params": 
        {
          "from": "0x762f1584e99e4b4568547120d4efd4399502601f", 
          "to": "0x90f43613279a61dee6416f0ab08b43105ee43b75",
          "value": 100000
        },
        "source":"contract multiplyContract { function multiplyBy7(uint a) returns(uint d) { return a * 7; } }","contractNames":"{\"main\":\"multiplyContract\",\"abi\":[\"multiplyContract\"],\"txHash\":\"multiplyContract\"}",
        gas: 1000
      } 
}
]

exports = module.exports = ethAPI;