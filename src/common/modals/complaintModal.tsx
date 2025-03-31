import { Field, Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { getAllSocietyApi, getPropertiesOfSocietyApi } from '../../api/society-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { showToast } from '../services/toastServices';
import { getAllComplainCategoriesApi } from '../../api/complaint-api';

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


const ComplaintModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, onSave, editing }) => {
    const [societyData, setSocietyData] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    const [complaintCategoriesData, setComplaintCategoriesData] = useState([]);

    useEffect(() => {
        fetchSocietiesForDropDown()
        fetchAllComplaintCategories()
    }, [])

    const fetchAllComplaintCategories = async () => {
        try {

            const response = await getAllComplainCategoriesApi()
            if (response.status === 200) {
                setComplaintCategoriesData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching complaint categories:", error);
        }
    }

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
 

    const fetchPropertiesOfSocietyForDropdown = async (identifier: string) => {
        try {
            const response = await getPropertiesOfSocietyApi(identifier)

            if (response.status === 200) {
                setPropertiesForDropDown(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
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

    const property = [
        ...propertiesForDropDown.map((property: any) => ({
            value: property.propertyIdentifier,
            label: property.propertyName
        }))
    ];


    const complainttype = [
        ...complaintCategoriesData.map((category: any) => {
            return {
                value: category.id,
                label: category.name
            }
        })
    ]

    const priority = [
        { value: "", label: "All" },
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" }
    ]
    return (
        <>
            <Modal show={show} size="lg" >
                <Modal.Header>
                    <Modal.Title>Announcement</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues={{
                        id: initialVals?.id || "",
                        property: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
                        complaintCategory: initialVals ? { label: initialVals.categoryName, value: initialVals.categoryId } : { label: "", value: "" },
                        complaintDescription: initialVals?.description || "",
                        priority: initialVals ? { label: initialVals.priority, value: initialVals.priority } : { label: "", value: "" },
                        complaintFile: null,
                        fileName: initialVals?.issueFilePath
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }) => {
                        // useEffect(() => {
                        //   if (values.society && values.society.value) {
                        //     fetchTowersForDropDown(values.society);
                        //   }
                        // }, [values.society]);

                        // useEffect(() => {
                        //   if (values.tower && values.tower.value) {
                        //     fetchWingsForDropDown(values.tower);
                        //   }
                        // }, [values.tower]);

                        // useEffect(() => {
                        //   if (values.wing && values.wing.value) {
                        //     fetchPropertiesForDropDown(values.wing);
                        //   }
                        // }, [values.wing]);
                        // useEffect(() => {
                        //   if (initialVals?.message) {
                        //     setFieldValue("message", initialVals?.message)
                        //   }
                        // }, [initialVals])

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
                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Complaint ID</Form.Label>
                                                <input type="text"
                                                    className='form-control'
                                                    placeholder=''
                                                    value={values.id}
                                                    disabled />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Society</Form.Label>
                                                <Select
                                                    options={societyData}
                                                    value={values.society}
                                                    name="society"
                                                    onChange={(selected) => {
                                                        fetchPropertiesOfSocietyForDropdown(selected?.value);
                                                        setFieldValue("society", selected);
                                                        setFieldValue("property", null);
                                                    }}
                                                    placeholder="Select society"
                                                    classNamePrefix="Select2"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Property</Form.Label>
                                                <Select
                                                    options={property}
                                                    value={values.property}
                                                    name="property"
                                                    onChange={(selected) => setFieldValue("property", selected)}
                                                    placeholder="Select property"
                                                    classNamePrefix="Select2"
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Complaint Category</Form.Label>
                                                <Select
                                                    options={complainttype}
                                                    value={values.complaintCategory}
                                                    name='complaintCategory'
                                                    onChange={(selected) => setFieldValue("complaintCategory", selected)}
                                                    placeholder="Select service"
                                                    classNamePrefix="Select2"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col xl={6}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Priority </Form.Label>
                                                <Select
                                                    options={priority}
                                                    value={values.priority}
                                                    name='priority'
                                                    onChange={(selected) => setFieldValue("priority", selected)}
                                                    placeholder="Select priority"
                                                    classNamePrefix="Select2"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Description</Form.Label>
                                                <Field type="text" name='complaintDescription' value={values.complaintDescription} className='form-control'
                                                    as="textarea" placeholder='Description'></Field>
                                            </Form.Group>
                                        </Col>
                                        <Col xl={12}>
                                            <Form.Group className="form-group mb-1">
                                                <Form.Label>Upload Photo</Form.Label>
                                                <input type="file"
                                                    name="complaintFile"
                                                    onChange={(e: any) => setFieldValue("complaintFile", e.target.files[0])}
                                                    className='form-control' />
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

export default ComplaintModal;