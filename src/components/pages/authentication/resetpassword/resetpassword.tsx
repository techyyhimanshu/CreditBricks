import { Fragment, useState } from "react";
import { Button, Col, Form, Row, InputGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Switcherdatacustam from '../../../../common/switcherdatacustam';
import useFormValidation from "../../../../common/hooks/FormValidation";
import apiService from "../../../../common/redux/api";
import { showToast, CustomToastContainer } from "../../../../common/services/toastServices";
import 'react-toastify/dist/ReactToastify.css'

const getUrlData = () => {
  const params = new URLSearchParams(location.search)
  const id = params.get('id')?.replace(/'/g, ""); // Remove single quotes
  const token = params.get('token')?.replace(/'/g, ""); // Remove single quotes
  return { id, token }
}

const resetPass = async (password: string, confirmpassword: string, id: string, token: string) => {
  const data = { password, id, token, confirmPassword: confirmpassword }
  const response = await apiService.ResetPassword(data)
  return response
}

const ResetPassword = () => {
  const [loading, setLoading] = useState(false)

  const { formData, errors, handleChange, validateForm, handleBlur } = useFormValidation({
    validationRules: [
      { fieldName: "password", value: '', validations: { 'minlength': 8, 'required': true, 'alphaNumeric': true, 'unique': true, 'numericAllowed': true, 'capAllowed': true } },
      { fieldName: 'confirmpassword', value: '', validations: { 'invalidMissMatch': true, 'required': true } },
    ]
  });


  const handleFormSubmit = async (e: React.FormEvent<Element>): Promise<boolean> => {
    e.preventDefault();
    setLoading(true)
    const { id, token } = getUrlData()
    let isValid: boolean = false;
    try {
      isValid = await validateForm();
      if (isValid && id && token) {
        const res = await resetPass(formData.password, formData.confirmpassword, id, token)
        if (res.status == 200) {
          showToast("success", res.data.data.message)
        } else {
          showToast("error", res.data.message)
        }
      } else {
      }
    } catch (error) {
      showToast("error", "Please enter valid details")
      isValid = false;
    } finally {
      setLoading(false)
    }

    return isValid
  };

  return (
    <Fragment>
      <div >
        <CustomToastContainer />
        <div className="cover-image">
          <div className="page loginbg">
            <h3 className="text-center pt-5">Dealovate</h3>
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
                    className="card-sigin-main py-4 justify-content-center mx-auto"
                  >
                    <div className="card-sigin">

                      <div className="main-card-signin d-md-flex">
                        <div className="wd-100p">

                          <div className="  mb-1">
                            <div className="main-signin-header">
                              <h4 className="mb-4">Reset Your Password</h4>
                              <div className="">
                                <Form onSubmit={handleFormSubmit}>
                                  {/* <Form.Group className="form-group mb-1">
                                    <Form.Label>Old Password <span className="text-danger">*</span></Form.Label>
                                    <InputGroup className="input-group">

                                      <InputGroup.Text
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="bi bi-key"></i>
                                      </InputGroup.Text>
                                      <Form.Control
                                        className="form-control"
                                        type="password"
                                        id="password"
                                        name="password" />
                                    </InputGroup>
                                  </Form.Group> */}

                                  <Form.Group className="form-group mb-1">
                                    <Form.Label>New Password <span className="text-danger">*</span></Form.Label>
                                    <InputGroup className="input-group">

                                      <InputGroup.Text
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="bi bi-key"></i>
                                      </InputGroup.Text>
                                      <Form.Control
                                        className="form-control"
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.password} />
                                      <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.password}
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                  </Form.Group>

                                  <Form.Group className="form-group mb-1">
                                    <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
                                    <InputGroup className="input-group">

                                      <InputGroup.Text
                                        className="input-group-text"
                                        id="basic-addon1"
                                      >
                                        <i className="bi bi-key"></i>
                                      </InputGroup.Text>
                                      <Form.Control
                                        className="form-control"
                                        type="password"
                                        id="confirmpassword"
                                        name="confirmpassword"
                                        value={formData.confirmpassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.confirmpassword} />
                                      <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.confirmpassword}
                                      </Form.Control.Feedback>
                                    </InputGroup>
                                  </Form.Group>
                                  <Button className="btn ripple btn-primary btn-block" type="submit">
                                    {!loading ? '' : <Spinner animation="border"
                                      className="spinner-border spinner-border-sm me-1"
                                      role="status"
                                      aria-hidden="true"
                                    ></Spinner>}
                                    Save Password
                                  </Button>
                                </Form>
                              </div>
                            </div>
                            <div className="main-signup-footer mg-t-20 text-center">
                              <p><Link to={`${import.meta.env.BASE_URL}pages/authentication/sigin`} className="text-primary"> Back to Log In</Link>  </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <p className="text-center mt-3 mb-4">Still can't login? E-mail dealovate@gmail.com.<br />If you need additional assistance.</p>
                <br />
                <p className="text-center mt-0 mb-4"> Powered by Dealovate</p>
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
                <p className="text-center mt-4">@2024 Dealovate </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ResetPassword.propTypes = {};

// ResetPassword.defaultProps = {};

export default ResetPassword;
