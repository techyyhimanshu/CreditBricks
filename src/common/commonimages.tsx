//faces

import female1 from "../assets/img/faces/female1.jpg";
import female2 from "../assets/img/faces/1.jpg";
import female11 from "../assets/img/faces/1.jpg";
import female5 from "../assets/img/faces/1.jpg";
import female6 from "../assets/img/faces/1.jpg";
import female7 from "../assets/img/faces/1.jpg";
import female9 from "../assets/img/faces/1.jpg";

import  us from "../assets/img/flags/us_flag.jpg";
import  italy from "../assets/img/flags/italy_flag.jpg";
import  spain from "../assets/img/flags/spain_flag.jpg";
import  india from "../assets/img/flags/india_flag.jpg";
import  french from "../assets/img/flags/french_flag.jpg";
import  mexico from "../assets/img/flags/mexico.jpg";
import  singapore from "../assets/img/flags/singapore.jpg";
import  poland from "../assets/img/flags/poland.jpg";
import  austria from "../assets/img/flags/austria.jpg";
import  russia from "../assets/img/flags/russia_flag.jpg";
import  germany from "../assets/img/flags/germany_flag.jpg";
import  argentina from "../assets/img/flags/argentina.jpg";
import  brazil from "../assets/img/flags/brazil.jpg";
import  uae from "../assets/img/flags/uae.jpg";
import  china from "../assets/img/flags/china.jpg";
import  uk from "../assets/img/flags/uk.jpg";
import  malaysia from "../assets/img/flags/malaysia.jpg";
import  canada from "../assets/img/flags/canada.jpg";

import bgimg from "../assets/img/media/bg-img.jpg";
import bgimg1 from "../assets/img/media/bg-img1.jpg";
import bgimg2 from "../assets/img/media/bg-img2.jpg";
import bgimg3 from "../assets/img/media/bg-img3.jpg";
import bgimg4 from "../assets/img/media/bg-img4.jpg";
import logibg from "../assets/img/loginbg.webp";
//Medaia

//svg
import  chrome from "../assets/img/svgicons/chrome.svg";
import  edge from "../assets/img/svgicons/edge.svg";
import  email from "../assets/img/svgicons/email.svg";
import  firefox from "../assets/img/svgicons/firefox.svg";
import  opera from "../assets/img/svgicons/opera.svg";
import  safari from "../assets/img/svgicons/safari.svg";

import favicon from '../assets/img/brand/favicon.png';
import logo from '../assets/img/brand/logo.png';
import mainlogo from '../assets/img/brand/mainlogo.png';
import logowhite from '../assets/img/brand/logo-white.png';
import faviconwhite from '../assets/img/brand/favicon-white.png';

//form
import evaluationfrm from '../assets/img/evaluationsform.jpg';
import applicationfrm from '../assets/img/applicationform.jpg';
import feedbackfrm from '../assets/img/feedbackform.jpg';

//payment
import visa from '../assets/img/visa.webp';
import paypal from '../assets/img/paypal.webp';
import mastercard from '../assets/img/mastercard.webp';

import totalbalance from '../assets/img/totalbalance.png';
import totalreceipt from '../assets/img/totalreceipt.png';
import totalinvoice from '../assets/img/totalinvoive.png';

import pdficon from '../assets/img/pdf.png';
import excelicon from '../assets/img/excel.png';

// applications icon
import gatepass from '../assets/applicationicon/gatepass.webp';
import changename from '../assets/applicationicon/ChangeName.webp';
import conatctupdate from '../assets/applicationicon/contactupdate.webp';
import parking from '../assets/applicationicon/parking.webp';
import flatresale from '../assets/applicationicon/flateresale.webp';
import interiorwork from '../assets/applicationicon/interiorwork.webp';
import celebration from '../assets/applicationicon/celebration.webp';
import theater from '../assets/applicationicon/theater.webp';
import banquethall from '../assets/applicationicon/banquethall.webp';
import clubhouse from '../assets/applicationicon/clubhouse.webp';
import swimmingpool from '../assets/applicationicon/swimmingpool.webp';
import playarea from '../assets/applicationicon/playarea.webp';
import turfarea from '../assets/applicationicon/turfarea.webp';
import rentagreement from '../assets/applicationicon/rentagreement.webp';
import sharecertificate from '../assets/applicationicon/sharecertificate.webp';
import nomination from '../assets/applicationicon/nomination.webp';
import badminton from '../assets/applicationicon/badminton.webp';
import foodcourt from '../assets/applicationicon/foodcourt.webp';
import others from '../assets/applicationicon/others.webp';

import cash from '../assets/img/cash.png';
import cheque from '../assets/img/cheque.png';
import online from '../assets/img/online.png';

import pdfinvoice from '../assets/maintenanacebill.pdf';

export const imagesData = (idx: any) => {
  const images :any = {
    evaluationfrm,applicationfrm, feedbackfrm,
    visa, paypal, mastercard,
    female1, female2, female5,female6, female7, female9,
    female11 ,chrome, edge, email, firefox, opera,  safari,
    us, italy, spain, india, french, mexico, singapore, poland, austria, russia, germany, argentina, brazil, uae, china, uk,
    malaysia, canada, favicon,faviconwhite, logo, logowhite , mainlogo, bgimg, bgimg1, bgimg2, bgimg3, bgimg4, logibg, totalbalance, totalreceipt, totalinvoice,
    pdficon, gatepass, conatctupdate,changename, parking, flatresale, interiorwork, celebration, theater, banquethall,clubhouse, swimmingpool, playarea, turfarea, rentagreement, sharecertificate, nomination, badminton, foodcourt, others,
    cash, cheque, online, excelicon, pdfinvoice

  };
  return images[idx];
};
