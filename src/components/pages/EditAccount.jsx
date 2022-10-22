import { Component } from "react";
import { UserContext } from "../../context/UserContext";
import TextInput from "../forms/TextInput";
import ParagraphInput from "../forms/ParagraphInput";
import TagInput from "../forms/TagInput";
import SubmitButton from "../forms/SubmitButton";
import Label from "../forms/Label";
import Message from "../parts/Message";
import Note from "../parts/Note";
import Spacer from "../parts/Spacer";
import Title from "../parts/Title";
import { Redirect, Link } from "react-router-dom";
import Section from "../parts/Section";
import Button from "../parts/Button";
import instance from "../../axiosInstance";
import Header from "../parts/Header";
import { KeyIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.data.name,
            bio: props.data.bio,
            email: props.data.email,
            types: props.data.types,
            complete: props.data.complete,
            message: {},
            errType: '',
            success: false,
            showIps: false,
        }
    }

    setInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    setTagInput = (newValue) => {
        this.setState({ types: newValue});
    }

    submitForm = (e) => {
        e.preventDefault();
        instance.post('/api/updateAccount',
            {
                name: this.state.name,
                bio: this.state.bio,
                email: this.state.email,
                types: this.state.types,
            }
        ).then((data) => {
            if (!data.data.success) {
                this.setState({ success: false, message: data.data.message, errType: data.data.errType });
            } else {
                this.setState({ success: true });
            }
        }).catch(() => {
            this.setState({success: false, message: {general: "An error occured, try again later"}})
        });;
    }

    toggleIps = () => {
        this.setState({ showIps: !this.state.showIps });
    }

render() {
    return (
        <UserContext.Consumer>
      {(currentUser) => (
        <>
        {this.state.complete ? <Header /> : null}
        <Section>
            <Title>{this.state.complete ? "Account Info" : "About You"}</Title>
            {!this.state.complete ? <p className="text-center mb-10">Tell others a little about yourself!<></></p> : <></>}
            <form className="w-full sm:w-4/5 md:w-3/5 m-auto">
            <div className="inline-block"><Label>Bio</Label></div>
            <div className="inline-block ml-1"><Note>(optional)</Note></div>
            <ParagraphInput name="bio" type="text" rows="3" value={this.state.bio} onChange={this.setInput} error={this.state.message.bio} placeholder="Tell us about yourself..." />
            <Label>Model types</Label>
            <TagInput name="types" customStateSetter={this.setTagInput} value={this.state.types} allowedTags={["Cars", "Tanks", "Trains", "Ships", "Trucks"]} error={this.state.message.types} description="What kinds of models do you like?" />
            {this.state.complete ? (
            <>
                <Label>Full Name</Label>
                <TextInput name="name" type="text" value={this.state.name} onChange={this.setInput} error={this.state.message.name} />
                <div className="-mt-3">
                    <Note>Only your first name can be seen by other members.</Note>
                </div>
                <Label>Email</Label>
                <TextInput name="email" type="email" value={this.state.email} onChange={this.setInput} error={this.state.message.email}/>
                <Spacer height="2" />
                <div>
                    <Link to={"/user/" + currentUser._id}>
                        <Button type="outline">Back to Profile</Button>
                    </Link>
                    <Button type="important" onClick={this.submitForm}>Save</Button>
                </div>
            </>
            ) : (
                <SubmitButton onClick={this.submitForm}>Done</SubmitButton>
            )}
            {(this.state.success ? null : <Message isSuccess={false} errType={this.state.errType}>{this.state.message.general}</Message>)}
            <Spacer />
        </form>
        {this.state.success ? <Redirect to={"/user/" + currentUser._id} /> : null}
        </Section>
        <Section>
            <Title>Security</Title>
            <div className="w-full sm:w-4/5 md:w-3/5 m-auto text-center">
                <Link to="/editPassword">
                    <Button type="outline" icon={KeyIcon}>Change Password</Button>
                </Link>
                {this.state.showIps ? (
                    <>
                        <Button type="outline" icon={EyeOffIcon} onClick={this.toggleIps}>Hide IP Addresses</Button>
                        <div className="my-5">
                            These IP addresses have been used to log into your account:
                            {this.props.data.ips.map((ip, i) => (
                                <div key={i} className="bg-secondarylight rounded my-1">{ip}</div>
                            ))}
                        </div>
                    </>
                ) : (
                    <Button type="outline" icon={EyeIcon} onClick={this.toggleIps}>View IP Addresses</Button>
                )}
            </div>
        </Section>
        <Spacer />
        </>
      )}
      </UserContext.Consumer>
    )
}
}

export default Register;