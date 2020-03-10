import React from "react";

export default function Users({ data }) {
  const handleClick = user => {
    console.lg(user);
  };
  return (
    <div>
      {data.map((user, index) => {
        return (
          <div key={index} onClick={() => handleClick(user)}>
            {user.name}
          </div>
        );
      })}
    </div>
  );
}
