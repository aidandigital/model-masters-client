import Title from '../parts/Title';
import Button from "../parts/Button";
import { BadgeCheckIcon, HomeIcon } from "@heroicons/react/solid";
import Spacer from "../parts/Spacer";
import instance from "../../axiosInstance";
import { useState } from "react";
import Message from "../parts/Message";
import { Link } from 'react-router-dom';

const UpgradeRequired = () => {
    const [requested, setRequested] = useState(false);

    function requestVerification() {
        instance.post("/api/requestVerification", {})
        .then(() => 
            setRequested(true)
        )
        .catch(() => alert("An error occurred, please try again later."))
    }

    return (
        <div className="text-center">
            <Title>Fan → Member</Title>
            <p className="m-3">You need to upgrade your account type from a fan to a member in order to upload models.</p>
            <p><bold>It's totally free! We just need to verify your account first:</bold></p>
            <Spacer />
            {!requested ?
            <>
                <Button type="good" icon={BadgeCheckIcon} onClick={requestVerification}>
                    Request verification
                </Button>
                <Button><Link to="/">No thanks</Link></Button>
            </>
            :
            <div>
                <Message isSuccess={true}>Your request has been sent! If approved, your account will be automatically upgraded.</Message>
                <Button icon={HomeIcon}>
                    <Link to="/">Back to Home</Link>
                </Button>
            </div>
            }
        </div>
    );
};

export default UpgradeRequired;