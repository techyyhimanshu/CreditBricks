import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';
import { getAllSocietyApi, getSocietyOwnerApi, getTowersOfSocietyApi } from '../../api/society-api';
import { addWingApi, deleteWingApi, getAllWingApi, updateWingApi } from '../../api/wing-api';
// Define the types for the stateCities object
export default function WingMaster() {
    const [showModal, setShowModal] = useState(false);
    const [societyData, setSocietyData] = useState<any[]>([]);
    const [wingData, setWingData] = useState<any[]>([]);
    const [societyOwner, setSocietyOwner] = useState("");
    const [currentWing, setCurrentWing] = useState({
        wingId: null,
        wingName: '',
        towerId: null,
        towerName: null,
        societyId: null,
        societyName: "",
        ownerName: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        const fetchWingData = async () => {
            try {
                const response = await getAllWingApi();
                const formattedData = response.data.data.map((item: any, index: number) => ({
                    sno: index + 1,
                    wingId: item.wingId,
                    wingName: item.wingName,
                    towerId: item.towerId,
                    towerName: item.towerName,
                    societyId: item.societyId,
                    societyName: item.societyName,
                    ownerName: item.ownerName
                }));
                setWingData(formattedData);
            } catch (error) {
                const errorMessage = handleApiError(error)
                showToast("error", errorMessage)
            }
        };

        fetchWingData();
    }, []);
    type Row = {
        sno: number;
        wingId: number;
        wingName: string;
        societyId: number;
        societyName: string;
        towerId: number;
        towerName: number;
        ownerName: string
    };

    const columns = [
        {
            name: 'S.No.',
            selector: (row: Row) => row.sno,
            sortable: true,
        },
        {
            name: 'Wing Name',
            selector: (row: Row) => row.wingName,
            sortable: true,
        },

        {
            name: 'Tower/Block',
            selector: (row: Row) => row.towerName,
            sortable: true,
        },
        {
            name: 'Society',
            selector: (row: Row) => row.societyName,
            sortable: true,
        },
        {
            name: 'Owner',
            selector: (row: Row) => row.ownerName,
            sortable: true,
        },
        {
            name: 'Action',
            sortable: true,
            cell: (row: Row) => (
                <div>
                    <button type="button" className="btn btn-light btn-sm" onClick={() => openEditModal(row)} >Edit</button>
                    <button type="button" className="btn bg-info-transparent ms-2 btn-sm" onClick={() => handleDelete(row)} >Delete</button>
                </div>
            ),
        },
    ]
    const tableData = {
        columns,
        data: wingData
    };
    const societyOptions = societyData?.map((society) => ({
        value: society.societyId,
        label: society.societyName
    }))
    const [towerOptions, setTowerOptions] = useState([]);

    const validationSchema = Yup.object({
        society: Yup.object({
            value: Yup.string().required('Society is required'),
        }),
        tower: Yup.object({
            value: Yup.string().required('Tower is required'),
            label: Yup.string().required('Tower is requiredd'),
        }).required("hello"),
        wingName: Yup.string().required('Wing no is required'),

        // zipcode: Yup.string().required('Zipcode is required'),
    })
    const fetchSocietiesForDropDown = async () => {
        try {
            const response = await getAllSocietyApi();
            const formattedData = response.data.data.map((item: any) => ({
                societyId: item.societyId,
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
                value: item.towerId,
                label: item.towerName,
            }));
            console.log(formattedData)
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
    const openAddModal = async () => {
        setIsEditing(false);
        currentWing.wingId = null
        currentWing.wingName = ''
        currentWing.towerId = null
        currentWing.towerName = null
        currentWing.societyId = null
        currentWing.societyName = ""
        // currentWing. = ";
        setShowModal(true);
        await fetchSocietiesForDropDown()
    };

    const openEditModal = async (wing: any) => {
        console.log(wing)
        await fetchSocietiesForDropDown()
        setIsEditing(true);
        setCurrentWing(wing);
        setShowModal(true);
    };

    const handleSubmit = (values: any) => {
        console.log(values)
        const data = {
            wingName: values.wingName,
            towerId: values.tower.value,
            towerName: values.tower.label,
            societyId: values.society.value,
            societyName: values.society.label,
        }
        if (isEditing) {
            ; (async () => {
                try {
                    const response = await updateWingApi(data, currentWing.wingId)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Update specific tower in the list
                        setWingData(prevData =>
                            prevData.map(wing =>
                                wing.wingId === currentWing.wingId
                                    ? { ...wing, ...data, ownerName: societyOwner }
                                    : wing
                            )
                        );
                        setShowModal(false)
                    }
                } catch (error: any) {
                    const errorMessage = handleApiError(error);
                    showToast("error", errorMessage);
                }
            })()
        } else {
            // Call API to add new tower
            ; (async () => {
                try {
                    const response = await addWingApi(data)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Add the new tower to the table

                        const newWing = {
                            sno: wingData.length + 1,
                            wingId: response.data.data.wingId,
                            wingName: response.data.data.wingName,
                            towerId: values.tower.value,
                            towerName: values.tower.label,
                            societyId: values.society.value,
                            societyName: values.society.label,
                            ownerName: societyOwner
                        }
                        setWingData(prevData => [...prevData, newWing]);
                        setShowModal(false)
                    }
                } catch (error: any) {
                    const errorMessage = handleApiError(error);
                    showToast("error", errorMessage);
                }
            })()
        }


    }
    const handleDelete = (data: any) => {
        console.log(data)
            ; (async () => {
                try {
                    const response = await deleteWingApi(data.wingId)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Remove the tower from the table
                        setWingData(prevData => prevData.filter(wing => wing.wingId !== data.wingId))
                    }
                } catch (error: any) {
                    const errorMessage = handleApiError(error)
                    showToast("error", errorMessage)
                }
            })()
    }
    return (
        <Fragment>
            <div className="breadcrumb-header justify-content-between">
                <div className="left-content">
                    <span className="main-content-title mg-b-0 mg-b-lg-1">Wing Master</span>
                </div>

                <div className="right-content">

                    <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => openAddModal()}><i className="bi bi-plus"></i> Add Wing</button>
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Formik
                            initialValues={{
                                wingId: null,
                                wingName: currentWing?.wingName || "",
                                tower: { value: currentWing?.towerId || "", label: currentWing?.towerName || "" },
                                society: { value: currentWing?.societyId || "", label: currentWing?.societyName || "" },
                                ownerName: societyOwner
                            }
                            }
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, values, errors, touched }) => (

                                <FormikForm>
                                    <Modal.Header>
                                        <Modal.Title>{isEditing ? "Edit Tower" : "Add Wing"}</Modal.Title>
                                        <Button variant="" className="btn-close" onClick={() => setShowModal(false)}>
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
                                                placeholder="Select Society"
                                                classNamePrefix="Select2"
                                            />
                                            {/* Custom Error Rendering for `society` */}
                                            {touched.society?.value && errors.society?.value && (
                                                <div className="text-danger">{errors.society.value}</div>
                                            )}

                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>Owner</Form.Label>

                                            <Field
                                                type="text"
                                                disabled={true}
                                                name="ownerName"
                                                value={societyOwner}
                                                className="form-control"
                                            />

                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>
                                                Tower<span className="text-danger">*</span>
                                            </Form.Label>
                                            <Select
                                                options={towerOptions}
                                                value={values.tower}
                                                onChange={(selected) => setFieldValue("tower", selected)}
                                                placeholder="Select Tower"
                                                classNamePrefix="Select2"
                                            />
                                            {touched.tower?.value && errors.tower?.value && (
                                                <div className="text-danger">{errors.tower.value}</div>
                                            )}
                                        </Form.Group>
                                        <Form.Group className="form-group">
                                            <Form.Label>Wing Name <span className="text-danger">*</span></Form.Label>
                                            <Field
                                                type="text"
                                                name="wingName"
                                                placeholder="Wing Name"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="wingName" component="div" className="text-danger" />
                                        </Form.Group>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="default" onClick={() => setShowModal(false)}>
                                            Close
                                        </Button>
                                        <button className="btn btn-primary" type="submit">
                                            {isEditing ? "Save Changes" : "Add Wing"}
                                        </button>
                                    </Modal.Footer>
                                </FormikForm>
                            )}
                        </Formik>
                    </Modal>

                    <CustomToastContainer />

                </div>
            </div>

            <Row>
                <Col xl={12}>
                    <Card>
                        <Card.Body>

                            <div className="table-responsive ">
                                <DataTableExtensions {...tableData}>
                                    <DataTable
                                        columns={columns}
                                        data={wingData}
                                        pagination
                                        keyField="wingId"
                                    />
                                </DataTableExtensions>
                            </div>



                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Fragment >
    );
}
