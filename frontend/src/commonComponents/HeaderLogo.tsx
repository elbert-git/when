import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderLogo() {
    const [isOpen, setIsOpen] = useState(false);
    const nav = useNavigate();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="root-logo-header">
            <div onClick={handleToggle} style={{ cursor: "pointer" }}>
                So When
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <div
                        className="dropdown-item"
                        onClick={() => {
                            nav("/home");
                        }}
                    >
                        Home
                    </div>
                    <div
                        className="dropdown-item"
                        onClick={() => {
                            nav("/new");
                        }}
                    >
                        Create new event
                    </div>
                </div>
            )}
        </div>
    );
}
