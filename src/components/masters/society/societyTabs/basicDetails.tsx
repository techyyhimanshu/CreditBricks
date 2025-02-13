
import { Fragment, useEffect, useState } from 'react';
// import { Link } from "react-router-dom";
import { Col, Row, Card, Accordion, Button, Form, Dropdown, FormControl } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import Select from "react-select";
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import stateCities from "../../stateCity.json"
import { Link } from "react-router-dom";
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { addSocietyApi, updateSocietyApi } from '../../../api/society-api';
import { CustomToastContainer, showToast } from '../../../common/services/toastServices';
import { handleApiError } from '../../../helpers/handle-api-error';
import AccountDetails from './societyTabs/accountDetails';
interface StateCities {
    [key: string]: string[]; // Index signature
}
const stateCitiesTyped: StateCities = stateCities;
function BasicDetails() {
    const [currentSociety, setCurrentSociety] = useState({
        societyId: null,
        societyName: '',
        contactNumber: '',
        email: '',
        societyManager: '',
        address: '',
        country: null,
        state: null,
        city: null,
    });
    const stateOptions = Object.keys(stateCitiesTyped).map((state) => ({
        value: state,
        label: state,
    }));
    const countryOptions: any = [{ value: "India", label: "India" }]

    const [cityOptions, setCityOptions] = useState<any>([]);
    const handleStateChange = (selected: { value: string; label: string }) => {
        const cities = stateCitiesTyped[selected.value] || [];
        setCityOptions(cities.map((city) => ({ value: city, label: city })));
    };
    const handleSubmit = async (values: any) => {
        console.log(values)
    }
    return (
        <Accordion.Item eventKey="Basic Details" className="bg-white mb-3">
            <Accordion.Header className="borders ">
                Basic Details
            </Accordion.Header>
            <Accordion.Body className="borders p-0">
                <Card className='m-0'>

                    <Card.Body className='pt-3'>
                        <Formik
                            initialValues={{
                                societyName: currentSociety?.societyName || "",
                                contactNumber: currentSociety?.contactNumber || "",

                                email: currentSociety?.email || "",

                                societyManager: currentSociety?.societyManager || "",
                                address: currentSociety?.address || "",

                                country: { value: currentSociety.country, label: currentSociety.country },

                                state: { value: currentSociety.state, label: currentSociety.state },

                                city: { value: currentSociety.city, label: currentSociety.city }
                            }
                            }
                            // validationSchema={validationScWhema}
                            onSubmit={handleSubmit}
                        >
                            {({ setFieldValue, values }) => (
                                <FormikForm >
                                    <Row>
                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Society Name <span className="text-danger">*</span></Form.Label>
                                                <Field
                                                    type="text"
                                                    name="societyName"
                                                    placeholder="Society name"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Society Contact Number <span className="text-danger">*</span></Form.Label>
                                                <Field
                                                    type="text"
                                                    name="contactNumber"
                                                    placeholder="Society number"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>
                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Society Email <span className="text-danger">*</span></Form.Label>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="Society email"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>

                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Society Manager <span className="text-danger">*</span></Form.Label>
                                                <Field
                                                    type="text"
                                                    name="societyManager"
                                                    placeholder="Society Manager"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="societyName" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>


                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    placeholder="Address"
                                                    className="form-control"
                                                />
                                                {/* <ErrorMessage name="address" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>


                                        <Col xl={4}>
                                            <Form.Group className="form-group">
                                                <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    options={countryOptions}
                                                    value={values.country}
                                                    onChange={(selected) => setFieldValue("country", selected)}
                                                    placeholder="Select Country"
                                                    classNamePrefix="Select2"
                                                />
                                                {/* <ErrorMessage name="country" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>



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
                                                {/* <ErrorMessage name="state" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>


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
                                                {/* <ErrorMessage name="city" component="div" className="text-danger" /> */}
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                </FormikForm>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>


            </Accordion.Body>
        </Accordion.Item >
    )
}

export default BasicDetails