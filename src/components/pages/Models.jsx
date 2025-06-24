import { useState } from "react";
import Section from "../parts/Section";
import Title from "../parts/Title";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Feed from "../feed/Feed";

const Models = (props) => {
  const [models, setModels] = useState(props.data.models); // Making copies of state is generally not a good idea incase it updates in the parent, but we need it here

  function reverseModelOrder() {
    let modelsCopy = [...models];
    modelsCopy.reverse()
    setModels(modelsCopy)
  }

  return (
    <>
      <Header />
      <Section fullHeight={true}>
        <Title color="black">All Models</Title>
        <div className="text-center">
          <p className="px-2 inline-block">Showing</p>
          <select className="pr-5 cursor-pointer focus:outline-none" onChange={reverseModelOrder} defaultValue="Newest" /* Our data comes in with newest first */>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <p className="px-2 inline-block">Models first</p>
        </div>
        <Feed models={models} showAuthor={true} />
      </Section>
      <Footer />
    </>
  );
};

export default Models;