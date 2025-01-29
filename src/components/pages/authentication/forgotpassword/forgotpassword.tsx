import { Fragment, useState } from "react";
import { Button, Col, Form, Row, InputGroup,  Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import useFormValidation from "../../../../common/hooks/FormValidation";
import apiService from "../../../../common/redux/api";
import { showToast, CustomToastContainer } from "../../../../common/services/toastServices";
import 'react-toastify/dist/ReactToastify.css'
import { imagesData } from "../../../../common/commonimages";


const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  const { formData, errors, handleChange, validateForm, handleBlur } = useFormValidation({
    validationRules: [
      { fieldName: 'userName', value: '', validations: { 'invalidEmail': true, 'required': true } },
    ]
  });

  const handleFormSubmit = async (e: React.FormEvent<Element>): Promise<boolean> => {
    e.preventDefault();
    setLoading(true)
    let isValid: boolean = false;
    try {
      isValid = await validateForm();
      if (isValid) {
        const res: any = await apiService.EmailForReset(formData)
        if (res.status == 200) {
          showToast("success","email sent successfully")
        }else if(res.status == 500){
          showToast("error",res.data.error)
        }
      } else {
      }
    } catch (error) {
      isValid = false;
    } finally {
      setLoading(false)
    }

    return isValid
  };

  return (
    <Fragment>
      <div className="cover-image">
        <CustomToastContainer/>
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
                  <div className="card-sigin">

                    <div className="main-card-signin d-md-flex">
                      <div className="wd-100p">

                        <div className="main-card-signin d-md-flex bg-white">
                          <div className="wd-100p">
                            <div className="main-signin-header">
                              <h4 className="mb-2">Forgot Password</h4>
                              <p>Enter your email address below and we'll send you a link to reset
                                your password.</p>
                              <Form onSubmit={handleFormSubmit}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                                  <InputGroup className="input-group">

                                    <InputGroup.Text
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      <i className="bi bi-envelope"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      className="form-control"
                                      type="email"
                                      id="userName" placeholder="Enter your email address"
                                      name="userName"
                                      value={formData.userName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.userName} />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                      {errors.userName}
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </Form.Group>
                                <Button
                                  variant=""
                                  className="btn btn-primary btn-block"
                                  // href={`${import.meta.env.BASE_URL}pages/authentication/resetpassword`}
                                  type="submit"
                                >
                                  {!loading ? '' : <Spinner animation="border"
                                    className="spinner-border spinner-border-sm me-1"
                                    role="status"
                                    aria-hidden="true"
                                  ></Spinner>}
                                  Send
                                </Button>
                              </Form>
                            </div>
                            <div className="main-signup-footer mg-t-20 text-center">
                              <p><Link to={`${import.meta.env.BASE_URL}pages/authentication/sigin`} className="text-primary"> Back to Log In</Link>  </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <p className="text-center mt-3 mb-5">Still can't login? E-mail creditbricks@gmail.com.<br />If you need additional assistance.</p>
              <br />
              <p className="text-center mt-5 mb-4"> Powered by Credit Bricks</p>
              <Row>
                <Col xl={3} className="me-5"></Col>
                <Col xl={5}>
                  <ul className="termfooter">
                    <li> <a>Terms of Service</a></li>
                    <li><a>Privacy</a></li>
                    <li> <a>Cookies</a></li>
                    <li> <a>Cookies Preference</a></li>
                  </ul>
                </Col>
              </Row>
              <p className="text-center mt-4">@2025 Credit Bricks </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

// ForgotPassword.propTypes = {};

// ForgotPassword.defaultProps = {};

export default ForgotPassword;
