// import { useEffect, useState } from "react";
// import { Accordion, Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
// import Select from "react-select";
// import 'suneditor/dist/css/suneditor.min.css';
// import { getAllSocietyApi, getPropertiesOfSocietyApi, getSocietyDetailsApi } from "../../api/society-api";
// import { handleApiError } from "../../helpers/handle-api-error";
// import { showToast, CustomToastContainer } from "../services/toastServices";
// import { Field, Formik, Form as FormikForm } from "formik";


// interface ProductModalProps {
//     show: boolean;
//     onSave: (values: any) => void;
//     mode?: string;
//     handleEdit?: () => void;
//     onClose: () => void;
//     isShow?: boolean;
//     editing: boolean;
//     initialVals?: any;


// }

// const SwimmingModal: React.FC<ProductModalProps> = ({ show, initialVals, onClose, editing, onSave }) => {
//     const [societiesForDropDown, setSocietiesForDropDown] = useState<any[]>([]);
//     const [propertiesForDropDown, setPropertiesForDropDown] = useState([]);

//     useEffect(() => {
//         fetchSocietiesForDropDown()
//     }, [])

//     const fetchSocietiesForDropDown = async () => {
//         try {
//             const response = await getAllSocietyApi();
//             const formattedData = response.data.data.map((item: any) => ({
//                 value: item.societyIdentifier,
//                 label: item.societyName,
//             }));
//             setSocietiesForDropDown(formattedData);
//         } catch (error) {
//             const errorMessage = handleApiError(error)
//             showToast("error", errorMessage)
//         }
//     }

//     const fetchPropertiesForDropDown = async (society: any) => {
//         try {
//             const response = await getPropertiesOfSocietyApi(society.value);
//             const formattedData = response.data.data.map((item: any) => ({
//                 value: item.propertyIdentifier,
//                 label: item.propertyName ? item.propertyName : item.flatNumber,
//             }));
//             setPropertiesForDropDown(formattedData);
//         } catch (error) {
//             const errorMessage = handleApiError(error)
//             showToast("error", errorMessage)
//         }
//     }



//     const duration = [
//         { value: "1", label: "1hr" },
//         { value: "2", label: "2hrs" },
//         { value: "3", label: "3hrs" },
//     ]


//     const medicaldiseases = [
//         { value: "1", label: "Yes" },
//         { value: "2", label: "No" },
//     ]

//     const gender = [
//         { value: "1", label: "Male" },
//         { value: "2", label: "Female" },
//     ]

//     const fetchApproverDetails = async (society: any, setFieldValue: any) => {
//         try {
//             const response = await getSocietyDetailsApi(society.value)
//             const members = response.data.data?.committeeMembers || [];

//             const matched = members.find((member: any) =>
//                 Array.isArray(member.applicationType) &&
//                 member.applicationType.includes(name)
//             );
//             if (matched) {
//                 setFieldValue("tower", { value: matched.towerIdentifier, label: matched.towerName });
//                 setFieldValue("wing", { value: matched.wingIdentifier, label: matched.wingName });
//                 setFieldValue("approverSociety", { value: matched.societyIdentifier, label: matched.societyName });
//                 setFieldValue("approverProperty", { value: matched.propertyIdentifier, label: matched.propertyName });
//                 setFieldValue("approverName", matched.fullName);
//                 setFieldValue("approverContact", matched.contactNumber);
//                 setFieldValue("designation", { value: matched.designation, label: matched.designation });
//             }
//         } catch (error: any) {
//             const errorMessage = handleApiError(error)
//             showToast('error', errorMessage)
//         }
//     }

//     const handleSubmit = async (values: any) => {
//         try {
//             const formattedData = {
//                 societyIdentifier: values.society.value,
//                 propertyIdentifier: values.property.value,
//                 gateType: values.gateType.value,
//                 category: values.category.value,
//                 subCategory: values.subCategory.value,
//                 entryDateTime: values.entryDateTime,
//                 exitDateTime: values.exitDateTime,
//                 userIdentifier: values.tenant.value ? values.tenant.value : values.member.value ? values.member.value : values.vendor.value,
//                 purpose: values.purpose,
//                 description: values.description,
//                 driverName: values.driverName,
//                 driverMobileNumber: values.driverMobileNumber,
//                 vehicleNumber: values.vehicleNumber,
//                 vehicleModel: values.vehicleModel,
//                 vehicleNature: values.vehicleNature.value,
//                 vehicleType: values.vehicleType.value,
//                 contactPersonName: values.contactPersonName,
//                 contactPersonNumber: values.contactPersonNumber,
//                 remarks: values.remarks,
//                 tower: { value: initialVals?.towerIdentifier || "", label: initialVals?.towerName || "" },
//                 wing: { value: initialVals?.wingIdentifier || "", label: initialVals?.wingName || "" },
//                 approverSociety: { value: initialVals?.socityIdentifier || "", label: initialVals?.societyName || "" },
//                 approverProperty: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
//                 approverName: initialVals?.fullName || "",
//                 approverContact: initialVals?.contactNumber || "",
//                 designation: { value: initialVals?.designation || "", label: initialVals?.designation || "" },
//             }
//             if (onSave) {
//                 onSave(formattedData)
//             }
//             // const response = await createNewGatePassApi(formattedData)
//             // if (response.status === 200) {
//             //     showToast("success", "Gate pass created successfully")
//             // }
//         } catch (error) {
//             const errorMessage = handleApiError(error)
//             showToast("error", errorMessage)
//         }
//     }


//     return (
//         <>
//             <Modal show={show} size="xl" centered>
//                 <Modal.Header>
//                     <Modal.Title>Gate Pass</Modal.Title>
//                     <Button variant="" className="btn btn-close" onClick={(event) => { event.preventDefault(), onClose() }}>
//                         x
//                     </Button>
//                 </Modal.Header>
//                 <Formik
//                     enableReinitialize
//                     initialValues=
//                     {{
//                         society: initialVals ? { label: initialVals.societyName, value: initialVals.societyIdentifier } : { label: "", value: "" },
//                         property: initialVals ? { label: initialVals.property?.propertyName, value: initialVals.property?.propertyIdentifier } : { label: "", value: "" },
//                         participantName: '',
//                         participantAge: '',
//                         gender: '',
//                         hasDiseases: '',
//                         diseaseName: '',
//                         poolDateTime: '',
//                         duration: '',
//                         remarks: '',
//                         hasPasses: '',
//                         hasCostumes: '',
//                         tower: { value: initialVals?.towerIdentifier || "", label: initialVals?.towerName || "" },
//                         wing: { value: initialVals?.wingIdentifier || "", label: initialVals?.wingName || "" },
//                         approverSociety: { value: initialVals?.socityIdentifier || "", label: initialVals?.societyName || "" },
//                         approverProperty: initialVals ? { label: initialVals.propertyName, value: initialVals.propertyIdentifier } : { label: "", value: "" },
//                         approverName: initialVals?.fullName || "",
//                         approverContact: initialVals?.contactNumber || "",
//                         designation: { value: initialVals?.designation || "", label: initialVals?.designation || "" },

//                     }}
//                     onSubmit={handleSubmit}>
//                     {({ values, handleChange, setFieldValue }) => {

//                         return (
//                             <FormikForm>
//                                 <Modal.Body className='bg-light'>
//                                     <Accordion defaultActiveKey="basicinfo">
//                                         <Accordion.Item eventKey="basicinfo">
//                                             <Accordion.Header>Basic Information</Accordion.Header>
//                                             <Accordion.Body className='p-2'>
//                                                 <Row>
//                                                     <Col xl="4">
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Society </Form.Label>
//                                                             <Select
//                                                                 options={societiesForDropDown}
//                                                                 placeholder="Select society"
//                                                                 classNamePrefix="Select2"
//                                                                 name="society"
//                                                                 value={values.society}
//                                                                 onChange={(selected) => {
//                                                                     fetchPropertiesForDropDown(selected);
//                                                                     fetchApproverDetails(selected, setFieldValue)
//                                                                     setFieldValue("society", selected);
//                                                                 }}
//                                                             />
//                                                             {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
//                                                         </Form.Group>
//                                                     </Col>

//                                                     <Col xl="4">
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Property </Form.Label>
//                                                             <Select
//                                                                 options={propertiesForDropDown}
//                                                                 name="property"
//                                                                 value={values.property}
//                                                                 onChange={(selected) => {
//                                                                     setFieldValue("property", selected);
//                                                                 }}
//                                                                 placeholder="Select property"
//                                                                 classNamePrefix="Select2"
//                                                             />
//                                                             {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
//                                                         </Form.Group>
//                                                     </Col>
//                                                     <div className='bg-light w-100 mb-2 mt-2'>
//                                                         <Row>
//                                                             <Col xl="4">
//                                                                 <Form.Group>
//                                                                     <Form.Label>Name of Participant</Form.Label>
//                                                                     <Form.Control
//                                                                         type="text"
//                                                                         name="participantName"
//                                                                         value={values.participantName}
//                                                                         onChange={handleChange}
//                                                                         placeholder="Name"
//                                                                     />
//                                                                 </Form.Group>
//                                                             </Col>

//                                                             <Col xl="4">
//                                                                 <Form.Group>
//                                                                     <Form.Label>Age</Form.Label>
//                                                                     <Form.Control
//                                                                         type="number"
//                                                                         name="participantAge"
//                                                                         value={values.participantAge}
//                                                                         onChange={handleChange}
//                                                                         placeholder="Age"
//                                                                     />
//                                                                 </Form.Group>
//                                                             </Col>

//                                                             <Col xl="4">
//                                                                 <Form.Group>
//                                                                     <Form.Label>Gender</Form.Label>
//                                                                     <Select
//                                                                         options={gender}
//                                                                         name="gender"
//                                                                         value={values.gender}
//                                                                         onChange={(selected) => setFieldValue("gender", selected)}
//                                                                     />
//                                                                 </Form.Group>
//                                                             </Col>

//                                                             <Col xl="4">
//                                                                 <Form.Group className="form-group mb-1">
//                                                                     <Form.Label>Medical Diseases</Form.Label>
//                                                                     <Select
//                                                                         options={medicaldiseases}
//                                                                         placeholder="Select Diseases"
//                                                                         classNamePrefix="Select2"
//                                                                     />
//                                                                     {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
//                                                                 </Form.Group>
//                                                             </Col>

//                                                             <Col xl="4">
//                                                                 <Form.Group className="form-group mb-1">
//                                                                     <Form.Label>Name of the Diseases</Form.Label>
//                                                                     <Form.Control
//                                                                         type="text"
//                                                                         placeholder="Diseases"
//                                                                         className="form-control"
//                                                                     ></Form.Control>
//                                                                     {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
//                                                                 </Form.Group>
//                                                             </Col>

//                                                             <Col xl="2">
//                                                                 <Form.Label className='pb-1'></Form.Label>
//                                                                 <Button type='button' className='btn btn-primary mt-3'>
//                                                                     + Add
//                                                                 </Button>
//                                                             </Col>
//                                                             <Col xl="12">
//                                                                 <table className='table border mt-3 bg-white'>
//                                                                     <thead>
//                                                                         <tr>
//                                                                             <th>Name</th>
//                                                                             <th>Age</th>
//                                                                             <th>Gender</th>
//                                                                             <th>Medical Diseases</th>
//                                                                             <th></th>
//                                                                         </tr>
//                                                                     </thead>
//                                                                     <tbody>
//                                                                         <tr>
//                                                                             <td>Vishal Sharma</td>
//                                                                             <td>35</td>
//                                                                             <td>Male</td>
//                                                                             <td>No</td>
//                                                                             <td><i className='bi bi-trash text-danger cursor'></i></td>
//                                                                         </tr>
//                                                                         <tr>
//                                                                             <td>Surbhi Sharma</td>
//                                                                             <td>32</td>
//                                                                             <td>Female</td>
//                                                                             <td>No</td>
//                                                                             <td><i className='bi bi-trash text-danger cursor'></i></td>
//                                                                         </tr>
//                                                                         <tr>
//                                                                             <td>Shikha Sharma</td>
//                                                                             <td>13</td>
//                                                                             <td>Female</td>
//                                                                             <td>Yes, Skin Allergy </td>
//                                                                             <td><i className='bi bi-trash text-danger cursor'></i></td>
//                                                                         </tr>
//                                                                     </tbody>
//                                                                 </table>
//                                                             </Col>
//                                                         </Row>
//                                                     </div>

//                                                     <Col xl={4}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Pool Date & Timing</Form.Label>
//                                                             <InputGroup className="input-group w-100 datetimepicker-2">

//                                                                 <Form.Control
//                                                                     className="form-control"
//                                                                     id="datetime-local"
//                                                                     type="datetime-local"
//                                                                     defaultValue="2020-01-16T14:22"

//                                                                 />
//                                                             </InputGroup>

//                                                             {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
//                                                         </Form.Group>
//                                                     </Col>
//                                                     <Col xl={4}>

//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Duration</Form.Label>
//                                                             <Select
//                                                                 options={duration}
//                                                                 placeholder="Select duration"
//                                                                 classNamePrefix="Select2"
//                                                             />
//                                                             {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
//                                                         </Form.Group>
//                                                     </Col>
//                                                     <Col xl={12}>
//                                                         <Form.Group className="form-group">
//                                                             <Form.Label>Remarks
//                                                                 <small className='text-muted float-end'>max 250 Character</small>
//                                                             </Form.Label>
//                                                             <textarea className="form-control" placeholder='Remarks'></textarea>
//                                                             {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
//                                                         </Form.Group>

//                                                     </Col>




//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group">
//                                                             <Form.Label clas>Do you have passes for all the participants?</Form.Label>
//                                                             <Row>

//                                                                 <Col lg={2} className='mt-2'>

//                                                                     <Form.Check type="radio" label="Yes" name="participants" />
//                                                                 </Col>
//                                                                 <Col lg={2} className='mt-2'>

//                                                                     <Form.Check type="radio" label="No" name="participants" />
//                                                                 </Col>

//                                                             </Row>

//                                                         </Form.Group>
//                                                     </Col>
//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-0">
//                                                             <Form.Label clas>Do you have swimming costume for all the
//                                                                 participants?</Form.Label>
//                                                             <Row>

//                                                                 <Col lg={2} className='mt-2'>

//                                                                     <Form.Check type="radio" label="Yes" name="participants" />
//                                                                 </Col>
//                                                                 <Col lg={2} className='mt-2'>

//                                                                     <Form.Check type="radio" label="No" name="participants" />
//                                                                 </Col>

//                                                             </Row>

//                                                         </Form.Group>
//                                                     </Col>


//                                                 </Row>
//                                             </Accordion.Body>
//                                         </Accordion.Item>


//                                         <Accordion.Item eventKey="approvaldetails">
//                                             <Accordion.Header>Approval Details</Accordion.Header>
//                                             <Accordion.Body className='p-2'>
//                                                 <Row>
//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Society </Form.Label>
//                                                             <Select
//                                                                 name='approverSociety'
//                                                                 placeholder="Select Society"
//                                                                 classNamePrefix="Select2"
//                                                                 onChange={(selected) => setFieldValue("approverSociety", selected)}
//                                                                 value={values.approverSociety}
//                                                                 isDisabled
//                                                             />
//                                                         </Form.Group>
//                                                     </Col>



//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Tower </Form.Label>
//                                                             <Select
//                                                                 // options={towerOptions}
//                                                                 placeholder="Select Tower"
//                                                                 classNamePrefix="Select2"
//                                                                 name='tower'
//                                                                 onChange={(selected) => {
//                                                                     // fetchWingsForDropDown(selected);
//                                                                     // setFieldValue("wing", null);
//                                                                     // setFieldValue("property", null);
//                                                                     setFieldValue("tower", selected);
//                                                                 }}
//                                                                 value={values.tower}
//                                                                 isDisabled
//                                                             />
//                                                         </Form.Group>
//                                                     </Col>


//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Wing </Form.Label>
//                                                             <Select
//                                                                 placeholder="Select Wing"
//                                                                 classNamePrefix="Select2"
//                                                                 name='wing'
//                                                                 onChange={(selected) => {
//                                                                     // fetchPropertiesForDropDown(selected);
//                                                                     // setFieldValue("property", null);
//                                                                     setFieldValue("wing", selected);
//                                                                 }}
//                                                                 value={values.wing}
//                                                                 isDisabled
//                                                             />
//                                                         </Form.Group>
//                                                     </Col>
//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Property </Form.Label>
//                                                             <Select
//                                                                 placeholder="Select property"
//                                                                 options={propertiesForDropDown}
//                                                                 classNamePrefix="Select2"
//                                                                 name='approverProperty'
//                                                                 onChange={(selected) => setFieldValue("approverProperty", selected)}
//                                                                 value={values.approverProperty}
//                                                                 isDisabled
//                                                             />
//                                                         </Form.Group>
//                                                     </Col>

//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Approver Name</Form.Label>
//                                                             <Field
//                                                                 type="text"
//                                                                 name="approverName"
//                                                                 placeholder="Approver Name"
//                                                                 className="form-control"
//                                                                 value={values.approverName}
//                                                                 disabled
//                                                             />
//                                                         </Form.Group>
//                                                     </Col>

//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Approver Contact</Form.Label>
//                                                             <Field
//                                                                 type="text"
//                                                                 name="approverContact"
//                                                                 placeholder="Contact"
//                                                                 className="form-control"
//                                                                 value={values.approverContact}
//                                                                 disabled
//                                                             />
//                                                         </Form.Group>
//                                                     </Col>

//                                                     <Col xl={6}>
//                                                         <Form.Group className="form-group mb-1">
//                                                             <Form.Label>Designation </Form.Label>
//                                                             <Select
//                                                                 // options={designation}
//                                                                 placeholder="Select Designation"
//                                                                 classNamePrefix="Select2"
//                                                                 name='designation'
//                                                                 onChange={(selected) => setFieldValue("designation", selected)}
//                                                                 value={values.designation}
//                                                                 isDisabled
//                                                             />
//                                                         </Form.Group>
//                                                     </Col>



//                                                 </Row>
//                                             </Accordion.Body>
//                                         </Accordion.Item>

//                                     </Accordion>

//                                     <Col xl={12} className='p-0'>
//                                         {/* <label><input type="checkbox" className='float-start m-2' />
//                         <b className='float-start mt-1 cursor'
//                          onClick={() => { viewDemoShow("termsconditionsview"); }}> Terms & Conditions</b></label> */}
//                                     </Col>

//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                     <Button variant="default" onClick={(event) => { event.preventDefault(), onClose() }}>
//                                         Close
//                                     </Button>
//                                     <Button variant="primary" type='submit'>
//                                         {editing ? "Update" : "Save"}
//                                     </Button>


//                                 </Modal.Footer>
//                                 <CustomToastContainer />

//                             </FormikForm>
//                         )
//                     }}

//                 </Formik>

//             </Modal>



//         </>
//     )
// }
// export default SwimmingModal;