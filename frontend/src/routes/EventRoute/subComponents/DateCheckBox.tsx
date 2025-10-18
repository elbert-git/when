import React, { useState } from "react";

const normalSize = "2.5rem";
const smallSize = "2rem";

const containerStyle: React.CSSProperties = {
    height: "2.5rem",
    width: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    overflow: "clip",
    outline: "1px solid rgba(190, 190, 190, 0.5)",
};

const timeslotToText = ["AM", "AFT", "PM"];

export default function DateCheckBox(props: {
    timeslot: number;
    date: string;
    onAvailabilitiesUpdate: Function;
    memberIndex: Number;
    checked: boolean;
}) {
    // const [checked, setChecked] = useState(false);
    const style: React.CSSProperties = {
        height: "2.5rem",
        width: "4rem",
        backgroundColor: props.checked
            ? "rgba(107, 255, 107, 1)"
            : "rgba(190, 190, 190, 1)",
        transition: "0.2s",
        borderRadius: "3px",
        transitionTimingFunction: "ease-in-out",
        fontWeight: props.checked ? "900" : "300",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const onCheckboxClicked = () => {
        console.log(props.date, props.timeslot);
    };
    return (
        <div
            className="date-checkbox interactive"
            style={containerStyle}
            onClick={() => {
                console.log(`clicked ${props.date} ${props.timeslot}`);
                // setChecked(!checked);
                props.onAvailabilitiesUpdate(
                    props.memberIndex,
                    `${props.date}-${props.timeslot}`,
                    !props.checked
                );
            }}
        >
            <div style={style} onClick={onCheckboxClicked}>
                {timeslotToText[props.timeslot]}
            </div>
        </div>
    );
}
