import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';
import Footer from './footer.jsx';



export default class ParentComponent extends React.Component{
	static get contextTypes() {
	    return {
	      router: React.PropTypes.object.isRequired
	    }
	  }

	render(){
		var usernameObj = JSON.parse(sessionStorage.getItem('userLoginDetails'));
		if (usernameObj === null) {
			this.context.router.push('/login');
		}

		return(
			<div>
			<Nav />
			{this.props.children}
			<Footer />
			</div>
			);
	}
}