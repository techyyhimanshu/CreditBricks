import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import useFormValidation from "../../../../common/hooks/FormValidation";
import apiService from "../../../../common/redux/api";
import { showToast, CustomToastContainer } from "../../../../common/services/toastServices";
import 'react-toastify/dist/ReactToastify.css'
import { useGoogleLogin } from "@react-oauth/google";
// import store from "../../../../common/store/store";
// import { loginSuccess } from "../../../../common/actions/authActions";
// import {useLinkedIn} from "react-linkedin-login-oauth2"
// import Axios from "axios";

// const sendAuthCode = async (code: string, type: string) => {
//   const res = await apiService.GetUserInfo(code, type)
//   return res
// }

const getdata = async (token: string, type: string) => {
  const data = await apiService.GetUserInfo(token, type)
  return data
}

function generateCaptcha(n: number) {
  // Characters to be included
  const chrs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < n; i++) {
    captcha += chrs[(Math.floor(Math.random() * chrs.length))];
  }
  return captcha;
}


const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [captcha, setCaptcha] = useState<string>(generateCaptcha(4))
  // const [usercode]=useState(new URLSearchParams(window.location.search).get('code'))
  const navigate = useNavigate()
  const [tenant, setTenant] = useState("")
  const [logo, setLogo] = useState("")
  const getCaptcha = () => {
    setCaptcha(generateCaptcha(4))
  }

  const { formData, errors, handleChange, validateForm, handleBlur } = useFormValidation({
    validationRules: [
      { fieldName: 'firstName', value: '', validations: { 'minlength': 2, 'required': true, 'maxlength': 12, } },
      { fieldName: 'lastName', value: '', validations: { 'minlength': 2, 'required': true, 'maxlength': 12 } },
      { fieldName: 'emailId', value: '', validations: { 'invalidEmail': true, 'required': true } },
      { fieldName: 'mobile', value: '', validations: { 'invalidMobile': true, 'required': true } },
      { fieldName: "password", value: '', validations: { 'minlength': 8, 'required': true, 'alphaNumeric': true, 'unique': true, 'numericAllowed': true, 'capAllowed': true } },
      { fieldName: "captcha", value: '', validations: { 'captcha': captcha, 'required': true } }
    ]
  });

  // useEffect(() => {
  //   if (usercode) {
  //     sendAuthCode(usercode, 'linkedin')
  //       .then((res) => {
  //         if (res.status == 200) {
  //           showToast("success", "user login successful")
  //           store.dispatch(loginSuccess(res.data.data.token, res.data.data.refreshToken))
  //           setTimeout(() => {
  //             navigate("/dashboard/dashboard1")
  //           }, 2000)
  //         }
  //         else if (res.status == 409) {
  //           showToast("error", res.data.error)
  //         }
  //       })
  //       .catch((err) => console.log(err))
  //     // .finally(()=>window.history.replaceState({}, document.title, window.location.pathname))
  //   }
  // }, [usercode])


  const handleFormSubmit = async (e: React.FormEvent<Element>): Promise<boolean> => {
    e.preventDefault();
    setLoading(true)
    let isValid: boolean = false;
    try {
      isValid = await validateForm();
      if (isValid) {
        const { captcha, ...rest } = formData
        const res: any = await apiService.SignUp(rest)
        if (res.status == 200) {
          showToast("success", "user registration successful")
          setTimeout(() => {
            navigate("/pages/authentication/sigin")
          }, 2000)
        }
        else {
          showToast("error", res.data.message)
        }
      } else {
      }
    } catch (error) {
      showToast("error", "Please submit Details")
      isValid = false;
    } finally {
      setLoading(false)
    }

    return isValid
  };

  const login = useGoogleLogin({
    onSuccess: (response) => {
      getdata(response.access_token, 'google')
        .then((res) => {
          if (res.status == 200) {
            showToast("success", "user registration successful")
            // store.dispatch(loginSuccess(res.data.data.token, res.data.data.refreshToken))
            setTimeout(() => {
              navigate("/dashboard/dashboard1")
            }, 2000)
          }
          else if (res.status == 409) {
            showToast("error", res.data.error)
          }
        })
        .catch(() => showToast("error", "server down"))
    },
    onError: (error) => {
      showToast("error", "user registration failed! try again")
      console.log(error)
    }
  })

  const handleLogin = async () => {
    // const redirectUri = 'http://localhost:4200/';
    const clientId = `${import.meta.env.VITE_LINKEDIN_CLIENT_ID}`;
    // const clientId = '868y5ytfxct5nq';
    const redirectUri = 'http://13.233.87.102:9800/';
    // const clientId='77bg91xe9wltm2'
    const responseType = 'code';

    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;
  };


  return (
    <Fragment>
      <div>
        <div className="page loginbg">
          <CustomToastContainer />
          <div
            className="page-single"
            onClick={() => Switcherdatacustam.Swichermainrightremove()}
          >
            <div className="container  pt-3">
              <Row>
                <Col
                  xl={10}
                  lg={6}
                  md={8}
                  sm={8}
                  xs={10}
                  className="card p-0 mx-auto my-auto justify-content-center"
                >
                  <div className="card-sigin p-0">
                    <Row>
                      <Col xl={7} className="p-0">
                        <img src="https://lh3.googleusercontent.com/Shib0aDkNhDxKfbhfOwWWg5vKJRknZc1YiLkjwcbMaLyRSUMI_liPbScEpXZrgDI0chcLqz7cVuer5b8mh2JBjausQc9lfq4-YwxGT0WV-egD0c" className="signup_img" />

                      </Col>
                      <Col xl={5} className="pt-4 pb-0 ps-4 pe-4 bg-white right-radius radius15">
                        <div className="main-signup-header">
                          {
                            logo ? <img src={logo} alt={tenant} className="rounded mx-auto d-block" style={{ height: "50px", width: "50px" }} /> : <h3 className="text-primary  text-center">Dealovate</h3>
                          }
                          {/* <h5 className="mb-2 mt-2  text-center">Register your account</h5> */}
                          <p className=" text-center mb-3">Register your account</p>
                          <Form onSubmit={handleFormSubmit}>
                            <Row>
                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                                  <InputGroup className="input-group">

                                    <InputGroup.Text
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      <i className="bi bi-person"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      className="form-control"
                                      type="text"
                                      id="firstName"
                                      name="firstName"
                                      value={formData.firstName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.firstName} />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                      {errors.firstName}
                                    </Form.Control.Feedback>
                                  </InputGroup>

                                </Form.Group>
                              </Col>
                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                                  <InputGroup className="input-group">

                                    <InputGroup.Text
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      <i className="bi bi-person"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      className="form-control"
                                      type="text"
                                      id="lastName"
                                      name="lastName"
                                      value={formData.lastName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.lastName} />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                      {errors.lastName}
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col xl={12}>
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
                                      type="emailId"
                                      id="emailId"
                                      name="emailId"
                                      value={formData.emailId}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.emailId} />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                      {errors.emailId}
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col xl={12}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Mobile Number <span className="text-danger">*</span></Form.Label>
                                  <InputGroup className="input-group">

                                    <InputGroup.Text
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      <i className="bi bi-phone"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      className="form-control"
                                      type="number"
                                      id="mobile"
                                      name="mobile"
                                      value={formData.mobile}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.mobile} />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                      {errors.mobile}
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </Form.Group>
                              </Col>

                              <Col xl={12}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Password <span className="text-danger">*</span></Form.Label>
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
                              </Col>
                              <Col xl={6}>
                                <span className="text-center tx-32 captcha mt-3">{captcha}</span>
                                <i className="bi bi-arrow-clockwise captcharefresh" onClick={() => getCaptcha()}></i>
                              </Col>
                              <Col xl={6}>
                                <Form.Group className="form-group mb-1">
                                  <Form.Label>Captcha Code <span className="text-danger">*</span></Form.Label>
                                  <InputGroup className="input-group">

                                    <InputGroup.Text
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      <i className="bi bi-upc"></i>
                                    </InputGroup.Text>
                                    <Form.Control
                                      className="form-control"
                                      type="text"
                                      id="captcha"
                                      name="captcha"
                                      value={formData.captcha}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.captcha} />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                      {errors.captcha}
                                    </Form.Control.Feedback>
                                  </InputGroup>
                                </Form.Group>
                              </Col>
                              <Col xl={12}>
                                <Button
                                  variant=""
                                  className="btn btn-primary btn-block mt-3 mb-3"
                                  type="submit"
                                >{!loading ? '' : <Spinner animation="border"
                                  className="spinner-border spinner-border-sm me-1"
                                  role="status"
                                  aria-hidden="true"
                                ></Spinner>}
                                  Sign Up
                                </Button>
                              </Col>
                            </Row>

                          </Form>
                          <hr />
                          <p className="text-center mt-2 or_login">OR</p>
                          <div className="mt-3 d-flex text-center justify-content-center mb-0">

                            <Button
                              onClick={() => login()}
                              className="btn btn-icon me-2  btn-white border-0"
                              type="button"
                            >
                              <span className="btn-inner--icon">
                                {" "}
                                <i className="bx bxl-google tx-18 tx-prime"></i>{" "}
                              </span>
                            </Button>
                            <Button
                              onClick={handleLogin}
                              className="btn btn-icon me-2  btn-white border-0"
                              type="button"
                            >
                              <span className="btn-inner--icon">
                                {" "}
                                <i className="bx bxl-linkedin tx-18 tx-prime"></i>{" "}
                              </span>
                            </Button>

                          </div>
                          <div className="text-center mt-2 mb-0 tx-14">New to Dealovate? <Link to={`${import.meta.env.BASE_URL}pages/authentication/sigin`} className="text-primary"><b>Sign In</b></Link></div>

                        </div>
                      </Col>
                    </Row>

                  </div>
                </Col>
              </Row>
              <p className="text-center mt-3 mb-2"> Powered by Dealovate</p>
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
              <p className="text-center mt-2">@2024 Dealovate </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};


export default SignUp;
