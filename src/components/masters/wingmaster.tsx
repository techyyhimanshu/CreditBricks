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
        wingIdentifier: null,
        wingName: '',
        towerIdentifier: null,
        towerName: null,
        societyIdentifier: null,
        societyName: "",
      //  ownerName: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        const fetchWingData = async () => {
            try {
                const response = await getAllWingApi();
                const formattedData = response.data.data.map((item: any, index: number) => ({
                    sno: index + 1,
                    wingIdentifier: item.wingIdentifier,
                    wingName: item.wingName,
                    towerIdentifier: item?.towerIdentifier,
                    towerName: item?.towerName,
                    societyIdentifier: item.societyIdentifier,
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
        wingIdentifier: number;
        wingName: string;
        societyIdentifier: number;
        societyName: string;
        towerIdentifier: string;
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
        // {
        //     name: 'Owner',
        //     selector: (row: Row) => row.ownerName,
        //     sortable: true,
        // },
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
        value: society.societyIdentifier,
        label: society.societyName
    }))
    const [towerOptions, setTowerOptions] = useState([]);

    const validationSchema = Yup.object({
        society: Yup.object({
            value: Yup.string().required('Society is required'),
        }),
        wingName: Yup.string().required('Wing no is required'),

        // zipcode: Yup.string().required('Zipcode is required'),
    })
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
    const openAddModal = async () => {
        setIsEditing(false);
        currentWing.wingIdentifier = null
        currentWing.wingName = ''
        currentWing.towerIdentifier = null
        currentWing.towerName = null
        currentWing.societyIdentifier = null
        currentWing.societyName = ""
        // currentWing. = ";
        setShowModal(true);
        await fetchSocietiesForDropDown()
    };

    const openEditModal = async (wing: any) => {
        await fetchSocietiesForDropDown()
        setIsEditing(true);
        setCurrentWing(wing);
        setShowModal(true);
    };

    const handleSubmit = (values: any) => {
        const data = {
            wingName: values.wingName,
            towerIdentifier: values.tower?.value,
            towerName: values.tower?.label,
            societyIdentifier: values.society.value,
            societyName: values.society.label,
        }
        if (isEditing) {
            ; (async () => {
                try {
                    const response = await updateWingApi(data, currentWing.wingIdentifier)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Update specific tower in the list
                        setWingData(prevData =>
                            prevData.map(wing =>
                                wing.wingIdentifier === currentWing.wingIdentifier
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
                            wingIdentifier: response.data.data.wingIdentifier,
                            wingName: response.data.data.wingName,
                            towerIdentifier: values.tower?.value,
                            towerName: values.tower?.label,
                            societyIdentifier: values.society.value,
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
            ; (async () => {
                try {
                    const response = await deleteWingApi(data.wingIdentifier)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Remove the tower from the table
                        setWingData(prevData => prevData.filter(wing => wing.wingIdentifier !== data.wingIdentifier))
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
                                wingIdentifier: null,
                                wingName: currentWing?.wingName || "",
                                tower: { value: currentWing?.towerIdentifier || "", label: currentWing?.towerName || "" },
                                society: { value: currentWing?.societyIdentifier || "", label: currentWing?.societyName || "" },
                                ownerName: societyOwner
                            }
                            }
                            // validationSchema={validationSchema}
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
                                            <ErrorMessage name="wingName" component="div" className="text-danger" />
                                        </Form.Group>


                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="default" onClick={() => setShowModal(false)}>
                                            Close
                                        </Button>
                                        <Button className="btn btn-primary" type="submit" >
                                            {isEditing ? "Save Changes" : "Add Wing"}
                                        </Button>
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
                                        keyField="wingIdentifier"
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
