import Title from '../parts/Title';
import Button from "../parts/Button";
import Spacer from "../parts/Spacer";
import instance from "../../axiosInstance";
import { Link } from "react-router-dom"

const AccountRequired = () => {
    function startRegistering() {
        instance.get("/api/logout")
        .then(() => window.location.replace("/register"))
        .catch(() => alert("An error occurred attempting to logout."))
    }

    return (
        <div className="text-center">
            <Title>Account Required</Title>
            <p className="m-3">You need to sign up for your own account in order to publish models.</p>
            <Spacer />
            <Button type="good" onClick={startRegistering}>
                Sign up
            </Button>
            <Button><Link to="/">No thanks</Link></Button>
        </div>
    );
};

export default AccountRequired;