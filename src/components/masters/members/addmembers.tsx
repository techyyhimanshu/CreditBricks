
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from 'formik';
import { addUserApi } from '../../../api/user-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
// Define the types for the stateCities object
export default function AddMembersMaster() {
  const [currentMember, setCurrentMember] = useState({
    memberId: null,
    firstName: "",
    middleName: "",
    lastName: "",
    personMobilePhone: "",
    alternatePhone: "",
    personEmail: "",
    alternateEmail: "",
    personBirthdate: "",
    personGenderIdentity: "",
    age: "",
    anniversary: "",
    profilePic: null,
    aadharNo: "",
    panNo: "",
    passportNo: "",
    gstinNo: "",
    tanNumber: "",
    address: "",
    alternateAddress: ""
  })
  const genderoption = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }

  ]


  // const membertype = [{ value: "Member", label: "Member" }, { value: "Tenant", label: "Customer/Tenant" }]
  const handleSubmit = async (values: any) => {
    try {
      const formattedData = {
        "firstName": values.firstName,
        "middleName": values.middleName,
        "lastName": values.lastName,
        "personMobilePhone": values.personMobilePhone,
        "alternatePhone": values.alternatePhone,
        "personEmail": values.personEmail,
        "alternateEmail": values.alternateEmail,
        "personBirthdate": values.personBirthdate,
        "personGenderIdentity": values.personGenderIdentity.value,
        "age": values.age,
        "anniversary": values.anniversary,
        "profilePic": values.profilePic,
        "aadharNo": values.aadharNo,
        "panNo": values.panNo,
        "passportNo": values.passportNo,
        "gstinNo": values.gstinNo,
        "tanNumber": values.tanNumber,
        "address": values.address,
        "alternateAddress": values.alternateAddress

      }
      const response = await addUserApi(formattedData)
      if (response.status === 200) {
        showToast("success", response.data.message)
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}members/membersmaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Member Master</span>
        </div>
      </div>

      <Row>
        <Col xl={12}>
          <Formik
            initialValues={{
              firstName: currentMember?.firstName,
              middleName: currentMember?.middleName,
              lastName: currentMember?.lastName,
              personMobilePhone: currentMember?.personMobilePhone,
              alternatePhone: currentMember?.alternatePhone,
              personEmail: currentMember?.personEmail,
              alternateEmail: currentMember?.alternateEmail,
              personBirthdate: currentMember?.personBirthdate,
              personGenderIdentity: currentMember?.personGenderIdentity,
              age: currentMember?.age,
              anniversary: currentMember?.anniversary,
              profilePic: currentMember?.profilePic,
              aadharNo: currentMember?.aadharNo,
              panNo: currentMember?.panNo,
              passportNo: currentMember?.passportNo,
              gstinNo: currentMember?.gstinNo,
              tanNumber: currentMember?.tanNumber,
              address: currentMember?.address,
              alternateAddress: currentMember?.alternateAddress
            }}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <FormikForm>
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
                                <Field
                                  type="text"
                                  name="firstName"
                                  placeholder="First name"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Middle Name</Form.Label>
                                <Field
                                  type="text"
                                  name="middleName"
                                  placeholder="Middle name"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="text"
                                  name="lastName"
                                  placeholder="Last Name"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            {/* <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Member Type</Form.Label>
                                <Select
                                  options={membertype}
                                  name="role"
                                  onChange={(selected) => setFieldValue("role", selected)}
                                  placeholder="Select Type"
                                  classNamePrefix="Select2"
                                />
                              </Form.Group>
                            </Col> */}

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>
                                  Mobile Number <span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="text"
                                  name="personMobilePhone"
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
                                <Field
                                  type="text"
                                  name="alternatePhone"
                                  placeholder="Alternative Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="email"
                                  name="personEmail"
                                  placeholder="Email address"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Alternate Email<span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="email"
                                  name="alternateEmail"
                                  placeholder="Alternate email address"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Date of Birth<span className="text-danger">*</span></Form.Label>
                                <Field
                                  type="date"
                                  name="personBirthdate"
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
                                  name="personGenderIdentity"
                                  onChange={(selected) => setFieldValue("personGenderIdentity", selected)}
                                  placeholder="Select Gender"
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>



                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Age</Form.Label>
                                <Field
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
                                <Field
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
                                <input type="file" className="form-control" name="profilePic" onChange={(e: any) => setFieldValue("profilePic", e.target.files[0])} />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                          </Row>

                        </Card.Body>
                      </Card>
                    </Accordion.Body>
                  </Accordion.Item>
                  {/* 
                  <Accordion.Item eventKey="Society Details" className="bg-white  mb-3">
                    <Accordion.Header className="borders">
                      Property Details
                    </Accordion.Header>
                    <Accordion.Body className="borders p-0">
                      <Card className='m-0'>

                        <Card.Body className='pt-3'>

                          <Row>
                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>Society Name</Form.Label>
                                <Field
                                  type="text"
                                  name="societyname"
                                  placeholder="Society Name"
                                  className="form-control"
                                />
                               
                              </Form.Group>
                            </Col>

                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>Property Name</Form.Label>
                                <Field
                                  type="text"
                                  name="propertyname"
                                  placeholder="Property Name"
                                  className="form-control"
                                />
                                
                              </Form.Group>
                            </Col>


                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>Wing</Form.Label>
                                <Field
                                  type="text"
                                  name="propertyname"
                                  placeholder="Property Name"
                                  className="form-control"
                                />
                                
                              </Form.Group>
                            </Col>

                            <Col xl={3}>
                              <Form.Group className="form-group">
                                <Form.Label>Flat</Form.Label>
                                <Field
                                  type="text"
                                  name="propertyname"
                                  placeholder="Property Name"
                                  className="form-control"
                                />
                                
                              </Form.Group>
                            </Col>

                            <Col xl={12}>
                              <Button className='btn btn-sm btn-priamry float-end mb-3'>Add</Button>


                              <table className='table'>
                                <thead>
                                  <tr>
                                    <th>S.no.</th>
                                    <th>Society Name </th>
                                    <th>Property Name</th>
                                    <th>Wing</th>
                                    <th>Flat</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>Mohan Areca Co-Op Housing Society Limited</td>
                                    <td>A101</td>
                                    <td>A</td>
                                    <td>101</td>
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
                                    <td>Mohan Areca Co-Op Housing Society Limited</td>
                                    <td>A101</td>
                                    <td>A</td>
                                    <td>101</td>
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
                            </Col>
                          </Row>

        </Card.Body>
      </Card>
    </Accordion.Body>
                  </Accordion.Item > */
                  }

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
                                <Field
                                  type="text"
                                  name="aadharNo"
                                  placeholder="Aadhaar No."
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Pan No. </Form.Label>
                                <Field
                                  type="text"
                                  name="panNo"
                                  placeholder="Pan No."
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Passport Number</Form.Label>
                                <Field
                                  type="text"
                                  name="passportNo"
                                  placeholder="Passport Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>GSTIN (Member)</Form.Label>
                                <Field
                                  type="text"
                                  name="gstinNo"
                                  placeholder="GSTIN (Member)"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>



                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>TAN number</Form.Label>
                                <Field
                                  type="text"
                                  name="tanNumber"
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
                                <Form.Label>Address</Form.Label>
                                <Field
                                  type="text"
                                  name="address"
                                  placeholder="Address"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Alternate Address</Form.Label>
                                <Field
                                  type="text"
                                  name="alternateAddress"
                                  placeholder="Alternate Address"
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



                </Accordion >
                <span className='float-end mb-5'>
                  <Button variant="default ms-3"> Cancel </Button>
                  <Button className="btn btn-primary" type="submit">Save </Button>
                </span>
              </FormikForm >
            )}
          </Formik >
        </Col >
        <CustomToastContainer />

      </Row >

    </Fragment >
  );
}
