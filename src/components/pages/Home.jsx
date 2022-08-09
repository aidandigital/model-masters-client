import { UserContext } from "../../context/UserContext";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import FrontPageImage from "../imgs/frontPageImage.jpeg";
import Section from "../parts/Section";
import Spacer from "../parts/Spacer";
import Title from "../parts/Title";

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
            <Title color="black">About</Title>
            <p className="text-lg leading-8">
              The focus of Model Masters is to allow users to publish and share their creations with eachother. When registering, users sign up as either a "fan" or a "member". Members can publish and view models, but fans can only view them. Fan accounts are great for family members or friends who don't make models themselves. Important users may be promoted to "model master" status by an admin. Anyone above member status can publish a model from their profile which you can access in the upper right corner. You can view anyone's models by visiting the "Garage" section in their profile, or you can view all models by visiting the "All Models" page.
            </p>
            <Title color="black">History</Title>
            <p className="text-lg leading-8">{props.data.about}</p>
            <Spacer />
          </Section>
          <Footer />
        </>
      )}
    </UserContext.Consumer>
  );
};

export default Home;