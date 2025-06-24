import { Component } from "react";
import { UserContext } from "../../context/UserContext";
import TextInput from "../forms/TextInput";
import ParagraphInput from "../forms/ParagraphInput";
import RadioButton from "../forms/radioButtons/RadioButton";
import MonthYearInput from "../forms/MonthYearInput";
import ImagesInput from "../forms/ImagesInput";
import Label from "../forms/Label";
import Message from "../parts/Message";
import Note from "../parts/Note";
import Title from "../parts/Title";
import Section from "../parts/Section";
import Spacer from "../parts/Spacer";
import instance from "../../axiosInstance";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import TinyLoader from "../forms/TinyLoader";
import UpgradeRequired from "../errorPages/UpgradeRequired";
import AccountRequired from "../errorPages/AccountRequired";
import { Navigate, Link } from "react-router-dom";
import Button from "../parts/Button";

class EditModel extends Component {
    constructor(props) {
        super(props);
        console.log(props.data.imageFolderId)
        this.state = {
            model_id: props.data.model_id,
            imageFolderId: props.data.imageFolderId,
            images: props.data.images,
            name: props.data.name,
            completionMonth: props.data.completionMonth,
            completionYear: props.data.completionYear,
            facts: props.data.facts,
            about: props.data.about,
            type: props.data.type,
            thumbnailKey: props.data.thumbnailKey,
            message: {},
            errType: "",
            success: false,
            loading: false,
        }
    }

    setInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    setMonthInput = (newValue) => {
        this.setState({ completionMonth: newValue});
    }

    setYearInput = (newValue) => {
        this.setState({ completionYear: newValue});
    }

    setThumbnailKey = (newValue) => {
        this.setState({ thumbnailKey: newValue });
    }

    submitForm = (e) => {
        e.preventDefault();

        this.setState({loading: true});

        instance
          .post("/api/editModel", {
                name: this.state.name,
                completionMonth: this.state.completionMonth,
                completionYear: this.state.completionYear,
                facts: this.state.facts,
                about: this.state.about,
                type: this.state.type,
                model_id: this.state.model_id,
                imageFolderId: this.state.imageFolderId,
                thumbnailKey: this.state.thumbnailKey,
            }
        ).then((res) => {
            this.setState({loading: false});

            if (!res.data.success) {
                this.setState({ success: false, message: res.data.message, errType: res.data.errType });
            } else {
                this.setState({ success: true });
            }

        }).catch((err) => {
            console.log(err)
            this.setState({loading: false});
            this.setState({success: false, message: {general: "An error occurred, please try again later"}});
        });;
    }

render() {
    if (this.state.success) {
        return <Navigate to={`/model/${this.state.model_id}`} />;
    }

    return (
        <UserContext.Consumer>
            {(currentUser) => (
            <>
            {currentUser.userPermissions > 3 ?
                <>
                    <Header />
                    <Section>
                        <Title>Edit your Model</Title>
                        <form className="w-full sm:w-4/5 md:w-3/5 m-auto">
                            <Label>Model name</Label>
                            <TextInput name="name" type="text" value={this.state.name} onChange={this.setInput} placeholder="Ex:  68' Dodge Charger" error={this.state.message.name} />
                            <Label>Model type</Label>
                            <div className="rounded-md border my-3" onChange={this.setInput}>
                                <span className="inline-block w-6/12">
                                    <div><RadioButton name="type" value="Car" description="Car" defaultChecked={this.state.type === "Car"} /></div>
                                    <div><RadioButton name="type" value="Tank" description="Tank" defaultChecked={this.state.type === "Tank"} /></div>
                                    <div><RadioButton name="type" value="Truck" description="Truck" defaultChecked={this.state.type === "Truck"} /></div>
                                </span>
                                <span className="inline-block w-6/12">
                                    <div><RadioButton name="type" value="Ship" description="Ship" defaultChecked={this.state.type === "Ship"} /></div>
                                    <div><RadioButton name="type" value="Train" description="Train" defaultChecked={this.state.type === "Train"} /></div>
                                    <div><RadioButton name="type" value="Other" description="Other" defaultChecked={this.state.type === "Other"} /></div>
                                </span>
                            </div>
                            {this.state.message.type}
                            <Label>About</Label>
                            <ParagraphInput name="about" value={this.state.about} onChange={this.setInput} placeholder="Ex:  What color did you paint the engine? Did you do the trim? What color is the interior?" error={this.state.message.about} />
                            <Label>Approximate completion date</Label>
                            <MonthYearInput monthInputName="completionMonth" monthValue={this.state.completionMonth} yearValue={this.state.completionYear} yearInputName="completionYear" onChange={this.setInput} minYear="1940" monthError={this.state.message.completionMonth} yearError={this.state.message.completionYear} />
                            <Label>Photos</Label>
                            <ImagesInput maxImages={import.meta.env.VITE_APP_MAX_IMAGES} maxWidth={2048} maxHeight={2048} error={this.state.message.images} images={this.state.images} imageFolderId={this.state.imageFolderId} setThumbnailKey={this.setThumbnailKey} thumbnailKey={this.state.thumbnailKey} />
                            <Note>Click a photo to select it as your thumbnail</Note>
                            <div className="inline-block"><Label>Fun facts</Label></div>
                            <div className="inline-block ml-1"><Note>(optional)</Note></div>
                            <ParagraphInput name="facts" value={this.state.facts} onChange={this.setInput} placeholder="Are there any interesting facts about this model, mistakes you made, or cool stories?" error={this.state.message.facts} />
                            <Note>Separate different facts above by hitting enter or return on your keyboard</Note>
                            <Spacer height="4" />
                            <div className={this.state.loading || this.state.success ? "cursor-not-allowed opacity-60" : null}>
                                <Link to={"/model/" + this.state.model_id}>
                                    <Button type="outline">Back to Model</Button>
                                </Link>
                                <Button type="important" disabled={this.state.loading || this.state.success} /* <-- Important */ onClick={this.submitForm}>Save</Button>
                            </div>
                            {this.state.loading ? <div className="inline-block relative top-3 mr-3 ml-2"><TinyLoader /></div> : null}
                            <Message isSuccess={this.state.success} errType={this.state.errType}>{this.state.message.general}</Message>
                        </form>
                        <Spacer />
                    </Section>
                    <Footer />
                </>
            :
                currentUser.guest 
                ? <AccountRequired />
                : <UpgradeRequired />
                }
            </>
            )}
        </UserContext.Consumer>
    )
}
}

export default EditModel;