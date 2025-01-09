import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Tooltip, OverlayTrigger } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";


const columns = [
  {
    name: 'S.No.',
    selector: row => row.sno,
    sortable: true,
  },
  {
    name: 'Society Name',
    selector: row => row.Sname,
    sortable: true,
  },
  {
    name: 'Address',
    selector: row => row.Saddress,
    sortable: true,
  },

  {
    name: 'Country',
    selector: row => row.Scountry,
    sortable: true,
  },

  {
    name: 'State',
    selector: row => row.Sstate,
    sortable: true,
  },

  {
    name: 'City',
    selector: row => row.Scity,
    sortable: true,
  },

  {
    name: 'Action',
    sortable: true,
    cell: () => <button type="button" className="btn btn-light btn-sm">Edit</button>,

  },
];

const data = [
  {
    id: 1,
    sno: '1',
    Sname: 'SKVilla Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'

  },
  {
    id: 2,
    sno: '2',
    Sname: 'GreenGlobal Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'
  },
  {
    id: 3,
    sno: '3',
    Sname: 'Dewan Enclave Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'
  },
  {
    id: 4,
    sno: '4',
    Sname: 'SKVilla Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'
  },
  {
    id: 5,
    sno: '5',
    Sname: 'GreenGlobal Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'
  },
  {
    id: 6,
    sno: '6',
    Sname: 'Dewan Enclave Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'
  },
  {
    id: 7,
    sno: '7',
    Sname: 'GreenGlobal Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'
  },
  {
    id: 8,
    sno: '8',
    Sname: 'Dewan Enclave Society',
    Saddress: 'D-Block',
    Scountry: 'India',
    Sstate: 'Delhi',
    Scity:'Delhi'
  },
]



export default function SocietyMaster() {


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


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Society Master</span>
        </div>

        <div className="right-content">

          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("select")}><i className="bi bi-plus"></i> Add Society</button>
          <Modal show={select} centered >
            <Modal.Header>
              <Modal.Title>Add Society</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("select"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="form-group">
                <Form.Label>Society Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Society name' className='form-control'></Form.Control>
              </Form.Group>


              <Form.Group className="form-group">
                <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Address' className='form-control'></Form.Control>
              </Form.Group>




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

              <Form.Group className="form-group">
                <Form.Label>Zipcode <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Zipcode' className='form-control'></Form.Control>
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
