import React from "react";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const regex = /^.{0,10}/;
  return (
    <div className="userinfo">
      {/* <img
        className="avatar"
        src={avatarUrl}
        alt={fullName}
      /> */}
      <div className="userDetails">
        <span className="userName">{fullName}</span>
        <br/>
        <span className="additional">{String(additionalText).match(regex)}</span>
      </div>
    </div>
  );
};
