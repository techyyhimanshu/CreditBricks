import { Fragment } from "react"
import { Row, Col } from "react-bootstrap"
import { imagesData } from "../../../../common/commonimages";


const PrivacyPolicy = () => {


    return (
      <Fragment>
           <div className="cover-image">

             <div className="page loginbg">
              <img src={imagesData('logo')} className="w-200px m-auto d-block"  />
               <div
                 className="page-single" >
                 <div className="container">
                   <Row>
                     <Col
                       xl={11}  className="card justify-content-center mx-auto"
                     >
                       <div className="card-sigin">

<div className="w-100 text-justify">
<h3 className="text-center mb-3"> Privacy Policy</h3>

<strong>Credit Bricks</strong> is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application Credit Bricks. Please read this policy carefully. If you do not agree with the terms of this policy, please do not use the App.
<br/>
<strong className="mt-2 w-100 d-block tx-18 mb-2">1. Information We Collect</strong>
<strong>1.1 Personal Information</strong><br/>
We may collect personal information you voluntarily provide, including:
<br/>
Name<br/>

Email address<br/>

Phone number<br/>

Profile information<br/>

Payment details (if applicable)<br/>
<br/>
<strong>1.2 Automatically Collected Information</strong><br/>
When you use the App, we may automatically collect:<br/>

Device information (e.g., model, OS version, device ID)<br/>

IP address<br/>

Usage data (e.g., screens visited, features used)<br/>

Location data (if permission is granted)<br/>
<br/>
<strong>1.3 Camera Access</strong>
Our app may request access to your device’s camera for the following purposes:<br/>

To allow you to scan documents, QR codes, or capture images within the app<br/>

To enable identity verification or similar features (if applicable)<br/>

We do not use the camera in the background or without your knowledge. No media is recorded or stored without your explicit action.<br/>
<br/>
<strong className="mt-2 w-100 d-block tx-18 mb-2">2. How We Use Your Information</strong>
We may use the information we collect to:<br/>

Provide and maintain the App<br/>

Personalize user experience<br/>

Process transactions<br/>

Communicate with you (support, updates, promotional content)<br/>

Improve app performance and security<br/>

Comply with legal obligations<br/>

<strong className="mt-2 w-100 d-block tx-18 mb-2">3. Sharing Your Information</strong>
We do not sell your personal data. We may share your information:<br/>

With service providers who assist us in running the App (e.g., cloud hosting, analytics)<br/>

When required by law or legal process<br/>

In connection with a business transfer (e.g., merger, acquisition)<br/>

<strong className="mt-2 w-100 d-block tx-18 mb-2">4. Your Privacy Rights</strong>
Depending on your location, you may have the right to:<br/>

Access the data we hold about you<br/>

Request correction or deletion of your data<br/>

Withdraw consent for data processing<br/>

Object to or restrict certain uses of your data<br/>

To exercise these rights, contact us at: [Insert Contact Email]<br/>

<strong className="mt-2 w-100 d-block tx-18 mb-2">5. Data Security</strong>
We use administrative, technical, and physical security measures to protect your information. However, no system is 100% secure, so we cannot guarantee absolute security.

<strong className="mt-2 w-100 d-block tx-18 mb-2">6. Children’s Privacy</strong>
Our App is not intended for children under the age of 13. We do not knowingly collect data from children. If we learn that we have collected data from a child without parental consent, we will delete it promptly.

<strong className="mt-2 w-100 d-block tx-18 mb-2">7. Changes to This Privacy Policy</strong>
We may update this policy from time to time. Any changes will be posted here with a new “Effective Date.” Continued use of the App after changes means you accept the updated policy.

<strong className="mt-2 w-100 d-block tx-18 mb-2">8. Contact Us</strong>
If you have any questions or concerns about this Privacy Policy, please contact us at:<br/>

📧 Email: enquiry@creditbricks.in<br/>


                               </div>


                       </div>
                     </Col>
                   </Row>

                   <p className="text-center mt-5 mb-4"> Powered by Credit Bricks</p>

                   {/* <p className="text-center mt-4">@2025 Credit Bricks </p> */}
                 </div>
               </div>
             </div>
           </div>
         </Fragment>

    )
}

export default PrivacyPolicy