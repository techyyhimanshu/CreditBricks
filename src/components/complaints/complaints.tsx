
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown, FormControl, CardHeader, CardBody } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";

export default function Complaints() {


  const status = [
    { value: "1", label: "All" },
    { value: "2", label: "In Process" },
    { value: "3", label: "Pending" },
    { value: "4", label: "Verified" },
    { value: "5", label: "Completed" },
  ]

  const property = [
    { value: "1", label: "A101" }
  ]

  const againstservices = [
    { value: "1", label: "Security" },
    { value: "2", label: "Housekeeping" },
    { value: "3", label: "Water" },
    { value: "4", label: "Lift" },
    { value: "5", label: "Tenant" }
  ]

  const priority = [
    { value: "1", label: "High" },
    { value: "2", label: "Medium" },
    { value: "3", label: "Low" }
  ]
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Complaints</span>
        </div>
        <div className="right-content">
          <Link to={``} className='float-end btn btn-primary btn-sm'><i className="bi bi-plus"></i> Add Complaint</Link>
        </div>
      </div>

      <Row>
<Col xl={12}>

<Card className='m-0'>
<Card.Body className='pt-0 pb-1'>
  <Row>
  <Col xl={3}>
      <Form.Group className="form-group">
        <Form.Label>Property</Form.Label>
        <Select
          options={property}
          placeholder="Select property"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={3}>
      <Form.Group className="form-group">
        <Form.Label>Against which Services</Form.Label>
        <Select
          options={againstservices}
          placeholder="Select service"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={2}>
      <Form.Group className="form-group">
        <Form.Label>Priority </Form.Label>
        <Select
          options={priority}
          placeholder="Select priority"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>

    <Col xl={2}>
      <Form.Group className="form-group">
        <Form.Label>Status </Form.Label>
        <Select
          options={status}
          placeholder="Select status"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>


<Col xl={2} className='pt-1'>
<Form.Group className="form-group pt-4">
<Button className="btn btn-default" type="button">Search </Button>
</Form.Group>
</Col>
  </Row>
</Card.Body>
</Card>

<Card className='mt-3'>
<CardHeader>
  <h3 className='card-title'>   List of Compliants</h3>
</CardHeader>
  <Card.Body className='pt-0'>
  <table className='table'>
    <thead>
      <tr>
        <th>S.no.</th>
        <th>Complaint Id</th>
        <th>Property</th>
        <th>Against which Services</th>
        <th>Complaint Data & Time</th>
        <th>Status</th>
        <th  className='text-center'>Priority</th>
       <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><Link to={``} className='text-info'>CS-0002</Link></td>
        <td>A101</td>
        <td>Housekeeping</td>
        <td>12/02/25. 12:35 pm</td>
        <td>In Process</td>
        <td className='text-center'><span className='badge badge-danger'>High</span></td>
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
        <td><Link to={``} className='text-info'>CS-0002</Link></td>
        <td>A101</td>
        <td>Water</td>
        <td>12/02/25. 12:35 pm</td>
        <td>Pending</td>
        <td className='text-center'><span className='badge badge-success'>Medium</span></td>
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
        <td>3</td>
        <td><Link to={``} className='text-info'>CS-0002</Link></td>
        <td>A101</td>
        <td>Lift</td>
        <td>12/02/25. 12:35 pm</td>
        <td>Verified</td>
        <td  className='text-center'><span className='badge badge-warning'>Low</span></td>
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

</Col>

      </Row>


    </Fragment >
  );
}
