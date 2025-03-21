import { Fragment, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Form, Button, CardBody } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";


export default function Parking() {

  const parkingtype = [

    { value: "1", label: "Stilt" },
    { value: "2", label: "Open" },
    { value: "2", label: "Basement" },
  ]

  const parkingnature = [
    { value: "1", label: "Member Parking" },
    { value: "2", label: "Visitor Parking" },
  ]

  const parkingvehicletype = [
    { value: "1", label: "2 Wheeler" },
    { value: "2", label: "4 Wheeler" },
  ]

  const vehicletype = [
    { value: "1", label: "Sedan" },
    { value: "2", label: "Coupe" },
    { value: "3", label: "Sports Car" },
    { value: "4", label: "Station Wagon" },
    { value: "5", label: "Hatchback" },
    { value: "6", label: "Convertible" },
    { value: "7", label: "SUV" },
    { value: "8", label: "Minivan" },
  ]
  const societyname = [
    { value: "1", label: "Society 1" },
    { value: "2", label: "Society 2" },
  ]

  const property = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },
  ]

  const parkingstatus = [
    { value: "1", label: "Allocated" },
    { value: "2", label: "Unallocated" },
  ]

  const membername = [
    { value: "1", label: "Memeber 1" },
    { value: "2", label: "Memeber 2" },
  ]

  const columns = [
    {
      name: 'S.No',
      selector: row => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Parking Number',
      cell: (row: Row) => (
        <span className='text-info cursor' onClick={() => viewDemoShow("viewparking")}>103</span>
      ),
      sortable: true,
    },

    {
      name: 'Tower',
      selector: row => row.tower,
      sortable: true,
    },
    {
      name: 'Society Name',
      selector: row => row.societyname,
      sortable: true,
    },
    {
      name: 'Member Name',
      selector: row => row.membername,
      sortable: true,
    },
    {
      name: 'Property',
      selector: row => row.property,
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
            <Dropdown.Item onClick={() => viewDemoShow("addloan")}>Edit </Dropdown.Item>
            <Dropdown.Item className='text-danger' >Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const data = [
    {
      sno: 1,
      parkingnumber: '103',
      tower: '',
      societyname: '',
      property: '',
      membername: '',
      action: ''

    },
    {
      sno: 2,
      parkingnumber: '103',
      tower: '',
      societyname: '',
      property: '',
      membername: '',
      action: ''
    },
    {
      sno: 3,
      parkingnumber: '103',
      tower: '',
      societyname: '',
      property: '',
      membername: '',
      action: ''

    },
    {
      sno: 4,
      parkingnumber: '103',
      tower: '',
      societyname: '',
      property: '',
      membername: '',
      action: ''
    }
  ]


  const [addparking, setaddparking] = useState(false);
  const [viewparking, setviewparking] = useState(false);

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addparking":
        setaddparking(true);
        break;

      case "viewparking":
        setviewparking(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addparking":
        setaddparking(false);
        break;

      case "viewparking":
        setviewparking(false);
        break;

    }
  };

  // type Row = {
  //   sno: number;
  //   loantype: string;
  //   loanperiod: number;
  //   loanamount: string;
  //   startdt: string;
  //   enddt: string;
  //   monthlyemi: number;

  // };



  // const [loandata, setloandata] = useState<any>([]);

  const tableData = {
    columns,
    data
  };


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Parking</span>
        </div>

        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addparking")}><i className="bi bi-plus"></i> Add Parking</span>
          <Modal show={addparking} size="xl" >
            <Modal.Header>
              <Modal.Title>Parking</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addparking"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
            <Row>

            <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society Name<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={societyname}
                      placeholder="Select name"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Member Name<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={membername}
                      placeholder="Select name"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

<hr className='w-100 mt-3 mb-1'/>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Parking Type<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={parkingtype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

              <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Parking Number<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Number'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Parking Area Sq. Ft.<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Parking Area'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Parking Type<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={parkingtype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Parking Nature<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={parkingnature}
                      placeholder="Select nature"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Parking Vehicle Type<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={parkingvehicletype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>



                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Status</Form.Label>
                    <Select
                      options={parkingstatus}
                      placeholder="Select status"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>
                <hr className='w-100 mt-3 mb-1'/>
                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Model</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Vehicle Model'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Type<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={vehicletype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>


                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Registered Owner Name</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Registered Owner Name'></Form.Control>
                  </Form.Group>
                </Col>


                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Registration Number</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Number'></Form.Control>
                  </Form.Group>
                </Col>

                <hr className='w-100 mt-3 mb-1'/>
                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Tenure (in months)</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>





                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Start Date</Form.Label>
                    <Form.Control type="date" className='form-control'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan End Date</Form.Label>
                    <Form.Control type="date" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Amount</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Loan amount'></Form.Control>
                  </Form.Group>
   </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Bank Name</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Bank name'></Form.Control>
                  </Form.Group>
                </Col>


              </Row>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addparking"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addparking"); }}>
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
              <Modal show={viewparking} >
                <Modal.Header>
                  <Modal.Title>Loan Details</Modal.Title>
                  <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("viewparking"); }}>
                    x
                  </Button>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                  <Row>
                    <Col xl={12}>
                      <Card className='box-shadow'>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                          <Col xl={6}>
                          <p className='mb-0 text-muted'>Car</p>
                          <p className='tx-16 tx-semibold'>243243545</p>
                          </Col>
                          <Col xl={6} className='text-end'>
                          <p className='mb-0 text-muted'>Property</p>
                          <p className='tx-15 tx-semibold'>A101</p>
                          </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={6}>
                            <p className='mb-0 text-muted'>Name</p>
                            <p className='tx-15 tx-semibold'>Rahul Sharma</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                            <p className='mb-0 text-muted'>Member</p>
                              <p className='tx-15 tx-semibold'>Owner</p>

                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Loan Period</p>
                              <p className='tx-15 tx-semibold'>10yrs</p>
                              <p className='mb-0 text-muted'>Start Date</p>
                              <p className='tx-15 tx-semibold'>10 June,2011</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>Loan Amount</p>
                              <p className='tx-15 tx-semibold text-primary'>₹ 20,00,000</p>
                              <p className='mb-0 text-muted'>End Date</p>
                              <p className='tx-15 tx-semibold'>10 June,2021</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <p className='mb-0 text-muted'>Monthly EMI</p>
                          <p className='tx-15 tx-semibold'>₹ 20,000</p>
                        </CardBody>
                        <CardBody className='p-2'>
                          <p className='mb-0 text-muted'>Bank Details</p>
                          <p className='tx-15 mb-0 tx-semibold'>HDFC Bank</p>
                          <p className='mb-0 text-muted'>Sec 22, Noida</p>
                        </CardBody>
                      </Card>
                      <Card className='box-shadow'>
                        <CardBody className='p-2'>
                          <p className='tx-15 pb-1 pt-1 border-bottom tx-semibold'>Documents</p>
                          <Row>
                            <Col xl={2}>
                              <img
                                alt="" className='w-100'
                                src={imagesData('pdficon')}
                              />
                            </Col>
                            <Col xl={9} className='p-0'>
                              <p className='tx-14 mb-0 mt-2 tx-semibold'>Loan Document Copy</p>
                              <Link to={``} className='text-info'>Download</Link>
                            </Col>
                          </Row>

                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Modal.Body>

              </Modal>


            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Fragment >
  );
}
