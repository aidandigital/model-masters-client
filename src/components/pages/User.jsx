import { UserContext } from "../../context/UserContext";
import Section from "../parts/Section";
import Badge from "../parts/Badge";
import UserMeta from "../parts/UserMeta";
import Button from "../parts/Button";
import { Link } from "react-router-dom";
import SmallTitle from "../parts/SmallTitle";
import Subtitle from "../parts/Subtitle";
import { PencilAltIcon, LinkIcon, DocumentAddIcon } from "@heroicons/react/outline";
import Column from "../parts/Column";
import Row from "../parts/Row";
import Image from "../parts/Image";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import RoleParser from "../parts/RoleParser";
import Feed from "../feed/Feed";

const User = (props) => {
  return (
    <UserContext.Consumer>
      {(currentUser) => (
        <>
          <Header />
          <div className="min-h-screen">
          <Section background="thirdlybackground">
            <div className="inline-block">
              <SmallTitle>{props.data.name}</SmallTitle>
              <span className="mr-2 ml-2 relative bottom-1">
                <UserMeta><RoleParser>{props.data.role}</RoleParser></UserMeta>
              </span>
            </div>
            <div className="inline-block m-auto md:mx-4 lg:mx-6">
              {props.data._id === currentUser._id ? <Link to="/editAccount"><Button moreSpacing={true} icon={PencilAltIcon}>Edit profile</Button></Link> : null}
              <Button moreSpacing={true} icon={LinkIcon} onClick={() => {navigator.clipboard.writeText(window.location.href);alert("Link copied to clipboard. (Must be logged in to view)")}}>Copy profile link</Button>
            </div>
          </Section>
          <Section>
            <div className="text-center md:text-left my-4">
              {props.data.types.map((type, i) => (
                <Badge key={i}>{type}</Badge>
              ))}
            </div>
            <div>
              <Subtitle>Bio</Subtitle>
              <p>{props.data.bio ? props.data.bio : `${props.data.name} hasn't published their bio yet...` }</p>
                <>
                  <Subtitle>Garage</Subtitle>
                  {props.data._id === currentUser._id ?
                  <div className="pb-3">
                    <Link to="/addModel"><Button moreSpacing={true} type="important" icon={DocumentAddIcon}>Publish a Model</Button></Link>
                  </div>
                  : null}
                  {props.data.models && props.data.models.length > 0 ? <>
                    <Feed models={props.data.models} />
                  </> : `${props.data.name} hasn't published any models yet...`}
                </>
            </div>
          </Section>
          </div>
          <Footer />
        </>
      )}
    </UserContext.Consumer>
  );
};

export default User;
