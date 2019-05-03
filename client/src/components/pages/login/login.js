import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

// css & styles imports
import 'antd/dist/antd.less';
import '../../../css/style';
import '../../../css/views/signup.less';
import { Card, Icon, Col, Form, Input, Checkbox, Button } from 'antd';
// components imports
import { LogInMutation } from '../../gql-mutations/gql-mutations';
import { LogInValidation } from '../../yup-validation/yupValidation';
import { genie } from '../../../img/svg';

// declaring variables
const Genie = props => <Icon component={genie} {...props} />;

const formItemLayout = {
	labelCol: {
		xs: { span: 16 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 24 },
	},
};

// declaring the exported function

const login = ({ match, history }) => {
	return (
		<Mutation
			mutation={LogInMutation}
			onError={error => {
				console.log(error);
				alert('No Bazaar account yet with this email. Please create an account.');
			}}
			onCompleted={data => {
				data.login.message === 'You successfully logged in!'
					? history.push('/app')
					: alert(`Login failed. Incorrect password. Please try again!`);
			}}
		>
			{login => (
				<Formik
					initialValues={{
						user_email: '',
						user_password: '',
					}}
					onSubmit={(values, { setSubmitting }) => {
						login({
							variables: {
								input: {
									user_email: values.user_email,
									user_password: values.user_password,
								},
							},
						});
						setSubmitting(false);
					}}
					validationSchema={LogInValidation}
				>
					{props => {
						const { errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched, values } = props;
						return (
							<div style={{ width: 456, margin: 'auto' }}>
								<Card className="card">
									<Col span={18} offset={3} style={{ textAlign: 'center' }}>
										<Genie style={{ fontSize: 150 }} />
										<h1>Welcome back!</h1>
									</Col>
									<Form {...formItemLayout} onSubmit={handleSubmit}>
										<Form.Item>
											<Input
												id="user_email"
												placeholder="Email"
												type="text"
												prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
												value={values.user_email}
												onChange={handleChange}
												onBlur={handleBlur}
												className={
													errors.user_email && touched.user_email
														? 'text-input error'
														: 'text-input'
												}
											/>
											{errors.user_email && touched.user_email && (
												<div className="input-feedback">{errors.user_email}</div>
											)}
										</Form.Item>
										<Form.Item>
											<Input
												id="user_password"
												placeholder="Password"
												type="text"
												prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
												value={values.user_password}
												onChange={handleChange}
												onBlur={handleBlur}
												className={
													errors.user_password && touched.user_password
														? 'text-input error'
														: 'text-input'
												}
											/>
											{errors.user_password && touched.user_password && (
												<div className="input-feedback">{errors.user_password}</div>
											)}
										</Form.Item>

										<Form.Item>
											<Checkbox>Remember me</Checkbox>
											<span className="login-form-forgot">
												<a>Forgot password</a>
											</span>
											<Button
												type="primary"
												htmlType="submit"
												className="login-form-button"
												disabled={isSubmitting}
											>
												Log in
											</Button>
										</Form.Item>
									</Form>
								</Card>
								<Card style={{ textAlign: 'center', marginTop: 20 }}>
									Not a space&#60;X&#62;plorer yet? &nbsp;
									<Link to="/signup">
										<span>Create an account</span>
									</Link>
								</Card>
							</div>
						);
					}}
				</Formik>
			)}
		</Mutation>
	);
};

export default login;
