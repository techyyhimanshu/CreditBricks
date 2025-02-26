
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, Dropdown, Modal, CardHeader, CardBody } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";
import { Link } from "react-router-dom";

export default function Complaints() {

  const [addcomplaint, setcomplaints] = useState(false);
  const [complaintview, setcomplaintview] = useState(false);
  const [assign, setassign] = useState(false);

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addcomplaint":
        setcomplaints(true);
        break;

        case "complaintview":
          setcomplaintview(true);
        break;

        case "assign":
          setassign(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addcomplaint":
        setcomplaints(false);
        break;

        case "complaintview":
          setcomplaintview(false);
          break;

          case "assign":
            setassign(false);
            break;

    }
  };

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

  const complainttype = [
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

  const assigntoname = [
    { value: "1", label: "Surender Sharma" },
    { value: "2", label: "Purnima Verma" },
    { value: "3", label: "Himanshu Bansal" }
  ]

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Complaints</span>
        </div>
        <div className="right-content">
        <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addcomplaint")}><i className="bi bi-plus"></i> Add Complaint</span>
          <Modal show={addcomplaint} centered>
            <Modal.Header>
              <Modal.Title>Complaint</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addcomplaint"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body className='pt-1'>
              <Row>
              <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Complaint ID</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='' disabled></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property</Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                <Form.Group className="form-group mb-1">
        <Form.Label>Complaint Type</Form.Label>
        <Select
          options={complainttype}
          placeholder="Select service"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
                </Col>
                <Col xl={6}>
      <Form.Group className="form-group mb-1">
        <Form.Label>Priority </Form.Label>
        <Select
          options={priority}
          placeholder="Select priority"
          classNamePrefix="Select2"
        />
        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
      </Form.Group>
    </Col>
    <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Description</Form.Label>
                    <textarea className='form-control' />
                  </Form.Group>
                </Col>
    <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Upload Photo</Form.Label>
                    <Form.Control type="file" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addcomplaint"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addcomplaint"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          <Modal show={complaintview}  centered>
            <Modal.Header>
              <Modal.Title>Complaint View</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("complaintview"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
            <Row>
                                    <Col xl={3}>
                                      <img
                                        alt="" className='w-100 rounded-2'
                                        src="https://th.bing.com/th/id/OIP.8gMCq0mLBAaQ-olK0AyMsAAAAA?pcl=1b1a19&rs=1&pid=ImgDetMain"
                                      />
                                    </Col>
                                    <Col xl={8} className='p-0'>
                                      <p className='tx-16 mb-0 mt-2 tx-semibold'>CS-0002</p>
                                      <p className='mb-1 tx-16 '>Property : A101</p>

                                    </Col>
                                  </Row>
                                  <hr/>
                                  <Row>
                            <Col xl={6}>
                            <p className='mb-0 text-muted'>Complaint Type</p>
                            <p className='tx-15 tx-semibold'>Leakages</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                            <p className='mb-0 text-muted'>Priority</p>
                              <p className='tx-15 text-danger tx-semibold'>High</p>

                            </Col>
                            <Col xl={12} className='mt-2'>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text</p>
                           <span className='text-muted'><i className='bi bi-calendar-fill'></i>&nbsp; 12/02/25. 12:35 pm</span>
                            </Col>
                          </Row>
                          <hr/>
                          <Row>
                            <Col xl={6}>
                            <p className='mb-0 text-muted'>Assign To</p>
                            <p className='tx-15 mb-1 tx-semibold'>Neeraj Singh</p>
                            <p>+91 9876543212</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                            <p className='mb-0 text-muted'>Status</p>
                              <p className='tx-15 tx-semibold'><i className='bi bi-check-circle text-success tx-18'></i>&nbsp; Completed</p>

                            </Col>

                          </Row>
            </Modal.Body>

          </Modal>

          <Modal show={assign} centered>
            <Modal.Header>
              <Modal.Title>Assign To</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("assign"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
            <Row>
            <Col xl={12} className='bg-light pb-2'>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Assign To</Form.Label>
                    <Select
                      options={assigntoname}
                      placeholder="Select name"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                          </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("assign"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("assign"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

        </div>
      </div>

      <Row>
<Col xl={12}>

<Card className='m-0'>
<CardHeader className='pb-0'>
  <h3 className='card-title'> Filter</h3>
</CardHeader>
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
        <Form.Label>Complaint Type</Form.Label>
        <Select
          options={complainttype}
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
        <th>Complaint Type</th>
        <th>Assign To</th>
        <th>Data & Time</th>
        <th>Status</th>
        <th  className='text-center'>Priority</th>
       <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><span onClick={() => viewDemoShow("complaintview")} className='text-info cursor'>CS-0002</span></td>
        <td>A101</td>
        <td>Housekeeping</td>
        <td>Neeraj Singh</td>
        <td>12/02/25. 12:35 pm</td>
        <td> <Dropdown >
          <Dropdown.Toggle className='btn-sm text-primary tx-16 bg-none p-1 border-0 bg-light' id="dropdown-basic">
        <span className='tx-14'>  In Process</span>
          </Dropdown.Toggle>
 <Dropdown.Menu>
            <Dropdown.Item>Pending</Dropdown.Item>
            <Dropdown.Item>Verified</Dropdown.Item>
            <Dropdown.Item>Completed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </td>
        <td className='text-center'><span className='badge badge-danger'>High</span></td>
        <td><Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => viewDemoShow("addcomplaint")}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => viewDemoShow("assign")}>Assign To</Dropdown.Item>
            <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown></td>
      </tr>

      <tr>
        <td>2</td>
        <td><Link to={``} className='text-info'>CS-0002</Link></td>
        <td>A101</td>
        <td>Water</td>
        <td>Vishal Sharma </td>
        <td>12/02/25. 12:35 pm</td>
        <td> <Dropdown >
          <Dropdown.Toggle className='btn-sm text-primary tx-16 bg-none p-1 border-0 bg-light' id="dropdown-basic">
        <span className='tx-14'>Pending</span>
          </Dropdown.Toggle>
 <Dropdown.Menu>
            <Dropdown.Item>In Process</Dropdown.Item>
            <Dropdown.Item>Verified</Dropdown.Item>
            <Dropdown.Item>Completed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </td>
        <td className='text-center'><span className='badge badge-success'>Medium</span></td>
        <td><Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => viewDemoShow("addcomplaint")}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => viewDemoShow("assign")}>Assign To</Dropdown.Item>
            <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown></td>
      </tr>

      <tr>
        <td>3</td>
        <td><Link to={``} className='text-info'>CS-0002</Link></td>
        <td>A101</td>
        <td>Lift</td>
        <td>Abhishek Kumar</td>
        <td>12/02/25. 12:35 pm</td>
        <td> <Dropdown >
          <Dropdown.Toggle className='btn-sm text-primary tx-16 p-1 bg-none border-0 bg-light' id="dropdown-basic">
        <span className='tx-14'>Completed</span>
          </Dropdown.Toggle>
 <Dropdown.Menu>
            <Dropdown.Item>In Process</Dropdown.Item>
            <Dropdown.Item>Pending</Dropdown.Item>
            <Dropdown.Item>Verified</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>
        </td>
        <td  className='text-center'><span className='badge badge-warning'>Low</span></td>
        <td><Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => viewDemoShow("addcomplaint")}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={() => viewDemoShow("assign")}>Assign To</Dropdown.Item>
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
