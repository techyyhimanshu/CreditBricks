import React, { useState } from 'react';
import validationSchema from '../../common/services/validationSchema';

interface OptionType {
  value: string;
  label: string;
}
interface UseFormValidationProps {
  validationRules: { fieldName: string; value: any; validations: object }[];
}

type UserRole = 'Funding' | 'Customer Development' | 'Advisory';

const useFormValidation = ({ validationRules }: UseFormValidationProps) => {
  const frmParam: Record<string, string> = {};
  validationRules.forEach((x: { fieldName: string; value: string; }) => {
    frmParam[x.fieldName as string] = x.value || '';
  });
  const [formData, setFormData] = useState<any>(frmParam);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validationrules, setValidationRules] = useState(validationRules)

  const validationSch = validationSchema(validationrules, formData);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file' && files) {
      // Handle file input
      const fileArray = Array.from(files);
      try {
        await validationSch.validateAt(name, { [name]: fileArray });
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name]; // Remove the error for the current field
          return newErrors;
        });
        setFormData((prev: any) => {
          const updatedFiles = [...prev.file, ...files]
          return { ...prev, [name]: updatedFiles }
        });
      } catch (error: any) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
      }
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }

  };

  const handleRemoveFile = (name: string, fileToRemove: File) => {
    setFormData((prev: any) => {
      const updatedFiles = (prev[name] || []).filter((file: File) => file.name !== fileToRemove.name);
      return { ...prev, [name]: updatedFiles };
    });
    setErrors({});
  };


  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
      await validationSch.validateAt(name, { [name]: value });
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; // Remove the error for the current field
        return newErrors;
      });
    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  }


  const handleReactSelectChanges = async (newValue: any, actionMeta: any) => {

    let selectedValue: any;
    if (Array.isArray(newValue)) {
      // Handle array of options (multiple select)
      selectedValue = newValue ? newValue.map((option: OptionType) => option.value) : [];
    } else {
      // Handle single value (single select)
      selectedValue = newValue ? (newValue as OptionType).value : '';
    }

    setFormData({ ...formData, [actionMeta.name]: selectedValue });
    const isValid = validateSelectValue(selectedValue);
    if (isValid) {
      setErrors({});
    }
  };

  const handleValidationRulesChange = (newValue: any) => {
    let updatedRules = [...validationrules];
    let selectedValue = newValue ? (newValue as OptionType).value : '';
    if (selectedValue === 'LLC') {
      updatedRules = updatedRules.map(rule => {
        if (rule.fieldName === 'nameFirst' || rule.fieldName === 'nameLast') {
          return { ...rule, validations: { ...rule.validations, required: false } };
        }
        if (rule.fieldName === 'llc' || rule.fieldName === 'retirement' || rule.fieldName === "email" || rule.fieldName === "phone") {
          return { ...rule, validations: { ...rule.validations, required: true } };
        }
        return rule;
      });
    } else {
      updatedRules = updatedRules.map(rule => {
        if (rule.fieldName === 'nameFirst' || rule.fieldName === 'nameLast') {
          return { ...rule, validations: { ...rule.validations, required: true } };
        }
        if (rule.fieldName === 'llc' || rule.fieldName === 'retirement' || rule.fieldName === "email" || rule.fieldName === "phone") {
          return { ...rule, validations: { ...rule.validations, required: false } };
        }
        return rule;
      });
    }
    setValidationRules(updatedRules)

  }

  const handleRuleChangeUserType = (userType: string) => {
    let updatedRules = [...validationrules];
    if (userType === 'investor' || userType === 'founder') {
      updatedRules = updatedRules.map(rule => {
        if (rule.fieldName === 'role' || rule.fieldName === 'user') {
          return { ...rule, validations: { ...rule.validations, oneFieldRequired: false } };
        }
        return rule
      })
    } else {
      updatedRules = updatedRules.map(rule => {
        if (rule.fieldName === 'role' || rule.fieldName === 'user') {
          return { ...rule, validations: { ...rule.validations, oneFieldRequired: true } };
        }
        return rule
      });
    }
    setValidationRules(updatedRules);
  };

  const handleRuleChangeRoleType = (userType: UserRole[], currentStep: number, stepNames: string[]) => {
    let updatedRules = [...validationrules];

    const requiredFields: { [key in UserRole]: { [step: string]: string[] } } = {
      Funding: {
        'Funding': [
          'totalcapital',
          'raisedsofar',
          'valuation',
          'mininvestment',
          'closingdt',
          'publicdeallink',
          'terms'
        ]
      },
      'Customer Development': {
        'Customer Development': [
          'geographies',
          'Minordersize',
          'businesstype'
        ]
      },
      Advisory: {
        'Advisory': [
          'details',
          'checkboxes'
        ]
      },
    };
    const currentStepName = stepNames[currentStep - 1];
    const requiredFieldNames = userType.flatMap(userType => {
      const fields = requiredFields[userType]?.[currentStepName] || [];
      return fields;
    });

    updatedRules = updatedRules.map(rule => {
      if (rule.fieldName === 'applicationname' || rule.fieldName === 'startup') {
        return { ...rule, validations: { ...rule.validations, required: true } };
      }
      // If the rule field is within the range of steps that should be validated
      if (requiredFieldNames.includes(rule.fieldName) && stepNames.indexOf(currentStepName) >= stepNames.indexOf(rule.fieldName)) {
        return { ...rule, validations: { ...rule.validations, required: true } };
      } else {
        // Reset to default validation for fields not needed in the current step
        return { ...rule, validations: { ...rule.validations, required: false } };
      }
    });
    setValidationRules(updatedRules);
  };

  const validateSelectValue = (value: string) => {
    return value !== '';
  };

  const handleChangeCostom = async (name: string, value: Date | string) => {
    // setFormData({ ...formData, [name]: value });
    setFormData((prevFormData: any) => {
      const updatedFormData = { ...prevFormData, [name]: value };
      return updatedFormData;
    });
    try {
      await validationSch.validateAt(name, { [name]: value });
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name]; // Remove the error for the current field
        return newErrors;
      });
    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const validateForm = async () => {
    try {
      await validationSch.validate(formData, { abortEarly: false });
      return true; // Form is valid
    } catch (validationErrors: any) {
      const newErrors: Record<string, string> = {};
      if (validationErrors.inner) {

        validationErrors.inner.forEach((error: any, inx: number) => {
          if (inx == 0) {
            setErrorAndFocus(error.path, "Please check form's data before submitting ");
          }
          newErrors[error.path] = error.message;
        });
      }
      setErrors(newErrors);
      throw validationErrors;
    }
  };

  const focusOnField = (fieldName: string) => {
    const element = document.getElementById(fieldName);
    if (element) {
      element.focus();
    }
  };

  const setErrorAndFocus = (fieldName: string, error: string) => {
    setErrors({ [fieldName]: error });
    focusOnField(fieldName);
  };

  const resetFormData = () => {
    setFormData(frmParam);
    setErrors({});
  };

  return { formData, errors, handleChange, validateForm, handleReactSelectChanges, handleChangeCostom, handleBlur, handleRemoveFile, resetFormData, handleValidationRulesChange, handleRuleChangeUserType, handleRuleChangeRoleType };
};

export default useFormValidation;

