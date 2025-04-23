import { Fragment } from "react";
import { Col, Form, Row, InputGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { imagesData } from "../../../../common/commonimages";



const SignIn = () => {


  return (
    <Fragment>
      <div className="page loginbg">

      <div
          className="page-single pt-3">
          <div className="container pt-5">
            <Row>
              <Col
                xl={10}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card p-0 mx-auto my-auto justify-content-center bg-none" >
                   <div className="card-sigin p-0">
                  <Row>
                    <Col xl={7} className="p-0">
                    <img src="https://gbs.edu.mt/media/ym2fslo0/exploring-digital-society.jpg?width=4500&height=3000" className="signin_img"/>

                    </Col>
                    <Col xl={5} className="pt-4 pb-0 ps-4 pe-4 bg-white right-radius bottom-radius">
                       <div className="main-signup-header pt-4">
                       {/* <h3 className="text-primary  text-center">Credit Bricks</h3> */}
                       <img src={imagesData('logo')} className="w-200px m-auto d-block"  />
                          <h5 className="mb-2 mt-4  text-center">Login into your account</h5>
                          <p className=" text-center mb-4">Please fill your login details below.</p>
                          <div className="panel panel-primary">
                            <div className="tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">

                                <div
                                  className="panel-body tabs-menu-body border-0 p-0"
                                  id="tab5"
                                >

                                  <Form>
                                    <Form.Group className="form-group">
                                      <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                                      <InputGroup className="input-group mb-3">

                                        <InputGroup.Text
                                          className="input-group-text"
                                          id="basic-addon1"
                                        >
                                          <i className="bi bi-person"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                          className="form-control"
                                          placeholder="Enter your userName"
                                          type="text"
                                          id="userName"
                                          name="userName"
                                          />
                                        {/* <Form.Control.Feedback type="invalid" tooltip>
                                          {errors.userName}
                                        </Form.Control.Feedback> */}
                                      </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                      <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                                      <InputGroup className="input-group mb-3">

                                        <InputGroup.Text
                                          className="input-group-text"
                                          id="basic-addon1"
                                        >
                                          <i className="bi bi-key"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                          className="form-control"
                                          placeholder="Enter your password"
                                          type="password"
                                          id="password"
                                          name="password"
                                      />
                                        {/* <Form.Control.Feedback type="invalid" tooltip>
                                          {errors.password}
                                        </Form.Control.Feedback> */}
                                      </InputGroup>
                                    </Form.Group>


                                    <div className="col-sm-12 p-0">
                                      <label className="tx-13"><input type="checkbox"></input> Remember me </label>
                                      <Link to={`${import.meta.env.BASE_URL}pages/authentication/forgotpassword`} className="float-end mb-3 tx-13">Forget Password?</Link>
                                    </div>
                                     {/* <Button
                                      type="submit"
                                      className="btn btn-primary btn-block mt-2 mb-4">
                                      {!loading ? '' : <Spinner animation="border"
                                        className="spinner-border spinner-border-sm me-1"
                                        role="status"
                                        aria-hidden="true"
                                      ></Spinner>}
                                      Sign In</Button>*/}
                                   <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard1/`}
                                      className="btn btn-primary btn-block mt-2 mb-4">Sign In</Link>
                                    <hr />
                                    <p className="text-center mb-4 or_login">OR</p>
                                    <div className="mt-4 d-flex text-center justify-content-center mb-0">

                                      <Button
                                       className="btn btn-icon me-2 btn-white border-0"
                                        type="button"
                                      >
                                        <span className="btn-inner--icon">
                                          {" "}
                                          <i className="bx bxl-google tx-18 tx-prime"></i>{" "}
                                        </span>
                                      </Button>
                                      <Button
                                        className="btn btn-icon me-2 btn-white border-0"
                                        type="button"

                                      >
                                        <span className="btn-inner--icon">
                                          {" "}
                                          <i className="bx bxl-linkedin tx-18 tx-prime"></i>{" "}
                                        </span>
                                      </Button>

                                    </div>
                                    {/* <p className="text-center mt-3 mb-0 tx-14">New to Credit Bricks? <Link to={`${import.meta.env.BASE_URL}pages/authentication/sigup`} className="text-primary"><b>Sign Up</b></Link></p> */}

                                  </Form>
                                </div>



                              </div>
                            </div>
                          </div>
                        </div>
                    </Col>
                  </Row>


                </div>
              </Col>
            </Row>
            <p className="text-center mt-4 mb-3"> Powered by Credit Bricks</p>
            <Row>
              <Col xl={3} className="me-4"></Col>
              <Col xl={5}>
                <ul className="termfooter">
                  <li> <a>Terms of Service</a></li>
                  <li><a>Privacy</a></li>
                  <li> <a >Cookies</a></li>
                  <li> <a>Cookies Preference</a></li>
                </ul>
              </Col>
            </Row>
            <p className="text-center mt-4">@2025 Credit Bricks </p>
          </div>
        </div>

      </div>

    </Fragment >
  );
};


export default SignIn;
