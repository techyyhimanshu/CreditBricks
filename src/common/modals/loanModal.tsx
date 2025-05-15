import { Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import 'suneditor/dist/css/suneditor.min.css';
// import { getAllSocietyApi } from '../../api/society-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { showToast } from '../services/toastServices';
// import { getWingPropertiesApi } from '../../api/property-api';
// import { getTowerWingsApi } from '../../api/wing-api';
// import { getSocietyTowersApi } from '../../api/tower-api';
import { getAllPropertyApi } from '../../api/property-api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ModalProps {
    show: boolean;
    onSave: (values: any) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;

}


const LoanModal: React.FC<ModalProps> = ({ show, initialVals, onClose, onSave, editing }) => {
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    // const [societyData, setSocietyData] = useState<any[]>([]);
    // const [towerOptions, setTowerOptions] = useState<any[]>([]);
    // const [wingOptions, setWingOptions] = useState<any[]>([]);
    const { society } = useSelector((state: RootState) => state.auth)

    const loantype = [
        { value: "home", label: "Home" },
        { value: "vehicle", label: "Vehicle" },
    ]

    const loanperiod = [
        { value: "5", label: "5yrs" },
        { value: "10", label: "10yrs" },
        { value: "15", label: "15yrs" },
        { value: "20", label: "20yrs" },
        { value: "25", label: "25yrs" },
        { value: "30", label: "30yrs" },
    ]

    // const property = [
    //     { value: "1", label: "A101" },
    //     { value: "2", label: "A102" },
    // ]

    const member = [
        { value: "owner", label: "Owner" },
        { value: "tenant", label: "Tenant" },
    ]


    useEffect(() => {
        // fetchSocietiesForDropDown()
        fetchPropertiesForDropDown()
    }, [society])

    // const fetchSocietiesForDropDown = async () => {
    //     try {
    //         const response = await getAllSocietyApi();
    //         const formattedData = response.data.data.map((item: any) => ({
    //             value: item.societyIdentifier,
    //             label: item.societyName,
    //         }));
    //         setSocietyData(formattedData);
    //     } catch (error) {
    //         const errorMessage = handleApiError(error)
    //         showToast("error", errorMessage)
    //     }
    // }


    const fetchPropertiesForDropDown = async () => {
        try {
            const response = await getAllPropertyApi(undefined,society.value);
            const formattedData = response.data.data.map((item: any) => ({
                value: item.propertyIdentifier,
                label: item.propertyName ? item.propertyName : item.flatNumber,
            }));
            setPropertiesForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    // const fetchWingsForDropDown = async (society: any) => {
    //     try {
    //         const response = await getTowerWingsApi(society.value);
    //         const formattedData = response.data.data.map((item: any) => ({
    //             value: item.wingIdentifier,
    //             label: item.wingName,
    //         }));

    //         setWingOptions(formattedData);
    //     } catch (error) {
    //         const errorMessage = handleApiError(error)
    //         showToast("error", errorMessage)
    //     }
    // }

    // const fetchTowersForDropDown = async (society: any) => {
    //     try {
    //         const response = await getSocietyTowersApi(society.value);
    //         const formattedData = response.data.data.map((item: any) => ({
    //             value: item.towerIdentifier,
    //             label: item.towerName,
    //         }));
    //         setTowerOptions(formattedData);
    //     } catch (error) {
    //         const errorMessage = handleApiError(error)
    //         showToast("error", errorMessage)
    //     }
    // }

    const handleSubmit = async (values: any) => {
        try {
            if (onSave) {
                onSave(values)
                onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Modal show={show} size="lg">
                <Modal.Header>
                    <Modal.Title>Loan</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues={{
                        // society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
                        property: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        // wing: initialVals ? { label: initialVals.wingName, value: initialVals.wingIdentifier } : { label: "", value: "" },
                        // tower: initialVals ? { label: initialVals.towerName, value: initialVals.towerIdentifier } : { label: "", value: "" },
                        type: initialVals ? { label: initialVals.type, value: initialVals.type } : { label: "", value: "" },
                        memberType: initialVals ? { label: initialVals.memberType, value: initialVals.memberType } : { label: "", value: "" },
                        period: initialVals ? { label: initialVals.period, value: initialVals.period } : { label: "", value: "" },
                        fullName: initialVals?.fullName || "",
                        loanNumber: initialVals?.loanNumber || "",
                        amount: initialVals?.amount || "",
                        monthlyEmi: initialVals?.monthlyEmi || "",
                        startDate: initialVals?.startDate || "",
                        endDate: initialVals?.endDate || "",
                        bankName: initialVals?.bankName || "",
                        bankAddress: initialVals?.bankAddress || "",
                        file: null,
                        fileName: initialVals?.loanFilePath || null,
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, setFieldValue }) => {
                        // useEffect(() => {
                        //     if (values.society && values.society.value) {
                        //         fetchTowersForDropDown(values.society);
                        //     }
                        // }, [values.society]);

                        // useEffect(() => {
                        //     if (values.tower && values.tower.value) {
                        //         fetchWingsForDropDown(values.tower);
                        //     }
                        // }, [values.tower]);

                        // useEffect(() => {
                        //     if (values.wing && values.wing.value) {
                        //         fetchPropertiesForDropDown(values.wing);
                        //     }
                        // }, [values.wing]);

                        const getFileExtension = (fileName: string) => {
                            if (!fileName) {
                                return '';
                            }
                            return fileName.split(".").pop()?.toLowerCase() || '';
                        };
                        const getFileName = (fileName: string) => {
                            if (!fileName) {
                                return '';
                            }
                            return fileName?.split("/").pop() || '';
                        };
                        return (
                            <FormikForm>
                                <Modal.Body className='pt-2'>
                                    <Row>
                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Property<span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    options={propertiesForDropDown}
                                                    name='property'
                                                    value={values.property}
                                                    onChange={(selected) => {
                                                        setFieldValue("property", selected);
                                                    }}
                                                    placeholder="Select property"
                                                    classNamePrefix="Select2"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Member Type<span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    options={member}
                                                    name='memberType'
                                                    value={values.memberType}
                                                    onChange={(selected) => {
                                                        setFieldValue("memberType", selected);
                                                    }}
                                                    placeholder="Select member"
                                                    classNamePrefix="Select2"

                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Name<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="text" name="fullName"
                                                    value={values.fullName}
                                                    onChange={handleChange} className='form-control' placeholder='Name'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Loan<span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    options={loantype}
                                                    name='type'
                                                    value={values.type}
                                                    onChange={(selected) => {
                                                        setFieldValue("type", selected);
                                                    }}
                                                    placeholder="Select type"
                                                    classNamePrefix="Select2"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Loan Number<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="text" name="loanNumber"
                                                    value={values.loanNumber}
                                                    onChange={handleChange} className='form-control' placeholder='Loan number'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Loan Period<span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    options={loanperiod}
                                                    name='period'
                                                    value={values.period}
                                                    onChange={(selected) => {
                                                        setFieldValue("period", selected);
                                                    }}
                                                    placeholder="Search period"
                                                    classNamePrefix="Select2"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Loan Amount<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="text" name="amount"
                                                    value={values.amount}
                                                    onChange={handleChange} className='form-control' placeholder='Loan amount'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Start Date<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" name="startDate"
                                                    value={values.startDate}
                                                    onChange={handleChange} className='form-control'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>End Date<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" name="endDate"
                                                    value={values.endDate}
                                                    onChange={handleChange} className='form-control'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Monthly EMI<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="text" name="monthlyEmi"
                                                    value={values.monthlyEmi}
                                                    onChange={handleChange} className='form-control' placeholder='EMI'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Bank Name<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="text" name="bankName"
                                                    value={values.bankName}
                                                    onChange={handleChange} className='form-control' placeholder='Bank name'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Bank Address</Form.Label>
                                                <Form.Control type="text" name="bankAddress"
                                                    value={values.bankAddress}
                                                    onChange={handleChange} className='form-control' placeholder='Address'></Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Loan Scan Copy
                                                    <small className='float-end'>Upload Size: Max 2MB</small>
                                                </Form.Label>
                                                <Form.Control type="file" name="file"
                                                    onChange={(event: any) =>
                                                        setFieldValue("file", event.currentTarget.files[0])
                                                    } className='form-control' placeholder=''></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        {values.fileName && (
                                            <p
                                                className="text-center pt-2"
                                                style={{ cursor: "pointer", color: "blue" }}
                                                onClick={() => {
                                                    const fileExtension = getFileExtension(values.fileName);


                                                    if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                        window.open(import.meta.env.VITE_STATIC_PATH + values.fileName, "_blank");
                                                    } else {
                                                        const link = document.createElement("a");
                                                        link.href = import.meta.env.VITE_STATIC_PATH + values.fileName;
                                                        link.download = values.fileName;
                                                        link.click();
                                                    }
                                                }}
                                            >
                                                {getFileName(values.fileName)}
                                            </p>
                                        )}

                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit'>
                                        {editing ? "Update" : "Save"}
                                    </Button>

                                </Modal.Footer>
                            </FormikForm>
                        )
                    }}
                </Formik>

            </Modal >
        </>
    )
}

export default LoanModal;