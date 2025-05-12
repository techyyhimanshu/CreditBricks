import { Field, Formik, Form as FormikForm } from 'formik';
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Select from "react-select";
import 'suneditor/dist/css/suneditor.min.css';
// import { getAllSocietyApi } from '../../api/society-api';
import { handleApiError } from '../../helpers/handle-api-error';
import { showToast } from '../services/toastServices';
// import { getWingPropertiesApi } from '../../api/property-api';
// import { getTowerWingsApi } from '../../api/wing-api';
// import { getSocietyTowersApi } from '../../api/tower-api';
import { getAllSocietyApi, getSocietyOwnerApi, getTowersOfSocietyApi } from '../../api/society-api';
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


const WingModal: React.FC<ModalProps> = ({ show, initialVals, onClose, onSave, editing }) => {
    const [societyData, setSocietyData] = useState<any[]>([]);
    const [societyOwner, setSocietyOwner] = useState("");
    const [towerOptions, setTowerOptions] = useState<any>([]);
    const { society } = useSelector((state: RootState) => state.auth)

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
    const fetchTowersForDropDown = async (society: any) => {
        try {
            const response = await getTowersOfSocietyApi(society.value);
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
    return (
        <>
            <Modal show={show} centered>
                <Formik
                    initialValues={{
                        wingIdentifier: null,
                        wingName: initialVals?.wingName || "",
                        tower: { value: initialVals?.towerIdentifier || "", label: initialVals?.towerName || "" },
                        society: { value: initialVals?.societyIdentifier || "", label: initialVals?.societyName || "" },
                        ownerName: societyOwner
                    }
                    }
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => {
                        useEffect(() => {
                            if (society && !initialVals) {
                                setFieldValue("society", society);
                                setFieldValue("tower", null); 
                                fetchTowersForDropDown(society); 
                                fetchSocietyOwner(society)
                            }
                        }, [society]);
                        return (

                            <FormikForm>
                                <Modal.Header>
                                    <Modal.Title>Wing</Modal.Title>
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
                                                setFieldValue("tower", null); // Reset tower selection
                                                fetchTowersForDropDown(selected); // Fetch towers for the selected society
                                                fetchSocietyOwner(selected)
                                                
                                            }}
                                            isDisabled
                                            placeholder="Select Society"
                                            classNamePrefix="Select2"
                                        />
                                        {/* Custom Error Rendering for `society` */}
                                        {/* {touched.society?.value && errors.society?.value && (
                                        <div className="text-danger">{errors.society.value}</div>
                                    )} */}

                                    </Form.Group>
                                    {/* <Form.Group className="form-group">
                                                        <Form.Label>Owner</Form.Label>
            
                                                        <Field
                                                            type="text"
                                                            disabled={true}
                                                            name="ownerName"
                                                            value={societyOwner}
                                                            className="form-control"
                                                        />
            
                                                    </Form.Group> */}
                                    <Form.Group className="form-group">
                                        <Form.Label>
                                            Tower
                                        </Form.Label>
                                        <Select
                                            options={towerOptions}
                                            value={values.tower}
                                            onChange={(selected) => setFieldValue("tower", selected)}
                                            placeholder="Select Tower"
                                            classNamePrefix="Select2"
                                        />
                                        {/* {touched.tower?.value && errors.tower?.value && (
                                                            <div className="text-danger">{errors.tower.value}</div>
                                                        )} */}
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label>Wing Name <span className="text-danger">*</span></Form.Label>
                                        <Field
                                            type="text"
                                            name="wingName"
                                            placeholder="Wing Name"
                                            className="form-control"
                                        />
                                        {/* <ErrorMessage name="wingName" component="div" className="text-danger" /> */}
                                    </Form.Group>


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
                                        Close
                                    </Button>
                                    <Button className="btn btn-primary" type="submit" >
                                        {editing?"Update":"Save"}
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

export default WingModal;