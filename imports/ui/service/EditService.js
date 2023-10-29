import { Alert } from 'bootstrap';
import React, { useState } from 'react';

export class EditService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: "",
            name: "",
            startUploud : false


        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log("test");
        fetch(`/serviceAdmin?serviceId=${this.props.match.params.id}&userId=${Meteor.userId()}`)
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((json) => {


                console.log(json);
                this.setState({

                    ...json

                }, () => {
                    this.setState({
                        DataisLoaded: true
                    })
                });
            })

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    editService(e) {
        e.preventDefault()
        console.log(this.state)
        document.getElementById('addService').reset();

        var opj = { ...this.state }
        //delete opj.startUploud;
        delete opj.DataisLoaded;
        Meteor.call("editService", opj, (err, res) => {
            if (err) {
                alert(err)
            } else {
                alert("done")
                location.reload()


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
        this.setState({
            startUploud :true
        })
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
                this.setState({
                    startUploud :false
                })
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


                <h1 style={{ marginBottom: "50px" }}>اضافة الخدمات</h1>
                <div className="row">
                    <div className="col-lg-9 formBox" style={{ margin: "auto" }}>
                        <form onSubmit={this.editService.bind(this)} id="addService">
                            <div className="row" >
                                <div className="col-md-8" style={{ textAlign: "right" }}>
                                    <label>اسم الخدمة</label>
                                    <input type="text" className="form-control" placeholder="اسم الخدمة"
                                        name="name" onChange={this.handleChange.bind(this)} required={true}
                                        value={this.state.name} />
                                </div>


                                <div className="col-md-4 file-input" style={{ textAlign: "right" }}>
                                    <label htmlFor="icon">اضافة ايقونة </label>
                                    <input type="file" className="file" name="icon" id="icon"
                                        onChange={(e) => this.handleFileUploadIcon(e)} />

                                    {this.state.icon && !this.state.startUploud ?
                                        <img src={this.state.icon}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "230px"

                                            }} />
                                        : ""}

                                    {this.state.startUploud ?
                                        <div
                                            className="spinner-border"
                                            role="status"
                                            style={{ textAlign: "center" }}>
                                            <span className="sr-only"></span>
                                        </div>
                                        : ""}
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
