import React, { useState } from "react";
import PersonalInfo from "./accountExtras/personalInfo";
import ChangePassword from "./accountExtras/changePassword";

const Account = (props) => {
    const [selectedItem, setSelectedItem] = useState('Personal Info');

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const renderComponent = () => {
        switch (selectedItem) {
            case 'Personal Info':
                return <PersonalInfo username={props.username} />
            case 'Change Password':
                return <ChangePassword />
            default:
                return null;
        }
    };

    return(
        <div style={{ height: "800px" }}>
            <p className="text-center" style={{ fontSize: "1.5rem", fontFamily: "sans-serif", fontWeight: "bold" }}>My account</p>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "row", gap: "10%", justifyContent: "center" }}>
                    <p
                        style={{ color: selectedItem === 'Personal Info' ? 'black' : '#999999', cursor: "pointer" }}
                        onClick={() => handleItemClick('Personal Info')}
                    >
                        Personal Info
                    </p>
                    <p
                        style={{ color: selectedItem === 'Change Password' ? 'black' : '#999999', cursor: "pointer" }}
                        onClick={() => handleItemClick('Change Password')}
                    >
                        Change Password
                    </p>
                </div>
                <hr />
                <div style={{ width: "95%", borderRadius: "20px", alignSelf: "center" }}>
                    <div className="">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;
