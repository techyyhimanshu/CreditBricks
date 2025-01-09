


const CalendarDataService = {
    getStringDate: function (date: Date) {
        const givenDate = new Date(date);

        // Extract components
        const year = givenDate.getFullYear();
        const month = String(givenDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(givenDate.getDate()).padStart(2, '0');
        const hours = String(givenDate.getHours()).padStart(2, '0');
        const minutes = String(givenDate.getMinutes()).padStart(2, '0');
        const seconds = String(givenDate.getSeconds()).padStart(2, '0');

        // Format to 'YYYY-MM-DDTHH:mm:ss'
        const isoFormat = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return isoFormat
    },


    getInvestingAccountData: function (data: any, userdata: any[]) {

        // Prepare the account object
        const account = {
            id: "234e4567-e89b-12d3-a456-426614174000",
            createdBy: "system",
            updatedBy: "system",
            type: data.profile,
            status_id: "Active",
            type_name: data.profile,
            // createdAt: new Date(),
            // updatedAt: new Date(),
        };

        // Prepare the legal entity object
        const legalEntity = {
            id: "", // Set or generate this as necessary
            name: data.llc,
            address_1: data.address1,
            address_2: data.address2,
            city: data.city,
            state: data.state,
            country: "USA", // Assuming country as USA
            zipcode: data.zipcode,
            emailId: data.email, 
            phone_number: data.phone, 
            createdAt: new Date(),
            createdBy: "system", // Adjust as necessary
            updatedAt: new Date(),
            updatedBy: "system", // Adjust as necessary
        };

        // Prepare the user objects
        const users = userdata.map((user: any) => ({
            first_name: user.firstName,
            last_name: user.lastName,
            email_id: user.email,
            phone_number: user.mobile,
            updated_by: "system",
            created_by: "system",
            address_1: data.address1,
            address_2: data.address2,
            city: data.city,
            state: data.state,
            country: "USA",
            zipcode: data.zipcode,
            // createdAt: new Date(),
            // updated_at: new Date(),
        }));


        let finaldata;
        if (data.profile === "LLC") {
            finaldata = {
                account,
                user1: users[0],
                user2: users[1] || null,
                legalEntity,
            };
        } else if (data.profile === "Individual") {
            finaldata = {
                account,
                user1: users[0],
                user2: users[1] || null,
            };
        }

        return finaldata;

    }

}

export default CalendarDataService