import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import $ from "jquery";
import { SimpleMap } from "../SimpleMap"
import moment from 'moment';

export class EditEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataisLoaded: false

        }

        this.getData = this.getData.bind(this);

    }
    getData(val) {
        console.log(val)
        this.setState({ location: val.center, city: val.city }, (err) => {
            if (err) { console.log(err); } else { console.log(this.state.location) }
        })
        return val
    }
    showSer(e) {
        console.log(e);
        $(e.target).closest("li").toggleClass("active", this.checked)
    }

    getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
    componentDidMount() {
        fetch(`/event?eventId=${this.props.match.params.id}`)
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
        // fetch(`/allProvidersAdmin?userId=${Meteor.userId()}`)
        //     .then((res) => res.json())
        //     .then((json) => {
        //         this.setState({
        //             providers: json,
        //             DataisLoaded: true
        //         });
        //     })

        // var checkList1 = document.getElementById('list1');
        // checkList1.getElementsByClassName('anchor')[0].onclick = function (evt) {
        //     if (checkList1.classList.contains('visible'))
        //         checkList1.classList.remove('visible');
        //     else
        //         checkList1.classList.add('visible');
        // };
        // var checkList2 = document.getElementById('list2');
        // checkList2.getElementsByClassName('anchor')[0].onclick = function (evt) {
        //     if (checkList2.classList.contains('visible'))
        //         checkList2.classList.remove('visible');
        //     else
        //         checkList2.classList.add('visible');
        // };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    addService(e) {
        e.preventDefault()
        var tempArr = []
        // var tempArrProviders = []
        // //document.getElementById('addService').reset();
        // var markedCheckbox = document.getElementsByClassName('selectedServices');

        // for (let i = 0; i < markedCheckbox.length; i++) {
        //     if (markedCheckbox[i].checked) {
        //         for (let x = 0; x < this.state.services.length; x++) {
        //             const element = this.state.services[x];
        //             if (element._id === markedCheckbox[i].value) {
        //                 tempArr.push(element)

        //             }

        //         }
        //     }

        // }
        // var markedCheckboxProvider = document.getElementsByClassName('selectedProviders');
        // for (let i = 0; i < markedCheckboxProvider.length; i++) {
        //     if (markedCheckboxProvider[i].checked) {
        //         for (let x = 0; x < this.state.providers.length; x++) {
        //             const element = this.state.providers[x];
        //             if (element._id === markedCheckboxProvider[i].value) {
        //                 tempArrProviders.push(element)

        //             }

        //         }
        //     }

        // }
        // console.log(tempArrProviders);
        // console.log(tempArr);
        this.setState({
            // services: tempArr,
            // providers: tempArrProviders,
            dateArray: this.getDates(this.state.fromDay, this.state.toDay)
        }, () => {
            if (this.state.fromHour < this.state.toHour) {
                Meteor.call("editEvent", this.state, (err, res) => {
                    if (err) {
                        alert(err)
                    } else {
                        alert("done")
                        location.reload()


                    }
                })
            } else {
                alert("عدل توقيت الايفنت")
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

   

    render() {
        if (this.state.DataisLoaded) {
            return (
                <div style={{ textAlign: "center", marginTop: "120px" }} className="container" dir="rtl">


                    <h1 style={{ marginBottom: "50px" }}>اضافة حدث</h1>
                    <div className='row'>
                        <div className='col-md-12' style={{ marginBottom: "30px" }}>
                            <SimpleMap sendData={this.getData} lat={this.state.location.lat} lng={this.state.location.lng} />

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-12 formBox" style={{ margin: "auto" }}>
                            <form onSubmit={this.addService.bind(this)} id="addService">
                                <div className="row" >
                                    <div className="col-md-2" style={{ textAlign: "right" }}>
                                        <label>الاسم  </label>
                                        <input type="text" className="form-control"
                                            name="name" onChange={this.handleChange.bind(this)}
                                            value={this.state.name} required={true} />
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
                                        <label>من يوم </label>
                                        <input type="date" className="form-control"
                                            name="fromDay" onChange={this.handleChange.bind(this)}
                                            value={this.state.fromDay} />
                                    </div>
                                    <div className="col-md-2" style={{ textAlign: "right" }}>
                                        <label>الي يوم  </label>
                                        <input type="date" className="form-control"
                                            name="toDay" onChange={this.handleChange.bind(this)}
                                            value={this.state.toDay} />
                                    </div>


                                    {/* <div className="col-md-2" style={{ textAlign: "right" }}>
                                        <label>الخدمات</label>
                                        <div id="list1" className="dropdown-check-list" tabIndex="100">
                                            <span className="anchor">services</span>
                                            <ul className="items">
                                                {this.state.services.map((item, index) => {
                                                    return (
                                                        <li key={index}><input type="checkbox" value={item._id}
                                                            className="selectedServices" />{item.name} </li>
                                                    )
    
                                                })
                                                }
                                            </ul>
                                        </div>
    
                                    </div> */}
                                    <div className='row' style={{ margin: "20px 0px" }}>
                                        <div className="col-md-2" style={{ textAlign: "right" }}>
                                            <label>من الساعة </label>
                                            <input type="time" className="form-control"
                                                name="fromHour" onChange={this.handleChange.bind(this)}
                                                value={this.state.fromHour} />
                                        </div>
                                        <div className="col-md-2" style={{ textAlign: "right" }}>
                                            <label>الي الساعة  </label>
                                            <input type="time" className="form-control"
                                                name="toHour" onChange={this.handleChange.bind(this)}
                                                value={this.state.toHour} />
                                        </div>
                                        <div className="col-md-2" style={{ textAlign: "right" }}>
                                            <label>السعر الاساسي </label>
                                            <input type="number" className="form-control"
                                                name="normalPrice" onChange={this.handleChange.bind(this)}
                                                value={this.state.normalPrice} required={true} />
                                        </div>
                                        <div className="col-md-2" style={{ textAlign: "right" }}>
                                            <label>السعر المخفض </label>
                                            <input type="number" className="form-control"
                                                name="discountedPrice" onChange={this.handleChange.bind(this)}
                                                value={this.state.discountedPrice} />
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
                                    <div className='row'>
                                        {this.state.gallary.map((item, index) => {
                                            return (
                                                <div className='col-md-3' style={{ position: "relative" }}>
                                                    <img style={{ width: "100%" }} src={item} />
                                                    <button className='btn btn-danger'
                                                        onClick={
                                                            (e) => {
                                                                e.preventDefault()
                                                                var arr = this.state.gallary.filter(it => it !== item)

                                                                this.setState({
                                                                    gallary: arr
                                                                })
                                                            }
                                                        }>مسح</button>
                                                </div>
                                            )
                                        })}

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
                                            {/* <div className="col-md-3" style={{ textAlign: "right" }}>
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
    
                                            </div> */}
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
        } else {
            return (

                <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            )
        }

    }
};
