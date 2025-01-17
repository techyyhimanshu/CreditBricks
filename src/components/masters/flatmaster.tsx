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
import { getAllSocietyApi, getTowersOfSocietyApi } from '../../api/society-api';
import { addFlatApi, deleteFlatApi, getAllFlatApi, updateFlatApi } from '../../api/flat-api';
// Define the types for the stateCities object
export default function FlatMaster() {
  const [showModal, setShowModal] = useState(false);
  const [societyData, setSocietyData] = useState<any[]>([]);
  const [flatData, setFlatData] = useState<any[]>([]);
  const [currentFlat, setCurrentFlat] = useState({
    flatId: null,
    flatNumber: '',
    floorNumber: null,
    towerId: null,
    towerName: null,
    societyId: null,
    societyName: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchFlatData = async () => {
      try {
        const response = await getAllFlatApi();
        console.log(response)
        const formattedData = response.data.data.map((item: any, index: number) => ({
          sno: index + 1,
          flatId: item.flatId,
          flatNumber: item.flatNumber,
          floorNumber: item.floorNumber,
          towerId: item.towerId,
          towerName: item.towerName,
          societyId: item.societyId,
          societyName: item.societyName,
        }));
        setFlatData(formattedData);
      } catch (error) {
        const errorMessage = handleApiError(error)
        showToast("error", errorMessage)
      }
    };

    fetchFlatData();
  }, []);
  type Row = {
    sno: number;
    flatId: number;
    flatNumber: string;
    floorNumber: number;
    societyId: number;
    societyName: string;
    towerId: number;
    towerName: number;
  };

  const columns = [
    {
      name: 'S.No.',
      selector: (row: Row) => row.sno,
      sortable: true,
    },
    {
      name: 'Society',
      selector: (row: Row) => row.societyName,
      sortable: true,
    },
    {
      name: 'Tower/Block',
      selector: (row: Row) => row.towerName,
      sortable: true,
    },

    {
      name: 'Floor',
      selector: (row: Row) => row.floorNumber,
      sortable: true,
    },
    {
      name: 'Flat No',
      selector: (row: Row) => row.flatNumber,
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
    data: flatData
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
    flatNumber: Yup.string().required('Flat no is required'),

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
  const openAddModal = async () => {
    setIsEditing(false);
    currentFlat.flatId = null
    currentFlat.flatNumber = ''
    currentFlat.floorNumber = null
    currentFlat.towerId = null
    currentFlat.towerName = null
    currentFlat.societyId = null
    currentFlat.societyName = ""
    // currentFlat. = ";
    setShowModal(true);
    await fetchSocietiesForDropDown()
  };

  const openEditModal = async (flat: any) => {
    console.log(flat)
    await fetchSocietiesForDropDown()
    setIsEditing(true);
    setCurrentFlat(flat);
    setShowModal(true);
  };

  const handleSubmit = (values: any) => {
    console.log(values)
    const data = {
      flatNumber: values.flatNumber,
      floorNumber: values.floorNumber,
      towerId: values.tower.value,
      towerName: values.tower.label,
      societyId: values.society.value,
      societyName: values.society.label,
    }
    if (isEditing) {
      ; (async () => {
        try {
          const response = await updateFlatApi(data, currentFlat.flatId)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Update specific tower in the list
            setFlatData(prevData =>
              prevData.map(flat =>
                flat.flatId === currentFlat.flatId
                  ? { ...flat, ...data }
                  : flat
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
          const response = await addFlatApi(data)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Add the new tower to the table
            console.log(values)

            const newFlat = {
              sno: flatData.length + 1,
              flatId: response.data.data.flatId,
              flatNumber: response.data.data.flatNumber,
              floorNumber: response.data.data.floorNumber,
              towerId: values.tower.value,
              towerName: values.tower.label,
              societyId: values.society.value,
              societyName: values.society.label
            }
            setFlatData(prevData => [...prevData, newFlat]);
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
          const response = await deleteFlatApi(data.flatId)
          if (response.status === 200) {
            showToast("success", response.data.message)
            // Remove the tower from the table
            setFlatData(prevData => prevData.filter(tower => tower.flatId !== data.flatId))
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
          <span className="main-content-title mg-b-0 mg-b-lg-1">Flat Master</span>
        </div>

        <div className="right-content">

          <button type="button" className="btn btn-primary p-1 pe-2 ps-2 me-1" onClick={() => openAddModal()}><i className="bi bi-plus"></i> Add Flat</button>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Formik
              initialValues={{
                flatId: null,
                flatNumber: currentFlat?.flatNumber || "",
                floorNumber: currentFlat?.floorNumber || null,
                tower: { value: currentFlat?.towerId || "", label: currentFlat?.towerName || "" },
                society: { value: currentFlat?.societyId || "", label: currentFlat?.societyName || "" }
              }
              }
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, errors, touched }) => (
                
                <FormikForm>
                  <Modal.Header>
                    <Modal.Title>{isEditing ? "Edit Tower" : "Add Flat"}</Modal.Title>
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
                      <Form.Label>Floor </Form.Label>
                      <Field
                        type="text"
                        name="floorNumber"
                        placeholder="Floor no"
                        className="form-control"
                      />
                      <ErrorMessage name="floorNumber" component="div" className="text-danger" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label>Flat No <span className="text-danger">*</span></Form.Label>
                      <Field
                        type="text"
                        name="flatNumber"
                        placeholder="Flat no"
                        className="form-control"
                      />
                      <ErrorMessage name="flatNumber" component="div" className="text-danger" />
                    </Form.Group>


                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="default" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                    <button className="btn btn-primary" type="submit">
                      {isEditing ? "Save Changes" : "Add Flat"}
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
                    data={flatData}
                    pagination
                    keyField="flatId"
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
