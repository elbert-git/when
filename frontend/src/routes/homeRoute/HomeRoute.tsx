import { useNavigate } from "react-router-dom";
import HeaderLogo from "../../commonComponents/HeaderLogo";

export default function HomeRoute() {
    const nav = useNavigate();
    return (
        <div className="root-home-route">
            <HeaderLogo />
            <p>A hangout scheduling app to find when eveyone is free</p>
            <video src="video.mp4" autoPlay loop muted playsInline></video>
            <button
                className="button-green"
                onClick={() => {
                    nav("/new");
                }}
            >
                Schedule An Event
            </button>
            <p>
                Made especially for that one friend in your group who shoots
                down every available date.
            </p>
            <h5>No Registeration Needed</h5>
            <p>
                This app aims to quickly get out of the way. You can simply
                create the event. Share the polling link to everyone and quickly
                reach a consensus. No registeration or accounts needed. Though
                you may password-protect your events for privacy.
            </p>
            {/* // todo uncomment this when you finish the video blog */}
            {/* <h5>How was this made?</h5>
            <video src=""></video>
            <p>
                This app was made after frustration of wrangling friends to hang
                out with each other. Originally scoped for 2 weekends became a 5
                week project that I glad I finished
            </p> */}
        </div>
    );
}
