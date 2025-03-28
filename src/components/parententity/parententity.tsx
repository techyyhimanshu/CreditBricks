
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
  const parent = [
    { value: "1", label: "Tower123" },


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
  <Col xl={4}>
      <Form.Group className="form-group mb-1">
        <Form.Label>Society Name or Registraion Number </Form.Label>
        <Select
          options={society}
          placeholder="Select Society"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group mb-1">
        <Form.Label>Society Address</Form.Label>
        <Select
          options={society}
          placeholder="Select address"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={4}>
      <Form.Group className="form-group mb-1">
        <Form.Label>Parent Entity </Form.Label>
        <Select
          options={parent}
          placeholder="Select parent"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>


<Col xl={12}>
<Form.Group className="form-group float-end pt-2">
<Button className="btn btn-default ms-2" type="button">Clear </Button>
<Button className="btn btn-primary" type="button">Save </Button>
</Form.Group>
</Col>
  </Row>
</Card.Body>
</Card>

<Card className='mt-3'>
<CardHeader>
  <h3 className='card-title'>   List</h3>
</CardHeader>
  <Card.Body className='pt-0'>
  <table className='table'>
    <thead>
      <tr>
        <th>S.no.</th>
        <th>Soceity Name </th>
        <th>Society Address</th>
        <th>Parent</th>
     <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Society</td>
        <td>-</td>
        <td>Tower123</td>
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
