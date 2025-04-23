import { Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi } from '../../api/society-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { showToast } from '../services/toastServices';
import { getWingPropertiesApi } from '../../api/property-api';
import { getTowerWingsApi } from '../../api/wing-api';
import { getSocietyTowersApi } from '../../api/tower-api';

interface ProductModalProps {
    show: boolean;
    // onSave: (values: any) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;

}

const GatePassModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing }) => {
    return (
        <>
            <Modal show={show} size="xl" centered>
                <Modal.Header>
                    <Modal.Title>Gate Pass</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>

                <Modal.Body className='bg-light'>
                    <Accordion defaultActiveKey="basicinfo">
                        <Accordion.Item eventKey="basicinfo">
                            <Accordion.Header>Basic Information</Accordion.Header>
                            <Accordion.Body className='p-2'>
                                <Row>
                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Society </Form.Label>
                                            <Select
                                                // options={society}
                                                placeholder="Select society"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Property </Form.Label>
                                            <Select
                                                // options={property}
                                                placeholder="Select property"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Gate Type </Form.Label>
                                            <Select
                                                // options={gatetype}
                                                placeholder="Select type"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Category </Form.Label>
                                            <Select
                                                // options={gatetypecategory}
                                                placeholder="Select category"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Sub Category </Form.Label>
                                            <Select
                                                // options={gatetypesubcategory}
                                                placeholder="Select sub category"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Member </Form.Label>
                                            <Select
                                                // options={member}
                                                placeholder="Select member"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>



                                    <Col xl={2}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Date of Entry</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="dd/mm/yyyy"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={2}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Time In</Form.Label>
                                            <Form.Control
                                                type="time"
                                                placeholder=""
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={2}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Date of Exit</Form.Label>
                                            <Form.Control
                                                type="date"
                                                placeholder="dd/mm/yyyy"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={2}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Time Out</Form.Label>
                                            <Form.Control
                                                type="time"
                                                placeholder=""
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Gate Pass Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Gate Pass Number"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Tenant <span className='text-info float-end cursor'
                                            >View Tenant Detail</span> </Form.Label>
                                            <Select
                                                // options={gatepasstenant}
                                                placeholder="Select tenant"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Vendor <span className='text-info float-end cursor'>View Vendor Detail</span> </Form.Label>
                                            <Select
                                                // options={vendor}
                                                placeholder="Select vendor"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>


                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="ApplicationDescription">
                            <Accordion.Header>Application Description</Accordion.Header>
                            <Accordion.Body className='p-2'>
                                <Row>
                                    <Col xl={12}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Purpose</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Purpose"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Description
                                                <small className='float-end'>max 250 character</small>
                                            </Form.Label>
                                            <textarea className="form-control" placeholder='Details'></textarea>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="vehicledetails">
                            <Accordion.Header>Vehicle And Driver Details</Accordion.Header>
                            <Accordion.Body className='p-2'>
                                <Row>
                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Driver Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Driver Contact Details</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Contact"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Vehicle Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Number"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Vehicle Model</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="model"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Vehicle Nature </Form.Label>
                                            <Select
                                                // options={vehiclenature}
                                                placeholder="Select nature"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl="4">
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Vehicle Type </Form.Label>
                                            <Select
                                                // options={vehicletypegatepass}
                                                placeholder="Select type"
                                                classNamePrefix="Select2"
                                            />
                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="contactpersondetails">
                            <Accordion.Header>Contact Person Details</Accordion.Header>
                            <Accordion.Body className='p-2'>
                                <Row>
                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Contact Person Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                    <Col xl={6}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Contact Person Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Number"
                                                className="form-control"
                                            ></Form.Control>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>
                                    <Col xl={12}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Remarks
                                                <small className='float-end'>max 250 character</small>
                                            </Form.Label>
                                            <textarea className="form-control" placeholder='remarks' cols="60" rows="5"></textarea>
                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                        </Form.Group>
                                    </Col>

                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="approvaldetails">
                            <Accordion.Header>Approval Details</Accordion.Header>
                            <Accordion.Body className='p-2'>
                                <Row>
                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Society </Form.Label>
                                            <Select
                                                // options={society}
                                                placeholder="Select Society"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Property </Form.Label>
                                            <Select
                                                // options={property}
                                                placeholder="Select property"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Tower </Form.Label>
                                            <Select
                                                // options={wing}
                                                placeholder="Select Tower"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>


                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Wing </Form.Label>
                                            <Select
                                                // options={wing}
                                                placeholder="Select Wing"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Flat </Form.Label>
                                            <Select
                                                // options={flat}
                                                placeholder="Select Flat"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>



                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Approver Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="approverName"
                                                placeholder="Approver Name"
                                                className="form-control"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Approver Contact</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="contactdetails"
                                                placeholder="Contact"
                                                className="form-control"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col xl={4}>
                                        <Form.Group className="form-group mb-1">
                                            <Form.Label>Designation </Form.Label>
                                            <Select
                                                // options={designation}
                                                placeholder="Select Designation"
                                                classNamePrefix="Select2"
                                            />
                                        </Form.Group>
                                    </Col>


                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>

                    <Col xl={12} className='p-0'>
                        {/* <label><input type="checkbox" className='float-start m-2' />
                        <b className='float-start mt-1 cursor'
                         onClick={() => { viewDemoShow("termsconditionsview"); }}> Terms & Conditions</b></label> */}
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit'>
                        {editing ? "Update" : "Save"}
                    </Button>


                </Modal.Footer>
            </Modal>

        </>
    )
}
export default GatePassModal;