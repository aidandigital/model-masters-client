import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const Footer = () => {
  const repoUrl = process.env.REACT_APP_REPO_URL;

  return (
    <footer className="bg-secondarylight px-3 py-3 md:px-7 md:py-5 items-center">
      <div className="flex justify-between">
        <div className="items-center mt-2 inline-flex">
          <a href="https://aidandigital.com">
            <i className="icon-ad text-4xl text-primarydark hidden md:inline-block" />
          </a>
          <div className="inline-block">
            <div className="mx-2">
              <a href="https://aidandigital.com" className="text-black text-normal tracking-wide">
                Project by <span className="underline">Aidan Digital</span>
              </a>
            </div>
            <div className="mx-2 my-2 text-sm">
              <Link to="/reportIssue" className="block text-black text-normal tracking-wide">
                <ExclamationCircleIcon className="inline-block h-4 inline-block mr-1.5 relative -top-0.5" />
                Report an Issue
              </Link>
              <a href={repoUrl} className="md:hidden">
                <img className="h-4 my-2 md:h-6 inline-block" src="https://cdn.aidandigital.com/tech-logos/github-2.svg" />
                <p className="inline-block mx-2 relative top-0.5">Github Repo</p>
              </a>
            </div>
          </div>
        </div>
        <div className="items-center hidden md:inline-flex">
          <a href={repoUrl}>
            <img className="h-6 inline-block" src="https://cdn.aidandigital.com/tech-logos/github-2.svg" />
            <p className="inline-block mx-2 relative top-0.5">View Repo</p>
          </a>
        </div>
      </div>
      <div className="text-center mt-5 md:mt-0">
        <p className="text-center text-xs">
          <span>&copy; {new Date().getFullYear()}</span>
          <span> Aidan Digital. All rights reserved. </span>
          <a href={"https://aidandigital.com/contact?ref=" + window.location.href + "&body=I wish to have my data associated with the email above in the Model Masters database deleted permanently. I understand that you will first have to verify my identity via email before making any changes to my data, and that if I no longer have access to the email associated with my data, I do not respond within 48 hours, or I provide the wrong email, you will not be able to make any changes to my data."}>
            Manage your Data
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;