import * as Yup from 'yup';

const validationSchema = (validationRules: any, formData: any) => {
  const schemaObject: any = {};
  validationRules.forEach((rule: any) => {
    const { fieldName, validations } = rule;
    let fieldSchema: any;

    // Handle array fields differently
    if (Array.isArray(formData[fieldName])) {
      fieldSchema = Yup.array();

      if (validations.required) {
        fieldSchema = fieldSchema.min(1, "At least one item is required");
      }

      if (validations.invalidEmailSelect) {
        fieldSchema = fieldSchema.of(
          Yup.string()
            .matches(
              /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
              'Invalid email address'
            )
        ).test(
          'array-email-validation',
          'Please enter valid email addresses',
          (value: any) => {
            // If value is not an array, consider it valid for this test
            if (!Array.isArray(value)) return true;

            // Check if all emails are valid
            return value.every((email: string) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
            );
          }
        );
      }
      if (validations.oneFieldRequired) {
        fieldSchema = fieldSchema.test(
          'atLeastOneRequired',
          'Either role or user must have at least one item',
          function () {
            // Access the whole form data from `this.parent`
            const role = formData.role
            const user = formData.user
            // Check if either role or user array has at least one item
            if (role.length > 0 || user.length > 0) {
              return true
            }

            return false; // Both are empty
          }
        );
      } if (validations.size) {
        fieldSchema = fieldSchema.test(
          'fileSize',
          'File size should not exceed 10 MB.',
          (value:any) => {
            // Check each file in the array
            return value.every((file:any) => file.size <= 10 * 1024 * 1024); // 10 MB
          }
        );
      } if (validations.fileType) {
        fieldSchema = fieldSchema.test(
          'fileType',
          'Only PDF, Excel, Ppt and Word files are allowed.',
          (value:any) => {
            // Define allowed file types
            const allowedTypes = [
              'application/pdf',
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'application/msword',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/vnd.ms-powerpoint',
              'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            ];
            // Check each file's type
            return value.every((file:any) => allowedTypes.includes(file.type));
          }
        );
      }
    }
    
    else {
      fieldSchema = Yup.string();
    }
    // schemaObject[fieldName] = Yup.string();
    schemaObject[fieldName] = Object.keys(validations).reduce((fieldSchema: any, validation: any) => {
      switch (validation) {
        case 'required':
          {
            if (validations.required) return fieldSchema.required("this field is required");
            return fieldSchema
          }
        case 'alphaNumericAllowed':
          return fieldSchema.matches(/^(?=.*[a-zA-Z0-9]).+$/, "Password must contain Alpha numeric character");
        case 'invalidEmail':
          return fieldSchema.matches(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'invalid email');
        case 'invalidMobile':
          return fieldSchema.matches(/^(0|91)?[6-9][0-9]{9}$/, "invalid mobile number");
        case 'maxength':
          return fieldSchema.max(validations.maxlength, `max ${validations.maxlength} characters`);
        case 'minlength':
          return fieldSchema.min(validations.minlength, `must be ${validations.minlength} characters`);
        case 'captcha':
          return fieldSchema.test(validations.captcha, "invalid captcha", function (value: string) {
            return value === validations.captcha
          })
        case 'capAllowed':
          return fieldSchema.matches(/^(?=.*[A-Z]).+$/, `${fieldName} must contain one capital character`)
        case 'numericAllowed':
          return fieldSchema.matches(/^(?=.*[0-9]).+$/, `${fieldName} must contain one numeric character`);
        case 'unique':
          {
            if (validations.unique) return fieldSchema.matches(/(?=.*?[#?!@$%^&*-])/, `${fieldName} must contain one unique character`)
            return fieldSchema
          }
        case 'invalidMissMatch':
          return fieldSchema.test(formData.password, "invalid password", function (value: string) {
            return value === formData.password
          });
        case 'minimumAmount' :
          return fieldSchema.test('min-value','Investing Amount must be greter',function(value:number){
            return value>=validations.minVal
          });
        case 'invalidTime':
          return fieldSchema.test('timeCheck', "End time cannot be before start time", function (value: any) {
            const startTime = formData.starttime;
            return startTime ? new Date(value) > new Date(startTime) : true;
          });
        default:
          return fieldSchema;
      }
    }, fieldSchema)

  })

  return Yup.object().shape(schemaObject);
};

export default validationSchema;
