import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div>
      <h1>User Profile</h1>
      <span>{params.id} Page</span>
    </div>
  );
}
