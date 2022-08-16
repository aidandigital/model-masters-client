import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

const Footer = () => {
  const repoUrl = process.env.REACT_APP_REPO_URL;

  return (
    <footer className="bg-secondarylight px-3 py-3 md:px-7 md:py-5 items-center">
      <div className="flex justify-between">
        <div className="items-center mt-2 inline-flex">
          <Link to="https://aidandigital.com">
            <i className="icon-ad text-4xl text-primarydark hidden md:inline-block" />
          </Link>
          <div className="inline-block">
            <div className="mx-2">
              <Link to="https://aidandigital.com" className="text-black text-normal tracking-wide">
                Project by <span className="underline">Aidan Digital</span>
              </Link>
            </div>
            <div className="mx-2 my-2 text-sm">
              <Link to="/reportIssue" className="block text-black text-normal tracking-wide">
                <ExclamationCircleIcon className="inline-block h-4 inline-block mr-1.5 relative -top-0.5" />
                Report an Issue
              </Link>
              <Link to={repoUrl} className="md:hidden">
                <img className="h-4 my-2 md:h-6 inline-block" src="https://cdn.aidandigital.com/tech-logos/github-2.svg" />
                <p className="inline-block mx-2 relative top-0.5">Github Repo</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="items-center hidden md:inline-flex">
          <Link to={repoUrl}>
            <img className="h-6 inline-block" src="https://cdn.aidandigital.com/tech-logos/github-2.svg" />
            <p className="inline-block mx-2 relative top-0.5">Github Repo</p>
          </Link>
        </div>
      </div>
      <div className="text-center mt-5 md:mt-0">
        <p className="text-center text-xs">&copy; {new Date().getFullYear()} Aidan Digital. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;