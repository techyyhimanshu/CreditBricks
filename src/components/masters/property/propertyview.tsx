
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Tabs, Tab, FormLabel, Tooltip, Dropdown, OverlayTrigger } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getPropertComplaintsApi, getSinglePropertyDetailsApi } from '../../../api/property-api';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";


export default function PropertyView() {
  const [singlePropertyData, setSinglePropertydata] = useState<any>([])
  const [complaintData, setComplaintData] = useState<any>([])
  const params = useParams()
  const identifier = params.identifier as string
  // const location = useLocation();
  // const propertyData = location.state?.propertyData;
  // if (!propertyData) {
  //   return <p>No property data available.</p>;
  // }

  const columns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Complaint ID',
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: 'Description',
      selector: (row: any) => row.description,
      sortable: true,
    },
    {
      name: 'Priority',
      cell: (row: any) => {
        if (row.priority === 'high') {
          return <td className='text-center'><span className='badge badge-danger'>High</span></td>;
        } else if (row.priority === 'medium') {
          return <td className='text-center'><span className='badge badge-warning'>Medium</span></td>;
        } else {
          return <td className='text-center'><span className='badge badge-success'>Low</span></td>;
        }
      },
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
            <Dropdown.Item >Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' >Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const tableData = {
    columns,
    data: complaintData
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await getSinglePropertyDetailsApi(identifier)
        setSinglePropertydata(response?.data?.data || [])
      } catch (error) {

      }
    }
    if (identifier) {
      fetchPropertyData()
      fetchComplaintData()
    }
  }, [])

  const fetchComplaintData = async () => {
    try {
      const response = await getPropertComplaintsApi(identifier)
      setComplaintData(response?.data?.data || [])
    } catch (error) {

    }
  }
  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            <Link to={`${import.meta.env.BASE_URL}property/propertymaster`} className="p-1 pe-2 ps-2 me-1 float-start"><i className='bi bi-arrow-left'></i> </Link>
            <span className="dropdown nav-item w-auto headericon float-start">
              <Dropdown>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Switch Your Property</Tooltip>}>
                  <Dropdown.Toggle
                    className="new nav-link profile-user d-flex text-primary"

                    variant=""
                  >
                    <strong className='tx-24'>{singlePropertyData?.propertyName || "N/A"}</strong>
                  </Dropdown.Toggle>
                </OverlayTrigger>
                <Dropdown.Menu className="property_select">

                  <Dropdown.Item className="dropdown-item" href="/">
                    <i className="far fa-building me-2"></i> Property A
                  </Dropdown.Item>

                  <Dropdown.Item className="dropdown-item" href="/">
                    <i className="far fa-building me-2"></i> Property B
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </span>
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
                      <Col xl={4}>
                        <Card className='m-3 mb-5'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Details</h5>
                            <Row>
                              <Col xl={12}>
                                <FormLabel>Society</FormLabel>
                                <p className='tx-15 col-sm-11 p-0'>{singlePropertyData?.society?.societyName || "N/A"}</p>
                              </Col>

                              <Col xl={12}>
                                <FormLabel>Ledger Name</FormLabel>
                                <p className='tx-15 col-sm-11 p-0'>{singlePropertyData?.ledgerName || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Property Name</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.propertyName || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Owner</FormLabel>
                                <p className='tx-15'>
                                  {
                                    singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)
                                      ? `${singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.firstName} ${singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.lastName}`
                                      : "N/A"
                                  }</p>
                              </Col>



                              <Col xl={6}>
                                <FormLabel>Status</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.status || "N/A"}</p>
                              </Col>



                              <Col xl={6}>
                                <FormLabel>Tower</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.tower?.towerName || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Area(sq.ft.)</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.area || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Wing</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.wing?.wingName || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Flat No.</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.flatNumber || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Deal Type</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.dealType || "N/A"}</p>
                              </Col>

                              <Col xl={6}>
                                <FormLabel>Floor No.</FormLabel>
                                <p className='tx-15'>{singlePropertyData?.floorNumber || "N/A"}</p>
                              </Col>

                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xl={8} className='p-0'>
                        <Row>
                          <Col xl={6}>

                            <Card className='mt-3'>
                              <Card.Body>
                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Registration Details</h5>
                                <Row>
                                  <Col xl={6} className='mb-1 tx-12'>Flat Registration Number</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.flatRegistrationNumber || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Date of Agreement</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.dateOfAgreement || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Date of Registration</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.dateOfRegistration || "N/A"}</Col>

                                </Row>
                              </Card.Body>
                            </Card>



                            <Card>
                              <Card.Body>
                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Address Details</h5>
                                <Row>
                                  <Col xl={6} className='mb-1 tx-12'>Address line 1</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.society?.address || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Address line 2</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.society?.addressLine2 || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Address line 3</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.society?.addressLine3 || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>City</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.society?.city || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>State</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.society?.state || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Pincode</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.society?.pincode || "N/A"}</Col>
                                </Row>
                              </Card.Body>
                            </Card>





                          </Col>
                          <Col xl={6}>
                            <Card className='mt-3'>
                              <Card.Body>
                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Other Details</h5>
                                <Row>
                                  <Col xl={7} className='mb-1 tx-12'>Intercom Number</Col>
                                  <Col xl={5} className='tx-semibold'>{singlePropertyData?.intercomNumber || "N/A"}</Col>
                                  <Col xl={7} className='mb-1 tx-12'>Gas Connection Number</Col>
                                  <Col xl={5} className='tx-semibold'>{singlePropertyData?.gasConnectionNumber || "N/A"}</Col>
                                  <Col xl={7} className='mb-1 tx-12'>Consumer Electricity Number</Col>
                                  <Col xl={5} className='tx-semibold'>{singlePropertyData?.electricityNumber || "N/A"}</Col>

                                </Row>
                              </Card.Body>
                            </Card>

                            <Card>
                              <Card.Body>
                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Owner Details</h5>
                                {/* <Row>
      <Col xl={6} className='mb-1 tx-12'>Member Name</Col>
      <Col xl={6} className='tx-semibold'><Link to={``} className='text-info'> {propertyData.memberName}</Link></Col>
      <Col xl={6} className='mb-1 tx-12'>Co Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Third Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Fourth Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Fifth Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
      <Col xl={6} className='mb-1 tx-12'>Previous Owner</Col>
      <Col xl={6} className='tx-semibold'>-</Col>
    </Row> */}
                                <Row>
                                  {/* Member Name */}
                                  <Col xl={6} className='mb-1 tx-12'>Member Name</Col>
                                  <Col xl={6} className='tx-semibold'>
                                    {
                                      singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)
                                        ? <Link to={`${import.meta.env.BASE_URL}members/membersProfile/${singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.memberIdentifier}`} className='text-info'>
                                          {singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.firstName}
                                          {singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 1)?.member?.lastName}
                                        </Link>
                                        : 'N/A'
                                    }
                                  </Col>

                                  {/* Co-Owner */}
                                  <Col xl={6} className='mb-1 tx-12'>Co Owner</Col>
                                  <Col xl={6} className='tx-semibold'>
                                    {
                                      singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 2)
                                        ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 2)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 2)?.member?.lastName
                                        : 'N/A'
                                    }
                                  </Col>

                                  {/* Third Owner */}
                                  <Col xl={6} className='mb-1 tx-12'>Third Owner</Col>
                                  <Col xl={6} className='tx-semibold'>
                                    {
                                      singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 3)
                                        ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 3)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 3)?.member?.lastName
                                        : 'N/A'
                                    }
                                  </Col>

                                  {/* Fourth Owner */}
                                  <Col xl={6} className='mb-1 tx-12'>Fourth Owner</Col>
                                  <Col xl={6} className='tx-semibold'>
                                    {
                                      singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 4)
                                        ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 4)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 4)?.member?.lastName
                                        : 'N/A'
                                    }
                                  </Col>

                                  {/* Fifth Owner */}
                                  <Col xl={6} className='mb-1 tx-12'>Fifth Owner</Col>
                                  <Col xl={6} className='tx-semibold'>
                                    {
                                      singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 5)
                                        ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 5)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 5)?.member?.lastName
                                        : 'N/A'
                                    }
                                  </Col>

                                  {/* Previous Owner */}
                                  <Col xl={6} className='mb-1 tx-12'>Previous Owner</Col>
                                  <Col xl={6} className='tx-semibold'>
                                    {
                                      singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 6)
                                        ? singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 6)?.member?.firstName + ' ' + singlePropertyData?.propertyMembers?.find((member: any) => member.ownership === 6)?.member?.lastName
                                        : 'N/A'
                                    }
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>









                          </Col>
                          <Col xl={12}>
                            <Card>
                              <Card.Body>
                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Already Paid Details</h5>
                                <Row>
                                  <Col xl={6} className='mb-1 tx-12'>Monthly Paid Maintenance to Builder</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.monthlyMaintenance || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Monthly Paid Maintenance to Builder Upto</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.monthlyMaintenanceUpto || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Monthly Paid Arrears</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.monthlyPaidArrears || "N/A"}</Col>
                                  <Col xl={6} className='mb-1 tx-12'>Monthly Paid Arrears Upto</Col>
                                  <Col xl={6} className='tx-semibold'>{singlePropertyData?.monthlyPaidArrearsUpto || "N/A"}</Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Tab>
                <Tab eventKey="Parking" title="Parking">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Parking Details</h5>

                        <table className='table'>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Parking Number</th>
                              <th>Society Name</th>
                              <th>Parking Type</th>
                              <th>Parking Vehicle Type</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>CRP 101</td>
                              <td>Test CreditBricks Society</td>
                              <td>Stilt</td>
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
                              <td>CRP 103</td>
                              <td>Test CreditBricks Society</td>
                              <td>Open</td>
                              <td>2 Wheeler</td>
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
                        {/* N/A */}

                      </Card.Body>
                    </Card>



                  </div>
                </Tab>
                <Tab eventKey="Loan" title="Loan">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Loan</h5>

                        <table className='table'>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Loan Case Number</th>
                              <th>Account No</th>
                              <th>Bank Name</th>
                              <th>IFSC Code</th>
                              <th>Interest Rate</th>
                              <th>Remarks</th>
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
                              <td></td>
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
                              <td></td>
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
                        {/* N/A */}

                      </Card.Body>
                    </Card>



                  </div>

                </Tab>
                <Tab eventKey="Accounts" title="Accounts">

                </Tab>


                <Tab eventKey="Applications" title="Applications">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Applications</h5>


                        N/A

                      </Card.Body>
                    </Card>



                  </div>
                </Tab>

                <Tab eventKey="Complaints" title="Complaints">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Complaints</h5>

                        {/* <table className='table'>
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Complaints Number</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>CS-0005</td>
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
                        </table> */}
                        <div className="table-responsive ">
                          <DataTableExtensions {...tableData}>
                            <DataTable
                              columns={columns}
                              data={complaintData}
                              pagination


                            />
                          </DataTableExtensions>
                        </div>
                        {/* N/A */}

                      </Card.Body>
                    </Card>



                  </div>
                </Tab>

                <Tab eventKey="Transfer Property" title={<Link state={true} to={`${import.meta.env.BASE_URL}property/editpropertymaster/${identifier}`} className='p-0' >Transfer Property</Link>}>

                </Tab>

              </Tabs>
            </div>
          </div>
        </Col>


      </Row>


    </Fragment >
  );
}
