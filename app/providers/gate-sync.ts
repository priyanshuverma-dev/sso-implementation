import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

const SSO_ENDPOINT = "http://domainone.com";

export interface CustomProfile extends Record<string, any> {
  id: string;
  name: string | null;
  email: string;
}

export default function GateSyncProvider<P extends CustomProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "gate-sync",
    name: "GateSync",
    type: "oauth",
    authorization: {
      url: `${SSO_ENDPOINT}/sso`,
      params: { scope: "read:user user:email" },
    },
    token: `${SSO_ENDPOINT}/api/sso/access_token`,

    userinfo: {
      url: `${SSO_ENDPOINT}/api/sso/retrive`,
      async request({ client, tokens }) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const profile = await client.userinfo(tokens.access_token!);
        return profile;
      },
    },
    profile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
      };
    },
    style: {
      logo: `${SSO_ENDPOINT}/gate-sync.png`,
      bg: "#24292f",
      text: "#fff",
    },
    options,
  };
}
