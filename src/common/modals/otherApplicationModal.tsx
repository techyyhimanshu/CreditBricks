import { useEffect, useState } from "react";
import { Accordion, Button, Col, Form, InputGroup, Modal, Nav, Row, Tab } from "react-bootstrap";
import Select from "react-select";
import 'suneditor/dist/css/suneditor.min.css';
import { getAllSocietyApi, getPropertiesOfSocietyApi, getSocietyDetailsApi } from "../../api/society-api";
import { handleApiError } from "../../helpers/handle-api-error";
import { showToast, CustomToastContainer } from "../services/toastServices";
import { Field, Formik, Form as FormikForm } from "formik";
import { getSocietyVenueApi } from "../../api/application-api";

interface ProductModalProps {
    show: boolean;
    onSave?: (values: any,tab:string) => void;
    mode?: string;
    handleEdit?: () => void;
    onClose: () => void;
    isShow?: boolean;
    editing: boolean;
    initialVals?: any;

}

const documentsubmission = [
    { value: "Agreement Copy", label: "Agreement Copy" },
    { value: "Index 2", label: "Index 2" },
    { value: "Rent Agreement", label: "Rent Agreement" },
    { value: "Police Verification", label: "Police Verification" },
    { value: "Loan Sanction Letter", label: "Loan Sanction Letter" },
    { value: "Others", label: "Others" },
]

const otherstype = [
    { value: "Notice", label: "Notice" },
    { value: "Announcement", label: "Announcement" },
    { value: "Community", label: "Community" },
]

const enquiry = [
    { value: "Contact Detials of the Committee Members", label: "Contact Detials of the Committee Members" },
    { value: "Contact Detials of the Members", label: "Contact Detials of the Members" },
    { value: "Access to the Society Documents", label: "Access to the Society Documents" },
    { value: "Contact Detials of the Vendors", label: "Contact Detials of the Vendors" },
    { value: "Property Tax Related", label: "Property Tax Related" },
    { value: "Society Bank Details", label: "Society Bank Details" },
    { value: "Upcoming Events", label: "Upcoming Events" },
    { value: "Others", label: "Others" },
]


const OtherApplicationModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing, onSave, }) => {
    const [societiesForDropDown, setSocietiesForDropDown] = useState<any[]>([]);
    const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);
    const [, setCommiteeMemberData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("documentSubmission");

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
            let formattedData: any = {}
            if (activeTab === "documentSubmission") {
                formattedData = {
                    society: values.society?.value,
                    propertyIdentifier: values.property?.value,
                    documentType: values.documentSubmission?.value,
                    documentFile: values.documentFile,
                    descriptionComment: values.documentComments,
                };
            } else if (activeTab === "enquiry") {
                formattedData = {
                    society: values.society?.value,
                    propertyIdentifier: values.property?.value,
                    enquiryType: values.enquiry?.value,
                    enquiryFile: values.enquiryFile,
                    descriptionComment: values.enquiryComments,
                };
            } else if (activeTab === "other") {
                formattedData = {
                    society: values.society?.value,
                    propertyIdentifier: values.property?.value,
                    otherType: values.otherType?.value,
                    otherFile: values.otherFile,
                    otherComment: values.otherComments,
                };
            }
            if (onSave) {
                onSave(formattedData,activeTab)
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
                    <Modal.Title>Others</Modal.Title>
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues=
                    {{
                        society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
                        property: initialVals ? { label: initialVals.property?.propertyName, value: initialVals.property?.propertyIdentifier } : { label: "", value: "" },
                        documentSubmission: null,
                        documentFile: null,
                        documentComments: "",
                        enquiry: null,
                        enquiryFile: null,
                        enquiryComments: "",
                        otherType: null,
                        otherFile: null,
                        otherComments: "",
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

                        useEffect(() => {
                            setFieldValue("society", { label: "", value: "" });
                            setFieldValue("property", { label: "", value: "" });

                            if (activeTab === "documentSubmission") {
                                setFieldValue("documentSubmission", "");
                                setFieldValue("documentFile", null);
                                setFieldValue("documentComments", "");
                            } else if (activeTab === "enquiry") {
                                setFieldValue("enquiry", "");
                                setFieldValue("enquiryFile", null);
                                setFieldValue("enquiryComments", "");
                            } else if (activeTab === "other") {
                                setFieldValue("otherType", "");
                                setFieldValue("otherFile", null);
                                setFieldValue("otherComments", "");
                            }
                        }, [activeTab]);
                        return (
                            <FormikForm>
                                <Modal.Body className='bg-light'>
                                    <div className="tab-menu-heading tabs-style-4 ps-3">
                                        <div className="tabs-menu ">

                                            <Tab.Container
                                                id="left-tabs-example"
                                                defaultActiveKey="documentSubmission"
                                                onSelect={(k: any) => setActiveTab(k)}
                                            >
                                                <Row>
                                                    <Col sm={3} className='p-0'>
                                                        <Nav variant="pills" className="flex-column">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="documentSubmission" className='rounded-0'>
                                                                    {" "}
                                                                    Document Submission
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="enquiry" className='rounded-0'>
                                                                    {" "}
                                                                    Enquiry
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="other" className='rounded-0'>
                                                                    {" "}
                                                                    Others
                                                                </Nav.Link>
                                                            </Nav.Item>

                                                        </Nav>
                                                    </Col>
                                                    <Col sm={9} className='p-0'>
                                                        <Tab.Content className="tabs-style-4 card ps-4 pb-5 rounded-0">
                                                            <Tab.Pane eventKey="documentSubmission">
                                                                <div
                                                                    className="panel-body tabs-menu-body"
                                                                    id="tab21"
                                                                >
                                                                    <Row>
                                                                        <Col xl={6}>
                                                                            <Form.Group className="form-groupx">
                                                                                <Form.Label className='tx-16'>Society </Form.Label>
                                                                                <Select
                                                                                    name="society"
                                                                                    value={values.society}
                                                                                    options={societiesForDropDown}
                                                                                    onChange={(opt) => {
                                                                                        setFieldValue("society", opt)
                                                                                        fetchPropertiesForDropDown(opt)
                                                                                    }}
                                                                                />

                                                                            </Form.Group>
                                                                        </Col>

                                                                        <Col xl={6}>
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label className='tx-16'>Property </Form.Label>
                                                                                <Select
                                                                                    name="property"
                                                                                    value={values.property}
                                                                                    options={propertiesForDropDown}
                                                                                    onChange={(opt) => setFieldValue("property", opt)}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                    <Form.Group className="form-group">

                                                                        <Form.Label className='tx-16'>Document Submission</Form.Label>
                                                                        <Select
                                                                            name="documentSubmission"
                                                                            value={values.documentSubmission}
                                                                            options={documentsubmission}
                                                                            onChange={(opt) => setFieldValue("documentSubmission", opt)}
                                                                        />
                                                                    </Form.Group>

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                                                        <Form.Control className="form-control"
                                                                            type="file"
                                                                            onChange={(e: any) => setFieldValue("documentFile", e.currentTarget.files[0])}
                                                                        />
                                                                    </Form.Group>

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                                                        <Form.Control as="textarea" className="form-control" placeholder="Textarea"
                                                                            rows={3}
                                                                            name="documentComments"
                                                                            value={values.documentComments}
                                                                            onChange={handleChange}
                                                                        ></Form.Control>
                                                                    </Form.Group>


                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="enquiry">
                                                                <div
                                                                    className="panel-body tabs-menu-body"
                                                                    id="tab22"
                                                                >
                                                                    <Row>
                                                                        <Col xl={6}>
                                                                            <Form.Group className="form-groupx">
                                                                                <Form.Label className='tx-16'>Society </Form.Label>
                                                                                <Select
                                                                                    name="society"
                                                                                    value={values.society}
                                                                                    options={societiesForDropDown}
                                                                                    onChange={(opt) => {
                                                                                        setFieldValue("society", opt)
                                                                                        fetchPropertiesForDropDown(opt)
                                                                                    }}
                                                                                />

                                                                            </Form.Group>
                                                                        </Col>

                                                                        <Col xl={6}>
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label className='tx-16'>Property </Form.Label>
                                                                                <Select
                                                                                    name="property"
                                                                                    value={values.property}
                                                                                    options={propertiesForDropDown}
                                                                                    onChange={(opt) => setFieldValue("property", opt)}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                    <Form.Group className="form-group">

                                                                        <Form.Label className='tx-16'>Enquiry</Form.Label>
                                                                        <Select
                                                                            name="enquiry"
                                                                            value={values.enquiry}
                                                                            options={enquiry}
                                                                            onChange={(opt) => setFieldValue("enquiry", opt)}
                                                                        />


                                                                    </Form.Group>

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                                                        <Form.Control className="form-control"
                                                                            onChange={(e: any) => setFieldValue("enquiryFile", e.currentTarget.files[0])}
                                                                            type="file" />
                                                                    </Form.Group>

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                                                        <Form.Control as="textarea" className="form-control" name="enquiryComments" value={values.enquiryComments} onChange={handleChange} placeholder="Textarea" rows={3}></Form.Control>
                                                                    </Form.Group>

                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="other">
                                                                <div
                                                                    className="panel-body tabs-menu-body"
                                                                    id="tab23"
                                                                >
                                                                    <Row>
                                                                        <Col xl={6}>
                                                                            <Form.Group className="form-groupx">
                                                                                <Form.Label className='tx-16'>Society </Form.Label>
                                                                                <Select
                                                                                    name="society"
                                                                                    value={values.society}
                                                                                    options={societiesForDropDown}
                                                                                    onChange={(opt) => {
                                                                                        setFieldValue("society", opt)
                                                                                        fetchPropertiesForDropDown(opt)
                                                                                    }}
                                                                                />

                                                                            </Form.Group>
                                                                        </Col>

                                                                        <Col xl={6}>
                                                                            <Form.Group className="form-group">
                                                                                <Form.Label className='tx-16'>Property </Form.Label>
                                                                                <Select
                                                                                    name="property"
                                                                                    value={values.property}
                                                                                    options={propertiesForDropDown}
                                                                                    onChange={(opt) => setFieldValue("property", opt)}
                                                                                />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Row>

                                                                    <Form.Group>

                                                                        <Form.Label className='tx-16'>Type</Form.Label>
                                                                        <Row>
                                                                            <Col xl={12}>
                                                                                <Select
                                                                                    name="otherType"
                                                                                    value={values.otherType}
                                                                                    options={otherstype}
                                                                                    onChange={(opt) => {
                                                                                        setFieldValue("otherType", opt)
                                                                                    }}
                                                                                />
                                                                            </Col>


                                                                            <Col xl={12}>
                                                                                <Form.Group className='mt-4'>
                                                                                    <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                                                                    <Form.Control className="form-control" type="file" onChange={(e:any) => setFieldValue("otherFile", e.currentTarget.files[0])}/>
                                                                                </Form.Group>
                                                                            </Col>


                                                                            <Col xl={12}>
                                                                                <Form.Group className='mt-4'>
                                                                                    <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                                                                    <Form.Control as="textarea" className="form-control" placeholder="Textarea" rows={3} name="otherComments" value={values.otherComments} onChange={handleChange}></Form.Control>
                                                                                </Form.Group>
                                                                            </Col>
                                                                        </Row>


                                                                    </Form.Group>
                                                                </div>
                                                            </Tab.Pane>

                                                        </Tab.Content>
                                                    </Col>
                                                </Row>
                                            </Tab.Container>
                                        </div>
                                    </div>

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
export default OtherApplicationModal;