import { useNavigate } from "react-router-dom";
import HeaderLogo from "../../commonComponents/HeaderLogo";

export default function HomeRoute() {
    const nav = useNavigate();
    return (
        <div className="root-home-route">
            <HeaderLogo />
            <p>An event scheduling app to find when eveyone is free</p>
            <video src=""></video>
            <button
                className="button-green"
                onClick={() => {
                    nav("/new");
                }}
            >
                Schedule An Event
            </button>
            <p>
                For scheduling with your busy friends. Especially that one
                friend keeps shooting every date down
            </p>
            <h5>No Registeration Needed</h5>
            <p>
                This app is made to quickly poll your friends so you can get to
                hanging out as quickly as possible. You may wish to password
                protect your events but there are no registrations or logins
                etc.
            </p>
            <h5>How was this made?</h5>
            <video src=""></video>
            <p>
                This app was made after frustration of wrangling friends to hang
                out with each other. Originally scoped for 2 weekends became a 5
                week project that I glad I finished
            </p>
        </div>
    );
}
