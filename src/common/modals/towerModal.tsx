import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import * as Yup from 'yup';
// import { getAllSocietyApi } from '../../api/society-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { showToast } from '../services/toastServices';
// import { getWingPropertiesApi } from '../../api/property-api';
// import { getTowerWingsApi } from '../../api/wing-api';
// import { getSocietyTowersApi } from '../../api/tower-api';
import { getAllSocietyApi, getSocietyOwnerApi } from '../../api/society-api';

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


const TowerModal: React.FC<ModalProps> = ({ show, initialVals, onClose, onSave, editing }) => {
    const [societyData, setSocietyData] = useState<any[]>([]);
    const [, setSocietyOwner] = useState("");

    const societyOptions = societyData?.map((society) => ({
        value: society.societyIdentifier,
        label: society.societyName
    }))

    useEffect(() => {
        fetchSocietiesForDropDown()
    }, [])

    const fetchSocietiesForDropDown = async () => {
        try {
            const response = await getAllSocietyApi();
            const formattedData = response.data.data.map((item: any) => ({
                societyIdentifier: item.societyIdentifier,
                societyName: item.societyName,
            }));
            setSocietyData(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    
    const fetchSocietyOwner = async (society: any) => {
        try {
            const response = await getSocietyOwnerApi(society.value);
            const { societyManager } = response.data.data
            setSocietyOwner(societyManager);
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

    const validationSchema = Yup.object({
            towerName: Yup.string().required('Tower name is required'),
            society: Yup.object({
                value: Yup.string().required('Society is required'),
            }).required('Society is required'),
            // zipcode: Yup.string().required('Zipcode is required'),
        })
    return (
        <>
            <Modal show={show} centered>
                <Formik
                    initialValues={{
                        towerIdentifier: null,
                        towerName: initialVals?.towerName || "",
                        ownerName: initialVals?.ownerName,
                        society: { value: initialVals?.societyIdentifier || "", label: initialVals?.societyName || "" }
                    }
                    }
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <FormikForm>
                            <Modal.Header>
                                <Modal.Title>{editing ? "Edit Tower" : "Add Tower"}</Modal.Title>
                                <Button variant="" className="btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                                    x
                                </Button>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group className="form-group">
                                    <Form.Label>Society<span className="text-danger">*</span></Form.Label>
                                    <Select
                                        options={societyOptions}
                                        value={values.society}
                                        onChange={(selected) => {
                                            setFieldValue("society", selected)
                                            fetchSocietyOwner(selected)
                                        }}
                                        placeholder="Select Society"
                                        classNamePrefix="Select2"
                                    />
                                    {/* Custom Error Rendering for `society` */}
                                    {touched.society?.value && errors.society?.value && (
                                        <div className="text-danger">{errors.society.value as string}</div>
                                    )}

                                </Form.Group>
                                {/* <Form.Group className="form-group">
                                                        <Form.Label>Owner</Form.Label>
                                                        <Field
                                                            type="text"
                                                            disabled={true}
                                                            value={societyOwner}
                                                            // name="ownerName"
                                                            className="form-control"
                                                        />
                                                        <ErrorMessage name="ownerName" component="div" className="text-danger" />
                                                    </Form.Group> */}
                                <Form.Group className="form-group">
                                    <Form.Label>Tower/Block Name <span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="text"
                                        name="towerName"
                                        placeholder="Tower/Block name"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="towerName" component="div" className="text-danger" />
                                </Form.Group>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
                                    Close
                                </Button>
                                <button className="btn btn-primary" type="submit">
                                    {editing ? "Save Changes" : "Add Tower"}
                                </button>
                            </Modal.Footer>
                        </FormikForm>
                    )}
                </Formik>
            </Modal>
        </>
    )
}

export default TowerModal;