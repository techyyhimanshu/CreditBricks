
import { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Form, Dropdown, Modal, CardHeader, Tabs, Tab, InputGroup } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { imagesData } from "../../common/commonimages";
import Accordion from 'react-bootstrap/Accordion';
import GatePassModal from '../../common/modals/gatePassModal';


export default function Applications() {

  const [addapplication, setapplication] = useState(false);
  const [addgatepass, setaddgatepass] = useState(false);
  const [addchangeinname, setaddchangeinname] = useState(false);
  const [addcontactupdate, setaddcontactupdate] = useState(false);
  const [addparking, setaddparking] = useState(false);
  const [addflateresale, setaddflateresale] = useState(false);
  const [flateresaleuploadreciept, setflateresaleuploadreciept] = useState(false);
  const [Uploadloanclosure, setUploadloanclosure] = useState(false);
  const [addinteriorwork, setaddinteriorwork] = useState(false);
  const [addcelebration, setaddcelebration] = useState(false);
  const [addtheater, setaddtheater] = useState(false);
  const [addbanquethall, setaddbanquethall] = useState(false);
  const [addswimmingpool, setaddswimmingpool] = useState(false);
  const [addclubhouse, setaddclubhouse] = useState(false);
  const [addplayarea, setaddplayarea] = useState(false);
  const [addturfarea, setaddturfarea] = useState(false);
  const [addrentagreement, setaddrentagreement] = useState(false);
  const [addsharecerificate, setaddsharecerificate] = useState(false);
  const [tenatview, settenatview] = useState(false);
  const [termsconditionsview, settermsconditionsview] = useState(false);
  const [gatepassview, setgatepassview] = useState(false);
  const [singleGatePassData, setSingleGatePassData] = useState<any>(null);
  const [editing, setEditing] = useState(false);


  const viewDemoShow = (modal: any) => {
    switch (modal) {

      case "gatepassview":
        setgatepassview(true);
        break;

      case "termsconditionsview":
        settermsconditionsview(true);
        break;

      case "tenatview":
        settenatview(true);
        break;

      case "addapplication":
        setapplication(true);
        break;

      case "addgatepass":
        setaddgatepass(true);
        setapplication(false);
        break;

      case "addchangeinname":
        setaddchangeinname(true);
        setapplication(false);
        break;

      case "addcontactupdate":
        setaddcontactupdate(true);
        setapplication(false);
        break;

      case "addparking":
        setaddparking(true);
        setapplication(false);
        break;

      case "addflateresale":
        setaddflateresale(true);
        setapplication(false);
        break;


      case "flateresaleuploadreciept": Uploadloanclosure
        setflateresaleuploadreciept(true);
        setapplication(false);
        break;

      case "Uploadloanclosure":
        setUploadloanclosure(true);
        setapplication(false);
        break;

      case "addinteriorwork":
        setaddinteriorwork(true);
        setapplication(false);
        break;

      case "addcelebration":
        setaddcelebration(true);
        setapplication(false);
        break;

      case "addtheater":
        setaddtheater(true);
        setapplication(false);
        break;

      case "addbanquethall":
        setaddbanquethall(true);
        setapplication(false);
        break;

      case "addswimmingpool":
        setaddswimmingpool(true);
        setapplication(false);
        break;

      case "addclubhouse":
        setaddclubhouse(true);
        setapplication(false);
        break;

      case "addplayarea":
        setaddplayarea(true);
        setapplication(false);
        break;

      case "addturfarea":
        setaddturfarea(true);
        setapplication(false);
        break;

      case "addrentagreement":
        setaddrentagreement(true);
        setapplication(false);
        break;

      case "addsharecerificate":
        setaddsharecerificate(true);
        setapplication(false);
        break;
    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {

      case "gatepassview":
        setgatepassview(false);
        break;

      case "termsconditionsview":
        settermsconditionsview(false);
        break;

      case "tenatview":
        settenatview(false);
        break;

      case "addapplication":
        setapplication(false);
        break;

      case "addgatepass":
        setaddgatepass(false);
        break;

      case "addchangeinname":
        setaddchangeinname(false);
        break;

      case "addcontactupdate":
        setaddcontactupdate(false);
        break;

      case "addparking":
        setaddparking(false);
        break;


      case "addflateresale":
        setaddflateresale(false);
        break;

      case "flateresaleuploadreciept":
        setflateresaleuploadreciept(false);
        break;

      case "Uploadloanclosure":
        setUploadloanclosure(false);
        break;

      case "addinteriorwork":
        setaddinteriorwork(false);
        break;

      case "addcelebration":
        setaddcelebration(false);
        break;

      case "addtheater":
        setaddtheater(false);
        break;

      case "addbanquethall":
        setaddbanquethall(false);
        break;

      case "addswimmingpool":
        setaddswimmingpool(false);
        break;

      case "addclubhouse":
        setaddclubhouse(false);
        break;

      case "addplayarea":
        setaddplayarea(false);
        break;

      case "addturfarea":
        setaddturfarea(false);
        break;

      case "addrentagreement":
        setaddrentagreement(false);
        break;

      case "addsharecerificate":
        setaddsharecerificate(false);
        break;

    }
  };
  const handleSubmit = () => {

  }

  const day = [
    { value: "1", label: "Full Day" },
    { value: "2", label: "First Half" },
    { value: "3", label: "Second Half" },
  ]

  const duration = [
    { value: "1", label: "1hr" },
    { value: "2", label: "2hrs" },
    { value: "3", label: "3hrs" },
  ]


  const medicaldiseases = [
    { value: "1", label: "Yes" },
    { value: "2", label: "No" },
  ]

  const gender = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
  ]


  const flat = [
    { value: "1", label: "Select Flat " },
  ]

  const wing = [
    { value: "1", label: "Select Wing " },
  ]
  const designation = [
    { value: "1", label: "Secretary " },
    { value: "2", label: "Committe Member " },
  ]
  const status = [
    { value: "", label: "All" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Completed", label: "Completed" },
  ]

  const property = [
    { value: "1", label: "A101" },
    { value: "2", label: "A102" },

  ];

  const member = [
    { value: "1", label: "Test Member 1" },
    { value: "2", label: "Test Member 2" },

  ];

  const gatepasstenant = [
    { value: "1", label: "Neha Gupta" }

  ];

  const vendor = [
    { value: "1", label: "Ajay Kumar" }

  ];

  const gatetypesubcategory = [
    { value: "1", label: "Member Shifting In" },
    { value: "2", label: "Member Shifting Out" },
    { value: "3", label: "Tenant Shifting In" },
    { value: "4", label: "Tenant Shifting Out" },
    { value: "5", label: "Asset Moving In" },
    { value: "6", label: "Asset Moving Out" },
  ];

  const applicationtype = [
    { value: "1", label: "All" },
    { value: "2", label: "Gate Pass" },
    { value: "3", label: "Change In Name" },
    { value: "4", label: "Contact Update" },
    { value: "5", label: "Parking" },
    { value: "6", label: "Flat Resale" },
    { value: "7", label: "Interior Work" },
    { value: "8", label: "Celebration" },
    { value: "9", label: "Theater" },
    { value: "10", label: "Banquet Hall" },
    { value: "11", label: "Club House" },
    { value: "12", label: "Swimming Pool" },
    { value: "13", label: "Play Area" },
    { value: "14", label: "Turf Area" },
    { value: "15", label: "Rent Agreement" },
    { value: "16", label: "Share Certificate" },
    { value: "17", label: "Nomination" },
    { value: "18", label: "Badminton Count" },
    { value: "19", label: "Food Court" },
    { value: "20", label: "Others" },
  ]

  const gatetype = [
    { value: "1", label: "Inward" },
    { value: "2", label: "Outward" },
    { value: "2", label: "Internal" },
  ]

  const gatetypecategory = [
    { value: "1", label: "Member" },
    { value: "2", label: "Tenant" },
    { value: "2", label: "Material" },
  ]

  const changetype = [
    { value: "1", label: "Owner" },
    { value: "2", label: "Co-owner" },
  ]

  const society = [
    { value: "1", label: "Mohan Areca Co-Op Housing Society Limited" },
    { value: "2", label: "SKA MetroVilla Society Limited" },
  ]

  const relation = [
    { value: "1", label: "Self" },
    { value: "2", label: "Spouse" },
    { value: "3", label: "Son" },
    { value: "4", label: "Daughter" },
    { value: "5", label: "Father" },
    { value: "6", label: "Mother" },
    { value: "7", label: "Brother" },
    { value: "8", label: "Sister" },
    { value: "9", label: "Self" },
    { value: "10", label: "In Laws" },
    { value: "11", label: "Self" },
    { value: "12", label: "Distant Relative" },
    { value: "13", label: "Self" },
    { value: "14", label: "Friend" },
  ]

  const vehicletype = [
    { value: "1", label: "2W" },
    { value: "2", label: "4W" },
    { value: "3", label: "Tempo" },
    { value: "4", label: "3W" },
    { value: "5", label: "Mini Van" },
    { value: "6", label: "Voivo" },
  ]

  const worktype = [
    { value: "1", label: "Extension" },
    { value: "2", label: "Leakage" },
    { value: "3", label: "Fabrication" },
    { value: "4", label: "Electrical" },
  ]

  const interiorcategory = [
    { value: "1", label: "Living Room" },
    { value: "2", label: "Kitchen" },
    { value: "3", label: "Bedroom" },
    { value: "4", label: "Master Bedroom" },
    { value: "5", label: "Bathroom" },
    { value: "6", label: "Dry Area" },
    { value: "7", label: "Balcony" },
    { value: "8", label: "Open Terrace" },
    { value: "9", label: "Lawn" },

  ]

  const occasion = [
    { value: "1", label: "Birthday" },
    { value: "2", label: "Marriage" },
    { value: "3", label: "House Warming" },
    { value: "4", label: "Naming Ceremony" },
    { value: "5", label: "Anniversary" },
    { value: "6", label: "Festivals" },
    { value: "7", label: "Reunion" },
    { value: "8", label: "Retirement" },
    { value: "9", label: "Other" },
    { value: "10", label: "Get Together" },
    { value: "11", label: "Event" },
    { value: "12", label: "Camp" },
  ]

  const venue = [
    { value: "1", label: "Flat" },
    { value: "2", label: "Banquet Hall" },
    { value: "3", label: "Parking Area" },
  ]

  const sportactivity = [
    { value: "1", label: "Football" },
    { value: "2", label: "Cricket" },
    { value: "3", label: "Hockey" },
    { value: "2", label: "Badminton" },
    { value: "3", label: "Volley Ball" },
    { value: "2", label: "Basketball" },
    { value: "3", label: "Other" },
  ]

  const flattype = [
    { value: "1", label: "1BHK" },
    { value: "2", label: "2BHK" },

  ];
  const handleGatePassClose = () => {
    viewDemoClose("addgatepass")
    // setSingleAnnouncementData(null)
  }


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1"> Applications</span>
        </div>
        <div className="right-content">
          <span className='float-end btn btn-primary p-1 pe-2 ps-2 me-1' onClick={() => { viewDemoShow("addapplication"); }}><i className="bi bi-plus"></i> Add Applications</span>

          {/* Add Application Modal   */}

          <Modal show={addapplication} size="lg" centered>
            <Modal.Header>
              <Modal.Title>Applications</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addapplication"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addgatepass"); }}>
                    <img alt="" src={imagesData('gatepass')} />
                    <p>  Gate Pass</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox selected' onClick={() => { viewDemoShow("addchangeinname"); }}>
                    <img alt="" src={imagesData('changename')} />
                    <p>  Change In Name</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addcontactupdate"); }}>
                    <img alt="" src={imagesData('conatctupdate')} />
                    <p> Contact Update</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addparking"); }}>
                    <img alt="" src={imagesData('parking')} />
                    <p> Parking</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addflateresale"); }}>
                    <img alt="" src={imagesData('flatresale')} />
                    <p>Flat Resale</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addinteriorwork"); }}>
                    <img alt="" src={imagesData('interiorwork')} />
                    <p>Interior Work</p>
                  </div>
                </Col>


                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addcelebration"); }}>
                    <img alt="" src={imagesData('celebration')} />
                    <p> Celebration</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addtheater"); }}>
                    <img alt="" src={imagesData('theater')} />
                    <p>Theater</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addbanquethall"); }}>
                    <img alt="" src={imagesData('banquethall')} />
                    <p>Banquet Hall</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addclubhouse"); }}>
                    <img alt="" src={imagesData('clubhouse')} />
                    <p>Club House</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addswimmingpool"); }}>
                    <img alt="" src={imagesData('swimmingpool')} />
                    <p> Swimming Pool</p>
                  </div>
                </Col>
                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addplayarea"); }}>
                    <img alt="" src={imagesData('playarea')} />
                    <p> Play Area</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addturfarea"); }}>
                    <img alt="" src={imagesData('turfarea')} />
                    <p>Turf Area</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addrentagreement"); }}>
                    <img alt="" src={imagesData('rentagreement')} />
                    <p>Rent Agreement</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox' onClick={() => { viewDemoShow("addsharecerificate"); }}>
                    <img alt="" src={imagesData('sharecertificate')} />
                    <p> Share Certificate</p>
                  </div>
                </Col>
                <Col xl={3}>
                  <div className='applicationbox'>
                    <img alt="" src={imagesData('nomination')} />
                    <p> Nomination</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox'>
                    <img alt="" src={imagesData('badminton')} />
                    <p>Badminton Count</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox'>
                    <img alt="" src={imagesData('foodcourt')} />
                    <p>Food Court</p>
                  </div>
                </Col>

                <Col xl={3}>
                  <div className='applicationbox'>
                    <img alt="" src={imagesData('others')} />
                    <p> Others</p>
                  </div>
                </Col>


              </Row>
            </Modal.Body>

          </Modal>
          {/* Add Gate Pass Modal   */}
          {
            singleGatePassData && addgatepass ? <GatePassModal show={addgatepass} onClose={handleGatePassClose} editing={editing} initialVals={singleGatePassData} /> : <GatePassModal show={addgatepass} onClose={handleGatePassClose} editing={editing} />
          }

          {/* gate pass view modal */}
          <Modal show={gatepassview} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Gate Pass Details</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("gatepassview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Tabs
                defaultActiveKey="Tab 01"
                id="uncontrolled-tab-example"
                className="panel-tabs main-nav-line bd-b-1"
                transition={false}
              >

                <Tab eventKey="Tab 01" title="Details">
                  <Row>
                    <Col xl={8}>
                      <Card className='box-shadow border mt-3 border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Information</h5>
                          <Row>
                            <Col xl={12} className='mb-2'>
                              <Form.Label>Society</Form.Label>
                              <Link to={`${import.meta.env.BASE_URL}society/societyview`} className='tx-14 text-info'>Credit Bricks PVt Ltd</Link>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Property</Form.Label>
                              <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='tx-14 text-info'>A101</Link>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Gate Type</Form.Label>
                              <p className='tx-14'>Inward</p>
                            </Col>
                            <Col xl={4} className='mb-2'>
                              <Form.Label>Category</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>Tenant</p>
                            </Col>
                            <Col xl={4} className='mb-2'>
                              <Form.Label>Tenant Name</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>Ajay Sharma</p>
                            </Col>
                            <Col xl={4} className='mb-2'>
                              <Form.Label>Sub Category</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>Tenant Shifting In</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Member</Form.Label>
                              <p className='tx-14'>Test Member 1</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Gate Pass Number</Form.Label>
                              <p className='tx-14'>-</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Entry Date & Time</Form.Label>
                              <p className='tx-14 col-sm-11 p-0'>10/21/2023, 12:00 PM</p>
                            </Col>

                            <Col xl={4} className='mb-2'>
                              <Form.Label>Exit Date & Time</Form.Label>
                              <p className='tx-14'>10/23/2023, 12:00 PM </p>
                            </Col>

                          </Row>
                        </Card.Body>
                      </Card>

                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Approval Details</h5>

                          <table className='table mt-3'>
                            <thead>
                              <tr>
                                <th>Society</th>
                                <th>Tower</th>
                                <th>Wing</th>
                                <th>Flat </th>
                                <th>Approver</th>
                                <th>Designation</th>
                                <th>Application Type</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className='align-top'>-</td>
                                <td className='align-top'>Tower A</td>
                                <td className='align-top'>A</td>
                                <td className='align-top'>123</td>
                                <td>Sandeep Singh<br /><span className='text-muted'>9876543212</span></td>
                                <td className='align-top'>Secretary</td>
                                <td className='align-top'>Flat Resale</td>
                              </tr>


                            </tbody>
                          </table>

                        </Card.Body>
                      </Card>
                    </Col>

                    <Col xl={4}>
                      <Card className='box-shadow border mt-3 border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Vehicle and Driver Details</h5>
                          <Row>
                            <Col xl={5} className='mb-1 tx-12'>Driver Name</Col>
                            <Col xl={7} className='tx-semibold tx-14'>Rakesh Kumar</Col>
                            <Col xl={5} className='mb-1 tx-12'>Driver Contact </Col>
                            <Col xl={7} className='tx-semibold tx-12'>9876543212</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Number</Col>
                            <Col xl={7} className='tx-semibold tx-12'>HR4A7986</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Model</Col>
                            <Col xl={7} className='tx-semibold tx-12'>-</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Nature</Col>
                            <Col xl={7} className='tx-semibold tx-12'>Visitor Parking</Col>
                            <Col xl={5} className='mb-1 tx-12'>Vehicle Type</Col>
                            <Col xl={7} className='tx-semibold tx-12'>SUV</Col>
                          </Row>
                        </Card.Body>
                      </Card>

                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Contact Person Details</h5>
                          <Row>
                            <Col xl={5} className='mb-1 tx-12'>Contact Person</Col>
                            <Col xl={7} className='tx-semibold tx-14'>Anisha Bansal</Col>
                            <Col xl={5} className='mb-1 tx-12'>Contact Number </Col>
                            <Col xl={7} className='tx-semibold tx-12'>8800654786</Col>
                            <Col xl={5} className='mb-1 tx-12'>Remarks</Col>
                            <Col xl={7} className='tx-semibold tx-12'>-</Col>

                          </Row>
                        </Card.Body>
                      </Card>


                      <Card className='box-shadow border border-primary'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Application Description</h5>
                          <Row>
                            <Col xl={12} className='mb-1 tx-12'>Purpose</Col>
                            <Col xl={12} className='tx-semibold tx-14'>-</Col>
                            <Col xl={12} className='mb-1 tx-12'>Description </Col>
                            <Col xl={12} className='tx-semibold tx-12'>-</Col>

                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
                </Tab>
                <Tab eventKey="ApprovalHistory" title="Approval History">

                  <div className="table-responsive min-height500">
                    <table className='table table-bordered'>
                      <thead>
                        <tr>
                          <th>Step Name</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>	Assigned To</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Approval level 2</td>
                          <td>4/21/2023, 3:06 PM</td>
                          <td>Rejected</td>
                          <td>	Sarjerao Shinde</td>
                        </tr>

                        <tr>
                          <td>Approval level 1</td>
                          <td>4/21/2023, 3:02 PM</td>
                          <td>Approved</td>
                          <td>System Admin</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tab>


              </Tabs>


            </Modal.Body>
          </Modal>

          {/* Terms & condition modal */}
          <Modal show={termsconditionsview} centered>
            <Modal.Header>
              <Modal.Title>Terms & Conditions</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("termsconditionsview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Col xl={12} className='mb-1 tx-12 text-justify'><ol className='ps-2'><li className='mb-1'>Interest will be charged at 1.75% p.m. after the due date.</li>
                <li className='mb-1'>The cheque should be drawn in favor of CreditBricks Society. </li>
                <li className='mb-1'>No claim in respect of this bill will be entertained unless notified in writing within 10 days from the date of this bill.</li>
                <li className='mb-1'>If the dues are not cleared within 90 days, then the member shall be termed as a defaulter, and appropriate action will be taken by the society against the defaulters as per the Bylaws</li>
                <li className='mb-1'>In case of no response on the payment for a prolonged period the membership from the society can be terminated and expulsion procedure can be initiated.</li> <li>The penalty charges do not create any right in your favor.</li>
                <li className='mb-1'>Society reserves the right to enhance the penalty in case of continuing default and misuse.</li></ol></Col>

            </Modal.Body>
          </Modal>

          {/* Tenant View */}
          <Modal show={tenatview} size="xl" centered>
            <Modal.Header>
              <Modal.Title>Tenant Details</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("tenatview"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light'>
              <Row>
                <Col xl={8}>
                  <Card>
                    <Card.Body>
                      <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Details</h5>
                      <Row>
                        <Col xl={6} className='mb-2'>
                          <Form.Label>Society Name</Form.Label>
                          <Link to={`${import.meta.env.BASE_URL}society/societyview`} className='tx-15 text-info'>N/A</Link>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Property Name</Form.Label>
                          <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='tx-15 text-info'>N/A</Link>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Tenant Name</Form.Label>
                          <p className='tx-15'>Rohit Sharma</p>
                        </Col>
                        <Col xl={6} className='mb-2'>
                          <Form.Label>Tenant Number</Form.Label>
                          <p className='tx-15 col-sm-11 p-0'>1212621024</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Alternative Mobile</Form.Label>
                          <p className='tx-15 col-sm-11 p-0'>-</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Tenant Email</Form.Label>
                          <p className='tx-15'>orhit@gmail.com</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Date Of Birth</Form.Label>
                          <p className='tx-15'>2025-02-27</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Address</Form.Label>
                          <p className='tx-15 col-sm-11 p-0'>123st lauren</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>City</Form.Label>
                          <p className='tx-15'>Delhi</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>State</Form.Label>
                          <p className='tx-15'>Delhi</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Country</Form.Label>
                          <p className='tx-15'>India</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Pincode</Form.Label>
                          <p className='tx-15'>250007</p>
                        </Col>


                        <Col xl={6} className='mb-2'>
                          <Form.Label>Family Members</Form.Label>
                          <p className='tx-15'>8</p>
                        </Col>

                        <Col xl={6} className='mb-2'>
                          <Form.Label>Pets</Form.Label>
                          <p className='tx-15'>false</p>
                        </Col>

                      </Row>
                    </Card.Body>
                  </Card>

                </Col>

                <Col xl={4}>

                  <Card>
                    <Card.Body className='pb-3'>
                      <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Current Lease</h5>
                      <Row>
                        <Col xl={6}>
                          <p className='mb-0 text-muted'>Agreement Start Date</p>
                          <p className='tx-15 tx-semibold'>2025-02-28</p>
                          <p className='mb-0 text-muted'>Agreement End Date</p>
                          <p className='tx-15 tx-semibold mb-2'>2025-04-05</p>
                        </Col>
                        <Col xl={6} className='text-end'>
                          <p className='mb-0 text-muted'>Monthly Rent</p>
                          <p className='tx-15 tx-semibold text-primary'>₹ 5000</p>
                          <p className='mb-0 pt-2 text-muted'></p>
                          {/* <p className='tx-12 pt-3 mb-2 tx-danger'>Rent agreement is expired.</p> */}
                        </Col>

                        <Col xl={12}>

                          <Row>
                            <Col xl={6} className='text-muted text-bold'>
                              180 days left
                            </Col>
                            <Col xl={6} className='text-end text-muted text-bold'>
                              365 days left
                            </Col>
                          </Row>
                        </Col>

                        <Col xl={6}>
                          <p className='mb-0 mt-2 text-muted'>Due Amount</p>
                          <p className='tx-15 tx-semibold'>₹ 1000</p>
                        </Col>
                        <Col xl={6}>
                          <p className='mb-0 mt-2 text-muted text-end'>Deposit Amount</p>
                          <p className='tx-15 tx-semibold mb-0 text-end'>₹ 4000</p>
                        </Col>

                      </Row>

                    </Card.Body>

                  </Card>


                  <Card>
                    <Card.Body className='pb-1'>
                      <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Documents</h5>
                      <Row>
                        <Col xl={2} className='p-0'>
                          <img
                            alt="" className='w-100'
                            src={imagesData('pdficon')}
                          />
                        </Col>
                        <Col xl={9} className='p-0'>
                          <p className='tx-14 mb-0 mt-2 tx-semibold'>Rent Registration Id : 565675756</p>
                          <Link to={``} className="text-info">Download</Link>
                        </Col>
                      </Row>


                      <Row>
                        <Col xl={2} className='p-0'>
                          <img alt="" className='w-100'
                            src={imagesData('pdficon')}
                          />
                        </Col>
                        <Col xl={9} className='p-0'>
                          <p className='tx-14 mb-0 mt-2 tx-semibold'>Police Verification</p>
                          <Link to={``}
                            className="text-info">
                            Download
                          </Link>
                        </Col>

                      </Row>
                    </Card.Body>
                  </Card>


                  <Card>
                    <Card.Body className='pb-1'>
                      <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Vehicle Details</h5>
                      <Row>



                        <Row>
                          <Col xl={2} className='p-0'>
                            <img
                              alt="Vehicle Icon"
                              className='w-100'
                              src={imagesData('pdficon')} // You can use any relevant icon for vehicle files
                            />
                          </Col>
                          <Col xl={9} className='p-0'>
                            <p className='tx-14 mb-0 mt-2 tx-semibold'>
                              Vehicle No. dl1ct1004  <span className='text-muted'>(4Wheeler)</span>
                            </p>
                            <Link to={``}
                              className="text-info" >
                              Download
                            </Link>
                          </Col>
                        </Row>

                      </Row>
                    </Card.Body>
                  </Card>


                </Col>
              </Row>
            </Modal.Body>

          </Modal>

          {/* Add Change In Name */}
          <Modal show={addchangeinname} centered size='lg'>
            <Modal.Header>
              <Modal.Title>Change In Name</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addchangeinname"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="12">
                  <table className='table border mt-3 bg-white'>
                    <thead>
                      <tr>
                        <th>Owner Type</th>
                        <th>Old Name</th>
                        <th>New Name</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Owner</td>
                        <td>Suneel Singh</td>
                        <td>
                          <Form.Control
                            type="text"
                            disabled
                            placeholder="New Name"
                            className="form-control"
                          ></Form.Control></td>
                        <td><i className='bi bi-pencil text-primary cursor'></i></td>
                      </tr>

                      <tr>
                        <td>Co-Owner</td>
                        <td>Vishal Singh</td>
                        <td>
                          <Form.Control
                            type="text"
                            disabled
                            placeholder="New Name"
                            className="form-control"
                          ></Form.Control></td>
                        <td><i className='bi bi-pencil text-primary cursor'></i></td>
                      </tr>

                    </tbody>
                  </table>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addchangeinname"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addchangeinname"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Contact Update */}
          <Modal show={addcontactupdate} size="lg" centered>
            <Modal.Header>
              <Modal.Title>Contact Update</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addcontactupdate"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="6">
                  <Form.Group className="form-group">
                    <Form.Label>Old Number </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Old Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="6"></Col>
                <hr className='w-100 m-0' />
                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>New Number </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="New Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Contact Person Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Relation</Form.Label>
                    <Select
                      options={relation}
                      placeholder="Select relation"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="6"></Col>
                <hr className='w-100 m-0' />
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Alternative Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Contact Person Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Relation</Form.Label>
                    <Select
                      options={relation}
                      placeholder="Select relation"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <hr className='w-100 m-0' />
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addcontactupdate"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addcontactupdate"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {/* Add Parking */}
          <Modal show={addparking} size="xl" centered>
            <Modal.Header>
              <Modal.Title>Parking</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addparking"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="4">
                  <Form.Group className="form-group">
                    <Form.Label>Vehicle Type </Form.Label>
                    <Select
                      options={vehicletype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Registration Number </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>RC Issue Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyy"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>RC Expiry Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="dd/mm/yyy"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle RC Copy <small className='text-muted float-end'>Upload size : Max 2MB</small></Form.Label>
                    <Form.Control
                      type="file"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Relation</Form.Label>
                    <Select
                      options={relation}
                      placeholder="Select relation"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label className='mt-4 float-start w-100'></Form.Label>
                    <Button type="button" className='btn btn-default mt-1'>+ Add More Vehicle</Button>
                  </Form.Group>
                </Col>

                <Col xl="12">
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Vehicle Type</th>
                        <th>Registration Number</th>
                        <th>Rc Issue Dt</th>
                        <th>RC Expiry Dt</th>
                        <th>RC Copy</th>
                        <th>Owner Name</th>
                        <th>Relation</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2W</td>
                        <td></td>
                        <td>12/12/2020</td>
                        <td>12/122030</td>
                        <td><img alt="" src={imagesData('pdficon')} className='wd-50' /></td>
                        <td>Maahi Sharma</td>
                        <th>Self</th>
                        <td><i className='fa fa-trash text-danger cursor'></i></td>
                      </tr>
                    </tbody>
                  </table>
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

          {/* Add Flate Resale */}
          <Modal show={addflateresale} size="xl" centered>
            <Modal.Header>
              <Modal.Title>Flate Resale</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addflateresale"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='bg-light'>
              <Row>
                <Col xl={5}>
                  <Col xl={12} className='bg-white p-3 border rounded-3'>
                    <Row>
                      <Col xl={12}>
                        <p className='mb-2 tx-bold'>To share your payment receipt, kindly click on the "Yes" option</p>
                        <hr className='w-100 m-0' />
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share Transfer Documents Submitted</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="transferdocument" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Do you currently process the original share certificate?</Form.Label>
                          <Row>
                            <Col lg={3} onClick={() => { viewDemoShow("flateresaleuploadreciept"); }}>

                              <Form.Check type="radio" label="Yes" name="proccesscertificate" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="proccesscertificate" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="proccesscertificate" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Is there an existing home loan on your property?</Form.Label>
                          <Row>
                            <Col lg={3} onClick={() => { viewDemoShow("flateresaleuploadreciept"); }}>

                              <Form.Check type="radio" label="Yes" name="existinghomeloanproperty" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="existinghomeloanproperty" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="existinghomeloanproperty" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Have you fully settled your home loan?</Form.Label>
                          <Row>
                            <Col lg={3} onClick={() => { viewDemoShow("Uploadloanclosure"); }}>

                              <Form.Check type="radio" label="Yes" name="fullysettledhomeloan" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="fullysettledhomeloan" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="fullysettledhomeloan" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share Transfer Premium Paid</Form.Label>
                          <Row>
                            <Col lg={3} onClick={() => { viewDemoShow("flateresaleuploadreciept"); }}>

                              <Form.Check type="radio" label="Yes" name="transferpremiumpaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferpremiumpaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="transferpremiumpaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Share Transfer Fees Paid</Form.Label>
                          <Row>
                            <Col lg={3} onClick={() => { viewDemoShow("flateresaleuploadreciept"); }}>

                              <Form.Check type="radio" label="Yes" name="transferfeespaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferfeespaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="transferfeespaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Membership Fee Paid</Form.Label>
                          <Row>
                            <Col lg={3} onClick={() => { viewDemoShow("flateresaleuploadreciept"); }}>

                              <Form.Check type="radio" label="Yes" name="membershipfeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="membershipfeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="membershipfeepaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Entrance Fee Paid</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="entrancefeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="entrancefeepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="entrancefeepaid" />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Other Charges Paid</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="otherchargepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="otherchargepaid" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="N/A" name="otherchargepaid" />
                            </Col>
                            <Col xl={12} className='pt-2'>
                              <Form.Control
                                type="text"
                                placeholder="Other Charges"
                                className="form-control"
                              ></Form.Control>
                            </Col>
                          </Row>

                        </Form.Group>
                      </Col>


                    </Row>
                  </Col>
                </Col>

                <Col xl={7}>
                  <Col xl={12} className='bg-white p-3 border rounded-3'>
                    <Row>
                      <Col xl={12}>
                        <p className='mb-2 tx-bold'>Documents</p>
                        <hr className='w-100 m-0' />
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Sale Agreement Copy</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Flat Registration Certificate</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>


                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Home Loan Sanction Letter</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Old Owner Home Loan Closure Letter</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="transferdocument" />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="transferdocument" />
                            </Col>
                            <Col lg={6}>
                              <small className='text-muted float-end'>Size : Max 2MB</small>
                            </Col>
                            <Col xl={12} className='mt-1'>
                              <Form.Control
                                type="file"
                                placeholder=""
                                className="form-control"
                              ></Form.Control>
                            </Col>

                          </Row>
                        </Form.Group>
                      </Col>


                    </Row>
                  </Col>

                  <Col xl={12} className='bg-white p-3 border rounded-3 mt-3'>
                    <Row>
                      <Col xl={12}>
                        <p className='mb-2 tx-bold'>Joint Holder</p>
                        <hr className='w-100 m-0' />
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Joint Holder</Form.Label>
                          <Row>
                            <Col lg={3}>

                              <Form.Check type="radio" label="Yes" name="jointholder" checked />
                            </Col>
                            <Col lg={3}>

                              <Form.Check type="radio" label="No" name="jointholder" />
                            </Col>


                          </Row>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0 mt-0">
                          <Form.Label>Owner Name <small className='text-muted tx-bold'>(As per Agreement)</small></Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Co-owner Name <small className='text-muted tx-bold'>(As per Agreement)</small>

                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            className="form-control"
                          ></Form.Control>
                          <small className='float-end text-black tx-bold cursor mt-1'>+ Add</small>
                        </Form.Group>
                      </Col>
                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Flat Registration ID </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="ID"
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>

                      <Col xl={6}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Flat Registration Copy </Form.Label>
                          <Form.Control
                            type="file"
                            placeholder=""
                            className="form-control"
                          ></Form.Control>
                        </Form.Group>
                      </Col>



                    </Row>
                  </Col>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addflateresale"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addflateresale"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {/* Flate Resale upload reciept */}
          <Modal show={flateresaleuploadreciept} centered>
            <Modal.Header>
              <Modal.Title>Upload Reciept</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("flateresaleuploadreciept"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="form-group mb-0">
                <Form.Label>Upload <small className='text-muted float-end'>Upload Size : 2MB</small> </Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                  className="form-control"
                ></Form.Control>
              </Form.Group>
              <Col xl={12} className='bg-light p-2 mt-2'>
                <span className='tx-semibold'>recieptfile.pdf</span>
                <i className='fa fa-trash text-danger float-end cursor'></i>
              </Col>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("flateresaleuploadreciept"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("flateresaleuploadreciept"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Upload loan closure*/}
          <Modal show={Uploadloanclosure} centered>
            <Modal.Header>
              <Modal.Title>Upload loan Closure Letter</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("Uploadloanclosure"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Form.Group className="form-group mb-0">
                <Form.Label>Upload <small className='text-muted float-end'>Upload Size : 2MB</small> </Form.Label>
                <Form.Control
                  type="file"
                  placeholder=""
                  className="form-control"
                ></Form.Control>
              </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("Uploadloanclosure"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("Uploadloanclosure"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Interior Work */}
          <Modal show={addinteriorwork} size='lg' centered>
            <Modal.Header>
              <Modal.Title>Interior Work</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addinteriorwork"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="6">
                  <Form.Group className="form-group">
                    <Form.Label>Work Type </Form.Label>
                    <Select
                      options={worktype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Category </Form.Label>
                    <Select
                      options={interiorcategory}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Work Description
                      <small className='text-muted float-end'>max 250 character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Eg. Scope of work, job details, work summary' cols="60" rows="5"></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Vendor Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vendor Contact Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Vehicle Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Is the written request filed with the Society Office?</Form.Label>
                    <Row>
                      <Col lg={3}>

                        <Form.Check type="radio" label="Yes" name="transferdocument" />
                      </Col>
                      <Col lg={3}>

                        <Form.Check type="radio" label="No" name="transferdocument" />
                      </Col>

                    </Row>
                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Did the tenant undertake this work?</Form.Label>
                    <Row>
                      <Col lg={3}>

                        <Form.Check type="radio" label="Yes" name="transferdocument" />
                      </Col>
                      <Col lg={3}>

                        <Form.Check type="radio" label="No" name="transferdocument" />
                      </Col>

                    </Row>
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Does the work include elements such as columns,
                      beams, flooring, and ceilings?</Form.Label>
                    <Row>
                      <Col lg={3}>

                        <Form.Check type="radio" label="Yes" name="transferdocument" />
                      </Col>
                      <Col lg={3}>

                        <Form.Check type="radio" label="No" name="transferdocument" />
                      </Col>

                    </Row>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col lg={12} className='tx-bold'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addinteriorwork"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addinteriorwork"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add celebration */}
          <Modal show={addcelebration} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Celebration</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addcelebration"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="4">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Occasion</Form.Label>
                    <Select
                      options={occasion}
                      placeholder="Select occasion"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="2">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Day</Form.Label>
                    <Select
                      options={day}
                      placeholder="Select day"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="2">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>No. of Guest </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Start Date & Time</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>End Date & Time</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>
                  </Form.Group>
                </Col>





                <Col xl="4">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Venue</Form.Label>
                    <Select
                      options={venue}
                      placeholder="Select venue"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Name of the Organizer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Contatc Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="details"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Does this celebration include any of the following?</Form.Label>
                    <Form.Group className="form-group mb-0">

                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Catering Service</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="CateringService" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="CateringService" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Decorations</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="Decorations" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="Decorations" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Sound System</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="SoundSystem" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="SoundSystem" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Guest Parking</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="GuestParking" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="GuestParking" />
                        </Col>

                      </Row>
                    </Form.Group>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addcelebration"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addcelebration"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add theater */}
          <Modal show={addtheater} centered>
            <Modal.Header>
              <Modal.Title>Theater</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addtheater"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>


                <Col xl="12">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>No of Participants</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Show</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="show"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Show Timing</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>





                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label clas>Do you have passes for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col lg={12} className='tx-bold'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addtheater"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addtheater"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Banquet Hall */}
          <Modal show={addbanquethall} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Banquet Hall</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addbanquethall"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body className='bg-light'>
              <Accordion defaultActiveKey="basicinfo">
                <Accordion.Item eventKey="basicinfo">
                  <Accordion.Header>Basic Information</Accordion.Header>
                  <Accordion.Body className='p-2'>
                    <Row>
                      <Col xl="4">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Society </Form.Label>
                          <Select
                            options={society}
                            placeholder="Select society"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="4">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Property </Form.Label>
                          <Select
                            options={property}
                            placeholder="Select property"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl="4">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Occasion</Form.Label>
                          <Select
                            options={occasion}
                            placeholder="Select occasion"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="2">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Day</Form.Label>
                          <Select
                            options={day}
                            placeholder="Select day"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="2">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>No. of Guest </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Number"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Start Date & Time</Form.Label>
                          <InputGroup className="input-group w-100 datetimepicker-2">

                            <Form.Control
                              className="form-control"
                              id="datetime-local"
                              type="datetime-local"
                              defaultValue="2020-01-16T14:22"

                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>


                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>End Date & Time</Form.Label>
                          <InputGroup className="input-group w-100 datetimepicker-2">

                            <Form.Control
                              className="form-control"
                              id="datetime-local"
                              type="datetime-local"
                              defaultValue="2020-01-16T14:22"

                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>





                      <Col xl="4">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Venue</Form.Label>
                          <Select
                            options={venue}
                            placeholder="Select venue"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Name of the Organizer</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="name"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Contatc Details</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="details"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label clas>Does this celebration include any of the following?</Form.Label>
                          <Form.Group className="form-group mb-0">

                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Catering Service</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="CateringService" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="CateringService" />
                              </Col>

                            </Row>
                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Decorations</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="Decorations" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="Decorations" />
                              </Col>

                            </Row>
                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Sound System</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="SoundSystem" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="SoundSystem" />
                              </Col>

                            </Row>
                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Guest Parking</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="GuestParking" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="GuestParking" />
                              </Col>

                            </Row>
                          </Form.Group>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group">
                          <Form.Label>Remarks
                            <small className='text-muted float-end'>max 250 Character</small>
                          </Form.Label>
                          <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="approvaldetails">
                  <Accordion.Header>Approval Details</Accordion.Header>
                  <Accordion.Body className='p-2'>
                    <Row>
                      <Col xl="4">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Society </Form.Label>
                          <Select
                            options={society}
                            placeholder="Select society"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="4">
                        <Form.Group className="form-group mb-1">
                          <Form.Label>Property </Form.Label>
                          <Select
                            options={property}
                            placeholder="Select property"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl="4">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Occasion</Form.Label>
                          <Select
                            options={occasion}
                            placeholder="Select occasion"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="2">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Day</Form.Label>
                          <Select
                            options={day}
                            placeholder="Select day"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl="2">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>No. of Guest </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Number"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Start Date & Time</Form.Label>
                          <InputGroup className="input-group w-100 datetimepicker-2">

                            <Form.Control
                              className="form-control"
                              id="datetime-local"
                              type="datetime-local"
                              defaultValue="2020-01-16T14:22"

                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>


                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>End Date & Time</Form.Label>
                          <InputGroup className="input-group w-100 datetimepicker-2">

                            <Form.Control
                              className="form-control"
                              id="datetime-local"
                              type="datetime-local"
                              defaultValue="2020-01-16T14:22"

                            />
                          </InputGroup>
                        </Form.Group>
                      </Col>





                      <Col xl="4">
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Venue</Form.Label>
                          <Select
                            options={venue}
                            placeholder="Select venue"
                            classNamePrefix="Select2"
                          />
                          {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Name of the Organizer</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="name"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>

                      <Col xl={4}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label>Contact Details</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="details"
                            className="form-control"
                          ></Form.Control>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>
                      <Col xl={12}>
                        <Form.Group className="form-group mb-0">
                          <Form.Label clas>Does this celebration include any of the following?</Form.Label>
                          <Form.Group className="form-group mb-0">

                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Catering Service</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="CateringService" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="CateringService" />
                              </Col>

                            </Row>
                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Decorations</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="Decorations" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="Decorations" />
                              </Col>

                            </Row>
                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Sound System</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="SoundSystem" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="SoundSystem" />
                              </Col>

                            </Row>
                            <Row>
                              <Col lg={10}>
                                <Form.Label className='text-muted'>Guest Parking</Form.Label>
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="Yes" name="GuestParking" />
                              </Col>
                              <Col lg={1} className='mt-2'>

                                <Form.Check type="radio" label="No" name="GuestParking" />
                              </Col>

                            </Row>
                          </Form.Group>
                        </Form.Group>
                      </Col>

                      <Col xl={12}>
                        <Form.Group className="form-group">
                          <Form.Label>Remarks
                            <small className='text-muted float-end'>max 250 Character</small>
                          </Form.Label>
                          <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                          {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                        </Form.Group>
                      </Col>


                    </Row>
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>

              <Col xl={12} className='p-0'>
                <label><input type="checkbox" className='float-start m-2' /><b className='float-start mt-1 cursor' onClick={() => { viewDemoShow("termsconditionsview"); }}> Terms & Conditions</b></label>
              </Col>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addbanquethall"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addbanquethall"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Club House */}
          <Modal show={addclubhouse} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Club House</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addclubhouse"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="4">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Occasion</Form.Label>
                    <Select
                      options={occasion}
                      placeholder="Select occasion"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="2">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Day</Form.Label>
                    <Select
                      options={day}
                      placeholder="Select day"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="2">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>No. of Guest </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Start Date & Time</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>End Date & Time</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>
                  </Form.Group>
                </Col>





                <Col xl="4">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Venue</Form.Label>
                    <Select
                      options={venue}
                      placeholder="Select venue"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Name of the Organizer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Contact Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="details"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Does this celebration include any of the following?</Form.Label>
                    <Form.Group className="form-group mb-0">

                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Catering Service</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="CateringService" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="CateringService" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Decorations</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="Decorations" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="Decorations" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Sound System</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="SoundSystem" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="SoundSystem" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Guest Parking</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="GuestParking" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="GuestParking" />
                        </Col>

                      </Row>
                    </Form.Group>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addclubhouse"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addclubhouse"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Swimming pool */}
          <Modal show={addswimmingpool} centered size='lg'>
            <Modal.Header>
              <Modal.Title>Swimming Pool</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addswimmingpool"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body className='pt-0'>
              <Row>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <div className='bg-light w-100 mb-2 mt-2'>
                  <Row>
                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Name of Participant</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          className="form-control"
                        ></Form.Control>
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Age"
                          className="form-control"
                        ></Form.Control>
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Gender</Form.Label>
                        <Select
                          options={gender}
                          placeholder="Select Gender"
                          classNamePrefix="Select2"
                        />
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Medical Diseases</Form.Label>
                        <Select
                          options={medicaldiseases}
                          placeholder="Select Diseases"
                          classNamePrefix="Select2"
                        />
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="4">
                      <Form.Group className="form-group mb-1">
                        <Form.Label>Name of the Diseases</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Diseases"
                          className="form-control"
                        ></Form.Control>
                        {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                      </Form.Group>
                    </Col>

                    <Col xl="2">
                      <Form.Label className='pb-1'></Form.Label>
                      <Button type='button' className='btn btn-primary mt-3'>
                        + Add
                      </Button>
                    </Col>
                    <Col xl="12">
                      <table className='table border mt-3 bg-white'>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Medical Diseases</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Vishal Sharma</td>
                            <td>35</td>
                            <td>Male</td>
                            <td>No</td>
                            <td><i className='bi bi-trash text-danger cursor'></i></td>
                          </tr>
                          <tr>
                            <td>Surbhi Sharma</td>
                            <td>32</td>
                            <td>Female</td>
                            <td>No</td>
                            <td><i className='bi bi-trash text-danger cursor'></i></td>
                          </tr>
                          <tr>
                            <td>Shikha Sharma</td>
                            <td>13</td>
                            <td>Female</td>
                            <td>Yes, Skin Allergy </td>
                            <td><i className='bi bi-trash text-danger cursor'></i></td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </div>

                <Col xl={4}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Pool Date & Timing</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>

                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>

                  <Form.Group className="form-group mb-1">
                    <Form.Label>Duration</Form.Label>
                    <Select
                      options={duration}
                      placeholder="Select duration"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks'></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>

                </Col>




                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label clas>Do you have passes for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Do you have swimming costume for all the
                      participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>





                <Col lg={12} className='tx-bold mt-2'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addswimmingpool"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addswimmingpool"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Play Area */}
          <Modal show={addplayarea} size='xl' centered>
            <Modal.Header>
              <Modal.Title>Play Area</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addplayarea"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Society </Form.Label>
                    <Select
                      options={society}
                      placeholder="Select society"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="4">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Property </Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl="4">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Occasion</Form.Label>
                    <Select
                      options={occasion}
                      placeholder="Select occasion"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="2">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Day</Form.Label>
                    <Select
                      options={day}
                      placeholder="Select day"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="2">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>No. of Guest </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Start Date & Time</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>
                  </Form.Group>
                </Col>


                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>End Date & Time</Form.Label>
                    <InputGroup className="input-group w-100 datetimepicker-2">

                      <Form.Control
                        className="form-control"
                        id="datetime-local"
                        type="datetime-local"
                        defaultValue="2020-01-16T14:22"

                      />
                    </InputGroup>
                  </Form.Group>
                </Col>





                <Col xl="4">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Venue</Form.Label>
                    <Select
                      options={venue}
                      placeholder="Select venue"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Name of the Organizer</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Contatc Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="details"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Does this celebration include any of the following?</Form.Label>
                    <Form.Group className="form-group mb-0">

                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Catering Service</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="CateringService" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="CateringService" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Decorations</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="Decorations" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="Decorations" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Sound System</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="SoundSystem" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="SoundSystem" />
                        </Col>

                      </Row>
                      <Row>
                        <Col lg={10}>
                          <Form.Label className='text-muted'>Guest Parking</Form.Label>
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="Yes" name="GuestParking" />
                        </Col>
                        <Col lg={1} className='mt-2'>

                          <Form.Check type="radio" label="No" name="GuestParking" />
                        </Col>

                      </Row>
                    </Form.Group>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addplayarea"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addplayarea"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>


          {/* Add Turf Area */}
          <Modal show={addturfarea} centered>
            <Modal.Header>
              <Modal.Title>Turf Area</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addturfarea"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>


                <Col xl="12">
                  <Form.Group className="form-group mb-1">
                    <Form.Label>No of Participants</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Number"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>



                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Sport Activity</Form.Label>
                    <Select
                      options={sportactivity}
                      placeholder="Select activity"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>





                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Do you have passes for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Do you have game resources for all the participants?</Form.Label>
                    <Row>

                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="Yes" name="participants" />
                      </Col>
                      <Col lg={2} className='mt-2'>

                        <Form.Check type="radio" label="No" name="participants" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group">
                    <Form.Label>Remarks
                      <small className='text-muted float-end'>max 250 Character</small>
                    </Form.Label>
                    <textarea className="form-control" placeholder='Remarks' cols="60" rows="5"></textarea>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col lg={12} className='tx-bold'>

                  <Form.Check type="checkbox" label="Terms and Conditions" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addturfarea"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addturfarea"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Rent Agreement */}
          <Modal show={addrentagreement} size='lg' centered>
            <Modal.Header>
              <Modal.Title>Rent Agreement</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addrentagreement"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>
                <Col xl="6">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Flat Type</Form.Label>
                    <Select
                      options={flattype}
                      placeholder="Select type"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl="6">
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Property Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="2 BHK Apartment, Fully Furnished, etc."
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Monthly Rent</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter amount"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter amount"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Mode of Payment</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., Bank Transfer, Cash, etc."
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Due Date of Rent Payment</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g., 1st of every month"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label clas>Electricity</Form.Label>
                    <Row>

                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Tenant" name="Electricity" />
                      </Col>
                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Owner" name="Electricity" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label clas>Water Charges</Form.Label>
                    <Row>

                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Tenant" name="WaterCharges" />
                      </Col>
                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Owner" name="WaterCharges" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label clas>Maintenance Charges</Form.Label>
                    <Row>

                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Tenant" name="MaintenanceCharges" />
                      </Col>
                      <Col lg={4} className='mt-2'>

                        <Form.Check type="radio" label="Owner" name="MaintenanceCharges" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>
                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Other Charges <small className='text-muted'>(Specify if Any)</small></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Other charges"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>
                <Col xl={12}>
                  <strong>If the renewal is for the same tenant</strong>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group mt-3">
                    <Form.Label>Name of the Tenant</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mt-3">
                    <Form.Label>Tenant Contact Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="details"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={4}>
                  <Form.Group className="form-group mt-3">
                    <Form.Label>Parking Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="details"
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addrentagreement"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addrentagreement"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

          {/* Add Share Certificate */}
          <Modal show={addsharecerificate} size='lg' centered>
            <Modal.Header>
              <Modal.Title>Share Certificate</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addsharecerificate"); }}>
                x
              </Button>
            </Modal.Header>

            <Modal.Body>
              <Row>


                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Have the following documents been submitted to
                      the society office?</Form.Label>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Agreement Copy</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="FlatAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="FlatAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="FlatAgreementCopy" />
                      </Col>

                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Home Loan Sanction Letter</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="homeloansanctionletter" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="homeloansanctionletter" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="homeloansanctionletter" />
                      </Col>

                    </Row>


                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Registration Details </Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="flatregistrationdetails" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="flatregistrationdetails" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="flatregistrationdetails" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Applicable only to flat resale transactions</Form.Label>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Agreement Copy</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="FlatAgreementCopy1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="FlatAgreementCopy1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="FlatAgreementCopy1" />
                      </Col>

                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Home Loan Sanction Letter</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="homeloansanctionletter1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="homeloansanctionletter1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="homeloansanctionletter1" />
                      </Col>

                    </Row>


                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Flat Registration Details </Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="flatregistrationdetails1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="flatregistrationdetails1" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="flatregistrationdetails1" />
                      </Col>

                    </Row>


                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-0">
                    <Form.Label>Applicable only to rented flats</Form.Label>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Rent Agreement Copy</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="RentAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="RentAgreementCopy" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="RentAgreementCopy" />
                      </Col>

                    </Row>

                    <Row>
                      <Col lg={6}>
                        <Form.Label className='text-muted'>Police Verification</Form.Label>
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="Yes" name="PoliceVerification" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="No" name="PoliceVerification" />
                      </Col>
                      <Col lg={2} className='mt-3'>

                        <Form.Check type="radio" label="N/A" name="PoliceVerification" />
                      </Col>

                    </Row>

                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group">
                    <Form.Label>Maintenance Outstanding</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="form-control"
                    ></Form.Control>
                    {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addsharecerificate"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addsharecerificate"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>

        </div>
      </div>

      <Row>
        <Col xl={12}>

          <Card className='m-0'>
            <CardHeader className='pb-0'>
              <h3 className='card-title'> Filter</h3>
            </CardHeader>
            <Card.Body className='pt-0 pb-1'>
              <Row>
                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Property</Form.Label>
                    <Select
                      options={property}
                      placeholder="Select property"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Application Category</Form.Label>
                    <Select
                      options={applicationtype}
                      placeholder="Select application"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>

                <Col xl={3}>
                  <Form.Group className="form-group">
                    <Form.Label>Status </Form.Label>
                    <Select
                      options={status}
                      placeholder="Select status"
                      classNamePrefix="Select2"
                    />
                    {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                  </Form.Group>
                </Col>


                <Col xl={2} className='pt-1'>
                  <Form.Group className="form-group pt-4">
                    {/* <Button className="btn btn-default" type="button">Search </Button> */}
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className='mt-3'>
            <CardHeader>
              <h3 className='card-title float-start'>   List of Apllications </h3>
              <Link to={`${import.meta.env.BASE_URL}eventbooking/eventbooking`} className='float-end btn btn-primary p-1 pe-2 ps-2 me-1'><i className='bi bi-calendar'></i>&nbsp; Event Calendar</Link>
            </CardHeader>
            <Card.Body className='pt-0'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>S.no.</th>
                    <th>Application Id</th>
                    <th>Property</th>
                    <th>Member</th>
                    <th>Society</th>
                    <th>Application Category</th>
                    <th>Status</th>
                    <th>Date & Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td><span onClick={() => { viewDemoShow("gatepassview"); }} className='text-info cursor'>AP-00012</span></td>
                    <td><Link to={``} className='text-info'>A101</Link></td>
                    <td><Link to={``} className='text-info'>Test CreditBricks Society</Link></td>
                    <td>Tests society Member</td>
                    <td>Gate Pass</td>
                    <td>Level 2 Rejected</td>
                    <td>02/3/2025</td>
                    <td><Dropdown >
                      <Dropdown.Toggle variant="light" className='btn-sm' id="dropdown-basic">
                        Action
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item >Edit</Dropdown.Item>
                        <Dropdown.Item className='text-danger'>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown></td>
                  </tr>


                </tbody>
              </table>

            </Card.Body>
          </Card>

        </Col>

      </Row>
      < CustomToastContainer />

    </Fragment >
  );
}
