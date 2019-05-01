//basic react imports
import React from 'react';
// advanced module imports

import { enquireScreen } from 'enquire-js';
import DocumentTitle from 'react-document-title';
// css & styles imports
import '../../../App.css';
import './static/style';

// components imports

import Landing from './Landing.jsx';

//declare variables

let isMobile;

enquireScreen(b => {
	isMobile = b;
});

//declare function

class landing extends React.PureComponent {
	state = {
		isMobile,
	};

	componentDidMount() {
		enquireScreen(b => {
			this.setState({
				isMobile: !!b,
			});
		});
	}

	render() {
		return (
			<DocumentTitle>
				<div className="App">
					<div>
						<Landing isMobile={this.state.isMobile} />
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default landing;
