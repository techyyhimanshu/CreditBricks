import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi, getPropertiesOfSocietyApi, getSocietyDetailsApi } from "../../api/society-api";
import { handleApiError } from "../../helpers/handle-api-error";
import { showToast, CustomToastContainer } from "../services/toastServices";
import { Field, Formik, Form as FormikForm } from "formik";
import { getSocietyVenueApi } from "../../api/application-api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface ProductModalProps {
    show: boolean;
    onSave?: (values: any, modal: string, editing: boolean) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    name: string;
    isShow?: boolean;
    editing: boolean;
    eventVenue?: string;
    initialVals?: any;
    modal: string

}

const EventModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing, eventVenue, name, onSave, modal }) => {
    const [societiesForDropDown, setSocietiesForDropDown] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    const [, setCommiteeMemberData] = useState<any>(null);
    const [venuesForDropDown, setVenuesForDropDown] = useState([]);
    const { society } = useSelector((state: RootState) => state.auth)



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
    const fetchVenuesForSociety = async (society: any) => {
        try {
            const response = await getSocietyVenueApi(society.value);
            // const response = await getAllVenueApi();
            const formattedData = response.data.data.map((item: any) => ({
                value: item.venueId,
                label: item.venueName,
            }));
            setVenuesForDropDown(formattedData);
        } catch (error) {
            const errorMessage = handleApiError(error)
            showToast("error", errorMessage)
        }
    }

    const fetchApproverDetails = async (society: any, setFieldValue: any) => {
        try {
            const response = await getSocietyDetailsApi(society.value)
            const members = response.data.data?.committeeMembers || [];

            const matched = members.find((member: any) =>
                Array.isArray(member.applicationType) &&
                member.applicationType.includes(name)
            );
            if (matched) {
                setFieldValue("tower", { value: matched.towerIdentifier, label: matched.towerName });
                setFieldValue("wing", { value: matched.wingIdentifier, label: matched.wingName });
                setFieldValue("approverSociety", { value: matched.societyIdentifier, label: matched.societyName });
                setFieldValue("approverProperty", { value: matched.propertyIdentifier, label: matched.propertyName });
                setFieldValue("approverName", matched.fullName);
                setFieldValue("approverContact", matched.contactNumber);
                setFieldValue("designation", { value: matched.designation, label: matched.designation });
            }
            setCommiteeMemberData(matched)
        } catch (error: any) {
            const errorMessage = handleApiError(error)
            showToast('error', errorMessage)
        }
    }

    const occasion = [
        { value: "Birthday", label: "Birthday" },
        { value: "Marriage", label: "Marriage" },
        { value: "House Warming", label: "House Warming" },
        { value: "Naming Ceremony", label: "Naming Ceremony" },
        { value: "Anniversary", label: "Anniversary" },
        { value: "Festivals", label: "Festivals" },
        { value: "Reunion", label: "Reunion" },
        { value: "Retirement", label: "Retirement" },
        { value: "Get Together", label: "Get Together" },
        { value: "Event", label: "Event" },
        { value: "Camp", label: "Camp" },
        { value: "Other", label: "Other" },
    ]

    const day = [
        { value: "Full Day", label: "Full Day" },
        { value: "First Half", label: "First Half" },
        { value: "Second Half", label: "Second Half" },
    ]


    // const venue = [
    //     { value: "Flat", label: "Flat" },
    //     { value: "Banquet Hall", label: "Banquet Hall" },
    //     { value: "Parking Area", label: "Parking Area" },
    //     { value: "Club House", label: "Club House" },
    //     { value: "Play Area", label: "Play Area" },
    //     { value: "Pool Area", label: "Pool Area" },
    //     { value: "Food Court", label: "Food Court" },
    // ]


    const handleSubmit = async (values: any) => {
        try {
            const formattedData: any = {
                propertyIdentifier: values?.property?.value,
                applicationType: name,
                occasionId: values?.occasion?.value,
                shift: values?.day?.value,
                startDate: values?.entryDateTime,
                endDate: values?.exitDateTime,
                venueId: values?.venue?.value,
                organizer: values?.organizerName,
                contact: `${values?.contactNo}`,
                remark: values?.remarks,
                catering: values?.CateringService === "Yes",
                decorations: values?.Decorations === "Yes",
                sound: values?.SoundSystem === "Yes",
                guestParking: values?.GuestParking === "Yes",
                createdBy: "admin_user"
            };
            if (editing) {
                formattedData.eventId = initialVals?.eventId
            }
            if (onSave) {
                onSave(formattedData, modal, editing)
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

    const formatDateTimeUTC = (isoString: string) => {
        if (!isoString) return "";
        return isoString.slice(0, 16); // trims to 'YYYY-MM-DDTHH:mm'
    };


    return (
        <>
            <Modal show={show} size="xl" centered>
                <Modal.Header>
                    <Modal.Title>{name}</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues=
                    {{
                        society: initialVals ? { label: initialVals.society?.societyName, value: initialVals.society?.societyIdentifier } : { label: society?.label || "", value: society?.value || "" },
                        property: initialVals ? { label: initialVals.property?.propertyName, value: initialVals.property?.propertyIdentifier } : { label: "", value: "" },
                        venue: initialVals ? { label: initialVals.venue?.venueName, value: initialVals.venue?.venueId } : { label: "", value: "" },
                        occasion: initialVals ? { label: initialVals.occasionId, value: initialVals.occasionId } : { label: "", value: "" },
                        day: initialVals ? { label: initialVals.shift, value: initialVals.shift } : { label: "", value: "" },
                        guestNo: initialVals ? initialVals.guestCount : "",
                        entryDateTime: initialVals ? formatDateTimeUTC(initialVals.startDate) : "",
                        exitDateTime: initialVals ? formatDateTimeUTC(initialVals.endDate) : "",
                        organizerName: initialVals ? initialVals.organizer : "",
                        contactNo: initialVals ? initialVals.contact : "",
                        remarks: initialVals ? initialVals.remark : "",
                        CateringService: initialVals?.catering === true ? "Yes" : initialVals?.catering === false ? "No" : "",
                        Decorations: initialVals?.decorations === true ? "Yes" : initialVals?.decorations === false ? "No" : "",
                        SoundSystem: initialVals?.sound === true ? "Yes" : initialVals?.sound === false ? "No" : "",
                        GuestParking: initialVals?.guestParking === true ? "Yes" : initialVals?.guestParking === false ? "No" : "",
                        tower: { value: initialVals?.towerIdentifier || "", label: initialVals?.towerName || "" },
                        wing: { value: initialVals?.wingIdentifier || "", label: initialVals?.wingName || "" },
                        approverSociety: { value: initialVals?.socityIdentifier || "", label: initialVals?.societyName || "" },
                        approverProperty: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        approverName: initialVals?.fullName || "",
                        approverContact: initialVals?.contactNumber || "",
                        designation: { value: initialVals?.designation || "", label: initialVals?.designation || "" },

                    }}
                    onSubmit={handleSubmit}>
                    {({ values, handleChange, setFieldValue }) => {
                        const forcedVenue = eventVenue;

                        useEffect(() => {
                            if (forcedVenue) {
                                const matchedVenue = venuesForDropDown.find((v: any) => v.label === forcedVenue);
                                if (matchedVenue) {
                                    setFieldValue("venue", matchedVenue);
                                }
                            }
                        }, [forcedVenue, setFieldValue, venuesForDropDown]);
                        useEffect(() => {
                            if (society&&!initialVals) {
                                setFieldValue("society", society);
                                fetchPropertiesForDropDown(society);
                                fetchVenuesForSociety(society)
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
                                                                    fetchVenuesForSociety(selected)
                                                                    fetchApproverDetails(selected, setFieldValue)
                                                                    setFieldValue("society", selected);
                                                                }}
                                                                isDisabled={initialVals && !editing}
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
                                                                isDisabled={initialVals && !editing}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Occassion </Form.Label>
                                                            <Select
                                                                options={occasion}
                                                                name="occasion"
                                                                value={values.occasion}
                                                                onChange={(selected) => {
                                                                    setFieldValue("occasion", selected);
                                                                }}
                                                                placeholder="Select type"
                                                                classNamePrefix="Select2"
                                                                isDisabled={initialVals && !editing}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="2">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Day </Form.Label>
                                                            <Select
                                                                options={day}
                                                                name="day"
                                                                value={values.day}
                                                                onChange={(selected) => {
                                                                    setFieldValue("day", selected);
                                                                }}
                                                                placeholder="Select type"
                                                                classNamePrefix="Select2"
                                                                isDisabled={initialVals && !editing}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="2">
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>No. of Guest </Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Number"
                                                                className="form-control"
                                                                name="guestNo"
                                                                value={values.guestNo}
                                                                onChange={handleChange}
                                                                disabled={initialVals && !editing}
                                                            ></Form.Control>
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>

                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Start Date & Time</Form.Label>
                                                            <InputGroup className="input-group w-100 datetimepicker-2">

                                                                <Field
                                                                    className="form-control"
                                                                    id="datetime-local"
                                                                    type="datetime-local"
                                                                    defaultValue="2020-01-16T14:22"
                                                                    name="entryDateTime"
                                                                    value={values.entryDateTime}
                                                                    disabled={initialVals && !editing}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={4}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>End Date & Time</Form.Label>
                                                            <InputGroup className="input-group w-100 datetimepicker-2">

                                                                <Field
                                                                    className="form-control"
                                                                    id="datetime-local"
                                                                    type="datetime-local"
                                                                    defaultValue="2020-01-16T14:22"
                                                                    name="exitDateTime"
                                                                    value={values.exitDateTime}
                                                                    disabled={initialVals && !editing}
                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Venue </Form.Label>
                                                            <Select
                                                                options={venuesForDropDown}
                                                                placeholder="Select venue"
                                                                classNamePrefix="Select2"
                                                                name="venue"
                                                                value={values.venue}
                                                                onChange={(selected) => {
                                                                    setFieldValue("venue", selected);
                                                                }}
                                                                isDisabled={!!forcedVenue || (initialVals && !editing)}
                                                            />
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Name of the Organizer </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Name"
                                                                className="form-control"
                                                                name="organizerName"
                                                                value={values.organizerName}
                                                                onChange={handleChange}
                                                                disabled={initialVals && !editing}
                                                            ></Form.Control>
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Contact Details</Form.Label>
                                                            <Form.Control
                                                                type="number"
                                                                placeholder="Number"
                                                                className="form-control"
                                                                name="contactNo"
                                                                value={values.contactNo}
                                                                onChange={handleChange}
                                                                disabled={initialVals && !editing}
                                                            ></Form.Control>
                                                            {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl={12}>
                                                        <Form.Group className="form-group mb-0">
                                                            <Form.Label>Does this celebration include any of the following?</Form.Label>

                                                            <Row className="mt-2">
                                                                <Col lg={10}>
                                                                    <Form.Label className='text-muted'>Catering Service</Form.Label>
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="CateringService"
                                                                        value="Yes"
                                                                        as={Form.Check}
                                                                        label="Yes"
                                                                        checked={values.CateringService === "Yes"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="CateringService"
                                                                        value="No"
                                                                        as={Form.Check}
                                                                        label="No"
                                                                        checked={values.CateringService === "No"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2">
                                                                <Col lg={10}>
                                                                    <Form.Label className='text-muted'>Decorations</Form.Label>
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="Decorations"
                                                                        value="Yes"
                                                                        as={Form.Check}
                                                                        label="Yes"
                                                                        checked={values.Decorations === "Yes"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="Decorations"
                                                                        value="No"
                                                                        as={Form.Check}
                                                                        label="No"
                                                                        checked={values.Decorations === "No"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2">
                                                                <Col lg={10}>
                                                                    <Form.Label className='text-muted'>Sound System</Form.Label>
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="SoundSystem"
                                                                        value="Yes"
                                                                        as={Form.Check}
                                                                        label="Yes"
                                                                        checked={values.SoundSystem === "Yes"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="SoundSystem"
                                                                        value="No"
                                                                        as={Form.Check}
                                                                        label="No"
                                                                        checked={values.SoundSystem === "No"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                            </Row>

                                                            <Row className="mt-2">
                                                                <Col lg={10}>
                                                                    <Form.Label className='text-muted'>Guest Parking</Form.Label>
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="GuestParking"
                                                                        value="Yes"
                                                                        as={Form.Check}
                                                                        label="Yes"
                                                                        checked={values.GuestParking === "Yes"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                                <Col lg={1} className='mt-2'>
                                                                    <Field
                                                                        type="radio"
                                                                        name="GuestParking"
                                                                        value="No"
                                                                        as={Form.Check}
                                                                        label="No"
                                                                        checked={values.GuestParking === "No"}
                                                                        disabled={initialVals && !editing}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </Form.Group>
                                                    </Col>


                                                    <Col xl={12}>
                                                        <Form.Group className="form-group">
                                                            <Form.Label>Remarks
                                                                <small className='text-muted float-end'>max 250 Character</small>
                                                            </Form.Label>
                                                            <textarea className="form-control" placeholder='Remarks' name="remarks" value={values.remarks} onChange={handleChange} disabled={initialVals && !editing}></textarea>
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
export default EventModal;