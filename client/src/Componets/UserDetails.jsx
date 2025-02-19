import React, { useEffect, useState } from "react";

export default function UserDetails({usersubmit}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  const saveUserDetails = () => {
    localStorage.setItem("userDetails", JSON.stringify({ name, email }));
    usersubmit();
  };

  
  return (
    <div className="w-screen h-screen gap-2 flex poppins justify-center items-center text-lightCream bg-gradient-to-l from-indigo-600 to-indigo-800">
      <div className="flex flex-col  bg-darkGray px-5 py-10 rounded-md    ">
        <h1 className="text-royalGold text-center oswald text-2xl font-semibold font-sans">Parthasarathi.AI</h1>
        <h1 className="text-royalGold mb-7 mt-2 text-center oswald text-lg font-medium font-sans">Enter Your Details</h1>
        <input
          type="text"
          value={name}
          placeholder="Name"
          required
          className=" outline-none p-2 m-1 rounded-md bg-transparent border border-royalGold"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          required
          className=" outline-none p-2 m-1 rounded-md bg-transparent border border-royalGold"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={saveUserDetails} className="bg-saffron p-2 m-1 rounded-md">Save</button>
      </div>
    </div>
  );
}
