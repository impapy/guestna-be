import { Alert } from 'bootstrap';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import $ from 'jquery'
import { useNavigate } from "react-router-dom";

export class ThePackgeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ThePackge: [],
            DataisLoaded: false,
            defaultView: []

        }
    }

    checkTime(eventsArrOld, newEvent) {
        var fromHourArr = []
        var toHoureArr = []

        eventsArrOld.forEach((element) => {
            fromHourArr.push(element.fromHour)
            toHoureArr.push(element.toHour)
        })

        if (fromHourArr.length > 0 && toHoureArr.length > 0) {
            if (fromHourArr.length == 1 && toHoureArr.length == 1) {
                var fromHour = fromHourArr[0]
                var toHour = toHoureArr[0]

                if (fromHour < newEvent.toHour && toHour < newEvent.fromHour || fromHour > newEvent.toHour && toHour > newEvent.fromHour) {
                    return true
                } else {
                    return false
                }

            } else {
                var fromHour = fromHourArr.reduce(function (a, b) { return a < b ? a : b; })
                var toHour = toHoureArr.reduce(function (a, b) { return a > b ? a : b; })

                if (fromHour < newEvent.toHour && toHour < newEvent.fromHour || fromHour > newEvent.toHour && toHour > newEvent.fromHour) {
                    return true
                } else {
                    return false
                }
            }

        } else {
            return true
        }


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
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    componentDidMount() {
        fetch(`/ThePackgeAdmin?id=${this.props.match.params.id}&userId=${Meteor.userId()}`)
            .then((res) => res.json())
            .then((json) => {

                this.setState({
                    DataisLoaded: true,
                    ThePackge: json,
                    packgeId: json._id
                });
            })


    }
    // setDefult(date, event) {
    //     var temp = [...this.state.defaultView]
    //     temp.forEach((view) => {
    //         view.events.forEach((evt, ind) => {
    //             if (evt._id == event._id && view.day != date) {
    //                 console.log(evt);
    //                 var arr = view.events.splice(ind + 1, 1);
    //                 view.events = arr
    //                 console.log("115", arr);
    //             }
    //         })
    //         if (view.day == date) {

    //             if (this.checkTime(view.events, event)) {
    //                 view.events.push(event)

    //             } else {
    //                 alert("time conflict")
    //                 location.reload()
    //             }


    //         }
    //     })
    //     console.log(temp);
    // }
    // setDefaultView(e) {
    //     e.preventDefault()
    //     Meteor.call("setDefaultView", this.state, (err, ress) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(ress);
    //             alert("done")
    //             this.props.history.push('/allpackges')

    //         }
    //     })

    // }
    // renderDates(e) {
    //     if (this.state.DataisLoaded) {
    //         return (
    //             <table className="table styled-table">
    //                 <thead>
    //                     <tr>
    //                         <th>date</th>
    //                         {this.state.events.map((item, index) => {
    //                             return (
    //                                 <th scope="col">{item.name}</th>

    //                             )
    //                         })}
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {this.state.dates.map((item, index) => {
    //                         return (
    //                             <tr >
    //                                 <td>{item} </td>
    //                                 {this.state.events.map((it, ind) => {
    //                                     return (
    //                                         <td>
    //                                             {(it.dateArray.includes(item))
    //                                                 ? <input type="radio" name={it._id} onClick={() => { this.setDefult(item, it) }}></input>
    //                                                 :""}
    //                                         </td>
    //                                     )
    //                                 })}


    //                             </tr>

    //                         )
    //                     })}

    //                 </tbody>
    //             </table>
    //         )
    //     } else {
    //         return (
    //             <div className="spinner-grow text-primary" role="status">
    //                 <span className="sr-only"></span>
    //             </div>
    //         )
    //     }
    // }
    render() {
        return (

            <div style={{ textAlign: "center", marginTop: "120px" }} >
                {(this.state.DataisLoaded) ?
                    <form className="userForm" >
                        {this.state.ThePackge.defaultView.map((item, index) => {
                            return (
                                <div className='row' style={{ marginBottom: "20px" }}>
                                    <div className='col-md-2'>
                                        {item.day}
                                    </div>
                                    <div className='col-md-10'>
                                        {item.events.map((it, ind) => {
                                            return (
                                                <span style={{marginRight : "20px"}}>{it.name}</span>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}

                    </form>

                    :
                    <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                }
            </div>
        )
    }
};
