
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
// Define the types for the stateCities object
interface StateCities {
  [key: string]: string[]; // Index signature
}
const uploader = Uploader({
  // Get production API keys from Upload.io
  apiKey: 'free'
});
const stateCitiesTyped: StateCities = stateCities;
export default function AddSocietyMaster() {
  const [currentSociety, setCurrentSociety] = useState({
    societyId: null,
    societyName: '',
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
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const countryOptions: any = [{ value: "India", label: "India" }]

  const [cityOptions, setCityOptions] = useState<any>([]);

  const calculationtype = [
    { value: "1", label: "None" },
    { value: "2", label: "Bill" },
    { value: "3", label: "Due" },
  ]
  const society = [
    { value: "1", label: "Society" },
    { value: "2", label: "Association" },
  ]
  const applicationtype = [
    { value: "1", label: "Gate Pass" },
    { value: "2", label: "Flat Resale" },
    { value: "3", label: "Celebration" },

  ]
  const flat = [
    { value: "1", label: "Select Flat " },
  ]

  const wing = [
    { value: "1", label: "Select Wing " },
  ]
  const designation = [
    { value: "1", label: "Secretary " },
    { value: "2", label: "Committe Member " },
  ]

  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));

  const handleStateChange = (selected: { value: string; label: string }) => {
    const cities = stateCitiesTyped[selected.value] || [];
    setCityOptions(cities.map((city) => ({ value: city, label: city })));
  };
  const handleSubmit = (values: any) => {
    console.log(values)
    const societyDataToCreate = {
      societyName: values.societyName,
      societyManager: values.societyManager,
      address: values.address,
      country: values.country.value,
      state: values.state.value,
      city: values.city.value,
      registrationNumber: values.registrationNumber,
      tanNumber: values.tanNumber,
      panNumber: values.panNumber,
      signatory: values.signatory,
      hsnCode: values.hsnCode,
      gstin: values.gstin,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      branchName: values.branchName,
      ifscCode: values.ifscCode,
      chequeFavourable: values.chequeFavourable,
      paymentQrFile: values.paymentQrFile
    }

      // Call API to add new society
      ; (async () => {
        try {
          const response = await addSocietyApi(societyDataToCreate)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Add the new society to the table
            const newSociety = {
              sno: societyData.length + 1,
              id: response.data.data.societyId,
              ...response.data.data
            }
            window.location.href = "/society/societymaster"
            // setSocietyData(prevData => [...prevData, newSociety]);
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error);
          showToast("error", errorMessage);
        }
      })()



  }
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}society/societymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Society Master</span>
        </div>
      </div>

      <Row>
        <Formik
          initialValues={{
            societyName: currentSociety?.societyName || "",
            societyManager: currentSociety?.societyManager || "",
            address: currentSociety?.address || "",

            country: { value: currentSociety.country, label: currentSociety.country },

            state: { value: currentSociety.state, label: currentSociety.state },

            city: { value: currentSociety.city, label: currentSociety.city },

            registrationNumber: currentSociety?.registrationNumber,
            tanNumber: currentSociety?.tanNumber,
            panNumber: currentSociety?.panNumber,
            signatory: currentSociety?.signatory,
            hsnCode: currentSociety?.hsnCode,
            gstin: currentSociety?.gstin,
            bankName: currentSociety?.bankName,
            accountNumber: currentSociety?.accountNumber,
            branchName: currentSociety?.branchName,
            ifscCode: currentSociety?.ifscCode,
            chequeFavourable: currentSociety?.chequeFavourable,
            paymentQrFile: currentSociety?.paymentQrFile
          }
          }
          // validationSchema={validationScWhema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <FormikForm className='col-sm-12'>
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
                              <Form.Label>Society Name <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="societyName"
                                placeholder="Society name"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Contact Number <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="societyName"
                                placeholder="Society number"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Email <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="societyName"
                                placeholder="Society email"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Manager <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="societyManager"
                                placeholder="Society Manager"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={countryOptions}
                                value={values.country}
                                onChange={(selected) => setFieldValue("country", selected)}
                                placeholder="Select Country"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>State <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={stateOptions}
                                value={values.state}
                                onChange={(selected: any) => {
                                  setFieldValue('state', selected);
                                  handleStateChange({
                                    value: selected.value,
                                    label: selected.label
                                  });
                                }}
                                placeholder="Select State"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>City <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={cityOptions}
                                value={values.city}
                                onChange={(selected) => setFieldValue("city", selected)}
                                placeholder="Select City"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          {/* <Col xl={4}>
                            <Form.Group className="form-group pt-2">

                             <Link to={`${import.meta.env.BASE_URL}society/addparentsociety`} className='btn btn-primary mt-4'>Add Parent</Link>
                            </Form.Group>
                          </Col> */}


                        </Row>

                      </Card.Body>
                    </Card>


                  </Accordion.Body>
                </Accordion.Item>

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

                <Accordion.Item eventKey="Society Document Details" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                    Society Document Details
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>

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






                        </Row>

                      </Card.Body>
                    </Card>
                  </Accordion.Body>
                </Accordion.Item>



                <Accordion.Item eventKey="Society Account Details" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                    Society Account Details
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>
                        <Row>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Bank Name</Form.Label>
                              <Field
                                type="text"
                                name="bankName"
                                placeholder="Bank name"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Account Number </Form.Label>
                              <Field
                                type="text"
                                name="accountNumber"
                                placeholder="Account number"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Branch Name</Form.Label>
                              <Field
                                type="text"
                                name="branchName"
                                placeholder="Branch name"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>IFSC Code</Form.Label>
                              <Field
                                type="text"
                                name="ifscCode"
                                placeholder="IFSC code"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>



                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Cheque Favourable </Form.Label>
                              <Field
                                type="text"
                                name="chequeFavourable"
                                placeholder="Cheque favourable"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Payment QR Code</Form.Label>
                              <input
                                type="file"
                                className="form-control"
                                accept="application/pdf"
                                name="paymentQrFile"
                                onChange={(e: any) => setFieldValue("paymentQrFile", e.target.files[0])}
                              />
                              {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <div className="checkbox">
                                <div className="custom-checkbox custom-control">
                                  <Form.Control
                                    type="checkbox"
                                    data-checkboxes="mygroup"
                                    className="custom-control-input"
                                    id="checkbox-2"
                                  />
                                  <Form.Label
                                    htmlFor="checkbox-2"
                                    className="custom-control-label mt-1"
                                  >
                                    Is Preferred Bank
                                  </Form.Label>

                                </div>

                              </div>
                            </Form.Group>
                          </Col>

                          <Col xl={4}></Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Button className="btn btn-primary float-end btn-sm" type="button">Add </Button>
                            </Form.Group>
                          </Col>


                        </Row>

                        <table className='table'>
                          <thead>
                            <tr>
                              <th>S.no.</th>
                              <th>Preferred </th>
                              <th>Bank Name</th>
                              <th>Account Number</th>
                              <th>Branch Name</th>
                              <th>IFSC Code</th>
                              <th>Cheque Favourable</th>
                              <th>Payment QR</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td className='text-center'><i className='bi bi-check-circle text-success tx-20'></i></td>
                              <td>Union Bank of India</td>
                              <td>UBIN0826812</td>
                              <td>268112010001018</td>
                              <td>Mohan Areca Co Op HSG Soc Ltd</td>
                              <td>Badlapur</td>
                              <td><i className='bi bi-image text-info'></i></td>
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
                              <td className='text-center'></td>
                              <td>Union Bank of India</td>
                              <td>UBIN0826812</td>
                              <td>268112010001018</td>
                              <td>Mohan Areca Co Op HSG Soc Ltd</td>
                              <td>Badlapur</td>
                              <td><i className='bi bi-image text-info'></i></td>
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

                {/* <Accordion.Item eventKey="Add Parent Scoiety" className="bg-white  mb-3">
                  <Accordion.Header className="borders">
                    List of Committee Members
                  </Accordion.Header>
                  <Accordion.Body className="borders p-0">
                    <Card className='m-0'>

                      <Card.Body className='pt-3'>
                        <Row>
                          <Col xl={2}>
                            <Form.Group className="form-group">
                              <Form.Label>Flat </Form.Label>
                              <Select
                                options={flat}
                                placeholder="Select Flat"
                                classNamePrefix="Select2"
                              />
                              
                            </Form.Group>
                          </Col>

                          <Col xl={2}>
                            <Form.Group className="form-group">
                              <Form.Label>Wing </Form.Label>
                              <Select
                                options={wing}
                                placeholder="Select Wing"
                                classNamePrefix="Select2"
                              />
                             
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Approver Name</Form.Label>
                              <Field
                                type="text"
                                name="approverName"
                                placeholder="Approver Name"
                                className="form-control"
                              />
                             
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Application Type </Form.Label>
                              <Select
                                options={applicationtype}
                                placeholder="Select Type"
                                classNamePrefix="Select2"
                              />
                              
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society </Form.Label>
                              <Select
                                options={society}
                                placeholder="Select Society"
                                classNamePrefix="Select2"
                              />
                             
                            </Form.Group>
                          </Col>

                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Designation </Form.Label>
                              <Select
                                options={designation}
                                placeholder="Select Designation"
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>





                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Contact Details</Form.Label>
                              <Field
                                type="text"
                                name="contactdetails"
                                placeholder="Contact Details"
                                className="form-control"
                              />
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
                              <th>Flat </th>
                              <th>Wing</th>
                              <th>Approver Name</th>
                              <th>Society</th>
                              <th>Application Type</th>
                              <th>Designation</th>
                              <th>Contact Details</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>19</td>
                              <td>A</td>
                              <td>Sandeep Singh</td>
                              <td>Society</td>
                              <td>Flat Resale</td>
                              <td>Secretary</td>
                              <td>-</td>
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
                              <td>19</td>
                              <td>A</td>
                              <td>Sandeep Singh</td>
                              <td>Association</td>
                              <td>Gate Pass</td>
                              <td>Secretary</td>
                              <td>-</td>
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
                */}

              </Accordion>

              <span className='float-end mb-5'>
                <Button variant="default ms-3"> Cancel </Button>
                <Button className="btn btn-primary" type="submit">Save </Button>
              </span>

            </FormikForm>
          )}
        </Formik>
      </Row>
      <CustomToastContainer />

    </Fragment >
  );
}
