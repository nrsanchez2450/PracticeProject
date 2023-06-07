// import React, { useState } from "react";

// const UserContext = React.createContext({});
// const UpdateUserContext = React.createContext(function ({}) {});

// export function UserContextProvider({ children }) {
//   const [userContext, setUserContext] = useState({});

//   const changeUser = (userObj: {}) => {
//     setUserContext(userObj);
//   };

//   return (
//     <UpdateUserContext.Provider value={changeUser}>
//       <UserContext.Provider value={userContext}>
//         {children}
//       </UserContext.Provider>
//     </UpdateUserContext.Provider>
//   );
// }
