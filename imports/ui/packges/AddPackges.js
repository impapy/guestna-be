import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import $ from "jquery";
import { SimpleMap } from "../SimpleMap"

export class AddPackges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gallary: [],
            name: "",
            availableSeats: 1,
            fromDay: "",
            toDay: "",
            fromHour: "",
            toHour: "",
            description: "",
            type: "honeymoon",
            location: { lat: "", lang: "", city: "", st: "" },
            events: [],
            normalPrice: "",
            discountedPrice: "",
            conditionalPrice: "",
            healthInfo: "",
            accessibility: "",
            tips: "",
            SEO: [],
            difficulty: "",
            distance: "",
            services: [],
            defaultView: [],
            providers :[],
            rate : 0 



        }

        this.getData = this.getData.bind(this);

    }
    getData(val) {
        console.log(val)
        this.setState({ location: val }, (err) => {
            if (err) { console.log(err); } else { console.log(this.state.location) }
        })
        return val
    }
    showSer(e) {
        console.log(e);
        $(e.target).closest("li").toggleClass("active", this.checked)
    }
    componentDidMount() {
        fetch(`/allEvents?userId=${Meteor.userId()}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    events: json,
                    DataisLoaded: true
                });
            })
        fetch(`/allProvidersAdmin?userId=${Meteor.userId()}`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    providers: json,
                    DataisLoaded: true
                });
            })

        var checkList1 = document.getElementById('list1');
        checkList1.getElementsByClassName('anchor')[0].onclick = function (evt) {
            if (checkList1.classList.contains('visible'))
                checkList1.classList.remove('visible');
            else
                checkList1.classList.add('visible');
        };
        var checkList2 = document.getElementById('list2');
        checkList2.getElementsByClassName('anchor')[0].onclick = function (evt) {
            if (checkList2.classList.contains('visible'))
                checkList2.classList.remove('visible');
            else
                checkList2.classList.add('visible');
        };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    addService(e) {
        e.preventDefault()
        console.log(this.state)

        //document.getElementById('addService').reset();
        var markedCheckbox = document.getElementsByClassName('selectedServices');
        var tempArr = []
        var tempCityArr = []
        var tempArrSec = []
        for (let i = 0; i < markedCheckbox.length; i++) {
            if (markedCheckbox[i].checked) {
                for (let x = 0; x < this.state.events.length; x++) {
                    const element = this.state.events[x];
                    if (element._id === markedCheckbox[i].value) {


                        if (tempCityArr.includes(element.city[0])) {

                        } else {
                            tempCityArr.push(element.city[0])
                        }
                        tempArrSec.push({
                            fromDay : element.fromDay,
                            toDay : element.toDay
                        })

                        tempArr.push(
                            element._id,
                          
                        )

                    }

                }
            }

        }
        console.log(tempArr);
        var fromDayArr = []
        var toDayArr = []
        tempArrSec.forEach((element) => {
            fromDayArr.push(element.fromDay)
            toDayArr.push(element.toDay)
        })
        var fromDay = fromDayArr.reduce(function (a, b) { return a < b ? a : b; })
        var toDay = toDayArr.reduce(function (a, b) { return a > b ? a : b; })
        console.log(toDay);
        this.setState({
            events: tempArr,
            fromDay: fromDay,
            toDay: toDay,
            city: tempCityArr
        }, 
        () => {
            Meteor.call("addPackage", this.state, (err, res) => {
                if (err) {
                    alert(err)
                } else {
                    alert("done")
                   location.reload()


                }
            })
        }
        )

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


    handleFileUploadImg = async (e) => {
        document.getElementById("save").disabled = true;
        const file = e.target.files[0];
        console.log(file)
        const base64 = await this.convertToBase64(file);
        console.log(base64)
        Meteor.call("uploadImgForSer", base64, (err, ress) => {
            if (err) {
                console.log(err)
                this.setState({
                    img: err
                })
            } else {
                console.log(ress)
                this.setState({
                    gallary: [...this.state.gallary, ress]
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


                <h1 style={{ marginBottom: "50px" }}>اضافة باقة</h1>
                <div className="row">
                    <div className="col-lg-12 formBox" style={{ margin: "auto" }}>
                        <form onSubmit={this.addService.bind(this)} id="addService">
                            <div className="row" >
                                <div className="col-md-3" style={{ textAlign: "right" }}>
                                    <label>الاسم  </label>
                                    <input type="text" className="form-control"
                                        name="name" onChange={this.handleChange.bind(this)}
                                        value={this.state.name} required = {true}/>
                                </div>
                                <div className="col-md-2" style={{ textAlign: "right" }}>
                                    <label>المقاعد المتاحة</label>
                                    <input type="number" className="form-control"
                                        name="availableSeats" onChange={this.handleChange.bind(this)}
                                        value={this.state.availableSeats} />
                                </div>
                                <div className="col-md-2" style={{ textAlign: "right" }} >
                                    <label>النوع</label>
                                    <select name='type' className="form-control" onChange={this.handleChange.bind(this)}
                                        value={this.state.type}>
                                        <option>honeymoon</option>
                                        <option>adventures</option>
                                        <option>family</option>
                                        <option>friends</option>
                                    </select>
                                </div>

                                <div className="col-md-2" style={{ textAlign: "right" }}>
                                    <label>الخدمات</label>
                                    <div id="list1" className="dropdown-check-list" tabIndex="100">
                                        <span className="anchor">services</span>
                                        <ul className="items">
                                            {this.state.events.map((item, index) => {
                                                return (
                                                    <li key={index}><input type="checkbox" value={item._id}
                                                        className="selectedServices" />{item.name} </li>
                                                )

                                            })
                                            }
                                        </ul>
                                    </div>

                                </div>
                                <div className="col-md-2" style={{ textAlign: "right" }}>
                                    <label>تاريخ انتهاء العرض</label>
                                    <input type="date" className="form-control"
                                        name="offerDay" onChange={this.handleChange.bind(this)}
                                        value={this.state.offerDay} required={true}/>
                                </div>
                                <div className='row' style={{ margin: "20px 0px" }}>

                                    <div className="col-md-2" style={{ textAlign: "right" }}>
                                        <label>السعر الاساسي </label>
                                        <input type="number" className="form-control"
                                            name="normalPrice" onChange={this.handleChange.bind(this)}
                                            value={this.state.normalPrice} required={true}/>
                                    </div>
                                    <div className="col-md-2" style={{ textAlign: "right" }}>
                                        <label>السعر المخفض </label>
                                        <input type="number" className="form-control"
                                            name="discountedPrice" onChange={this.handleChange.bind(this)}
                                            value={this.state.discountedPrice}  />
                                    </div>
                                    <div className="col-md-2" style={{ textAlign: "right" }}>
                                        <label>السعر المشروط  </label>
                                        <input type="number" className="form-control"
                                            name="conditionalPrice" onChange={this.handleChange.bind(this)}
                                            value={this.state.conditionalPrice} />
                                    </div>

                                    <div className="col-md-2 file-input" style={{ textAlign: "right" }}>
                                        <label htmlFor="img">اضافة صورة </label>
                                        <input type="file" className="file" name="img" id="img"
                                            onChange={(e) => this.handleFileUploadImg(e)} />
                                    </div>
                                </div>

                            </div>
                            <div className='row' style={{ margin: "20px 0px" }}>
                                <div className='col-md-5' style={{ textAlign: "right" }}>
                                    <label>الوصف</label>
                                    <textarea type="number" className="form-control"
                                        name="description" onChange={this.handleChange.bind(this)}
                                        value={this.state.description} style={{ height: "190px" }} />
                                </div>
                                <div className='col-md-7' style={{ textAlign: "right" }}>
                                    <div className='row'>
                                        <div className="col-md-3" style={{ textAlign: "right" }} >
                                            <label>الصعوبة</label>
                                            <select name='difficulty' className="form-control" onChange={this.handleChange.bind(this)}
                                                value={this.state.difficulty}>
                                                <option>hard</option>
                                                <option>mid</option>
                                                <option>easy</option>
                                            </select>
                                        </div>
                                        <div className="col-md-3" style={{ textAlign: "right" }}>
                                            <label> المسافة</label>
                                            <input type="number" className="form-control"
                                                name="distance" onChange={this.handleChange.bind(this)}
                                                value={this.state.distance} />
                                        </div>

                                        <div className="col-md-3" style={{ textAlign: "right" }}>
                                            <label>accessibility  </label>
                                            <input type="text" className="form-control"
                                                name="accessibility" onChange={this.handleChange.bind(this)}
                                                value={this.state.accessibility} required={true} />
                                        </div>
                                        <div className="col-md-3" style={{ textAlign: "right" }}>
                                            <label>مزود الخدمة</label>
                                            <div id="list2" className="dropdown-check-list" tabIndex="100">
                                                <span className="anchor">providers</span>
                                                <ul className="items">
                                                    {this.state.providers.map((item, index) => {
                                                        return (
                                                            <li key={index}><input type="checkbox" value={item._id}
                                                                className="selectedProviders" />{item.name} </li>
                                                        )

                                                    })
                                                    }
                                                </ul>
                                            </div>

                                        </div>
                                        <div className='col-md-4' style={{ textAlign: "right", marginTop: "15px" }} >
                                            <label>نصائح</label>
                                            <textarea type="number" className="form-control"
                                                name="tips" onChange={this.handleChange.bind(this)}
                                                value={this.state.tips} style={{ height: "115px" }} />
                                        </div>
                                        <div className='col-md-4' style={{ textAlign: "right", marginTop: "15px" }} >
                                            <label>معلومات طبية</label>
                                            <textarea type="number" className="form-control"
                                                name="healthInfo" onChange={this.handleChange.bind(this)}
                                                value={this.state.healthInfo} style={{ height: "115px" }} />
                                        </div>
                                        <div className='col-md-4' style={{ textAlign: "right", marginTop: "15px" }} >
                                            <label> كلمات البحث</label>
                                            <textarea type="number" className="form-control"
                                                name="SEO" onChange={this.handleChange.bind(this)}
                                                value={this.state.SEO} style={{ height: "115px" }} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>

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
