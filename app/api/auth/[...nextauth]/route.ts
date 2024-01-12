import GateSyncProvider from "@/app/providers/gate-sync";
import NextAuth, { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GateSyncProvider({
      clientId: "test",
      clientSecret: "test",
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
