import { Button, Col, Modal, } from "react-bootstrap";


interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    initialVals?: any;
}

const TermsAndConditionModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, }) => {


    return (
        <>
            <Modal show={show} size="xl" centered>
                <Modal.Header>
                    <Modal.Title>Terms & Conditions</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Col xl={12} className='mb-1 tx-12 text-justify' dangerouslySetInnerHTML={{ __html: initialVals }}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
                        Close
                    </Button>

                </Modal.Footer>

            </Modal >

        </>
    )
}
export default TermsAndConditionModal;