import  {Fragment, useEffect} from "react";
import { Button, Row } from "react-bootstrap";
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Switcherdata from '../../common/switcherdata';
import { Link } from "react-router-dom";
import { imagesData } from "../../common/commonimages";

export default function Switcher() {
 useEffect(() => {
      Switcherdata.localStorageBackUp();
    },[]);

    function changePrimaryColor(userColor:any) {

      localStorage.setItem("nowaPrimaryColor", userColor);
      // to store value as opacity 0.95 we use 95
      localStorage.setItem("nowaprimaryHoverColor", userColor + 95);
      localStorage.setItem("nowaprimaryBorderColor", userColor);
      localStorage.setItem("nowaprimaryTransparent", userColor + 20);

      const dynamicPrimaryLight = document.querySelectorAll(
        "input.color-primary-light"
      );

      Switcherdata.dynamicLightPrimaryColor(dynamicPrimaryLight, userColor);
  
      const myonoffswitch1 = document.getElementById("myonoffswitch1") as HTMLInputElement;
      myonoffswitch1.checked = true;
      const myonoffswitch3 = document.getElementById("myonoffswitch3") as HTMLInputElement;
      myonoffswitch3.checked = true;
      const myonoffswitch6 = document.getElementById("myonoffswitch6")as HTMLInputElement;
      myonoffswitch6.checked = true;
      // const myonoffswitch2 = document.getElementById("myonoffswitch2") as HTMLInputElement;
      // myonoffswitch2.checked = false;
      const myonoffswitchTransparent = document.getElementById("myonoffswitchTransparent") as HTMLInputElement;
      myonoffswitchTransparent.checked = false;
      // Adding
      document.querySelector("body")?.classList.add("light-theme");

      // Removing
      document.querySelector("body")?.classList.remove("dark-theme");
      document.querySelector("body")?.classList.remove("transparent-theme");
      document.querySelector("body")?.classList.remove("bg-img1");
      document.querySelector("body")?.classList.remove("bg-img2");
      document.querySelector("body")?.classList.remove("bg-img3");
      document.querySelector("body")?.classList.remove("bg-img4");

      localStorage.removeItem("nowadarkPrimaryColor");
      localStorage.removeItem("nowatransparentPrimaryColor");
      localStorage.removeItem("nowatransparentBgColor");
      localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
      localStorage.removeItem("nowaBgImage");

      Switcherdata.name();
  
    }
    function darkPrimaryColor(userColor:any) {

      localStorage.setItem("nowadarkPrimaryColor", userColor);
      localStorage.setItem("nowaprimaryHoverColor", userColor + 95);
      localStorage.setItem("nowaprimaryBorderColor", userColor);
      localStorage.setItem("nowaprimaryTransparent", userColor + 20);
      const dynamicPrimaryDark = document.querySelectorAll(
        "input.color-primary-dark"
      );

      Switcherdata.dynamicDarkPrimaryColor(dynamicPrimaryDark, userColor);
      
      const myonoffswitch2 = document.getElementById("myonoffswitch2") as HTMLInputElement;
      myonoffswitch2.checked = true;
      const myonoffswitch5 = document.getElementById("myonoffswitch5") as HTMLInputElement;
      myonoffswitch5.checked = true;
      const myonoffswitch8 = document.getElementById("myonoffswitch8")as HTMLInputElement;
      myonoffswitch8.checked = true;
      const myonoffswitchTransparent = document.getElementById("myonoffswitchTransparent") as HTMLInputElement;
      myonoffswitchTransparent.checked = false;
      // Adding
      document.querySelector("body")?.classList.add("dark-theme");

      // Removing
      document.querySelector("body")?.classList.remove("light-theme");
      document.querySelector("body")?.classList.remove("transparent-theme");
      document.querySelector("body")?.classList.remove("bg-img1");
      document.querySelector("body")?.classList.remove("bg-img2");
      document.querySelector("body")?.classList.remove("bg-img3");
      document.querySelector("body")?.classList.remove("bg-img4");

      localStorage.removeItem("nowaPrimaryColor");
      localStorage.removeItem("nowaprimaryHoverColor");
      localStorage.removeItem("nowaprimaryBorderColor");
      localStorage.removeItem("nowaprimaryTransparent");
      localStorage.removeItem("nowatransparentPrimaryColor");
      localStorage.removeItem("nowatransparentBgColor");
      localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
      localStorage.removeItem("nowaBgImage");

      Switcherdata.name();
    }
    function transparentPrimaryColor(userColor:any) {

      localStorage.setItem("nowatransparentPrimaryColor", userColor);
      localStorage.setItem("nowaprimaryHoverColor", userColor + 95);
      localStorage.setItem("nowaprimaryBorderColor", userColor);
      localStorage.setItem("nowaprimaryTransparent", userColor + 20);
      const PrimaryTransparent = document.querySelectorAll(
        "input.color-primary-transparent"
      );

      Switcherdata.dynamicTransparentPrimaryColor(
        PrimaryTransparent,
        userColor
      );

      const Transparent = document.getElementById("myonoffswitchTransparent") as HTMLInputElement;
      Transparent.checked = true;
      const myonoffswitch1 = document.getElementById("myonoffswitch1") as HTMLInputElement;
      myonoffswitch1.checked = false;
      const myonoffswitch2 = document.getElementById("myonoffswitch2") as HTMLInputElement;
      myonoffswitch2.checked = false;
      // Adding
      document.querySelector("body")?.classList.add("transparent-theme");

      // Removing
      document.querySelector("body")?.classList.remove("light-theme");
      document.querySelector("body")?.classList.remove("dark-theme");
      document.querySelector("body")?.classList.remove("bg-img1");
      document.querySelector("body")?.classList.remove("bg-img2");
      document.querySelector("body")?.classList.remove("bg-img3");
      document.querySelector("body")?.classList.remove("bg-img4");

      localStorage.removeItem("nowaPrimaryColor");
      localStorage.removeItem("nowaprimaryHoverColor");
      localStorage.removeItem("nowaprimaryBorderColor");
      localStorage.removeItem("nowaprimaryTransparent");
      localStorage.removeItem("nowadarkPrimaryColor");
      localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
      localStorage.removeItem("nowaBgImage");

      Switcherdata.name();
    }
    function BgTransparentBackground(userColor:any) {

      localStorage.setItem("nowatransparentBgColor", userColor);

      const dynamicBackgroundColor = document.querySelectorAll(
        "input.color-bg-transparent"
      );

      Switcherdata.dynamicBgTransparentBackground(
        dynamicBackgroundColor,
        userColor
      );

      const Transparent = document.getElementById("myonoffswitchTransparent") as HTMLInputElement;
      Transparent.checked = true;
     
      // Adding
      document.querySelector("body")?.classList.add("transparent-theme");

      // Removing
      document.querySelector("body")?.classList.remove("light-theme");
      document.querySelector("body")?.classList.remove("dark-theme");
      document.querySelector("body")?.classList.remove("bg-img1");
      document.querySelector("body")?.classList.remove("bg-img2");
      document.querySelector("body")?.classList.remove("bg-img3");
      document.querySelector("body")?.classList.remove("bg-img4");
      document.querySelector("body")?.classList.remove("light-header");
      document.querySelector("body")?.classList.remove("color-header");
      document.querySelector("body")?.classList.remove("dark-header");
      document.querySelector("body")?.classList.remove("gradient-header");
      document.querySelector("body")?.classList.remove("light-menu");
      document.querySelector("body")?.classList.remove("color-menu");
      document.querySelector("body")?.classList.remove("dark-menu");
      document.querySelector("body")?.classList.remove("gradient-menu");
      localStorage.removeItem("nowaPrimaryColor");
      localStorage.removeItem("nowaprimaryHoverColor");
      localStorage.removeItem("nowaprimaryBorderColor");
      localStorage.removeItem("nowaprimaryTransparent");
      localStorage.removeItem("nowadarkPrimaryColor");
      localStorage.removeItem("nowatransparent-bgImgPrimaryColor");
      localStorage.removeItem("nowaBgImage");

      Switcherdata.name();
    }
    function BgImgTransparentPrimaryColor(userColor:any) {

      localStorage.setItem("nowatransparent-bgImgPrimaryColor", userColor);

      const dynamicPrimaryImgTransparent = document.querySelectorAll(
        "input.color-primary-transparent"
      );

      Switcherdata.dynamicBgImgTransparentPrimaryColor(
        dynamicPrimaryImgTransparent,
        userColor
      );
// console.log(dynamicPrimaryImgTransparent);
     const Transparent:any = document.getElementById("myonoffswitchTransparent");
     Transparent.checked = true;

      // Adding
      document.querySelector("body")?.classList.add("transparent-theme");

      // Removing
      document.querySelector("body")?.classList.remove("light-theme");
      document.querySelector("body")?.classList.remove("dark-theme");
      document.querySelector("body")?.classList.remove("light-header");
      document.querySelector("body")?.classList.remove("color-header");
      document.querySelector("body")?.classList.remove("dark-header");
      document.querySelector("body")?.classList.remove("gradient-header");
      document.querySelector("body")?.classList.remove("light-menu");
      document.querySelector("body")?.classList.remove("color-menu");
      document.querySelector("body")?.classList.remove("dark-menu");
      document.querySelector("body")?.classList.remove("gradient-menu");
      localStorage.removeItem("nowaPrimaryColor");
      localStorage.removeItem("nowaprimaryHoverColor");
      localStorage.removeItem("nowaprimaryBorderColor");
      localStorage.removeItem("nowaprimaryTransparent");
      localStorage.removeItem("nowadarkPrimaryColor");
      localStorage.removeItem("nowatransparentPrimaryColor");
      localStorage.removeItem("nowatransparentBgColor");

     const transparentbody:any = document.querySelector("html");
     transparentbody.style.removeProperty("--transparent-body");

      if (
        document.querySelector("body")?.classList.contains("bg-img1") ===
          false &&
        document.querySelector("body")?.classList.contains("bg-img2") ===
          false &&
        document.querySelector("body")?.classList.contains("bg-img3") ===
          false &&
        document.querySelector("body")?.classList.contains("bg-img4") === false
      ) {
        document.querySelector("body")?.classList.add("bg-img1");
        localStorage.setItem("nowaBgImage", "bg-img1");
      }
      Switcherdata.name();
      
    }

const Switcherclose = () => {
    document.querySelector(".demo_changer")?.classList.remove("active");
    document.querySelector(".switcher-backdrop")?.classList.remove("d-block");
    document.querySelector(".switcher-backdrop")?.classList.add("d-none");
    
    const Rightside: any = document.querySelector(".demo_changer");
    Rightside.style.right = "-270px";
};
  return (
    <Fragment>
        <div className="switcher-backdrop d-none" onClick={() => {
                      Switcherclose();
                    }}></div>
      <div className="switcher-wrapper">
        <div className="demo_changer">
          <div className="form_holder sidebar-right1">
           
            <PerfectScrollbar className="sidebarright2"  options={{ suppressScrollX: true, useBothWheelAxes: false }} >
             
              <Row>
                <div className="predefined_styles">
                  <div className="swichermainleft text-center">
                    <h4>LTR AND RTL VERSIONS</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">LTR</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch25"
                              id="myonoffswitch54"
                              onClick={() => Switcherdata.RtltoLtr()}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch54"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">RTL</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch25"
                              id="myonoffswitch55"
                              onClick={() => Switcherdata.LtrtoRtl()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch55"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Navigation Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Vertical Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch15"
                              id="myonoffswitch34"
                              onClick={() => Switcherdata.VerticalMenu()}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch34"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Horizantal Click Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch15"
                              id="myonoffswitch35"
                              onClick={Switcherdata.horizontal}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch35"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Horizantal Hover Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch15"
                              id="myonoffswitch111"
                              onClick={() => Switcherdata.HorizontalHoverMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch111"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Light Theme Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Theme</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch1"
                              id="myonoffswitch1"
                              onClick={() => Switcherdata.LightTheme()}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch1"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Primary</span>
                          <div className="">
                            <input
                              className="wd-25 ht-25 input-color-picker color-primary-light"
                              defaultValue="#bc212b"
                              id="colorID"
                              
                              onChange={(ele) => { changePrimaryColor(ele.target.value); }}
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id7="transparentcolor"
                              name="lightPrimary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Dark Theme Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Theme</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch1"
                              id="myonoffswitch2"
                              onClick={() => Switcherdata.dark()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch2"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Primary</span>
                          <div className="">
                            <input
                              className="wd-25 ht-25 input-dark-color-picker color-primary-dark"
                              defaultValue="#bc212b"
                              id="darkPrimaryColorID"
                              onChange={(e) => { darkPrimaryColor(e.target.value); }}
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id3="primary"
                              data-id8="transparentcolor"
                              name="darkPrimary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Transparent Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex mt-2 mb-3">
                          <span className="me-auto">Transparent Theme</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch1"
                              onClick={() => Switcherdata.transparent()}
                              id="myonoffswitchTransparent"
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitchTransparent"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Transparent Primary</span>
                          <div className="">
                            <input
                              className="wd-30 ht-30 input-transparent-color-picker color-primary-transparent"
                              defaultValue="#bc212b"
                              id="transparentPrimaryColorID"
                              onChange={(e) => { transparentPrimaryColor(e.target.value); }}
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id3="primary"
                              data-id4="primary"
                              data-id9="transparentcolor"
                              name="tranparentPrimary"
                            />
                          </div>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">
                            Transparent Background
                          </span>
                          <div className="">
                            <input
                              className="wd-30 ht-30 input-transparent-color-picker color-bg-transparent"
                              defaultValue="#bc212b"
                              id="transparentBgColorID"
                              onChange={(e) => { BgTransparentBackground(e.target.value); }}
                              type="color"
                              data-id5="body"
                              data-id6="theme"
                              data-id9="transparentcolor"
                              name="transparentBackground"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Transparent Bg-Image Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">BG-Image Primary</span>
                          <div className="">
                            <input
                              className="wd-30 ht-30 input-transparent-color-picker color-primary-transparent"
                              defaultValue="#bc212b"
                              id="transparentBgImgPrimaryColorID"
                              onChange={(e) => { BgImgTransparentPrimaryColor(e.target.value); }}
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id3="primary"
                              data-id4="primary"
                              data-id9="transparentcolor"
                              name="tranparentPrimary"
                            />
                          </div>
                        </div>
                        <div className="switch-toggle">
                          <Link
                            className="bg-img1"
                            onClick={() => Switcherdata.bgimage1()}
                            to="#"
                          >
                            <img
                              src={imagesData('bgimg1')}
                              id="bgimage1"
                              alt="switch-img"
                            />
                          </Link>
                          <Link
                            className="bg-img2"
                            onClick={() => Switcherdata.bgimage2()}
                            to="#"
                          >
                            <img
                              src={imagesData('bgimg2')}
                              id="bgimage2"
                              alt="switch-img"
                            />
                          </Link>
                          <Link
                            className="bg-img3"
                            onClick={() => Switcherdata.bgimage3()}
                            to="#"
                          >
                            <img
                              src={imagesData('bgimg3')}
                              id="bgimage3"
                              alt="switch-img"
                            />
                          </Link>
                          <Link
                            className="bg-img4"
                            onClick={() => Switcherdata.bgimage4()}
                            to="#"
                          >
                            <img
                              src={imagesData('bgimg4')}
                              id="bgimage4"
                              alt="switch-img"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft leftmenu-styles">
                    <h4>Leftmenu Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch3"
                              onClick={() => Switcherdata.LightMenu()}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch3"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Color Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch4"
                              onClick={() => Switcherdata.ColorMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch4"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch5"
                              onClick={() => Switcherdata.DarkMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch5"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Gradient Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch25"
                              onClick={() => Switcherdata.GradientMenu()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch25"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft header-styles">
                    <h4>Header Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch6"
                              onClick={() => Switcherdata.Lightheader()}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch6"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Color Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch7"
                              onClick={() => Switcherdata.Colorheader()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch7"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch8"
                              onClick={() => Switcherdata.Darkheader()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch8"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Gradient Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch26"
                              onClick={() => Switcherdata.gradientheader()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch26"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Layout Width Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Full Width</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch4"
                              id="myonoffswitch9"
                              onClick={() => Switcherdata.FullWidth()}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch9"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Boxed</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch4"
                              id="myonoffswitch10"
                              onClick={() => Switcherdata.Boxed()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch10"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Layout Positions</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Fixed</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch5"
                              id="myonoffswitch11"
                              onClick={() => Switcherdata.Fixed()}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch11"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Scrollable</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch5"
                              id="myonoffswitch12"
                              onClick={() => Switcherdata.Scrollable()}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch12"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Reset All Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section my-4">
                        <Button
                          variant=""
                          className="btn btn-danger btn-block"
                          onClick={() => {
                            const html: any = document.querySelector('html');
                            html.style = '';
                            Switcherdata.name();
                            Switcherdata.resetData();
                          }}
                          type="button"
                        >
                          Reset All
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
           
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
Switcher.propTypes = {};

// Switcher.defaultProps = {};
