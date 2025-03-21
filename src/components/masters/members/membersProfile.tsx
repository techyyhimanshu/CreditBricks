
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Dropdown, Tabs, Tab, FormLabel } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { imagesData } from "../../../common/commonimages";
import { getMemberDetailApi } from '../../../api/member-api';
import { deletePropertyApi } from '../../../api/property-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';

export default function PropertyView() {
  const [singleMemberData, setSingleMemberdata] = useState<any>([])
  const [primaryProperty, setPrimaryProperty] = useState<any>(null);
  const params = useParams()
  const identifier = params.identifier as string

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await getMemberDetailApi(identifier)
        const data = response?.data?.data;
        setSingleMemberdata(data || [])
        const primary = data?.properties?.find((property:any) => property.isPrimary === true);
        setPrimaryProperty(primary || null);
      } catch (error) {

      }
    }
    if (identifier) {
      fetchPropertyData()
    }
  }, [])

  const handleDelete = async (propertyIdentifier: string) => {
    try {
      const response = await deletePropertyApi(propertyIdentifier)
      if (response.status === 200) {
        showToast("success", response.data.message)
        // Remove the society from the table
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
          <span className="main-content-title tx-bold mg-b-0 mg-b-lg-1 tx-26">
            <img
              alt=""
              src={imagesData('female1')}
              className="wd-100 rounded-5"
            />
            <span className='ms-3'>{`${singleMemberData?.firstName} ${singleMemberData?.middleName} ${singleMemberData?.lastName}`} <Link to={`${import.meta.env.BASE_URL}members/addmembers`} className='tx-16 btn btn-primary ms-2 btn-sm tx-normal' title="Edit"><i className='bi bi-pencil ms-1'></i></Link></span></span>
        </div>
      </div>


      <Row>
        <Col xl={8} className='ps-0 pe-0'>

          <div className="tab-menu-heading">
            <div className="tabs-menu1">
              <Tabs defaultActiveKey="Details" className="panel-tabs bd_bottom main-nav-line bd-b-0 mb-1">
                <Tab eventKey="Details" title="Details">
                  <div className="tabs-menu-body main-content-body-right" id="Details">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Personal Details</h5>
                        <Row>
                          <Col xl={4}>
                            <FormLabel>Member Name</FormLabel>
                            <p className='tx-15'>{`${singleMemberData?.firstName} ${singleMemberData?.middleName} ${singleMemberData?.lastName}`}</p>
                          </Col>

                          <Col xl={4}>
                            <FormLabel>Owner</FormLabel>
                            <p className='tx-15'>{singleMemberData?.owner || "N/A"}</p>
                          </Col>


                          <Col xl={4}>
                            <FormLabel>Member Type</FormLabel>
                            <p className='tx-15'>{singleMemberData?.memberType || "N/A"}</p>
                          </Col>



                          <Col xl={4}>
                            <FormLabel>Mobile Number</FormLabel>
                            <p className='tx-15 col-sm-11 p-0'>{singleMemberData?.mobileNumber || "N/A"}</p>
                          </Col>

                          <Col xl={4}>
                            <FormLabel>Alternative Mobile</FormLabel>
                            <p className='tx-1 p-0'>{singleMemberData?.alternatePhone || "N/A"}</p>
                          </Col>

                          <Col xl={4}>
                            <FormLabel>Email</FormLabel>
                            <p className='tx-15'>{singleMemberData?.email || "N/A"}</p>
                          </Col>

                          <Col xl={4}>
                            <FormLabel>Alternate Email</FormLabel>
                            <p className='tx-15'>{singleMemberData?.alternateEmail || "N/A"}</p>
                          </Col>

                          <Col xl={4}>
                            <FormLabel>Date of Birth</FormLabel>
                            <p className='tx-15'>{singleMemberData?.dateOfBirth || "N/A"}</p>
                          </Col>

                          <Col xl={4}>
                            <FormLabel>Gender</FormLabel>
                            <p className='tx-15'>{singleMemberData?.gender || "N/A"}</p>
                          </Col>


                          <Col xl={4}>
                            <FormLabel>Age</FormLabel>
                            <p className='tx-15'>{singleMemberData?.age || "N/A"}</p>
                          </Col>



                          <Col xl={4}>
                            <FormLabel>Anniversary</FormLabel>
                            <p className='tx-15'>{singleMemberData?.anniversary || "N/A"}</p>
                          </Col>

                        </Row>
                      </Card.Body>
                    </Card>



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
                                <th>Ledger Name</th>
                                <th>Narration</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            {/* <tbody>
                              <tr>
                                <td>1</td>
                                <td><Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='text-info'>A101</Link></td>
                                <td>A 101 Mr. Vinod Kumar Pandia Mrs. Chanda Vinod Pandia</td>
                                <td>2 BHK</td>
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
                              {singleMemberData?.properties?.map((property: any, index: number) => (
                                <tr key={property.propertyIdentifier}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <Link to={`${import.meta.env.BASE_URL}property/propertyview/${property.propertyIdentifier}`} className="text-info">
                                      {property.propertyName || "N/A"}
                                    </Link>
                                  </td>
                                  <td>{property.ledgerName || "N/A"}</td>
                                  <td>{property.narration || "N/A"}</td>
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
                <Tab eventKey="Loan" title="Loan">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Loan Details</h5>
                        <div className='p-0 mt-4'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Loan Case Number</th>
                                <th>Account No</th>
                                <th>Bank Name</th>
                                <th>IFSC Code</th>
                                <th>Interest Rate</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>465475676876</td>
                                <td>2324354554</td>
                                <td>HDFC Bank</td>
                                <td>HDFC0000678</td>
                                <td>7%</td>
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
                                <td>465475676876</td>
                                <td>2324354554</td>
                                <td>HDFC Bank</td>
                                <td>HDFC0000678</td>
                                <td>7%</td>
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
                <Tab eventKey="Accounts" title="Accounts">

                </Tab>
                <Tab eventKey="Applications" title="Applications">

                </Tab>
                <Tab eventKey="Complaints" title="Complaints">

                </Tab>
              </Tabs>
            </div>
          </div>
        </Col>

        <Col xl={4}>


          <Card>
            <Card.Body>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Property Details</h5>
              <Row>
                <Col xl={12} className='mb-1 tx-12'>Society Name</Col>
                <Col xl={12} className='tx-semibold'><Link to={``} className='text-info'>{primaryProperty ? primaryProperty?.society?.societyName : "N/A"}</Link></Col>
                <Col xl={6} className='mb-1 mt-3 tx-12'>Property Name<br />
                  <span className='tx-semibold'>{primaryProperty ? primaryProperty?.propertyName : "N/A"}</span></Col>
                <Col xl={3} className='mb-1 mt-3 tx-12'>Wing<br />
                  <span className='tx-semibold'>{primaryProperty ? primaryProperty?.wing.wingName : "N/A"}</span></Col>
                <Col xl={3} className='mb-1 mt-3 tx-12'>Flat<br />
                  <span className='tx-semibold'>{primaryProperty ? primaryProperty?.flatNumber : "N/A"}</span> </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Documentation Details</h5>
              <Row>
                <Col xl={6} className='mb-1 tx-12'>Aadhaar No.</Col>
                <Col xl={6} className='tx-semibold'>{singleMemberData?.aadharNumber || "N/A"}</Col>
                <Col xl={6} className='mb-1 tx-12'>PAN Number</Col>
                <Col xl={6} className='tx-semibold'>{singleMemberData?.panNo || "N/A"}</Col>
                <Col xl={6} className='mb-1 tx-12'>Passport Number</Col>
                <Col xl={6} className='tx-semibold'>{singleMemberData?.passportNo || "N/A"}</Col>
                <Col xl={6} className='mb-1 tx-12'>TAN Number</Col>
                <Col xl={6} className='tx-semibold'>{singleMemberData?.tanNo || "N/A"}</Col>
                <Col xl={6} className='mb-1 tx-12'>GSTIN (Member)</Col>
                <Col xl={6} className='tx-semibold'>{singleMemberData?.gstinNo || "N/A"}</Col>
              </Row>
            </Card.Body>
          </Card>



          <Card>
            <Card.Body>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Address Details</h5>
              <Row>
                <Col xl={6} className='mb-1 tx-12'>Alternate Address</Col>
                <Col xl={6} className='tx-semibold'>{singleMemberData?.alternateAddress || "N/A"}</Col>
                <Col xl={6} className='mb-1 tx-12'>Alternate Pincode</Col>
                <Col xl={6} className='tx-semibold'>{singleMemberData?.alternatePinCode || "N/A"}</Col>
              </Row>
            </Card.Body>
          </Card>

        </Col>
      </Row>

      <CustomToastContainer />
    </Fragment >
  );
}
