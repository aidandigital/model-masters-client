import { Component } from "react";
import TextInput from "../forms/TextInput";
import SubmitButton from "../forms/SubmitButton";
import Label from "../forms/Label";
import Message from "../parts/Message";
import Title from "../parts/Title";
import Section from "../parts/Section";
import Spacer from "../parts/Spacer";
import instance from "../../axiosInstance";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import { Link } from "react-router-dom";
import Button from "../parts/Button";

class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
            oldPassword: "",
            newPassword: "",
            success: false,
            errType: "",
        }
    }

    setInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {

        e.preventDefault();

            instance.post('/api/updatePassword',
                {
                    oldPassword: this.state.oldPassword,
                    newPassword: this.state.newPassword,
                }
            ).then((data) => {
                if (!data.data.success) {
                    this.setState({ success: false, message: data.data.message, errType: data.data.errType });
                } else {
                    this.setState({ success: true });
                }
            }).catch(() => {
                this.setState({success: false, message: {general: "An error occurred, please try again later"}})
            });;
    }

render() {
    return (
    <>
      {this.state.success ?
      <>
      <Header />
        <Section fullHeight={true}>
          <Title>Successfully Changed</Title>
          <p className="text-center">
            Your password has been changed.
            <br />
            <br />
            <Link to="/">
                <Button type="outline">Okay</Button>
            </Link>
        </p>
        </Section>
        <Footer />
      </>
      :
      <>
        <Header />
        <Section fullHeight={true}>
            <Title>Change your Password</Title>
            <form className="w-full sm:w-4/5 md:w-3/5 m-auto">
                <Label>Current Password</Label>
                <TextInput name="oldPassword" type="password" onChange={this.setInput} value={this.state.oldPassword} error={this.state.message.oldPassword} placeholder="Enter your current password" />
                <Label>New Password</Label>
                <TextInput name="newPassword" type="password" onChange={this.setInput} value={this.state.newPassword} error={this.state.message.newPassword} placeholder="Enter what you want your new password to be" />
                <Spacer height="3" />
                <SubmitButton onClick={this.submitForm}>Save</SubmitButton>
                {(this.state.success ? null : <Message isSuccess={false} errType={this.state.errType}>{this.state.message.general}</Message>)}
            </form>
            <Spacer />
        </Section>
        <Footer />
        </>
      }
    </>
    )
}
}

export default EditPassword;