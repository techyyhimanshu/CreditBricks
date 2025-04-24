import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi, getPropertiesOfSocietyApi } from "../../api/society-api";
import { handleApiError } from "../../helpers/handle-api-error";
import { showToast, CustomToastContainer } from "../services/toastServices";
import { Field, Formik, Form as FormikForm } from "formik";
import { getTenantOptions } from "../../api/property-api";
import { getMemberForDropDownApi } from "../../api/user-api";
import { getVendorForDropDownApi } from "../../api/vendor-api";
import { createNewGatePassApi } from "../../api/applications-api";

interface ProductModalProps {
    show: boolean;
    // onSave: (values: any) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;


}

const GatePassModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing }) => {
    const [societiesForDropDown, setSocietiesForDropDown] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    const [tenantsForDropDown, setTenantsForDropDown] = useState([]);
    const [membersForDropDown, setMembersForDropDown] = useState([]);
    const [vendorsForDropDown, setVendorsForDropDown] = useState([]);

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
            setSocietiesForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchPropertiesForDropDown = async (society: any) => {
        try {
            const response = await getPropertiesOfSocietyApi(society.value);
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
    const fetchTenantsForDropDown = async () => {
        try {
            const response = await getTenantOptions();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.tenantIdentifier,
                label: `${item.firstName} ${item.middleName} ${item.lastName}`,
            }));
            setTenantsForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }
    const fetchMembersForDropDown = async () => {
        try {
            const response = await getMemberForDropDownApi();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.identifier,
                label: `${item.firstName} ${item.middleName} ${item.lastName}`,
            }));
            setMembersForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }
    const fetchVendorsForDropDown = async () => {
        try {
            const response = await getVendorForDropDownApi();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.identifier,
                label: `${item.contactPersonName}`,
            }));
            setVendorsForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }


    const gatetype = [
        { value: "Inward", label: "Inward" },
        { value: "Outward", label: "Outward" },
        { value: "Internal", label: "Internal" },
    ]

    const gatetypecategory = [
        { value: "Member", label: "Member" },
        { value: "Tenant", label: "Tenant" },
        { value: "Material", label: "Material" },
    ]
    const gatetypesubcategory = [
        { value: "Member Shifting In", label: "Member Shifting In" },
        { value: "Member Shifting Out", label: "Member Shifting Out" },
        { value: "Tenant Shifting In", label: "Tenant Shifting In" },
        { value: "Tenant Shifting Out", label: "Tenant Shifting Out" },
        { value: "Asset Moving In", label: "Asset Moving In" },
        { value: "Asset Moving Out", label: "Asset Moving Out" },
    ];

    const vehiclenature = [
        { value: "Member Parking", label: "Member Parking" },
        { value: "Visitor Parking", label: "Visitor Parking" },
        { value: "Other", label: "Other" },
    ]

    const vehicletypegatepass = [
        { value: "Sedan", label: "Sedan" },
        { value: "Coupe", label: "Coupe" },
        { value: "Sports Car", label: "Sports Car" },
        { value: "Station Wagon", label: "Station Wagon" },
        { value: "Hatchback", label: "Hatchback" },
        { value: "Convertible", label: "Convertible" },
        { value: "SUV", label: "SUV" },
        { value: "Minivan", label: "Minivan" },
    ]


    const handleSubmit = async (values: any) => {
        try {
            const formattedData = {
                societyIdentifier: values.society.value,
                propertyIdentifier: values.property.value,
                gateType: values.gateType.value,
                category: values.category.value,
                subCategory: values.subCategory.value,
                entryDateTime: values.entryDateTime,
                exitDateTime: values.exitDateTime,
                userIdentifier: values.tenant.value ? values.tenant.value : values.member.value ? values.member.value : values.vendor.value,
                purpose: values.purpose,
                description: values.description,
                driverName: values.driverName,
                driverMobileNumber: values.driverMobileNumber,
                vehicleNumber: values.vehicleNumber,
                vehicleModel: values.vehicleModel,
                vehicleNature: values.vehicleNature.value,
                vehicleType: values.vehicleType.value,
                contactPersonName: values.contactPersonName,
                contactPersonNumber: values.contactPersonNumber,
                remarks: values.remarks
            }
            console.log(values)
            const response = await createNewGatePassApi(formattedData)
            if (response.status === 200) {
                showToast("success", "Gate pass created successfully")
            }
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }


    return (
        <>
            <Modal show={show} size="xl" centered>
                <Modal.Header>
                    <Modal.Title>Gate Pass</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    initialValues=
                    {{
                        society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
                        property: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        gateType: initialVals ? { label: initialVals.gateType, value: initialVals.gateTypeIdentifier } : { label: "", value: "" },
                        category: initialVals ? { label: initialVals.category, value: initialVals.gateTypeCategoryIdentifier } : { label: "", value: "" },
                        subCategory: initialVals ? { label: initialVals.subCategory, value: initialVals.gateTypeSubCategoryIdentifier } : { label: "", value: "" },
                        entryDateTime: initialVals ? initialVals.entryDateTime : "",
                        exitDateTime: initialVals ? initialVals.exitDateTime : "",
                        member: initialVals ? { label: initialVals.memberName, value: initialVals.memberIdentifier } : { label: "", value: "" },
                        tenant: initialVals ? { label: initialVals.tenantName, value: initialVals.tenantIdentifier } : { label: "", value: "" },
                        vendor: initialVals ? { label: initialVals.vendorName, value: initialVals.vendorIdentifier } : { label: "", value: "" },
                        vehicleNature: initialVals ? { label: initialVals.vehicleNature, value: initialVals.vehicleNatureIdentifier } : { label: "", value: "" },
                        vehicleType: initialVals ? { label: initialVals.vehicleType, value: initialVals.vehicleTypeIdentifier } : { label: "", value: "" },
                        purpose: initialVals ? initialVals.purpose : "",
                        description: initialVals ? initialVals.description : "",
                        driverName: initialVals ? initialVals.driverName : "",
                        driverMobileNumber: initialVals ? initialVals.driverMobileNumber : "",
                        vehicleNumber: initialVals ? initialVals.vehicleNumber : "",
                        vehicleModel: initialVals ? initialVals.vehicleModel : "",
                        contactPersonName: initialVals ? initialVals.contactPersonName : "",
                        contactPersonNumber: initialVals ? initialVals.contactPersonNumber : "",
                        remarks: initialVals ? initialVals.remarks : "",

                    }}
                    onSubmit={handleSubmit}>
                    {({ values, handleChange, setFieldValue }) => {
                        return (
                            <FormikForm>
                                <Modal.Body className='bg-light'>
                                    <Accordion defaultActiveKey="basicinfo">
                                        <Accordion.Item eventKey="basicinfo">
                                            <Accordion.Header>Basic Information</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Society </Form.Label>
                                                            <Select
                                                                options={societiesForDropDown}
                                                                placeholder="Select society"
                                                                classNamePrefix="Select2"
                                                                name="society"
                                                                value={values.society}
                                                                onChange={(selected) => {
                                                                    fetchPropertiesForDropDown(selected);
                                                                    setFieldValue("society", selected);
                                                                }}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Property </Form.Label>
                                                            <Select
                                                                options={propertiesForDropDown}
                                                                name="property"
                                                                value={values.property}
                                                                onChange={(selected) => {
                                                                    setFieldValue("property", selected);
                                                                }}
                                                                placeholder="Select property"
                                                                classNamePrefix="Select2"
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Gate Type </Form.Label>
                                                            <Select
                                                                options={gatetype}
                                                                name="gateType"
                                                                value={values.gateType}
                                                                onChange={(selected) => {
                                                                    setFieldValue("gateType", selected);
                                                                }}
                                                                placeholder="Select type"
                                                                classNamePrefix="Select2"
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Category </Form.Label>
                                                            <Select
                                                                options={gatetypecategory}
                                                                name="category"
                                                                value={values.category}
                                                                onChange={(selected) => {
                                                                    setFieldValue("category", selected);
                                                                    switch (selected?.label) {
                                                                        case "Tenant": fetchTenantsForDropDown()
                                                                            break;
                                                                        case "Member": fetchMembersForDropDown()
                                                                            break;
                                                                        case "Material": fetchVendorsForDropDown()
                                                                    }
                                                                }}
                                                                placeholder="Select category"
                                                                classNamePrefix="Select2"
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Sub Category </Form.Label>
                                                            <Select
                                                                options={gatetypesubcategory}
                                                                name="subCategory"
                                                                value={values.subCategory}
                                                                onChange={(selected) => {
                                                                    setFieldValue("subCategory", selected);
                                                                }}
                                                                placeholder="Select sub category"
                                                                classNamePrefix="Select2"
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Entry Date & Time</Form.Label>
                                                            <InputGroup className="input-group w-100 datetimepicker-2">

                                                                <Field
                                                                    className="form-control"
                                                                    id="datetime-local"
                                                                    type="datetime-local"
                                                                    defaultValue="2020-01-16T14:22"
                                                                    name="entryDateTime"
                                                                    value={values.entryDateTime}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Exit Date & Time</Form.Label>
                                                            <InputGroup className="input-group w-100 datetimepicker-2">

                                                                <Field
                                                                    className="form-control"
                                                                    id="datetime-local"
                                                                    type="datetime-local"
                                                                    defaultValue="2020-01-16T14:22"
                                                                    name="exitDateTime"
                                                                    value={values.exitDateTime}

                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Gate Pass Number</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                disabled
                                                                placeholder="Gate Pass Number"
                                                                className="form-control"
                                                            ></Form.Control>
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    {
                                                        ["Member"].includes(values?.category?.label || "") && <Col xl="4">
                                                            <Form.Group className="form-group mb-1">
                                                                <Form.Label>Member </Form.Label>
                                                                <Select
                                                                    options={membersForDropDown}
                                                                    name="member"
                                                                    value={values.member}
                                                                    onChange={(selected) => {
                                                                        setFieldValue("member", selected);
                                                                    }}
                                                                    placeholder="Select member"
                                                                    classNamePrefix="Select2"
                                                                />
                                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                            </Form.Group>
                                                        </Col>
                                                    }
                                                    {
                                                        ["Tenant"].includes(values?.category?.label || "") &&
                                                        <Col xl="4">
                                                            <Form.Group className="form-group mb-1">
                                                                <Form.Label>Tenant <span className='text-info float-end cursor'
                                                                >View Tenant Detail</span> </Form.Label>
                                                                <Select
                                                                    options={tenantsForDropDown}
                                                                    placeholder="Select tenant"
                                                                    classNamePrefix="Select2"
                                                                    name="tenant"
                                                                    value={values.tenant}
                                                                    onChange={(selected) => {
                                                                        setFieldValue("tenant", selected);
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    }
                                                    {
                                                        ["Material"].includes(values?.category?.label || "") &&
                                                        <Col xl="4">
                                                            <Form.Group className="form-group mb-1">
                                                                <Form.Label>Vendor <span className='text-info float-end cursor'>View Vendor Detail</span> </Form.Label>
                                                                <Select
                                                                    options={vendorsForDropDown}
                                                                    placeholder="Select vendor"
                                                                    classNamePrefix="Select2"
                                                                    name="vendor"
                                                                    value={values.vendor}
                                                                    onChange={(selected) => {
                                                                        setFieldValue("vendor", selected);
                                                                    }}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                    }

                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="ApplicationDescription">
                                            <Accordion.Header>Application Description</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl={12}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Purpose</Form.Label>
                                                            <Field
                                                                type="text"
                                                                placeholder="Purpose"
                                                                className="form-control"
                                                                name="purpose"
                                                                value={values.purpose}
                                                            />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={12}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Description
                                                                <small className='float-end'>max 250 character</small>
                                                            </Form.Label>
                                                            <Field
                                                                className="form-control"
                                                                placeholder='Details'
                                                                as="textarea"
                                                                name="description"
                                                                value={values.description}
                                                            />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="vehicledetails">
                                            <Accordion.Header>Vehicle And Driver Details</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Driver Name</Form.Label>
                                                            <Field
                                                                type="text"
                                                                placeholder="Name"
                                                                className="form-control"
                                                                name="driverName"
                                                                value={values.driverName}
                                                            />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Driver Contact Details</Form.Label>
                                                            <Field
                                                                type="text"
                                                                placeholder="Contact"
                                                                className="form-control"
                                                                name="driverMobileNumber"
                                                                value={values.driverMobileNumber}
                                                            />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Vehicle Number</Form.Label>
                                                            <Field
                                                                type="text"
                                                                placeholder="Number"
                                                                className="form-control"
                                                                name="vehicleNumber"
                                                                value={values.vehicleNumber}
                                                            />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Vehicle Model</Form.Label>
                                                            <Field
                                                                type="text"
                                                                placeholder="model"
                                                                className="form-control"
                                                                name="vehicleModel"
                                                                value={values.vehicleModel}
                                                            />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Vehicle Nature </Form.Label>
                                                            <Select
                                                                options={vehiclenature}
                                                                placeholder="Select nature"
                                                                classNamePrefix="Select2"
                                                                name="vehicleNature"
                                                                value={values.vehicleNature}
                                                                onChange={(selected) => {
                                                                    setFieldValue("vehicleNature", selected)
                                                                }}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Vehicle Type </Form.Label>
                                                            <Select
                                                                options={vehicletypegatepass}
                                                                placeholder="Select type"
                                                                classNamePrefix="Select2"
                                                                name="vehicleType"
                                                                value={values.vehicleType}
                                                                onChange={(selected) => {
                                                                    setFieldValue("vehicleType", selected)
                                                                }}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="contactpersondetails">
                                            <Accordion.Header>Contact Person Details</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Contact Person Name</Form.Label>
                                                            <Field
                                                                type="text"
                                                                placeholder="Name"
                                                                className="form-control"
                                                                name="contactPersonName"
                                                                value={values.contactPersonName}
                                                            />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Contact Person Number</Form.Label>
                                                            <Field
                                                                type="text"
                                                                placeholder="Number"
                                                                className="form-control"
                                                                name="contactPersonNumber"
                                                                value={values.contactPersonNumber} />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={12}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Remarks
                                                                <small className='float-end'>max 250 character</small>
                                                            </Form.Label>
                                                            <Field as="textarea" className="form-control"
                                                                placeholder='remarks'
                                                                name="remarks" value={values.remarks} />
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                        <Accordion.Item eventKey="approvaldetails">
                                            <Accordion.Header>Approval Details</Accordion.Header>
                                            <Accordion.Body className='p-2'>
                                                <Row>
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Society </Form.Label>
                                                            <Select
                                                                // options={society}
                                                                placeholder="Select Society"
                                                                classNamePrefix="Select2"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Property </Form.Label>
                                                            <Select
                                                                // options={property}
                                                                placeholder="Select property"
                                                                classNamePrefix="Select2"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Tower </Form.Label>
                                                            <Select
                                                                // options={wing}
                                                                placeholder="Select Tower"
                                                                classNamePrefix="Select2"
                                                            />
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Wing </Form.Label>
                                                            <Select
                                                                // options={wing}
                                                                placeholder="Select Wing"
                                                                classNamePrefix="Select2"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Flat </Form.Label>
                                                            <Select
                                                                // options={flat}
                                                                placeholder="Select Flat"
                                                                classNamePrefix="Select2"
                                                            />
                                                        </Form.Group>
                                                    </Col>



                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Approver Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="approverName"
                                                                placeholder="Approver Name"
                                                                className="form-control"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Approver Contact</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                name="contactdetails"
                                                                placeholder="Contact"
                                                                className="form-control"
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Designation </Form.Label>
                                                            <Select
                                                                // options={designation}
                                                                placeholder="Select Designation"
                                                                classNamePrefix="Select2"
                                                            />
                                                        </Form.Group>
                                                    </Col>


                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </Accordion>

                                    <Col xl={12} className='p-0'>
                                        {/* <label><input type="checkbox" className='float-start m-2' />
                        <b className='float-start mt-1 cursor'
                         onClick={() => { viewDemoShow("termsconditionsview"); }}> Terms & Conditions</b></label> */}
                                    </Col>

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
                                        Close
                                    </Button>
                                    <Button variant="primary" type='submit'>
                                        {editing ? "Update" : "Save"}
                                    </Button>


                                </Modal.Footer>
                                <CustomToastContainer />

                            </FormikForm>
                        )
                    }}

                </Formik>

            </Modal>



        </>
    )
}
export default GatePassModal;