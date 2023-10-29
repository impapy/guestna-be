import React from 'react';
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    login(e) {
        e.preventDefault();
        Meteor.loginWithPassword(this.state.username, this.state.password, (err) => {
            if (err) {
                swal("error", err.reason, "error");
            } else {
                swal('success', 'you are logged in', 'success');

                this.props.history.push("/")
                location.reload()


            }
        });

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <div className="login">

                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center" style={{ marginBottom: "40px" }}>
                                <Link to="/">
                                    <img src="/logo.png" width="100px" style={{marginTop : "100px"}}/>
                                </Link>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-12 formBox">
                                <form style={{ width: "50%", margin: "auto" }} href="#" onSubmit={this.login.bind(this)} >

                                    <input type="text" className="form-control" placeholder="username.."
                                        onChange={this.handleChange.bind(this)} name="username" />

                                    <input type="password" className="form-control" placeholder="password" name="password"
                                        style={{ marginTop: "12px" }} onChange={this.handleChange.bind(this)} />

                                    <button className="redBtn" type='submit'
                                        style={{ margin: " 20px auto" }}>
                                        login
                                    </button>

                                </form>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

