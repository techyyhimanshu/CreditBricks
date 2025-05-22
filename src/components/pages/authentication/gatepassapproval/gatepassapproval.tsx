import { Fragment, useState } from "react";
import { Button, Col, Form, Row, Card, Dropdown } from 'react-bootstrap';
import * as Switcherdatacustam from "../../../../common/switcherdatacustam";
import { imagesData } from '../../../../common/commonimages';

interface ProductModalProps {
  initialVals?: any;
}

const GatePassApproval: React.FC<ProductModalProps> = ({ initialVals }) => {
  const [selectedStatus, setSelectedStatus] = useState("Approve");
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
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
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
                          <h3 className="mb-0">{initialVals?.society?.societyName || "-"}</h3>
                          <strong>Registration Number : {initialVals?.society?.registrationNumber || "-"}  </strong>
                          <h5>{initialVals?.applicationType}</h5>
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
                                <p className='mb-0'>{initialVals?.society?.societyName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Property</Form.Label>
                                <p className='mb-0'>{initialVals?.property?.propertyName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Gate Type</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.gateType || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Member</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.gateType || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Category</Form.Label>
                                <p className='tx-14  mb-0'>{initialVals?.category || "-"}</p>
                              </Col>
                              <Col sm={3} className='mb-0'>
                                <Form.Label>Sub Category</Form.Label>
                                <p className='tx-14  mb-0'>{initialVals?.subCategory || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Tenant Name</Form.Label>
                                <p className='tx-14  mb-0'>{initialVals?.tenantName || "-"}</p>
                              </Col>




                              <Col sm={3} className='mb-0'>
                                <Form.Label>Gate Pass Number</Form.Label>
                                <p className='tx-14  mb-0'>{initialVals?.gateType || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Entry Date & Time</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.entryDateTime || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Exit Date & Time</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.exitDateTime || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Outstanding</Form.Label>
                                <p className='tx-14 tx-bold mb-0'>{initialVals?.outstandingAmount || "-"}</p>
                              </Col>

                            </Row>
                          </Card.Body>
                        </Card>


                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title  main-content-label tx-14 tx-dark tx-medium mg-b-10">Vehicle and Driver Details</h5>
                            <Row>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Driver Name</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.driverName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Driver Number</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.driverMobileNumber || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Vehicle Number</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.vehicleNumber || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Vehicle Model</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.vehicleModel || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Vehicle Nature</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.vehicleNature || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Vehicle Type</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.vehicleType || "-"}</p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>


                        <Card className='box-shadow border border-primary'>
                          <Card.Body>
                            <h5 className="card-title main-content-label tx-dark tx-14 tx-medium mg-b-10">Contact Person Details</h5>
                            <Row>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Contact Person Name</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.contactPersonName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Contact Person Number</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.contactPersonNumber || "-"}</p>
                              </Col>

                              <Col sm={6} className='mb-0'>
                                <Form.Label>Remarks</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals?.remarks || "-"}</p>
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
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.parentSocietyIdentifier || "-" : initialVals?.society?.societyName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Tower</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.towerIdentifier || "-" : initialVals?.tower?.societyName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Wing</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.wingIdentifier || "-" : initialVals?.wing?.societyName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Property</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.propertyIdentifier || "-" : initialVals?.property?.societyName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Approver Name</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.fullName || "-" : initialVals?.committeeMember?.fullName || "-"}</p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Approver Number</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.contactNumber || "-" : initialVals?.committeeMember?.contactNumber || "-"} </p>
                              </Col>

                              <Col sm={3} className='mb-0'>
                                <Form.Label>Designation</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.designation || "-" : initialVals?.committeeMember?.designation || "-"} </p>
                              </Col>


                              <Col sm={3} className='mb-0'>
                                <Form.Label>Application Type</Form.Label>
                                <p className='tx-14 mb-0'>{initialVals.isParent ? initialVals?.parentCommitteeMember?.applicationType?.join(", ") || "-" : initialVals?.committeeMember?.applicationType?.join(", ") || "-"}</p>
                              </Col>

                              <Col xl={12} className="pt-2">
                              <Form.Label className='float-start tx-bold tx-15 text-primary'>Update Status</Form.Label>
                              <Dropdown className='profile-user border-0'>
                                <Dropdown.Toggle variant="">
                                  <strong className="text-danger">Decline</strong>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item className="dropdown-item text-success" href="/">Approve </Dropdown.Item>
                                  <Dropdown.Item className="dropdown-item text-danger" href="/">Decline </Dropdown.Item>
                                  <Dropdown.Item className="dropdown-item" href="/">On Hold </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <p className="mb-0 mt-2">Remarks</p>
                              <textarea className='form-control' placeholder='Remarks'></textarea>
                            </Col>
                            <Col sm={12} className="text-end pt-3">
                              <Button type='button' className='btn btn-primary ms-2'>Save</Button>
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
                                <div
                                  className="tx-12 mb-0 text-justify"
                                  dangerouslySetInnerHTML={{ __html: initialVals?.termCondition?.termCondition||"-" }}
                                />
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
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

GatePassApproval.propTypes = {};

GatePassApproval.defaultProps = {};

export default GatePassApproval;
