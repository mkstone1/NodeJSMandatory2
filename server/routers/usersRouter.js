import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

import isAdmin from "../util/checkIfAdmin.js";

router.get("/users", isAdmin , async (req, res) => {
    res.send({ data: await db.all("SELECT username FROM users;")});
});


export default router;