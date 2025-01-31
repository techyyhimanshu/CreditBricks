import { Fragment, useState, useEffect } from "react";
import { Navbar, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";
import * as Switcherdata from '../../common/switcherdata';
// import i18n from '../../common/i18n/i18n';
import store from "../../common/store/store";
import { logout } from "../../common/actions/authActions";
import { jwtDecode } from "jwt-decode";
// interface UseLang {
//   lang: boolean;
//   lng: string;
// }

interface User {
  fullName: string;
  emailId: string;
}

export default function Header() {
  const [userinfo, setUserinfo] = useState<User | null>(null)
  const [userType, setUserType] = useState<string>("")

  // useEffect(() => {
  //   Switcherdata.localStorageBackUp();
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     console.log(token)
  //     const decodedToken: any = jwtDecode(token);
  //     setUserinfo(decodedToken)
  //   }
  // }, []);

  useEffect(() => {
    const user = localStorage.getItem("userType")
    if (user) {
      setUserType(user)
    }
  }, [localStorage])

  // const [Lang, setLang] = useState<UseLang>({
  //   lang:false,
  //   lng:i18n.language
  // });

  const [fullscreens, setFullscreen] = useState(true);


  // FullScreen
  const elem: any = document.documentElement;
  const Fullscreen: any = (vale: any) => {
    switch (vale) {
      case true:
        elem.requestFullscreen();
        setFullscreen(false);
        break;
      case false:
        document.exitFullscreen();
        setFullscreen(true);
        break;
    }
  };

  const handleLogOut = () => {
    store.dispatch(logout())
  }


  // const changeLanguage = (lng:any) => {
  //   localStorage.setItem("lang", lng);
  //   setLang({
  //     lang: false,
  //     lng: i18n.language
  //   });
  //   window.location.reload();
  // };

  // const popModal = (staus:boolean) => {
  //   setLang({
  //     lang: staus,
  //     lng: i18n.language
  //   });
  // }
  //leftsidemenu
  const openCloseSidebar = () => {
    document.body.classList.toggle('sidenav-toggled');

  };
  //rightsidebar
  const Rightsidebar = () => {
    document.querySelector(".sidebar-right")?.classList.add("sidebar-open");
  };

  const Darkmode = () => {

    if (document.querySelector(".app")?.classList.contains('dark-theme')) {
      document.querySelector(".app")?.classList.remove('dark-theme');
      localStorage.setItem("nowalighttheme", "true");
      localStorage.removeItem("nowadark");
      const DarkMenu1 = document.querySelector("#myonoffswitch1") as HTMLInputElement;        //light theme
      DarkMenu1.checked = true;
      const DarkMenu2 = document.querySelector("#myonoffswitch6") as HTMLInputElement;  // light header
      if (DarkMenu2) {
        DarkMenu2.checked = true;
      }
      const DarkMenu3 = document.querySelector("#myonoffswitch3") as HTMLInputElement;  //light menu
      if (DarkMenu3) {
        DarkMenu3.checked = true;
      }
    }
    else {
      document.querySelector(".app")?.classList.add('dark-theme');
      localStorage.setItem("nowadark", "true");
      localStorage.removeItem("nowalighttheme");
      const DarkMenu1 = document.querySelector("#myonoffswitch2") as HTMLInputElement; //dark theme
      DarkMenu1.checked = true;
      const DarkMenu2 = document.querySelector("#myonoffswitch8") as HTMLInputElement; //dark header
      if (DarkMenu2) {
        DarkMenu2.checked = true;
      }
      const DarkMenu3 = document.querySelector("#myonoffswitch5") as HTMLInputElement; //dark menu
      if (DarkMenu3) {
        DarkMenu3.checked = true;
      }
    }
  };

  // responsivesearch
  // const responsivesearch = () => {
  //   document.querySelector(".navbar-form")?.classList.toggle("active");
  // };


  // swichermainright
  // const swichermainright = () => {
  //   document.querySelector(".demo_changer")?.classList.toggle("active");

  //     if( document.querySelector(".switcher-backdrop")?.classList.contains('d-none')){
  //     document.querySelector(".switcher-backdrop")?.classList.add("d-block");
  //     document.querySelector(".switcher-backdrop")?.classList.remove("d-none");
  //   }
  //   const rightSidebar:any =  document.querySelector(".demo_changer");
  //   rightSidebar.style.right = "0px";
  // };

  return (
    <Fragment>
      <Navbar className="main-header side-header sticky nav nav-item"
        style={{ marginBottom: '-63px' }}
      >
        <div className="main-container container-fluid">
          <div className="main-header-left ">
            {/* <h3 className="ps-4 pt-2"> Dealovate</h3> */}
            <div
              className="app-sidebar__toggle"
              data-bs-toggle="sidebar"
              onClick={() => openCloseSidebar()}
            >
              <Link className="open-toggle" to="#">
                <i className="header-icon fe fe-align-left"></i>
              </Link>
              <Link className="close-toggle" to="#">
                <i className="header-icon fe fe-x"></i>
              </Link>
            </div>
            <div className="logo-horizontal">

            </div>

          </div>
          <div className="main-header-right">

            <Navbar.Toggle
              className="navresponsive-toggler d-lg-none ms-auto"
              type="button"
            >
              <span className="navbar-toggler-icon fe fe-more-vertical"></span>
            </Navbar.Toggle>
            <div className="mb-0 navbar navbar-expand-lg   navbar-nav-right responsive-navbar navbar-dark p-0">
              <Navbar.Collapse className="collapse" id="navbarSupportedContent-4">
                <ul className="nav nav-item header-icons navbar-nav-right pe-0">
                  <li className="dropdown nav-item">
                    {/* <>
            <Link
                className="new nav-link"
                data-bs-target="#country-selector"
                data-bs-toggle="modal"
                to="#"
                onClick={() => setLang((prevState)=>({...prevState,lang:true}))}
            >
                <svg
                    className="header-icon-svgs"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z" />
                </svg>
            </Link>
            <Modal
                show={Lang.lang}
                onHide={() => setLang((prevState)=>({...prevState,lang:false}))}
                centered
                id="country-selector"
            >
                <Modal.Header>
                    <h6 className="modal-title">Choose Country/Language</h6>
                    <Button variant="" className="btn-close"
                        type="button"
                        onClick={() => setLang((prevState)=>({...prevState,lang:false}))}
                    >
                        <span aria-hidden="true" className="text-dark">x</span>
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Row as="ul" className=" p-3">
                        <Col lg={6} as="li" className="mb-2">
                            <Link
                                to="#"
                                className="btn btn-country btn-lg btn-block active"
                            >
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('us')}
                                        className="me-3 language"
                                    />
                                </span>
                                Usa{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2 mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('italy')}
                                        className="me-3 language"
                                    />
                                </span>
                                Italy{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('spain')}
                                        className="me-3 language"
                                    />
                                </span>
                                Spain{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('india')}
                                        className="me-3 language"
                                    />
                                </span>
                                India{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('french')}
                                        className="me-3 language"
                                    />
                                </span>
                                France{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('mexico')}
                                        className="me-3 language"
                                    />
                                </span>
                                Mexico{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('singapore')}
                                        className="me-3 language"
                                    />
                                </span>
                                Singapore{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('poland')}
                                        className="me-3 language"
                                    />
                                </span>
                                Poland{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('austria')}
                                        className="me-3 language"
                                    />
                                </span>
                                Austria{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('russia')}
                                        className="me-3 language"
                                    />
                                </span>
                                Russia{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('germany')}
                                        className="me-3 language"
                                    />
                                </span>
                                Germany{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('argentina')}
                                        className="me-3 language"
                                    />
                                </span>
                                Argentina{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('brazil')}
                                        className="me-3 language"
                                    />
                                </span>
                                Brazil{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('uae')}
                                        className="me-3 language"
                                    />
                                </span>
                                U.A.E{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('china')}
                                        className="me-3 language"
                                    />
                                </span>
                                China{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('uk')}
                                        className="me-3 language"
                                    />
                                </span>
                                U.K{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('malaysia')}
                                        className="me-3 language"
                                    />
                                </span>
                                Malaysia{" "}
                            </Link>{" "}
                        </Col>{" "}
                        <Col lg={6} as="li" className="mb-2">
                            {" "}
                            <Link to="#" className="btn btn-country btn-lg btn-block">
                                {" "}
                                <span className="country-selector">
                                    <img
                                        alt=""
                                        src={imagesData('canada')}
                                        className="me-3 language"
                                    />
                                </span>
                                Canada{" "}
                            </Link>{" "}
                        </Col>{" "}
                    </Row>
                </Modal.Body>
            </Modal>
        </> */}
                  </li>
                  {
                    userType === "admin" && <li className="dropdown nav-item w-auto headericon me-3">
                      <Dropdown>
                        <OverlayTrigger
                          placement="bottom"
                          overlay={<Tooltip>Switch Your Profile</Tooltip>}>
                          <Dropdown.Toggle
                            className="new nav-link profile-user d-flex text-primary"

                            variant=""
                          >
                            <strong><i className="bi bi-people"></i></strong>
                          </Dropdown.Toggle>
                        </OverlayTrigger>
                        <Dropdown.Menu>

                          <Dropdown.Item className="dropdown-item" href={`${import.meta.env.BASE_URL}setting/setting`}>
                            <i className="far fa-user-circle me-2"></i>Tenant
                          </Dropdown.Item>

                          <Dropdown.Item className="dropdown-item" onClick={() => handleLogOut()} href="/"
                          >
                            <i className="far fa-user-circle me-2"></i> Owner
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  }
                  <li className="dropdown nav-item">
                    <Link
                      to="#"
                      className="new nav-link theme-layout nav-link-bg layout-setting"
                      onClick={() => Darkmode()}
                    >
                      <span className="dark-layout">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="header-icon-svgs"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" />
                        </svg>
                      </span>
                      <span className="light-layout">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="header-icon-svgs"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z" />
                        </svg>
                      </span>
                    </Link>
                  </li>

                  {/* <Dropdown className=" nav-item main-header-notification d-flex">
                  <Dropdown.Toggle className="new nav-link"  variant="">
                    <i className="bi bi-check2-circle"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="slid1">
                    <div className="menu-header-content text-start border-bottom">
                      <div className="d-flex">
                        <h6 className="dropdown-title mb-1 tx-15 font-weight-semibold">
                          Task
                        </h6>

                      </div>
                   </div>

                    <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }} style={{ height: 210 }}>
                      <div className="main-notification-list Notification-scroll">
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-warning">
                            <i className="bi bi-list-task text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                            Task 1
                            </h5>
                            <div className="notification-subtext">
                              10 hour ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3  border-bottom"

                        >
                          <div className="notifyimg bg-purple">
                            <i className="bi bi-list-task text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                            Task 2
                            </h5>
                            <div className="notification-subtext">
                              2 days ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-success">
                            <i className="bi bi-list-task text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                            Task 3
                            </h5>
                            <div className="notification-subtext">
                              1 hour ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>

                      </div>

                    </PerfectScrollbar>
                    <div className="dropdown-footer">
                      <Link
                        className="btn btn-primary btn-sm btn-block"
                        to={`${import.meta.env.BASE_URL}pages/mail/mail/`}
                      >
                        VIEW ALL
                      </Link>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>


              <Dropdown className=" nav-item main-header-notification d-flex">
                  <Dropdown.Toggle className="new nav-link"  variant="">
                    <i className="bi bi-calendar-event"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="slid1">
                    <div className="menu-header-content text-start border-bottom">
                      <div className="d-flex">
                        <h6 className="dropdown-title mb-1 tx-15 font-weight-semibold">
                          Event/Meetings
                        </h6>

                      </div>
                   </div>

                    <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }} style={{ height: 210 }}>
                      <div className="main-notification-list Notification-scroll">
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-primary">
                            <i className="bi bi-calendar-week text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                             Event 1
                            </h5>
                            <div className="notification-subtext">
                              10 hour ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3  border-bottom"

                        >
                          <div className="notifyimg bg-purple">
                            <i className="bi bi-people-fill text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                          Meeting 1
                            </h5>
                            <div className="notification-subtext">
                              2 days ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-success">
                            <i className="bi bi-calendar-week text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                             Event 3
                            </h5>
                            <div className="notification-subtext">
                              1 hour ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>

                      </div>

                    </PerfectScrollbar>
                    <div className="dropdown-footer">
                      <Link
                        className="btn btn-primary btn-sm btn-block"
                        to={`${import.meta.env.BASE_URL}pages/mail/mail/`}
                      >
                        VIEW ALL
                      </Link>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>





                <Dropdown className=" nav-item main-header-notification d-flex">
                  <Dropdown.Toggle className="new nav-link"  variant="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="header-icon-svgs"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z" />
                    </svg>
                    <span className=" pulse"></span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="slid1">
                    <div className="menu-header-content text-start border-bottom">
                      <div className="d-flex">
                        <h6 className="dropdown-title mb-1 tx-15 font-weight-semibold">
                          Notifications
                        </h6>
                        <span className="badge badge-pill badge-warning ms-auto my-auto float-end">
                          Mark All Read
                        </span>
                      </div>
                      <p className="dropdown-title-text subtext mb-0 op-6 pb-0 tx-12 ">
                        You have 4 unread Notifications
                      </p>
                    </div>

                    <PerfectScrollbar options={{ suppressScrollX: true, useBothWheelAxes: false }} style={{ height: 280 }}>
                      <div className="main-notification-list Notification-scroll">
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-pink">
                            <i className="far fa-folder-open text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                              New files available
                            </h5>
                            <div className="notification-subtext">
                              10 hour ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3  border-bottom"

                        >
                          <div className="notifyimg bg-purple">
                            <i className="fab fa-delicious text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                              Updates Available
                            </h5>
                            <div className="notification-subtext">
                              2 days ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-success">
                            <i className="fa fa-cart-plus text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                              New Order Received
                            </h5>
                            <div className="notification-subtext">
                              1 hour ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-warning">
                            <i className="far fa-envelope-open text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                              New review received
                            </h5>
                            <div className="notification-subtext">
                              1 day ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                          <div className="notifyimg bg-danger">
                            <i className="fab fa-wpforms text-white"></i>
                          </div>
                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                              22 verified registrations
                            </h5>
                            <div className="notification-subtext">
                              2 hour ago
                            </div>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="d-flex p-3 border-bottom"

                        >
                            <i className="far fa-check-square text-white notifyimg bg-success"></i>

                          <div className="ms-3">
                            <h5 className="notification-label mb-1">
                              Project has been approved
                            </h5>
                            <span className="notification-subtext">
                              4 hour ago
                            </span>
                          </div>
                          <div className="ms-auto">
                            <i className="las la-angle-right text-end text-muted"></i>
                          </div>
                        </Dropdown.Item>
                      </div>

                    </PerfectScrollbar>
                    <div className="dropdown-footer">
                      <Link
                        className="btn btn-primary btn-sm btn-block"
                        to={`${import.meta.env.BASE_URL}pages/mail/mail/`}
                      >
                        VIEW ALL
                      </Link>
                    </div>
                  </Dropdown.Menu>
                </Dropdown> */}

                  <li
                    className="nav-item full-screen fullscreen-button"
                    onClick={() => Fullscreen(fullscreens)}
                  >
                    <Link className="new nav-link full-screen-link" to="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z" />
                      </svg>
                    </Link>
                  </li>
                  <li
                    className="dropdown main-header-message right-toggle"
                    onClick={() => Rightsidebar()}
                  >
                    <Link
                      to="#"
                      className="new nav-link nav-link pe-0"
                      data-bs-toggle="sidebar-right"
                      data-bs-target=".sidebar-right"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="header-icon-svgs"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
                      </svg>
                    </Link>
                  </li>
                  {/* <li className="nav-link search-icon d-lg-none d-block">
                  <Form
                    className="navbar-form"
                    role="search"
                    onClick={() => responsivesearch()}
                  >

                  <select className="form-control">
                    <option>Tenant</option>
                  </select>

                  </Form>
                </li> */}
                  <li>
                    <Dropdown className=" main-profile-menu nav nav-item nav-link ps-lg-2 m-0">
                      <Dropdown.Toggle
                        className="new nav-link profile-user d-flex username_btn"

                        variant=""
                      >
                        <img
                          alt=""
                          src={imagesData('female1')}
                          className=""
                        /> <strong><span className="username_span">{userinfo?.fullName}</span> <i className="bti bi-chevron-down"></i></strong>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <div className="menu-header-content p-3 border-bottom">
                          <div className="d-flex wd-100p">
                            <div className="main-img-user">
                              <img
                                alt=""
                                src={imagesData('female1')}
                                className=""
                              />
                            </div>
                            <div className="ms-3 my-auto">
                              <h6 className="tx-15 font-weight-semibold mb-0">
                                {userinfo?.fullName}
                              </h6>
                              <span className="dropdown-title-text subtext op-6  tx-12">
                                {userinfo?.emailId}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Dropdown.Item className="dropdown-item" href={`${import.meta.env.BASE_URL}members/membersProfile`}>
                          <i className="far fa-user-circle"></i>Profile
                        </Dropdown.Item>
                        {/* <Dropdown.Item
                      className="dropdown-item"
                      href={`${import.meta.env.BASE_URL}setting/setting`}
                    >
                      <i className="far fa-sun"></i> Settings
                    </Dropdown.Item> */}
                        <Dropdown.Item className="dropdown-item" onClick={() => handleLogOut()} href="/"
                        >
                          <i className="far fa-arrow-alt-circle-left"></i> Sign Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </ul>
              </Navbar.Collapse>
            </div>

          </div>
        </div>
      </Navbar>
      <div className="jumps-prevent" style={{ paddingTop: '63px' }}></div>
    </Fragment>
  );
}

Header.propTypes = {};

// Header.defaultProps = {};
