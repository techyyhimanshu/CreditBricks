
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, CardHeader, FormControl } from "react-bootstrap";
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
                      </Col>






                    </Row>

                  </Card.Body>
                </Card>

                <span className='float-end mb-5'>
                  <Button variant="default ms-3"> Cancel </Button>
                  <Button className="btn btn-primary" type="submit">Save </Button>
                </span>
              </Col>
            </FormikForm>
          )}
        </Formik>
      </Row>
      <CustomToastContainer />

    </Fragment >
  );
}
