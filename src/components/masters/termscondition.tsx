import { Fragment, useState } from 'react';
import { Col, Row, Card, Form, Button, CardBody } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function TermsCondition() {

    //quill
    const [value1, setValue1] = useState('');

  const applications = [
    { value: "1", label: "Society" },
    { value: "2", label: "Tenant" },
    { value: "3", label: "Gate Pass" },
    { value: "4", label: "Change In Name" },
    { value: "5", label: "Contact Update" },
    { value: "6", label: "Parking" },
    { value: "7", label: "Flat Resale" },
    { value: "8", label: "Interior Work" },
    { value: "9", label: "Celebration" },
    { value: "10", label: "Theater" },
    { value: "11", label: "Banquet Hall" },
    { value: "12", label: "Club House" },
    { value: "13", label: "Swimming Pool" },
    { value: "14", label: "Play Area" },
    { value: "15", label: "CTurf Area" },
    { value: "16", label: "Rent Agreement" },
    { value: "17", label: "Share Certificate" },
    { value: "18", label: "Nomination" },
    { value: "19", label: "Badminton Count" },
    { value: "20", label: "Food Court" },
    { value: "21", label: "Other" }
    //
  ];
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Terms & Conditions</span>
        </div>
      </div>
<Row>
  <Col xl={4}>
  <Form.Group className="form-group">
                <Form.Label>Applications<span className="text-danger">*</span></Form.Label>
                <div className="SlectBox">
                    <Select
                       options={applications}
                      placeholder="Select applications"
                      // classNamePrefix="selectform"
                      classNamePrefix='Select2' className="multi-select"
                    />
                  </div>
              </Form.Group>
  </Col>
</Row>
      <Row>
        <Col xl={12}>

       <Card>
        <CardBody className='h-400p'>
        <ReactQuill className='h-300p' theme="snow" value={value1} onChange={setValue1}  />
        </CardBody>
       </Card>

<div className='float-end mb-4'>
          <Button type='button' className='btn btn-primary me-2'>Save Permissions</Button>
          <Button type='button' className='btn btn-default'>Cancel</Button>
          </div>

        </Col>
      </Row>


    </Fragment>
  );
}
