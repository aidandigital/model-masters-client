import { Component } from "react";
import TextInput from "../forms/TextInput";
import SubmitButton from "../forms/SubmitButton";
import Label from "../forms/Label";
import Popup from "../parts/Popup";
import Note from "../parts/Note";
import Title from "../parts/Title";
import { Link, Navigate } from "react-router-dom";
import instance from "../../axiosInstance";
import TinyLoader from "../forms/TinyLoader";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            message: {},
            success: false,
            loading: false,
        }
    }

    setInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({ loading: true });

        instance.post('/api/register',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
        ).then((data) => {
            if (data.data.message) {
                this.setState({ message: data.data.message, loading: false, success: false });

            } else {
                this.setState({ success: true, loading: false });
            }
        })
}

render() {
    return (
        <Popup>
        <Title>Model Masters</Title>
        <form className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-5/12 m-auto">
            <Label>Credentials</Label>
            <TextInput name="name" type="text" value={this.state.name} onChange={this.setInput} error={this.state.message.name} placeholder="Your name" />
            <TextInput name="email" type="email" value={this.state.email} onChange={this.setInput} error={this.state.message.email} placeholder="Your email" />
            <TextInput name="password" type="password" value={this.state.password} onChange={this.setInput} error={this.state.message.password} placeholder="Password" />
            <Note>Only your first name will be shared with others.</Note>
            <div className={this.state.loading ? "cursor-not-allowed opacity-60" : null}>
                <SubmitButton onClick={this.submitForm} disabled={this.state.loading}>Sign up</SubmitButton>
            </div>
            <div className="text-center"><span>Already have an account?</span><Link className="p-2 text-primarydark hover:opacity-80 duration-200" to="/login">Log in</Link></div>
            {this.state.loading ? <div className="inline-block relative top-3 mr-3 ml-2"><TinyLoader /></div> : null}
        </form>
        {this.state.success ? <Navigate to="/home" /> : null}
        </Popup>
    )
}
}

export default Register;