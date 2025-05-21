import { Fragment, useState } from "react";
import { Button, Col, Form, Row, Card, Dropdown } from 'react-bootstrap';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import { imagesData } from '../../../../common/commonimages';
import { Link } from "react-router-dom";

interface ProductModalProps {
  initialVals?: any;
}

const FlatResale: React.FC<ProductModalProps> = ({ initialVals }) => {
  const [selectedStatus, setSelectedStatus] = useState("Decline");
  const [remarks, setRemarks] = useState("");


  const handleSaveStatus = async () => {
    try {
      console.log(selectedStatus, remarks)
      // showToast("success", "Status updated successfully");
    } catch (error) {
      // const errorMessage = handleApiError(error);
      // showToast("error", errorMessage);
    }
  };

  const formatDateTime = (isoDateStr?: string): string => {
    if (!isoDateStr) return "-";

    const date = new Date(isoDateStr);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');

    return `${dd}-${mm}-${yyyy}, ${hh}:${min}`;
  };



  return (

    <Fragment>
      <div className="cover-image">

        <div className="page loginbg">

          <div
            className="page-single"
            onClick={() => Switcherdatacustam.Swichermainrightremove()}
          >
            <div className="container">
              <Row>
                <Col
                  xl={12}
                  lg={12}
                  xs={12}
                  className="card justify-content-center mx-auto"
                >
                  <div className="card-sigin p-3">


                    <table className="w-100">
                      <tr>
                        <td className="text-center" colSpan={2}>
                          <h3 className="mb-0">Credit Bricks PVt Ltd</h3>
                          <strong>Registration Number : BSE/01/02/45  </strong>
                          <h5>Flat Resale</h5>
                        </td>
                      </tr>

                    </table>
                    <Row>
                      <Col sm={12}>
                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-14 tx-dark tx-medium mg-b-10">Basic Information</h5>
                            <Row>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Society</Form.Label>
                                <p className="mb-0">{initialVals?.society?.societyName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Property</Form.Label>
                                <p className="mb-0">{initialVals?.property?.propertyName || "-"}</p>
                              </Col>
                              <Col sm={12} className='mb-0'>
                                <h5 className="main-content-label mt-3 tx-14 tx-dark tx-medium mg-b-10">To share your payment receipt, kindly click on the "Yes" option</h5>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Share Transfer Documents Submitted</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Do you currently process the original share
                                certificate?</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Is there an existing home loan on your
                                property?</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Have you fully settled your home loan?</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>


                              <Col sm={4} className='mb-0'>
                                <Form.Label>Share Transfer Premium Paid</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Share Transfer Fees Paid</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Membership Fee Paid</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Entrance Fee Paid</Form.Label>
                                <p className="mb-0">Yes</p>
                              </Col>

                              <Col sm={4} className='mb-0'>
                                <Form.Label>Other Charges Paid</Form.Label>
                                <p className="mb-0">Yes, cross circular 1505</p>
                              </Col>


                            </Row>
                          </Card.Body>
                        </Card>

                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
<h5 className="card-title main-content-label tx-14 tx-dark tx-medium mg-b-10">Joint Holder</h5>
                            <Row>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Joint Holder</Form.Label>
                                <p className='tx-14  mb-0'>Yes</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Owner Name (As per Agreement)</Form.Label>
                                <p className='tx-14  mb-0'>- </p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Co-owner Name (As per Agreement)
                                </Form.Label>
                                <p className='tx-14  mb-0'>-</p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Flat Registration ID</Form.Label>
                                <p className='tx-14  mb-0'>- </p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Flat Registration Copy</Form.Label>
                                <p className='tx-14 mb-0'><Link to={``} target="_blank" className="text-info">flatresale.pdf</Link></p>
                              </Col>

                            </Row>
                          </Card.Body>
                        </Card>

                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Documents</h5>
                            <Row>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Sale Agreement Copy</Form.Label>
                                <p className='tx-14 mb-0'>Yes</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Flat Registration Certificate</Form.Label>
                                <p className='tx-14 mb-0'>Yes </p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Home Loan Sanction Letter</Form.Label>
                                <p className='tx-14 mb-0'>Yes</p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Old Owner Home Loan Closure Letter</Form.Label>
                                <p className='tx-14 mb-0'>Yes </p>
                              </Col>


                            </Row>
                          </Card.Body>
                        </Card>
                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-15 tx-dark tx-medium mg-b-10">Approval Details and Status</h5>

                            <Row>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Society</Form.Label>
                                <p className='tx-14 mb-0'>-</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Tower</Form.Label>
                                <p className='tx-14 mb-0'>Tower A </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Wing</Form.Label>
                                <p className='tx-14 mb-0'>Wing A </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Property</Form.Label>
                                <p className='tx-14 mb-0'>A101 </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Approver Name</Form.Label>
                                <p className='tx-14 mb-0'>Sandeep Singh </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Approver Number</Form.Label>
                                <p className='tx-14 mb-0'>9876543212 </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Designation</Form.Label>
                                <p className='tx-14 mb-0'>Secretary </p>
                              </Col>


                              <Col sm={3} className='mb-0'>
                                <Form.Label>Application Type</Form.Label>
                                <p className='tx-14 mb-0'>Gate Pass </p>
                              </Col>

                              <Col xl={12} className="pt-2">
                                <Form.Label className='float-start tx-bold tx-15 text-primary'>Update Status</Form.Label>
                                <Dropdown className='profile-user border-0'>
                                  <Dropdown.Toggle variant="">
                                    {/* <strong className="text-success">Approve</strong> */}
                                    <strong className={
                                      selectedStatus === 'Approve' ? 'text-success' :
                                        selectedStatus === 'Decline' ? 'text-danger' :
                                          'text-warning'
                                    }>
                                      {selectedStatus}
                                    </strong>
                                  </Dropdown.Toggle>
                                  {/* <Dropdown.Menu>
                                    <Dropdown.Item className="dropdown-item text-success" href="/">Approve </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item text-danger" href="/">Reject </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item" href="/">On Hold </Dropdown.Item>
                                  </Dropdown.Menu> */}
                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setSelectedStatus("Approve")} className="dropdown-item text-success">Approve</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedStatus("Decline")} className="dropdown-item text-danger">Decline</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setSelectedStatus("On Hold")} >On Hold</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                                <p className="mb-0 mt-2">Remarks</p>
                                <textarea className='form-control' placeholder='Remarks' value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
                              </Col>
                              <Col sm={12} className="text-end pt-3">
                                <Button type='button' className='btn btn-primary ms-2' onClick={handleSaveStatus}>Save</Button>
                                   <Button type='button' className='btn btn-info'>Print</Button>
                              </Col>
                            </Row>



                          </Card.Body>
                        </Card>

                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Terms & Conditions</h5>
                            <Row>

                              <Col sm={12} className='mb-0'>
                                <p className='tx-12 mb-0 text-justify'>Interest will be charged at 1.75% p.m. after the due date.
                                  The cheque should be drawn in favor of CreditBricks Society.
                                  No claim in respect of this bill will be entertained unless notified in writing within 10 days from the date of this bill.
                                  If the dues are not cleared within 90 days, then the member shall be termed as a defaulter, and appropriate action will be taken by the society against the defaulters as per the Bylaws
                                  In case of no response on the payment for a prolonged period the membership from the society can be terminated and expulsion procedure can be initiated.
                                  The penalty charges do not create any right in your favor.
                                  Society reserves the right to enhance the penalty in case of continuing default and misuse.</p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>

                      <Col xl={12}>


                      </Col>
                      <p className='ps-3 text-end w-100'> Powered by <img src={imagesData('logo')} className="wd-100p ms-1" /></p>
                    </Row>

                  </div>
                </Col>
              </Row>

            </div>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

FlatResale.propTypes = {};

FlatResale.defaultProps = {};

export default FlatResale;
