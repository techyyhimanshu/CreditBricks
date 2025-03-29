
import { Button, Card, CardBody, Col, Modal, Row } from "react-bootstrap";

import 'suneditor/dist/css/suneditor.min.css';


interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    initialVals: any;

}


const AnnouncementViewModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose }) => {



    return (
        <>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>Announcement Details</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
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
                                            <p className='mb-0 text-muted'>Announcement Name </p>
                                            <p className='tx-15 tx-semibold'>{initialVals?.announcementName || "N/A"}</p>
                                            <p className='mb-0 text-muted'>Message</p>
                                            <p className='tx-14 mb-2' dangerouslySetInnerHTML={{ __html: initialVals?.message || "N/A" }} />
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

                                        <Col xl={12}>
                                            {initialVals?.announcementFilePath ? (
                                                (() => {
                                                    const filePath = initialVals?.announcementFilePath;
                                                    const fileExtension = filePath.split('.').pop().toLowerCase();

                                                    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'].includes(fileExtension);

                                                    if (isImage) {
                                                        return (
                                                            <>
                                                                <img
                                                                    alt="Attachment"
                                                                    className="w-100 rounded-2"
                                                                    crossOrigin="anonymous"
                                                                    style={{ cursor: 'pointer' }}
                                                                    src={import.meta.env.VITE_STATIC_PATH + filePath}
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
                                                                        const isPDF = fileExtension === 'pdf';
                                                                        const isExcel = fileExtension === 'xls' || fileExtension === 'xlsx';

                                                                        if (isPDF || isExcel) {
                                                                            window.open(fileUrl, '_blank');
                                                                        } else {
                                                                            const link = document.createElement('a');
                                                                            link.href = fileUrl;
                                                                            link.download = filePath.split('/').pop();
                                                                            link.click();
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

export default AnnouncementViewModal;