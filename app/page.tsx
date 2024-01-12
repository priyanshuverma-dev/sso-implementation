"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

const SubDomainPage = () => {
  const { data, status } = useSession();

  console.log(data);
  console.log(status);

  return (
    <div>
      {data?.user?.email}
      <div>
        <button
          onClick={() =>
            signOut({
              redirect: true,
            })
          }
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SubDomainPage;
