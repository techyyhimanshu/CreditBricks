import { useState } from 'react'
import { Col, Row, Button, Form } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { showToast } from '../../../common/services/toastServices';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions"
import { addUserPropertyApi } from '../../../api/user-api';
import Cookies from "js-cookie";
import { userPropertyValidationSchema } from '../../../schemas/user-schema';
interface Property {
    propertyName: string,
    ownerName: string,
    narration: string,
    status: string
}
interface Tabs {
    Personal: boolean,
    Document: boolean,
    Properties: boolean,
    Loan: boolean,
    Parking: boolean
}

interface PersonalInfoProps {
    handleTabChange: (tabKey: string) => void; // Function to change the active tab
    setCompletedTabs: React.Dispatch<React.SetStateAction<Record<keyof Tabs, boolean>>>;

    setDisabledTab: React.Dispatch<React.
        SetStateAction<Record<keyof Tabs, boolean>>>;

    renderFooter: (customFooter: React.ReactNode) => JSX.Element; // Function to render the modal footer
}
const Properties: React.FC<PersonalInfoProps> = ({ handleTabChange, setCompletedTabs, setDisabledTab, renderFooter }) => {
    const [properties, setProperties] = useState<Property[]>([])
    const narration = [
        { value: "2BHK", label: "2BHK" },
        { value: "3BHK", label: "3BHK" }
    ];

    const propertystatus = [
        { value: "Occupied", label: "Occupied" },
        { value: "Unoccupied", label: "Unoccupied" }
    ];
    const columns = [
        {
            name: "S.no.",
            selector: (row, index) => index + 1,
            width: "70px",
        },
        {
            name: "Property Name",
            selector: (row) => row.propertyName,
        },
        {
            name: "Owner Name",
            selector: (row) => row.ownerName,
        },
        {
            name: "Narration",
            selector: (row) => row.narration,
        },
        {
            name: "Status",
            selector: (row) => row.status,
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
        data: properties
    }
    const handleSavePropertiesInfo = async () => {
        console.log(properties)
        setCompletedTabs({
            Personal: true,
            Document: true,
            Properties: true,
            Loan: false,
            Parking: false
        })
        setDisabledTab({
            Personal: true,
            Document: true,
            Properties: true,
            Loan: false,
            Parking: true
        })
        handleTabChange("Loan")
        const username = Cookies.get('username')
        const formattedData = properties.map((property) => {
            return {
                username: username,
                ...property
            }
        })
        const response = await addUserPropertyApi(formattedData)
        if (response.status === 200 || response.status === 1) {
            console.log("Success", response.data.data)
            showToast("success", "Property info saved successfully")
        }
    }
    const handleSubmit = (values: any) => {
        console.log(values)
        const formattedData: Property = {
            propertyName: values.propertyName,
            ownerName: values.ownerName,
            narration: values.narration.value,
            status: values.status.value
        }
        setProperties((prevProperties) => [...prevProperties, formattedData]);
    }
    const handleDelete = (index: number) => {
        setProperties(properties.filter((_, i) => i !== index))
        showToast("success", "Property deleted successfully")
    }
    return (
        <>

            <Formik
                initialValues={{
                    propertyName: "",
                    ownerName: "",
                    status: { value: "Occupied", label: "Occupied" },
                    narration: { value: "2BHK", label: "2BHK" },
                }}
                validationSchema={userPropertyValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, touched, errors }) => (
                    <FormikForm>
                        <Row>
                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Property Name<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="text"
                                        name="propertyName"
                                        placeholder="Property Name"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="propertyName" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Owner Name<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type="text"
                                        name="ownerName"
                                        placeholder="Owner Name"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="ownerName" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Narration<span className="text-danger">*</span></Form.Label>
                                    <div className="SlectBox">
                                        <Select
                                            options={narration}
                                            placeholder="Select Type"
                                            value={values.narration}
                                            onChange={(e) => setFieldValue("narration", e)}
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                        {touched.narration?.value && errors.narration?.value && (
                                            <div className="text-danger">{errors.narration.value}</div>
                                        )}
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col xl={3}>
                                <Form.Group className="form-group">
                                    <Form.Label>Status <span className="text-danger">*</span></Form.Label>
                                    <div className="SlectBox">
                                        <Select
                                            options={propertystatus}
                                            placeholder="Select Type"
                                            value={values.status}
                                            onChange={(e) => setFieldValue("status", e)}
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>

                            <Col xl={12}>
                                <Form.Group className="form-group">
                                    <Button className='btn btn-promary btn-sm float-end' type='submit'>+ Add</Button>
                                </Form.Group>
                            </Col>
                        </Row>
                    </FormikForm>
                )}
            </Formik>


            <Row>
                <Col xl={12}>
                    <div
                        className="table-responsive"
                    >
                        <DataTableExtensions {...tableData}>
                            <DataTable
                                columns={columns}
                                data={properties}
                                fixedHeader
                                highlightOnHover
                                fixedHeaderScrollHeight="180px" // Same as maxHeight of table-responsive div
                                pagination
                                keyField="id"
                            />
                        </DataTableExtensions>
                    </div>
                </Col>

                {/* Save Properties Info Button */}

            </Row>
            {renderFooter(
                <>
                    <Button variant="primary" onClick={handleSavePropertiesInfo}>Save Property Info</Button>
                </>
            )}

        </>
    )
}

export default Properties