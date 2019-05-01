import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo';
// css & styles imports
import 'antd/dist/antd.less';
import '../../../../css/style';
import '../../../../css/views/additem.less';
import { Card, Icon, Col, Form, Input, Checkbox, Button, InputNumber, Upload, Row } from 'antd';
// components imports
import { addItemMutation } from '../../../gql-mutations/gql-mutations';
import { AddItemValidation } from '../../../yup-validation/yupValidation';
import { genie } from '../../../../img/svg';

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

const addItem = ({ match, history }) => {
	return (
		<Mutation
			mutation={addItemMutation}
			onError={error => {
				console.log(error);

				alert('Sorry, adding the item on Bazaar did not work. Please try again. ');
			}}
			onCompleted={data => {
				console.log(data);
				console.log(data.addItem);
				data.addItem.message === `Item was sucessfully added to the Bazaar Database.`
					? history.push('/app')
					: alert(`Adding the item failed.`);
			}}
		>
			{signup => (
				<Formik
					initialValues={{
						item_name: '',
						item_type: '',
						item_price: '',
						item_quantity_avail: '',
						item_description: '',
						item_condition: '',
					}}
					onSubmit={(values, { setSubmitting }) => {
						signup({
							variables: {
								item_name: values.item_name,
								item_type: values.item_type,
								item_price: values.item_price,
								item_quantity_avail: values.item_quantity_avail,
								item_description: values.item_description,
								item_condition: values.item_condition,
							},
						});
						setSubmitting(false);
					}}
					validationSchema={AddItemValidation}
				>
					{props => {
						const { errors, handleChange, handleBlur, handleSubmit, isSubmitting, touched, values } = props;
						const { TextArea } = Input;
						return (
							<div style={{ width: 900, margin: 'auto' }}>
								<Button className="addItem" ghost>
									<Icon type="arrow-left" />
									Back to Bazaar
								</Button>
								<Card className="cardAddItem">
									<Form {...formItemLayout} onSubmit={handleSubmit}>
										<div span={18} offset={3} style={{ textAlign: 'center' }}>
											<Genie />
											<h1>Sell an item</h1>
										</div>
										<Row>
											<Col span={16} style={{ paddingRight: 15 }}>
												<Form.Item>
													<Input
														id="item_name"
														placeholder="Name"
														type="item_name"
														prefix={
															<Icon
																type="font-colors"
																style={{ color: 'rgba(0,0,0,.25)' }}
															/>
														}
														value={values.item_name}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.item_name && touched.item_name
																? 'text-input error'
																: 'text-input'
														}
													/>
													{errors.item_name && touched.item_name && (
														<div className="input-feedback">{errors.item_name}</div>
													)}
												</Form.Item>
												<Form.Item>
													<Input
														id="item_type"
														placeholder="Category"
														type="item_type"
														prefix={
															<Icon type="tags" style={{ color: 'rgba(0,0,0,.25)' }} />
														}
														value={values.item_type}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.item_type && touched.item_type
																? 'text-input error'
																: 'text-input'
														}
													/>
													{errors.item_type && touched.item_type && (
														<div className="input-feedback">{errors.item_type}</div>
													)}
												</Form.Item>
												<Form.Item>
													<Input
														id="item_price"
														placeholder="Price"
														type="number"
														prefix={
															<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />
														}
														value={values.item_price}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.item_price && touched.item_price
																? 'text-input error'
																: 'text-input'
														}
													/>
													{errors.item_price && touched.item_price && (
														<div className="input-feedback">{errors.item_price}</div>
													)}
												</Form.Item>

												<Form.Item>
													<Input
														id="item_quantity_avail"
														placeholder="Quantity"
														type="number"
														prefix={
															<Icon type="gold" style={{ color: 'rgba(0,0,0,.25)' }} />
														}
														value={values.item_quantity_avail}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.item_quantity_avail && touched.item_quantity_avail
																? 'text-input error'
																: 'text-input'
														}
													/>

													{errors.item_quantity_avail && touched.item_quantity_avail && (
														<div className="input-feedback">
															{errors.item_quantity_avail}
														</div>
													)}
												</Form.Item>
												<Form.Item>
													<TextArea
														id="item_description"
														placeholder="Description"
														type="item_description"
														prefix={
															<Icon
																type="font-size"
																style={{ color: 'rgba(0,0,0,.25)' }}
															/>
														}
														value={values.item_description}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.item_description && touched.item_description
																? 'text-input error'
																: 'text-input'
														}
														autosize={{ minRows: 2, maxRows: 3 }}
													/>
													{errors.item_description && touched.item_description && (
														<div className="input-feedback">{errors.item_description}</div>
													)}
												</Form.Item>
												<Form.Item>
													<Input
														id="item_condition"
														placeholder="Condition"
														type="item_condition"
														prefix={
															<Icon
																type="customer-service"
																style={{ color: 'rgba(0,0,0,.25)' }}
															/>
														}
														value={values.item_condition}
														onChange={handleChange}
														onBlur={handleBlur}
														className={
															errors.item_condition && touched.item_condition
																? 'text-input error'
																: 'text-input'
														}
													/>
													{errors.item_condition && touched.item_condition && (
														<div className="input-feedback">{errors.item_condition}</div>
													)}
												</Form.Item>
											</Col>

											<Col span={8}>
												<Form.Item>
													<div className="dropbox">
														<Upload.Dragger name="files" action="/upload.do">
															<p className="ant-upload-drag-icon">
																<Icon type="inbox" />
															</p>
															<p className="ant-upload-text">
																Click or drag image file to this area <br />
																to upload
															</p>
															<p className="ant-upload-hint" />
														</Upload.Dragger>
													</div>
												</Form.Item>
												<Form.Item>
													<Upload name="logo" action="/upload.do" listType="picture">
														<Button>
															<Icon type="upload" /> Click to upload image
														</Button>
													</Upload>
												</Form.Item>
											</Col>
										</Row>
										<div style={{ textAlign: 'center' }}>
											<Form.Item>
												<div>
													<Checkbox>
														I understand Bazaar's <a>Selling Policy</a>
													</Checkbox>
												</div>
												<div>
													<Button
														type="primary"
														htmlType="submit"
														className="login-form-button sell"
														disabled={isSubmitting}
													>
														Sell this item
													</Button>
												</div>
											</Form.Item>
										</div>
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

export default addItem;
