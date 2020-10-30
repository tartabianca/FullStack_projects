import React from "react";
import styles from "./UserCard.module.css";

const UserCard = (props) => {
  let {firstName, lastName, email} = props;

  return (
    <div className={styles.cardContainer}>
      <div>
        {firstName} {lastName}
    </div>
      <div>
        {email}
      </div>
    </div>
  );
};

UserCard.defaultProps = {
  firstName: "Bianca",
  lastName: "Tarta",
  email: "tartabianca99@yahoo.com"
};

export default UserCard;
