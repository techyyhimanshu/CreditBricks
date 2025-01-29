import React, { useState } from 'react'
import { Col, Row, Card, Modal, Button, Form, Tab, Tabs } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";

import { addUserApi, deleteUserApi, getAllUserApi, updateUserApi } from '../../../api/user-api';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
import stateCities from "../stateCity.json"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { updateUserValidationSchema, addUserValidationSchema } from "../../../schemas/user-schema"
import { imagesData } from "../../../common/commonimages";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
interface ParkingDetails {
    vehicleType: string,
    vehicleNumber: string,
    vehicleOwnerName: string,
    dlNumber?: string,
    dlIssueDate?: Date,
    dlExpiryDate?: Date,
    parkingNumber: string
}
interface PersonalInfoProps {
    handleTabChange: (tabKey: string) => void; // Function to change the active tab
    setCompletedTabs: React.Dispatch<React.SetStateAction<Record<keyof Tabs, boolean>>>;

    setDisabledTab: React.Dispatch<React.
        SetStateAction<Record<keyof Tabs, boolean>>>;

    renderFooter: (customFooter: React.ReactNode) => JSX.Element; // Function to render the modal footer
}
interface Tabs {
    Personal: boolean,
    Document: boolean,
    Properties: boolean,
    Loan: boolean,
    Parking: boolean
}
const Parking: React.FC<PersonalInfoProps> = ({ handleTabChange, setCompletedTabs, setDisabledTab, renderFooter }) => {
    const vehicletype = [
        { value: "2Wheeler", label: "2Wheeler" },
        { value: "4Wheeler", label: "4Wheeler" }
    ];
    const [parkingDetails, setParkingDetails] = useState<ParkingDetails[]>([])
    const columns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            sortable: false,
            width: "70px",
        },
        {
            name: "Vehicle Type",
            selector: (row) => row.vehicleType,
            sortable: true,
        },
        {
            name: "Vehicle Number",
            selector: (row) => row.vehicleNumber,
            sortable: true,
        },
        {
            name: "Vehicle Owner Name",
            selector: (row) => row.vehicleOwnerName,
            sortable: true,
        },
        {
            name: "DL Number",
            selector: (row) => row.dlNumber,
            sortable: true,
        },
        {
            name: "DL Issue Date",
            selector: (row) => row.dlIssueDate,
            sortable: true,
            format: (row) => new Date(row.dlIssueDate).toLocaleDateString(), // Format as a readable date
        },
        {
            name: "DL Expiry Date",
            selector: (row) => row.dlExpiryDate,
            sortable: true,
            format: (row) => new Date(row.dlExpiryDate).toLocaleDateString(), // Format as a readable date
        },
        {
            name: "Parking Number",
            selector: (row) => row.parkingNumber,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row, index) => (
                <i
                    className="bi bi-trash text-danger cursor"
                    onClick={() => handleDelete(index)}
                >
                </i>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];


    const tableData = {
        columns,
        data: parkingDetails,
    };
    const handleSubmit = (values: any) => {
        console.log(values)
        const formattedData = {
            vehicleType: values.vehicleType.value,
            vehicleNumber: values.vehicleNumber,
            vehicleOwnerName: values.vehicleOwnerName,
            dlNumber: values.dlNumber,
            dlIssueDate: values.dlIssueDate,
            dlExpiryDate: values.dlExpiryDate,
            parkingNumber: values.parkingNumber
        }
        setParkingDetails([...parkingDetails, formattedData])
    }
    const handleDelete = (index: number) => {
        setParkingDetails(parkingDetails.filter((_, i) => i !== index))
        showToast("success", "Deleted successfully")

    }
    return (
        <>
            <Formik
                initialValues={{
                    vehicleType: { value: "", label: "" },
                    vehicleNumber: "",
                    vehicleOwnerName: "",
                    dlNumber: "",
                    dlIssueDate: "",
                    dlExpiryDate: "",
                    parkingNumber: ""
                }}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values }) => (
                    <FormikForm>
                        <Row>


                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Vehicle Type<span className="text-danger">*</span></Form.Label>
                                    <div className="SlectBox">
                                        <Select
                                            options={vehicletype}
                                            value={values.vehicleType}
                                            onChange={(e) => setFieldValue("vehicleType", e)}
                                            placeholder="Select type"
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Vehicle Number<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="text"
                                        name="vehicleNumber"
                                        placeholder="Vehicle number"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Vehicle Owner Name<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="text"
                                        name="vehicleOwnerName"
                                        placeholder="Vehicle Owner number"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>DL Number<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="text"
                                        name="dlNumber"
                                        placeholder="DL Number"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>DL Issue Date<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="date"
                                        name="dlIssueDate"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>DL Expiry Date<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="date"
                                        name="dlExpiryDate"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Parking Number<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="text"
                                        name="parkingNumber"
                                        placeholder="Parking Number"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Col>




                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label></Form.Label>
                                    <Button className='btn btn-promary btn-sm mt-4' type='submit'>+ Add</Button>
                                </Form.Group>
                            </Col>



                        </Row>
                    </FormikForm>
                )}
            </Formik>
            <Row>
                <Col xl={12}>
                    <div className="table-responsive">
                        <DataTableExtensions {...tableData}>
                            <DataTable
                                columns={columns}
                                data={parkingDetails}
                                pagination
                                fixedHeader
                                fixedHeaderScrollHeight="150px"
                                highlightOnHover
                                noHeader
                            />
                        </DataTableExtensions>
                    </div>
                    {/* <div style={{ maxHeight: "200px", overflow: "auto" }}>
                        <table className="table table-bordered mt-3">
                            <thead style={{ position: "sticky", top: "0", zIndex: "1020", backgroundColor: "#f8f9fa" }}>
                                <tr>
                                    <th>S.no.</th>
                                    <th>Vehicle Type</th>
                                    <th>Vehicle Number</th>
                                    <th>Vehicle Owner Name</th>
                                    <th>DL Number</th>
                                    <th>DL Issue Date</th>
                                    <th>DL Expiry Date</th>
                                    <th>Parking Number</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parkingDetails.length > 0 ? (
                                    parkingDetails.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.vehicleType}</td>
                                            <td>{item.vehicleNumber}</td>
                                            <td>{item.vehicleOwnerName}</td>
                                            <td>{item.dlNumber}</td>
                                            <td>{item.dlIssueDate}</td>
                                            <td>{item.dlExpiryDate}</td>
                                            <td>{item.parkingNumber}</td>
                                            <td align="center">
                                                <i
                                                    className="bi bi-trash text-danger cursor"
                                                    onClick={() => handleDelete(index)}
                                                ></i>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} align="center" style={{ padding: "10px" }}>
                                            No records
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div> */}
                </Col>


            </Row>
            {renderFooter(
                <>
                    <Button variant="primary">Save Parking Info</Button>
                </>
            )}
        </>
    )
}

export default Parking