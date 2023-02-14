// import { getAuth } from "firebase/auth";
// import { doc, onSnapshot } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../../firebase";

// function UserChats() {
//     const auth = getAuth();
//     const { currentUser } = auth;
//     const [chats, setChats] = useState([]);
    
//     useEffect(() => {
//         const getChats = () => {
//           const unsub = onSnapshot(doc(db, "userChats", currentUser!.uid), (doc) => {
//             setChats(doc.data());
//           });
    
//           return () => {
//             unsub();
//           };
//         };
    
//         currentUser?.uid && getChats();
//       }, [currentUser?.uid]);
//     return (
//       <div className="userchats">
//         {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
//         <div
//           className="userChat"
//           key={chat[0]}
//         >
//           <img src={chat[1].userInfo.photoURL} alt="" />
//           <div className="userChatInfo">
//             <span>{chat[1].userInfo.displayName}</span>
//             <p>{chat[1].lastMessage?.text}</p>
//           </div>
//         </div>
//       ))}
//       </div>
//     );
//   };
  
//   export default UserChats;