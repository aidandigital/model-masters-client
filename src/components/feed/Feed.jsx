import Row from "../parts/Row";
import Column from "../parts/Column";
import { Link } from "react-router-dom";
import Image from "../parts/Image";
import UserLink from "../parts/UserLink";
import "./feed.css";

const Feed = ({ models, showAuthor }) => (
    <div>
        {models.map((model, i) => (
            <Column key={i}>
            <Row>
                <div className="text-center mb-1">
                <Link to={"/model/" + model._id}>
                    <div className="darken duration-200">
                    <Image src={model.thumbnail} isThumbnail={true} />
                    </div>
                    <p className="mt-5 font-bold mb-3 text-xl font-serif hover:text-primarydark duration-200">
                    {model.name}
                    </p>
                </Link>
                {model.type}{showAuthor ? <span> by<UserLink _id={model.user._id} name={model.user.name} /></span> : null}
                </div>
            </Row>
            </Column>
        ))}
    </div>
);

export default Feed;