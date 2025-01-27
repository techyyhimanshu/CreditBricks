import { Fragment } from "react";
import { Col, Form, Row, InputGroup, Button, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { imagesData } from "../../../../common/commonimages";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { adminLoginApi } from "../../../../api/authentication-api";
import { toast } from "react-toastify";
import { CustomToastContainer, showToast } from "../../../../common/services/toastServices";
import { handleApiError } from "../../../../helpers/handle-api-error";



const SignIn = () => {
  const handleSubmit = async (values: any) => {
    try {
      const response = await adminLoginApi(values)
      if (response.status === 200 || response.status === 1) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        window.location.href = "/dashboard/dashboard1/"
      }
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      showToast("error", errorMessage);
    }

  }

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
                      <img src="https://gbs.edu.mt/media/ym2fslo0/exploring-digital-society.jpg?width=4500&height=3000" className="signin_img" />

                    </Col>
                    <Col xl={5} className="pt-4 pb-0 ps-4 pe-4 bg-white right-radius bottom-radius">
                      <div className="main-signup-header pt-4">
                        {/* <h3 className="text-primary  text-center">Credit Bricks</h3> */}
                        <img src={imagesData('logo')} className="w-200px m-auto d-block" />
                        <h5 className="mb-2 mt-4  text-center">Login into your account</h5>
                        <p className=" text-center mb-4">Please fill your login details below.</p>
                        <div className="panel panel-primary">
                          <div className="tab-menu-heading mb-2 border-bottom-0">
                            <div className="tabs-menu1">

                              <div
                                className="panel-body tabs-menu-body border-0 p-0"
                                id="tab5"
                              >
                                <Formik
                                  initialValues={{ userName: '', password: '' }}
                                  onSubmit={handleSubmit}
                                  validationSchema={Yup.object({
                                    userName: Yup.string().required('Username is required'),
                                    password: Yup.string().required('Password is required'),
                                  })}
                                >
                                  {({ errors, touched, isSubmitting }) => (
                                    <FormikForm>
                                      <Form.Group className="form-group">
                                        <Form.Label>
                                          Username <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup className="input-group mb-3">
                                          <InputGroup.Text className="input-group-text">
                                            <i className="bi bi-person"></i>
                                          </InputGroup.Text>
                                          <Field
                                            className={`form-control ${touched.userName && errors.userName ? 'is-invalid' : ''
                                              }`}
                                            placeholder="Enter your userName"
                                            type="text"
                                            name="userName"
                                          />
                                          {touched.userName && errors.userName && (
                                            <div className="invalid-feedback">{errors.userName}</div>
                                          )}
                                        </InputGroup>
                                      </Form.Group>

                                      <Form.Group className="form-group">
                                        <Form.Label>
                                          Password <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup className="input-group mb-3">
                                          <InputGroup.Text className="input-group-text">
                                            <i className="bi bi-key"></i>
                                          </InputGroup.Text>
                                          <Field
                                            className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''
                                              }`}
                                            placeholder="Enter your password"
                                            type="password"
                                            name="password"
                                          />
                                          {touched.password && errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                          )}
                                        </InputGroup>
                                      </Form.Group>

                                      <div className="col-sm-12 p-0">
                                        <Form.Check type="checkbox" label="Remember me" name="rememberMe" />
                                        <Link
                                          to={`${import.meta.env.BASE_URL}pages/authentication/forgotpassword`}
                                          className="float-end mb-3 tx-13"
                                        >
                                          Forget Password?
                                        </Link>
                                      </div>

                                      <Button
                                        type="submit"
                                        className="btn btn-primary btn-block mt-2 mb-4"
                                        disabled={isSubmitting}
                                      >
                                        {isSubmitting ? (
                                          <Spinner
                                            animation="border"
                                            className="spinner-border spinner-border-sm me-1"
                                            role="status"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          'Sign In'
                                        )}
                                      </Button>

                                      <hr />
                                      <p className="text-center mb-4 or_login">OR</p>
                                      <div className="mt-4 d-flex text-center justify-content-center mb-0">
                                        <Button className="btn btn-icon me-2 btn-white border-0" type="button">
                                          <i className="bx bxl-google tx-18 tx-prime"></i>
                                        </Button>
                                        <Button className="btn btn-icon me-2 btn-white border-0" type="button">
                                          <i className="bx bxl-linkedin tx-18 tx-prime"></i>
                                        </Button>
                                      </div>
                                    </FormikForm>
                                  )}
                                </Formik>
                                <CustomToastContainer />
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
