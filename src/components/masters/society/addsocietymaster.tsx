
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, CardHeader, FormControl } from "react-bootstrap";
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
export default function AddSocietyMaster() {


  const countryOptions: any = [{ value: "India", label: "India" }]

  const societymanager = [{ value: "1", label: "Select Manager" }]

  const [cityOptions, setCityOptions] = useState<any>([]);

  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}society/societymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Society Master</span>
        </div>
      </div>

      <Row>
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
                    <FormControl
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
                    <Select
                      options={societymanager}
                      placeholder="Select Manger"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                    <FormControl
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
                      // value={values.country}
                      // onChange={(selected) => setFieldValue("country", selected)}
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
                      // value={values.state}
                      // onChange={(selected: any) => {
                      //   setFieldValue('state', selected);
                      //   handleStateChange({
                      //     value: selected.value,
                      //     label: selected.label
                      //   });
                      // }}
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
                        // value={values.city}
                        // onChange={(selected) => setFieldValue("city", selected)}
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
                    <FormControl
                      type="text"
                      name="societyregitrationnumber"
                      value={'TNA/AMB/HSG/(TC)/35606/2022-23'}
                      placeholder="Registration number"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>TAN number </Form.Label>
                    <FormControl
                      type="text"
                      name="societyTan"
                      placeholder="TAN number"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>PAN No</Form.Label>
                    <FormControl
                      type="text"
                      name="societyPAN"
                      placeholder="PAN number"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Signatory <span className="text-danger">*</span></Form.Label>
                    <FormControl
                      type="text"
                      name="societySignatory"
                      placeholder="Signatory"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>



                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>HSN Code </Form.Label>
                    <FormControl
                      type="text"
                      name="societyHSN"
                      placeholder="HSN code"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                <Form.Group className="form-group">
                      <Form.Label>GSTIN</Form.Label>
                      <FormControl
                      type="text"
                      name="societyGSTIN"
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
                    <FormControl
                      type="text"
                      name="societybankname"
                      placeholder="Bank name"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Account Number </Form.Label>
                    <FormControl
                      type="text"
                      name="societyaccountnumber"
                      placeholder="Account number"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Branch Name</Form.Label>
                    <FormControl
                      type="text"
                      name="branchname"
                      placeholder="Branch name"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>IFSC Code</Form.Label>
                    <FormControl
                      type="text"
                      name="ifsccode"
                      placeholder="IFSC code"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>



                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Cheque Favourable </Form.Label>
                    <FormControl
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
                      <UploadButton uploader={uploader} options={{ multi: true }}>

                   {({ onClick }) =>
                     <Form.Control className='file_input text-center' onClick={onClick} placeholder='click here and upload attachment' />
                   }
                 </UploadButton>
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
      </Row>

    </Fragment >
  );
}
