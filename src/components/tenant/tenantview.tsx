
import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Accordion, Button, Form, Modal, ProgressBar, FormLabel, CardFooter } from "react-bootstrap";
import { Link, } from "react-router-dom";
import { imagesData } from "../../common/commonimages";

export default function TenantView() {

  const [addnewagreement, setaddnewagreement] = useState(false);
  const [discontinue, setdiscontinue] = useState(false);

  const viewDemoShow = (modal: any) => {
    switch (modal) {
      case "addnewagreement":
        setaddnewagreement(true);
        break;

        case "discontinue":
          setdiscontinue(true);
        break;

    }
  };

  const viewDemoClose = (modal: any) => {
    switch (modal) {
      case "addnewagreement":
        setaddnewagreement(false);
        break;

        case "discontinue":
          setdiscontinue(false);
          break;

    }
  };


  return (
    <Fragment>

        <div className="breadcrumb-header justify-content-between">
              <div className="left-content">
                <span className="main-content-title tx-bold mg-b-0 mg-b-lg-1 tx-26">
                <img
                                      alt=""
                                      src={imagesData('female1')}
                                      className="wd-100 rounded-5"
                                    />
                 <span className='ms-3'> Mr. Rajiv Sharma <Link to={`${import.meta.env.BASE_URL}tenant/addtenant`} className='tx-16 btn btn-primary ms-2 btn-sm tx-normal' title="Edit"><i className='bi bi-pencil ms-1'></i></Link></span></span>

              </div>
            </div>



      <Row>
        <Col xl={8}>
        <Card>
                      <Card.Body>
                        <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Details</h5>
                        <Row>
                        <Col xl={6}>
                            <FormLabel>Society Name</FormLabel>
                            <Link to={`${import.meta.env.BASE_URL}society/societyview`} className='tx-15 text-info'>Mohan Areca Co-Op Housing Society Limited</Link>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Property Name</FormLabel>
                            <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='tx-15 text-info'>A101</Link>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Tenant Name</FormLabel>
                            <p className='tx-15'>Rajiv Sharma</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Tenant Number</FormLabel>
                            <p className='tx-15 col-sm-11 p-0'>+91 9876543212</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Alternative Mobile</FormLabel>
                            <p className='tx-15 col-sm-11 p-0'>-</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Tenant Email</FormLabel>
                            <p className='tx-15'>rajiv@gmail.com</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Date Of Birth</FormLabel>
                            <p className='tx-15'>11/July/1993</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Address</FormLabel>
                            <p className='tx-15 col-sm-11 p-0'>Sector 22, Noida</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>City</FormLabel>
                            <p className='tx-15'>Delhi</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>State</FormLabel>
                            <p className='tx-15'>Delhi</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Country</FormLabel>
                            <p className='tx-15'>India</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Pincode</FormLabel>
                            <p className='tx-15'>201102</p>
                          </Col>


                          <Col xl={6}>
                            <FormLabel>Family Members</FormLabel>
                            <p className='tx-15'>3</p>
                          </Col>

                          <Col xl={6}>
                            <FormLabel>Pets</FormLabel>
                            <p className='tx-15'>No</p>
                          </Col>

                        </Row>
                      </Card.Body>
                    </Card>

        </Col>

        <Col xl={4}>

          <Card>
            <Card.Body className='pb-0'>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Current Lease</h5>
              <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Agreement Start Date</p>
                              <p className='tx-15 tx-semibold'>10, June 2024</p>
                              <p className='mb-0 text-muted'>Agreement End Date</p>
                              <p className='tx-15 tx-semibold mb-2'>10, June 2025</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>Monthly Rent</p>
                              <p className='tx-15 tx-semibold text-primary'>₹ 20,000</p>
                              <p className='mb-0 pt-2 text-muted'></p>
                              <p className='tx-12 pt-3 mb-2 tx-danger'>Rent agreement is expired.</p>
                            </Col>

                            <Col xl={12}>
                            <div className="progress mb-1">
                    <ProgressBar
                      variant="info"
                      role="progressbar"
                      now={55}
                    ></ProgressBar>
                  </div>

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
                              <p className='tx-15 tx-semibold'>₹ 10,000</p>
                           </Col>
                            <Col xl={6}>
                              <p className='mb-0 mt-2 text-muted text-end'>Deposite Amount</p>
                              <p className='tx-15 tx-semibold mb-0 text-end'>₹ 10,000</p>
                            </Col>

                          </Row>
            </Card.Body>
            <CardFooter className='border-top'>
<Row>
  <Col xl={6} className='text-center'>
  <span className='text-muted cursor' onClick={() => viewDemoShow("addnewagreement")}>+ Add New Agreement </span>
  </Col>
  <Modal show={addnewagreement} >
            <Modal.Header>
              <Modal.Title>Add New Agreement</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("addnewagreement"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>

                <Col xl={12}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>Rent Registration Id<span className="text-danger">*</span></Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='#id'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>Monthly Rent</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='ex 22500'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>Due Amount</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='ex 1000'></Form.Control>
                  </Form.Group>
                </Col>


                <Col xl={6}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>Deposit Amount</Form.Label>
                    <Form.Control type="text" className='form-control' placeholder='ex 1000'></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={6}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="date" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>

                <Col xl={12}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>Upload Rent Agreement
                      <small className='text-muted float-end'>Upload Size : Max 2MB</small>
                    </Form.Label>
                    <Form.Control type="file" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>


                <Col xl={12}>
                  <Form.Group className="form-group mb-1">
                    <Form.Label>Police Verification Document
                      <small className='text-muted float-end'>Upload Size : Max 2MB</small>
                    </Form.Label>
                    <Form.Control type="file" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>


              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("addnewagreement"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("addnewagreement"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>
  <Col xl={6} className='text-center'>
  <span className='text-muted cursor' onClick={() => viewDemoShow("discontinue")}><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_433_1738)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.0913 2.39094C7.6404 1.81509 8.39577 1.48095 9.19122 1.46203C9.5851 1.45266 9.97696 1.52097 10.3444 1.66304C10.7119 1.80511 11.0478 2.01818 11.3329 2.29006C11.6181 2.56195 11.8469 2.88733 12.0062 3.24764C12.1656 3.60794 12.2525 3.99611 12.2618 4.38998C12.2712 4.78385 12.2029 5.17571 12.0608 5.54319C11.9188 5.91066 11.7057 6.24655 11.4338 6.53169L7.42205 10.7377C7.11314 11.0617 6.68816 11.2498 6.24061 11.2604C5.79305 11.2711 5.35958 11.1036 5.03555 10.7947C4.71153 10.4858 4.52348 10.0608 4.51279 9.61324C4.5021 9.16569 4.66964 8.73221 4.97855 8.40819L8.3423 4.87869C8.37628 4.84303 8.41695 4.81442 8.46199 4.79448C8.50703 4.77455 8.55555 4.76368 8.60479 4.76249C8.65403 4.76131 8.70302 4.76983 8.74896 4.78758C8.7949 4.80533 8.8369 4.83196 8.87255 4.86594C8.90821 4.89992 8.93682 4.94059 8.95676 4.98562C8.97669 5.03066 8.98756 5.07918 8.98875 5.12842C8.98993 5.17766 8.98141 5.22665 8.96366 5.27259C8.94591 5.31854 8.91928 5.36053 8.8853 5.39619L5.52155 8.92494C5.34989 9.10495 5.25677 9.34579 5.26268 9.59446C5.26859 9.84313 5.37304 10.0793 5.55305 10.2509C5.73307 10.4226 5.9739 10.5157 6.22258 10.5098C6.47125 10.5039 6.70739 10.3995 6.87905 10.2194L10.8908 6.01344C11.0947 5.79961 11.2545 5.54771 11.3611 5.27213C11.4677 4.99654 11.5189 4.70266 11.5119 4.40726C11.505 4.11187 11.4398 3.82074 11.3203 3.55051C11.2008 3.28028 11.0293 3.03624 10.8154 2.83231C10.6016 2.62839 10.3497 2.46857 10.0741 2.362C9.79853 2.25542 9.50465 2.20417 9.20926 2.21117C8.91386 2.21817 8.62274 2.28328 8.35251 2.40279C8.08228 2.5223 7.83823 2.69386 7.6343 2.90769L4.01105 6.70794C3.94243 6.77994 3.84801 6.82174 3.74857 6.82413C3.64913 6.82652 3.55281 6.78931 3.4808 6.72069C3.4088 6.65206 3.367 6.55764 3.36461 6.4582C3.36222 6.35876 3.39943 6.26244 3.46805 6.19044L7.0913 2.39094Z" fill="#6B6868"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.34728 12.2932C3.01803 11.9789 2.72928 11.5012 2.48853 10.9747C1.95603 9.81067 2.36103 8.43741 3.31128 7.44066L6.60003 3.99367C6.66866 3.92166 6.70587 3.82534 6.70348 3.7259C6.70109 3.62646 6.65929 3.53204 6.58728 3.46342C6.51528 3.39479 6.41896 3.35758 6.31952 3.35997C6.22008 3.36236 6.12566 3.40416 6.05703 3.47617L2.76903 6.92317C1.67778 8.06767 1.10853 9.76042 1.80603 11.2867C2.06253 11.8469 2.39928 12.4252 2.82978 12.8362C3.25428 13.2412 3.83628 13.5464 4.40028 13.7744C5.97153 14.4112 7.65303 13.7452 8.74353 12.5797L13.0125 8.01892C13.0462 7.98297 13.0725 7.94073 13.0899 7.89463C13.1072 7.84853 13.1153 7.79946 13.1137 7.75022C13.1121 7.70098 13.1008 7.65254 13.0805 7.60766C13.0602 7.56278 13.0312 7.52235 12.9953 7.48866C12.9593 7.45498 12.9171 7.42871 12.871 7.41135C12.8249 7.39398 12.7758 7.38587 12.7266 7.38747C12.6773 7.38907 12.6289 7.40036 12.584 7.42068C12.5392 7.441 12.4987 7.46997 12.465 7.50592L8.19603 12.0674C7.24578 13.0829 5.87928 13.5644 4.68153 13.0799C4.15353 12.8654 3.67203 12.6029 3.34728 12.2932Z" fill="#6B6868"/>
<path d="M0.86251 1.40844C0.790205 1.33604 0.749625 1.23787 0.749695 1.13555C0.749765 1.03323 0.790481 0.93512 0.862885 0.862815C0.935289 0.790511 1.03345 0.74993 1.13578 0.75C1.2381 0.75007 1.33621 0.790786 1.40851 0.86319L14.1368 13.5914C14.2091 13.6637 14.2497 13.7618 14.2497 13.8641C14.2497 13.9663 14.2091 14.0644 14.1368 14.1367C14.0645 14.209 13.9664 14.2496 13.8641 14.2496C13.7619 14.2496 13.6638 14.209 13.5915 14.1367L0.86251 1.40844Z" fill="#6B6868"/>
</g>
<defs>
<clipPath id="clip0_433_1738">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>  Discontinue</span>
  </Col>
  <Modal show={discontinue} >
            <Modal.Header>
              <Modal.Title>Discontinue</Modal.Title>
              <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("discontinue"); }}>
                x
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>

                <Col xl={12}>
                  <Form.Group className="form-group mb-2">
                    <Form.Label>Discontinue Date</Form.Label>
                    <Form.Control type="date" className='form-control' placeholder=''></Form.Control>
                  </Form.Group>
                </Col>

              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="default" onClick={() => { viewDemoClose("discontinue"); }}>
                Close
              </Button>
              <Button variant="primary" onClick={() => { viewDemoClose("discontinue"); }}>
                Save
              </Button>

            </Modal.Footer>
          </Modal>
</Row>
            </CardFooter>
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
                              <p className='tx-14 mb-0 mt-2 tx-semibold'>Rent Registration Id :  #84985454500</p>
                              <Link to={``} className='text-info'>Download</Link>
                            </Col>
                          </Row>

                          <Row>
                            <Col xl={2} className='p-0'>
                              <img
                                alt="" className='w-100'
                                src={imagesData('pdficon')}
                              />
                            </Col>
                            <Col xl={9} className='p-0'>
                              <p className='tx-14 mb-0 mt-2 tx-semibold'>Police Verification</p>
                              <Link to={``} className='text-info'>Download</Link>
                            </Col>
                          </Row>
           </Card.Body>
          </Card>

          <Card>
            <Card.Body className='pb-1'>
              <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Vehicle Details</h5>
              <Row>
                            <Col xl={2} className='p-0'>
                              <img
                                alt="" className='w-100'
                                src={imagesData('pdficon')}
                              />
                            </Col>
                            <Col xl={9} className='p-0'>
                              <p className='tx-14 mb-0 mt-2 tx-semibold'>Vehicle No. UP5AH6545  <span className='text-muted'>(4 Wheeler)</span></p>
                              <Link to={``} className='text-info'>Download</Link>
                            </Col>
                          </Row>
           </Card.Body>
          </Card>

        </Col>
      </Row>


    </Fragment >
  );
}
