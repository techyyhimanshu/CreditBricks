import { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form, Tabs, Tab, Dropdown, ButtonGroup, FormLabel, FormGroup } from "react-bootstrap";
import DataTable, { Alignment } from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";
import { getAllAccountsApi, getAllPaymentLogsApi, getAllReceiptsApi } from '../../api/account-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { freeze } from '@reduxjs/toolkit';
import TestLoader from '../../layout/layoutcomponent/testloader';
export default function Accounts() {
  const [accountdata, setAccountdata] = useState<any>([]);
  const [paynow, setpaynow] = useState(false);
  const [cash, setcash] = useState(false);
  const [cheque, setcheque] = useState(false);
  const [otpverify, setotpverify] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [amountToPay, setAmountToPay] = useState(0)
  const [denominations, setDenominations] = useState([
    { value: 1000, count: 0, total: 0 },
    { value: 500, count: 0, total: 0 },
    { value: 200, count: 0, total: 0 },
    { value: 100, count: 0, total: 0 },
    { value: 50, count: 0, total: 0 },
    { value: 20, count: 0, total: 0 },
    { value: 10, count: 0, total: 0 },
    { value: 5, count: 0, total: 0 },
    { value: 2, count: 0, total: 0 },
    { value: 1, count: 0, total: 0 },
  ]);
  const [cashview, setcashview] = useState(false);
  const [chequeview, setchequeview] = useState(false);
  const [receiptData, setReceiptData] = useState([]);

  const propertyoption = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },
    { value: "3", label: "A103" }
  ];

  const paymenttype = [
    { value: "1", label: "Cash" },
    { value: "2", label: "Cheque" }
  ];


  const [select, setSelect] = useState(false);
  const [exportshow, setExport] = useState(false);

  const [receiptadd, setReceiptadd] = useState(false);
  const [receiptexportshow, setExportreceipt] = useState(false);
  const [cashViewData, setCashViewData] = useState<any>({});
  const [chequeViewData, setChequeViewData] = useState<any>({});
  const [paymentLogData, setPaymentLogData] = useState<any>([]);

  const columns = [
    {
      name: 'S.no',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '50px'
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Inv No',
      selector: (row: any) => row.invoiceNumber,
      sortable: true,
    },

    {
      name: 'Property',
      cell: (row: any) => (
        <Link to={`${import.meta.env.BASE_URL}property/propertyview/${row.propertyIdentifier}`} className='text-info'>{row.propertyName || ""}</Link>
      ),
      sortable: true,
    },

    {
      name: 'Inv Type',
      selector: (row: any) => row.type,
      sortable: true,

    },

    {
      name: 'Inv Dt',
      selector: (row: any) => row.invoiceCreatedDate,
      sortable: true,
    },


    {
      name: 'Due Dt',
      selector: (row: any) => row.dueDate,
      sortable: true,
    },

    {
      name: 'Total Amt',
      selector: (row: any) => row.totalAmount,
      sortable: true,
    },

    {
      name: 'Total Paid Amt',
      selector: (row: any) => row.totalPaidAmount,
      sortable: true,
    },

    {
      name: 'Total Outstanding',
      selector: (row: any) => row.totalOutstanding,
      sortable: true,
    },
    {
      name: 'Status',
      cell: (row: any) => (
        <span className={` ${row.status === 'Unpaid' ? 'text-danger' : 'text-success'}`}>
          {row.status}
        </span>
      ),
      sortable: true,

    },

    {
      name: 'Action',
      position: 'fixed',
      sortable: true,
      cell: (row: any) => <Dropdown>
        <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
          Action
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          {row.status === 'Unpaid' || row.status === 'Partially Paid' ? <Dropdown.Item onClick={() => { setAmountToPay(row.totalOutstanding); viewDemoShow("paynow") }}>Pay Now</Dropdown.Item> : ""}
          <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>,
    },
  ];

  const handleCountChange = (index: number, value: number) => {
    const updatedDenominations = [...denominations];
    updatedDenominations[index].count = value;
    updatedDenominations[index].total = updatedDenominations[index].value * value;

    setDenominations(updatedDenominations);
  };

  const calculateGrandTotal = () => {
    return denominations.reduce((total, denomination) => total + denomination.total, 0);
  };


  // const tableData = {
  //   columns,
  //   data,
  //   receiptcolumns,
  //   receiptdata
  // };
  const tableData = {
    columns,
    data: accountdata
  };

  const fetchAllAccounts = async () => {
    try {
      const response = await getAllAccountsApi()
      const data = response.data.data
      const formattedData = data.map((account: any, index: number) => (
        {
          sno: index + 1,
          name: account?.name,
          invoiceNumber: account?.invoiceNumber,
          propertyName: account?.property?.propertyName,
          status: account?.status,
          type: account?.type,
          dueDate: account?.dueDate,
          invoiceCreatedDate: account?.invoiceCreatedDate,
          totalAmount: account?.totalAmount,
          totalPaidAmount: account?.totalPaidAmount,
          propertyIdentifier: account.propertyIdentifier,
          totalOutstanding: account?.invoicePaymentOutstanding?.principleOutstanding * 1 + account?.invoicePaymentOutstanding?.interestOutstanding * 1,
        }

      ));
      setAccountdata(formattedData)
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllReceipts = async () => {
    try {
      const response = await getAllReceiptsApi()
      const data = response.data.data
      const formattedData = data.map((reciept: any, index: number) => (
        {
          sno: index + 1,
          receiptNumber: reciept?.receiptNumber,
          propertyIdentifier: reciept?.property?.propertyIdentifier,
          propertyName: reciept?.property?.propertyName,
          receiptType: reciept?.invoice?.type,
          totalAmountPaid: reciept?.paidAmount,
          onAccountBalance: reciept?.currentRemainingAmount,
          paymentMode: reciept?.paymentMode,
          date: reciept?.invoice?.billStartDate,
          createdDate: reciept?.loggedAt,
          cashData: reciept?.cash,
          chequeData: reciept?.cheque,
        }

      ));
      setReceiptData(formattedData)
    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllPaymentLogs = async () => {
    try {
      const response = await getAllPaymentLogsApi()
      const data = response.data.data
      const formattedData = data.map((paymentLog: any, index: number) => (
        {
          sno: index + 1,
          date: paymentLog?.createdAt,
          amount: paymentLog?.amount,
          chequeNumber: paymentLog?.cheque?.chequeNumber,
          paymentMethod: paymentLog?.paymentMethod,
          status: paymentLog?.paymentStatus,
        }
      ));
      setPaymentLogData(formattedData)

    } catch (error) {
      console.log(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchAllAccounts();
    fetchAllReceipts();
    fetchAllPaymentLogs();
  }, [])



  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "chequeview":
        setchequeview(true);
        break;

      case "cashview":
        setcashview(true);
        break;

      case "paynow":
        setpaynow(true);
        break;

      case "cash":
        setcash(true);
        setpaynow(false);
        break;

      case "cheque":
        setcheque(true);
        setpaynow(false);
        break;

      case "otpverify":
        setotpverify(true);
        setcheque(false);
        setpaynow(false);
        setcash(false);
        break;

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

      case "cashview":
        setcashview(false);
        setDenominations([
          { value: 1000, count: 0, total: 0 },
          { value: 500, count: 0, total: 0 },
          { value: 200, count: 0, total: 0 },
          { value: 100, count: 0, total: 0 },
          { value: 50, count: 0, total: 0 },
          { value: 20, count: 0, total: 0 },
          { value: 10, count: 0, total: 0 },
          { value: 5, count: 0, total: 0 },
          { value: 2, count: 0, total: 0 },
          { value: 1, count: 0, total: 0 },
        ])
        break;


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

      case "paynow":
        setpaynow(false);
        break;

      case "cash":
        setcash(false);
        break;

      case "cheque":
        setcheque(false);
        break;

      case "otpverify":
        setotpverify(false);
        break;

      case "chequeview":
        setchequeview(false);
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
                  <Row className='bg-light p-2'>
                    <Col xl={2}>
                      <Form.Group className="form-group mb-0">
                        <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                        <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group className="form-group mb-0">
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
                      <Form.Group className="form-group mb-0">
                        <Form.Label>Invoice ID <span className="text-danger">*</span></Form.Label>
                        <Form.Control type='text' placeholder='enter id' className='form-control'></Form.Control>
                      </Form.Group>
                    </Col>


                    <Col xl={2}>
                      <Form.Group className="form-group mb-0">
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
                        data={accountdata}
                        pagination
                        progressPending={isLoading}
                        progressComponent={<TestLoader />}


                      />
                    </DataTableExtensions>
                  </div>
                </Tab>
                <Tab eventKey="Receipt" title="Receipt">
                  <Row className='bg-light p-2'>
                    <Col xl={2}>
                      <Form.Group className="form-group mb-0">
                        <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                        <Form.Control type='date' placeholder='dd/mm/yyyy' className='form-control'></Form.Control>
                      </Form.Group>
                    </Col>

                    <Col xl={4}>
                      <Form.Group className="form-group mb-0">
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
                      <Form.Group className="form-group mb-0">
                        <Form.Label>Receipt ID <span className="text-danger">*</span></Form.Label>
                        <Form.Control type='text' placeholder='enter id' className='form-control'></Form.Control>
                      </Form.Group>
                    </Col>


                    <Col xl={2}>
                      <Form.Group className="form-group mb-0">
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
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Receipt No.</th>
                          <th>Property</th>
                          {/* <th>Memeber Name</th> */}
                          <th>Receipt Type</th>
                          <th>Total Paid Amount</th>
                          <th>On Account Balance</th>
                          <th>Payment Mode</th>
                          <th>Date</th>
                          <th>Created DT</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {receiptData.map((item: any, index: any) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.receiptNumber}</td>
                              <td>{<Link to={`/property/propertyview/${item.propertyIdentifier}`} className='text-info'>{item.propertyName}</Link>}</td>
                              {/* <td>{item.membername}</td> */}
                              <td>{item.receiptType}</td>
                              <td>{item.totalAmountPaid}</td>
                              <td>{item.onAccountBalance}</td>
                              {item.paymentMode === "Cash" ?
                                <td className='text-info cursor' onClick={() => {
                                  setCashViewData(item.cashData);
                                  viewDemoShow("cashview");
                                }}>{item.paymentMode}</td>
                                : <td className='text-info cursor' onClick={() => {
                                  setChequeViewData(item.chequeData);
                                  viewDemoShow("chequeview");
                                }}>{item.paymentMode}</td>}
                              <td>{item.date}</td>
                              <td>{item.createdDate}</td>
                              <td>
                                <Dropdown >
                                  <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                    Action
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item>Edit </Dropdown.Item>
                                    <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown></td>
                            </tr>
                          )
                        })}

                      </tbody>
                    </table>
                  </div>
                </Tab>

                <Tab eventKey="Ledger" title="Ledger" className='pt-2'>

                  <Row>
                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
                          <img src={imagesData('totalinvoice')} className="m-auto d-block" />

                        </Col>
                        <Col xl={9}>
                          <p className='mb-0 mt-3 tx-16'>Total Invoice</p>
                          <strong className='tx-20'><i className='fa fa-rupee'></i> 3500.00</strong><br />
                          <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>

                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
                          <img src={imagesData('totalreceipt')} className="m-auto d-block" />

                        </Col>
                        <Col xl={9}>
                          <p className='mb-0 mt-3 tx-16'>Total Receipt</p>
                          <strong className='tx-20'><i className='fa fa-rupee'></i> 2000.00</strong><br />
                          <small>Last 24 hours</small>
                        </Col>
                      </Row>
                    </Col>


                    <Col xl={4}>
                      <Row>
                        <Col xl={3} className='mt-3 mb-3'>
                          <img src={imagesData('totalbalance')} className="m-auto d-block" />

                        </Col>
                        <Col xl={9}>
                          <p className='mb-0 mt-3 tx-16'>Total Balance</p>
                          <strong className='tx-20'><i className='fa fa-rupee'></i> 1500.00</strong><br />
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

                <Tab eventKey="CashChequeLog" title="Cash & Cheque Log">
                  <Row className='bg-light p-2'>
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
                        <Form.Label>Payment Type <span className="text-danger">*</span></Form.Label>
                        <Select
                          options={paymenttype}
                          placeholder="Select type"
                          // classNamePrefix="selectform"
                          classNamePrefix='Select2' className="multi-select"
                        />
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

                    </Col>

                  </Row>
                  <div className="table-responsive ">
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Check Number</th>
                          <th>Payment Mode</th>
                          <th>Payee/Description</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>

                        {paymentLogData.map((item: any, index: any) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.date.split('T')[0]}</td>
                              <td>{item.amount}</td>
                              <td>{item.chequeNumber ? item.chequeNumber : '-'}</td>
                              <td>{item.paymentMethod}</td>
                              <td>{"-"}</td>
                              <td>{item.status}</td>
                              <td><Button type="button" className='btn btn-sm btn-success'><i className='bo bi-check-circle'></i>&nbsp; Verify</Button> </td>
                            </tr>

                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </Tab>

              </Tabs>



            </Card.Body>
          </Card>


          <Modal show={paynow} centered>
            <Modal.Header>
              <Modal.Title>Pay Now</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("paynow"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light pt-4'>
              <Col xl={12} className='w-100 tx-26 text-center tx-bold'><i className="fa fa-rupee"></i> {amountToPay}</Col>
              <Card className='m-3 p-4'>
                <h5>Choose your payment method</h5>
                <ul className='list-unstyled paymentmode mb-2'>
                  <li onClick={() => { viewDemoShow("cash"); }}>
                    <img alt="" src={imagesData('cash')} />
                    <span>Cash</span>
                  </li>
                  <li onClick={() => { viewDemoShow("cheque"); }}>
                    <img alt="" src={imagesData('cheque')} />
                    <span>Cheque</span>
                  </li>
                  <li>
                    <img alt="" src={imagesData('online')} />
                    <span>Online</span>
                  </li>
                </ul>
              </Card>
            </Modal.Body>

          </Modal>

          <Modal show={cash} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Cash</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("cash"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light p-0'>

              <Card className='m-3 p-3'>
                <Row>
                  <Col xl={6} className='border border-right pe-5'>
                    <h6>Enter the denomination:</h6>
                    <table className='table cashtable'>
                      <thead>
                        <tr>
                          <th>Currency</th>
                          <th></th>
                          <th>Number Count</th>
                          <th></th>
                          <th className='text-end'>Total</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                        <tr>
                          <td>2000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={5} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>10,000</td>
                        </tr>
                        <tr>
                          <td>1000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={8} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>8,000</td>
                        </tr>
                        <tr>
                          <td>500</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={4} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>2,000</td>
                        </tr>
                        <tr>
                          <td>200</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={6} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>1,200</td>
                        </tr>
                        <tr>
                          <td>100</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={5} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>500</td>
                        </tr>
                        <tr>
                          <td>50</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' value={2} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>100</td>
                        </tr>
                        <tr>
                          <td>20</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>0</td>
                        </tr>
                      </tbody> */}
                      <tbody>
                        {denominations.map((denomination, index) => (
                          <tr key={index}>
                            <td>{denomination.value}</td>
                            <td>X</td>
                            <td>
                              <Form.Control
                                className="form-control"
                                type="number"
                                value={denomination.count}
                                min="0"
                                onChange={(e) => handleCountChange(index, Number(e.target.value))}
                              />
                            </td>
                            <td>=</td>
                            <td className="text-end tx-semibold">
                              {denomination.total.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={4} className='text-white tx-semibold'>Grand Total</th>
                          <th className='text-end text-white'>{calculateGrandTotal().toLocaleString()}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </Col>
                  <Col xl={6} className='pt-5 ps-4'>
                    <Col xl={12} className='w-100 tx-26 text-center tx-bold mb-5'><i className="fa fa-rupee"></i> {calculateGrandTotal().toLocaleString()}</Col>
                    <FormGroup>
                      <FormLabel className='text-black'>Total Amount (in words)</FormLabel>
                      <Form.Control className='form-control' placeholder='Enter amount in words' type="text"></Form.Control>
                    </FormGroup>
                    <hr />
                    <FormGroup className='mt-3'>
                      <FormLabel className='text-black'>Mobile Number</FormLabel>
                      <Form.Control className='form-control' placeholder='Enter Number' type="text"></Form.Control>
                    </FormGroup>

                    <FormGroup className='mt-5'>
                      <Button className='btn btn-primary w-100' type='button' onClick={() => viewDemoShow("otpverify")}>Send OTP</Button>
                    </FormGroup>

                  </Col>
                </Row>

              </Card>
            </Modal.Body>

          </Modal>

          <Modal show={cheque} centered>
            <Modal.Header>
              <Modal.Title>Cheque</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("cheque"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light pt-2'>
              <Col xl={12} className='w-100 tx-26 text-center tx-bold'><i className="fa fa-rupee"></i> {amountToPay}</Col>
              <Card className='m-2 p-3'>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Date</FormLabel>
                      <Form.Control className='form-control' type="date" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Issued Date</FormLabel>
                      <Form.Control className='form-control' value={'3/31/2024'} type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Recived Date</FormLabel>
                      <Form.Control className='form-control' value={'3/31/2024'} type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Number</FormLabel>
                      <Form.Control className='form-control' type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Bank Name</FormLabel>
                      <Form.Control className='form-control' type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Branch</FormLabel>
                      <Form.Control className='form-control' type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Amount (in figures)</FormLabel>
                      <Form.Control className='form-control' type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Amount (in words)</FormLabel>
                      <Form.Control className='form-control' type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Mobile Number</FormLabel>
                      <Form.Control className='form-control' placeholder='Enter mobile number for verification' type="text" />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Button className='btn btn-primary w-100 mt-3' type="button" onClick={() => viewDemoShow("otpverify")}>Send OTP</Button>
                </FormGroup>

              </Card>
            </Modal.Body>

          </Modal>


          <Modal show={otpverify} centered>
            <Modal.Header>
              <Modal.Title>OTP Verification</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("otpverify"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='p-5 text-center'>

              <h4 className='text-black'>OTP Verification</h4>
              <p>Enter the 4 digit verification code</p>
              <Row>
                <Col xl={2}></Col>
                <Col xl={2}>
                  <Form.Control className='form-control' type="text" />
                </Col>

                <Col xl={2}>
                  <Form.Control className='form-control' type="text" />
                </Col>

                <Col xl={2}>
                  <Form.Control className='form-control' type="text" />
                </Col>

                <Col xl={2}>
                  <Form.Control className='form-control' type="text" />
                </Col>
                <Col xl={2}></Col>
              </Row>


              <FormGroup>
                <Col xl={8} className='m-auto'>
                  <Button className='btn btn-primary w-100 mt-4' type="button">Verify</Button>
                </Col>
              </FormGroup>
              <p className='text-info w-100 text-center mt-4'>Resend OTP</p>

            </Modal.Body>

          </Modal>

          <Modal show={cashview} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Cash</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("cashview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light p-0'>

              <Card className='m-3 p-3'>
                <Row>
                  <Col xl={6} className='border border-right pe-5'>
                    <h6>Enter the denomination:</h6>
                    <table className='table cashtable'>
                      <thead>
                        <tr>
                          <th>Currency</th>
                          <th></th>
                          <th>Number Count</th>
                          <th></th>
                          <th className='text-end'>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                          <td>2000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={5} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>10,000</td>
                        </tr>
                        <tr>
                          <td>1000</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={8} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>8,000</td>
                        </tr> */}
                        <tr>
                          <td>500</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['500'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['500'] ?? 0) * 500).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>200</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['200'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['200'] ?? 0) * 200).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>100</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['100'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['100'] ?? 0) * 100).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>50</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled value={cashViewData?.notesDetails?.['50'] ?? 0} type="text"></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['50'] ?? 0) * 50).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>20</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['20'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['20'] ?? 0) * 20).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['10'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['10'] ?? 0) * 10).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['5'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['5'] ?? 0) * 5).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['2'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['2'] ?? 0) * 2).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>X</td>
                          <td><Form.Control className='form-control' disabled type="text" value={cashViewData?.notesDetails?.['1'] ?? 0}></Form.Control></td>
                          <td>=</td>
                          <td className='text-end tx-semibold'>{((cashViewData?.notesDetails?.['1'] ?? 0) * 1).toLocaleString()}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={4} className='text-white tx-semibold'>Grand Total</th>
                          <th className='text-end text-white'>{(cashViewData?.amountInFigures * 1).toLocaleString()}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </Col>
                  <Col xl={6} className='pt-5 ps-4'>
                    <Col xl={12} className='w-100 tx-26 text-center tx-bold mb-5'><i className="fa fa-rupee"></i>{(cashViewData?.amountInFigures * 1).toLocaleString()}</Col>
                    <FormGroup>
                      <FormLabel className='text-black'>Total Amount (in words)</FormLabel>
                      <Form.Control className='form-control' value={cashViewData?.amountInWords} type="text"></Form.Control>
                    </FormGroup>
                    <hr />
                    <FormGroup className='mt-3'>
                      <FormLabel className='text-black'>Mobile Number</FormLabel>
                      <Form.Control className='form-control' value={"0000000000"} disabled type="text"></Form.Control>
                    </FormGroup>


                  </Col>
                </Row>

              </Card>
            </Modal.Body>

          </Modal>

          <Modal show={chequeview} centered>
            <Modal.Header>
              <Modal.Title>Cheque</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("chequeview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light pt-2'>
              <Col xl={12} className='w-100 tx-26 text-center tx-bold'><i className="fa fa-rupee"></i>{(chequeViewData?.amountInFigures * 1).toLocaleString()}</Col>
              <Card className='m-2 p-3'>
                <Row>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Date</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.chequeDate} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Issued Date</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.chequeDate} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Recived Date</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.createdAt} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={6}>
                    <FormGroup>
                      <FormLabel>Cheque Number</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.chequeNumber} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Bank Name</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.bankName} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Branch</FormLabel>
                      <Form.Control className='form-control' value={chequeViewData?.branchName} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Amount (in figures)</FormLabel>
                      <Form.Control className='form-control' value={(chequeViewData?.amountInFigures * 1).toLocaleString()} disabled type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Amount (in words)</FormLabel>
                      <Form.Control className='form-control' disabled value={chequeViewData?.amountInWords} type="text" />
                    </FormGroup>
                  </Col>
                  <Col xl={12}>
                    <FormGroup>
                      <FormLabel>Mobile Number</FormLabel>
                      <Form.Control className='form-control' value={"000000000"} disabled type="text" />
                    </FormGroup>
                  </Col>
                </Row>

              </Card>
            </Modal.Body>

          </Modal>


        </Col>
      </Row>


    </Fragment >
  );
}
