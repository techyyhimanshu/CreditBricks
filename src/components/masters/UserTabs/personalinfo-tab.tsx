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
import Cookies from 'js-cookie'
interface StateCities {
    [key: string]: string[]; // Index signature
}
const stateCitiesTyped: StateCities = stateCities;
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

const PersonalInfo: React.FC<PersonalInfoProps> = ({ handleTabChange, setCompletedTabs, setDisabledTab, renderFooter }) => {
    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState<any[]>([])


    const [currentUser, setCurrentUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        personEmail: '',
        personBirthdate: '',
        personGenderIdentity: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        alternatePhone: '',
        anniversary: '',
        recordType: '',
        memberType: '',
    })
    const [isEditing, setIsEditing] = useState(false)
    const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
        value: state,
        label: state,
    }));
    const countryoption = [
        { value: "India", label: "India" },

    ];
    const Recordtype = [
        { value: "Member", label: "Member" },
        { value: "Tenant", label: "Tenant" },

    ];
    const membertype = [
        { value: "Club", label: "Club" },
        { value: "Swimming Pull", label: "Swimming Pull" }
    ];
    const gender = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" }
    ];

    // const openAddModal = () => {
    //     setIsEditing(false);
    //     currentUser.username = "";
    //     currentUser.firstName = "";
    //     currentUser.lastName = "";
    //     currentUser.personGenderIdentity = "";
    //     currentUser.personBirthdate = "";
    //     currentUser.personEmail = "";
    //     currentUser.phone = "";
    //     currentUser.country = "";
    //     currentUser.state = "";
    //     currentUser.city = "";
    //     currentUser.zipcode = "";
    //     setShowModal(true);
    // };

    const [cityOptions, setCityOptions] = useState<any>([]);

    // const clearFields = (values: any) => {
    //     values.username = "",
    //         values.firstName = "",
    //         values.lastName = "",
    //         values.phone = "",
    //         values.alternatePhone = "",
    //         values.personEmail = "",
    //         values.personBirthdate = "",
    //         values.personGenderIdentity.value = "",
    //         values.personGenderIdentity.label = "",
    //         values.country.value = "",
    //         values.state.value = "",
    //         values.city.value = "",
    //         values.zipcode = "",
    //         values.password = "",
    //         values.address = "",
    //         values.anniversary = "",
    //         values.recordType.value = "",
    //         values.memberType.value = ""
    // }
    const handleSubmit = (values: any) => {
        console.log(values)
        const data = {
            salutation: values.personGenderIdentity.value === "Male" ? "Mr" : "Ms",
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            alternatePhone: values.alternatePhone,
            personEmail: values.personEmail,
            personBirthdate: values.personBirthdate,
            personGenderIdentity: values.personGenderIdentity.value,
            country: values.country.value,
            state: values.state.value,
            city: values.city.value,
            zipCode: values.zipcode,
            password: values.password,
            address: values.address,
            anniversary: values.anniversary,
            recordType: values.recordType.value,
            memberType: values.memberType.value,
        }
        handleTabChange("Document")
        setCompletedTabs({
            Personal: true,
            Document: false,
            Properties: false,
            Loan: false,
            Parking: false
        })
        setDisabledTab({
            Personal: true,
            Document: false,
            Properties: true,
            Loan: true,
            Parking: true
        })
        console.log(data)
        // clearFields(values)

        if (isEditing) {
            ; (async () => {
                try {
                    const response = await updateUserApi(data, currentUser.username)
                    if (response.status === 200) {
                        showToast("success", response.data.message)
                        // Update specific user in the list
                        setUsers(prevData =>
                            prevData.map(user =>
                                user.username === currentUser.username
                                    ? { ...user, ...data }
                                    : user
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
            // Call API to add new user
            ; (async () => {
                try {
                    const response = await addUserApi(data)
                    if (response.status === 200) {
                        showToast("success", "Personal info. saved successfully")
                        // Add the new user to the table
                        const newUser = {
                            sno: users.length + 1,
                            personBirthdate: response.data.data.personBirthdate.split("T")[0],
                            ...response.data.data
                        }
                        const username = response.data.data.username;
                        Cookies.set('username', username, { expires: 1 });
                        setCompletedTabs(!PersonalInfo)
                        setUsers(prevData => [...prevData, newUser]);
                        // clearFields()
                    }
                } catch (error: any) {
                    const errorMessage = handleApiError(error);
                    showToast("error", errorMessage);
                }
            })()
        }

    }
    const handleStateChange = (selected: { value: string; label: string }) => {
        const cities = stateCitiesTyped[selected.value] || [];
        setCityOptions(cities.map((city) => ({ value: city, label: city })));
    };
    return (
        <>


            <Formik
                initialValues={{
                    username: currentUser?.username || "",
                    password: "pass@12",
                    firstName: currentUser?.firstName || "",
                    lastName: currentUser?.lastName || "",
                    personGenderIdentity: { value: currentUser?.personGenderIdentity || "", label: currentUser?.personGenderIdentity || "" },
                    personEmail: currentUser?.personEmail || "",
                    phone: currentUser?.phone || "",
                    alternatePhone: currentUser?.alternatePhone || "",
                    anniversary: currentUser?.anniversary || "",
                    recordType: { value: currentUser.recordType, label: currentUser.recordType },
                    memberType: { value: currentUser.memberType, label: currentUser.memberType },
                    personBirthdate: currentUser?.personBirthdate,
                    country: { value: currentUser.country, label: currentUser.country }, // Update this
                    state: { value: currentUser.state, label: currentUser.state },
                    city: { value: currentUser.city, label: currentUser.city },
                    address: currentUser?.address || "",
                    zipcode: currentUser?.zipcode || ""
                }
                }
                validationSchema={isEditing ? updateUserValidationSchema : addUserValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, values, touched, errors }) => (
                    <FormikForm>
                        <Row>
                            {/* Username */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>UserName <span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        placeholder='UserName'
                                        disabled={isEditing}
                                        className='form-control'
                                        name="username"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Password<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        value="pass@12"
                                        placeholder='pass@12'
                                        disabled={true}
                                        className='form-control'
                                        name="password"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xl={4}></Col>

                            {/* First Name */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        placeholder='First Name'
                                        className='form-control'
                                        name="firstName"
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>
                            {/* Last Name */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        placeholder='Last Name'
                                        className='form-control'
                                        name="lastName"
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>
                            {/* Gender */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Gender<span className="text-danger">*</span> </Form.Label>
                                    <div className="SlectBox">
                                        <Select
                                            options={gender}
                                            value={values.personGenderIdentity}
                                            placeholder="Select Gender"
                                            onChange={(selected) => {
                                                setFieldValue("personGenderIdentity", selected);
                                            }}
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                        {touched.personGenderIdentity?.value && errors.personGenderIdentity?.value && (
                                            <div className="text-danger">{errors.personGenderIdentity.value}</div>
                                        )}
                                    </div>

                                </Form.Group>
                            </Col>


                            {/* Email */}

                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        placeholder='Email'
                                        className='form-control'
                                        name="personEmail"
                                    />
                                    <ErrorMessage name="personEmail" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>

                            {/* Phone */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Mobile No. <span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        placeholder='Mobile No.'
                                        className='form-control'
                                        name="phone"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>


                            {/* Alternate Mobile No. */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Alternative Mobile No.</Form.Label>
                                    <Field
                                        type='text'
                                        placeholder='Alternative Mobile No.'
                                        className='form-control'
                                        name="alternatePhone"
                                    />
                                </Form.Group>
                            </Col>


                            {/* Date of Birth */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>
                                        DOB<span className="text-danger">*</span>
                                    </Form.Label>
                                    <div className="datepicker-wrapper">
                                        <Field
                                            type='date'
                                            placeholder='dd/mm/yyyy'
                                            className='form-control'
                                            name="personBirthdate"

                                        />

                                    </div>
                                    {touched.personBirthdate && errors.personBirthdate && (
                                        <div className="text-danger">{errors.personBirthdate}</div>
                                    )}
                                </Form.Group>
                            </Col>


                            {/* Anniversary */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Anniversary</Form.Label>
                                    <Field
                                        type='date'
                                        placeholder='dd/mm/yyyy'
                                        className='form-control'
                                        name="anniversary"

                                    />
                                    <ErrorMessage name="anniversary" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>

                            {/* Record type */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Record Type </Form.Label>
                                    <div className="SlectBox">
                                        <Select
                                            options={Recordtype}
                                            value={values.recordType}
                                            onChange={(option) => {
                                                setFieldValue("recordType", option);
                                            }}
                                            placeholder="Select Type"
                                            // classNamePrefix="selectform"
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>

                            {/* Member type */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Member Type</Form.Label>
                                    <div className="SlectBox">
                                        <Select
                                            options={membertype}
                                            value={values.memberType}
                                            onChange={(option) => {
                                                setFieldValue("memberType", option);
                                            }}
                                            placeholder="Select type"
                                            // classNamePrefix="selectform"
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                    </div>
                                </Form.Group>
                            </Col>


                            {/* Country */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Country <span className="text-danger">*</span></Form.Label>

                                    <div className=" SlectBox">
                                        <Select
                                            options={countryoption}
                                            value={values.country}
                                            placeholder="Country"
                                            onChange={(selected) => setFieldValue('country', selected)}
                                            // classNamePrefix="selectform"
                                            classNamePrefix='Select2' className="multi-select"
                                        />
                                        {touched.country?.value && errors.country?.value && (
                                            <div className="text-danger">{errors.country.value}</div>
                                        )}
                                    </div>

                                </Form.Group>
                            </Col>


                            {/* State */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>State <span className="text-danger">*</span></Form.Label>
                                    <Select
                                        options={stateOptions}
                                        value={values.state}
                                        onChange={(selected: any) => {
                                            setFieldValue('state', selected);
                                            handleStateChange({
                                                value: selected.value,
                                                label: selected.label
                                            });
                                        }}
                                        placeholder="Select State"
                                        classNamePrefix="Select2"
                                    />
                                    {touched.state?.value && errors.state?.value && (
                                        <div className="text-danger">{errors.state.value}</div>
                                    )}
                                </Form.Group>
                            </Col>


                            {/* City */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>City <span className="text-danger">*</span></Form.Label>
                                    <Select
                                        options={cityOptions}
                                        value={values.city}
                                        onChange={(selected) => setFieldValue("city", selected)}
                                        placeholder="Select City"
                                        classNamePrefix="Select2"
                                    />
                                    {touched.city?.value && errors.city?.value && (
                                        <div className="text-danger">{errors.city.value}</div>
                                    )}
                                </Form.Group>
                            </Col>
                            {/* Address */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Address<span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        name='address'
                                        placeholder='Address'
                                        className="form-control"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-danger" />
                                </Form.Group>
                            </Col>

                            {/* Zipcode */}
                            <Col xl={4}>
                                <Form.Group className="form-group">
                                    <Form.Label>Zipcode <span className="text-danger">*</span></Form.Label>
                                    <Field
                                        type='text'
                                        placeholder='Zipcode'
                                        className='form-control'
                                        name="zipcode"
                                    />

                                    <ErrorMessage name="zipcode" component="div" className="text-danger" />
                                </Form.Group>

                            </Col>

                        </Row>
                        {renderFooter(
                            <>
                                <Button variant="primary" type="submit">Save Personal Info</Button>
                            </>
                        )}
                        {/* <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
                            <Button type="submit" className="btn btn-primary ">
                                Save Personal Info
                            </Button>
                        </div> */}

                    </FormikForm>
                )}
            </Formik>



        </>
    )
}

export default PersonalInfo