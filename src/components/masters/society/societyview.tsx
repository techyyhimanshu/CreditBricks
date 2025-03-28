
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Form, Dropdown, Tabs, Tab, FormLabel, FormCheck, Button, Modal, FormControl } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import { getAnnouncementsOfSocietyApi, getNoticesOfSocietyApi, getSocietyDetailsApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { deletePropertyApi } from '../../../api/property-api';
import { handleApiError } from '../../../helpers/handle-api-error';
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import NoticeModal from '../../../common/modals/noticeModal';
import { deleteNoticeApi, updateNoticeApi } from '../../../api/notice-api';
import NoticeViewModal from '../../../common/modals/noticeViewModal';
import AnnouncementModal from '../../../common/modals/announcementModal';
import AnnouncementViewModal from '../../../common/modals/announcementViewModal';
import { deleteAnnouncementApi, updateAnnouncementApi } from '../../../api/announcement-api';

export default function SocietyView() {
  const [singleSocietyData, setSingleSocietydata] = useState<any>([])
  const [noticeData, setNoticeData] = useState<any>([])
  const [singleNoticedata, setSingleNoticeData] = useState<any>(null);
  const [addnotices, setaddnotices] = useState(false);
  const [viewnotice, setviewnotice] = useState(false);
  const [announcementData, setAnnouncementData] = useState<any>([])
  const [singleAnnouncementData, setSingleAnnouncementData] = useState<any>(null);
  const [addannouncement, setaddannouncement] = useState(false);
  const [viewannouncement, setviewannouncement] = useState(false);
  const params = useParams()
  const identifier = params.identifier as string

  const columns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Notice Subject',
      cell: (row: any) => (
        <span className='text-info cursor' onClick={() => { viewDemoShow("viewnotice"), setSingleNoticeData(row) }}>{row.noticeSubject}</span>
      ),
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: 'Valid Date',
      selector: (row: any) => row.validDate,
      sortable: true,
    },
    {
      name: 'Action',
      sortable: true,
      cell: (row: any) => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              setSingleNoticeData(row);
              viewDemoShow("addnotices")
            }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleNoticeDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];
  const announcementColumns = [
    {
      name: 'S.No',
      cell: (_: any, index: number) => index + 1,
      sortable: true,
      width: '80px'
    },
    {
      name: 'Announcement Name',
      cell: (row: any) => {
        return (
          <span className='text-info cursor' onClick={() => { viewDemoShow("viewannouncement"), setSingleAnnouncementData(row) }}>{row.announcementName}</span>
        )
      },
      sortable: true,
    },
    {
      name: 'Start Date',
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: 'Valid Date',
      selector: (row: any) => row.validDate,
      sortable: true,
    },
    {
      name: 'Action',
      sortable: true,
      cell: (row: any) => (
        <Dropdown >
          <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
            Action
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => {
              setSingleAnnouncementData(row);
              viewDemoShow("addannouncement")
            }}>Edit</Dropdown.Item>
            <Dropdown.Item className='text-danger' onClick={() => handleAnnouncementDelete(row)}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      ),

    },
  ];

  const tableData = {
    columns,
    data: noticeData
  };
  const announcementTableData = {
    columns: announcementColumns,
    data: announcementData
  };

  const fetchSocietyData = async () => {
    try {
      const response = await getSocietyDetailsApi(identifier)
      setSingleSocietydata(response?.data?.data || [])
    } catch (error) {

    }
  }
  const fetchNoticeData = async () => {
    try {
      const response = await getNoticesOfSocietyApi(identifier)
      // setNoticeData(response?.data?.data || [])
      const data = response.data.data
      const formattedData = data.map((notice: any, index: number) => (
        {
          sno: index + 1,
          noticeType: notice.noticeType,
          noticeSubject: notice.noticeSubject,
          message: notice.message,
          startDate: notice.startDate,
          validDate: notice.validDate,
          societyIdentifier: notice?.society?.societyIdentifier,
          societyName: notice?.society?.societyName,
          towerIdentifier: notice?.tower?.towerIdentifier,
          towerName: notice?.tower?.towerName,
          wingIdentifier: notice?.wing?.wingIdentifier,
          wingName: notice?.wing?.wingName,
          propertyIdentifier: notice?.property?.propertyIdentifier,
          propertyName: notice?.property?.propertyName,
          noticeIdentifier: notice.noticeIdentifier,
          noticeFilePath: notice.noticeFilePath
        }
      ));
      setNoticeData(formattedData);
    } catch (error) {

    }
  }
  const fetchAnnouncementData = async () => {
    try {
      const response = await getAnnouncementsOfSocietyApi(identifier)
      // setAnnouncementData(response?.data?.data || [])
      const data = response.data.data
      const formattedData = data.map((announcement: any, index: number) => (
        {
          sno: index + 1,
          announcementName: announcement.announcementName,
          announcementIdentifier: announcement.announcementIdentifier,
          message: announcement.message,
          startDate: announcement.startDate,
          validDate: announcement.validDate,
          societyIdentifier: announcement?.society?.societyIdentifier,
          societyName: announcement?.society?.societyName,
          towerIdentifier: announcement?.tower?.towerIdentifier,
          towerName: announcement?.tower?.towerName,
          wingIdentifier: announcement?.wing?.wingIdentifier,
          wingName: announcement?.wing?.wingName,
          propertyIdentifier: announcement?.property?.propertyIdentifier,
          propertyName: announcement?.property?.propertyName,
          announcementFilePath: announcement?.announcementFilePath
        }
      ));
      setAnnouncementData(formattedData);
    } catch (error) {

    }
  }

  useEffect(() => {

    if (identifier) {
      fetchSocietyData()
      fetchNoticeData()
      fetchAnnouncementData()
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
      case "addnotices":
        setaddnotices(true);
        break;
      case "viewnotice":
        setviewnotice(true);
        break;
      case "addannouncement":
        setaddannouncement(true);
        break;
      case "viewannouncement":
        setviewannouncement(true);
        break;


    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addcharge":
        setaddcharge(false);
        break;

      case "addnotices":
        setaddnotices(false);
        break;
      case "viewnotice":
        setviewnotice(false);
        break;
      case "addannouncement":
        setaddannouncement(false);
        break;

      case "viewannouncement":
        setviewannouncement(false);
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

  const handleNoticeSubmit = async (values: any) => {
    const formattedData: any = {
      noticeSubject: values.subject,
      societyIdentifier: values.society.value,
      message: values.message,
      startDate: values.startDate,
      validDate: values.validDate,
      noticeType: values.noticeType.value
    }
    if (values?.tower?.value) {
      formattedData.towerIdentifier = values.tower.value
    }
    if (values?.wing?.value) {
      formattedData.wingIdentifier = values.wing.value
    }
    if (values?.property?.value) {
      formattedData.propertyIdentifier = values.property.value
    }

    if (values.file) {
      formattedData.noticeFile = values.file
    }
    try {
      const response = await updateNoticeApi(formattedData, singleNoticedata?.noticeIdentifier)

      if (response.status === 200) {
        viewDemoClose("addnotices");
        showToast("success", response.data.message)
        fetchNoticeData()
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    } finally {
      setSingleNoticeData(null)
    }
    viewDemoClose("addnotices")
  }

   const handleAnnouncementSubmit = async (values: any) => {
      const formattedData: any = {
        announcementName: values.announcementName,
        societyIdentifier: values.society.value,
        message: values.message,
        startDate: values.startDate,
        validDate: values.validDate,
      }
  
      if (values?.tower?.value) {
        formattedData.towerIdentifier = values.tower.value
      }
      if (values?.wing?.value) {
        formattedData.wingIdentifier = values.wing.value
      }
      if (values?.property?.value) {
        formattedData.propertyIdentifier = values.property.value
      }
  
      if (values.file) {
        formattedData.announcementFile = values.file
      }
      try {        
        const  response = await updateAnnouncementApi(formattedData, singleAnnouncementData?.announcementIdentifier)
      
        if (response.status === 200 || response.status === 201) {
          viewDemoClose("addannouncement")
          showToast("success", response.data.message)
          fetchAnnouncementData()
        }
      } catch (error) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      } finally {
        setSingleAnnouncementData(null)
      }
      viewDemoClose("addannouncement")
    }

  const handleNoticeClose = () => {
    viewDemoClose("addnotices")
    setSingleNoticeData(null)
  }

  const handleNoticeViewClose = () => {
    viewDemoClose("viewnotice")
    setSingleNoticeData(null)
  }

  const handleAnnouncementClose=()=>{
    viewDemoClose("addannouncement")
    setSingleAnnouncementData(null)
  }

  const handleAnnouncementViewClose=()=>{
    viewDemoClose("viewannouncement")
    setSingleAnnouncementData(null)
  }

  const handleNoticeDelete = (row: any) => {
    ; (async () => {
      try {

        const response = await deleteNoticeApi(row.noticeIdentifier)
        if (response.status === 200) {
          showToast("success", response.data.message)
          fetchNoticeData()
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    })()
  }

  const handleAnnouncementDelete = (row: any) => {
      ; (async () => {
        try {
  
          const response = await deleteAnnouncementApi(row.announcementIdentifier)
          if (response.status === 200) {
            showToast("success", response.data.message)
            fetchAnnouncementData()
          }
        } catch (error: any) {
          const errorMessage = handleApiError(error)
          showToast("error", errorMessage)
        }
      })()
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


                              <Col xl={4}>
                                <FormLabel>Society Contact Number</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.contactNumber || "N/A"}</p>
                              </Col>

                              <Col xl={4}>
                                <FormLabel>Society Email</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.email || "N/A"}</p>
                              </Col>

                              <Col xl={4}>
                                <FormLabel>Society Manager</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.societyManager || "N/A"}</p>
                              </Col>


                              <Col xl={4}>
                                <FormLabel>Address</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.address || "N/A"}</p>
                              </Col>



                              <Col xl={4}>
                                <FormLabel>Country</FormLabel>
                                <p className='tx-15 col-sm-11 p-0'>{singleSocietyData?.country || "N/A"}</p>
                              </Col>

                              <Col xl={4}>
                                <FormLabel>State</FormLabel>
                                <p className='tx-1 p-0'>{singleSocietyData?.state || "N/A"}</p>
                              </Col>

                              <Col xl={4}>
                                <FormLabel>City</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.city || "N/A"}</p>
                              </Col>

                              <Col xl={4}>
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
                              <Col xl={4}>
                                <FormLabel>Interest Calculation Type</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.interestCalculationType || "N/A"}</p>
                              </Col>


                              <Col xl={4}>
                                <FormLabel>Annual Rate of Interest</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.annualRateOfInterest || "N/A"}</p>
                              </Col>

                              <Col xl={4}>
                                <FormLabel>Rate of Interest</FormLabel>
                                <p className='tx-15'>{singleSocietyData?.rateOfInterest || "N/A"}</p>
                              </Col>


                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col xl={4} className='p-0 pe-3'>


                        <Card className='mt-3'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Society Document Details</h5>
                            <Row>
                              <Col xl={12} className='mb-1 tx-12'>Society Registration Number</Col>
                              <Col xl={12} className='tx-semibold mb-2 tx-14 text-primary'>{singleSocietyData?.registrationNumber || "N/A"}</Col>
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
                                      <img crossOrigin="anonymous" src={account?.paymentQrPath?import.meta.env.VITE_STATIC_PATH + account?.paymentQrPath:'https://static.wixstatic.com/media/794e6d_d0eb1012228446ba8436ac24a1f5ad00~mv2.jpeg/v1/fill/w_440,h_380,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/Union%20Bank%20QR%20Code.jpeg'} alt="QR Code" />
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
                                      property.tenant ?
                                        <Link to={property.tenant ? `${import.meta.env.BASE_URL}tenant/${property.tenant.tenantIdentifier}` : "#"} className="text-info">
                                          {`${property?.tenant?.firstName || ""} ${property?.tenant?.middleName || ""} ${property?.tenant?.lastName || ""}`}
                                        </Link> : "N/A"
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
                                <th>Property</th>
                                <th>Member</th>
                                <th>Parking Vehicle Type</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>CRP 101</td>
                                <td>CR 101</td>
                                <td>Tests society Member</td>
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
                                <td>CR 103</td>
                                <td>Tests society Member</td>
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
                <Tab eventKey="Accounts" title={<Link to={`${import.meta.env.BASE_URL}accounts/accounts`} className='p-0' >Accounts</Link>} >

                </Tab>
                <Tab eventKey="Notices" title="Notices">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Notices</h5>
                        <div className='p-0 mt-4'>
                          {/* <table className='table'>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Society Notice No.</th>
                                <th>Active</th>
                                <th>Start Date</th>
                                <th>Valid Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>S-0000</td>
                                <td> <FormCheck type="checkbox" className='ms-4' disabled></FormCheck></td>
                                <td>5/25/2023</td>
                                <td>6/14/2023</td>
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
                                <td>S-0000</td>
                                <td> <FormCheck type="checkbox" className='ms-4' checked disabled></FormCheck></td>
                                <td>5/25/2023</td>
                                <td>6/14/2023</td>
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
                                data={noticeData}
                                pagination


                              />
                            </DataTableExtensions>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>



                  </div>
                </Tab>
                <Tab eventKey="Annoucements" title="Annoucements">
                  <div className="tabs-menu-body main-content-body-right">

                    <Card className='m-3 mb-5'>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Annoucements</h5>
                        <div className='p-0 mt-4'>
                          {/* <table className='table'>
                            <thead>
                              <tr>
                                <th>S.No.</th>
                                <th>Name</th>
                                <th>isActive</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>Test Announcements</td>
                                <td> <FormCheck type="checkbox" className='ms-4' disabled></FormCheck></td>
                                <td>5/25/2023</td>
                                <td>6/14/2023</td>
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
                                <td>Test</td>
                                <td> <FormCheck type="checkbox" className='ms-4' checked disabled></FormCheck></td>
                                <td>5/25/2023</td>
                                <td>6/14/2023</td>
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
                            <DataTableExtensions {...announcementTableData}>
                              <DataTable
                                columns={columns}
                                data={announcementData}
                                pagination


                              />
                            </DataTableExtensions>
                          </div>
                        </div>

                      </Card.Body>
                    </Card>



                  </div>
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
      {
        singleNoticedata && addnotices && <NoticeModal show={addnotices} onClose={handleNoticeClose} editing={true} initialVals={singleNoticedata} onSave={handleNoticeSubmit} />
      }
      {
        viewnotice && singleNoticedata && <NoticeViewModal show={viewnotice} onClose={handleNoticeViewClose} initialVals={singleNoticedata} />
      }
      {
        singleAnnouncementData && addannouncement && <AnnouncementModal show={addannouncement} onClose={handleAnnouncementClose} editing={true} initialVals={singleAnnouncementData} onSave={handleAnnouncementSubmit} />
      }
      {
        viewannouncement && singleAnnouncementData && <AnnouncementViewModal show={viewannouncement} onClose={handleAnnouncementViewClose} initialVals={singleAnnouncementData} />
      }

      <CustomToastContainer />
    </Fragment >
  );
}
