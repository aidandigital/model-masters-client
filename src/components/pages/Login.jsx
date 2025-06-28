import { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import TextInput from "../forms/TextInput";
import Popup from "../parts/Popup";
import SubmitButton from "../forms/SubmitButton";
import Button from "../parts/Button";
import Message from "../parts/Message";
import Spacer from "../parts/Spacer";
import Title from "../parts/Title";
import instance from "../../axiosInstance";
import TinyLoader from "../forms/TinyLoader";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            success: false,
            message: '',
            customMessage: props.customMessage,
            loading: false,
        }
    }

    setInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({loading: true});

        instance.post('/api/login',
            {
                email: this.state.email,
                password: this.state.password
            }
        ).then((data) => {
            this.setState({ message: data.data.message, loading: false, success: data.data.success });

        }).catch(() => {
            this.setState({success: false, loading: false, message: {general: "An error occurred, please try again later"}})
        });
    }

    loginAsGuest = (e) => {
        e.preventDefault();
        instance.post('/api/loginAsGuest', {})
        .then((data) => {
            this.setState({ message: data.data.message, loading: false, success: data.data.success });

        }).catch(() => {
            this.setState({success: false, loading: false, message: {general: "An error occurred, please try again later"}})
        });
    }

render() {
    return (
        this.state.success && this.props.isPopup ? null :
        <Popup>
            <Title>Model Masters</Title>
            <div className="w-10/12 sm:w-3/5 md:w-1/2 lg:w-5/12 m-auto">
            <p className="text-center">{this.state.customMessage}</p>
            <form>
                <TextInput name="email" type="email" value={this.state.email} onChange={this.setInput} placeholder="Your email" />
                <TextInput name="password" type="password" value={this.state.password} onChange={this.setInput} placeholder="Password" />
                {(this.state.success ? <Navigate to="/" /> : <Message isSuccess={false}>{this.state.message}</Message>)}
                <div className={this.state.loading ? "cursor-not-allowed opacity-60" : null}>
                    <SubmitButton className="hover:bg-purple-700" onClick={this.submitForm} disabled={this.state.loading}>Log in</SubmitButton>
                </div>
                {
                    import.meta.env.VITE_APP_ALLOW_GUEST_LOGIN === 'true' ? (
                    <>
                        <div className="text-center my-2">
                            <div className="inline-block relative bottom-1 mx-2 w-16 lg:w-28 h-0.5 bg-black"></div>
                            or
                            <div className="inline-block relative bottom-1 mx-2 w-16 lg:w-28 h-0.5 bg-black"></div>
                        </div>
                        <div className={this.state.loading ? "cursor-not-allowed opacity-60" : null}>
                            <Button fullWidth={true} type="outline" onClick={this.loginAsGuest} disabled={this.state.loading}>Log in as Guest</Button>
                        </div>
                        <Spacer />
                    </>
                    ) : null
                }
                <div className="text-center"><span>Want an account?</span><Link className="p-2 text-primarydark hover:opacity-80 duration-200" to="/register">Sign up here</Link></div>
                {this.state.loading ? <div className="inline-block relative top-3 mr-3 ml-2"><TinyLoader /></div> : null}
            </form>
            </div>
            <Spacer />
        </Popup>
    )
}
}

export default Login;