import "./loader.css";

const Loading = (props) => (
    <>
        <div className="cn"><div {...props} className="ajax-loader"></div></div>
        <span className="px-16 w-full absolute bottom-40 text-center">
            <div>This app is brought to you on a free server.</div>
            <div>Please be patient, this may take a moment at first.</div>
        </span>
    </>
)

export default Loading;