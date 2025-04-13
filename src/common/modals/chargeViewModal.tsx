
import { Button, Card, CardBody, Col,  Modal, Row } from "react-bootstrap";

import 'suneditor/dist/css/suneditor.min.css';


interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    initialVals: any;

}


const ChargeViewModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose }) => {
   
    

    return (
        <>
            <Modal show={show} >
                <Modal.Header>
                  <Modal.Title>Charge Details</Modal.Title>
                  <Button variant="" className="btn btn-close"  onClick={(event) => { event.preventDefault(), onClose() }}>
                    x
                  </Button>
                </Modal.Header>
                <Modal.Body className='bg-light'>
                  <Row>
                    <Col xl={12}>
                      <Card className='box-shadow'>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Charge Name</p>
                              <p className='tx-16 tx-semibold'>{initialVals?.chargeName || "N/A"}</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Charge Type</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.chargeType || "N/A"}</p>
                            </Col>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Charge Master Type</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.chargeMasterType || "N/A"}</p>
                            </Col>
                            {
                                initialVals.society&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Society</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.society?.societyName || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.tower&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Tower</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.tower?.towerName || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.wing&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Wing</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.wing?.wingName || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.property&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Property</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.property?.propertyName || "N/A"}</p>
                              </Col>
                            }
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Billing Type</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.billingType || "N/A"}</p>
                            </Col>
                            {
                                initialVals.amount&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Amount</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.amount || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.narration&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Narration</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.narration || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.psfRate&&<Col xl={6}>
                                <p className='mb-0 text-muted'>PSF Rate</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.psfRate || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.billingFrequency&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Billing Frequency</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.billingFrequency || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.interestAppicable&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Interest Applicable</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.interestAppicable || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.rateOfInterest&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Interest Rate</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.rateOfInterest || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.gst&&<Col xl={6}>
                                <p className='mb-0 text-muted'>GST</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.gst || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.dueDate&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Due Date</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.dueDate || "N/A"}</p>
                              </Col>
                            }
                            {
                                initialVals.interestStartDate&&<Col xl={6}>
                                <p className='mb-0 text-muted'>Interest Start Date</p>
                                <p className='tx-15 tx-semibold'>{initialVals?.interestStartDate || "N/A"}</p>
                              </Col>
                            }
                          </Row>
                        </CardBody>
                        <CardBody className='p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Satrt Date</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.startDate || "N/A"}</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>End Date</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.endDate || "N/A"}</p>
                            </Col>
                          </Row>

                        </CardBody>

                      </Card>
                      
                    </Col>
                  </Row>
                </Modal.Body>

              </Modal>
        </>
    )
}

export default ChargeViewModal;