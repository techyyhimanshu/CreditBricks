import { Fragment } from "react";
import { Button, Col, Form, Row, Card, Dropdown } from 'react-bootstrap';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import { imagesData } from '../../../../common/commonimages';

const CelebrationBooking = () => {
  return(

 <Fragment>
      <div className="cover-image">

        <div className="page loginbg">

          <div
            className="page-single"
            onClick={() => Switcherdatacustam.Swichermainrightremove()}
          >
            <div className="container">
              <Row>
                <Col
                  xl={12}
                  lg={12}
                  xs={12}
                  className="card justify-content-center mx-auto"
                >
                  <div className="card-sigin p-3">
                  <img src={imagesData('logo')} className="w-200px m-auto d-block"  />
                  <h4 className="text-center mt-3 mb-0">Celebration</h4>
                  <Row>
                    <Col xl={12}>
                          <Card className='box-shadow border mt-3 border-primary mb-2'>
                                              <Card.Body>
                                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Information</h5>
                                                <Row>
                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Society</Form.Label>
                                                    <p>Credit Bricks PVt Ltd</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Property</Form.Label>
                                                    <p>A101</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Occassion</Form.Label>
                                                    <p className='tx-14'>Celebration</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Day</Form.Label>
                                                    <p className='tx-14'>Second Half</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>No. of Guest</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>80</p>
                                                  </Col>
                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Start Date & Time</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>12/04/2025. 6:00 Pm</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>End Date & Time</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>12/04/2025. 10:00 Pm</p>
                                                  </Col>




                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Venue</Form.Label>
                                                    <p className='tx-14'>Banquet Hall</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Name of the Organizer</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>Vishal Jain</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Contact Details</Form.Label>
                                                    <p className='tx-14'>9876543212</p>
                                                  </Col>

                                                </Row>
                                              </Card.Body>
                                            </Card>



                                            <Card className='box-shadow border border-primary mb-2'>
                                              <Card.Body>
                                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Does this celebration include any of the following?</h5>
                                                <Row>
                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Catering Service</Form.Label>
                                                    <p className='tx-14 mb-1'>Yes</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Decorations</Form.Label>
                                                    <p className='tx-14 mb-1'>Yes</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Sound System</Form.Label>
                                                    <p className='tx-14 mb-1'>Yes</p>
                                                  </Col>

                                                  <Col xl={3} className='mb-0'>
                                                    <Form.Label>Guest Parking</Form.Label>
                                                    <p className='tx-14 mb-1'>Yes</p>
                                                  </Col>

                                                  <Col xl={12} className='mb-0'>
                                                    <Form.Label>Remarks</Form.Label>
                                                    <p className='tx-14 mb-0'>-</p>
                                                  </Col>


                                                </Row>
                                              </Card.Body>
                                            </Card>






                    </Col>


                    <Col xl={12}>

                    <Card className='box-shadow border border-primary mb-2'>
                        <Card.Body>
                          <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Approval Details and Status</h5>
<div className="table-responsive">
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
                          </div>
                          <Col xl={12}>
                <Form.Label className='float-start tx-bold tx-15 text-primary'>Update Status</Form.Label>
                  <Dropdown className='profile-user border-0'>
                       <Dropdown.Toggle variant="">
                            <strong>In Process</strong>
                          </Dropdown.Toggle>
                        <Dropdown.Menu>
<Dropdown.Item className="dropdown-item" href="/">In-Process </Dropdown.Item>
<Dropdown.Item className="dropdown-item" href="/">Pending </Dropdown.Item>
<Dropdown.Item className="dropdown-item" href="/">Verified </Dropdown.Item>
<Dropdown.Item className="dropdown-item" href="/">Closed </Dropdown.Item>

                        </Dropdown.Menu>
                      </Dropdown>
                      <p className="mb-0 mt-2">Remarks</p>
<textarea className='form-control' placeholder='Remarks'></textarea>
                </Col>
                <Col xl={12} className="p-0 text-end pt-3">

              <Button type='button' className='btn btn-primary'>Verify</Button>
              </Col>
                        </Card.Body>
                      </Card>
                    </Col>
                    <p className='ps-3'>Powered by <strong>CreditBricks</strong></p>
                  </Row>
                  </div>
                </Col>
              </Row>

            </div>
          </div>
        </div>
      </div>
    </Fragment>

); };

CelebrationBooking.propTypes = {};

CelebrationBooking.defaultProps = {};

export default CelebrationBooking;
