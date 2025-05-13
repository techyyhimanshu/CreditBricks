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


                  <table className="w-100">
                      <tr>
                        <td className="text-center" colSpan={2}>
                          <h3 className="mb-0">Credit Bricks PVt Ltd</h3>
                          <strong>Registration Number : BSE/01/02/45  </strong>
                          <h5>Celebration</h5>
                        </td>
                      </tr>

                    </table>
                    <Row>
                      <Col sm={12}>
                        <Card className='box-shadow border border-primary'>
                          <Card.Body className="pb-0">
                            <h5 className="card-title main-content-label tx-14 tx-dark tx-medium mg-b-10">Basic Information</h5>
                            <Row>
                              <Col sm={4} className='mb-0'>
                                <Form.Label>Society</Form.Label>
                                <p>Credit Bricks PVt Ltd</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Property</Form.Label>
                                <p>A101</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Occassion</Form.Label>
                                <p className='tx-14'>Celebration</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Day</Form.Label>
                                <p className='tx-14'>Second Half</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>No. of Guest</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>80</p>
                              </Col>
                              <Col sm={4} className='mb-0'>
                                <Form.Label>Start Date & Time</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>12/04/2025. 6:00 Pm</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>End Date & Time</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>12/04/2025. 10:00 Pm</p>
                              </Col>




                              <Col sm={4} className='mb-0'>
                                <Form.Label>Venue</Form.Label>
                                <p className='tx-14'>Banquet Hall</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Name of the Organizer</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>Vishal Jain</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Contact Details</Form.Label>
                                <p className='tx-14'>9876543212</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Outstanding</Form.Label>
                                <p className='tx-14 tx-bold'>0.00 </p>
                              </Col>

                            </Row>
                          </Card.Body>
                        </Card>

                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title  main-content-label tx-14 tx-dark tx-medium mg-b-10">Does this celebration include any of the following?</h5>
                            <Row>
                            <Col sm={3} className='mb-0'>
                                <Form.Label>Catering Service</Form.Label>
                                <p className='tx-14'>Yes</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Decorations</Form.Label>
                                <p className='tx-14'>Yes </p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Sound System</Form.Label>
                                <p className='tx-14'>Yes</p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Guest Parking</Form.Label>
                                <p className='tx-14'>Yes </p>
                              </Col>
                              <Col sm={12} className='mb-0'>
                                <Form.Label>Remarks</Form.Label>
                                <p className='tx-14'>-</p>
                              </Col>

                            </Row>
                          </Card.Body>
                        </Card>

                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Documents</h5>
                            <Row>

                            <Col sm={3} className='mb-0'>
                                <Form.Label>Sale Agreement Copy</Form.Label>
                                <p className='tx-14'>Yes</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Flat Registration Certificate</Form.Label>
                                <p className='tx-14'>Yes </p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Home Loan Sanction Letter</Form.Label>
                                <p className='tx-14'>Yes</p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Old Owner Home Loan Closure Letter</Form.Label>
                                <p className='tx-14'>Yes </p>
                              </Col>


                            </Row>
                          </Card.Body>
                        </Card>
                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-15 tx-dark tx-medium mg-b-10">Approval Details and Status</h5>

                            <Row>
                              <Col sm ={3} className='mb-0'>
                                <Form.Label>Society</Form.Label>
                                <p className='tx-14'>-</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Tower</Form.Label>
                                <p className='tx-14'>Tower A </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Wing</Form.Label>
                                <p className='tx-14'>Wing A </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Property</Form.Label>
                                <p className='tx-14'>A101 </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Approver Name</Form.Label>
                                <p className='tx-14'>Sandeep Singh </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Approver Number</Form.Label>
                                <p className='tx-14'>9876543212 </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Designation</Form.Label>
                                <p className='tx-14'>Secretary </p>
                              </Col>


                              <Col sm={3} className='mb-0'>
                                <Form.Label>Application Type</Form.Label>
                                <p className='tx-14'>Gate Pass </p>
                              </Col>
                              <Col sm={12}>
<hr className="w-100"/>
</Col>
                              <Col xl={12}>
                              <Form.Label className='float-start tx-bold tx-15 text-primary'>Update Status</Form.Label>
                              <Dropdown className='profile-user border-0'>
                                <Dropdown.Toggle variant="">
                                  <strong className="text-success">Approve</strong>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item className="dropdown-item text-success" href="/">Approve </Dropdown.Item>
                                  <Dropdown.Item className="dropdown-item text-danger" href="/">Reject </Dropdown.Item>
                                  <Dropdown.Item className="dropdown-item" href="/">On Hold </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <p className="mb-0 mt-2">Remarks</p>
                              <textarea className='form-control' placeholder='Remarks'></textarea>
                            </Col>
                            <Col sm={12} className="text-end pt-3">
                              <Button type='button' className='btn btn-primary'>Save</Button>
                            </Col>
                            </Row>



                          </Card.Body>
                        </Card>


                      </Col>

                      <Col xl={12}>


                      </Col>
                      <p className='ps-3'> Powered by <img src={imagesData('logo')} className="wd-100p ms-1" /></p>
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
