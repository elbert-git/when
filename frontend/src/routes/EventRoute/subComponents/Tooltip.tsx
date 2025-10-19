import React from "react";

export default function Tooltip(props: { children: React.ReactNode }) {
    return (
        <div className="tooltip flex flexJustifyStart flexAlignCenter hugWidth">
            <p>💡</p>
            <div className="section">{props.children}</div>
        </div>
    );
}
