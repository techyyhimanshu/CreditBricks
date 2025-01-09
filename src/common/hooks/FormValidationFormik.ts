import * as Yup from 'yup';

const generateYupSchema = (formData:any) => {
  let yupSchema = Yup.object().shape({
    steps: Yup.array().of(
      Yup.object().shape({
        fields: Yup.object().shape({}) // Initial empty object shape for fields
      })
    )
  });

  formData.steps.forEach((step: any) => {
    const stepSchema = Yup.object().shape({
      fields: Yup.object().shape(
        step.fields.reduce((fieldsSchema: any, field: any) => {
          let fieldValidator: Yup.AnySchema = Yup.mixed();

          switch (field.type) {
            case 'text':
            case 'textarea':
            case 'email':
              fieldValidator = Yup.string();
              break;
            case 'number':
              fieldValidator = Yup.number();
              break;
            // Add cases for other field types as needed
            default:
              break;
          }

          // Apply validations dynamically
          field.validations.forEach((validation: any) => {
            switch (validation.name) {
              case 'required':
                fieldValidator = fieldValidator.required(validation.errorMessage);
                break;
              case 'maxLength':
                if (fieldValidator instanceof Yup.string) {
                  fieldValidator = fieldValidator.max(validation.value, validation.errorMessage);
                }
                break;
              case 'pattern':
                if (fieldValidator instanceof Yup.string) {
                  fieldValidator = fieldValidator.matches(validation.value, validation.errorMessage);
                }
                break;
              // Add more cases for other validations as needed
              default:
                break;
            }
          });

          // Add the fieldValidator to the fieldsSchema
          return {
            ...fieldsSchema,
            [field.name]: fieldValidator,
          };
        }, {})
      )
    });

    // Update yupSchema to include the stepSchema for the current step
    yupSchema = yupSchema.shape({
      steps: Yup.array().of(stepSchema)
    });
  });

  return yupSchema;
};

export default generateYupSchema;
