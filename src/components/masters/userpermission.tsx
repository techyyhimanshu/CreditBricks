import { Fragment } from 'react';
import { Col, Row, Form, Button, Accordion } from "react-bootstrap";
import Select from "react-select";



export default function UserPermission() {

  const roletype = [
    { value: "1", label: "Super Admin" },
    { value: "2", label: "Admin" }
  ];
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Mobile App</span>
        </div>
      </div>
<Row>
  <Col xl={4}>
  <Form.Group className="form-group">
                <Form.Label>User Type<span className="text-danger">*</span></Form.Label>
                <div className="SlectBox">
                    <Select
                       options={roletype}
                      placeholder="Select Roles"
                      // classNamePrefix="selectform"
                      classNamePrefix='Select2' className="multi-select"
                    />
                  </div>
              </Form.Group>
  </Col>
</Row>
      <Row>
        <Col xl={12}>

            <Accordion defaultActiveKey="Task" id="accordion">

								<Accordion.Item eventKey="Task" className="bg-white mb-3">
									<Accordion.Header className="borders " id="Task">
                  Accounts
									</Accordion.Header>
									<Accordion.Body className="borders p-0">
                  <table className='table table-bordered mb-0'>
  <thead>
    <tr>
     <th>View</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>Add</th>
      <th>Full Access</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>

  </tbody>
</table>
									</Accordion.Body>
								</Accordion.Item>

                <Accordion.Item eventKey="Documents" className="bg-white  mb-3">
									<Accordion.Header className="borders" id="Documents">
                  Application
									</Accordion.Header>
									<Accordion.Body className="borders p-0">
                  <table className='table table-bordered mb-0'>
  <thead>
    <tr>
     <th>View</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>Add</th>
      <th>Full Access</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>

  </tbody>
</table>
									</Accordion.Body>
								</Accordion.Item>

                <Accordion.Item eventKey="Messages" className="bg-white  mb-3">
									<Accordion.Header className="borders" id="Messages">
                  Complaints
									</Accordion.Header>
									<Accordion.Body className="borders p-0">
                  <table className='table table-bordered mb-0'>
  <thead>
    <tr>
     <th>View</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>Add</th>
      <th>Full Access</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>

  </tbody>
</table>
									</Accordion.Body>
								</Accordion.Item>


                <Accordion.Item eventKey="Deals" className="bg-white  mb-3">
									<Accordion.Header className="borders" id="Deals">
                  Tenant
									</Accordion.Header>
									<Accordion.Body className="borders p-0">
                  <table className='table table-bordered mb-0'>
  <thead>
    <tr>
     <th>View</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>Add</th>
      <th>Full Access</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>

  </tbody>
</table>
									</Accordion.Body>
								</Accordion.Item>

                <Accordion.Item eventKey="Calendar" className="bg-white  mb-3">
									<Accordion.Header className="borders" id="Calendar">
                  Vehicle
									</Accordion.Header>
									<Accordion.Body className="borders p-0">
                  <table className='table table-bordered mb-0'>
  <thead>
    <tr>
     <th>View</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>Add</th>
      <th>Full Access</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>

  </tbody>
</table>
									</Accordion.Body>
								</Accordion.Item>

                <Accordion.Item eventKey="Portfolio" className="bg-white  mb-3">
									<Accordion.Header className="borders" id="Portfolio">
                  Loans
									</Accordion.Header>
									<Accordion.Body className="borders p-0">
                  <table className='table table-bordered mb-0'>
  <thead>
    <tr>
     <th>View</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>Add</th>
      <th>Full Access</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
                  <td><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox" checked
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>

  </tbody>
</table>
									</Accordion.Body>
								</Accordion.Item>

							</Accordion>

<div className='float-end mb-4'>
          <Button type='button' className='btn btn-primary me-2'>Save Permissions</Button>
          <Button type='button' className='btn btn-default'>Cancel</Button>
          </div>

        </Col>
      </Row>


    </Fragment>
  );
}
