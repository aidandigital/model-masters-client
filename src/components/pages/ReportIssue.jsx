import { Component } from "react";
import TextInput from "../forms/TextInput";
import ParagraphInput from "../forms/ParagraphInput";
import RadioButton from "../forms/radioButtons/RadioButton";
import SubmitButton from "../forms/SubmitButton";
import Label from "../forms/Label";
import Message from "../parts/Message";
import Title from "../parts/Title";
import Section from "../parts/Section";
import Spacer from "../parts/Spacer";
import Note from "../parts/Note";
import TinyLoader from "../forms/TinyLoader";
import instance from "../../axiosInstance";
import AltHeader from "../parts/AltHeader";
import Footer from "../parts/Footer";
import Button from "../parts/Button";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/outline";

class ReportIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.match.params.model_id ? "model/" + props.match.params.model_id : "",
            description: "",
            type: props.match.params.model_id ? "model" : "error",
            loading: false,
            message: {},
            success: false,
            errType: "",
        }
    }

    setInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = (e) => {

        e.preventDefault();

        this.setState({loading: true})

            instance.post('/api/reportIssue',
                {
                    url: this.state.url,
                    type: this.state.type,
                    description: this.state.description,
                }
            ).then((data) => {
                this.setState({loading: false})
                if (!data.data.success) {
                    this.setState({ success: false, message: data.data.message, errType: data.data.errType });
                } else {
                    this.setState({ success: true });
                }
            }).catch(() => {
                this.setState({loading: false})
                this.setState({success: false, message: {general: "An error occurred, please try again later"}})
            });;
    }
    
render() {
    return (
    <>
      {this.state.success ?
      <>
      {/* Stateless header: */}
      <AltHeader />
        <Section>
          <Title>Issue Successfully Reported</Title>
          <p className="text-center">Thank you for taking the time to make Model Masters better!</p>
          <Spacer />
          <div className="text-center"><Button icon={HomeIcon}><Link to="/">Back to Home</Link></Button></div>
        </Section>
      </>
      :
      <>
        <AltHeader />
        <Section>
            <Title>File a Report</Title>
            <form className="w-full sm:w-4/5 md:w-3/5 m-auto">
                <Label>Type of Issue</Label>
                <div className="rounded-md border my-3" onChange={this.setInput}>
                    <div><RadioButton name="type" value="error" description="I'm reporting an error/issue that occurred" defaultChecked={this.state.type === "error" ? true : false} /></div>
                    <div><RadioButton name="type" value="model" description="I'm reporting an inappropriate model" defaultChecked={this.state.type === "model" ? true : false} /></div>
                    <div><RadioButton name="type" value="user" description="I'm reporting a inappropriate user" /></div>
                </div>
                {this.state.message.type}
                <Label>URL of the Issue</Label>
                <TextInput name="url" type="text" value={this.state.url} onChange={this.setInput} error={this.state.message.url} placeholder="Paste the url of the problem here" />
                {this.state.message.type}
                <Label>Description of the Issue</Label>
                <ParagraphInput name="description" onChange={this.setInput} value={this.state.password} error={this.state.message.description} placeholder={this.state.type === "error" ? "Provide as much detail as you can regarding what happened" : (["model", "user"].includes(this.state.type) ? "How is the user/model in question damaging the integrity of the site?" : "")} />
                <Spacer height="3" />
                <div className={this.state.loading ? "cursor-not-allowed opacity-60" : null}>
                    <SubmitButton disabled={this.state.loading} onClick={this.submitForm}>Report</SubmitButton>
                </div>
                {this.state.loading ?<div className="inline-block relative top-3 mr-3 ml-2"><TinyLoader /></div> : null}
                <div className="inline-block"><Note>Submissions could take a minute, please be patient</Note></div>
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

export default ReportIssue;