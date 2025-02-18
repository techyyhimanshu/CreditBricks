
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";

export default function AddTenant() {

  const vehicletype = [
    { value: "1", label: "2 Wheeler" },
    { value: "2", label: "4 Wheeler" },
  ]

  const society = [
    { value: "1", label: "Mohan Areca Co-Op Housing Society Limited" },
  ]

  const property = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },
  ]

  const state = [
    { value: "1", label: "Delhi" },
  ]

  const city = [
    { value: "1", label: "Delhi" },
  ]

  const pet = [
    { value: "1", label: "Yes" },
    { value: "2", label: "No" },
  ]

  const country = [
    { value: "1", label: "India" },
  ]

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}tenant/tenant`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Tenant</span>
        </div>
      </div>

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
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Tenant Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Tenant name'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Tenant Number</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Tenant number'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Tenant Email</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Tenant email'></Form.Control>
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Alternative Mobile</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Alternative mobile'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Address'></Form.Control>
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Country</Form.Label>
                    <Select
                      options={country}
                      placeholder="Select country"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>State</Form.Label>
                    <Select
                      options={state}
                      placeholder="Select state"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>City</Form.Label>
                    <Select
                      options={city}
                      placeholder="Select city"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Pincode'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Family Members</Form.Label>
                    <Form.Control type="number" className='form-control' placeholder='ex: 2,3'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Have a Pet?</Form.Label>
                    <Select
                      options={pet}
                      placeholder="Select"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Date Of Birth</Form.Label>
                    <Form.Control type="date" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Aadhar Number</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Aadhar Number'></Form.Control>
                  </Form.Group>
                </Col>




              </Row>

      </Card.Body>
    </Card>


  </Accordion.Body>
</Accordion.Item>

<Accordion.Item eventKey="Tenant Details" className="bg-white  mb-3">
                    <Accordion.Header className="borders">
                    Rent Agreement Details
                    </Accordion.Header>
                    <Accordion.Body className="borders p-0">
                      <Card className='m-0'>

                        <Card.Body className='pt-3'>

                          <Row>
                          <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Rent Registration ID</Form.Label>

                                <Form.Control
                                   type="text"
                                   name="rentRegistrationId"
                                   placeholder="id"
                                   className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                           <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Rent Agreement Start Date</Form.Label>

                                <Form.Control
                                  type="date"
                                  name="rentAgreementStartDate"
                                  placeholder=""
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Rent Agreement End Date</Form.Label>
                                <Form.Control
                                  type="date"
                                  name="rentAgreementEndDate"
                                  placeholder=""
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Monthly Rent</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="monthlyRent"
                                  placeholder="0"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Due Amount</Form.Label>
                                <Form.Control
                                  type="text"
                                  name=""
                                  placeholder="0"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Deposite Amount</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="monthlyRent"
                                  placeholder="0"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Upload Rent Agreement   <small className='text-muted float-end'>Upload Size : Max 2MB</small></Form.Label>
                                <input type="file" className="form-control" name="rentAgreementFile" />
                                {/* <Field
                                  type="text"
                                  name=""
                                  className="form-control"
                                /> */}
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Police Verification Document   <small className='text-muted float-end'>Upload Size : Max 2MB</small></Form.Label>
                                <input type="file" className="form-control" name='policeVerificationDocFile' />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                          </Row>

                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>


 <Accordion.Item eventKey="Add Parent Scoiety" className="bg-white  mb-3">
  <Accordion.Header className="borders">
    Vehicle Details
  </Accordion.Header>
  <Accordion.Body className="borders p-0">
    <Card className='m-0'>

      <Card.Body className='pt-3'>
        <Row>
          <Col xl={4}>
            <Form.Group className="form-group">
              <Form.Label>Vehicle Type </Form.Label>
              <Select
                options={vehicletype}
                placeholder="Select type"
                classNamePrefix="Select2"
              />

            </Form.Group>
          </Col>



          <Col xl={4}>
            <Form.Group className="form-group">
              <Form.Label>Vehicle No.</Form.Label>
              <Form.Control
                type="text"
                name=""
                placeholder="Vehicle number"
                className="form-control"
              />

            </Form.Group>
          </Col>
          <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Vehicle RC Copy  <small className='text-muted float-end'>Upload Size : Max 2MB</small></Form.Label>
                                <input type="file" className="form-control" name="" />
                               </Form.Group>
                            </Col>


          <Col xl={12}>
            <Form.Group className="form-group">
              <Button className="btn btn-primary float-end mb-3" type="button">Add </Button>
            </Form.Group>
          </Col>
        </Row>

        <table className='table'>
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Vehicle Type </th>
              <th>Vehicle No</th>
              <th>Document</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2 Wheeler</td>
              <td>A2B5678</td>
              <td> <img alt="" className='wd-50' src={imagesData('pdficon')}/></td>
             <td><Dropdown >
                <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                  Action
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown></td>
            </tr>
            <tr>
            <td>2</td>
              <td>4 Wheeler</td>
              <td>A2B5678</td>
              <td> <img alt="" className='wd-50' src={imagesData('pdficon')}/></td>
             <td><Dropdown >
                <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                  Action
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown></td>
            </tr>

          </tbody>
        </table>

      </Card.Body>
    </Card>
  </Accordion.Body>
</Accordion.Item>


</Accordion>

<span className='float-end mb-5'>
<Button variant="default ms-3"> Cancel </Button>
<Button className="btn btn-primary" type="submit">Save </Button>
</span>

    </Fragment >
  );
}
