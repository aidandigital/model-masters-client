import { UserContext } from "../../context/UserContext";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import FrontPageImage from "../imgs/frontPageImage.jpeg";
import Section from "../parts/Section";
import Spacer from "../parts/Spacer";
import Title from "../parts/Title";
import Feed from "../feed/Feed";
import Button from "../parts/Button";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <UserContext.Consumer>
      {(currentUser) => (
        <>
          <Header />
            <img
              src={FrontPageImage}
              className="h-30 w-full sm:h-screen object-cover object-center"
            />
          <div className="hidden md:block absolute bottom-60 text-center w-full">
            <span className="w-full text-6xl text-white font-bold bg-primarydark py-1 leading-snug px-3 bg-opacity-50">Welcome, {currentUser.firstName}!</span>
          </div>
          <div className="block md:hidden text-center w-full bg-secondarydark p-3">
            <span className="w-full text-3xl text-white font-bold py-1 leading-snug px-3 bg-opacity-50">Welcome, {currentUser.firstName}!</span>
          </div>
          <Section background="secondarybackground">
            <Title color="black">Latest Models</Title>
            <Feed models={props.data.models} showAuthor={true} />
            <div className="text-center">
              <Link to="/models"><Button type="outline">View all Models</Button></Link>
            </div>
          </Section>
          <Section background="secondarybackground">
            <Title color="black">About</Title>
            <p className="text-lg leading-8">
              {props.data.about}
            </p>
            <Spacer />
          </Section>
          <Footer />
        </>
      )}
    </UserContext.Consumer>
  );
};

export default Home;