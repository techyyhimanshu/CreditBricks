import { ErrorMessage, Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi } from '../../api/society-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { showToast } from '../services/toastServices';
import { getWingPropertiesApi } from '../../api/property-api';
import { getTowerWingsApi } from '../../api/wing-api';
import { getSocietyTowersApi } from '../../api/tower-api';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import * as Yup from 'yup';

interface ProductModalProps {
    show: boolean;
    onSave: (values: any) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;

}

const selectFieldValidation = (fieldLabel: string) =>
    Yup.object()
        .nullable()
        .test(fieldLabel, `${fieldLabel} is required`, function (val: any) {

            if (!val || typeof val !== 'object') return false;

            if (typeof val.value === 'undefined' || val.value === null || val.value === '') return false;

            return true;
        });

const noticeValidationSchema = Yup.object().shape({
    society: selectFieldValidation("Society"),

    message: Yup.string()
        .required("Message is required"),

    file: Yup.mixed()
        .nullable()
        .test(
            "fileFormat",
            "Only PDF or image files (jpg, jpeg, png) are allowed",
            (value:any) => {
                if (!value) return true;
                const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
                return allowedTypes.includes(value.type);
            }
        )
});


const NoticeModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, onSave, editing }) => {
    const [societyData, setSocietyData] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    const [towerOptions, setTowerOptions] = useState<any[]>([]);
    const [wingOptions, setWingOptions] = useState<any[]>([]);
    const { society } = useSelector((state: RootState) => state.auth)

    const noticetype = [
        { value: "General Notice", label: "General Notice" },
    ]


    useEffect(() => {
        fetchSocietiesForDropDown()
    }, [])

    const fetchSocietiesForDropDown = async () => {
        try {
            const response = await getAllSocietyApi();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.societyIdentifier,
                label: item.societyName,
            }));
            setSocietyData(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }


    const fetchPropertiesForDropDown = async (society: any) => {
        try {
            const response = await getWingPropertiesApi(society.value);
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

    const fetchWingsForDropDown = async (society: any) => {
        try {
            const response = await getTowerWingsApi(society.value);
            const formattedData = response.data.data.map((item: any) => ({
                value: item.wingIdentifier,
                label: item.wingName,
            }));

            setWingOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchTowersForDropDown = async (society: any) => {
        try {
            const response = await getSocietyTowersApi(society.value);
            const formattedData = response.data.data.map((item: any) => ({
                value: item.towerIdentifier,
                label: item.towerName,
            }));
            setTowerOptions(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

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
                    <Modal.Title>Notices</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues={{
                        society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
                        property: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        wing: initialVals ? { label: initialVals.wingName, value: initialVals.wingIdentifier } : { label: "", value: "" },
                        tower: initialVals ? { label: initialVals.towerName, value: initialVals.towerIdentifier } : { label: "", value: "" },
                        noticeType: initialVals ? { label: initialVals.noticeType, value: initialVals.noticeType } : { label: "", value: "" },
                        subject: initialVals?.noticeSubject || "",
                        message: initialVals?.message || "",
                        startDate: initialVals?.startDate || "",
                        validDate: initialVals?.validDate || "",
                        file: null,
                        fileName: initialVals?.noticeFilePath || null,
                    }}
                    validationSchema={noticeValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, setFieldValue }) => {
                        useEffect(() => {
                            if (society) {
                                setFieldValue("society", society);
                                fetchTowersForDropDown(society);
                            }
                        }, [society]);
                        useEffect(() => {
                            if (values.society && values.society.value) {
                                fetchTowersForDropDown(values.society);
                            }
                        }, [values.society]);

                        useEffect(() => {
                            if (values.tower && values.tower.value) {
                                fetchWingsForDropDown(values.tower);
                            }
                        }, [values.tower]);

                        useEffect(() => {
                            if (values.wing && values.wing.value) {
                                fetchPropertiesForDropDown(values.wing);
                            }
                        }, [values.wing]);

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
                                                <Form.Label>Society <span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    options={societyData}
                                                    name='society'
                                                    placeholder="Select type"
                                                    classNamePrefix="Select2"
                                                    value={values.society}
                                                    onChange={(selected) => {
                                                        fetchTowersForDropDown(selected);
                                                        setFieldValue("tower", null);
                                                        setFieldValue("wing", null);
                                                        setFieldValue("property", null);
                                                        setFieldValue("society", selected);
                                                    }}
                                                    isDisabled
                                                />
                                                <ErrorMessage name="society" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Tower</Form.Label>
                                                <Select
                                                    options={towerOptions}
                                                    name='tower'
                                                    placeholder="Select type"
                                                    classNamePrefix="Select2"
                                                    value={values.tower}
                                                    onChange={(selected) => {
                                                        fetchWingsForDropDown(selected);
                                                        setFieldValue("wing", null);
                                                        setFieldValue("property", null);
                                                        setFieldValue("tower", selected);
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Wing</Form.Label>
                                                <Select
                                                    options={wingOptions}
                                                    name='wing'
                                                    placeholder="Select type"
                                                    classNamePrefix="Select2"
                                                    value={values.wing}
                                                    onChange={(selected) => {
                                                        fetchPropertiesForDropDown(selected);
                                                        setFieldValue("property", null);
                                                        setFieldValue("wing", selected);
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Property</Form.Label>
                                                <Select
                                                    options={propertiesForDropDown}
                                                    name='property'
                                                    placeholder="Select type"
                                                    classNamePrefix="Select2"
                                                    value={values.property}
                                                    onChange={(option) => setFieldValue("property", option)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Notice Type</Form.Label>
                                                <Select
                                                    options={noticetype}
                                                    name='noticeType'
                                                    placeholder="Select type"
                                                    classNamePrefix="Select2"
                                                    value={values.noticeType}
                                                    onChange={(option) => setFieldValue("noticeType", option)}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Notice Subject</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    className="form-control"
                                                    name="subject"
                                                    value={values.subject}
                                                    onChange={handleChange}
                                                    placeholder="Subject"
                                                />
                                                <ErrorMessage name="subject" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>
                                                    Message <span className="text-danger">*</span>
                                                </Form.Label>
                                                <SunEditor
                                                    defaultValue={values.message}
                                                    onChange={(content) => setFieldValue("message", content)}
                                                    name='message'
                                                />
                                                <ErrorMessage name="message" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Start Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="startDate"
                                                    value={values.startDate}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Valid Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="validDate"
                                                    value={values.validDate}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>
                                                    Upload <small className="float-end text-muted">Max size : 2MB</small>
                                                </Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="file"
                                                    onChange={(event: any) =>
                                                        setFieldValue("file", event.currentTarget.files[0])
                                                    }
                                                />
                                                <ErrorMessage name="file" component="div" className="text-danger" />
                                            </Form.Group>
                                            {values.fileName && (
                                                <p
                                                    className="text-center pt-2"
                                                    style={{ cursor: "pointer", color: "blue" }}
                                                    onClick={() => {
                                                        const fileExtension = getFileExtension(values.fileName);


                                                        // If it's a PDF, image, or Excel file, open in new tab
                                                        if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                            window.open(import.meta.env.VITE_STATIC_PATH + values.fileName, "_blank");
                                                        } else {
                                                            // For other files, trigger download
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
                                        </Col>


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

            </Modal>
        </>
    )
}

export default NoticeModal;