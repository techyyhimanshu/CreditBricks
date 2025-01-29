import * as Yup from 'yup';
import { getUserApi } from '../api/user-api';

const usernameCache: { [key: string]: boolean } = {};

const isUsernameAvailable = async (username: string) => {
    // if (usernameCache[username] !== undefined) {
    //     return usernameCache[username]; // Return cached result
    // }
    try {
        // Simulate a database call (replace this with actual logic)
        const existingUser = await getUserApi(username)
        const isAvailable = !existingUser.data.data;
        usernameCache[username] = isAvailable; // Cache the result
        return isAvailable; // Return true if the username is available
    } catch (error) {
        console.error("Error checking username availability:", error);
        return false;
    }

};
// Define the Yup validation schema
export const addUserValidationSchema = Yup.object({
    username: Yup.string()
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
    personGenderIdentity: Yup.object().shape({
        value: Yup.string().required("Gender is required"),
        label: Yup.string(),
    }),
    personEmail: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    personBirthdate: Yup.date()
        .required("Date of Birth is required")
        .max(new Date(), "Date of Birth cannot be in the future"),
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
    address: Yup.string().
        required("Address is required"),
    zipcode: Yup.string()
        .required("Zipcode is required")
        .matches(/^\d{6}$/, "Zipcode must be a number and 6 digit long"),
});
export const updateUserValidationSchema = Yup.object({
    username: Yup.string()
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

export const userDocumentValidationSchema = Yup.object({
    aadharNo: Yup.string()
        .required("Aadhar No. is required")
        .matches(/^\d{12}$/, "Aadhar No. must be a 12-digit number"),

    panNo: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "PAN No. must be in the format: 5 uppercase letters, 4 digits, and 1 uppercase letter (e.g., ABCDE1234F)"),

    gstinNo: Yup.string()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
            "GSTIN must follow the format: 15 alphanumeric characters (e.g., 22ABCDE1234F1Z5)"),

    passportNo: Yup.string()
        .matches(/^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/,
            "Passport No. must be valid (e.g., A1234567 or A123 4567)")
});

export const userPropertyValidationSchema = Yup.object({
    propertyName: Yup.string()
        .required(),
    ownerName: Yup.string()
        .required(),
    narration: Yup.object().shape({
        value: Yup.string().required("Naration is required"),
        label: Yup.string(),
    }),
});