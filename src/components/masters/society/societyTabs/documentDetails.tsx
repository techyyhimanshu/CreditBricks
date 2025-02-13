
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
import BasicDetails from './societyTabs/basicDetails';

function DocumentDetails() {
    const [currentSociety, setCurrentSociety] = useState({
        societyId: null,
        societyName: '',
        contactNumber: '',
        email: '',
        societyManager: '',
        address: '',
        country: null,
        state: null,
        city: null,
        registrationNumber: '',
        tanNumber: '',
        panNumber: '',
        signatory: '',
        hsnCode: '',
        gstin: '',
        bankName: '',
        accountNumber: '',
        branchName: '',
        ifscCode: '',
        chequeFavourable: '',
        paymentQrFile: null
    });
    return (
        <Accordion.Item eventKey="Society Document Details" className="bg-white  mb-3">
            <Accordion.Header className="borders">
                Society Document Details
            </Accordion.Header>
            <Accordion.Body className="borders p-0">
                <Card className='m-0'>

                    <Card.Body className='pt-3'>
                        <Formik initialValues={{
                            registrationNumber: currentSociety?.registrationNumber,
                            tanNumber: currentSociety?.tanNumber,
                            panNumber: currentSociety?.panNumber,
                            signatory: currentSociety?.signatory,
                            hsnCode: currentSociety?.hsnCode,
                            gstin: currentSociety?.gstin
                        }
                        }>
                            {({ setFieldValue, values }) => (
                                <FormikForm>
                                    <Row>
                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Society Registration Number <span className="text-danger">*</span></Form.Label>
                                                <Field
                                                    type="text"
                                                    name="registrationNumber"
                                                    placeholder="Registration number"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>

                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>TAN number </Form.Label>
                                                <Field
                                                    type="text"
                                                    name="tanNumber"
                                                    placeholder="TAN number"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>


                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>PAN No</Form.Label>
                                                <Field
                                                    type="text"
                                                    name="panNumber"
                                                    placeholder="PAN number"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>


                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Signatory</Form.Label>
                                                <Field
                                                    type="text"
                                                    name="signatory"
                                                    placeholder="Signatory"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>



                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>HSN Code </Form.Label>
                                                <Field
                                                    type="text"
                                                    name="hsnCode"
                                                    placeholder="HSN code"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>


                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>GSTIN</Form.Label>
                                                <Field
                                                    type="text"
                                                    name="gstin"
                                                    placeholder="GSTIN"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>



                                        <Col xl={12}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button type="submit" className='btn btn-primary '>Save</Button>
                                            </div>
                                        </Col>


                                    </Row>
                                </FormikForm>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default DocumentDetails