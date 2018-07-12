const httpClient = require('axios');

const getNode = (service) => {
  return service[0].nodes[0];
};

const getServiceNode = (serviceName, callback) => {
  const discoveryUrl = process.env['DISCOVERY_URL'];
  console.log(`${discoveryUrl}?service=go.micro.srv.${serviceName}`)
  httpClient.get(`${discoveryUrl}?service=go.micro.srv.${serviceName}`)
  .then((resp) => {
    const service = resp.data;
    const serviceNode = getNode(service);
    callback(serviceNode);
  });
};

const updateAddresses = {
  dbServer: (callback) => {
    getServiceNode('db', (serviceNode) => {
      const serviceAddress = serviceNode.address;
      const servicePort = serviceNode.port;
      callback(`${serviceAddress}:${servicePort}`);
    });
  },
  nsqdTCPAddress: (callback) => {
    getServiceNode('pub', (serviceNode) => {
      const serviceAddress = serviceNode.address;
      const servicePort = serviceNode.metadata.tcpPort;
      callback(`${serviceAddress}:${servicePort}`);
    });
  },
  lookupdHTTPAddresses: (callback) => {
    getServiceNode('sub', (serviceNode) => {
      const serviceAddress = serviceNode.address;
      const servicePort = serviceNode.metadata.httpPort;
      callback(`${serviceAddress}:${servicePort}`);
    });
  },
  pubServer: (callback) => {
    getServiceNode('pub', (serviceNode) => {
      const serviceAddress = serviceNode.address;
      const servicePort = serviceNode.metadata.httpPort;
      callback(`${serviceAddress}:${servicePort}`);
    })
  },
  cloudServer: (callback) => {
    getServiceNode('cloud', (serviceNode) => {
      const serviceAddress = serviceNode.address;
      const servicePort = serviceNode.port;
      callback(`${serviceAddress}:${servicePort}`);
    })
  },
  experimentServer: (callback) => {
    getServiceNode('exp', (serviceNode) => {
      const serviceAddress = serviceNode.address;
      const servicePort = serviceNode.port;
      callback(`${serviceAddress}:${servicePort}`);
    })
  }
};

const updateAll = () => {
  for(let i in updateAddresses) {
    const updater = updateAddresses[i];
    updater((address) => {
      process.env[i] = address;
      console.log(process.env[i], i)
    })
  }
}

const nsqReady = setInterval(() => {
  if(process.env.nsqdTCPAddress) {
    clearInterval(nsqReady);
  } else {
    updateAll();
  }
}, 500);

setInterval(() => {
  updateAll();
}, 60000)


