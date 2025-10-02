import React from "react";
export default function ErrorLabel(props: { message: string }) {
    const empty = props.message === "";
    const style: React.CSSProperties = {
        maxHeight: empty ? "0px !important" : "3rem",
        padding: empty ? "0rem" : "0.5rem",
        borderWidth: empty ? "0px" : "1px",
    };
    return (
        <div className="error-label" style={style}>
            {props.message}
        </div>
    );
}
