import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
// css & styles imports
import 'antd/dist/antd.less';
import '../../../css/style';
import '../../../css/views/signup.less';
import { Card, Icon, Col, Form, Input, Checkbox, Button, Alert } from 'antd';
// components imports
import { signUpMutation } from '../../gql-mutations/gql-mutations';
import { signUpValidation } from '../../yup-validation/yupValidation';
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

const signup = ({ match, history }) => {
	return (
		<Mutation
			mutation={signUpMutation}
			onError={error => {
				console.log(error);

				alert(
					'Sorry, there is already a Bazaar account associated with this email. Please try logging in or creating an account under another email.'
				);
			}}
			onCompleted={data => {
				data.signUp.message === `Amazing! Welcome to Bazaar!`
					? history.push('/app')
					: alert(`Sign up failed. Please try again!`);
			}}
		>
			{signup => (
				<Formik
					initialValues={{
						user_first_name: '',
						user_last_name: '',
						user_username: '',
						user_email: '',
						user_password: '',
					}}
					onSubmit={(values, { setSubmitting }) => {
						signup({
							variables: {
								user_first_name: values.user_first_name,
								user_last_name: values.user_last_name,
								user_username: values.user_username,
								user_email: values.user_email,
								user_password: values.user_password,
							},
						});
						setSubmitting(false);
					}}
					validationSchema={signUpValidation}
				>
					{props => {
						const { errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched, values } = props;
						return (
							<div style={{ width: 456, margin: 'auto' }}>
								<Card className="card">
									<Col span={18} offset={3} style={{ textAlign: 'center' }}>
										<Genie />
										<h1>Sign Up</h1>
									</Col>
									<Form {...formItemLayout} onSubmit={handleSubmit}>
										<Form.Item>
											<Input
												id="user_first_name"
												placeholder="First Name"
												type="user_first_name"
												prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
												value={values.user_first_name}
												onChange={handleChange}
												onBlur={handleBlur}
												className={
													errors.user_first_name && touched.user_first_name
														? 'text-input error'
														: 'text-input'
												}
											/>
											{errors.user_first_name && touched.user_first_name && (
												<div className="input-feedback">{errors.user_first_name}</div>
											)}
										</Form.Item>
										<Form.Item>
											<Input
												id="user_last_name"
												placeholder="Last Name"
												type="user_last_name"
												prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
												value={values.user_last_name}
												onChange={handleChange}
												onBlur={handleBlur}
												className={
													errors.user_last_name && touched.user_last_name
														? 'text-input error'
														: 'text-input'
												}
											/>
											{errors.user_last_name && touched.user_last_name && (
												<div className="input-feedback">{errors.user_last_name}</div>
											)}
										</Form.Item>
										<Form.Item>
											<Input
												id="user_username"
												placeholder="Username"
												type="user_username"
												prefix={<Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />}
												value={values.user_username}
												onChange={handleChange}
												onBlur={handleBlur}
												className={
													errors.user_username && touched.user_username
														? 'text-input error'
														: 'text-input'
												}
											/>
											{errors.user_username && touched.user_username && (
												<div className="input-feedback">{errors.user_username}</div>
											)}
										</Form.Item>
										<Form.Item>
											<Input
												id="user_email"
												placeholder="Email"
												type="user_password"
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
												type="user_password"
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
											<span className="login-form-forgot" href="">
												<Checkbox>
													I accept Bazaar's <a>Terms & Policy</a>
												</Checkbox>
											</span>
											<Button
												type="primary"
												htmlType="submit"
												className="login-form-button"
												disabled={isSubmitting}
											>
												Create an account
											</Button>
										</Form.Item>
									</Form>
								</Card>
							</div>
						);
					}}
				</Formik>
			)}
		</Mutation>
	);
};

export default signup;
