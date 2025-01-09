import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx"
import { Icheckdata, Igetdata, Igetsearched, Table } from "./database";

interface DataItem {
    name?: string;
    email?: string;
    amount?: number;
    [key: string]: any; // Allows additional properties
}

export const Tableservice = {
    //function for exporting data as pdf file
    saveAsPdf: function (arg: Table): void {
        const { dataToPrint, url } = arg;
        if (dataToPrint.length) {
            var col;
            var rows;
            switch (url) {
                case "users":
                    col = [['Id', 'Image', 'Age', 'First Name', 'Last Name', 'Email']];
                    rows = dataToPrint.map((el: any) => {
                        return [el.id, el.image, el.age, el.firstName, el.lastName, el.email]

                    })
                    break;
                case "products":
                    col = [['Id', 'Image', 'Title', 'Brand', 'Category', 'Price']];
                    rows = dataToPrint.map((el: any) => {
                        return [el.id, el.thumbnail, el.title, el.brand, el.category, el.price]

                    })
                    break;
            }
            const doc = new jsPDF({ orientation: 'landscape' });

            autoTable(doc, {
                head: col,
                body: rows,
            })
            doc.save("data.pdf")
        }
    },


    //function for exporting data as excel file
    saveAsExcel: function (data: Array<object>): void {
        if (data.length) {
            var wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, "DataSheet");
            XLSX.writeFile(wb, "Data.xlsx");
        }
    },

    saveAsExcelInvestor: function (data: Array<DataItem>): void {
        if (data.length) {
            const fields = ['offering', 'account', 'amount'];
        
        // Filter and map the data to include only the specified fields
        const filteredData = data.map(item => {
            const filteredItem: { [key: string]: any } = {};
            fields.forEach(field => {
                if (item.hasOwnProperty(field)) {
                    filteredItem[field] = item[field];
                }
            });
            return filteredItem;
        });
            var wb = XLSX.utils.book_new(),
                ws = XLSX.utils.json_to_sheet(filteredData);
            XLSX.utils.book_append_sheet(wb, ws, "DataSheet");
            XLSX.writeFile(wb, "Data.xlsx");
        }
    },

    //api call for getting data per page
    getData: async (args: Igetdata) => {
        // const { url, pages, perPage, filter, sortBy, order } = args
        const { url, pages, perPage,totalfilter, userId } = args
        const params: any = {
            limit: perPage,
            skip: (pages * perPage) - perPage,
        };

        if (userId) {
            params.userId = userId;
        }

        if (totalfilter) {
            Object.keys(totalfilter).forEach(key => {
                const filterValue = totalfilter[key];
                
                if (Array.isArray(filterValue)) {
                    // Join array values with commas if necessary
                    if (filterValue.length > 0) {
                        params[key] = filterValue
                    }
                } else {
                    params[key] = filterValue;
                }
            });
        }

        console.log(params)
        try {
            const res = await axios.get(`${url}`,{params})
            console.log(res)
            return res
        } catch (err) {
            return err
        }
    },

    //function for exporting data as excel file
    // copyToClipboard:function(data:any){
    //     var wb=XLSX.utils.book_new(),
    //     ws=XLSX.utils.json_to_sheet(data);

    //     XLSX.utils.book_append_sheet(wb,ws,"DataSheet");
    //     //XLSX.writeFile(wb,"Data.xlsx");
    //     var textField = document.createElement('textarea')
    //     textField.innerText = String(wb)
    //     document.body.appendChild(textField)
    //     textField.select()
    //     document.execCommand('copy')
    //     textField.remove()
    // },
    //api call for search functionality
    getSearchedData: async (args: Igetsearched) => {
        const { url, search,  perPage, filter } = args
        try {
            const res = await axios.get(`${url}/search?q=${search}&limit=${perPage}`, { params: filter })
            return res
        } catch (err) {
            return err
        }
    },


    //giving data to export as pdf on condition
    checkfordata: (args: Icheckdata) => {
        const { data, filtereddata, url } = args
        if (filtereddata.length) {
            Tableservice.saveAsPdf({ dataToPrint: filtereddata, url })
        } else {
            Tableservice.saveAsPdf({ dataToPrint: data, url })
        }
    },
    
    delete : async (...args:any) => {
        const [url,page,perPage,filter,sortBy,order]=args
        const query={
            params:{
                limit:perPage,
                skip:(page*perPage)-perPage,
                sortBy,
                order,
                name:filter.name,
                gender:filter.gender
            }
        }
        try {
            const res = await axios.get(`${url}`,query)
            return res
        } catch (err) {
            console.log(err)
        }
    }
}