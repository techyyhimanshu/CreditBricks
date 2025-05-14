import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Card, Form, Button, CardBody } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from 'react-quill';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../common/store/store';
import { handleApiError } from '../../helpers/handle-api-error';
import { CustomToastContainer, showToast } from '../../common/services/toastServices';
import { getTermsConditionBySocietyAndTypeApi } from '../../api/termsCondition-api';

export default function TermsCondition() {
  const { society } = useSelector((state: RootState) => state.auth)
  const applications = [
    { value: "Society", label: "Society" },
    { value: "Tenant", label: "Tenant" },
    { value: "Gate Pass", label: "Gate Pass" },
    { value: "Change In Name", label: "Change In Name" },
    { value: "Contact Update", label: "Contact Update" },
    { value: "Parking", label: "Parking" },
    { value: "Flat Resale", label: "Flat Resale" },
    { value: "Interior Work", label: "Interior Work" },
    { value: "Celebration", label: "Celebration" },
    { value: "Theater", label: "Theater" },
    { value: "Banquet Hall", label: "Banquet Hall" },
    { value: "Club House", label: "Club House" },
    { value: "Swimming Pool", label: "Swimming Pool" },
    { value: "Play Area", label: "Play Area" },
    { value: "CTurf Area", label: "CTurf Area" },
    { value: "Rent Agreement", label: "Rent Agreement" },
    { value: "Share Certificate", label: "Share Certificate" },
    { value: "Nomination", label: "Nomination" },
    { value: "Badminton Count", label: "Badminton Count" },
    { value: "Food Court", label: "Food Court" },
    { value: "Other", label: "Other" }
  ];

  // const validationSchema = Yup.object().shape({
  //   application: Yup.object().required("Application is required"),
  //   terms: Yup.string().required("Terms and conditions are required"),
  // });

  const handleSubmit = async (values: any) => {
    try {
      const formattedData: any = {
        applicationType: values?.application?.value,
        societyIdentifier: values?.society?.value,
        termCondition: values.terms,
      };
      console.log(formattedData)
      // if (editing) {
      //   formattedData.eventId = initialVals?.eventId
      //   formattedData.eventIdentifier = initialVals?.applicationIdentifier
      // }

      // const response = await createNewGatePassApi(formattedData)
      // if (response.status === 200) {
      //     showToast("success", "Gate pass created successfully")
      // }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  const fetchTermsData=async(societyIdentifier:string,type:string,setFieldValue:any)=>{
    try {
      const response = await getTermsConditionBySocietyAndTypeApi(societyIdentifier,type)
      if(response.status===200){
        setFieldValue("terms",response.data.data?.termCondition)
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      showToast("error", errorMessage)
    }
  }

  return (
    <Fragment>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">Terms & Conditions</span>
        </div>
      </div>

      <Formik
        initialValues={{
          application: { value: "", label: "" },
          terms: '',
          society: { value: "", label: "" },
        }}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => {
          useEffect(() => {
            if (society) {
              setFieldValue("society", society);
            }
          }, [society]);
          useEffect(() => {
            if (society&&values?.application.value) {
              fetchTermsData(society.value,values?.application.value,setFieldValue)
            }
          }, [society,values.application]);
          return (
            <FormikForm>
              <Row>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Society <span className="text-danger">*</span></Form.Label>
                    <Select
                      options={applications}
                      placeholder="Select application"
                      name="society"
                      classNamePrefix='Select2'
                      className="multi-select"
                      value={values.society}
                      onChange={(selected) => setFieldValue("soceity", selected)}
                      isDisabled
                    />
                    {/* {errors.application && touched.application && (
                    <div className="text-danger mt-1">{errors.application.label || errors.application}</div>
                  )} */}
                  </Form.Group>
                </Col>
                <Col xl={4}>
                  <Form.Group className="form-group">
                    <Form.Label>Applications <span className="text-danger">*</span></Form.Label>
                    <Select
                      options={applications}
                      placeholder="Select application"
                      name="application"
                      classNamePrefix='Select2'
                      className="multi-select"
                      value={values.application}
                      onChange={(selected) => setFieldValue("application", selected)}
                    />
                    {/* {errors.application && touched.application && (
                    <div className="text-danger mt-1">{errors.application.label || errors.application}</div>
                  )} */}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody className='h-400p'>
                      <ReactQuill
                        className='h-300p'
                        theme="snow"
                        value={values.terms}
                        onChange={(content) => setFieldValue("terms", content)}
                      />
                      {errors.terms && touched.terms && (
                        <div className="text-danger mt-2">{errors.terms}</div>
                      )}
                    </CardBody>
                  </Card>

                  <div className='float-end mb-4'>
                    <Button type='submit' className='btn btn-primary me-2'>Save</Button>
                    <Button type='button' className='btn btn-default'>Cancel</Button>
                  </div>
                </Col>
              </Row>
            </FormikForm>
          )
        }}
      </Formik>
      <CustomToastContainer />
    </Fragment>
  );
}
