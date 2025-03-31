import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Dropdown, Modal, Button, CardBody } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";
import { addNewLoanApi, deleteLoanApi, getAllLoansApi, updateLoanApi } from '../../api/loan-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
import LoanModal from '../../common/modals/loanModal';
import LoanViewModal from '../../common/modals/loanViewModal';


export default function Loans() {

  const columns = [
    {
      name: 'S.No',
      selector: (row: any) => row.sno,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Loan Number',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => { setSingleLoanData(row), viewDemoShow("viewloan") }}>{row.loanNumber}</span>
      ),
      sortable: true,
    },

    {
      name: 'Property',
      selector: (row: any) => row.propertyName,
      sortable: true,
    },
    {
      name: 'Member',
      selector: (row: any) => row.memberType,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row: any) => row.fullName,
      sortable: true,
    },
    {
      name: 'Loan Type',
      selector: (row: any) => row.type,
      sortable: true,
    },


    {
      name: 'Loan Period',
      selector: (row: any) => row.period,
      sortable: true,
    },
    {
      name: 'Loan Amount',
      selector: (row: any) => row.amount,
      sortable: true,
    },

    {
      name: 'Monthly EMI',
      selector: (row: any) => row.monthlyEmi,
      sortable: true,
    },

    {
      name: 'Action',
      sortable: true,
      cell: (row:any) => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {setSingleLoanData(row),setEditing(true),viewDemoShow("addloan")}}>Edit </Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];
  const [addloan, setaddloan] = useState(false);
  const [viewloan, setviewloan] = useState(false);
  const [singleLoanData, setSingleLoanData] = useState<any>(null);
  const [loanData, setLoanData] = useState<any>([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {

    fetchAllLoans();
  }, []);

  const fetchAllLoans = async () => {
    try {
      const response = await getAllLoansApi()
      if (response.status === 200) {
        const formattedData = response.data.data.map((complaint: any, index: number) => {
          return {
            sno: index + 1,
            loanIdentifier: complaint?.loanIdentifier || "",
            type: complaint?.type || "",
            memberType: complaint?.memberType || "",
            fullName: complaint?.fullName || "",
            loanNumber: complaint?.loanNumber || "",
            period: complaint?.period || "",
            amount: complaint?.amount || "",
            monthlyEmi: complaint?.monthlyEmi || "",
            startDate: complaint?.startDate || "",
            endDate: complaint?.endDate || "",
            propertyIdentifier: complaint?.propertyIdentifier || "",
            propertyName: complaint?.propertyIdentifier || "",
            bankName: complaint?.bankName || "",
            bankAddress: complaint?.bankAddress || "",
            loanFilePath: complaint?.loanFilePath || "",
          }
        })
        setLoanData(formattedData);
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }
  }

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addloan":
        setaddloan(true);
        break;

      case "viewloan":
        setviewloan(true);
        setEditing(false)
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addloan":
        setaddloan(false);
        setEditing(false)
        break;

      case "viewloan":
        setviewloan(false);
        setEditing(false)
        break;

    }
  };

  const tableData = {
    columns,
    data: loanData
  };

  const handleSubmit = async (values: any) => {
    const formattedData: any = {
      noticeSubject: values.subject,
      type: values.type.value,
      memberType: values.memberType.value,
      period: values.period.value,
      fullName: values.fullName,
      loanNumber: values.loanNumber,
      amount: values.amount,
      monthlyEmi: values.monthlyEmi,
      startDate: values.startDate,
      endDate: values.endDate,
      bankName: values.bankName,
      bankAddress: values.bankAddress,
    }
    // if (values?.tower?.value) {
    //   formattedData.towerIdentifier = values.tower.value
    // }
    // if (values?.wing?.value) {
    //   formattedData.wingIdentifier = values.wing.value
    // }
    if (values?.property?.value) {
      formattedData.propertyIdentifier = values.property.value
    }

    if (values.file) {
      formattedData.loanFile = values.file
    }
    try {
      let response;
      if (editing) {
        response = await updateLoanApi(formattedData, singleLoanData?.loanIdentifier)
      } else {
        response = await addNewLoanApi(formattedData)
      }
      if (response.status === 200) {
        viewDemoClose("addloan");
        showToast("success", response.data.message)
        fetchAllLoans()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      setSingleLoanData(null)
    }
    viewDemoClose("addloan")
  }

  const handleDelete = (row: any) => {
        ; (async () => {
          try {
  
            const response = await deleteLoanApi(row.loanIdentifier)
            if (response.status === 200) {
              showToast("success", response.data.message)
              // Remove the society from the table
              setLoanData((prevData: any) => prevData.filter((society: any) => society.loanIdentifier !== row.loanIdentifier))
            }
          } catch (error: any) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
          }
        })()
    }

  const handleClose = () => {
    viewDemoClose("addloan")
    setSingleLoanData(null)
  }

  const handleViewClose = () => {
    viewDemoClose("viewloan")
    setSingleLoanData(null)
  }


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Loan</span>
        </div>

        <div className="right-content">
          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addloan")}><i className="bi bi-plus"></i> Add Loan</span>
          {/* <Modal show={addloan} size="lg" >
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
                    <Form.Label>Property<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Member Type<span className="text-danger">*</span></Form.Label>
                    <Select
                      options={member}
                      placeholder="Select member"
                      classNamePrefix="Select2"
                    />
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Name<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='Name'></Form.Control>
                  </Form.Group>
                </Col>

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
          </Modal> */}
          {
            singleLoanData && addloan ? <LoanModal show={addloan} onClose={handleClose} editing={editing} initialVals={singleLoanData} onSave={handleSubmit} /> : <LoanModal show={addloan} onClose={handleClose} editing={editing} onSave={handleSubmit} />
          }
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
                    data={loanData}
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
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Loan Number</p>
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
              {
                viewloan&&singleLoanData&&<LoanViewModal show={viewloan} onClose={handleViewClose} initialVals={singleLoanData}/>
              }


            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CustomToastContainer />
    </Fragment >
  );
}
