import { Fragment } from 'react';
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import Select from "react-select";



export default function MobileApp() {

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
          <Card>
            <Card.Body>

              <div className="table-responsive ">
<table className='table'>
  <thead>
    <tr>
      <th>Module Name</th>
<th className='text-center'>Permissions</th>
 </tr>
  </thead>
  <tbody>
    <tr>
      <td>Accounts</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input" checked
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Application</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input" checked
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Compliants</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input" checked
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Tenant</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Vehicle</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
     </tr>
    <tr>
      <td>Loans</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input" checked
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Notice</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Annoucements</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Visitors</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Pets</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input" checked
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Helpers</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
                     <Form.Control
                      type="checkbox"
                      name="custom-switch-checkbox1"
                      className="custom-switch-input"
                    />
                    <span className="custom-switch-indicator"></span>
                  </Form.Label></td>
    </tr>
    <tr>
      <td>Community</td>
      <td className='text-center'><Form.Label className="custom-switch ps-0">
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
              </div>
<div className='float-end'>
              <Button type="button" className="btn btn-primary ms-2">Save Permissions</Button>
              <Button type="button" className="btn btn-default">Cancel</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </Fragment>
  );
}
