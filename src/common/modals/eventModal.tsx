import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi, getPropertiesOfSocietyApi } from "../../api/society-api";
import { handleApiError } from "../../helpers/handle-api-error";
import { showToast, CustomToastContainer } from "../services/toastServices";
import { Field, Formik, Form as FormikForm } from "formik";
import { createNewGatePassApi } from "../../api/application-api";

interface ProductModalProps {
    show: boolean;
    // onSave: (values: any) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    name:string;
    isShow?: boolean;
    editing: boolean;
    eventVenue?: string;
    initialVals?: any;


}

const EventModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing, eventVenue, name }) => {
    const [societiesForDropDown, setSocietiesForDropDown] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);

    useEffect(() => {
        // fetchSocietiesForDropDown()
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

    const venue = [
        { value: "Flat", label: "Flat" },
        { value: "Banquet Hall", label: "Banquet Hall" },
        { value: "Parking Area", label: "Parking Area" },
        { value: "Club House", label: "Club House" },
        { value: "Play Area", label: "Play Area" },
        { value: "Pool Area", label: "Pool Area" },
        { value: "Food Court", label: "Food Court" },
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
                remarks: values.remarks
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
                    <Modal.Title>{name}</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    initialValues=
                    {{
                        society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
                        property: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
                        venue: initialVals ? { label: initialVals.venue, value: initialVals.venue } : { label: "", value: "" },
                        occasion: initialVals ? { label: initialVals.occasion, value: initialVals.occasion } : { label: "", value: "" },
                        day: initialVals ? { label: initialVals.day, value: initialVals.day } : { label: "", value: "" },
                        guestNo: initialVals ? initialVals.guestNo : "",
                        entryDateTime: initialVals ? initialVals.entryDateTime : "",
                        exitDateTime: initialVals ? initialVals.exitDateTime : "",
                        organizerName: initialVals ? initialVals.organizerName : "",
                        contactNo: initialVals ? initialVals.contactNo : "",
                        remarks: initialVals ? initialVals.remarks : "",
                        CateringService: initialVals ? initialVals.CateringService : "",
                        Decorations: initialVals ? initialVals.Decorations : "",
                        SoundSystem: initialVals ? initialVals.SoundSystem : "",
                        GuestParking: initialVals ? initialVals.GuestParking : ""

                    }}
                    onSubmit={handleSubmit}>
                    {({ values, handleChange, setFieldValue }) => {
                        const forcedVenue = eventVenue; 

                        useEffect(() => {
                            if (forcedVenue) {
                                const matchedVenue = venue.find(v => v.value === forcedVenue);
                                if (matchedVenue) {
                                    setFieldValue("venue", matchedVenue);
                                }
                            }
                        }, [forcedVenue, setFieldValue, venue]);
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
                                                                onChange={handleChange}
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

                                                                />
                                                            </InputGroup>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xl="4">
                                                        <Form.Group className="form-group mb-1">
                                                            <Form.Label>Venue </Form.Label>
                                                            <Select
                                                                options={venue}
                                                                placeholder="Select venue"
                                                                classNamePrefix="Select2"
                                                                name="venue"
                                                                value={values.venue}
                                                                onChange={(selected) => {
                                                                    setFieldValue("venue", selected);
                                                                }}
                                                                isDisabled={!!forcedVenue}
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
                                                                onChange={handleChange}
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
                                                                onChange={handleChange}
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
                                                            <textarea className="form-control" placeholder='Remarks'></textarea>
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
export default EventModal;