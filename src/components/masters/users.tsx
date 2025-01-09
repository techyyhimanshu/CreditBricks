import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";


const columns = [
  {
    name: 'First Name',
    selector: row => row.Fname,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.Lname,
    sortable: true,
  },
  {
    name: 'Mobile No',
    selector: row => row.mobileno,
    sortable: true,
  },

  {
    name: 'Email Id',
    selector: row => row.emailid,
    sortable: true,
  },

  {
    name: 'Roles',
    selector: row => row.roles,
    sortable: true,
  },

  {
    name: 'Status',
    selector: row => row.status,
    sortable: true,
  },

  {
    name: 'Action',
    sortable: true,
    cell: () => <div><button type="button" className="btn btn-light btn-sm">Edit</button><button type="button" className="btn bg-info-transparent ms-2 btn-sm">Delete</button></div>,

  },
];

const data = [
  {
    id: 1,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'


  },
  {
    id: 2,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'Admin',
    status: 'Active'
  },
  {
    id: 3,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 4,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 5,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 6,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 7,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
  {
    id: 8,
    Fname: 'User',
    Lname: 'User',
    mobileno: '',
    emailid: '',
    roles: 'SuperAdmin',
    status: 'Active'
  },
]



export default function Users() {


  const countryoption = [
    { value: "1", label: "India" },

  ];

  const stateoption = [
    { value: "1", label: "Delhi" },

  ];

  const cityoption = [
    { value: "1", label: "Delhi" },

  ];


  const [select, setSelect] = useState(false);

  const tableData = {
    columns,
    data
  };



  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "select":
        setSelect(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "select":
        setSelect(false);
        break;
    }
  };


  const roletype = [
    { value: "1", label: "Super Admin" },
    { value: "2", label: "Admin" }
  ];




  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Flat Master</span>
        </div>

        <div className="right-content">

          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("select")}><i className="bi bi-plus"></i> Add User</button>
          <Modal show={select} centered size='lg' >
            <Modal.Header>
              <Modal.Title>Add User</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("select"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>

              <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>UserName <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Username' className='form-control'></Form.Control>
              </Form.Group>
                </Col>

                <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                <Form.Control type='password' placeholder='First Name' className='form-control'></Form.Control>
              </Form.Group>
                </Col>


                <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='First Name' className='form-control'></Form.Control>
              </Form.Group>
                </Col>

                <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Last Name' className='form-control'></Form.Control>
              </Form.Group>
                </Col>

                <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>Roles<span className="text-danger">*</span></Form.Label>
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

                <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Email' className='form-control'></Form.Control>
              </Form.Group>
                </Col>

                <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>Mobile No. <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Mobileno' className='form-control'></Form.Control>
              </Form.Group>
                </Col>
                <Col xl={6}>
                <Form.Group className="form-group">
                <Form.Label>Country <span className="text-danger">*</span></Form.Label>

                <div className=" SlectBox">
                    <Select
                       options={countryoption}
                      placeholder="Country"
                      // classNamePrefix="selectform"
                      classNamePrefix='Select2' className="multi-select"
                    />
                  </div>

              </Form.Group>
</Col>
<Col xl={6}>
              <Form.Group className="form-group">
                <Form.Label>State <span className="text-danger">*</span></Form.Label>
                <div className=" SlectBox">
                    <Select
                       options={stateoption}
                      placeholder="State"
                      // classNamePrefix="selectform"
                      classNamePrefix='Select2' className="multi-select"
                    />
                  </div>
              </Form.Group>
</Col>
<Col xl={6}>
              <Form.Group className="form-group">
                <Form.Label>City <span className="text-danger">*</span></Form.Label>
                <div className=" SlectBox">
                    <Select
                       options={cityoption}
                      placeholder="City"
                      // classNamePrefix="selectform"
                      classNamePrefix='Select2' className="multi-select"
                    />
                  </div>
              </Form.Group>
</Col>
<Col xl={6}>
              <Form.Group className="form-group">
                <Form.Label>Zipcode <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Zipcode' className='form-control'></Form.Control>
              </Form.Group>

</Col>

              </Row>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("select"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoShow("select"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>
        </div>
      </div>

      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>

              <div className="table-responsive ">
                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    data={data}
                    pagination


                  />
                </DataTableExtensions>
              </div>



            </Card.Body>
          </Card>
        </Col>
      </Row>


    </Fragment>
  );
}
