
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown, FormControl, CardHeader, CardBody } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
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

export default function ParentEntity() {
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
const society =[
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

const wing  = [
  { value: "1", label: "Select Wing " },
]
  const designation = [
    { value: "1", label: "Secretary " },
    { value: "2", label: "Committe Member " },
  ]




  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Parent Entity</span>
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

        >
          {({ setFieldValue, values }) => (
            <FormikForm className='col-sm-12'>

<Card className='m-0'>
<CardHeader>
  <h3 className='card-title'>Add Parent Entity</h3>
</CardHeader>
<Card.Body className='pt-0 pb-1'>
  <Row>
    <Col xl={2}>
      <Form.Group className="form-group">
        <Form.Label>Flat </Form.Label>
        <Select
          options={flat}
          placeholder="Select Flat"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
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
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
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
        {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
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
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
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
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
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
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
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
        {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>



<Col xl={12}>
<Form.Group className="form-group float-end">
<Button className="btn btn-default ms-2" type="button">Clear </Button>
<Button className="btn btn-primary" type="button">Save </Button>
</Form.Group>
</Col>
  </Row>
</Card.Body>
</Card>

<Card className='mt-3'>
<CardHeader>
  <h3 className='card-title'>   List of Committee Members</h3>
</CardHeader>
  <Card.Body className='pt-0'>
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



            </FormikForm>
          )}
        </Formik>
      </Row>


    </Fragment >
  );
}
