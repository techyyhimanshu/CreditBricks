
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Form, Dropdown, Tabs, Tab, FormLabel, FormCheck, Button, Modal, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";

export default function VendorView() {


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}vendor/vendormaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Vendor View</span>
        </div>
      </div>
      <Row>
                      <Col xl={8}>
                        <Card>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Basic Details</h5>
                            <Row>
                              <Col xl={6}>
                                <FormLabel>Vendor Name</FormLabel>
                                <p className='tx-15'>Himanshu Bansal</p>
                              </Col>


                              <Col xl={6}>
                                <FormLabel>Vendor Address</FormLabel>
                                <p className='tx-15'>B24, Sector 22, Noida </p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>GST Number</FormLabel>
                                <p className='tx-15'>-</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>PAN Number</FormLabel>
                                <p className='tx-15'>-</p>
                              </Col>


                              <Col xl={6}>
                                <FormLabel>Product</FormLabel>
                                <p className='tx-15'>Lift</p>
                              </Col>



                              <Col xl={6}>
                                <FormLabel>Service Type</FormLabel>
                                <p className='tx-15 col-sm-11 p-0'>AMC</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Frequency</FormLabel>
                                <p className='tx-1 p-0'>Quarterly</p>
                              </Col>
<hr className='w-100'/>
                              <Col xl={6}>
                                <FormLabel>Contact Person Name</FormLabel>
                                <p className='tx-15'>-</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Contact Person Number</FormLabel>
                                <p className='tx-15'>-</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Contact Value:</FormLabel>
                                <p className='tx-15'>Basic</p>
                              </Col>


                            </Row>
                          </Card.Body>
                        </Card>


                      </Col>
                      <Col xl={4} className='p-0 pe-3'>


                        <Card>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Contract Period Details</h5>
                            <Row>
                               <Col xl={5} className='mb-1 tx-12'>Start Date</Col>
                              <Col xl={7} className='tx-semibold tx-12'>12/12/2024</Col>
                              <Col xl={5} className='mb-1 tx-12'>End Date</Col>
                              <Col xl={7} className='tx-semibold tx-12'>12/12/205</Col>
                              <Col xl={5} className='mb-1 tx-12'>Total Period Calculation</Col>
                              <Col xl={7} className='tx-semibold tx-12'>-</Col>
                              <Col xl={12} className='mb-1 tx-12'>Contact Terms & Conditions
                              </Col>
                              <Col xl={12} className='tx-semibold tx-12'>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and [business entity name] (“we,” “us” or “our”), concerning your access to and use of the [website name.com] website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).</Col>

                            </Row>
                          </Card.Body>
                        </Card>



                        <Card>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Bank Details Details</h5>
                            <Row>

                              <Col xl={5} className='mb-1 tx-12'>Society Bank Name</Col>
                              <Col xl={7} className='tx-semibold tx-12'>Union Bank of India</Col>
                              <Col xl={5} className='mb-1 tx-12'>Account Number</Col>
                              <Col xl={7} className='tx-semibold tx-12'>532463874983753975</Col>
                              <Col xl={5} className='mb-1 tx-12'>Branch Name</Col>
                              <Col xl={7} className='tx-semibold tx-12'>-</Col>
                              <Col xl={5} className='mb-1 tx-12 '>IFSC Code</Col>
                              <Col xl={7} className='tx-semibold tx-12'>UBIN0826812</Col>

                            </Row>
                          </Card.Body>
                        </Card>



                      </Col>
                    </Row>



    </Fragment >
  );
}
