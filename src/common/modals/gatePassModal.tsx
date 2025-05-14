import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Modal, Row, Card, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { imagesData } from "../../common/commonimages";
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi, getPropertiesOfSocietyApi, getSocietyDetailsApi } from "../../api/society-api";
import { handleApiError } from "../../helpers/handle-api-error";
import { showToast, CustomToastContainer } from "../services/toastServices";
import { Field, Formik, Form as FormikForm } from "formik";
import { getMembersOfPropertyApi, getPropertyOutstandingAmountApi, getTenantsOfPropertyApi } from "../../api/property-api";
import { getVendorForDropDownApi } from "../../api/vendor-api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProductModalProps {
    show: boolean;
    onSave: (values: any, editing: boolean) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;
}

const GatePassModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing, onSave }) => {
    const [societiesForDropDown, setSocietiesForDropDown] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    const [tenantsForDropDown, setTenantsForDropDown] = useState([]);
    const [membersForDropDown, setMembersForDropDown] = useState([]);
    const [vendorsForDropDown, setVendorsForDropDown] = useState([]);

    const [tenatview, settenatview] = useState(false);

    const [vendorview, setvendorview] = useState(false);
    const { society } = useSelector((state: RootState) => state.auth)

    const viewDemoShow = (modal: any) => {
        switch (modal) {


            case "tenatview":
                settenatview(true);
                break;

            case "vendorview":
                setvendorview(true);
                break;

        }
    };

    const viewDemoClose = (modal: any) => {
        switch (modal) {



            case "tenatview":
                settenatview(false);
                break;

            case "vendorview":
                setvendorview(false);
                break;


        }
    };


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
    const fetchTenantsForDropDown = async (propertyIdentifier: string) => {
        try {
            const response = await getTenantsOfPropertyApi(propertyIdentifier);
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
    const fetchMembersForDropDown = async (propertyIdentifier: string) => {
        try {
            const response = await getMembersOfPropertyApi(propertyIdentifier);
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

    const fetchApproverDetails = async (society: any, setFieldValue: any) => {
        try {
            const response = await getSocietyDetailsApi(society.value)
            const members = response.data.data?.committeeMembers || [];
            const parentMembers = response.data.data?.parentSociety?.parentSociety?.committeeMembers || [];


            const matched = members.find((member: any) =>
                Array.isArray(member.applicationType) &&
                member.applicationType.includes("Gate Pass")
            );
            

            const parentMatched = parentMembers.find((member: any) =>
                Array.isArray(member.applicationType) &&
                member.applicationType.includes("Gate Pass")
            );
            if (matched) {
                setFieldValue("tower", { value: matched.towerIdentifier, label: matched.towerName });
                setFieldValue("wing", { value: matched.wingIdentifier, label: matched.wingName });
                setFieldValue("approverSociety", { value: matched.societyIdentifier, label: matched.societyName });
                setFieldValue("approverProperty", { value: matched.propertyIdentifier, label: matched.propertyName });
                setFieldValue("approverName", matched.fullName);
                setFieldValue("approverContact", matched.contactNumber);
                setFieldValue("committeeMemberId", matched.committeeMemberId);
                setFieldValue("designation", { value: matched.designation, label: matched.designation });
            }
            if (parentMatched) {
                setFieldValue("hasParentApprover", "true");
                setFieldValue("parentApproverName", parentMatched.fullName);
                setFieldValue("parentApproverContact", parentMatched.contactNumber);
                setFieldValue("parentCommitteeMemberId", parentMatched.parentCommitteeMemberId);
                setFieldValue("parentDesignation", {
                    value: parentMatched.designation,
                    label: parentMatched.designation
                });
                setFieldValue("parentSocietyName", { label: response.data.data.parentSociety?.parentSociety?.parentSocietyName || "", value: response.data.data.parentSociety?.parentSocietyIdentifier || "" });
            } else if (!parentMatched) {
                setFieldValue("hasParentApprover", "false");
            }
        } catch (error: any) {
            const errorMessage = handleApiError(error)
            showToast('error', errorMessage)
        }
    }

    const fetchOutstandingAmount = async (property: any, setFieldValue: any) => {
        try {
            const response = await getPropertyOutstandingAmountApi(property.value);
            setFieldValue("outstandingAmount", response.data.data)

        } catch (error) {
            const errorMessage = handleApiError(error);
            showToast("error", errorMessage);
        }
    };

    const handleSubmit = async (values: any) => {
        try {
            const formattedData: any = {
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
                remarks: values.remarks,
                tower: { value: initialVals?.towerIdentifier || "", label: initialVals?.towerName || "" },
                wing: { value: initialVals?.wingIdentifier || "", label: initialVals?.wingName || "" },
                approverSociety: { value: initialVals?.socityIdentifier || "", label: initialVals?.societyName || "" },
                approverProperty: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                approverName: initialVals?.fullName || "",
                approverContact: initialVals?.contactNumber || "",
                designation: { value: initialVals?.designation || "", label: initialVals?.designation || "" },
                committeeMemberId:values.committeeMemberId||"",
                parentCommitteeMemberId:values.parentCommitteeMemberId||""

            }
            if (editing) {
                formattedData.gatePassNumber = initialVals.gatePassNumber
            }
            if (onSave) {
                onSave(formattedData, editing)
            }
            // const response = await createNewGatePassApi(formattedData)
            // if (response.status === 200) {
            //     showToast("success", "Gate pass created successfully")
            // }
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
                        society: initialVals ? { label: initialVals.society?.societyName, value: initialVals.society?.societyIdentifier } : { label: "", value: "" },
                        property: initialVals ? { label: initialVals.property?.propertyName, value: initialVals.property?.propertyIdentifier } : { label: "", value: "" },
                        gateType: initialVals ? { label: initialVals.gateType, value: initialVals.gateTypeIdentifier } : { label: "", value: "" },
                        category: initialVals ? { label: initialVals.category, value: initialVals.gateTypeCategoryIdentifier } : { label: "", value: "" },
                        subCategory: initialVals ? { label: initialVals.subCategory, value: initialVals.gateTypeSubCategoryIdentifier } : { label: "", value: "" },
                        entryDateTime: initialVals ? initialVals.entryDateTime : "",
                        exitDateTime: initialVals ? initialVals.exitDateTime : "",
                        gatePassNumber: initialVals ? initialVals.gatePassNumber : "",
                        outstandingAmount: initialVals ? initialVals.outstandingAmount : "",
                        member: initialVals ? { label: `${initialVals.user.firstName || ""} ${initialVals.user.middleName || ""} ${initialVals.user.lastName || ""}`.replace(/\s+/g, " ").trim(), value: initialVals.user?.identifier } : { label: "", value: "" },
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
                        tower: { value: initialVals?.towerIdentifier || "", label: initialVals?.towerName || "" },
                        wing: { value: initialVals?.wingIdentifier || "", label: initialVals?.wingName || "" },
                        approverSociety: { value: initialVals?.socityIdentifier || "", label: initialVals?.societyName || "" },
                        approverProperty: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        approverName: initialVals?.fullName || "",
                        approverContact: initialVals?.contactNumber || "",
                        designation: { value: initialVals?.designation || "", label: initialVals?.designation || "" },
                        hasParentApprover: "false",
                        parentApproverName: initialVals?.fullName || "",
                        parentApproverContact: initialVals?.contactNumber || "",
                        parentDesignation: { value: initialVals?.parentDesignation || "", label: initialVals?.parentDesignation || "" },
                        parentSocietyName: { value: "", label: "" },
                        committeeMemberId: "",
                        parentCommitteeMemberId: ""
                    }}
                    onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => {
                        useEffect(() => {
                            if (society) {
                                setFieldValue("society", society);
                                fetchPropertiesForDropDown(society);
                                fetchApproverDetails(society, setFieldValue)
                            }
                        }, [society]);
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
                                                                    fetchApproverDetails(selected, setFieldValue)
                                                                }}
                                                                isDisabled
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
                                                                    fetchOutstandingAmount(selected, setFieldValue)
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
                                                                        case "Tenant": fetchTenantsForDropDown(values.property.value)
                                                                            break;
                                                                        case "Member": fetchMembersForDropDown(values.property.value)
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
                                                                name="gatePassNumber"
                                                                value={values.gatePassNumber}
                                                                placeholder="Gate Pass Number"
                                                                className="form-control"
                                                            ></Form.Control>
                                                            {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Outstanding Amount
                                                                <Link to={``} className="float-end text-white rounded-1 bg-primary ps-1">Pay Now</Link>
                                                            </Form.Label>
                                                            <Field
                                                                type="text"
                                                                disabled
                                                                name="outstandingAmount"

                                                                placeholder="Outstanding Amount"
                                                                className="form-control"
                                                            />
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
                                                                <Form.Label>Tenant <span className='text-info float-end cursor' onClick={() => { viewDemoShow("tenatview"); }}
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
                                                                <Form.Label>Vendor <span className='text-info float-end cursor' onClick={() => { viewDemoShow("vendorview"); }}>View Vendor Detail</span> </Form.Label>
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

                                        <Accordion.Item eventKey="Documentdetails">
                                            <Accordion.Header>Document Details</Accordion.Header>
                                            <Accordion.Body>
                                                <Row>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Sale Agreement Copy</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="Yes" name="transferdocument" />
                                                                </Col>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="No" name="transferdocument" />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Flat Registration Certificate</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="Yes" name="transferdocument" />
                                                                </Col>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="No" name="transferdocument" />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Home Loan Sanction Letter</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="Yes" name="transferdocument" />
                                                                </Col>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="No" name="transferdocument" />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Old Owner Home Loan Closure Letter</Form.Label>
                                                            <Row>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="Yes" name="transferdocument" />
                                                                </Col>
                                                                <Col lg={3}>

                                                                    <Form.Check type="radio" label="No" name="transferdocument" />
                                                                </Col>

                                                            </Row>
                                                        </Form.Group>
                                                    </Col>





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
                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Society </Form.Label>
                                                            <Select
                                                                name='approverSociety'
                                                                placeholder="Select Society"
                                                                classNamePrefix="Select2"
                                                                onChange={(selected) => setFieldValue("approverSociety", selected)}
                                                                value={values.approverSociety}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>



                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Tower </Form.Label>
                                                            <Select
                                                                // options={towerOptions}
                                                                placeholder="Select Tower"
                                                                classNamePrefix="Select2"
                                                                name='tower'
                                                                onChange={(selected) => {
                                                                    // fetchWingsForDropDown(selected);
                                                                    // setFieldValue("wing", null);
                                                                    // setFieldValue("property", null);
                                                                    setFieldValue("tower", selected);
                                                                }}
                                                                value={values.tower}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Wing </Form.Label>
                                                            <Select
                                                                placeholder="Select Wing"
                                                                classNamePrefix="Select2"
                                                                name='wing'
                                                                onChange={(selected) => {
                                                                    // fetchPropertiesForDropDown(selected);
                                                                    // setFieldValue("property", null);
                                                                    setFieldValue("wing", selected);
                                                                }}
                                                                value={values.wing}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Property </Form.Label>
                                                            <Select
                                                                placeholder="Select property"
                                                                options={propertiesForDropDown}
                                                                classNamePrefix="Select2"
                                                                name='approverProperty'
                                                                onChange={(selected) => setFieldValue("approverProperty", selected)}
                                                                value={values.approverProperty}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Approver Name</Form.Label>
                                                            <Field
                                                                type="text"
                                                                name="approverName"
                                                                placeholder="Approver Name"
                                                                className="form-control"
                                                                value={values.approverName}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Approver Contact</Form.Label>
                                                            <Field
                                                                type="text"
                                                                name="approverContact"
                                                                placeholder="Contact"
                                                                className="form-control"
                                                                value={values.approverContact}
                                                                disabled
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={6}>
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Designation </Form.Label>
                                                            <Select
                                                                // options={designation}
                                                                placeholder="Select Designation"
                                                                classNamePrefix="Select2"
                                                                name='designation'
                                                                onChange={(selected) => setFieldValue("designation", selected)}
                                                                value={values.designation}
                                                                isDisabled
                                                            />
                                                        </Form.Group>
                                                    </Col>







                                                </Row>

                                                {values.hasParentApprover === "true" && (
                                                    <>
                                                        <hr />
                                                        <h6>Parent Approver Details</h6>
                                                        <Row>
                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Approver Name</Form.Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="parentApproverName"
                                                                        placeholder="Parent Approver Name"
                                                                        className="form-control"
                                                                        value={values.parentApproverName}
                                                                        disabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Approver Contact</Form.Label>
                                                                    <Field
                                                                        type="text"
                                                                        name="parentApproverContact"
                                                                        placeholder="Parent Contact"
                                                                        className="form-control"
                                                                        value={values.parentApproverContact}
                                                                        disabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Designation</Form.Label>
                                                                    <Select
                                                                        placeholder="Parent Designation"
                                                                        classNamePrefix="Select2"
                                                                        name="parentDesignation"
                                                                        onChange={(selected) => setFieldValue("parentDesignation", selected)}
                                                                        value={values.parentDesignation}
                                                                        isDisabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>

                                                            <Col xl={6}>
                                                                <Form.Group className="form-group mb-1">
                                                                    <Form.Label>Parent Society Name</Form.Label>
                                                                    <Select
                                                                        name='parentSocietyName'
                                                                        placeholder="Select Society"
                                                                        classNamePrefix="Select2"
                                                                        onChange={(selected) => setFieldValue("parentSocietyName", selected)}
                                                                        value={values.parentSocietyName}
                                                                        isDisabled
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        </Row>

                                                    </>
                                                )}

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

            {/* Tenant View */}
            <Modal show={tenatview} size="xl" centered>
                <Modal.Header>
                    <Modal.Title>Tenant Details</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("tenatview"); }}>
                        x
                    </Button>
                </Modal.Header>

                <Modal.Body className='bg-light'>
                    <Row>
                        <Col xl={8}>
                            <Card>
                                <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-10">Basic Details</h5>
                                    <Row>
                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Society Name</Form.Label>
                                            <Link to={`${import.meta.env.BASE_URL}society/societyview`} className='tx-15 text-info'>N/A</Link>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Property Name</Form.Label>
                                            <Link to={`${import.meta.env.BASE_URL}property/propertyview`} className='tx-15 text-info'>N/A</Link>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Tenant Name</Form.Label>
                                            <p className='tx-15'>Rohit Sharma</p>
                                        </Col>
                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Tenant Number</Form.Label>
                                            <p className='tx-15 col-sm-11 p-0'>1212621024</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Alternative Mobile</Form.Label>
                                            <p className='tx-15 col-sm-11 p-0'>-</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Tenant Email</Form.Label>
                                            <p className='tx-15'>orhit@gmail.com</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Date Of Birth</Form.Label>
                                            <p className='tx-15'>2025-02-27</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Address</Form.Label>
                                            <p className='tx-15 col-sm-11 p-0'>123st lauren</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>City</Form.Label>
                                            <p className='tx-15'>Delhi</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>State</Form.Label>
                                            <p className='tx-15'>Delhi</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Country</Form.Label>
                                            <p className='tx-15'>India</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Pincode</Form.Label>
                                            <p className='tx-15'>250007</p>
                                        </Col>


                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Family Members</Form.Label>
                                            <p className='tx-15'>8</p>
                                        </Col>

                                        <Col xl={6} className='mb-2'>
                                            <Form.Label>Pets</Form.Label>
                                            <p className='tx-15'>false</p>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>

                        </Col>

                        <Col xl={4}>

                            <Card>
                                <Card.Body className='pb-3'>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Current Lease</h5>
                                    <Row>
                                        <Col xl={6}>
                                            <p className='mb-0 text-muted'>Agreement Start Date</p>
                                            <p className='tx-15 tx-semibold'>2025-02-28</p>
                                            <p className='mb-0 text-muted'>Agreement End Date</p>
                                            <p className='tx-15 tx-semibold mb-2'>2025-04-05</p>
                                        </Col>
                                        <Col xl={6} className='text-end'>
                                            <p className='mb-0 text-muted'>Monthly Rent</p>
                                            <p className='tx-15 tx-semibold text-primary'>₹ 5000</p>
                                            <p className='mb-0 pt-2 text-muted'></p>
                                            {/* <p className='tx-12 pt-3 mb-2 tx-danger'>Rent agreement is expired.</p> */}
                                        </Col>

                                        <Col xl={12}>

                                            <Row>
                                                <Col xl={6} className='text-muted text-bold'>
                                                    180 days left
                                                </Col>
                                                <Col xl={6} className='text-end text-muted text-bold'>
                                                    365 days left
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col xl={6}>
                                            <p className='mb-0 mt-2 text-muted'>Due Amount</p>
                                            <p className='tx-15 tx-semibold'>₹ 1000</p>
                                        </Col>
                                        <Col xl={6}>
                                            <p className='mb-0 mt-2 text-muted text-end'>Deposit Amount</p>
                                            <p className='tx-15 tx-semibold mb-0 text-end'>₹ 4000</p>
                                        </Col>

                                    </Row>

                                </Card.Body>

                            </Card>


                            <Card>
                                <Card.Body className='pb-1'>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Documents</h5>
                                    <Row>
                                        <Col xl={2} className='p-0'>
                                            <img
                                                alt="" className='w-100'
                                                src={imagesData('pdficon')}
                                            />
                                        </Col>
                                        <Col xl={9} className='p-0'>
                                            <p className='tx-14 mb-0 mt-2 tx-semibold'>Rent Registration Id : 565675756</p>
                                            <Link to={``} className="text-info">Download</Link>
                                        </Col>
                                    </Row>


                                    <Row>
                                        <Col xl={2} className='p-0'>
                                            <img alt="" className='w-100'
                                                src={imagesData('pdficon')}
                                            />
                                        </Col>
                                        <Col xl={9} className='p-0'>
                                            <p className='tx-14 mb-0 mt-2 tx-semibold'>Police Verification</p>
                                            <Link to={``}
                                                className="text-info">
                                                Download
                                            </Link>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>


                            <Card>
                                <Card.Body className='pb-1'>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Vehicle Details</h5>
                                    <Row>



                                        <Row>
                                            <Col xl={2} className='p-0'>
                                                <img
                                                    alt="Vehicle Icon"
                                                    className='w-100'
                                                    src={imagesData('pdficon')} // You can use any relevant icon for vehicle files
                                                />
                                            </Col>
                                            <Col xl={9} className='p-0'>
                                                <p className='tx-14 mb-0 mt-2 tx-semibold'>
                                                    Vehicle No. dl1ct1004  <span className='text-muted'>(4Wheeler)</span>
                                                </p>
                                                <Link to={``}
                                                    className="text-info" >
                                                    Download
                                                </Link>
                                            </Col>
                                        </Row>

                                    </Row>
                                </Card.Body>
                            </Card>


                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>

            {/* Vendor View */}
            <Modal show={vendorview} size="xl" centered>
                <Modal.Header>
                    <Modal.Title>Vendor Details</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={() => { viewDemoClose("vendorview"); }}>
                        x
                    </Button>
                </Modal.Header>

                <Modal.Body className='bg-light'>
                    <Row>
                        <Col xl={8}>
                            <Card>
                                <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Basic Details</h5>
                                    <Row>
                                        <Col xl={6}>
                                            <FormLabel>Vendor Name</FormLabel>
                                            <p className='tx-15'>Siddhi solutions</p>
                                        </Col>


                                        <Col xl={6}>
                                            <FormLabel>Vendor Address</FormLabel>
                                            <p className='tx-15'>Ghaziabad</p>
                                        </Col>

                                        <Col xl={6}>
                                            <FormLabel>GST Number</FormLabel>
                                            <p className='tx-15'>GSTIN768JU</p>
                                        </Col>

                                        <Col xl={6}>
                                            <FormLabel>PAN Number</FormLabel>
                                            <p className='tx-15'>FUOPH8989N</p>
                                        </Col>


                                        <Col xl={6}>
                                            <FormLabel>Product</FormLabel>
                                            <p className='tx-15'>Security</p>
                                        </Col>



                                        <Col xl={6}>
                                            <FormLabel>Service Type</FormLabel>
                                            <p className='tx-15 col-sm-11 p-0'>On Request</p>
                                        </Col>

                                        <Col xl={6}>
                                            <FormLabel>Frequency</FormLabel>
                                            <p className='tx-1 p-0'>Yearly</p>
                                        </Col>
                                        <hr className='w-100' />
                                        <Col xl={6}>
                                            <FormLabel>Contact Person Name</FormLabel>
                                            <p className='tx-15'>sudhir sharma</p>
                                        </Col>

                                        <Col xl={6}>
                                            <FormLabel>Contact Person Number</FormLabel>
                                            <p className='tx-15'>9528185696</p>
                                        </Col>

                                        <Col xl={6}>
                                            <FormLabel>Contact Value:</FormLabel>
                                            <p className='tx-15'>GST</p>
                                        </Col>


                                    </Row>
                                </Card.Body>
                            </Card>


                        </Col>
                        <Col xl={4} className='p-0 pe-3'>


                            <Card>
                                <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Contract Period Details</h5>
                                    <Row>
                                        <Col xl={5} className='mb-1 tx-12'>Start Date</Col>
                                        <Col xl={7} className='tx-semibold tx-12'>2025-03-01</Col>
                                        <Col xl={5} className='mb-1 tx-12'>End Date</Col>
                                        <Col xl={7} className='tx-semibold tx-12'>2026-03-01</Col>
                                        <Col xl={5} className='mb-1 tx-12'>Total Period Calculation</Col>
                                        <Col xl={7} className='tx-semibold tx-12'>1</Col>
                                        <Col xl={12} className='mb-1 tx-12'>Contact Terms & Conditions
                                        </Col>
                                        <Col xl={12} className='tx-semibold tx-12'>N/A</Col>

                                    </Row>
                                </Card.Body>
                            </Card>



                            <Card>
                                <Card.Body>
                                    <h5 className="card-title main-content-label tx-dark tx-medium mg-b-20">Bank Details Details</h5>
                                    <Row>

                                        <Col xl={5} className='mb-1 tx-12'>Society Bank Name</Col>
                                        <Col xl={7} className='tx-semibold tx-12'>Punjab natinal bank</Col>
                                        <Col xl={5} className='mb-1 tx-12'>Account Number</Col>
                                        <Col xl={7} className='tx-semibold tx-12'>5874963258</Col>
                                        <Col xl={5} className='mb-1 tx-12'>Branch Name</Col>
                                        <Col xl={7} className='tx-semibold tx-12'>Tigri</Col>
                                        <Col xl={5} className='mb-1 tx-12 '>IFSC Code</Col>
                                        <Col xl={7} className='tx-semibold tx-12'>PUNB789U</Col>

                                    </Row>
                                </Card.Body>
                            </Card>



                        </Col>
                    </Row>
                </Modal.Body>

            </Modal>

        </>
    )
}
export default GatePassModal;