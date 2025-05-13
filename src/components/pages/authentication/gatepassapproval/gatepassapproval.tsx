import { Fragment } from "react";
import { Button, Col, Form, Row, Card, Dropdown } from 'react-bootstrap';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import { imagesData } from '../../../../common/commonimages';

const GatePassApproval = () => {
  return (

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
                          <h5>Gate Pass</h5>
                        </td>
                      </tr>

                    </table>

                    <Row>
                      <Col sm={8}>
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
                                <Form.Label>Gate Type</Form.Label>
                                <p className='tx-14'>Inward</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Member</Form.Label>
                                <p className='tx-14'>Test Member 1</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Category</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>Tenant</p>
                              </Col>
                              <Col sm={4} className='mb-0'>
                                <Form.Label>Sub Category</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>Tenant Shifting In</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Tenant Name</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>Ajay Sharma</p>
                              </Col>




                              <Col sm={4} className='mb-0'>
                                <Form.Label>Gate Pass Number</Form.Label>
                                <p className='tx-14'>-</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Entry Date & Time</Form.Label>
                                <p className='tx-14 col-sm-11 p-0'>10/21/2023, 12:00 PM</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Exit Date & Time</Form.Label>
                                <p className='tx-14'>10/23/2023, 12:00 PM </p>
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
                                  <strong className="text-danger">Reject</strong>
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

                      <Col sm={4}>
                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title  main-content-label tx-14 tx-dark tx-medium mg-b-10">Vehicle and Driver Details</h5>
                            <Row>
                              <Col sm={12} className='tx-12'>Driver Name</Col>
                              <Col sm={12} className='tx-14 tx-semibold'>Rakesh Kumar</Col>
                              <Col sm={12} className='tx-12 mb-1'>9876543212</Col>
                              <Col sm={12} className='tx-12'>Vehicle Number</Col>
                              <Col sm={12} className='tx-12 mb-1 tx-semibold'>HR4A7986</Col>
                              <Col sm={12} className='tx-12'>Vehicle Model</Col>
                              <Col sm={12} className='tx-12 mb-1 tx-semibold'>-</Col>
                              <Col sm={12} className='tx-12'>Vehicle Nature</Col>
                              <Col sm={12} className='tx-12 mb-1 tx-semibold'>Visitor Parking</Col>
                              <Col sm={12} className='tx-12'>Vehicle Type</Col>
                              <Col sm={12} className='tx-12 tx-semibold'>SUV</Col>
                            </Row>
                          </Card.Body>
                        </Card>

                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Contact Person Details</h5>
                            <Row>
                               <Col sm={12} className='tx-14 tx-semibold'>Anisha Kumari Bansal</Col>
                              <Col sm={12} className='tx-12'>8800654786</Col>
                              <Col sm={7} className='mb-1 tx-12 mt-1'>Remarks</Col>
                              <Col sm={12} className='tx-12'>-</Col>

                            </Row>
                          </Card.Body>
                        </Card>

                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Documents</h5>
                            <Row>
                              <Col sm={12} className='tx-12'>Sale Agreement Copy</Col>
                              <Col sm={12} className='tx-12 mb-2 tx-semibold'>Yes</Col>
                              <Col sm={12} className='tx-12'>Flat Registration Certificate </Col>
                              <Col sm={12} className='tx-12 mb-2 tx-semibold'>Yes</Col>
                              <Col sm={12} className='tx-12'>Home Loan Sanction Letter</Col>
                              <Col sm={12} className='tx-12 mb-2 tx-semibold'>Yes</Col>
                              <Col sm={12} className='tx-12'>Old Owner Home Loan Closure Letter</Col>
                              <Col sm={12} className='tx-12 tx-semibold'>No</Col>
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

  );
};

GatePassApproval.propTypes = {};

GatePassApproval.defaultProps = {};

export default GatePassApproval;
