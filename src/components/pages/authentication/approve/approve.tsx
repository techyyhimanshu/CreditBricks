import { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row, Card, Dropdown } from 'react-bootstrap';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import { imagesData } from '../../../../common/commonimages';
import { getApprovalDataApi } from "../../../../api/approval-api";
import { handleApiError } from "../../../../helpers/handle-api-error";
import { CustomToastContainer, showToast } from "../../../../common/services/toastServices";
import CelebrationBooking from "../celebrationbooking/celebrationbooking";
import GatePassApproval from "../gatepassapproval/gatepassapproval";
import FlatResale from "../flatresale/flatresale";

const Approve = () => {
  const [showGatePass, setShowGatePass] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [showFlatResale, setShowFlatResale] = useState(false)
  const [showOther, setShowOther] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const queryParams = new URLSearchParams(window.location.search);
  const approvalToken = queryParams.get('a');

  useEffect(() => {
    fetchApprovalData()
  }, [approvalToken])


  const fetchApprovalData = async () => {
    setLoading(true)
    try {
      const res = await getApprovalDataApi(approvalToken as string)

      const applicationData = res.data.data;
      setData(applicationData);

      const applicationType = applicationData?.applicationType?.toLowerCase();

      if (['play area', 'food court', 'celebration', 'banquet hall', 'club house'].includes(applicationType)) {
        setShowBooking(true);
      } else if (applicationType === 'gate pass') {
        setShowGatePass(true);
      } else if (applicationType === 'flat resale') {
        setShowFlatResale(true);
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)

    } finally {
      setLoading(false)
    }
  }
  return (

    // <Fragment>
    //   <div className="cover-image">

    //     <div className="page loginbg">

    //       <div
    //         className="page-single"
    //         onClick={() => Switcherdatacustam.Swichermainrightremove()}
    //       >
    //         <div className="container">
    //           <Row>
    //             <Col
    //               xl={12}
    //               lg={12}
    //               xs={12}
    //               className="card justify-content-center mx-auto"
    //             >
    //               <div className="card-sigin p-3">


    //                 <table className="w-100">
    //                   <tr>
    //                     <td className="text-center" colSpan={2}>
    //                       <h3 className="mb-0">Credit Bricks PVt Ltd</h3>
    //                       <strong>Registration Number : BSE/01/02/45  </strong>
    //                       <h5>Gate Pass</h5>
    //                     </td>
    //                   </tr>

    //                 </table>

    //                 <Row>
    //                   <Col sm={12}>
    //                     <Card className='box-shadow border border-primary'>
    //                       <Card.Body>
    //                         <h5 className="card-title main-content-label tx-14 tx-dark tx-medium mg-b-10">Basic Information</h5>
    //                         <Row>
    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Society</Form.Label>
    //                             <p className='mb-0'>Credit Bricks PVt Ltd</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Property</Form.Label>
    //                             <p className='mb-0'>A101</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Gate Type</Form.Label>
    //                             <p className='tx-14 mb-0'>Inward</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Member</Form.Label>
    //                             <p className='tx-14 mb-0'>Test Member 1</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Category</Form.Label>
    //                             <p className='tx-14  mb-0'>Tenant</p>
    //                           </Col>
    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Sub Category</Form.Label>
    //                             <p className='tx-14  mb-0'>Tenant Shifting In</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Tenant Name</Form.Label>
    //                             <p className='tx-14  mb-0'>Ajay Sharma</p>
    //                           </Col>




    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Gate Pass Number</Form.Label>
    //                             <p className='tx-14  mb-0'>-</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Entry Date & Time</Form.Label>
    //                             <p className='tx-14 mb-0'>10/21/2023, 12:00 PM</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Exit Date & Time</Form.Label>
    //                             <p className='tx-14 mb-0'>10/23/2023, 12:00 PM </p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Outstanding</Form.Label>
    //                             <p className='tx-14 tx-bold mb-0'>0.00 </p>
    //                           </Col>

    //                         </Row>
    //                       </Card.Body>
    //                     </Card>


    //                     <Card className='box-shadow border border-primary'>
    //                       <Card.Body>
    //                         <h5 className="card-title  main-content-label tx-14 tx-dark tx-medium mg-b-10">Vehicle and Driver Details</h5>
    //                         <Row>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Driver Name</Form.Label>
    //                             <p className='tx-14 mb-0'>Rakesh Kumar</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Driver Number</Form.Label>
    //                             <p className='tx-14 mb-0'>9876543212</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Vehicle Number</Form.Label>
    //                             <p className='tx-14 mb-0'>HR4A7986</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Vehicle Model</Form.Label>
    //                             <p className='tx-14 mb-0'>-</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Vehicle Nature</Form.Label>
    //                             <p className='tx-14 mb-0'>Visitor Parking</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Vehicle Type</Form.Label>
    //                             <p className='tx-14 mb-0'>SUV</p>
    //                           </Col>
    //                         </Row>
    //                       </Card.Body>
    //                     </Card>


    //                     <Card className='box-shadow border border-primary'>
    //                       <Card.Body>
    //                         <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Contact Person Details</h5>
    //                         <Row>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Contact Person Name</Form.Label>
    //                             <p className='tx-14 mb-0'>Anisha Kumari Bansal</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Contact Person Number</Form.Label>
    //                             <p className='tx-14 mb-0'>8800654786</p>
    //                           </Col>

    //                           <Col sm={6} className='mb-0'>
    //                             <Form.Label>Remarks</Form.Label>
    //                             <p className='tx-14 mb-0'>-</p>
    //                           </Col>

    //                         </Row>
    //                       </Card.Body>
    //                     </Card>

    //                     <Card className='box-shadow border border-primary'>
    //                       <Card.Body>
    //                         <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Documents</h5>
    //                         <Row>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Sale Agreement Copy</Form.Label>
    //                             <p className='tx-14 mb-0'>Yes</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Flat Registration Certificate</Form.Label>
    //                             <p className='tx-14 mb-0'>Yes </p>
    //                           </Col>
    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Home Loan Sanction Letter</Form.Label>
    //                             <p className='tx-14 mb-0'>Yes</p>
    //                           </Col>
    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Old Owner Home Loan Closure Letter</Form.Label>
    //                             <p className='tx-14 mb-0'>Yes </p>
    //                           </Col>


    //                         </Row>
    //                       </Card.Body>
    //                     </Card>



    //                     <Card className='box-shadow border border-primary'>
    //                       <Card.Body>
    //                         <h5 className="card-title main-content-label tx-15 tx-dark tx-medium mg-b-10">Approval Details and Status</h5>

    //                         <Row>
    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Society</Form.Label>
    //                             <p className='tx-14 mb-0'>-</p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Tower</Form.Label>
    //                             <p className='tx-14 mb-0'>Tower A </p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Wing</Form.Label>
    //                             <p className='tx-14 mb-0'>Wing A </p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Property</Form.Label>
    //                             <p className='tx-14 mb-0'>A101 </p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Approver Name</Form.Label>
    //                             <p className='tx-14 mb-0'>Sandeep Singh </p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Approver Number</Form.Label>
    //                             <p className='tx-14 mb-0'>9876543212 </p>
    //                           </Col>

    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Designation</Form.Label>
    //                             <p className='tx-14 mb-0'>Secretary </p>
    //                           </Col>


    //                           <Col sm={3} className='mb-0'>
    //                             <Form.Label>Application Type</Form.Label>
    //                             <p className='tx-14 mb-0'>Gate Pass </p>
    //                           </Col>

    //                           <Col xl={12} className="pt-2">
    //                             <Form.Label className='float-start tx-bold tx-15 text-primary'>Update Status</Form.Label>
    //                             <Dropdown className='profile-user border-0'>
    //                               <Dropdown.Toggle variant="">
    //                                 <strong className="text-danger">Reject</strong>
    //                               </Dropdown.Toggle>
    //                               <Dropdown.Menu>
    //                                 <Dropdown.Item className="dropdown-item text-success" href="/">Approve </Dropdown.Item>
    //                                 <Dropdown.Item className="dropdown-item text-danger" href="/">Reject </Dropdown.Item>
    //                                 <Dropdown.Item className="dropdown-item" href="/">On Hold </Dropdown.Item>
    //                               </Dropdown.Menu>
    //                             </Dropdown>
    //                             <p className="mb-0 mt-2">Remarks</p>
    //                             <textarea className='form-control' placeholder='Remarks'></textarea>
    //                           </Col>
    //                           <Col sm={12} className="text-end pt-3">
    //                             <Button type='button' className='btn btn-primary'>Save</Button>
    //                           </Col>
    //                         </Row>



    //                       </Card.Body>
    //                     </Card>

    //                     <Card className='box-shadow border border-primary'>
    //                       <Card.Body>
    //                         <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Terms & Conditions</h5>
    //                         <Row>

    //                           <Col sm={12} className='mb-0'>
    //                             <p className='tx-12 mb-0 text-justify'>Interest will be charged at 1.75% p.m. after the due date.
    //                               The cheque should be drawn in favor of CreditBricks Society.
    //                               No claim in respect of this bill will be entertained unless notified in writing within 10 days from the date of this bill.
    //                               If the dues are not cleared within 90 days, then the member shall be termed as a defaulter, and appropriate action will be taken by the society against the defaulters as per the Bylaws
    //                               In case of no response on the payment for a prolonged period the membership from the society can be terminated and expulsion procedure can be initiated.
    //                               The penalty charges do not create any right in your favor.
    //                               Society reserves the right to enhance the penalty in case of continuing default and misuse.</p>
    //                           </Col>
    //                         </Row>
    //                       </Card.Body>
    //                     </Card>
    //                   </Col>

    //                   <p className='ps-3 text-end w-100'> Powered by <img src={imagesData('logo')} className="wd-100p ms-1" /></p>
    //                 </Row>
    //               </div>
    //             </Col>
    //           </Row>

    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <CustomToastContainer />
    // </Fragment>
    <>
    {
      showBooking&&data&&<CelebrationBooking initialVals={data}/>
    }
    {
      showGatePass&&data&&<GatePassApproval initialVals={data}/>
    }
    {
      showFlatResale&&<FlatResale/>
    }
    </>

  );
};

Approve.propTypes = {};

Approve.defaultProps = {};

export default Approve;
