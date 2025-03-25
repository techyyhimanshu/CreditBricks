import { Fragment } from "react";
import { Button, Col, Form, FormGroup, Row, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import { imagesData } from '../../../../common/commonimages';

const ComplaintStatus = () => {
  return(

 <Fragment>
      <div className="cover-image">

        <div className="page loginbg">
         <img src={imagesData('logo')} className="w-200px m-auto d-block"  />
          <div
            className="page-single"
            onClick={() => Switcherdatacustam.Swichermainrightremove()}
          >
            <div className="container">
              <Row>
                <Col
                  xl={5}
                  lg={6}
                  md={8}
                  sm={8}
                  xs={10}
                  className="card justify-content-center mx-auto"
                >
                  <div className="card-sigin p-3">

                    <div className="main-card-signin d-md-flex">
                      <div className="w-100">

                      <Row>
                <Col xl={3}>
                <img alt="" className='w-100 rounded-2' src={''} />

                <p className='w-100 rounded-2' style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>No image</p>
                </Col>
                <Col xl={8} className='p-0'>
                  <p className='tx-16 mb-0 mt-3 tx-semibold'>Complaint ID : 78</p>
                  <p className='mb-3 tx-16 '>Property A101</p>
                  <span className='text-muted'><i className='bi bi-calendar-fill'></i>&nbsp; 12/12/2024</span>
                </Col>
              </Row>
              <hr className="mt-0" />
              <Row>
                <Col xl={6}>
                  <p className='mb-0 text-muted'>Complaint Category</p>
                  <p className='tx-15 tx-semibold mb-0'>Parking Issues</p>
                </Col>
                <Col xl={6} className='text-end'>
                  <p className='mb-0 text-muted'>Priority</p>
                 <p className='tx-15 text-danger mb-0 tx-semibold'>High</p>


                </Col>
                <Col xl={12}>
                  <p className='mb-2'>new issue</p>

                </Col>
              </Row>
              <hr  className="mt-0"/>
              <Row>
                <Col xl={6}>
                  <p className="mb-0 text-muted">Assign To</p>
                  <p className="tx-15 mb-1 tx-semibold">
                  Subham chaudhary
                  </p>
                  <p>9897959636</p>
                </Col>



              </Row>
              <hr className='mt-0 mb-1'/>
              <Row>
                <Col xl={12}>
                <Form.Label className='float-start'>Update Status</Form.Label>
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
                      <p className="mb-0 text-muted">Complaint Remarks</p>
<textarea className='form-control' placeholder='Remarks'></textarea>
                </Col>


              </Row>
              <Col xl={12} className="p-0 text-end pt-3">
              <Button type='button' className='btn btn-default ms-2'>Close</Button>
              <Button type='button' className='btn btn-primary'>Save</Button>
              </Col>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

            </div>
          </div>
        </div>
      </div>
    </Fragment>

); };

ComplaintStatus.propTypes = {};

ComplaintStatus.defaultProps = {};

export default ComplaintStatus;
