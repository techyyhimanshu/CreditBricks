import { Fragment } from 'react';
import { Col, Row, Card, Tab, Nav, CardBody, CardHeader } from "react-bootstrap";
import { imagesData } from "../../common/commonimages";
import { Link } from "react-router-dom";

export default function UserProfile() {


  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
        <span className="main-content-title mg-b-0 mg-b-lg-1">User Profile</span>
        </div>

        <div className="right-content">
        <Link to={``} className="btn btn-primary p-1 pe-2 ps-2 me-1"><i className="bi bi-pencil"></i>&nbsp; Edit</Link>
        </div>

      </div>

      <Row>
        <Col xl={12}>
        <div>
  <div className="">
    <div className="panel panel-primary ">
      <div className="tab-menu-heading tabs-style-4">
        <div className="tabs-menu ">
          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey="TabStyle01"
          >
            <Row>
              <Col sm={3}>
                <Card>
                  <CardBody>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="TabStyle01">
                    My Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="TabStyle02">
                   Documents
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="TabStyle03">
                      Properties
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="TabStyle04">
                    <Link className='p-0' to={``}>Loan</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="TabStyle05">
                    <Link className='p-0' to={``}> Parking</Link>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="TabStyle06">
                    <Link className='p-0' to={`${import.meta.env.BASE_URL}accounts/accounts`}>Accounts   </Link>
</Nav.Link>
                  </Nav.Item>
                 <Nav.Item>
                    <Nav.Link eventKey="TabStyle08">
                 Logout
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                </CardBody>
                </Card>
              </Col>
              <Col sm={9} className='p-0'>

                <Tab.Content className="tabs-style-4 profile-tab">
                  <Tab.Pane eventKey="TabStyle01">
                  <Card className='mb-3'>
                  <CardBody>
                    <div
                      className="panel-body tabs-menu-body"
                      id="tab21"
                    >
 <div className=" d-md-flex bg-white">
            <div className="">
              <span className="profile-image pos-relative">
                <img
                  alt=""
                  src={imagesData('female1')}
                />

              </span>
            </div>
            <div className="my-md-auto mt-5 prof-details">
              <h4 className="font-weight-semibold ms-md-4 mt-3 ms-0 mb-21 pb-0">
                Rahul Sharma

              </h4>
              <p className="text-muted ms-md-4 ms-0 mb-3 pb-2 ">
                <span className="me-1 d-inline-block">
                  <i className="far fa-address-card me-2"></i>Member (Club)
                </span><br/>
                <span className="mt-1 d-inline-block">
                  <i className="fa fa-map-marker me-2"></i>A-204, Oyster, SkVilla Noida
                </span>

              </p>

            </div>

           </div>
                    </div>
                    </CardBody>
                </Card>

                <Card className='mb-3'>
                  <CardHeader>
                    <h5>Personal Information

                    </h5>
                  </CardHeader>
                  <CardBody className='pt-0'>
<Row>
  <Col xl={4} className='profile_info mb-2'>
    <label>First Name</label>
    <strong>Rahul</strong>
  </Col>
  <Col xl={4} className='profile_info mb-2'>
    <label>Last Name</label>
    <strong>Sharma</strong>
  </Col>

  <Col xl={4} className='profile_info mb-2'>
    <label>Email Address</label>
    <strong>rahul@gmail.com</strong>
  </Col>
  <Col xl={4} className='profile_info mb-2'>
    <label>Phone</label>
    <strong>+91 9876543212</strong>
  </Col>
  <Col xl={4} className='profile_info'>
    <label>Alternative Mobile No.</label>
    <strong>888 888 8888</strong>
  </Col>
  <Col xl={4} className='profile_info'>
    <label>Date of Birth</label>
    <strong>06/Oct/1995</strong>
  </Col>

  <Col xl={4} className='profile_info'>
    <label>Age</label>
    <strong>30 Yrs</strong>
  </Col>

  <Col xl={4} className='profile_info'>
    <label>Anniversary</label>
    <strong>29/June/2016</strong>
  </Col>
</Row>
                    </CardBody>
                </Card>

                <Card className='mb-3'>
                  <CardHeader>
                    <h5>Address Details

                    </h5>
                  </CardHeader>
                  <CardBody className='pt-0'>
<Row>
  <Col xl={4} className='profile_info mb-2'>
    <label>Country</label>
    <strong>India</strong>
  </Col>
  <Col xl={4} className='profile_info mb-2'>
    <label>City/State</label>
    <strong>Noida, Uttar Pradesh</strong>
  </Col>
  <Col xl={4} className='profile_info'></Col>
  <Col xl={4} className='profile_info mb-2'>
    <label>Zip Code</label>
    <strong>201107</strong>
  </Col>
  <Col xl={4} className='profile_info mb-2'>
    <label>Address</label>
    <strong>-</strong>
  </Col>

</Row>
                    </CardBody>
                </Card>

                  </Tab.Pane>
                  <Tab.Pane eventKey="TabStyle02">
                  <Card className='mb-3'>
                  <CardHeader>
                    <h5>Document Details

                    </h5>
                  </CardHeader>
                  <CardBody className='pt-0'>
<Row>
  <Col xl={4} className='profile_info mb-3'>
    <label>Aadhar No</label>
    <strong>546456567678789</strong>
  </Col>

  <Col xl={4} className='profile_info mb-3'>
    <label>Pan No.</label>
    <strong>GFS987X8</strong>
  </Col>
  <Col xl={4} className='profile_info mb-3'></Col>
  <Col xl={4} className='profile_info mb-3'>
    <label>Passport No.</label>
    <strong>546456567678789</strong>
  </Col>
  <Col xl={4} className='profile_info mb-3'>
    <label>GSTIN No. (Member)</label>
    <strong>-</strong>
  </Col>

</Row>
                    </CardBody>
                </Card>
                  </Tab.Pane>

                </Tab.Content>


              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </div>
  </div>
</div>

        </Col>
      </Row>


    </Fragment>
  );
}
