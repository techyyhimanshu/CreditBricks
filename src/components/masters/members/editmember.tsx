
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
// import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link, useParams } from "react-router-dom";
import { Field, Formik, Form as FormikForm } from 'formik';
import { handleApiError } from '../../../helpers/handle-api-error';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
import { getMemberDetailApi, updateMemberApi } from '../../../api/member-api';
// Define the types for the stateCities object
export default function EditMemberMaster() {
    const [currentMember, setCurrentMember] = useState<any>(null)

    const params = useParams()
    const identifier = params.identifier as string
    const genderoption = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }

    ]

    useEffect(() => {
        const fetchMemberDetails = async () => {
            try {
                const response = await getMemberDetailApi(identifier)
                setCurrentMember(response.data.data)
            } catch (error: any) {
                const errorMessage = handleApiError(error)
                showToast('error', errorMessage)
            }
        }
        fetchMemberDetails()
    }, [])


    const handleSubmit = async (values: any) => {
        try {
            const formattedData:any = {
                "firstName": values.firstName,
                "middleName": values.middleName,
                "lastName": values.lastName,
                "mobileNumber": values.mobileNumber,
                "alternatePhone": values.alternatePhone,
                "email": values.email,
                "alternateEmail": values.alternateEmail,
                "dateOfBirth": values.dateOfBirth,
                "gender": values.gender.value,
                "age": values.age,
                "anniversary": values.anniversary,
                "aadharNumber": values.aadharNumber,
                "panNo": values.panNo,
                "passportNo": values.passportNo,
                "gstinNo": values.gstinNo,
                "tanNumber": values.tanNumber,
                "address": values.address,
                "alternateAddress": values.alternateAddress

            }
            if(values.profilePic){
                formattedData.profilePic=values.profilePic
            }
            const response = await updateMemberApi(formattedData, identifier)
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
                    <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}members/membersmaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Edit Member Master</span>
                </div>
            </div>

            <Row>
                <Col xl={12}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            firstName: currentMember?.firstName || "",
                            middleName: currentMember?.middleName || "",
                            lastName: currentMember?.lastName || "",
                            mobileNumber: currentMember?.mobileNumber || "",
                            alternatePhone: currentMember?.alternatePhone || "",
                            email: currentMember?.email || "",
                            alternateEmail: currentMember?.alternateEmail || "",
                            dateOfBirth: currentMember?.dateOfBirth || "",
                            gender: { label: currentMember?.gender || "", value: currentMember?.gender || "" },
                            age: currentMember?.age || "",
                            anniversary: currentMember?.anniversary || "",
                            profilePic: currentMember?.profilePic || "",
                            fileName: currentMember?.profilePicPath || null,
                            aadharNumber: currentMember?.aadharNumber || "",
                            panNo: currentMember?.panNo || "",
                            passportNo: currentMember?.passportNo || "",
                            gstinNo: currentMember?.gstinNo || "",
                            tanNumber: currentMember?.tanNumber || "",
                            address: currentMember?.address || "",
                            alternateAddress: currentMember?.alternateAddress || ""
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values }) => {
                            const getFileExtension = (fileName: string) => {
                                if (!fileName) {
                                    return '';
                                }
                                return fileName.split(".").pop()?.toLowerCase() || '';
                            };
                            const getFileName = (fileName: string) => {
                                if (!fileName) {
                                    return '';
                                }
                                return fileName?.split("/").pop() || '';
                            };
                            return (
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
                                                                        value={values.firstName}
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
                                                                        value={values.middleName}
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
                                                                        value={values.lastName}
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
                                                                        name="mobileNumber"
                                                                        value={values.mobileNumber}
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
                                                                        value={values.alternatePhone}
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
                                                                        name="email"
                                                                        value={values.email}
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
                                                                        value={values.alternateEmail}
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
                                                                        name="dateOfBirth"
                                                                        value={values.dateOfBirth}
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
                                                                        name="gender"
                                                                        value={values.gender}
                                                                        onChange={(selected) => setFieldValue("gender", selected)}
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
                                                                        value={values.age}
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
                                                                        value={values.anniversary}
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
                                                                {values.fileName && (
                                                                    <p
                                                                        className="text-center pt-2"
                                                                        style={{ cursor: "pointer", color: "blue" }}
                                                                        onClick={() => {
                                                                            const fileExtension = getFileExtension(values.fileName);


                                                                            // If it's a PDF, image, or Excel file, open in new tab
                                                                            if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                                window.open(import.meta.env.VITE_STATIC_PATH + values.fileName, "_blank");
                                                                            } else {
                                                                                // For other files, trigger download
                                                                                const link = document.createElement("a");
                                                                                link.href = import.meta.env.VITE_STATIC_PATH + values.fileName;
                                                                                link.download = values.fileName;
                                                                                link.click();
                                                                            }
                                                                        }}
                                                                    >
                                                                        {getFileName(values.fileName)}
                                                                    </p>
                                                                )}
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
                                                                        name="aadharNumber"
                                                                        placeholder="Aadhaar No."
                                                                        className="form-control"
                                                                        value={values.aadharNumber}
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
                                                                        value={values.panNo}
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
                                                                        value={values.passportNo}
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
                            )
                        }}
                    </Formik >
                </Col >
                <CustomToastContainer />

            </Row >

        </Fragment >
    );
}
