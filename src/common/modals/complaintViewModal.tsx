
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik } from 'formik';
import Select from "react-select";

import 'suneditor/dist/css/suneditor.min.css';


interface ProductModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (values: any,id:string) => void;
    initialVals: any;

}


const ComplaintViewModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, onSave }) => {

    const statusChangeOptions = [
        { value: "in-progress", label: "In-Progress" },
        { value: "pending", label: "Pending" },
        { value: "verified", label: "Verified" },
        { value: "completed", label: "Completed" },
    ]

    const handleSubmit=(values:any,id:string)=>{
        if(onSave){
            onSave(values,id)
        }
    }

    return (
        <>
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>Complaint Details</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Modal.Body>

                    <Row>
                        <Col xl={3}>
                            {initialVals?.issueFilePath ? <img
                                alt="" className='w-100 rounded-2'
                                crossOrigin="anonymous"
                                src={import.meta.env.VITE_STATIC_PATH + initialVals?.issueFilePath}
                                style={{ cursor: 'pointer' }}
                                onClick={() => window.open(import.meta.env.VITE_STATIC_PATH + initialVals?.issueFilePath, '_blank')}
                            /> : <p className='w-100 rounded-2' style={{ height: "100px", backgroundColor: "lightgray", textAlign: "center", verticalAlign: "middle", lineHeight: "100px" }}>No image</p>}
                        </Col>
                        <Col xl={8} className='p-0'>
                            <p className='tx-16 mb-0 mt-2 tx-semibold'>Complaint ID : {initialVals?.id}</p>
                            <p className='mb-3 tx-16 '>{initialVals?.propertyName}</p>
                            <span className='text-muted'><i className='bi bi-calendar-fill'></i>&nbsp; {initialVals?.createdAt}</span>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xl={6}>
                            <p className='mb-0 text-muted'>Complaint Category</p>
                            <p className='tx-15 tx-semibold'>{initialVals?.categoryName}s</p>
                        </Col>
                        <Col xl={6} className='text-end'>
                            <p className='mb-0 text-muted'>Priority</p>
                            {initialVals?.priority === "high" ? <p className='tx-15 text-danger tx-semibold'>High</p> :
                                initialVals?.priority === "medium" ? <p className='tx-15 text-warning tx-semibold'>Medium</p> :
                                    <p className='tx-15 text-success tx-semibold'>Low</p>}


                        </Col>
                        <Col xl={12}>
                            <p className='mb-0'>{initialVals?.description}</p>

                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col xl={6}>
                            <p className="mb-0 text-muted">Assign To</p>
                            <p className="tx-15 mb-1 tx-semibold">
                                {initialVals?.contactPersonName}
                            </p>
                            <p>{initialVals?.contactPersonNumber}</p>
                        </Col>

                    </Row>
                    <hr className='mt-2 mb-1' />
                    <Row>
                        <Col xl={12}>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    status: { label: initialVals?.status || '', value: initialVals?.status || '' },
                                    remarks: initialVals?.remarks || '',
                                }}
                                onSubmit={(values) => handleSubmit(values, initialVals?.id)}
                            >
                                {({ setFieldValue, values, submitForm }) => (
                                    <Form>
                                        <Form.Group className="form-group mb-1">
                                            <Row>
                                                <Col xl={3}>
                                                    <Form.Label className='float-start'>Update Status</Form.Label>
                                                </Col>
                                                <Col xl={12}>
                                                    <Select
                                                        options={statusChangeOptions}
                                                        value={values.status}
                                                        name="status"
                                                        onChange={(selected) => setFieldValue('status', selected)}
                                                        placeholder="Select status"
                                                        classNamePrefix="Select2"
                                                        className='profile-user border-0'
                                                    />
                                                </Col>
                                            </Row>


                                        </Form.Group>



                                        <Form.Label className='float-start'>Complaint Remarks</Form.Label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Remarks"
                                            name="remarks"
                                            value={values.remarks}
                                            onChange={(e) => setFieldValue('remarks', e.target.value)}
                                        />


                                        <span className='float-end mt-3'>
                                            <Button type="button" className="btn btn-default ms-2" onClick={(event) => { event.preventDefault(), onClose() }}>
                                                Close
                                            </Button>
                                            <Button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => submitForm()}
                                            >
                                                Save
                                            </Button>
                                        </span>
                                    </Form>
                                )}
                            </Formik>
                        </Col>

                    </Row>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ComplaintViewModal;