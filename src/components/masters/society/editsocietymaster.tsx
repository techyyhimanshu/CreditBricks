
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, CardHeader } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import stateCities from "../stateCity.json"
import { Link, useParams } from "react-router-dom";
// import { Uploader } from 'uploader';
// import { UploadButton } from 'react-uploader';
import { getSocietyDetailsApi, updateSocietyApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
// Define the types for the stateCities object
interface StateCities {
  [key: string]: string[]; // Index signature
}
const stateCitiesTyped: StateCities = stateCities;
export default function EditSocietyMaster() {
  const [currentSociety, setCurrentSociety] = useState({
    societyIdentifier: null,
    societyName: '',
    contactNumber: '',
    email: '',
    societyManager: '',
    address: '',
    country: null,
    state: null,
    pincode: '',
    billingFrequency: null,
    interestCalculationType: null,
    annualRateOfInterest: '',
    interestCalculationStartDate: '',
    city: null,
    registrationNumber: '',
    tanNumber: '',
    panNumber: '',
    signatory: '',
    hsnCode: '',
    gstin: '',
    accountDetails: [{
      bankName: '',
      accountNumber: '',
      branchName: '',
      ifscCode: '',
      chequeFavourable: '',
      paymentQrPath: '',
    }]
  });
  const params = useParams()
  const identifier = params.identifier as string
  useEffect(() => {
    const fetchSocietyDetails = async () => {
      try {
        const response = await getSocietyDetailsApi(identifier)
        setCurrentSociety(response.data.data)
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast('error', errorMessage)
      }
    }
    fetchSocietyDetails()
  }, [])

  const countryOptions: any = [{ value: "India", label: "India" }]
  const calculationtype = [
    { value: "Bill Date", label: "Bill Date" },
    { value: "Due Date", label: "Due Date" },
  ]

  const billingfrequency = [
    { value: "Monthly", label: "Monthly " },
    { value: "Bi-monthly", label: "Bi-monthly " },
    { value: "Quarterly", label: "Quarterly" },
    { value: "Half-Yearly", label: "Half Yearly" },
    { value: "Yearly", label: "Yearly" },
  ]

  const [cityOptions, setCityOptions] = useState<any>([]);

  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));

  const handleStateChange = (selected: { value: string; label: string }) => {
    const cities = stateCitiesTyped[selected.value] || [];
    setCityOptions(cities.map((city) => ({ value: city, label: city })));
  };

  const handleSubmit = (values: any) => {
    const societyDataToUpdate = {
      societyName: values.societyName,
      societyManager: values.societyManager,
      email: values.email,
      contactNumber: values.contactNumber,
      address: values.address,
      country: values.country.value,
      state: values.state.value,
      city: values.city.value,
      pincode: values.pincode,
      interestCalculationType: values.interestCalculationType.value,
      billingFrequency: values.billingFrequency.value,
      annualRateOfInterest: values.annualRateOfInterest,
      interestCalculationStartDate: values.interestCalculationStartDate,
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

      ; (async () => {
        try {
          const response = await updateSocietyApi(societyDataToUpdate, currentSociety.societyIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // window.location.href = "/society/societymaster"
            // Update specific society in the list
            // setSocietyData(prevData =>
            //   prevData.map(society =>
            //     society.societyIdentifier === currentSociety.societyIdentifier
            //       ? { ...society, ...data }
            //       : society
            //   )
            // );
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
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}society/societymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Edit Society Master</span>
        </div>
      </div>

      <Row>
        {currentSociety ? (
          <Formik
            enableReinitialize
            initialValues={{
              societyName: currentSociety?.societyName || "",
              contactNumber: currentSociety?.contactNumber || "",
              email: currentSociety?.email || "",
              societyManager: currentSociety?.societyManager || "",
              address: currentSociety?.address || "",
              country: { value: currentSociety?.country || "", label: currentSociety?.country || "" },
              state: { value: currentSociety?.state || "", label: currentSociety?.state || "" },
              city: { value: currentSociety?.city || "", label: currentSociety?.city || "" },
              pincode: currentSociety?.pincode || "",
              billingFrequency: { value: currentSociety?.billingFrequency || "", label: currentSociety.billingFrequency || "" },
              interestCalculationType: { value: currentSociety?.interestCalculationType || "", label: currentSociety?.interestCalculationType || "" },
              annualRateOfInterest: currentSociety?.annualRateOfInterest || "",
              interestCalculationStartDate: currentSociety?.interestCalculationStartDate?.split('T')[0] || "",
              registrationNumber: currentSociety?.registrationNumber,
              tanNumber: currentSociety?.tanNumber || "",
              panNumber: currentSociety?.panNumber || "",
              signatory: currentSociety?.signatory || "",
              hsnCode: currentSociety?.hsnCode || "",
              gstin: currentSociety?.gstin || "",
              bankName: currentSociety?.accountDetails[0]?.bankName || "",
              accountNumber: currentSociety?.accountDetails[0]?.accountNumber || "",
              branchName: currentSociety?.accountDetails[0]?.branchName || "",
              ifscCode: currentSociety?.accountDetails[0]?.ifscCode || "",
              chequeFavourable: currentSociety?.accountDetails[0]?.chequeFavourable || "",
              paymentQrFile: currentSociety?.accountDetails[0]?.paymentQrPath || "",
              fileName: currentSociety?.accountDetails[0]?.paymentQrPath || "",
            }
            }
            // validationSchema={validationScWhema}
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
                  <Col xl={12}>
                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Basic Details</h5>
                      </CardHeader>
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
                              <ErrorMessage name="societyName" component="div" className="text-danger" />
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Contact Number <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="contactNumber"
                                placeholder="Society number"
                                className="form-control"
                              />
                            </Form.Group>
                          </Col>
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Society Email <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="email"
                                placeholder="Society email"
                                className="form-control"
                              />
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
                          <Col xl={4}>
                            <Form.Group className="form-group">
                              <Form.Label>Pincode <span className="text-danger">*</span></Form.Label>
                              <Field
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                className="form-control"
                              />
                            </Form.Group>
                          </Col>



                        </Row>

                      </Card.Body>
                    </Card>
                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Interest Details</h5>
                      </CardHeader>
                      <Card.Body className='pt-3'>

                        <Row>
                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Interest Calculation Type <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={calculationtype}
                                name="interestCalculationType"
                                value={values.interestCalculationType}
                                placeholder="Select Type"
                                onChange={(selected) => setFieldValue("interestCalculationType", selected)}
                                classNamePrefix="Select2"
                              />
                            </Form.Group>
                          </Col>

                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Annual Rate of Interest </Form.Label>
                              <Field
                                type="text"
                                name="annualRateOfInterest"
                                placeholder="0.00%"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>
                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Interest Calculation Start Date<span className="text-danger">*</span></Form.Label>
                              <Field
                                type="date"
                                name="interestCalculationStartDate"
                                className="form-control"
                              />
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Rate of Interest</Form.Label>
                              <p className='mb-0'>0.0000000000%</p>
                              <em className='tx-12 text-muted'>This field is calculated upon save</em>
                              {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>


                          <Col xl={3}>
                            <Form.Group className="form-group">
                              <Form.Label>Billing Frequency <span className="text-danger">*</span></Form.Label>
                              <Select
                                options={billingfrequency}
                                value={values.billingFrequency}
                                onChange={(selected) => setFieldValue("billingFrequency", selected)}
                                name="billingFrequency"
                                placeholder="Select Billining"
                                classNamePrefix="Select2"
                              />
                              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                            </Form.Group>
                          </Col>

                        </Row>

                      </Card.Body>
                    </Card>

                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Society Document Details</h5>
                      </CardHeader>
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

                    <Card>
                      <CardHeader className='border-bottom'>
                        <h5 className='card-title'>Society Account Details</h5>
                      </CardHeader>
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
                            {values.fileName && (
                              <p
                                className="text-center pt-2"
                                style={{ cursor: "pointer", color: "blue" }}
                                onClick={() => {
                                  const fileExtension = getFileExtension(values.fileName);


                                  if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                    window.open(import.meta.env.VITE_STATIC_PATH + values.fileName, "_blank");
                                  } else {
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

                    <span className='float-end mb-5'>
                      <Button variant="default ms-3"> Cancel </Button>
                      <Button className="btn btn-primary" type="submit">Update </Button>
                    </span>
                  </Col>
                </FormikForm>
              )
            }}
          </Formik>
        ) : (
          <p>Loading society data...</p>
        )}
      </Row>
      <CustomToastContainer />

    </Fragment >
  );
}
