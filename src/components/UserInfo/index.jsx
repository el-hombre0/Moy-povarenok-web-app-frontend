import React from "react";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className="root">
      <img
        className="avatar"
        src={avatarUrl || "/no-avatar.webp"}
        alt={fullName}
      />
      <div className="userDetails">
        <span className="userName">{fullName}</span>
        <span className="additional">{additionalText}</span>
      </div>
    </div>
  );
};
