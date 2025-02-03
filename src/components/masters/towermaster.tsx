import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Modal, Button, Form } from "react-bootstrap";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addTowerApi, deleteTowerApi, getAllTowerApi, updateTowerApi } from '../../api/tower-api';
import { showToast, CustomToastContainer } from '../../common/services/toastServices';
import { handleApiError } from '../../helpers/handle-api-error';
import { getAllSocietyApi, getSocietyOwnerApi } from '../../api/society-api';
// Define the types for the stateCities object
export default function TowerMaster() {
    const [showModal, setShowModal] = useState(false);
    const [towerData, setTowerData] = useState<any[]>([]);
    const [societyData, setSocietyData] = useState<any[]>([]);
    const [societyOwner, setSocietyOwner] = useState("");

    const [currentTower, setCurrentTower] = useState({
        towerId: null,
        ownerName: '',
        towerName: '',
        societyId: null,
        societyName: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        const fetchTowerData = async () => {
            try {
                const response = await getAllTowerApi();
                const formattedData = response.data.data.map((item: any, index: number) => ({
                    towerId: item.towerId,
                    sno: index + 1,
                    towerName: item.towerName,
                    ownerName: item.societyManager,
                    societyId: item.societyId,
                    societyName: item.societyName
                }));
                setTowerData(formattedData);
            } catch (error) {
                const errorMessage = handleApiError(error)
                showToast("error", errorMessage)
            }
        };

        fetchTowerData();
    }, []);
    type Row = {
        towerId: number;
        sno: number;
        towerName: string;
        ownerName: string;
        societyId: number;
        societyName: string;
    };

    const columns = [
        {
            name: 'S.No.',
            selector: (row: Row) => row.sno,
            sortable: true,
        },
        {
            name: 'Tower/Block Name',
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
        data: towerData
    };
    const societyOptions = societyData?.map((society) => ({
        value: society.societyId,
        label: society.societyName
    }))
    const validationSchema = Yup.object({
        towerName: Yup.string().required('Tower name is required'),
        society: Yup.object({
            value: Yup.string().required('Society is required'),
        }).required('Society is required'),
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
        currentTower.towerName = "";
        currentTower.societyId = null;
        currentTower.societyName = "";
        currentTower.ownerName = "";
        setShowModal(true);
        await fetchSocietiesForDropDown()
    };

    const openEditModal = async (tower: any) => {
        console.log(tower)
        await fetchSocietiesForDropDown()
        setIsEditing(true);
        setCurrentTower(tower);
        setShowModal(true);
    };

    const handleSubmit = (values: any) => {
        const data = {
            towerName: values.towerName,
            ownerName: values.ownerName,
            societyId: values.society.value,
            societyName: values.society.label,
        }
        console.log(data)
        if (isEditing) {
            ; (async () => {
                try {
                    const response = await updateTowerApi(data, currentTower.towerId)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Update specific tower in the list
                        setTowerData(prevData =>
                            prevData.map(tower =>
                                tower.towerId === currentTower.towerId
                                    ? { ...tower, ...data, ownerName: societyOwner }
                                    : tower
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
                    const response = await addTowerApi(data)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Add the new tower to the table
                        const newSociety = {
                            sno: towerData.length + 1,
                            towerId: response.data.data.towerId,
                            towerName: response.data.data.towerName,
                            societyId: response.data.data.societyId,
                            societyName: societyData.filter((society) => society.societyId === response.data.data.societyId)[0].societyName,
                            ownerName: societyOwner,
                        }
                        setTowerData(prevData => [...prevData, newSociety]);
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
                    const response = await deleteTowerApi(data.towerId)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Remove the tower from the table
                        setTowerData(prevData => prevData.filter(tower => tower.towerId !== data.towerId))
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
                    <span className="main-content-title mg-b-0 mg-b-lg-1">Tower/Block Master</span>
                </div>

                <div className="right-content">

                    <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => openAddModal()}><i className="bi bi-plus"></i> Add Tower/Block</button>
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Formik
                            initialValues={{
                                towerId: null,
                                towerName: currentTower?.towerName || "",
                                ownerName: currentTower?.ownerName,
                                society: { value: currentTower?.societyId || "", label: currentTower?.societyName || "" }
                            }
                            }
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, values, errors, touched }) => (
                                <FormikForm>
                                    <Modal.Header>
                                        <Modal.Title>{isEditing ? "Edit Tower" : "Add Tower"}</Modal.Title>
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
                                                value={societyOwner}
                                                // name="ownerName"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="ownerName" component="div" className="text-danger" />
                                        </Form.Group>
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
                                        <Button variant="default" onClick={() => setShowModal(false)}>
                                            Close
                                        </Button>
                                        <button className="btn btn-primary" type="submit">
                                            {isEditing ? "Save Changes" : "Add Tower"}
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
                                        data={towerData}
                                        pagination
                                        keyField="towerId"
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
