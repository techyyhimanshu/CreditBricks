
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Card, Row, Accordion, Button, Form } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";

const product = [
  { value: "1", label: "Lift" },
  { value: "2", label: "Pest Control" },
  { value: "3", label: "Electrician" },
  { value: "4", label: "Waterman" },
  { value: "5", label: "Security" },
  { value: "6", label: "Housekeeping " },
]

const servicetype = [
  { value: "1", label: "AMC" },
  { value: "2", label: "On Request" },
]

const frequency = [
  { value: "1", label: "Monthly" },
  { value: "2", label: "Quarterly" },
  { value: "1", label: "Half Yearly" },
  { value: "2", label: "Yearly " },
]

const contactvalue= [
  { value: "1", label: "Basic" },
  { value: "2", label: "GST" },
]

export default function AddVendorMaster() {



  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}vendor/vendormaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Vendor Master</span>
        </div>
      </div>

      <Row>
<Col xl={12}>
              <Accordion defaultActiveKey="Basic Details">

                <Accordion.Item eventKey="Basic Details" className="bg-white mb-3">
                  <Accordion.Header className="borders ">
                    Basic Details
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Vendor Name<span className="text-danger">*</span></Form.Label>
                              <Form.Control
                                type="text"
                                name="vendorname"
                                placeholder="Vendor name"
                                className="form-control"
                              ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Vendor Address</Form.Label>
                              <Form.Control
                                type="text"
                                name="vendoraddress"
                                placeholder="Vendor Address"
                                className="form-control"
                              ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>GST Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="gstnumber"
                                placeholder="GST Number"
                                className="form-control"
                              ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>PAN Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="pannumber"
                                placeholder="PAN Number"
                                className="form-control"
                              ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Product</Form.Label>
                              <Select
                                options={product}
                                placeholder="Select Product"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Service Type</Form.Label>
                              <Select
                                options={servicetype}
                               placeholder="Select Type"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Frequency </Form.Label>
                              <Select
                                options={frequency}
                               placeholder="Select frequency"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Contact Person Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="contactpersonname"
                                placeholder="Contact Person Name"
                                className="form-control"
                              ></Form.Control>
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Contact Person Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="contactpersonnumber"
                                placeholder="Contact Person Number"
                                className="form-control"
                            ></Form.Control>
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Contact Value </Form.Label>
                              <Select
                                options={contactvalue}
                               placeholder="Select value"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                        </Row>

                      </Card.Body>
                    </Card>


                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="Contract Period Details" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                  Contract Period Details </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="startdt"
                                placeholder=""
                                className="form-control"
                             ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>End Date</Form.Label>
                              <Form.Control
                                type="date"
                                name="enddt"
                                placeholder=""
                                className="form-control"
                            ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Total period calculation</Form.Label>
                              <Form.Control
                                type="text"
                                name="totalperiodcalculation"
                                className="form-control"
                             ></Form.Control>
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>




                        </Row>

                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="Bank Details" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                  Bank Details </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Bank Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="vendorbankname"
                                placeholder="Bank Name"
                                className="form-control"
                             ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Account Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="vendoraccountnumber"
                                placeholder="Account Number"
                                className="form-control"
                            ></Form.Control>
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Branch Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="vendorbranchname"
                                placeholder='Branch Name'
                                className="form-control"
                             ></Form.Control>
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>IFSC Code</Form.Label>
                              <Form.Control
                                type="text"
                                name="ifsccode"
                                placeholder='IFSC Code'
                                className="form-control"
                             ></Form.Control>
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>




                        </Row>

                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>


              </Accordion>
              </Col>
              <Col xl={12}>
              <span className='float-end mb-5'>
                <Button variant="default ms-3"> Cancel </Button>
                <Button className="btn btn-primary" type="submit">Save </Button>
              </span>
              </Col>


      </Row>

    </Fragment >
  );
}
