import { useState } from "react";
import Row from "../parts/Row";
import Column from "../parts/Column";
import Section from "../parts/Section";
import Title from "../parts/Title";
import { Link } from "react-router-dom";
import Image from "../parts/Image";
import UserLink from "../parts/UserLink";
import Header from "../parts/Header";
import Footer from "../parts/Footer";

const Models = (props) => {
  const [models, setModels] = useState(props.data); // Making copies of state is generally not a good idea incase it updates in the parent, but we need it here

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
          <p className="px-2 inline-block">Show</p>
          <select className="pr-5 cursor-pointer focus:outline-none" onChange={reverseModelOrder} defaultValue="Newest" /* Our data comes in with newest first */>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
          <p className="px-2 inline-block">Models first</p>
        </div>
        {models.map((model, i) => (
          <Column key={i}>
            <Row>
              <div className="text-center mb-1">
                <Link to={"/model/" + model._id}>
                  <Image src={model.thumbnail} isThumbnail={true} />
                  <p className="mt-5 font-bold mb-3 text-xl font-serif hover:text-primarydark duration-200">
                    {model.name}
                  </p>
                </Link>
                {model.type} by
                <UserLink _id={model.user._id} name={model.user.name} />
              </div>
            </Row>
          </Column>
        ))}
      </Section>
      <Footer />
    </>
  );
};

export default Models;