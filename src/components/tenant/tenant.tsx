import { Fragment, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Form, Button, CardBody } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";


export default function Tenant() {


  const columns = [
    {
      name: 'S.No',
      selector: row => row.sno,
      sortable: true,
      width: "80px"                       // added line here
   },
   {
    name: 'Society Name',
    cell: (row: Row) => (
      <Link className='text-info cursor' to={``}>Mohan Areca Co-Op Housing Society Limited</Link>
    ),

    sortable: true,
  },
  {
    name: 'Property Name',
    cell: (row: Row) => (
      <Link className='text-info cursor' to={``}>A101</Link>
    ),

    sortable: true,
  },
    {
      name: 'Tenant Name',
      cell: (row: Row) => (
        <Link className='text-info cursor' to={`${import.meta.env.BASE_URL}tenant/tenantview`}>Rajiv Sharma</Link>
      ),

      sortable: true,
    },

    {
      name: 'Tenant Number',
      selector: row => row.tenantnumber,
      sortable: true,
    },

    {
      name: 'Tenant Email',
      selector: row => row.tenantemail,
      sortable: true,
    },

    {
      name: 'Tenant Address',
      selector: row => row.tenentaddress,
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
      tenantname: 'Rajiv Sharma',
      tenantnumber: '9876543212',
      tenantemail: 'rajiv@gmail.com',
     tenentaddress: 'Sector 22, Noida',
      action: ''

    },
    {
      sno: 2,
      tenantname: 'Rajiv Sharma',
      tenantnumber: '9876543212',
      tenantemail: 'rajiv@gmail.com',
     tenentaddress: 'Sector 22, Noida',
      action: ''
    },
    {
      sno: 3,
      tenantname: 'Rajiv Sharma',
      tenantnumber: '9876543212',
      tenantemail: 'rajiv@gmail.com',
     tenentaddress: 'Sector 22, Noida',
      action: ''

    },
    {
      sno: 4,
      tenantname: 'Rajiv Sharma',
      tenantnumber: '9876543212',
      tenantemail: 'rajiv@gmail.com',
     tenentaddress: 'Sector 22, Noida',
      action: ''
    }
  ]


  const [addtenant, setaddtenant] = useState(false);
  const [viewloan, setviewloan] = useState(false);

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addtenant":
        setaddtenant(true);
        break;

      case "viewloan":
        setviewloan(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addtenant":
        setaddtenant(false);
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
          <span className="main-content-title mg-b-0 mg-b-lg-1">Tenant</span>
        </div>

        <div className="right-content">
          <Link to={`${import.meta.env.BASE_URL}tenant/addtenant`} className='float-end btn btn-primary btn-sm'><i className="bi bi-plus"></i> Add Tenant</Link>
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
