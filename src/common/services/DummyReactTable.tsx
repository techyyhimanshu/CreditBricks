import React, { ChangeEvent, useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useTable, TableInstance, usePagination, useRowSelect, useSortBy, UseRowSelectInstanceProps } from "react-table"
import { Tableservice } from "./tableDataService"
import TableCheckBox from "../hooks/TableCheckBox"
import useDebounce from "../hooks/useDebounce";
import { Pagination } from "../hooks/Pagination";


interface dtData {
    id: number;
    name: string;
}
interface dtTableInstance extends TableInstance<dtData>, UseRowSelectInstanceProps<dtData> { }

interface ReactTableProps {
    columns: any,
    url: string,
    filter: object,
    page: string;
    getdata: (arg: Array<object>) => void
}

interface TableState {
    pages: number;
    totalRows: number;
    perPage: number;
    search: string;
    beingSearched: boolean;
    tableloader: boolean;
    data: any[];
    filtereddata: any[];
}


const fakeDataEvents = [
    {
        "title": "Event1",
        "date": "2024-07-01",
        "time": "09:00:00",
        "ticket": "Free",
        "status": "Scheduled",
        "organizer": "User1",
        "createdOn": "2024-06-15T10:00:00Z",
        "tenant": "Rajeev Kumar"
    },
    {
        "title": "Event2",
        "date": "2024-07-02",
        "time": "10:30:00",
        "ticket": "Free",
        "status": "Completed",
        "organizer": "User2",
        "createdOn": "2024-06-16T11:15:00Z",
        "tenant": "Suresh Rathi"
    },
    {
        "title": "Event3",
        "date": "2024-07-03",
        "time": "13:00:00",
        "ticket": "Paid",
        "status": "Cancelled",
        "organizer": "User3",
        "createdOn": "2024-06-17T14:30:00Z",
        "tenant": "Aditi Nair"
    },
    {
        "title": "Event4",
        "date": "2024-07-04",
        "time": "15:00:00",
        "ticket": "Paid",
        "status": "In Progress",
        "organizer": "User4",
        "createdOn": "2024-06-18T16:45:00Z",
        "tenant": "Ananya Gupta"
    },
    {
        "title": "Event5",
        "date": "2024-07-05",
        "time": "17:00:00",
        "ticket": "Free",
        "status": "Scheduled",
        "organizer": "User5",
        "createdOn": "2024-06-19T18:00:00Z",
        "tenant": "Ravi Joshi"
    },
    {
        "title": "Event6",
        "date": "2024-07-06",
        "time": "08:30:00",
        "ticket": "Paid",
        "status": "Completed",
        "organizer": "User6",
        "createdOn": "2024-06-20T09:15:00Z",
        "tenant": "Sneha Reddy"
    },
    {
        "title": "Event7",
        "date": "2024-07-07",
        "time": "11:00:00",
        "ticket": "Free",
        "status": "Scheduled",
        "organizer": "User7",
        "createdOn": "2024-06-21T12:30:00Z",
        "tenant": "Meera Singh"
    },
    {
        "title": "Event8",
        "date": "2024-07-08",
        "time": "14:00:00",
        "ticket": "Paid",
        "status": "In Progress",
        "organizer": "User8",
        "createdOn": "2024-06-22T15:45:00Z",
        "tenant": "Harsh Patel"
    },
    {
        "title": "Event9",
        "date": "2024-07-09",
        "time": "16:30:00",
        "ticket": "Free",
        "status": "Cancelled",
        "organizer": "User9",
        "createdOn": "2024-06-23T17:00:00Z",
        "tenant": "Pooja Jain"
    },
    {
        "title": "Event10",
        "date": "2024-07-10",
        "time": "19:00:00",
        "ticket": "Free",
        "status": "Scheduled",
        "organizer": "User10",
        "createdOn": "2024-06-24T19:30:00Z",
        "tenant": "Abhay Jain"
    }
]

const fakeDataMeetings = [
    {
        "title": "Event1",
        "date": "2024-07-01",
        "time": "09:00:00",
        "status": "Scheduled",
        "organizer": "User1",
        "createdOn": "2024-06-15T10:00:00Z",
        "tenant": "Rajeev Kumar"
    },
    {
        "title": "Event2",
        "date": "2024-07-02",
        "time": "10:30:00",
        "status": "Completed",
        "organizer": "User2",
        "createdOn": "2024-06-16T11:15:00Z",
        "tenant": "Suresh Rathi"
    },
    {
        "title": "Event3",
        "date": "2024-07-03",
        "time": "13:00:00",
        "status": "Cancelled",
        "organizer": "User3",
        "createdOn": "2024-06-17T14:30:00Z",
        "tenant": "Aditi Nair"
    },
    {
        "title": "Event4",
        "date": "2024-07-04",
        "time": "15:00:00",
        "status": "In Progress",
        "organizer": "User4",
        "createdOn": "2024-06-18T16:45:00Z",
        "tenant": "Ananya Gupta"
    },
    {
        "title": "Event5",
        "date": "2024-07-05",
        "time": "17:00:00",
        "status": "Scheduled",
        "organizer": "User5",
        "createdOn": "2024-06-19T18:00:00Z",
        "tenant": "Ravi Joshi"
    },
    {
        "title": "Event6",
        "date": "2024-07-06",
        "time": "08:30:00",
        "status": "Completed",
        "organizer": "User6",
        "createdOn": "2024-06-20T09:15:00Z",
        "tenant": "Sneha Reddy"
    },
    {
        "title": "Event7",
        "date": "2024-07-07",
        "time": "11:00:00",
        "status": "Scheduled",
        "organizer": "User7",
        "createdOn": "2024-06-21T12:30:00Z",
        "tenant": "Meera Singh"
    },
    {
        "title": "Event8",
        "date": "2024-07-08",
        "time": "14:00:00",
        "status": "In Progress",
        "organizer": "User8",
        "createdOn": "2024-06-22T15:45:00Z",
        "tenant": "Harsh Patel"
    },
    {
        "title": "Event9",
        "date": "2024-07-09",
        "time": "16:30:00",
        "status": "Cancelled",
        "organizer": "User9",
        "createdOn": "2024-06-23T17:00:00Z",
        "tenant": "Pooja Jain"
    },
    {
        "title": "Event10",
        "date": "2024-07-10",
        "time": "19:00:00",
        "status": "Scheduled",
        "organizer": "User10",
        "createdOn": "2024-06-24T19:30:00Z",
        "tenant": "Abhay Jain"
    }
]

const fakeDataDocument = [
    {
        "title": "Annual Report 2023",
        "type": "PDF",
        "uploaded_on": "2024-01-15",
        "based_on": "Company Financials",
        "url": "/documents/Data.pdf",
        "tenant": "Rajeev Kumar"
    },
    {
        "title": "Product Launch Presentation",
        "type": "PPT",
        "uploaded_on": "2024-02-10",
        "based_on": "Marketing Strategy",
        "tenant": "Suresh Rathi"
    },
    {
        "title": "HR Policy Handbook",
        "type": "DOCX",
        "uploaded_on": "2024-03-05",
        "based_on": "HR Regulations",
        "tenant": "Aditi Nair"
    },
    {
        "title": "Project Proposal for Q2",
        "type": "PDF",
        "uploaded_on": "2024-03-20",
        "based_on": "Project Planning",
        "tenant": "Ananya Gupta"
    },
    {
        "title": "Employee Training Manual",
        "type": "DOCX",
        "uploaded_on": "2024-04-12",
        "based_on": "Training Programs",
        "tenant": "Ravi Joshi"
    },
    {
        "title": "Client Feedback Report",
        "type": "XLSX",
        "uploaded_on": "2024-05-07",
        "based_on": "Client Surveys",
        "tenant": "Sneha Reddy"
    },
    {
        "title": "Market Research Study",
        "type": "PDF",
        "uploaded_on": "2024-06-01",
        "based_on": "Market Analysis",
        "tenant": "Meera Singh"
    },
    {
        "title": "Quarterly Budget Overview",
        "type": "XLSX",
        "uploaded_on": "2024-07-10",
        "based_on": "Financial Analysis",
        "tenant": "Harsh Patel"
    },
    {
        "title": "Sales Performance Metrics",
        "type": "PPT",
        "uploaded_on": "2024-08-15",
        "based_on": "Sales Data",
        "tenant": "Pooja Jain"
    },
    {
        "title": "IT Infrastructure Plan",
        "type": "PDF",
        "uploaded_on": "2024-09-05",
        "based_on": "IT Strategy",
        "tenant": "Abhay Jain"
    }
]

const fakeDataInvestment = [
    {
        "offering": "TechNova Inc.",
        "funding_date": "2024-01-15",
        "amount": 2500000,
        "distributed": 1500000,
        "%earnings": 15,
        "account": "John Smith",
        "tenant": "Alice Walker",
        "investor": "Bob Johnson",
        "status": "completed"
    },
    {
        "offering": "GreenSolutions Ltd.",
        "funding_date": "2024-02-20",
        "amount": 1000000,
        "distributed": 500000,
        "%earnings": 10,
        "account": "Emily Johnson",
        "tenant": "Grace Lee",
        "investor": "Henry Evans",
        "status": "pending"
    },
    {
        "offering": "QuantumLeap LLC",
        "funding_date": "2024-03-10",
        "amount": 7500000,
        "distributed": 4500000,
        "%earnings": 25,
        "account": "Michael Brown",
        "tenant": "Eve Turner",
        "investor": "Dan Miller",
        "status": "completed"
    },
    {
        "offering": "FutureWave Corp.",
        "funding_date": "2024-04-05",
        "amount": 10000000,
        "distributed": 7000000,
        "%earnings": 30,
        "account": "Jessica Davis",
        "tenant": "Liam Wilson",
        "investor": "Olivia Martinez",
        "status": "withdrawn"
    },
    {
        "offering": "BrightPath Ventures",
        "funding_date": "2024-05-12",
        "amount": 3000000,
        "distributed": 2000000,
        "%earnings": 12,
        "account": "David Wilson",
        "tenant": "Noah Smith",
        "investor": "Emma Johnson",
        "status": "pending"
    },
    {
        "offering": "Innovatech Solutions",
        "funding_date": "2024-06-18",
        "amount": 5000000,
        "distributed": 3000000,
        "%earnings": 18,
        "account": "Sarah Martinez",
        "tenant": "Sophia Brown",
        "investor": "James Davis",
        "status": "completed"
    },
    {
        "offering": "Vertex Dynamics",
        "funding_date": "2024-07-22",
        "amount": 2000000,
        "distributed": 1200000,
        "%earnings": 8,
        "account": "James Anderson",
        "tenant": "Mia Wilson",
        "investor": "Lucas Taylor",
        "status": "withdrawn"
    },
    {
        "offering": "NexGen Capital",
        "funding_date": "2024-08-01",
        "amount": 6000000,
        "distributed": 3500000,
        "%earnings": 22,
        "account": "Karen Thomas",
        "tenant": "Charlotte White",
        "investor": "Ethan Thompson",
        "status": "pending"
    },
    {
        "offering": "Skyline Technologies",
        "funding_date": "2024-08-25",
        "amount": 1500000,
        "distributed": 800000,
        "%earnings": 14,
        "account": "Robert Taylor",
        "tenant": "Amelia Harris",
        "investor": "Alexander Clark",
        "status": "completed"
    },
    {
        "offering": "Pinnacle Innovations",
        "funding_date": "2024-09-10",
        "amount": 4000000,
        "distributed": 2500000,
        "%earnings": 16,
        "account": "Lisa Moore",
        "tenant": "Ella Martinez",
        "investor": "William Lewis",
        "status": "pending"
    }
];


const fakeDataInvestingAccount = [
    {
        "name": "John Doe",
        "type": "individual",
        "address": "123 Elm Street, Springfield, IL 62701",
        "tenant": "Rajeev Kumar"
    },
    {
        "name": "Jane Smith",
        "type": "individual",
        "address": "456 Oak Avenue, Springfield, IL 62702",
        "tenant": "Suresh Rathi"
    },
    {
        "name": "Acme Corp LLC",
        "type": "LLC",
        "address": "789 Maple Road, Springfield, IL 62703",
        "tenant": "Ananya Gupta"
    },
    {
        "name": "Emily Johnson",
        "type": "individual",
        "address": "101 Pine Lane, Springfield, IL 62704",
        "tenant": "Ravi Joshi"
    },
    {
        "name": "Michael Brown",
        "type": "individual",
        "address": "202 Cedar Boulevard, Springfield, IL 62705",
        "tenant": "Sneha Reddy"
    },
    {
        "name": "Tech Innovations LLC",
        "type": "LLC",
        "address": "303 Birch Street, Springfield, IL 62706",
        "tenant": "Meera Singh"
    },
    {
        "name": "Alice Davis",
        "type": "individual",
        "address": "404 Willow Drive, Springfield, IL 62707",
        "tenant": "Harsh Patel"
    },
    {
        "name": "Bob Wilson",
        "type": "individual",
        "address": "505 Cherry Crescent, Springfield, IL 62708",
        "tenant": "Pooja Jain"
    },
    {
        "name": "Green Solutions LLC",
        "type": "LLC",
        "address": "606 Aspen Court, Springfield, IL 62709",
        "tenant": "Abhay Jain"
    },
    {
        "name": "Sarah Martinez",
        "type": "individual",
        "address": "707 Fir Avenue, Springfield, IL 62710",
        "tenant": "Harsh Singh"
    }
]

const fakeDataMyEvaluations = [
    {
        "id": "PND001",
        "name": "Tech Innovations Inc.",
        "owner": "Alice Johnson",
        "start_date": "2024-01-15",
        "due_date": "2024-06-15",
        "tenant": "Rajeev Kumar",
        "status": "requested"
    },
    {
        "id": "PND002",
        "name": "Green Solutions LLC",
        "owner": "David Brown",
        "start_date": "2024-02-01",
        "due_date": "2024-07-01",
        "tenant": "Suresh Rathi",
        "status": "pending"
    },
    {
        "id": "PND003",
        "name": "Future Vision Corp.",
        "owner": "Carol Davis",
        "start_date": "2024-03-10",
        "due_date": "2024-08-10",
        "tenant": "Aditi Nair",
        "status": "completed"
    },
    {
        "id": "PND004",
        "name": "Innovative Dynamics Ltd.",
        "owner": "George Miller",
        "start_date": "2024-04-05",
        "due_date": "2024-09-05",
        "tenant": "Ananya Gupta",
        "status": "requested"
    },
    {
        "id": "PND005",
        "name": "EcoTech Enterprises",
        "owner": "Samantha Martinez",
        "start_date": "2024-05-20",
        "due_date": "2024-10-20",
        "tenant": "Ravi Joshi",
        "status": "pending"
    },
    {
        "id": "PND006",
        "name": "Quantum Leap Solutions",
        "owner": "Michael Anderson",
        "start_date": "2024-06-15",
        "due_date": "2024-11-15",
        "tenant": "Sneha Reddy",
        "status": "completed"
    },
    {
        "id": "PND007",
        "name": "Synergy Technologies",
        "owner": "Emily Robinson",
        "start_date": "2024-07-01",
        "due_date": "2024-12-01",
        "tenant": "Meera Singh",
        "status": "requested"
    },
    {
        "id": "PND008",
        "name": "Pinnacle Ventures",
        "owner": "Daniel Harris",
        "start_date": "2024-08-10",
        "due_date": "2024-01-10",
        "tenant": "Harsh Patel",
        "status": "pending"
    },
    {
        "id": "PND009",
        "name": "Bright Future Labs",
        "owner": "Jessica Nelson",
        "start_date": "2024-09-05",
        "due_date": "2024-02-05",
        "tenant": "Pooja Jain",
        "status": "completed"
    },
    {
        "id": "PND010",
        "name": "Vertex Innovations",
        "owner": "William King",
        "start_date": "2024-10-01",
        "due_date": "2024-03-01",
        "tenant": "Abhay Jain",
        "status": "requested"
    }
];


const fakeApplication = [
    {
        "id": 1,
        "title": "Fund Raise",
        "startupname": "Pointo",
        "stage": "Series A",
        "startdt": "7/15/2024",
        "status": "Submitted",
        "tenant": "Venture Capital Group",
        "applicant": "Alice Johnson"
    },
    {
        "id": 2,
        "title": "Seed Round",
        "startupname": "Nexify",
        "stage": "Seed",
        "startdt": "8/01/2024",
        "status": "In Review",
        "tenant": "Innovate Partners",
        "applicant": "Bob Smith"
    },
    {
        "id": 3,
        "title": "Series B Funding",
        "startupname": "AeroTech",
        "stage": "Series B",
        "startdt": "8/15/2024",
        "status": "Approved",
        "tenant": "Growth Ventures",
        "applicant": "Carla Martinez"
    },
    {
        "id": 4,
        "title": "Pre-Seed Round",
        "startupname": "EcoSpark",
        "stage": "Pre-Seed",
        "startdt": "9/01/2024",
        "status": "Submitted",
        "tenant": "Seed Capital Fund",
        "applicant": "David Lee"
    },
    {
        "id": 5,
        "title": "Series C Round",
        "startupname": "TechNova",
        "stage": "Series C",
        "startdt": "9/15/2024",
        "status": "In Review",
        "tenant": "Tech Innovators Inc.",
        "applicant": "Emily Chen"
    },
    {
        "id": 6,
        "title": "Seed Investment",
        "startupname": "BioGenix",
        "stage": "Seed",
        "startdt": "10/01/2024",
        "status": "Approved",
        "tenant": "Biotech Capital",
        "applicant": "Frank Davis"
    },
    {
        "id": 7,
        "title": "Series A Funding",
        "startupname": "InnoWave",
        "stage": "Series A",
        "startdt": "10/15/2024",
        "status": "Submitted",
        "tenant": "Innovation Partners",
        "applicant": "Grace Thompson"
    },
    {
        "id": 8,
        "title": "Bridge Round",
        "startupname": "SmartFlow",
        "stage": "Bridge",
        "startdt": "11/01/2024",
        "status": "In Review",
        "tenant": "Strategic Investors",
        "applicant": "Hannah Williams"
    },
    {
        "id": 9,
        "title": "Series B Investment",
        "startupname": "QuantumLeap",
        "stage": "Series B",
        "startdt": "11/15/2024",
        "status": "Approved",
        "tenant": "Capital Growth Fund",
        "applicant": "Isaac Brown"
    },
    {
        "id": 10,
        "title": "Early Stage Funding",
        "startupname": "HealthGen",
        "stage": "Early Stage",
        "startdt": "12/01/2024",
        "status": "Submitted",
        "tenant": "HealthTech Ventures",
        "applicant": "Julia Green"
    }
];

const fakeMyStartup = [
    {
        "name": "TechNova Solutions",
        "address": "Delhi, India",
        "incorporationdate": "7/15/2024",
        "status": "Active",
        "founder": "Amit Sharma",
        "tenant": "Rajeev Kumar",
        "arr": "$1,000,000",
        "valuation": "$5,000,000",
        "stage": "Series A"
    },
    {
        "name": "GreenTech Innovations",
        "address": "Mumbai, India",
        "incorporationdate": "7/16/2024",
        "status": "Inactive",
        "founder": "Priya Mehta",
        "tenant": "Suresh Rathi",
        "arr": "$750,000",
        "valuation": "$3,000,000",
        "stage": "Seed"
    },
    {
        "name": "Quantum Dynamics Inc.",
        "address": "Bangalore, India",
        "incorporationdate": "7/17/2024",
        "status": "Active",
        "founder": "Nikhil Rao",
        "tenant": "Aditi Nair",
        "arr": "$2,000,000",
        "valuation": "$10,000,000",
        "stage": "Series B"
    },
    {
        "name": "FutureWave Technologies",
        "address": "Chennai, India",
        "incorporationdate": "7/18/2024",
        "status": "Active",
        "founder": "Sanjay Iyer",
        "tenant": "Ananya Gupta",
        "arr": "$1,500,000",
        "valuation": "$7,500,000",
        "stage": "Series A"
    },
    {
        "name": "Global Ventures Ltd.",
        "address": "Kolkata, India",
        "incorporationdate": "7/19/2024",
        "status": "Active",
        "founder": "Maya Sen",
        "tenant": "Ravi Joshi",
        "arr": "$2,500,000",
        "valuation": "$12,000,000",
        "stage": "Series C"
    },
    {
        "name": "InnovateX Solutions",
        "address": "Hyderabad, India",
        "incorporationdate": "7/20/2024",
        "status": "Inactive",
        "founder": "Kiran Patel",
        "tenant": "Sneha Reddy",
        "arr": "$500,000",
        "valuation": "$2,000,000",
        "stage": "Seed"
    },
    {
        "name": "Vertex Technologies",
        "address": "Pune, India",
        "incorporationdate": "7/21/2024",
        "status": "Active",
        "founder": "Vikram Deshmukh",
        "tenant": "Meera Singh",
        "arr": "$1,200,000",
        "valuation": "$6,000,000",
        "stage": "Series A"
    },
    {
        "name": "NexGen Enterprises",
        "address": "Ahmedabad, India",
        "incorporationdate": "7/22/2024",
        "status": "Active",
        "founder": "Neha Patel",
        "tenant": "Harsh Patel",
        "arr": "$1,800,000",
        "valuation": "$9,000,000",
        "stage": "Series B"
    },
    {
        "name": "Synergy Networks",
        "address": "Jaipur, India",
        "incorporationdate": "7/23/2024",
        "status": "Inactive",
        "founder": "Rohit Verma",
        "tenant": "Pooja Jain",
        "arr": "$400,000",
        "valuation": "$1,500,000",
        "stage": "Seed"
    },
    {
        "name": "Pinnacle Innovations",
        "address": "Surat, India",
        "incorporationdate": "7/24/2024",
        "status": "Active",
        "founder": "Rita Shah",
        "tenant": "Amit Bhardwaj",
        "arr": "$2,000,000",
        "valuation": "$8,000,000",
        "stage": "Series B"
    }
];

const fakeTenants = [
    {
        "id": "PND001",
        "name": "Tech Innovations Inc.",
        "owner/founder/operator": "Alice Johnson",
        "status": "Active",
        "start_date": "2024-01-15",
        "expires_on": "2024-06-15"
    },
    {
        "id": "PND002",
        "name": "Green Solutions LLC",
        "owner/founder/operator": "David Brown",
        "status": "Active",
        "start_date": "2024-02-01",
        "expires_on": "2024-07-01"
    },
    {
        "id": "PND003",
        "name": "Future Vision Corp.",
        "owner/founder/operator": "Carol Davis",
        "status": "Active",
        "start_date": "2024-03-10",
        "expires_on": "2024-08-10"
    },
    {
        "id": "PND004",
        "name": "Innovative Dynamics Ltd.",
        "owner/founder/operator": "George Miller",
        "status": "Active",
        "start_date": "2024-04-05",
        "expires_on": "2024-09-05"
    },
    {
        "id": "PND005",
        "name": "EcoTech Enterprises",
        "owner/founder/operator": "Samantha Martinez",
        "status": "Active",
        "start_date": "2024-05-20",
        "expires_on": "2024-10-20"
    },
    {
        "id": "PND006",
        "name": "Quantum Leap Solutions",
        "owner/founder/operator": "Michael Anderson",
        "status": "Active",
        "start_date": "2024-06-15",
        "expires_on": "2024-11-15"
    },
    {
        "id": "PND007",
        "name": "Synergy Technologies",
        "owner/founder/operator": "Emily Robinson",
        "status": "Active",
        "start_date": "2024-07-01",
        "expires_on": "2024-12-01"
    },
    {
        "id": "PND008",
        "name": "Pinnacle Ventures",
        "owner/founder/operator": "Daniel Harris",
        "status": "Inactive",
        "start_date": "2024-08-10",
        "expires_on": "2024-01-10"
    },
    {
        "id": "PND009",
        "name": "Bright Future Labs",
        "owner/founder/operator": "Jessica Nelson",
        "status": "Inactive",
        "start_date": "2024-09-05",
        "expires_on": "2024-02-05"
    },
    {
        "id": "PND010",
        "name": "Vertex Innovations",
        "owner/founder/operator": "William King",
        "status": "Inactive",
        "start_date": "2024-10-01",
        "expires_on": "2024-03-01"
    }
];


const DummyReactTable = (props: ReactTableProps): JSX.Element => {
    const { columns, url, filter, getdata, page } = props
    const [userType, setUserType] = useState<string>("")

    useEffect(() => {
        const user = localStorage.getItem("userType")
        if (user) {
            setUserType(user)
        }
    }, [localStorage])

    const modifiedColumns = React.useMemo(() => {
        if (userType === "admin" || userType === "tenantAdmin") {
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }: any) => (
                        <TableCheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }: any) => (
                        <TableCheckBox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ];
        }
        return columns;
    }, [columns]);

    const [tableState, setTableState] = useState<TableState>({
        pages: 1,
        totalRows: 0,
        perPage: 10,
        search: "",
        beingSearched: false,
        tableloader: false,
        data: [],
        filtereddata: [],
    });


    const debounceSearch = useDebounce(tableState.search, 500)

    const { pages, perPage, search, beingSearched, tableloader, data, filtereddata, totalRows } = tableState;

    

    const Actions = (
        <>
            <div className="d-flex flex-row justify-content-between mb-2">
                <div className="flex-fill mt-2">
                    {/* <span className="float-start">Rows per Page:</span>
                    <select className="form-controls form-control-sm col-1 float-start ms-2 mm-5"
                        value={perPage}
                        onChange={(e) => setTableState((prevState) => ({ ...prevState, perPage: Number(e.target.value) }))}
                    >
                        {[10, 15, 20, 25, 30].map((pageSize) => (
                            <option key={pageSize} value={pageSize} disabled={pageSize > 10}>
                                {pageSize}
                            </option>
                        ))}
                    </select> */}
                </div>

                    {
                        
                        ((userType != "admin" && userType != "tenantAdmin") ||
                        ((userType === "admin"|| userType==="tenantAdmin") && page !== "investment"))&&
                        <div className="col-4 pe-0  float-end">
                       <Row className="m-0">
                        
                            <Form.Control type="text" placeholder="Search here..." className="form-control col-sm-9"
                                value={search}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setTableState((prevState) => ({ ...prevState, beingSearched: true, search: e.target.value })) }} />
                            <Col xl={3}>
                                <Button className="btn btn-primary btn-sm w-100 h-33 tx-14" onClick={handleExport}><i className="bi bi-file-earmark-excel"></i> Export</Button>


                            </Col>
                        </Row>
                        </div>
                    }
                    {
                        ((userType === "admin" || userType === "tenantAdmin") && page === "investment") &&
                        <div className="col-5 pe-0  float-end">
                        <Row className="m-0">
                            <Form.Control type="text" placeholder="Search here..." className="form-control col-sm-7"
                                value={search}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => { setTableState((prevState) => ({ ...prevState, beingSearched: true, search: e.target.value })) }} />
                            <Col xl={5} className="text-end p-0">
                                <Button className="btn btn-primary btn-sm h-33 tx-14" onClick={handleExport}><i className="bi bi-file-earmark-excel"></i> Export</Button>


                                <Button className="btn btn-primary btn-sm h-33 tx-14 ms-1" onClick={handleExportInvestor}><i className="bi bi-file-earmark-excel"></i> Export Investor</Button>


                            </Col>
                        </Row>
                            </div>
                    }
                </div>

        </>
    );

    function handleExport() {
        Tableservice.saveAsExcel(data)
    }

    function handleExportInvestor() {
        Tableservice.saveAsExcelInvestor(data)
    }

    useEffect(() => {
        // setTableState((prevState: any) => ({ ...prevState, tableloader: true }));
        // const fetchDataFunction = debounceSearch
        //     ? Tableservice.getSearchedData
        //     : Tableservice.getData;
        // var str: any = {
        //     url: url,
        //     search: debounceSearch,
        //     pages: pages,
        //     perPage: perPage,
        //     filter: search
        // }
        // fetchDataFunction(str)
        //     .then((res: any) => {
        //         if (!beingSearched) {
        //             setTableState((prevState) => ({
        //                 ...prevState,
        //                 tableloader: false,
        //                 totalRows: 10||res.data.total,
        //                 data: res.data[Object.keys(res.data)[0]],
        //             }));
        //         } else {
        //             setTableState((prevState) => ({
        //                 ...prevState,
        //                 data: [],
        //                 tableloader: false,
        //                 totalRows: 10||res.data.total,
        //                 beingSearched: true,
        //                 filtereddata: res.data[Object.keys(res.data)[0]],
        //             }));
        //         }
        //     })
        //     .catch((err: any) => console.log(err));
        let newData: any = [];
        let totalRows = 0;

        switch (page) {
            case "documents":
                newData = fakeDataDocument;
                totalRows = fakeDataDocument.length;
                break;
            case "investment":
                newData = fakeDataInvestment;
                totalRows = fakeDataInvestment.length;
                break;
            case "investingaccount":
                newData = fakeDataInvestingAccount;
                totalRows = fakeDataInvestingAccount.length;
                break;
            case "events":
                newData = fakeDataEvents;
                totalRows = fakeDataEvents.length;
                break;
            case "meetings":
                newData = fakeDataMeetings;
                totalRows = fakeDataMeetings.length;
                break;
            case "myevaluations":
                newData = fakeDataMyEvaluations;
                totalRows = fakeDataMyEvaluations.length;
                break;
            case 'applications':
                newData = fakeApplication;
                totalRows = fakeApplication.length
                break;
            case 'mystartup':
                newData = fakeMyStartup;
                totalRows = fakeMyStartup.length
                break;
            case 'tenants':
                newData = fakeTenants;
                totalRows = fakeTenants.length
                break;
            default:
                break;
        }

        setTableState((prevState) => ({
            ...prevState,
            tableloader: false,
            totalRows: totalRows,
            data: newData,
        }));
    }, [beingSearched, pages, perPage, filter, url, debounceSearch, setTableState]);

    //using react table and giving data to it
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable<any>(
        {
            columns: modifiedColumns,
            //   data: beingSearched ? filtereddata : data,
            data: data,
            initialState: {
                pageIndex: 0,
                pageSize: 10,
                globalFilter: '',
            },
            manualPagination: true,
            manualGlobalFilter: true,
        },
        useSortBy,
        usePagination,
        useRowSelect,

    ) as dtTableInstance;

    const changingpage = (val: number) => {
        setTableState((prevState) => ({ ...prevState, pages: val }));
    }

    //getting row selected and mapping thorough array of object and passing data to parent(page)
    useEffect(() => {
        const selectedRowData = selectedFlatRows?.map((el: { original: any }) => el.original)
        getdata(selectedRowData);
    }, [selectedFlatRows])

    return (
        <div className="table-responsive">
            <div className="headers">
                {Actions}
            </div>
            {
                tableloader && <div className="text-center mt-5 mb-5"><div className="lds-ripple"><div></div><div></div></div></div>
            }
            {
                !data.length && !filtereddata.length && !tableloader && <h3 className="errormsg">There are no records to display</h3>
            }
            {
                !tableloader && (data.length !== 0 || filtereddata.length !== 0) && <div className="table">
                    <Table
                        id="delete-datatable"
                        className="table table-bordered table-striped table-hover mb-0 text-md-nowrap table" {...getTableProps()} >
                        <thead>
                            {headerGroups.map((headerGroup: any) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                                    {headerGroup.headers.map((column: any) => (
                                        <th
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            className={column.className} key={Math.random()}
                                        >
                                            <span className="tabletitle">{column.render("Header")}</span>
                                            <span>
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <span>&darr;</span>
                                                    ) : (
                                                        <span>&uarr;</span>
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row: any) => {
                                prepareRow(row);
                                const rowProps = row.getRowProps();
                                const { key, ...restRowProps } = rowProps;
                                return (
                                    <tr key={key} {...restRowProps}>
                                        {row.cells.map((cell: any) => {
                                            const cellProps = cell.getCellProps();
                                            const { key: cellKey, ...restCellProps } = cellProps;
                                            return (
                                                <td key={cellKey} {...restCellProps}> {cell.isGrouped ? (
                                                    <>
                                                        <span {...row.getToggleRowExpandedProps()}>
                                                            {row.isExpanded ? '👇' : '👉'}
                                                        </span>{' '}
                                                        {cell.render('Cell')} ({row.subRows.length})
                                                    </>
                                                ) : cell.isAggregated ? (
                                                    cell.render('Aggregated')
                                                ) : cell.isPlaceholder ? null : (
                                                    cell.render('Cell')
                                                )}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            }
            {
                (data.length !== 0 || filtereddata.length !== 0) && <Pagination pages={pages} totalRows={totalRows} perPage={perPage} changingpage={changingpage} />
            }
        </div>
    )
}

export default DummyReactTable;


