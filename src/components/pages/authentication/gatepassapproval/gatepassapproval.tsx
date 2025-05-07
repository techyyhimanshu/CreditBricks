import { Fragment } from "react";
import { Button, Col, Form, Row, Card, Dropdown } from 'react-bootstrap';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import { imagesData } from '../../../../common/commonimages';

const GatePassApproval = () => {
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
                  <Row>
                    <Col xl={8}>
                          <Card className='box-shadow border mt-3 border-primary mb-2'>
                                              <Card.Body>
                                                <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Information</h5>
                                                <Row>
                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Society</Form.Label>
                                                    <p>Credit Bricks PVt Ltd</p>
                                                  </Col>

                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Property</Form.Label>
                                                    <p>A101</p>
                                                  </Col>

                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Gate Type</Form.Label>
                                                    <p className='tx-14'>Inward</p>
                                                  </Col>

                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Member</Form.Label>
                                                    <p className='tx-14'>Test Member 1</p>
                                                  </Col>

                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Category</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>Tenant</p>
                                                  </Col>
                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Sub Category</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>Tenant Shifting In</p>
                                                  </Col>

                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Tenant Name</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>Ajay Sharma</p>
                                                  </Col>




                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Gate Pass Number</Form.Label>
                                                    <p className='tx-14'>-</p>
                                                  </Col>

                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Entry Date & Time</Form.Label>
                                                    <p className='tx-14 col-sm-11 p-0'>10/21/2023, 12:00 PM</p>
                                                  </Col>

                                                  <Col xl={4} className='mb-0'>
                                                    <Form.Label>Exit Date & Time</Form.Label>
                                                    <p className='tx-14'>10/23/2023, 12:00 PM </p>
                                                  </Col>

                                                </Row>
                                              </Card.Body>
                                            </Card>






                    </Col>

                    <Col xl={4}>
                      <Card className='box-shadow border mt-3 border-primary mb-2'>
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

                      <Card className='box-shadow border border-primary mb-2'>
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

GatePassApproval.propTypes = {};

GatePassApproval.defaultProps = {};

export default GatePassApproval;
