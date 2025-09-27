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

export default function DateCheckBox() {
    const [checked, setChecked] = useState(false);
    const style: React.CSSProperties = {
        height: "2.5rem",
        width: "4rem",
        backgroundColor: checked
            ? "rgba(107, 255, 107, 1)"
            : "rgba(190, 190, 190, 1)",
        transition: "0.2s",
        borderRadius: "3px",
        transitionTimingFunction: "ease-in-out",
        fontWeight: checked ? "900" : "300",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    return (
        <div
            className="date-checkbox interactive"
            style={containerStyle}
            onClick={() => {
                setChecked(!checked);
            }}
        >
            <div style={style}>AFT</div>
        </div>
    );
}
