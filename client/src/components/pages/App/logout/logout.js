// basic react import
import React from 'react';

// advanced module imports
import { Mutation } from 'react-apollo';
// style & css imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/feed.less';
import { Button } from 'antd';

// component imports
import { LogoutMutation } from '../../../gql-mutations/gql-mutations';
// declaring variables

// react component

const Logout = ({ match, history }) => {
	return (
		<Mutation mutation={LogoutMutation}>
			{({ client, loading, errors, data }) => {
				if (loading) return <div>Loading...</div>;
				if (errors) return <div>Errors {JSON.stringify(errors)}</div>;
				return (
					<div>
						<span onClick={() => client.resetStore()}>log out</span>
					</div>
				);
			}}
		</Mutation>
	);
};

export default Logout;
