
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import stateCities from "../stateCity.json"
import { Link } from "react-router-dom";
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { addSocietyApi, updateSocietyApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
import AccountDetails from './societyTabs/accountDetails';


function interestDetails() {
    return (
        <Accordion.Item eventKey="Interest Details" className="bg-white  mb-3">
            <Accordion.Header className="borders">
                Interest Details
            </Accordion.Header>
            <Accordion.Body className="borders p-0">
                <Card className='m-0'>

                    <Card.Body className='pt-3'>

                        <Row>
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Interest Calculation Type <span className="text-danger">*</span></Form.Label>
                                    <Select
                                        options={calculationtype}
                                        // value={values.city}
                                        // onChange={(selected) => setFieldValue("city", selected)}
                                        placeholder="Select Type"
                                        classNamePrefix="Select2"
                                    />
                                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                </Form.Group>
                            </Col>

                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Annual Rate of Interest </Form.Label>
                                    <Field
                                        type="text"
                                        name="annualrateinterest"
                                        placeholder="0.00%"
                                        className="form-control"
                                    />
                                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                </Form.Group>
                            </Col>


                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Rate of Interest</Form.Label>
                                    <p className='mb-0'>0.0000000000%</p>
                                    <em className='tx-12 text-muted'>This field is calculated upon save</em>
                                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                </Form.Group>
                            </Col>




                        </Row>

                    </Card.Body>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default interestDetails