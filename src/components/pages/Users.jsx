import { useState } from "react";
import UserRow from "../parts/UserRow";
import Section from "../parts/Section";
import Title from "../parts/Title";
import Subtitle from "../parts/Subtitle";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
import TextInput from "../forms/TextInput";

const Users = (props) => {
  const [userGroups, setUserGroups] = useState(props.data); // searched by search() function
  const [actualUserGroups, setActualUserGroups] = useState(props.data); // manipulated by search function

  // An original array is not necessary for the group names since the search() function doesn't look through it
  const [actualUserGroupNames, setActualUserGroupNames] = useState(Object.keys(props.data)); // manipulated by search() function

  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState(null); // "not found"

  function search(e) {
    const search = e.target.value;
    setSearchText(search);

    const newGroups = {};
    const newGroupNames = [];
    for (const group in userGroups) {
      const newUsers = [];
      for (const user of userGroups[group]) {
        if (user.name.includes(search)) {
          newUsers.push(user);
        }
      }
      if (newUsers.length > 0) {
        newGroups[group] = newUsers;
        newGroupNames.push(group);
      }
    }
    setActualUserGroupNames(newGroupNames);
    setActualUserGroups(newGroups);

    if (newGroupNames.length === 0) { // no users found
      setSearchError("No users found, please try using a different search term.");
    } else { // reset error message
      setSearchError(null);
    }
  }

  return (
    <>
      <Header />
      <Section fullHeight={true}>
        <Title color="black">All Users</Title>
        <TextInput placeholder="Enter the name of a user to search..." value={searchText} onChange={search} error={searchError} />
        {actualUserGroupNames.map((groupName) => (
          <>
          <Subtitle>
            {
              groupName === "masters"
                ? "Model Masters"
                : groupName.charAt(0).toUpperCase() +
                  groupName.slice(1) // Capitalize first letter of Group Name
            }
          </Subtitle>
          {actualUserGroups[groupName].map((user) => (
            <UserRow user={user} />
          ))}
          </>
        ))
      }
      </Section>
      <Footer />
    </>
  );
};

export default Users;
