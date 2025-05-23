
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Card, Row, Accordion, Button, Form } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link, useParams } from "react-router-dom";
import { getVendorDetail, updateVendorApi } from '../../../api/vendor-api';
import { showToast, CustomToastContainer } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
import * as Yup from 'yup';

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

const selectFieldValidation = (fieldLabel: string) =>
  Yup.object()
    .nullable()
    .test(fieldLabel, `${fieldLabel} is required`, function (val: any) {

      if (!val || typeof val !== 'object') return false;

      if (typeof val.value === 'undefined' || val.value === null || val.value === '') return false;

      return true;
    });

const vendorValidationSchema = Yup.object().shape({
  vendorName: Yup.string().required('Vendor name is required'),
  vendorAddress: Yup.string().required('Vendor address is required'),

  // gstin: Yup.string()
  //   .required('GSTIN is required')
  //   .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/, 'Invalid GSTIN format'),

  aadharNumber: Yup.string()
    .required('Aadhar number is required')
    .matches(/^\d{12}$/, 'Aadhar number must be 12 digits'),

  pan: Yup.string()
    .required('PAN is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN must be in uppercase and valid format'),

  product: selectFieldValidation('Product'),
  serviceType: selectFieldValidation('Service Type'),
  frequency: selectFieldValidation('Frequency'),

  contactPersonName: Yup.string().required('Contact person name is required'),

  contactPersonNumber: Yup.string()
    .required('Contact person number is required')
    .matches(/^\d{10}$/, 'Contact number must be 10 digits'),

  contactValue: selectFieldValidation('Contact Value'),

  contractStartDate: Yup.string().required('Contract start date is required'),

  bankName: Yup.string().required('Bank name is required'),

  accountNumber: Yup.string()
    .required('Account number is required')
    .matches(/^\d+$/, 'Account number must be numeric'),

  branchName: Yup.string().required('Branch name is required'),

  ifsc: Yup.string()
    .required('IFSC code is required')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
});

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
                    vendorAddress: currentVendor?.vendorAddress || '',
                    gstin: currentVendor?.gstin || '',
                    pan: currentVendor?.pan || '',
                    aadharNumber: currentVendor?.aadharNumber || '',
                    product: { value: currentVendor?.product || "", label: currentVendor?.product || "" },
                    serviceType: { value: currentVendor?.serviceType || "", label: currentVendor?.serviceType || "" },
                    frequency: { value: currentVendor?.frequency || "", label: currentVendor?.frequency || "" },
                    contactPersonName: currentVendor?.contactPersonName || '',
                    contactPersonNumber: currentVendor?.contactPersonNumber || '',
                    contactValue: { value: currentVendor?.contactValue || "", label: currentVendor?.contactValue || "" },
                    contractStartDate: currentVendor?.contractStartDate || '',
                    contractEndDate: currentVendor?.contractEndDate || '',
                    totalPeriodCalculation: currentVendor?.totalPeriodCalculation || '',
                    bankName: currentVendor?.bankName || "",
                    accountNumber: currentVendor?.accountNumber || "",
                    branchName: currentVendor?.branchName || "",
                    ifsc: currentVendor?.ifsc || "",
                }}
                onSubmit={handleSubmit}
                validationSchema={vendorValidationSchema}
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
                                                                <ErrorMessage name="vendorName" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Vendor Address <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    value={values.vendorAddress}
                                                                    name="vendorAddress"
                                                                    placeholder="Vendor Address"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="vendorAddress" component="div" className="text-danger" />
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
                                                                <ErrorMessage name="gstin" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>PAN Number <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="pan"
                                                                    placeholder="PAN Number"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="pan" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>
                                
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Aadhaar No. <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="aadharNumber"
                                                                    placeholder="Aadhaar No."
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="aadharNumber" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>


                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Product <span className="text-danger">*</span></Form.Label>
                                                                <Select
                                                                    options={product}
                                                                    value={values.product}
                                                                    placeholder="Select Product"
                                                                    onChange={(selected) => setFieldValue("product", selected)}
                                                                    classNamePrefix="Select2"
                                                                    name='product'
                                                                />
                                                                <ErrorMessage name="product" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>



                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Service Type <span className="text-danger">*</span></Form.Label>
                                                                <Select
                                                                    options={servicetype}
                                                                    value={values.serviceType}
                                                                    placeholder="Select Type"
                                                                    onChange={(selected) => setFieldValue("serviceType", selected)}
                                                                    classNamePrefix="Select2"
                                                                    name='serviceType'
                                                                />
                                                                <ErrorMessage name="serviceType" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>


                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Frequency <span className="text-danger">*</span></Form.Label>
                                                                <Select
                                                                    options={frequency}
                                                                    value={values.frequency}
                                                                    placeholder="Select frequency"
                                                                    onChange={(selected) => setFieldValue("frequency", selected)}
                                                                    classNamePrefix="Select2"
                                                                    name='frequency'
                                                                />
                                                                <ErrorMessage name="frequency" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Contact Person Name <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="contactPersonName"
                                                                    placeholder="Contact Person Name"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="contactPersonName" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Contact Person Number <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="contactPersonNumber"
                                                                    placeholder="Contact Person Number"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="contactPersonNumber" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Contact Value <span className="text-danger">*</span></Form.Label>
                                                                <Select
                                                                    options={contactvalue}
                                                                    placeholder="Select value"
                                                                    value={values.contactValue}
                                                                    onChange={(selected) => setFieldValue("contactValue", selected)}
                                                                    classNamePrefix="Select2"
                                                                    name='contactValue'
                                                                />
                                                                <ErrorMessage name="contactValue" component="div" className="text-danger" />
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
                                                                <Form.Label>Start Date <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="date"
                                                                    name="contractStartDate"
                                                                    placeholder=""
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="contractStartDate" component="div" className="text-danger" />
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
                                                                <ErrorMessage name="contractEndDate" component="div" className="text-danger" />
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
                                                                <ErrorMessage name="totalPeriodCalculation" component="div" className="text-danger" />
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
                                                                <Form.Label>Bank Name <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="bankName"
                                                                    placeholder="Bank Name"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="bankName" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Account Number <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="accountNumber"
                                                                    placeholder="Account Number"
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="accountNumber" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Branch Name <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="branchName"
                                                                    placeholder='Branch Name'
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="branchName" component="div" className="text-danger" />
                                                            </Form.Group>
                                                        </Col>


                                                        <Col xl={4}>
                                                            <Form.Group className="form-group">
                                                                <Form.Label>IFSC Code <span className="text-danger">*</span></Form.Label>
                                                                <Field
                                                                    type="text"
                                                                    name="ifsc"
                                                                    placeholder='IFSC Code'
                                                                    className="form-control"
                                                                />
                                                                <ErrorMessage name="ifsc" component="div" className="text-danger" />
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
