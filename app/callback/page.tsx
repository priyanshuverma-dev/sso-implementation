"use client";
import { redirect } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../api/callback/route";
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const Callback = (props: Props) => {
  const code = props.searchParams.code;
  const clientId = "test";
  if (code == undefined) {
    redirect("/login");
  }

  fetch("http://domaintwo.com:8080/api/callback", {
    method: "POST",
    body: JSON.stringify({
      code: code as string,
      clientId: clientId,
    }),
  })
    .then(async (res) => {
      const body = await res.json();
      console.log(body);
    })
    .catch((e) => console.log(e));

  return <div>Callback</div>;
};

export default Callback;
