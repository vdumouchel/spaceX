// basic react imports
import React from 'react';
// advanced module imports
import PropTypes from 'prop-types';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Link } from 'react-router-dom';
// css & style imports
import { Button, Icon } from 'antd';
import { logo } from '../../../img/svg';
import { lampgear } from '../../../img/svg';

// declaring variables
const Logo = props => <Icon component={logo} {...props} />;
const Lampgear = props => <Icon component={lampgear} {...props} />;

//declaring React component
const Landing = props => {
	return (
		<div className="banner-wrapper">
			{props.isMobile && (
				<TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
					<div className="home-banner-image">
						<Lampgear style={{ paddingTop: 8 }} />
					</div>
				</TweenOne>
			)}
			<QueueAnim className="banner-title-wrapper" type={props.isMobile ? 'bottom' : 'right'}>
				<div key="line" className="title-line-wrapper">
					<div className="title-line" style={{ transform: 'translateX(-64px)' }} />
				</div>
				<Logo style={{ paddingTop: 8, fontSize: 200 }} />
				<p key="content">
					{' '}
					&#60; Everyday, we make your techy gear wishes come true. Not to worry, there isn't a limit of 3 :P
					/&#62;{' '}
				</p>
				<div key="button" className="button-wrapper">
					<Link to="/signup">
						<Button type="primary">Create an account</Button>
					</Link>
					<Link to="/login">
						<Button style={{ margin: '0 16px' }} type="primary" ghost>
							Log in
						</Button>
					</Link>
					<GitHubButton key="github-button" type="stargazers" namespace="ant-design" repo="ant-design-pro" />
				</div>
			</QueueAnim>
			{!props.isMobile && (
				<TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
					<Lampgear />
				</TweenOne>
			)}
		</div>
	);
};

Landing.propTypes = {
	isMobile: PropTypes.bool.isRequired,
};

export default Landing;
