import { Fragment, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Form, Button, CardBody } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";


export default function Loans() {

  const loantype = [
    { value: "1", label: "Home" },
    { value: "2", label: "Vehicle" },
  ]

  const loanperiod = [
    { value: "1", label: "5yrs" },
    { value: "2", label: "10yrs" },
    { value: "3", label: "15yrs" },
    { value: "4", label: "20yrs" },
    { value: "5", label: "25yrs" },
    { value: "6", label: "30yrs" },
  ]

  const columns = [
    {
      name: 'S.No',
      selector: row => row.sno,
      sortable: true,
    },
    {
      name: 'Loan Type',
      selector: row => row.loantype,
      sortable: true,
    },

    {
      name: 'Loan Number',
      cell: (row: Row) => (
        <span className='text-info cursor' onClick={() => viewDemoShow("viewloan")}>243243545</span>
      ),
      sortable: true,
    },

    {
      name: 'Loan Period',
      selector: row => row.loanperiod,
      sortable: true,
    },
    {
      name: 'Loan Amount',
      selector: row => row.loanamt,
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: row => row.startdt,
      sortable: true,
    },
    {
      name: 'End Date',
      selector: row => row.enddt,
      sortable: true,
    },
    {
      name: 'Monthly EMI',
      selector: row => row.monthlyemi,
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
      loantype: 'Home',
      loannumber: '',
      loanperiod: '10yrs',
      loanamt: '₹ 20,00,000',
      startdt: '12/02/2011',
      enddt: '12/02/2021',
      monthlyemi: '₹ 20,000',
      action: ''

    },
    {
      sno: 2,
      loantype: 'Vehicle',
      loannumber: '',
      loanperiod: '5yrs',
      loanamt: '₹ 50,000',
      startdt: '12/02/2025',
      enddt: '12/02/2025',
      monthlyemi: '₹ 5,000',
      action: ''
    },
    {
      sno: 3,
      loantype: 'Home',
      loannumber: '',
      loanperiod: '10yrs',
      loanamt: '₹ 20,00,000',
      startdt: '12/02/2011',
      enddt: '12/02/2021',
      monthlyemi: '₹ 20,000',
      action: ''

    },
    {
      sno: 4,
      loantype: 'Vehicle',
      loannumber: '',
      loanperiod: '5yrs',
      loanamt: '₹ 50,000',
      startdt: '12/02/2025',
      enddt: '12/02/2025',
      monthlyemi: '₹ 5,000',
      action: ''
    }
  ]


  const [addloan, setaddloan] = useState(false);
  const [viewloan, setviewloan] = useState(false);

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addloan":
        setaddloan(true);
        break;

      case "viewloan":
        setviewloan(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addloan":
        setaddloan(false);
        break;

      case "viewloan":
        setviewloan(false);
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
          <span className="main-content-title mg-b-0 mg-b-lg-1">Loan</span>
        </div>

        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addloan")}><i className="bi bi-plus"></i> Add Loan</span>
          <Modal show={addloan} size="lg" >
            <Modal.Header>
              <Modal.Title>Loan</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addloan"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={loantype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Number<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Loan number'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Period<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={loanperiod}
                      placeholder="Search period"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Amount<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Loan amount'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="date" className='form-control'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="date" className='form-control'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Monthly EMI<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='EMI'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Bank Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Bank name'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Bank Address</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Address'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Loan Scan Copy
                      <small className='float-end'>Upload Size: Max 2MB</small>
                    </Form.Label>
                    <Form.Control type="file" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addloan"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addloan"); }}>
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
              <Modal show={viewloan} >
                <Modal.Header>
                  <Modal.Title>Loan Details</Modal.Title>
                  <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("viewloan"); }}>
                    x
                  </Button>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                  <Row>
                    <Col xl={12}>
                      <Card className='box-shadow'>
                        <CardBody className='border-bottom p-2'>
                          <p className='mb-0 text-muted'>Car</p>
                          <p className='tx-16 tx-semibold'>243243545</p>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Loan Period</p>
                              <p className='tx-15 tx-semibold'>10yrs</p>
                              <p className='mb-0 text-muted'>Start Date</p>
                              <p className='tx-15 tx-semibold'>June 10,2011</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>Loan Amount</p>
                              <p className='tx-15 tx-semibold text-primary'>₹ 20,00,000</p>
                              <p className='mb-0 text-muted'>End Date</p>
                              <p className='tx-15 tx-semibold'>June 10,2021</p>
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
