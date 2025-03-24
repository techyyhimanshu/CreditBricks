import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Dropdown } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";


const columns = [
  {
    name: 'Role Name',
    selector: row => row.rolename,
    sortable: true,
  },
  {
    name: 'Role Type',
    selector: row => row.roletype,
    sortable: true,
  },

  {
    name: 'Action',
    sortable: true,

    cell: () => (
      <Dropdown >
        <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
          Action
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item >Edit </Dropdown.Item>
          <Dropdown.Item className='text-danger' >Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    ),


  },
];

const data = [
  {
    id: 1,
    rolename: 'ABC',
    roletype: 'Super Admin',
  },
  {
    id: 2,
    rolename: 'ABC',
    roletype: 'Admin',
  },
  {
    id: 3,
    rolename: 'ABC',
    roletype: 'Super Admin',
  },
  {
    id: 4,
    rolename: 'ABC',
    roletype: 'Super Admin',
  },
  {
    id: 5,
    rolename: 'ABC',
    roletype: 'Super Admin',
  },
  {
    id: 6,
    rolename: 'ABC',
    roletype: 'Super Admin',
  },
  {
    id: 7,
    sno: '7',
    rolename: 'ABC',
    roletype: 'Super Admin',
  },
  {
    id: 8,
    sno: '8',
    rolename: 'ABC',
    roletype: 'Super Admin',
  },
]



export default function Roles() {


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
    { value: "2", label: "Admin" },
  ];

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Roles</span>
        </div>

        <div className="right-content">

          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("select")}><i className="bi bi-plus"></i> Add Roles</button>
          <Modal show={select} centered >
            <Modal.Header>
              <Modal.Title>Add Role</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("select"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>

            <Form.Group className="form-group">
                <Form.Label>Role Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Role Name' className='form-control'></Form.Control>
              </Form.Group>


              <Form.Group className="form-group">
                <Form.Label>Role Type <span className="text-danger">*</span></Form.Label>
                <div className="SlectBox">
                    <Select
                       options={roletype}
                      placeholder="Select Tyoe"
                      // classNamePrefix="selectform"
                      classNamePrefix='Select2' className="multi-select"
                    />
                  </div>
              </Form.Group>



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
