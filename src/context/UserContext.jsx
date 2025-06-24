import React from "react";

var user = {
    userPermissions: 0,
    _id: null,
    name: null,
    guest: false,
}

export var UserContext = React.createContext(user);
