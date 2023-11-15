import * as stytch from "stytch";

let client: stytch.Client;

export const loadStytch = () => {
  if (!client) {
    client = new stytch.Client({
      project_id: process.env.NEXT_PUBLIC_STYTCH_PROJECT_ID || "",
      secret: process.env.NEXT_PUBLIC_STYTCH_SECRET || "",
    });
  }

  return client;
};

export default loadStytch;
