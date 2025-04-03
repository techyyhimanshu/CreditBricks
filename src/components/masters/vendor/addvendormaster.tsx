
import { Fragment } from 'react';
// import { Link } from "react-router-dom";
import { Col, Card, Row, Accordion, Button, Form } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm } from 'formik';
import { Link } from "react-router-dom";
import { addNewVendorApi } from '../../../api/vendor-api';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';

const product = [
  { value: "Lift", label: "Lift" },
  { value: "Pest Control", label: "Pest Control" },
  { value: "Electrician", label: "Electrician" },
  { value: "Waterman", label: "Waterman" },
  { value: "Security", label: "Security" },
  { value: "Housekeeping", label: "Housekeeping " },
]

const servicetype = [
  { value: "AMC", label: "AMC" },
  { value: "On Request", label: "On Request" },
]

const frequency = [
  { value: "Monthy", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Half Yearly", label: "Half Yearly" },
  { value: "Yearly", label: "Yearly " },
]

const contactvalue = [
  { value: "Basic", label: "Basic" },
  { value: "GST", label: "GST" },
]

export default function AddVendorMaster() {

  const handleSubmit = async (values: any) => {
    try {
      const formattedData = {
        vendorName: values.vendorName,
        vendorAddress: values.vendorAddress,
        gstin: values.gstin,
        pan: values.pan,
        aadharNumber: values.aadharNumber,
        product: values.product.value,
        serviceType: values.serviceType.value,
        frequency: values.frequency.value,
        contactPersonNumber: values.contactPersonNumber,
        contactPersonName: values.contactPersonName,
        contactValue: values.contactValue.value,
        contractStartDate: values.contractStartDate,
        contractEndDate: values.contractEndDate,
        totalPeriodCalculation: values.totalPeriodCalculation,
        bankName: values.bankName,
        accountNumber: values.accountNumber,
        ifsc: values.ifsc,
        branchName: values.branchName
      }
      const response = await addNewVendorApi(formattedData)
      if (response.status === 200) {
        showToast("success", "Vendor created successfully")
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
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}vendor/vendormaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Vendor Master</span>
        </div>
      </div>


      <Formik
        initialValues={{
          vendorName: '',
          vendorAddress: '',
          gstin: '',
          aadharNumber: "",
          pan: '',
          product: { value: "", label: "" },
          serviceType: { value: "", label: "" },
          frequency: { value: "", label: "" },
          contactPersonName: '',
          contactPersonNumber: '',
          contactValue: { value: "", label: "" },
          contractStartDate: '',
          contractEndDate: '',
          totalPeriodCalculation: '',
          bankName: "",
          accountNumber: "",
          branchName: "",
          ifsc: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <FormikForm>
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
                                <Field
                                  type="text"
                                  name="vendorName"
                                  placeholder="Vendor name"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Vendor Address</Form.Label>
                                <Field
                                  type="text"
                                  name="vendorAddress"
                                  placeholder="Vendor Address"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>GST Number</Form.Label>
                                <Field
                                  type="text"
                                  name="gstin"
                                  placeholder="GST Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Aadhaar No.</Form.Label>
                                <Field
                                  type="text"
                                  name="aadharNumber"
                                  placeholder="Aadhaar No."
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>PAN Number</Form.Label>
                                <Field
                                  type="text"
                                  name="pan"
                                  placeholder="PAN Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>


                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Product</Form.Label>
                                <Select
                                  options={product}
                                  placeholder="Select Product"
                                  onChange={(selected) => setFieldValue("product", selected)}
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
                                  onChange={(selected) => setFieldValue("serviceType", selected)}
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
                                  onChange={(selected) => setFieldValue("frequency", selected)}
                                  classNamePrefix="Select2"
                                />
                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Contact Person Name</Form.Label>
                                <Field
                                  type="text"
                                  name="contactPersonName"
                                  placeholder="Contact Person Name"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Contact Person Number</Form.Label>
                                <Field
                                  type="text"
                                  name="contactPersonNumber"
                                  placeholder="Contact Person Number"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>
                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Contact Value </Form.Label>
                                <Select
                                  options={contactvalue}
                                  placeholder="Select value"
                                  onChange={(selected) => setFieldValue("contactValue", selected)}
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
                                <Field
                                  type="date"
                                  name="contractStartDate"
                                  placeholder=""
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>End Date</Form.Label>
                                <Field
                                  type="date"
                                  name="contractEndDate"
                                  placeholder=""
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Total period calculation</Form.Label>
                                <Field
                                  type="text"
                                  name="totalPeriodCalculation"
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
                                <Field
                                  type="text"
                                  name="bankName"
                                  placeholder="Bank Name"
                                  className="form-control"
                                />
                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                              </Form.Group>
                            </Col>

                            <Col xl={4}>
                              <Form.Group className="form-group">
                                <Form.Label>Account Number</Form.Label>
                                <Field
                                  type="text"
                                  name="accountNumber"
                                  placeholder="Account Number"
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
                                  placeholder='Branch Name'
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
                                  name="ifsc"
                                  placeholder='IFSC Code'
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


                </Accordion>
              </Col>
              <Col xl={12}>
                <span className='float-end mb-5'>
                  <Button variant="default ms-3"> Cancel </Button>
                  <Button className="btn btn-primary" type="submit">Save </Button>
                </span>
              </Col>
            </Row>

          </FormikForm>
        )}
      </Formik>
      <CustomToastContainer />
    </Fragment >
  );
}
