
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Card, Row, Accordion, Button, Form } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm } from 'formik';
import { Link, useParams } from "react-router-dom";
import { getVendorDetail, updateVendorApi } from '../../../api/vendor-api';
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

export default function EditVendorMaster() {
    const [currentVendor, setCurrentVendor] = useState<any>()
    const params = useParams()
    const identifier = params.identifier as string

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const response = await getVendorDetail(identifier)
                setCurrentVendor(response.data.data)
            } catch (error: any) {
                const errorMessage = handleApiError(error)
                showToast('error', errorMessage)
            }
        }
        fetchVendorDetails()
    }, [])

    const handleSubmit = async (values: any) => {
        try {
            const formattedData = {
                vendorName: values.vendorName,
                vendorAddress: values.vendorAddress,
                gstin: values.gstin,
                pan: values.pan,
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
            const response = await updateVendorApi(formattedData, identifier)
            if (response.status === 200) {
                showToast("success", "Vendor updated successfully")
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
                    <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}vendor/vendormaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Edit Vendor Master</span>
                </div>
            </div>


            <Formik
                enableReinitialize
                initialValues={{
                    vendorName: currentVendor?.vendorName || '',
                    vendorAddress: currentVendor?.vendorAddress ||'',
                    gstin: currentVendor?.gstin ||'',
                    pan: currentVendor?.pan ||'',
                    product: { value: currentVendor?.product||"", label: currentVendor?.product||"" },
                    serviceType: { value: currentVendor?.serviceType||"", label: currentVendor?.serviceType||"" },
                    frequency: { value: currentVendor?.frequency||"", label: currentVendor?.frequency||"" },
                    contactPersonName: currentVendor?.contactPersonName ||'',
                    contactPersonNumber: currentVendor?.contactPersonNumber ||'',
                    contactValue: { value: currentVendor?.contactValue||"", label: currentVendor?.contactValue||"" },
                    contractStartDate: currentVendor?.contractStartDate ||'',
                    contractEndDate: currentVendor?.contractEndDate ||'',
                    totalPeriodCalculation: currentVendor?.totalPeriodCalculation ||'',
                    bankName: currentVendor?.bankName ||"",
                    accountNumber: currentVendor?.accountNumber ||"",
                    branchName: currentVendor?.branchName ||"",
                    ifsc: currentVendor?.ifsc ||"",
                }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
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
                                                                    value={values.vendorName}
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
                                                                    value={values.vendorAddress}
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
                                                                    value={values.product}
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
                                                                    value={values.serviceType}
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
                                                                    value={values.frequency}
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
                                                                    value={values.contactValue}
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
