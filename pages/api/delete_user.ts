import type { NextApiRequest, NextApiResponse } from "next";
import { UserService } from "../../lib/userService";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user_id } = JSON.parse(req.body);
    await UserService.delete(user_id);
    return res.status(200).end();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return res.status(400).end();
  }
}

export default handler;
