
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, CardHeader, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import stateCities from "../stateCity.json"
import { Link } from "react-router-dom";
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
// Define the types for the stateCities object
interface StateCities {
  [key: string]: string[]; // Index signature
}
const uploader = Uploader({
  // Get production API keys from Upload.io
  apiKey: 'free'
});
const stateCitiesTyped: StateCities = stateCities;
export default function AddMembersMaster() {


  const societyname: any = [{ value: "1", label: "Select Society" }]

  const propertystatus = [{ value: "1", label: "None" },
  { value: "2", label: "Sold" },
  { value: "3", label: "Unsold" },
  { value: "4", label: "Blocked by Management" },
  { value: "5", label: "Refused" },
  { value: "6", label: "Occupied" },

  ]

  const narration = [{ value: "1", label: "None" },
  { value: "2", label: "1BHk" },
  { value: "3", label: "1.5BHK" },
  { value: "4", label: "2BHK" },
  { value: "5", label: "2.5BHK" },
  { value: "6", label: "1RK" },
  { value: "7", label: "3BHk" },
  { value: "8", label: "3.5BHK" },
  { value: "9", label: "4BHK" },
  { value: "10", label: "Shop" },
  { value: "11", label: "Duplex" },
  { value: "12", label: "Villa" },
  { value: "13", label: "Bangalow" },
  { value: "14", label: "Basement" },
  { value: "15", label: "Gala" },
  { value: "16", label: "Garage" },
  { value: "17", label: "Godown" },
  { value: "18", label: "Independent House" },
  { value: "19", label: "Industrial Gala" },
  { value: "20", label: "Office" },
  { value: "21", label: "Stall" },
  ]

  const genderoption = [{ value: "1", label: "None" },
  { value: "2", label: "Male" },
  { value: "3", label: "Female" },
  { value: "4", label: "Trans-Gender" }

  ]

  const tenant = [
    { value: "1", label: "Select Tenant" }
  ]
  const membertype = [{ value: "1", label: "Member" },{ value: "2", label: "Customer/Tenant" }]

  const wing = [{ value: "1", label: "Select Wing" }]



  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}members/membersmaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Member Master</span>
        </div>
      </div>

      <Row>
        <Col xl={12}>

          <Accordion defaultActiveKey="Personal Details">

            <Accordion.Item eventKey="Personal Details" className="bg-white mb-3">
              <Accordion.Header className="borders ">
                Personal Details
              </Accordion.Header>
              <Accordion.Body className="borders p-0">
                <Card className='m-0'>

                  <Card.Body className='pt-3'>

                    <Row>
                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                          <FormControl
                            type="text"
                            name="Fname"
                            placeholder="First name"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Middle Name</Form.Label>
                          <FormControl
                            type="text"
                            name="Mname"
                            placeholder="Middle name"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                          <FormControl
                            type="text"
                            name="Lname"
                            placeholder="Last Name"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Member Type</Form.Label>
                          <Select
                            options={membertype}
                            // value={values.country}
                            // onChange={(selected) => setFieldValue("country", selected)}
                            placeholder="Select Type"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>
                            Mobile Number <span className="text-danger">*</span></Form.Label>
                          <FormControl
                            type="text"
                            name="Mnumber"
                            placeholder="Mobile Number"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>
                            Alternative Mobile Number <span className="text-danger">*</span></Form.Label>
                          <FormControl
                            type="text"
                            name="AlternativeMnumber"
                            placeholder="Alternative Number"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                          <FormControl
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Alternate Email<span className="text-danger">*</span></Form.Label>
                          <FormControl
                            type="email"
                            name="alternativeemail"
                            placeholder="Alternate email address"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Date of Birth<span className="text-danger">*</span></Form.Label>
                          <FormControl
                            type="date"
                            name="dob"
                            placeholder=""
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Gender</Form.Label>
                          <Select
                            options={genderoption}
                            // value={values.country}
                            // onChange={(selected) => setFieldValue("country", selected)}
                            placeholder="Select Gender"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>



                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Age</Form.Label>
                          <FormControl
                            type="text"
                            name="age"
                            placeholder="Age"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Anniversary</Form.Label>
                          <FormControl
                            type="date"
                            name="anniversary"
                            placeholder=""
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Profile Picture</Form.Label>
                          <FormControl
                            type="file"
                            name="profilePicture"
                            placeholder=""
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                    </Row>

                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="Society Details" className="bg-white  mb-3">
              <Accordion.Header className="borders">
              Society Details
              </Accordion.Header>
              <Accordion.Body className="borders p-0">
                <Card className='m-0'>

                  <Card.Body className='pt-3'>

                    <Row>
                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Society Name</Form.Label>
                          <FormControl
                            type="text"
                            name="societyname"
                            placeholder="Society Name"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group">
                          <Form.Label>Property Name</Form.Label>
                          <FormControl
                            type="text"
                            name="propertyname"
                            placeholder="Property Name"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                    </Row>

                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="Owner Details" className="bg-white  mb-3">
              <Accordion.Header className="borders">
                Documentation Details
              </Accordion.Header>
              <Accordion.Body className="borders p-0">
                <Card className='m-0'>

                  <Card.Body className='pt-3'>

                    <Row>
                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Aadhaar No.</Form.Label>
                          <FormControl
                            type="text"
                            name="aadhaarno"
                            placeholder="Aadhaar No."
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Pan No. </Form.Label>
                          <FormControl
                            type="text"
                            name="panno"
                            placeholder="Pan No."
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Passport Number</Form.Label>
                          <FormControl
                            type="text"
                            name="passportnumber"
                            placeholder="Passport Number"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>GSTIN (Member)</Form.Label>
                          <FormControl
                            type="text"
                            name="GSTIN"
                            placeholder="GSTIN (Member)"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>



                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>TAN number</Form.Label>
                          <FormControl
                            type="text"
                            name="tannumber"
                            placeholder="TAN number"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>




                    </Row>

                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>



            <Accordion.Item eventKey="Address Details" className="bg-white  mb-3">
              <Accordion.Header className="borders">
                Address Details
              </Accordion.Header>
              <Accordion.Body className="borders p-0">
                <Card className='m-0'>

                  <Card.Body className='pt-3'>

                    <Row>
                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Alternate Address</Form.Label>
                          <FormControl
                            type="text"
                            name="address"
                            placeholder="Alternate Address"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group">
                          <Form.Label>Alternate Pincode</Form.Label>
                          <FormControl
                            type="text"
                            name="pincode"
                            placeholder="Alternate Pincode"
                            className="form-control"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                    </Row>

                  </Card.Body>
                </Card>
              </Accordion.Body>
            </Accordion.Item>



          </Accordion>


          <span className='float-end mb-5'>
            <Button variant="default ms-3"> Cancel </Button>
            <Button className="btn btn-primary" type="submit">Save </Button>
          </span>
        </Col>
      </Row>

    </Fragment >
  );
}
