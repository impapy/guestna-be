import React from 'react';
import { Link } from "react-router-dom";

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    // csvJSON(csvText) {
    //     let lines = [];
    //     const linesArray = csvText.split('\n');
    //     // for trimming and deleting extra space 
    //     linesArray.forEach((e , index) => {
    //         const row = e.replace(/[\s]+[,]+|[,]+[\s]+/g, ',').trim();
    //         lines.push(row);
    //     });
        
    //     // for removing empty record
    //     lines.splice(lines.length - 1, 1);
    //     const result = [];
    //     const headers = lines[0].split(",");
    //     //console.log(headers)
    //     for (let i = 1; i < lines.length; i++) {

    //         const obj = {};
    //         const currentline = lines[i].split(",");

    //         for (let j = 0; j < headers.length; j++) {
    //             obj[headers[j]] = currentline[j];
    //         }
    //         result.push(obj);
    //     }
    //     console.log(result)
    // }

    //     converter(event) {
    //         const reader = new FileReader();
    //         reader.readAsText(event.target.files[0]);
    //         //console.log(event.target.files[0])
    //         reader.onload = () => {
    //             const text = reader.result;
    //             //console.log(text);
    //             this.csvJSON(text);

    //         };

    //     }

        render() {
            return (
                <div>

                </div>
            );
        }
    }

