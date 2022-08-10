import { Request, Response } from "express";
import log from "../utils/logger";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
  try {
    // call create user service
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
