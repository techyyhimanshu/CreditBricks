import { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Tabs, Tab, Dropdown, ButtonGroup } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";

const columns = [
  {
    name: 'S.No.',
    selector: row => row.sno,
    sortable: true,
  },
  {
    name: 'Name',
    cell: () => <Link className="text-primary">IV-2703 </Link>,
    sortable: true,
  },
  {
    name: 'Invoice Number',
    selector: row => row.invoicenumber,
    sortable: true,
  },

  {
    name: 'Property',
    cell: (row: Row) => (
      <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='text-info'>A101</Link>
    ),
    sortable: true,
  },

  {
    name: 'Invoice Type',
    selector: row => row.invctype,
    sortable: true,
  },

  {
    name: 'Invoice Dt',
    selector: row => row.invcdt,
    sortable: true,
  },


  {
    name: 'Due Dt',
    selector: row => row.duedt,
    sortable: true,
  },

  {
    name: 'Total Amt',
    selector: row => row.totalamt,
    sortable: true,
  },

  {
    name: 'Total Paid Amt',
    selector: row => row.totalpaidamt,
    sortable: true,
  },

  {
    name: 'Total Outstanding',
    selector: row => row.totaloutstanding,
    sortable: true,
  },

  {
    name: 'Action',
    sortable: true,
    cell: () => <Dropdown >
    <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
     Action
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item>Edit</Dropdown.Item>
      <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
</Dropdown.Menu>
  </Dropdown>,
  },
];

const data = [
  {
    id: 1,
    sno: '1',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
  {
    id: 2,
    sno: '2',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
  {
    id: 3,
    sno: '3',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
  {
    id: 4,
    sno: '4',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
  {
    id: 5,
    sno: '5',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
  {
    id: 6,
    sno: '6',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
  {
    id: 7,
    sno: '7',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
  {
    id: 8,
    sno: '8',
    name: '',
    invoicenumber: '1',
    property: '800',
    invctype: 'Maintenance',
    invcdt: '8/16/2024',
    duedt: '4/15/2024',
    totalamt:'₹2,850.00',
    totalpaidamt:'₹2,850.00',
    totaloutstanding:'₹0.00',
  },
]

const receiptcolumns = [
  {
    name: 'S.No.',
    selector: row => row.sno,
    sortable: true,
  },
  {
    name: 'Date',
    selector: row => row.date,
    sortable: true,
  },
  {
    name: 'Receipt ID',
    cell: () => <Link className="text-primary">#RECPT457476 </Link>,
    sortable: true,
  },

  {
    name: 'Amount',
    cell: () => <span><i className="bi bi-currency"></i> 800.00 </span>,
    sortable: true,
  },

  {
    name: 'Action',
    sortable: true,
    cell: () => <button type="button" className="btn btn-light btn-sm">Edit</button>,
  },
];

const receiptdata = [
  {
    id: 1,
    sno: '1',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',


  },
  {
    id: 2,
    sno: '2',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',
  },
  {
    id: 3,
    sno: '3',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',
  },
  {
    id: 4,
    sno: '4',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',
  },
  {
    id: 5,
    sno: '5',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',
  },
  {
    id: 6,
    sno: '6',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',
  },
  {
    id: 7,
    sno: '7',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',
  },
  {
    id: 8,
    sno: '8',
    date: '12/12/2024',
    invoiceid: 'Tax',
    amt: '800',
  },
]

export default function Accounts() {


  const societyoptions = [
    { value: "1", label: "SKVilla Society" },
    { value: "2", label: "GreenGlobal Society" },
    { value: "3", label: "Dewan Enclave Society" }
  ];

  const propertyoption = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },
    { value: "3", label: "A103" }
  ];

  const [select, setSelect] = useState(false);
  const [exportshow, setExport] = useState(false);

  const [receiptadd, setReceiptadd] = useState(false);
  const [receiptexportshow, setExportreceipt] = useState(false);

  const tableData = {
    columns,
    data,
    receiptcolumns,
    receiptdata
  };



  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "select":
        setSelect(true);
        break;

      case "exportshow":
        setExport(true);
        break;

      case "receiptadd":
        setReceiptadd(true);
        break;

      case "receiptexportshow":
        setExportreceipt(true);
        break;



    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "select":
        setSelect(false);
        break;

      case "exportshow":
        setExport(false);
        break;

      case "receiptadd":
        setReceiptadd(false);
        break;

      case "receiptexportshow":
        setExportreceipt(false);
        break;

    }
  };


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Accounts</span>
        </div>

        {/* <div className="right-content">

          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Filter</Tooltip>}>
            <button type="button" className="btn btn-dark p-1 pe-2 ps-2 me-1" data-bs-placement="bottom"
              data-bs-toggle="tooltip" title="Filter"><i className="bi bi-funnel"></i></button>
          </OverlayTrigger>
        </div> */}
      </div>

      <Row>
        <Col xl={12}>
          <Card>
            <Card.Body>
              <Tabs
                defaultActiveKey="Tab 01"
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-1"
                transition={false}
              >

                <Tab eventKey="Tab 01" title="Invoice">
                <Row className='bg-light'>
                      <Col xl={2}>
                       <Form.Group className="form-group">
                            <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                            <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
                          </Form.Group>
                      </Col>

                      <Col xl={4}>
                      <Form.Group className="form-group">
                            <Form.Label>Property Name<span className="text-danger">*</span></Form.Label>

                            <div className="SlectBox">
                              <Select
                                options={propertyoption}
                                placeholder="Select Property"
                                // classNamePrefix="selectform"
                                classNamePrefix='Select2' className="multi-select"
                              />
                            </div>


                          </Form.Group>
                      </Col>

                      <Col xl={2}>
                      <Form.Group className="form-group">
                            <Form.Label>Invoice ID <span className="text-danger">*</span></Form.Label>
                            <Form.Control type='text' placeholder='enter id' className='form-control'></Form.Control>
                          </Form.Group>
                      </Col>


                      <Col xl={2}>
                      <Form.Group className="form-group">
                            <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                            <Form.Control type='text' placeholder='enter amount' className='form-control'></Form.Control>
                          </Form.Group>
                      </Col>

                      <Col xl={2}>
                      <Form.Label className='mb-4'></Form.Label>
                      <button type="button" className="btn btn-primary mt-1 me-1" onClick={() => viewDemoShow("select")}>Search</button>
                      <button type="button" className="btn btn-info mt-1" onClick={() => viewDemoShow("exportshow")}>Import</button>
                    <Modal centered show={exportshow}>
                      <Modal.Header>
                        <Modal.Title>Import</Modal.Title>
                        <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("exportshow"); }}>
                          x
                        </Button>
                      </Modal.Header>
                      <Modal.Body>

                        <p>Browse or Drop the file</p>
                        <Form.Group className="form-group">
                          <div className='textnone'>
                            <input type='file' className='fileupload' />
                            <p>Drag & Drop your file here or click</p>
                          </div>

                          <div className='upload-data'>
                            <div><i className='bi bi-file-earmark-text-fill me-1 text-primary'></i> invoice.xls</div>
                            <div><i className='bi bi-x-circle float-end cursor text-danger'></i></div>
                          </div>



                        </Form.Group>


                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="default" onClick={() => { viewDemoClose("exportshow"); }}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={() => { viewDemoClose("exportshow"); }}>
                          Save
                        </Button>

                      </Modal.Footer>
                    </Modal>
                      </Col>

                    </Row>

                  <div className="table-responsive ">
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={columns}
                        data={data}
                        pagination


                      />
                    </DataTableExtensions>
                  </div>
                </Tab>
                <Tab eventKey="Receipt" title="Receipt">
                <Row className='bg-light'>
                      <Col xl={2}>
                       <Form.Group className="form-group">
                            <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                            <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
                          </Form.Group>
                      </Col>

                      <Col xl={4}>
                      <Form.Group className="form-group">
                            <Form.Label>Property Name<span className="text-danger">*</span></Form.Label>

                            <div className="SlectBox">
                              <Select
                                options={propertyoption}
                                placeholder="Select Property"
                                // classNamePrefix="selectform"
                                classNamePrefix='Select2' className="multi-select"
                              />
                            </div>


                          </Form.Group>
                      </Col>

                      <Col xl={2}>
                      <Form.Group className="form-group">
                            <Form.Label>Receipt ID <span className="text-danger">*</span></Form.Label>
                            <Form.Control type='text' placeholder='enter id' className='form-control'></Form.Control>
                          </Form.Group>
                      </Col>


                      <Col xl={2}>
                      <Form.Group className="form-group">
                            <Form.Label>Amount <span className="text-danger">*</span></Form.Label>
                            <Form.Control type='text' placeholder='enter amount' className='form-control'></Form.Control>
                          </Form.Group>
                      </Col>

                      <Col xl={2}>
                      <Form.Label className='mb-4'></Form.Label>
                      <button type="button" className="btn btn-primary mt-1 me-1" onClick={() => viewDemoShow("select")}>Search</button>
                      <button type="button" className="btn btn-info mt-1" onClick={() => viewDemoShow("exportshow")}>Import</button>
                    <Modal centered show={exportshow}>
                      <Modal.Header>
                        <Modal.Title>Import</Modal.Title>
                        <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("exportshow"); }}>
                          x
                        </Button>
                      </Modal.Header>
                      <Modal.Body>

                        <p>Browse or Drop the file</p>
                        <Form.Group className="form-group">
                          <div className='textnone'>
                            <input type='file' className='fileupload' />
                            <p>Drag & Drop your file here or click</p>
                          </div>

                          <div className='upload-data'>
                            <div><i className='bi bi-file-earmark-text-fill me-1 text-primary'></i> invoice.xls</div>
                            <div><i className='bi bi-x-circle float-end cursor text-danger'></i></div>
                          </div>



                        </Form.Group>


                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="default" onClick={() => { viewDemoClose("exportshow"); }}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={() => { viewDemoClose("exportshow"); }}>
                          Save
                        </Button>

                      </Modal.Footer>
                    </Modal>
                      </Col>

                    </Row>
                  <div className="table-responsive ">
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={receiptcolumns}
                        data={receiptdata}
                        pagination


                      />
                    </DataTableExtensions>
                  </div>
                </Tab>

                <Tab eventKey="Ledger" title="Ledger" className='pt-2'>

                  <Row>
                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
  <img src={imagesData('totalinvoice')} className="m-auto d-block"  />

                        </Col>
                        <Col xl={9}>
                        <p className='mb-0 mt-3 tx-16'>Total Invoice</p>
                        <strong className='tx-20'><i className='fa fa-rupee'></i> 3500.00</strong><br/>
                        <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
  <img src={imagesData('totalreceipt')} className="m-auto d-block"  />

                        </Col>
                        <Col xl={9}>
                        <p className='mb-0 mt-3 tx-16'>Total Receipt</p>
                        <strong className='tx-20'><i className='fa fa-rupee'></i> 2000.00</strong><br/>
                        <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>


                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
  <img src={imagesData('totalbalance')} className="m-auto d-block"  />

                        </Col>
                        <Col xl={9}>
                        <p className='mb-0 mt-3 tx-16'>Total Balance</p>
                        <strong className='tx-20'><i className='fa fa-rupee'></i> 1500.00</strong><br/>
                        <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={9}>
                    <h5 className='tx-semibold mt-3'>Transactions</h5>
                    </Col>
                    <Col xl={3}>
                    <ButtonGroup className="ms-2 mt-2 mb-2 w-100 transactionbtn">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant=""
                      aria-expanded="false"
                      aria-haspopup="true"
                      className={`btn btn-light w-100`}
                      data-bs-toggle="dropdown"
                      id="dropdownMenuButton"
                      type="button"
                    >
                      Daily
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className="dropdown-menu tx-13"
                      style={{ margin: "0px" }}
                    >
                      <Dropdown.Item href="#">
                       Daily
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                       Current Week
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                       Last Week
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        Current Month
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        Last Month
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        Last Six Month
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        All Data
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonGroup>
                    </Col>
                  </Row>
                  <table className='table mt-2'>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Particular</th>
                        <th className='text-end'>Debit</th>
                        <th className='text-end'>Credit</th>
                        <th className='text-end'>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td className='tx-bold' >Opening B/L</td>
                        <td></td>
                        <td></td>
                        <td className='text-end tx-bold'>2900.00</td>
                      </tr>
                      <tr>
                        <td>03/Dec/2024</td>
                        <td>Electricity Charges</td>
                        <td className='text-end text-danger'></td>
                        <td className='text-end'>1500.00</td>
                        <td className='text-end'>2900.00</td>
                      </tr>

                      <tr>
                        <td>22/Nov/2024</td>
                        <td>Lift Charges</td>
                        <td className='text-end text-danger'>800.00</td>
                        <td className='text-end'></td>
                        <td className='text-end'>1400.00</td>
                      </tr>

                      <tr>
                        <td>15/Nov/2024</td>
                        <td>Water Charges</td>
                        <td className='text-end text-danger'>500.00</td>
                        <td className='text-end'></td>
                        <td className='text-end'>2200.00</td>
                      </tr>

                      <tr>
                        <td>16/Oct/2024</td>
                        <td>Electricity Charges</td>
                        <td className='text-end text-danger'></td>
                        <td className='text-end'>300.00</td>
                        <td className='text-end'>2700.00</td>
                      </tr>
                      <tr>
                        <td>09/Oct/2024</td>
                        <td>Lift Charges</td>
                        <td className='text-end text-danger'></td>
                        <td className='text-end'>2000.00</td>
                        <td className='text-end'>2400.00</td>
                      </tr>

                      <tr>
                        <td>10/Sep/2024</td>
                        <td>Lift Charges</td>
                        <td className='text-end text-danger'>1100.00</td>
                        <td className='text-end'></td>
                        <td className='text-end'>1500.00</td>
                      </tr>

                      <tr>
                        <td></td>
                        <td className='tx-bold'>Closing B/L</td>
                        <td className='text-end tx-bold'>2400.00</td>
                        <td className='text-end tx-bold'>3800.00</td>
                        <td className='text-end tx-bold'>5600.00</td>
                      </tr>

                    </tbody>
                  </table>
                </Tab>
              </Tabs>



            </Card.Body>
          </Card>
        </Col>
      </Row>


    </Fragment>
  );
}
