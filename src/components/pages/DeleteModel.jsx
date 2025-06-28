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
import TinyLoader from "../forms/TinyLoader";

class DeleteModel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            model_id: props.data._id,
            reason: "",
            message: {},
            password: "",
            success: false,
            errType: "",
            loading: false,
        }
    }

    setInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.setState({loading: true});

        instance.post('/api/deleteModel',
            {
                model_id: this.state.model_id,
                reason: this.state.reason,
                password: this.state.password,
            }
        ).then((data) => {
            if (!data.data.success) {
                this.setState({ success: false, loading: false, message: data.data.message, errType: data.data.errType });
            } else {
                this.setState({ success: true, loading: false });
            }
        }).catch(() => {
            this.setState({success: false, loading: false, message: {general: "An error occurred, please try again later"}})
        });;
    }

render() {
    return (
    <>
      {this.state.success ?
      <>
      <Header />
        <Section fullHeight={true}>
          <Title>Successfully Deleted</Title>
          <p className="text-center">We are sorry to see your model go!</p>
        </Section>
        <Footer />
      </>
      :
      <>
        <Header />
        <Section fullHeight={true}>
            <Title>Delete a Model</Title>
            <form className="w-full sm:w-4/5 md:w-3/5 m-auto">
                <Label>Password</Label>
                <TextInput name="password" type="password" onChange={this.setInput} value={this.state.password} error={this.state.message.password} placeholder="Enter your password to verify this" />
                <Spacer height="3" />
                <div className={this.state.loading ? "cursor-not-allowed opacity-60" : null}>
                    <SubmitButton onClick={this.submitForm} disabled={this.state.loading}>Delete forever</SubmitButton>
                </div>
                {this.state.loading ? <div className="inline-block relative top-3 mr-3 ml-2"><TinyLoader /></div> : null}
                {(this.state.success ? null : <Message isSuccess={false} errType={this.state.errType}>{this.state.message.general}</Message>)}
            </form>
            <Spacer />
        </Section>
        <Footer />
        </>
      }
    </>
    );
}
}

export default DeleteModel;