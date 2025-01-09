import * as Yup from 'yup';


export const schemaService = {
    validationSchema: (steps: any, currentStep: number) => {
        const validationSchema = Yup.object().shape({
            //   // Define a validation schema dynamically based on formData
            ...steps[currentStep].fields.reduce((acc: any, field: any) => {
                let fieldSchema;
                // Determine the base validation schema based on field type
                switch (field.type) {
                    case 'select':
                        if (field.selectType === "single") {
                            fieldSchema = Yup.string();
                        } else {
                            fieldSchema = Yup.array().of(Yup.string()).min(1, 'At least one option is required');
                        }
                        break;
                    case 'checkbox':
                        fieldSchema = Yup.boolean();
                        break;
                    case 'text':
                    case 'email':
                    case 'textarea':
                    case 'radio':
                        fieldSchema = Yup.string();
                        break;
                    case 'file':
                        fieldSchema = Yup.mixed().test('fileFormat', 'Invalid format', (value) => {
                                const allowedFormats = field.validations.find((v:any) => v.name === 'format')?.value || [];
                                const fileExtension = (value as File).type.split('/').pop();
                                return allowedFormats.includes(fileExtension);
                         
                        });

                        fieldSchema = field.validations.reduce((fieldAcc: any, validation: any) => {
                            if (validation.name === 'required' && validation.value === true) {
                                fieldAcc = fieldAcc.required(validation.errorMessage);
                            } else if (validation.name === 'maxSize') {
                                fieldAcc = fieldAcc.test('fileSize', validation.errorMessage, (value:any) => {
                                    return value && value.size <= validation.value;
                                });
                            }
                            return fieldAcc;
                        }, fieldSchema);
                        break;
                    default:
                        fieldSchema = Yup.string();
                }
                fieldSchema = field.validations.reduce((fieldAcc: any, validation: any) => {
                    if (validation.name === 'required' && validation.value === true) {
                        fieldAcc = fieldAcc.required(validation.errorMessage);
                    } else if (validation.name === 'maxLength') {
                        fieldAcc = fieldAcc.max(validation.value, validation.errorMessage);
                    } else if (validation.name === 'pattern') {
                        fieldAcc = fieldAcc.matches(new RegExp(validation.value), validation.errorMessage);
                    } else if (validation.name === "minLength") {
                        fieldAcc = fieldAcc.min(validation.value, validation.errorMessage);
                    } else if (validation.name === 'maxLength') {
                        fieldAcc = fieldAcc.max(validation.value, validation.errorMessage);
                    }
                    return fieldAcc;
                }, fieldSchema);
                acc[field.name] = fieldSchema;
                return acc;
            }, {})
        });
        return validationSchema
    },

    getInitialValuesForStep: (steps: any, stepNumber: number, initialVals: any) => {
        const initialValues: { [key: string]: any } = {};
        const isValidInitialVals = initialVals && typeof initialVals === 'object';
        const step = steps.find((step: any) => step.stepNumber === stepNumber);
        if (step) {
            step.fields.forEach((field: any) => {
                // Use values from initialData if available, else default to empty string or array
                if (isValidInitialVals && field.name in initialVals) {
                    if (field.type === 'file') {
                        initialValues[field.name] = null;
                    } else {
                        // Use values from initialData if available, else default to empty string or array
                        initialValues[field.name] = initialVals[field.name];
                    }
                } else {
                    if (field.type === 'file') {
                        initialValues[field.name] = null;
                    } else {
                        initialValues[field.name] = (field.type === 'select' && field.selectType !== "single") ? [] : '';
                    }
                }
            });
        }
        return initialValues;
    }


    // getInitialValuesForStep: (steps: any, stepNumber: number,initial:object) => {
    //     const initialValues: { [key: string]: any } = {};
    //     const step = steps.find((step: any) => step.stepNumber === stepNumber);
    //     if (step) {
    //         step.fields.forEach((field: any) => {
    //             initialValues[field.name] = field.type === 'select' && field.selectType!=="single" ? [] : '';
    //         });
    //     }
    //     return initialValues
    // }

}