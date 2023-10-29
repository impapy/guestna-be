import { Alert } from 'bootstrap';
import React, { useState } from 'react';

export class AddProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: "",
            name: "",
            about: "",
            phone: ""


        }
    }


    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    addService(e) {
        e.preventDefault()
        console.log(this.state)
        document.getElementById('addService').reset();
        Meteor.call("addProvider", this.state, (err, res) => {
            if (err) {
                alert(err)
            } else {
                alert("done")
                this.setState({
                    icon: "",
                    name: "",
                    about: "",
                    phone: ""

                })


            }
        })
    }

    convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    handleFileUploadIcon = async (e) => {
        document.getElementById("save").disabled = true;
        const file = e.target.files[0];
        console.log(file)
        const base64 = await this.convertToBase64(file);
        console.log(base64)
        Meteor.call("uploadImgForSer", base64, (err, ress) => {
            if (err) {
                console.log(err)
                this.setState({
                    icon: err
                })
            } else {
                console.log(ress)
                this.setState({
                    icon: ress
                })
                document.getElementById("save").disabled = false;
            }

        })

    }

    test(e) {
        Meteor.call("addReview", { providerID: "RbEjkWeNBdX8NHhWL", review: { first: "sdads" } }, (err, ress) => {
            if (err) {
                console.log(err)
            } else {
                console.log(ress)
            }
        })
    }

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "120px" }} className="container" dir="rtl">


                <h1 style={{ marginBottom: "50px" }}>اضافة مزود خدمة </h1>
                <div className="row">
                    <div className="col-lg-9 formBox" style={{ margin: "auto" }}>
                        <form onSubmit={this.addService.bind(this)} id="addService">
                            <div className="row" >
                                <div className="col-md-3" style={{ textAlign: "right" }}>
                                    <label>الاسم</label>
                                    <input type="text" className="form-control" placeholder="اسم الخدمة"
                                        name="name" onChange={this.handleChange.bind(this)} required={true}
                                        value={this.state.name} />
                                </div>

                                <div className="col-md-3" style={{ textAlign: "right" }}>
                                    <label>الرقم</label>
                                    <input type="text" className="form-control" placeholder=""
                                        name="phone" onChange={this.handleChange.bind(this)} required={true}
                                        value={this.state.phone} />
                                </div>


                                <div className="col-md-3 file-input" style={{ textAlign: "right" }}>
                                    <label htmlFor="icon">اضافة لوجو </label>
                                    <input type="file" className="file" name="icon" id="icon"
                                        onChange={(e) => this.handleFileUploadIcon(e)} />
                                    {this.state.icon ?
                                        <img src={this.state.icon}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "230px"

                                            }} />
                                        : ""}

                                </div>
                                <div className="col-md-3" style={{ textAlign: "right" }}>
                                    <label>عن</label>
                                    <textarea type="text" className="form-control" placeholder="عن"
                                        name="about" onChange={this.handleChange.bind(this)} required={true}
                                        value={this.state.about}
                                        style={{ minHeight: "240px" }} />
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-lg-12">
                                    <button className="btn btn-info" type="submit" id="save"
                                        style={{
                                            marginTop: "31px",
                                            padding: "10px 30px",
                                            borderRadius: "5px",
                                            color: "#fff"
                                        }}>
                                        حفظ
                                    </button >
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
};
