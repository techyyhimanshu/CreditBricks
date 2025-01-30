
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, CardHeader, FormControl } from "react-bootstrap";
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
export default function AddPropertyMaster() {


  const societyname: any = [{ value: "1", label: "Select Society" }]

  const propertystatus = [{ value: "1", label: "None" },
    { value: "2", label: "Sold" },
    { value: "3", label: "Unsold" },
    { value: "4", label: "Blocked by Management" },
    { value: "5", label: "Refused" },
    { value: "6", label: "Occupied" },

  ]

  const narration = [{ value: "1", label: "None" },
    { value: "2", label: "1BHk" },
    { value: "3", label: "1.5BHK" },
    { value: "4", label: "2BHK" },
    { value: "5", label: "2.5BHK" },
    { value: "6", label: "1RK" },
    { value: "7", label: "3BHk" },
    { value: "8", label: "3.5BHK" },
    { value: "9", label: "4BHK" },
    { value: "10", label: "Shop" },
    { value: "11", label: "Duplex" },
    { value: "12", label: "Villa" },
    { value: "13", label: "Bangalow" },
    { value: "14", label: "Basement" },
    { value: "15", label: "Gala" },
    { value: "16", label: "Garage" },
    { value: "17", label: "Godown" },
    { value: "18", label: "Independent House" },
    { value: "19", label: "Industrial Gala" },
    { value: "20", label: "Office" },
    { value: "21", label: "Stall" },
  ]

  const dealtype = [{ value: "1", label: "None" },
    { value: "2", label: "Self Occupied" },
    { value: "3", label: "Rented" },
    { value: "4", label: "Sell" },
    { value: "5", label: "Rent" },
    { value: "6", label: "Sell/Rent" },

  ]

const tenant = [
  { value: "1", label: "Select Tenant" }
]
  const tower =  [{ value: "1", label: "Select Tower" }]

  const wing =  [{ value: "1", label: "Select Wing" }]

  const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
    value: state,
    label: state,
  }));


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}property/propertymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Add Property Master</span>
        </div>
      </div>

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
                    <Form.Label>Property Name <span className="text-danger">*</span></Form.Label>
                    <FormControl
                      type="text"
                      name="propertyName"
                      placeholder="Property name"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Owner <span className="text-danger">*</span></Form.Label>
                    <FormControl
                      type="text"
                      name="ownername"
                      placeholder="Owner name"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Ledger Name <span className="text-danger">*</span></Form.Label>
                    <FormControl
                      type="text"
                      name="ledgername"
                      placeholder="Ledger Name"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                    <Select
                      options={propertystatus}
                      // value={values.country}
                      // onChange={(selected) => setFieldValue("country", selected)}
                      placeholder="Select Status"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>



                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Society <span className="text-danger">*</span></Form.Label>
                    <Select
                      options={societyname}
                      // value={values.state}
                      // onChange={(selected: any) => {
                      //   setFieldValue('state', selected);
                      //   handleStateChange({
                      //     value: selected.value,
                      //     label: selected.label
                      //   });
                      // }}
                      placeholder="Select Society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                <Form.Group className="form-group">
                      <Form.Label>Narration <span className="text-danger">*</span></Form.Label>
                      <Select
                        options={narration}
                        // value={values.city}
                        // onChange={(selected) => setFieldValue("city", selected)}
                        placeholder="Select narration"
                        classNamePrefix="Select2"
                      />
                      {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                    </Form.Group>
                </Col>

                <Col xl={4}>
                <Form.Group className="form-group">
                      <Form.Label>Tower <span className="text-danger">*</span></Form.Label>
                      <Select
                        options={tower}
                        // value={values.city}
                        // onChange={(selected) => setFieldValue("city", selected)}
                        placeholder="Select tower"
                        classNamePrefix="Select2"
                      />
                      {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                    </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Area(sq.ft.) <span className="text-danger">*</span></Form.Label>
                    <FormControl
                      type="text"
                      name="area"
                      placeholder="Area"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                <Form.Group className="form-group">
                      <Form.Label>Wing <span className="text-danger">*</span></Form.Label>
                      <Select
                        options={wing}
                        // value={values.city}
                        // onChange={(selected) => setFieldValue("city", selected)}
                        placeholder="Select wing"
                        classNamePrefix="Select2"
                      />
                      {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                    </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Flat No. <span className="text-danger">*</span></Form.Label>
                    <FormControl
                      type="text"
                      name="arflatea"
                      placeholder="Flat no"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                <Form.Group className="form-group">
                      <Form.Label>Deal Type</Form.Label>
                      <Select
                        options={dealtype}
                        // value={values.city}
                        // onChange={(selected) => setFieldValue("city", selected)}
                        placeholder="Select Type"
                        classNamePrefix="Select2"
                      />
                      {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                    </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Floor No.</Form.Label>
                    <FormControl
                      type="text"
                      name="floor"
                      placeholder="FLoor no"
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

<Accordion.Item eventKey="Owner Details" className="bg-white  mb-3">
  <Accordion.Header className="borders">
  Owner Details
  </Accordion.Header>
  <Accordion.Body className="borders p-0">
  <Card className='m-0'>

            <Card.Body className='pt-3'>

              <Row>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Member Name</Form.Label>
                    <FormControl
                      type="text"
                      name="membername"
                      placeholder="Member Name"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Co Owner </Form.Label>
                    <FormControl
                      type="text"
                      name="coOwner"
                      placeholder="Co Owner"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Third Owner</Form.Label>
                    <FormControl
                      type="text"
                      name="thirdOwner"
                      placeholder="Third Owner"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Fourth Owner</Form.Label>
                    <FormControl
                      type="text"
                      name="fourthOwner"
                      placeholder="Fourth Owner"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>



                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Fifth Owner</Form.Label>
                    <FormControl
                      type="text"
                      name="fifthOwner"
                      placeholder="Fifth Owner"
                      className="form-control"
                    />
                    {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                <Form.Group className="form-group">
                      <Form.Label>Previous Owner</Form.Label>
                      <FormControl
                      type="text"
                      name="previousOwner"
                      placeholder="Previous Owner"
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

<Accordion.Item eventKey="Registration Details" className="bg-white  mb-3">
  <Accordion.Header className="borders">
  Registration Details
  </Accordion.Header>
  <Accordion.Body className="borders p-0">
  <Card className='m-0'>

      <Card.Body className='pt-3'>

        <Row>
          <Col xl={4}>
            <Form.Group className="form-group">
              <Form.Label>Flat Registration Number</Form.Label>
              <FormControl
                type="text"
                name="flatRegistration"
                placeholder="Flat Registration Number"
                className="form-control"
              />
              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
            </Form.Group>
          </Col>

          <Col xl={4}>
            <Form.Group className="form-group">
              <Form.Label>Date of Agreement </Form.Label>
              <FormControl
                type="text"
                name="dateAgreement"
                placeholder="Date of Agreement"
                className="form-control"
              />
              {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
            </Form.Group>
          </Col>


          <Col xl={4}>
            <Form.Group className="form-group">
              <Form.Label>Date of Registration</Form.Label>
              <FormControl
                type="text"
                name="dateRegistration"
                placeholder="Date of Registration"
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


<Accordion.Item eventKey="Tenant Details" className="bg-white  mb-3">
  <Accordion.Header className="borders">
  Tenant Details
  </Accordion.Header>
  <Accordion.Body className="borders p-0">
  <Card className='m-0'>

            <Card.Body className='pt-3'>

              <Row>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Tenant</Form.Label>
                    <Select
                        options={tenant}
                        // value={values.city}
                        // onChange={(selected) => setFieldValue("city", selected)}
                        placeholder="Select Tenant"
                        classNamePrefix="Select2"
                      />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Rent Agreement Start Date </Form.Label>
                    <FormControl
                      type="date"
                      name="rentAgreementStartDate"
                      placeholder=""
                      className="form-control"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Rent Agreement End Date</Form.Label>
                    <FormControl
                      type="date"
                      name="rentAgreementEndDate"
                      placeholder=""
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
        <Form.Label>Address line 1</Form.Label>
        <FormControl
          type="text"
          disabled
          name="address"
          placeholder="Opp Mohan Palms"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>Address line 2</Form.Label>
        <FormControl
          type="text"
          disabled
          name="address"
          placeholder="Shirgaon"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>Address line 3</Form.Label>
        <FormControl
          type="text"
          disabled
          name="address"
          placeholder="Badlapur East"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>City </Form.Label>
        <FormControl
          type="text"
          name="city"
          disabled
          placeholder="Thane"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>State </Form.Label>
        <FormControl
          type="text"
          name="city"
          disabled
          placeholder="Maharashtra"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>Pincode </Form.Label>
        <FormControl
          type="text"
          name="city"
          disabled
          placeholder="421503"
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

<Accordion.Item eventKey="Other Details" className="bg-white  mb-3">
  <Accordion.Header className="borders" id="Portfolio">
  Other Details
  </Accordion.Header>
  <Accordion.Body className="borders p-0">
  <Card className='m-0'>

<Card.Body className='pt-3'>
  <Row>
  <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>Intercom Number </Form.Label>
        <FormControl
          type="text"
          name="intercom Number"
         placeholder="Intercom Number"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>Consumer Electricity Number </Form.Label>
        <FormControl
          type="text"
          name="consumerElectricityNumber"
          placeholder="Consumer Electricity Number"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group">
        <Form.Label>Gas Connection Number </Form.Label>
        <FormControl
          type="text"
          name="gasConnectionNumber"
         placeholder="Gas Connection Number"
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

<Accordion.Item eventKey="Already Paid Details" className="bg-white  mb-3">
  <Accordion.Header className="borders" id="Portfolio">
  Already Paid Details
  </Accordion.Header>
  <Accordion.Body className="borders p-0">
  <Card className='m-0'>

<Card.Body className='pt-3'>
  <Row>
  <Col xl={3}>
      <Form.Group className="form-group">
        <Form.Label>
        Monthly Paid Maintenance to Builder</Form.Label>
        <FormControl
          type="text"
           placeholder="Monthly Paid Maintenance to Builder"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={3}>
    <Form.Group className="form-group">
        <Form.Label>
        Monthly Paid Maintenance to Builder Upto</Form.Label>
        <FormControl
          type="date"
           placeholder="Monthly Paid Maintenance to Builder Upto"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={3}>
    <Form.Group className="form-group">
        <Form.Label>
        Monthly Paid Arrears</Form.Label>
        <FormControl
          type="text"
           placeholder="Monthly Paid Arrears"
          className="form-control"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={3}>
    <Form.Group className="form-group">
        <Form.Label>
        Monthly Paid Arrears Upto</Form.Label>
        <FormControl
          type="date"
           placeholder="Monthly Paid Arrears Upto"
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

</Accordion>










          <span className='float-end mb-5'>
          <Button variant="default ms-3"> Cancel </Button>
                    <Button className="btn btn-primary" type="submit">Save </Button>
          </span>
        </Col>
      </Row>

    </Fragment >
  );
}
