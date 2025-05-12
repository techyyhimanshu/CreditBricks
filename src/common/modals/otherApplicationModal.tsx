import { useEffect, useRef, useState } from "react";
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
    onSave?: (values: any, tab: string,editing:boolean) => void;
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
    const [activeTab, setActiveTab] = useState(() => {
        if (initialVals) {
            const identifierPrefix = initialVals.applicationIdentifier.split('-')[0];
            if (identifierPrefix === 'OE') {
                return 'enquiry';
            } else if (identifierPrefix === 'OO') {
                return 'other';
            } else if (identifierPrefix === 'OD') {
                return 'documentSubmission';
            }
        }
        return 'documentSubmission';
    });
    const [visibleTabs, setVisibleTabs] = useState<string[]>([]);
    const isFirstRender = useRef(true);
    console.log(activeTab, visibleTabs)

    useEffect(() => {
        fetchSocietiesForDropDown()
    }, [])

    useEffect(() => {
        if (initialVals?.applicationIdentifier) {
            const prefix = initialVals.applicationIdentifier.split("-")[0];
            switch (prefix) {
                case "OE":
                    setVisibleTabs(["enquiry"]);
                    break;
                case "OO":
                    setVisibleTabs(["other"]);
                    break;
                case "OD":
                    setVisibleTabs(["documentSubmission"]);
                    break;

            }
        } else if (!initialVals) {
            setVisibleTabs(["documentSubmission", "enquiry", "other"]);
        }
    }, [initialVals]);

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
    useEffect(() => {
        return () => {
            isFirstRender.current = true;
        };
    }, [])


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
            if(editing){
                formattedData.id=initialVals?.applicationIdentifier
            }
            if (onSave) {
                onSave(formattedData, activeTab, editing)
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
                    <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), isFirstRender.current = true, onClose() }}>
                        x
                    </Button>
                </Modal.Header>
                <Formik
                    enableReinitialize
                    initialValues=
                    {{
                        society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
                        property: initialVals ? { label: initialVals.property?.propertyName, value: initialVals.property?.propertyIdentifier } : { label: "", value: "" },
                        documentSubmission: initialVals ? { label: initialVals?.documentType, value: initialVals?.documentType } : { label: "", value: "" },
                        documentFile: null,
                        documentSubmissionFileName: initialVals?.documentSubmissionFile,
                        documentComments: initialVals?.descriptionComment||"",
                        enquiry: initialVals ? { label: initialVals?.enquiryType, value: initialVals?.enquiryType } : { label: "", value: "" },
                        enquiryFile: null,
                        enquiryFileName: initialVals?.enquiryFile,
                        enquiryComments: initialVals?.descriptionComment || "",
                        otherType: initialVals ? { label: initialVals?.otherType, value: initialVals?.otherType } : { label: "", value: "" },
                        otherFile: null,
                        otherFileName: initialVals?.otherFile,
                        otherComments: initialVals?.otherComment || "",
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

                        const getFileExtension = (fileName: string) => {
                            if (!fileName) {
                                return '';
                            }
                            return fileName.split(".").pop()?.toLowerCase() || '';
                        };
                        const getFileName = (fileName: string) => {
                            if (!fileName) {
                                return '';
                            }
                            return fileName?.split("/").pop() || '';
                        };

                        useEffect(() => {
                            if (isFirstRender.current) {
                                isFirstRender.current = false;
                                return;
                            }
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
                                                defaultActiveKey={activeTab}
                                                onSelect={(k: any) => setActiveTab(k)}
                                            >
                                                <Row>
                                                    <Col sm={3} className='p-0'>
                                                        <Nav variant="pills" className="flex-column">
                                                            {visibleTabs.includes("documentSubmission") && (<Nav.Item>
                                                                <Nav.Link eventKey="documentSubmission" className='rounded-0'>
                                                                    {" "}
                                                                    Document Submission
                                                                </Nav.Link>
                                                            </Nav.Item>)}
                                                            {visibleTabs.includes("enquiry") && (<Nav.Item>
                                                                <Nav.Link eventKey="enquiry" className='rounded-0'>
                                                                    {" "}
                                                                    Enquiry
                                                                </Nav.Link>
                                                            </Nav.Item>)}
                                                            {visibleTabs.includes("other") && (<Nav.Item>
                                                                <Nav.Link eventKey="other" className='rounded-0'>
                                                                    {" "}
                                                                    Others
                                                                </Nav.Link>
                                                            </Nav.Item>)}

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
                                                                                    isDisabled={initialVals&&!editing}
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
                                                                                    isDisabled={initialVals&&!editing}
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
                                                                            isDisabled={initialVals&&!editing}
                                                                        />
                                                                    </Form.Group>

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                                                        <Form.Control className="form-control"
                                                                            type="file"
                                                                            onChange={(e: any) => setFieldValue("documentFile", e.currentTarget.files[0])}
                                                                            disabled={initialVals&&!editing}
                                                                        />
                                                                    </Form.Group>
                                                                    {values.documentSubmissionFileName && (
                                                                        <p
                                                                            className="text-center pt-2"
                                                                            style={{ cursor: "pointer", color: "blue" }}
                                                                            onClick={() => {
                                                                                const fileExtension = getFileExtension(values.documentSubmissionFileName);


                                                                                // If it's a PDF, image, or Excel file, open in new tab
                                                                                if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                                    window.open(import.meta.env.VITE_STATIC_PATH + values.documentSubmissionFileName, "_blank");
                                                                                } else {
                                                                                    // For other files, trigger download
                                                                                    const link = document.createElement("a");
                                                                                    link.href = import.meta.env.VITE_STATIC_PATH + values.documentSubmissionFileName;
                                                                                    link.download = values.documentSubmissionFileName;
                                                                                    link.click();
                                                                                }
                                                                            }}
                                                                        >
                                                                            {getFileName(values.documentSubmissionFileName)}
                                                                        </p>
                                                                    )}

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                                                        <Form.Control as="textarea" className="form-control" placeholder="Textarea"
                                                                            rows={3}
                                                                            name="documentComments"
                                                                            value={values.documentComments}
                                                                            onChange={handleChange}
                                                                            disabled={initialVals&&!editing}
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
                                                                                    isDisabled={initialVals&&!editing}
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
                                                                                    isDisabled={initialVals&&!editing}
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
                                                                            isDisabled={initialVals&&!editing}
                                                                        />


                                                                    </Form.Group>

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                                                        <Form.Control className="form-control"
                                                                            onChange={(e: any) => setFieldValue("enquiryFile", e.currentTarget.files[0])}
                                                                            disabled={initialVals&&!editing}
                                                                            type="file" />
                                                                    </Form.Group>
                                                                    {values.enquiryFileName && (
                                                                        <p
                                                                            className="text-center pt-2"
                                                                            style={{ cursor: "pointer", color: "blue" }}
                                                                            onClick={() => {
                                                                                const fileExtension = getFileExtension(values.enquiryFileName);


                                                                                // If it's a PDF, image, or Excel file, open in new tab
                                                                                if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                                    window.open(import.meta.env.VITE_STATIC_PATH + values.enquiryFileName, "_blank");
                                                                                } else {
                                                                                    // For other files, trigger download
                                                                                    const link = document.createElement("a");
                                                                                    link.href = import.meta.env.VITE_STATIC_PATH + values.enquiryFileName;
                                                                                    link.download = values.enquiryFileName;
                                                                                    link.click();
                                                                                }
                                                                            }}
                                                                        >
                                                                            {getFileName(values.enquiryFileName)}
                                                                        </p>
                                                                    )}

                                                                    <Form.Group className="form-group">
                                                                        <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                                                        <Form.Control as="textarea" className="form-control" name="enquiryComments" value={values.enquiryComments} onChange={handleChange} disabled={initialVals&&!editing} placeholder="Textarea" rows={3}></Form.Control>
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
                                                                                    isDisabled={initialVals&&!editing}
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
                                                                                    isDisabled={initialVals&&!editing}
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
                                                                                    isDisabled={initialVals&&!editing}
                                                                                />
                                                                            </Col>


                                                                            <Col xl={12}>
                                                                                <Form.Group className='mt-4'>
                                                                                    <Form.Label className='tx-16'>Upload <small className='float-end text-muted'>Upload Size : Max 2MB </small></Form.Label>
                                                                                    <Form.Control className="form-control" disabled={initialVals&&!editing} type="file" onChange={(e: any) => setFieldValue("otherFile", e.currentTarget.files[0])} />
                                                                                </Form.Group>
                                                                                {values.otherFileName && (
                                                                                    <p
                                                                                        className="text-center pt-2"
                                                                                        style={{ cursor: "pointer", color: "blue" }}
                                                                                        onClick={() => {
                                                                                            const fileExtension = getFileExtension(values.otherFileName);


                                                                                            // If it's a PDF, image, or Excel file, open in new tab
                                                                                            if (["pdf", "jpg", "jpeg", "png", "gif", "bmp", "xlsx", "xls"].includes(fileExtension)) {
                                                                                                window.open(import.meta.env.VITE_STATIC_PATH + values.otherFileName, "_blank");
                                                                                            } else {
                                                                                                // For other files, trigger download
                                                                                                const link = document.createElement("a");
                                                                                                link.href = import.meta.env.VITE_STATIC_PATH + values.otherFileName;
                                                                                                link.download = values.otherFileName;
                                                                                                link.click();
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        {getFileName(values.otherFileName)}
                                                                                    </p>
                                                                                )}
                                                                            </Col>


                                                                            <Col xl={12}>
                                                                                <Form.Group className='mt-4'>
                                                                                    <Form.Label className='tx-16'>Comments <small className='float-end text-muted'>Max 250 Char </small></Form.Label>
                                                                                    <Form.Control as="textarea" disabled={initialVals&&!editing} className="form-control" placeholder="Textarea" rows={3} name="otherComments" value={values.otherComments} onChange={handleChange}></Form.Control>
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
                                    <Button variant="default" onClick={(event) => { event.preventDefault(), isFirstRender.current = true, onClose() }}>
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