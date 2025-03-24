
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Form, Dropdown, Tabs, Tab, FormLabel, FormCheck, Button, Modal, FormControl } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { getSocietyDetailsApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { deletePropertyApi } from '../../../api/property-api';
import { handleApiError } from '../../../helpers/handle-api-error';

export default function SocietyView() {
  const [singleSocietyData, setSingleSocietydata] = useState<any>([])
  const navigate = useNavigate();
  const params = useParams()
  const identifier = params.identifier as string

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await getSocietyDetailsApi(identifier)
        setSingleSocietydata(response?.data?.data || [])
      } catch (error) {

      }
    }
    if (identifier) {
      fetchPropertyData()
    }
  }, [])
  const chargename = [
    { value: "1", label: "--None--" },
    { value: "2", label: "Lift Charges" },
    { value: "3", label: "Electricity Charges" },
    { value: "4", label: "Water Charges" },
  ]

  const property = [
    { value: "1", label: "A101 (Mr. Vinod Kumar Pandia)" },
    { value: "2", label: "A102 (Mrs. Rohini Sharma)" },
  ]

  const chargemastertype = [
    { value: "1", label: "--None--" },
    { value: "2", label: "Society" },
    { value: "3", label: "Property" },
  ]

  const societyname = [
    { value: "1", label: "Society 1" },
    { value: "2", label: "Society 2" },
  ]

  const wing = [
    { value: "1", label: "A" },
    { value: "2", label: "A" },
  ]

  const chargetype = [
    { value: "1", label: "--None--" },
    { value: "2", label: "Maintenance" },
    { value: "3", label: "Application" },
  ]

  const billingtype = [
    { value: "1", label: "--None--" },
    { value: "2", label: "PSF" },
    { value: "3", label: "Lumpsum" },
    { value: "4", label: "Narration" },
  ]

  const [addcharge, setaddcharge] = useState(false);
  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addcharge":
        setaddcharge(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addcharge":
        setaddcharge(false);
        break;

    }
  };

  const handleDelete = async (propertyIdentifier: string) => {
    try {
      const response = await deletePropertyApi(propertyIdentifier)
      if (response.status === 200) {
        showToast("success", response.data.message)
      }
    } catch (error: any) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> <Link to={`${import.meta.env.BASE_URL}society/societymaster`} className="p-1 pe-2 ps-2 me-1"><i className='bi bi-arrow-left'></i> </Link> Society - {singleSocietyData?.societyName || "N/A"}</span>
        </div>
      </div>


      <Row>

        <Col xl={12} className='ps-0 pe-0'>

          <div className="tab-menu-heading">
            <div className="tabs-menu1">
              <Tabs defaultActiveKey="Details" className="panel-tabs bd_bottom main-nav-line bd-b-0 mb-1">
                <Tab eventKey="Details" title="Details">
                  <div className="tabs-menu-body main-content-body-right" id="Details">
                    <Row>
                      <Col xl={8}>
                        <Card className='m-3'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Personal Details</h5>
                            <Row>
                              <Col xl={12}>
                                <FormLabel>Society Name</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.societyName || "N/A"}</p>
                              </Col>


                              <Col xl={6}>
                                <FormLabel>Society Contact Number</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.contactNumber || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Society Email</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.email || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Society Manager</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.societyManager || "N/A"}</p>
                              </Col>


                              <Col xl={6}>
                                <FormLabel>Address</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.address || "N/A"}</p>
                              </Col>



                              <Col xl={6}>
                                <FormLabel>Country</FormLabel>
                                <p className='tx-15 col-sm-11 p-0'>{singleSocietyData?.country || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>State</FormLabel>
                                <p className='tx-1 p-0'>{singleSocietyData?.state || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>City</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.city || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Pincode</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.pincode || "N/A"}</p>
                              </Col>


                            </Row>
                          </Card.Body>
                        </Card>

                        <Card className='m-3'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Interest Details</h5>
                            <Row>
                              <Col xl={12}>
                                <FormLabel>Interest Calculation Type</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.interestCalculationType || "N/A"}</p>
                              </Col>


                              <Col xl={6}>
                                <FormLabel>Annual Rate of Interest</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.annualRateOfInterest || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Rate of Interest</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.rateOfInterest || "N/A"}</p>
                              </Col>


                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xl={4} className='p-0 pe-3'>


                        <Card>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Society Document Details</h5>
                            <Row>
                              <Col xl={12} className='mb-1 tx-12'>Society Registration Number</Col>
                              <Col xl={12} className='tx-semibold mb-2 tx-14 text-muted'>{singleSocietyData?.registrationNumber || "N/A"}</Col>
                              <Col xl={5} className='mb-1 tx-12'>TAN number</Col>
                              <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.tanNumber || "N/A"}</Col>
                              <Col xl={5} className='mb-1 tx-12'>PAN No</Col>
                              <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.panNumber || "N/A"}</Col>
                              <Col xl={5} className='mb-1 tx-12'>Signatory</Col>
                              <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.signatory || "N/A"}</Col>
                              <Col xl={5} className='mb-1 tx-12'>HSN Code</Col>
                              <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.hsnCode || "N/A"}</Col>
                              <Col xl={5} className='mb-1 tx-12'>GSTIN</Col>
                              <Col xl={7} className='tx-semibold tx-12'>{singleSocietyData?.gstin || "N/A"}</Col>
                            </Row>
                          </Card.Body>
                        </Card>



                        <Card>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Society Accounts Details</h5>
                            {/* <Row>
                              <Col xl={5} className='mb-1 tx-12'>Society Bank Name</Col>
                              <Col xl={7} className='tx-semibold tx-12'>Union Bank of India</Col>
                              <Col xl={5} className='mb-1 tx-12'>Account Number</Col>
                              <Col xl={7} className='tx-semibold tx-12'>532463874983753975</Col>
                              <Col xl={5} className='mb-1 tx-12'>Branch Name</Col>
                              <Col xl={7} className='tx-semibold tx-12'>-</Col>
                              <Col xl={5} className='mb-1 tx-12 '>IFSC Code</Col>
                              <Col xl={7} className='tx-semibold tx-12'>UBIN0826812</Col>
                              <Col xl={5} className='mb-1 tx-12'>Cheque Favourable</Col>
                              <Col xl={7} className='tx-semibold tx-12'>Mohan Areca Co Op HSG Soc Ltd</Col>
                              <Col xl={12} className='mt-2 tx-12'>
                                <img src='https://static.wixstatic.com/media/794e6d_d0eb1012228446ba8436ac24a1f5ad00~mv2.jpeg/v1/fill/w_440,h_380,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/Union%20Bank%20QR%20Code.jpeg' />
                              </Col>
                            </Row> */}
                            {singleSocietyData?.accountDetails?.length > 0 ? (
                              singleSocietyData?.accountDetails.map((account: any, index: number) => (
                                <div key={account.accountId}>
                                  <Row className="mt-2">
                                    {/* Bank Name */}
                                    <Col xl={5} className='mb-1 tx-12'>Society Bank Name</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>
                                      {account.bankName || "N/A"}
                                    </Col>
                                  </Row>

                                  <Row className="mt-2">
                                    {/* Account Number */}
                                    <Col xl={5} className='mb-1 tx-12'>Account Number</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>
                                      {account.accountNumber || "N/A"}
                                    </Col>
                                  </Row>

                                  <Row className="mt-2">
                                    {/* Branch Name */}
                                    <Col xl={5} className='mb-1 tx-12'>Branch Name</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>
                                      {account.branchName || "N/A"}
                                    </Col>
                                  </Row>

                                  <Row className="mt-2">
                                    {/* IFSC Code */}
                                    <Col xl={5} className='mb-1 tx-12 '>IFSC Code</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>
                                      {account.ifscCode || "N/A"}
                                    </Col>
                                  </Row>

                                  <Row className="mt-2">
                                    {/* Cheque Favourable */}
                                    <Col xl={5} className='mb-1 tx-12'>Cheque Favourable</Col>
                                    <Col xl={7} className='tx-semibold tx-12'>
                                      {account.chequeFavourable || "N/A"}
                                    </Col>
                                  </Row>

                                  <Row className="mt-2">
                                    {/* QR Code Image */}
                                    <Col xl={12} className='mt-2 tx-12'>
                                      <img src={account.paymentQrPath || 'https://static.wixstatic.com/media/794e6d_d0eb1012228446ba8436ac24a1f5ad00~mv2.jpeg/v1/fill/w_440,h_380,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/Union%20Bank%20QR%20Code.jpeg'} alt="QR Code" />
                                    </Col>
                                  </Row>

                                  {/* Add a little space between the accounts */}
                                  {index < singleSocietyData.accountDetails.length - 1 && <hr />}
                                </div>
                              ))
                            ) : (
                              <p>No account details available.</p>
                            )}
                          </Card.Body>
                        </Card>

                      </Col>
                    </Row>

                  </div>
                </Tab>
                <Tab eventKey="Properties" title="Properties">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Properties Details</h5>
                        <div className='p-0 mt-4'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Property</th>
                                <th>Wing</th>
                                <th>Member Name</th>
                                <th>Area(sq.ft)</th>
                                <th>Narration</th>
                                <th>Tenant</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {/* <tbody>
                              <tr>
                                <td>1</td>
                                <td><Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='text-info'>A101</Link></td>
                                <td>A</td>
                                <td><Link to={`${import.meta.env.BASE_URL}members/membersProfile`} className='text-info'>Mr. Vinod Kumar Pandia</Link></td>
                                <td>995</td>
                                <td>2BHK</td>
                                <td><Link to={``} className='text-info'>Sursbhi Verma</Link></td>
                                <td>Occupied</td>
                                <td><Dropdown >
                                  <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                    Action
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item><Link to={`${import.meta.env.BASE_URL}property/addpropertymaster`}>Edit</Link></Dropdown.Item>
                                    <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown></td>
                              </tr>

                              <tr>
                                <td>1</td>
                                <td><Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='text-info'>A101</Link></td>
                                <td>A</td>
                                <td><Link to={`${import.meta.env.BASE_URL}members/membersProfile`} className='text-info'>Mr. Vinod Kumar Pandia</Link></td>
                                <td>995</td>
                                <td>2BHK</td>
                                <td><Link to={``} className='text-info'>Sursbhi Verma</Link></td>
                                <td>Occupied</td>
                                <td><Dropdown >
                                  <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                    Action
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item><Link to={`${import.meta.env.BASE_URL}property/addpropertymaster`}>Edit</Link></Dropdown.Item>
                                    <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown></td>
                              </tr>

                            </tbody> */}
                            <tbody>
                              {singleSocietyData.properties?.map((property: any, index: number) => (
                                <tr key={property.propertyIdentifier}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <Link to={`${import.meta.env.BASE_URL}property/propertyview/${property.propertyIdentifier}`} className="text-info">
                                      {property.propertyName || "N/A"}
                                    </Link>
                                  </td>
                                  <td>{property.wing?.wingName || "N/A"}</td>
                                  <td>
                                    <Link to={`${import.meta.env.BASE_URL}members/membersProfile/${property?.member?.memberIdentifier}`} className="text-info">
                                      {`${property?.member?.firstName} ${property?.member?.middleName} ${property?.member?.lastName}`}
                                    </Link>
                                  </td>
                                  <td>{property.area || "N/A"}</td>
                                  <td>{property.narration || "N/A"}</td>
                                  <td>
                                    {
                                      property.tenant?
                                      <Link to={property.tenant ? `${import.meta.env.BASE_URL}tenant/${property.tenant.tenantIdentifier}` : "#"} className="text-info">
                                    {`${property?.tenant?.firstName||""} ${property?.tenant?.middleName||""} ${property?.tenant?.lastName||""}`}
                                    </Link>:"N/A"
                                    }
                                    
                                  </td>
                                  <td>{property.status || "N/A"}</td>
                                  <td>
                                    <Dropdown>
                                      <Dropdown.Toggle variant="light" className="btn-sm" id="dropdown-basic">
                                        Action
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item>
                                          <Link to={`${import.meta.env.BASE_URL}property/editpropertymaster/${property.propertyIdentifier}`}>Edit</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item className="text-danger" onClick={() => handleDelete(property.propertyIdentifier)}>Delete</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card.Body>
                    </Card>



                  </div>
                </Tab>

                <Tab eventKey="Parking" title="Parking">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Parking Details</h5>
                        <div className='p-0 mt-4'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Parking Number</th>
                                <th>Parking Type</th>
                                <th>Parking Vehicle Type</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>UB324324</td>
                                <td>Open</td>
                                <td>4 Wheeler</td>
                                <td>Allocated</td>
                                <td><Dropdown >
                                  <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                    Action
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item><Link to={``}>Edit</Link></Dropdown.Item>
                                    <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown></td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>UB324324</td>
                                <td>Basement</td>
                                <td>4 Wheeler</td>
                                <td>Allocated</td>
                                <td><Dropdown >
                                  <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                    Action
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item><Link to={``}>Edit</Link></Dropdown.Item>
                                    <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Card.Body>
                    </Card>



                  </div>
                </Tab>
                <Tab eventKey="Charge Master" title="Charge Master">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Charge Master
                          <span className='float-end btn btn-primary btn-sm' onClick={() => viewDemoShow("addcharge")}>+ Charge Master</span>
                        </h5>
                        <Modal show={addcharge} size="lg" >
                          <Modal.Header>
                            <Modal.Title>Charge Master</Modal.Title>
                            <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addcharge"); }}>
                              x
                            </Button>
                          </Modal.Header>
                          <Modal.Body>
                            <Row>
                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Charge Number</Form.Label>
                                  <p className='form-control bg-light'></p>
                                </Form.Group>
                              </Col>
                              <Col xl={6}></Col>
                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Charge Name<span className="text-danger">*</span></Form.Label>
                                  <Select
                                    options={chargename}
                                    placeholder="Select name"
                                    classNamePrefix="Select2"
                                  />
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Is Active</Form.Label>
                                  <FormCheck type="checkbox" className='ms-3 mt-2 me-1'></FormCheck>
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Charge Master Type</Form.Label>
                                  <Select
                                    options={chargemastertype}
                                    placeholder="Search Properties"
                                    isMulti
                                    classNamePrefix="Select2"
                                  />
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Charge Type<span className="text-danger">*</span></Form.Label>
                                  <Select
                                    options={chargetype}
                                    placeholder="Select Type"
                                    isMulti
                                    classNamePrefix="Select2"
                                  />
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Property</Form.Label>
                                  <Select
                                    options={property}
                                    placeholder="Select Properties"
                                    isMulti
                                    classNamePrefix="Select2"
                                  />
                                </Form.Group>
                              </Col>


                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Society Name<span className="text-danger">*</span></Form.Label>
                                  <Select
                                    options={societyname}
                                    placeholder="Search Society"
                                    isMulti
                                    classNamePrefix="Select2"
                                  />
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Wing</Form.Label>
                                  <Select
                                    options={wing}
                                    placeholder="Search Wing"
                                    isMulti
                                    classNamePrefix="Select2"
                                  />
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Billing Type<span className="text-danger">*</span></Form.Label>
                                  <Select
                                    options={billingtype}
                                    placeholder="Select Type"
                                    isMulti
                                    classNamePrefix="Select2"
                                  />
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
                                  <FormControl type="date" className='form-control'></FormControl>
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
                                  <FormControl type="date" className='form-control'></FormControl>
                                </Form.Group>
                              </Col>

                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>GST %</Form.Label>
                                  <FormControl type="text" className='form-control' placeholder='0.00%'></FormControl>
                                </Form.Group>
                              </Col>

                            </Row>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="default" onClick={() => { viewDemoClose("addcharge"); }}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={() => { viewDemoClose("addcharge"); }}>
                              Save
                            </Button>

                          </Modal.Footer>
                        </Modal>
                        <div className='p-0 mt-4'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Charge Number</th>
                                <th>Charge Name</th>
                                <th>Charge Type</th>
                                <th>Billing Type</th>
                                <th>Narration</th>
                                <th className='text-end'>PSF Rate</th>
                                <th className='text-end'>Amount</th>
                                <th>Is Active</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td><Link to={``}>CM-0165</Link></td>
                                <td>Other Charges</td>
                                <td>Maintenance</td>
                                <td>LumpSum</td>
                                <td></td>
                                <td className='text-end'>₹0.00</td>
                                <td className='text-end'>₹2,850.00</td>
                                <td className='text-center'><FormCheck type="checkbox" checked disabled></FormCheck></td>
                                <td>4/1/2024</td>
                                <td>4/30/2024</td>
                                <td><Dropdown >
                                  <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                    Action
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => viewDemoShow("addcharge")}>Edit</Dropdown.Item>
                                    <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown></td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td><Link to={``}>CM-0165</Link></td>
                                <td>Other Charges</td>
                                <td>Maintenance</td>
                                <td>LumpSum</td>
                                <td></td>
                                <td className='text-end'>₹0.00</td>
                                <td className='text-end'>₹2,850.00</td>
                                <td className='text-center'><FormCheck type="checkbox" checked disabled></FormCheck></td>
                                <td>4/1/2024</td>
                                <td>4/30/2024</td>
                                <td><Dropdown >
                                  <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                    Action
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => viewDemoShow("addcharge")}>Edit</Dropdown.Item>
                                    <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </Card.Body>
                    </Card>



                  </div>

                </Tab>
                <Tab eventKey="Accounts" title={<Link to={`${import.meta.env.BASE_URL}accounts/accounts`} >Accounts</Link>} >

                </Tab>
                <Tab eventKey="Notices" title="Notices">

                </Tab>
                <Tab eventKey="Complaints" title="Annoucements">

                </Tab>

                <Tab eventKey="Tower" title="Tower">
                  <Card className='m-3 mb-5'>
                    <Card.Body>
                      <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Tower Details</h5>
                      <div className='p-0 mt-4'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th >S.No.</th>
                              <th>Tower/Block Name</th>
                              <th >Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>A</td>
                              <td><Dropdown >
                                <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                  Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>Edit</Dropdown.Item>
                                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown></td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>A</td>
                              <td><Dropdown >
                                <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                  Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>Edit</Dropdown.Item>
                                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab>
                <Tab eventKey="Wing" title="Wing">
                  <Card className='m-3 mb-5'>
                    <Card.Body>
                      <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Wing Details</h5>
                      <div className='p-0 mt-4'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th >S.No.</th>
                              <th>Wing</th>
                              <th >Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>A</td>
                              <td><Dropdown >
                                <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                  Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>Edit</Dropdown.Item>
                                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown></td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>A</td>
                              <td><Dropdown >
                                <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                                  Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item>Edit</Dropdown.Item>
                                  <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </Card>


                </Tab>
              </Tabs>
            </div>
          </div>
        </Col>

      </Row>

      <CustomToastContainer />
    </Fragment >
  );
}
