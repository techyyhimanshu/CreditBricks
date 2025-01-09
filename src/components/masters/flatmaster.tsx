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
    name: 'Unit No',
    selector: row => row.unitno,
    sortable: true,
  },

  {
    name: 'Floor No',
    selector: row => row.floorno,
    sortable: true,
  },

  {
    name: 'Falt No',
    selector: row => row.flatno,
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
    sno: '1',
    Sname: 'SKVilla Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',


  },
  {
    id: 2,
    sno: '2',
    Sname: 'GreenGlobal Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',
  },
  {
    id: 3,
    sno: '3',
    Sname: 'Dewan Enclave Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',
  },
  {
    id: 4,
    sno: '4',
    Sname: 'SKVilla Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',
  },
  {
    id: 5,
    sno: '5',
    Sname: 'GreenGlobal Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',
  },
  {
    id: 6,
    sno: '6',
    Sname: 'Dewan Enclave Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',
  },
  {
    id: 7,
    sno: '7',
    Sname: 'GreenGlobal Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',
  },
  {
    id: 8,
    sno: '8',
    Sname: 'Dewan Enclave Society',
    unitno: 'Unit A',
    floorno: '2',
    flatno: 'A-204',
  },
]



export default function FlatMaster() {


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

  const societyoptions = [
    { value: "1", label: "SKVilla Society" },
    { value: "2", label: "GreenGlobal Society" },
    { value: "3", label: "Dewan Enclave Society" }
  ];

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Flat Master</span>
        </div>

        <div className="right-content">

          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => viewDemoShow("select")}><i className="bi bi-plus"></i> Add Flat</button>
          <Modal show={select} centered >
            <Modal.Header>
              <Modal.Title>Add Flat</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("select"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="form-group">
                <Form.Label>Society Name <span className="text-danger">*</span></Form.Label>
                <div className="SlectBox">
                    <Select
                       options={societyoptions}
                      placeholder="Select Society"
                      // classNamePrefix="selectform"
                      classNamePrefix='Select2' className="multi-select"
                    />
                  </div>
              </Form.Group>


              <Form.Group className="form-group">
                <Form.Label>Unit No <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Address' className='form-control'></Form.Control>
              </Form.Group>




              <Form.Group className="form-group">
                <Form.Label>Floor No <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Floor no' className='form-control'></Form.Control>

              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Flat No <span className="text-danger">*</span></Form.Label>
                <Form.Control type='text' placeholder='Flat no' className='form-control'></Form.Control>
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
