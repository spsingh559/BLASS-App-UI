import React from 'react';
// import restUrl from './restUrl';


export default class ContextComponent extends React.Component {
  getChildContext() {
    return {
      socket:io('http://laas-123.eastus.cloudapp.azure.com:8000')

    }
  }

  render(){
    return (this.props.children);
  }
}

ContextComponent.childContextTypes = {
  socket: React.PropTypes.object.isRequired
};
