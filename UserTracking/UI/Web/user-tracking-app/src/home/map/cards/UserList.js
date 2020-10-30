import React from "react";
import UserCard from "./userCard/UserCard";

function UserList(props) {
  const { users, loading } = props;
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.email}>
            <UserCard
              tokenID={user.id}
              firstName={user.firstname}
              lastName={user.lastname}
              email={user.email}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default UserList;
