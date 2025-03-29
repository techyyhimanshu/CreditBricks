
import { Button, Card, CardBody, Col,  Modal, Row } from "react-bootstrap";

import 'suneditor/dist/css/suneditor.min.css';


interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    initialVals: any;

}


const NoticeViewModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose }) => {
   
    

    return (
        <>
            <Modal show={show} >
                <Modal.Header>
                  <Modal.Title>Notice Details</Modal.Title>
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
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Society</p>
                              <p className='tx-16 tx-semibold'>{initialVals?.societyName || "N/A"}</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Notice Type</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.noticeType || "N/A"}</p>
                            </Col>
                          </Row>
                        </CardBody>
                        <CardBody className='border-bottom p-2'>
                          <Row>
                            <Col xl={12}>
                              <p className='mb-0 text-muted'>Notice Subject
                                <span className='cursor float-end'><span className='text-success'>12 <i className="fa fa-thumbs-up"></i></span> <span className="ms-2 text-muted">5 <i className="fa fa-thumbs-down"></i></span> </span>
                              </p>
                              <p className='tx-15 tx-semibold'>{initialVals?.noticeSubject || "N/A"}</p>
                              <p className='mb-0 text-muted'>Message</p>
                              {/* <p className='tx-14'>{initialVals?.message||"N/A"}</p> */}
                              <p className='tx-14' dangerouslySetInnerHTML={{ __html: initialVals?.message || "N/A" }} />
                            </Col>

                          </Row>
                        </CardBody>
                        <CardBody className='p-2'>
                          <Row>
                            <Col xl={6}>
                              <p className='mb-0 text-muted'>Satrt Date</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.startDate || "N/A"}</p>
                            </Col>
                            <Col xl={6} className='text-end'>
                              <p className='mb-0 text-muted'>Valid Date</p>
                              <p className='tx-15 tx-semibold'>{initialVals?.validDate || "N/A"}</p>
                            </Col>
                          </Row>

                        </CardBody>

                      </Card>
                      <Card className='box-shadow'>
                        <CardBody className='p-2'>
                          <p className='tx-15 pb-1 pt-1 border-bottom tx-semibold'>Attachments</p>
                          <Row>
                            {/* <Col xl={12}>
                              {initialVals?.noticeFilePath ? <img
                                alt="" className='w-100 rounded-2'
                                crossOrigin="anonymous"
                                src={import.meta.env.VITE_STATIC_PATH + initialVals?.noticeFilePath}
                              /> : <p className='w-100 rounded-2' style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>No image</p>}
                            </Col> */}
                            <Col xl={12}>
                              {initialVals?.noticeFilePath ? (
                                // Determine the file extension
                                (() => {
                                  const filePath = initialVals?.noticeFilePath;
                                  const fileExtension = filePath.split('.').pop().toLowerCase();

                                  // Check if the file is an image
                                  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(fileExtension);

                                  if (isImage) {
                                    // If it's an image, show the image tag
                                    return (
                                      <>
                                        <img
                                          alt="Attachment"
                                          className="w-100 rounded-2"
                                          crossOrigin="anonymous"
                                          src={import.meta.env.VITE_STATIC_PATH + filePath}
                                          style={{ cursor: 'pointer' }}
                                          onClick={() => window.open(import.meta.env.VITE_STATIC_PATH + filePath, '_blank')}
                                        />
                                        <p className="text-center pt-2">{filePath.split('/').pop()}</p>
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        <p
                                          className="text-center pt-2"
                                          style={{ cursor: 'pointer', color: 'blue' }}
                                          onClick={() => {
                                            const fileUrl = import.meta.env.VITE_STATIC_PATH + filePath;
                                            // Check file extension for handling download or open in new tab
                                            const isPDF = fileExtension === 'pdf';
                                            const isExcel = fileExtension === 'xls' || fileExtension === 'xlsx';

                                            if (isPDF || isExcel) {
                                              window.open(fileUrl, '_blank'); // Open in new tab
                                            } else {
                                              // Trigger file download if it's not PDF or Excel
                                              const link = document.createElement('a');
                                              link.href = fileUrl;
                                              link.download = filePath.split('/').pop(); // Name the downloaded file
                                              link.click(); // Trigger the download
                                            }
                                          }}
                                        >
                                          {filePath.split('/').pop()}
                                        </p>
                                      </>
                                    );
                                  }
                                })()
                              ) : (
                                <p className="w-100 rounded-2" style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>
                                  No Attachment
                                </p>
                              )}
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

export default NoticeViewModal;