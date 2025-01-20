import * as Yup from 'yup';
import { getUserApi } from '../api/user-api';
const isUsernameAvailable = async (username: string) => {
    try {
        // Simulate a database call (replace this with actual logic)
        const existingUser = await getUserApi(username)
        return !existingUser.data.data; // Return true if the username is available
    } catch (error) {
        console.error("Error checking username availability:", error);
        return false;
    }

};
// Define the Yup validation schema
export const  addUserValidationSchema = Yup.object({
    personId: Yup.string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters")
        .max(50, "Username must be less than 50 characters").test(
            "isUsernameAvailable",
            "Username is already taken",
            async (value) => {
                if (!value) return true;
                return await isUsernameAvailable(value);
            }
        ),
    firstName: Yup.string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters")
        .max(50, "First Name must be less than 50 characters"),
    lastName: Yup.string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters")
        .max(50, "Last Name must be less than 50 characters"),
    personEmail: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    personGenderIdentity: Yup.object().shape({
        value: Yup.string().required("Gender is required"),
        label: Yup.string(),
    }),
    personBirthdate: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "Date of Birth cannot be in the future"),
    role: Yup.object()
        .shape({
            value: Yup.string().required("Role is required"),
            label: Yup.string(),
        })
        .required("Role is required"),
    country: Yup.object()
        .shape({
            value: Yup.string().required("Country is required"),
            label: Yup.string(),
        })
        .required("Country is required"),
    state: Yup.object()
        .shape({
            value: Yup.string().required("State is required"),
            label: Yup.string(),
        })
        .required("State is required"),
    city: Yup.object()
        .shape({
            value: Yup.string().required("City is required"),
            label: Yup.string(),
        })
        .required("City is required"),
    zipcode: Yup.string()
        .required("Zipcode is required")
        .matches(/^\d{6}$/, "Zipcode must be a number and 6 digit long"),
});
export const updateUserValidationSchema = Yup.object({
    personId: Yup.string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters")
        .max(50, "Username must be less than 50 characters"),
    firstName: Yup.string()
        .required("First Name is required")
        .min(2, "First Name must be at least 2 characters")
        .max(50, "First Name must be less than 50 characters"),
    lastName: Yup.string()
        .required("Last Name is required")
        .min(2, "Last Name must be at least 2 characters")
        .max(50, "Last Name must be less than 50 characters"),
    personEmail: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    personGenderIdentity: Yup.object().shape({
        value: Yup.string().required("Gender is required"),
        label: Yup.string(),
    }),
    personBirthdate: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "Date of Birth cannot be in the future"),
    role: Yup.object()
        .shape({
            value: Yup.string().required("Role is required"),
            label: Yup.string(),
        })
        .required("Role is required"),
    country: Yup.object()
        .shape({
            value: Yup.string().required("Country is required"),
            label: Yup.string(),
        })
        .required("Country is required"),
    state: Yup.object()
        .shape({
            value: Yup.string().required("State is required"),
            label: Yup.string(),
        })
        .required("State is required"),
    city: Yup.object()
        .shape({
            value: Yup.string().required("City is required"),
            label: Yup.string(),
        })
        .required("City is required"),
    zipcode: Yup.string()
        .required("Zipcode is required")
        .matches(/^\d{6}$/, "Zipcode must be a number and 6 digit long"),
});

