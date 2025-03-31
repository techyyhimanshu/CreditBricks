
import { Button, Card, CardBody, Col, Modal, Row } from "react-bootstrap";

import 'suneditor/dist/css/suneditor.min.css';


interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    initialVals: any;

}


const LoanViewModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose }) => {



    return (
        <>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>Notice Details</Modal.Title>
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
                                        <Col xl={6}>
                                            <p className='mb-0 text-muted'>Loan Number</p>
                                            <p className='tx-16 tx-semibold'>{initialVals?.loanNumber || "N/A"}</p>
                                        </Col>
                                        <Col xl={6} className='text-end'>
                                            <p className='mb-0 text-muted'>Property</p>
                                            <p className='tx-15 tx-semibold'>{initialVals?.propertyName || "N/A"}</p>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardBody className='border-bottom p-2'>
                                    <Row>
                                        <Col xl={6}>
                                            <p className='mb-0 text-muted'>Name</p>
                                            <p className='tx-15 tx-semibold'>{initialVals?.fullName || "N/A"}</p>
                                        </Col>
                                        <Col xl={6} className='text-end'>
                                            <p className='mb-0 text-muted'>Member</p>
                                            <p className='tx-15 tx-semibold'>{initialVals?.memberType || "N/A"}</p>

                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardBody className='border-bottom p-2'>
                                    <Row>
                                        <Col xl={6}>
                                            <p className='mb-0 text-muted'>Loan Period</p>
                                            <p className='tx-15 tx-semibold'>{`${initialVals?.period} yrs` || "N/A"}</p>
                                            <p className='mb-0 text-muted'>Start Date</p>
                                            <p className='tx-15 tx-semibold'>{initialVals?.startDate || "N/A"}</p>
                                        </Col>
                                        <Col xl={6} className='text-end'>
                                            <p className='mb-0 text-muted'>Loan Amount</p>
                                            <p className='tx-15 tx-semibold text-primary'>{`₹ ${initialVals?.amount}` || "N/A"}</p>
                                            <p className='mb-0 text-muted'>End Date</p>
                                            <p className='tx-15 tx-semibold'>{initialVals?.endDate || "N/A"}</p>
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardBody className='border-bottom p-2'>
                                    <p className='mb-0 text-muted'>Monthly EMI</p>
                                    <p className='tx-15 tx-semibold'>{`₹ ${initialVals?.monthlyEmi}` || "N/A"}</p>
                                </CardBody>
                                <CardBody className='p-2'>
                                    <p className='mb-0 text-muted'>Bank Details</p>
                                    <p className='tx-15 mb-0 tx-semibold'>{initialVals?.bankName || "N/A"}</p>
                                    <p className='mb-0 text-muted'>{initialVals?.bankAddress || "N/A"}</p>
                                </CardBody>
                            </Card>
                            <Card className='box-shadow'>
                                <CardBody className='p-2'>
                                    <p className='tx-15 pb-1 pt-1 border-bottom tx-semibold'>Documents</p>
                                    <Row>
                                        {/* <Col xl={2}>
                                            <img
                                                alt="" className='w-100'
                                                src={imagesData('pdficon')}
                                            />
                                        </Col>
                                        <Col xl={9} className='p-0'>
                                            <p className='tx-14 mb-0 mt-2 tx-semibold'>Loan Document Copy</p>
                                            <Link to={``} className='text-info'>Download</Link>
                                        </Col> */}
                                        <Col xl={12}>
                                            {initialVals?.loanFilePath ? (
                                                // Determine the file extension
                                                (() => {
                                                    const filePath = initialVals?.loanFilePath;
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

export default LoanViewModal;