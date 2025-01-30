import { Fragment } from 'react';
import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import * as chart from "../../../common/chartdata";
import { Doughnut, Line } from "react-chartjs-2";
import { imagesData } from "../../../common/commonimages";

const Dashboard = () => {

  return (
    <Fragment>
      <Pageheader title="Dashboard" heading="Dashboard" active="Dashboard" />
      <Row>
            <Col xl={2}>
              <Card>
                <Card.Body className='pt-3 ps-4 pe-4 pb-3'>
                  <Row>
                    <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-primary text-center align-self-center overflow-hidden shadow">
                        <i className="bi bi-emoji-frown tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="d-flex">
                        <h6 className="mb-2 tx-12">Total Number Of Bills Generated</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="tx-18 font-weight-semibold mb-0">
                        1.8k
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Row>

                </Card.Body>
              </Card>
            </Col>

            <Col xl={2}>
              <Card>
                <Card.Body className='pt-3 ps-4 pe-4 pb-3'>
                  <Row>
                    <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-success text-center align-self-center overflow-hidden shadow">
                        <i className="bi bi-file-earmark-text tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="d-flex">
                        <h6 className="mb-2 tx-12">Total<br/>Receipts</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="tx-18 font-weight-semibold mb-0">
                         279
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Row>

                </Card.Body>
              </Card>
            </Col>


            <Col xl={2}>
              <Card>
                <Card.Body className='pt-3 ps-4 pe-4 pb-3'>
                  <Row>
                    <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-info text-center align-self-center overflow-hidden shadow">
                        <i className="bi bi-file-medical tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="d-flex">
                        <h6 className="mb-2 tx-12">Total Bill Amount Generated</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="tx-18 font-weight-semibold mb-0">
                            <i className='fa fa-rupee'></i> 5.2M
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Row>

                </Card.Body>
              </Card>
            </Col>

            <Col xl={2}>
              <Card>
                <Card.Body className='pt-3 ps-4 pe-4 pb-3'>
                  <Row>
                    <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-warning text-center align-self-center overflow-hidden shadow">
                        <i className="bi bi-people tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="d-flex">
                        <h6 className="mb-2 tx-12">Total Receipt Amount Collected</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="tx-18 font-weight-semibold mb-0">
                          <i className='fa fa-rupee'></i> 0
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Row>

                </Card.Body>
              </Card>


            </Col>


            <Col xl={2}>
              <Card>
                <Card.Body className='pt-3 ps-4 pe-4 pb-3'>
                  <Row>
                    <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-danger text-center align-self-center overflow-hidden shadow">
                        <i className="bi bi-people tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="d-flex">
                        <h6 className="mb-2 tx-12">Over due Aging Report</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="tx-18 font-weight-semibold mb-0">
                          <i className='fa fa-rupee'></i> 0
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Row>

                </Card.Body>
              </Card>


            </Col>

            <Col xl={2}>
              <Card>
                <Card.Body className='pt-3 ps-4 pe-4 pb-3'>
                  <Row>
                    <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                      <div className="circle-icon bg-purple text-center align-self-center overflow-hidden shadow">
                        <i className="bi bi-people tx-15 text-white"></i>
                      </div>
                    </div>
                    <div className="col-10">
                      <div className="d-flex">
                        <h6 className="mb-2 tx-12">Total Complaints Received</h6>
                      </div>
                      <div className="pb-0 mt-0">
                        <div className="d-flex">
                          <h4 className="tx-18 font-weight-semibold mb-0">
                          33
                          </h4>
                        </div>
                      </div>
                    </div>
                  </Row>

                </Card.Body>
              </Card>


            </Col>

          </Row>
      <Row>
        <Col xl={8}>


          <Card>
            <Card.Header className="bg-transparent pb-0">
              <div>
                <h3 className="card-title mb-2"> Wing wise total bills generated</h3>
              </div>
            </Card.Header>
            <Card.Body className="apexchart apexchart1">
              <Line
                options={chart.Linechart}
                data={chart.linechartdata}
               height='100px'
                id="chartLine1"
              />

            </Card.Body>
          </Card>

          <Card>
            <Card.Body className='p-2 pt-3 pb-3'>

            <div className="list-group-item list-group-item-action border-0 p-0">
                        <div className="media mt-0">
                          <img
                            className="avatar-lg rounded-circle me-3 my-auto shadow"
                            src={imagesData('female1')}
                            alt=""
                          />
                          <div className="media-body">
                            <div className="d-flex align-items-center">
                              <div className="mt-0">
                                <h5 className="mb-1 tx-18 font-weight-sembold text-dark">
                                Welcome to the Credit Bricks Portal!
                                </h5>
                                <p className="mb-2 tx-13 text-muted">
                                Dummy Content is a Joomla! system plugin (and editor button) that helps you automatically place random dummy text into your Articles - or in any other content item that has an editor, such as Custom HTML Modules, Category descriptions, 3rd party content, etc.
                                </p>
                                <strong>Credit Bricks, Team</strong>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
            </Card.Body>
          </Card>


        </Col>

        <Col xl={4}>
          <Card>
            <Card.Header className="bg-transparent pb-0">
              <div>
                <h3 className="card-title mb-2">Total Overdues</h3>
              </div>
            </Card.Header>
            <Card.Body className="apexchart apexchart1">
              <Doughnut data={chart.dchart} id="chartDonut" className="chartjs-render-monitor w-250 h-250" />
<div className='col-sm-12 text-center mt-4 mb-3'>
<span>  <i className='bi bi-square-fill text-primary'></i> 25 Check In</span>
  <span className='ms-4'><i className='bi bi-square'></i> 75 Check Out</span>
</div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="bg-transparent pb-0">
              <div>
                <h3 className="card-title mb-2">Recent Updates</h3>
              </div>
            </Card.Header>
            <Card.Body className=" mt-0">
              <div className="latest-timeline mt-4">
                <ul className="timeline mb-0">
                  <li>
                    <div className="featured_icon danger">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity">
                    <div>
                      <span className="tx-11 text-muted float-end">
                        23 Sep, 2023
                      </span>
                    </div>
                    <Link to={`${import.meta.env.BASE_URL}offerings/offerings`} className="tx-12 text-dark">
                      <p className="mb-1 font-weight-semibold text-dark tx-13">
                        New Announcement
                      </p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 tx-12">
                      Lorem ipsum dolor tempor incididunt .
                    </p>
                  </li>
                  <li>
                    <div className="featured_icon success">
                      <i className="fas fa-circle"></i>
                    </div>
                  </li>
                  <li className="mt-0 activity mb-2">
                    <div>
                      <span className="tx-11 text-muted float-end">
                        23 Sep, 2023
                      </span>
                    </div>
                    <Link to={`${import.meta.env.BASE_URL}document/document`} className="tx-12 text-dark">
                      <p className="mb-1 font-weight-semibold text-dark tx-13">
                        New Notice
                      </p>
                    </Link>
                    <p className="text-muted mt-0 mb-0 tx-12">
                      Lorem ipsum dolor tempor incididunt .
                    </p>
                  </li>


                </ul>
              </div>
            </Card.Body>
          </Card>


        </Col>
      </Row>


    </Fragment>
  );
}
Dashboard.propTypes = {};

Dashboard.defaultProps = {};

export default Dashboard;