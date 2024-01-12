"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen space-y-4 ">
      <button
        className="p-4 border-2 m-2 rounded-md outline-none "
        type="submit"
        onClick={() => signIn("gate-sync")}
      >
        Sign In with GateSync
      </button>
    </div>
  );
};

export default LoginPage;
