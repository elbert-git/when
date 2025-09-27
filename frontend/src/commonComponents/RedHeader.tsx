import React from "react";

export default function RedHeader(props: { children: React.ReactNode }) {
    return <div className="red-header">{props.children}</div>;
}
