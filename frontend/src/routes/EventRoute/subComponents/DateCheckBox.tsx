import React, { useState } from "react";

const normalSize = "2.5rem";
const smallSize = "1rem";

const containerStyle: React.CSSProperties = {
    height: normalSize,
    width: normalSize,
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
        height: checked ? normalSize : smallSize,
        width: checked ? normalSize : smallSize,
        backgroundColor: checked
            ? "rgba(107, 255, 107, 1)"
            : "rgba(190, 190, 190, 1)",
        transition: "0.3s",
        borderRadius: "3px",
    };
    return (
        <div
            className="date-checkbox interactive"
            style={containerStyle}
            onClick={() => {
                setChecked(!checked);
            }}
        >
            <div style={style}></div>
        </div>
    );
}
