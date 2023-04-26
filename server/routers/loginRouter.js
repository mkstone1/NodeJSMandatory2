import { Router } from "express";
import db from "../databases/connection.js";
import bcrypt from "bcrypt";
import sendEmail from "../util/sendMail.js";
const router = Router();

router.get("/auth/logout", (req, res) => {
  res.send({});
});

router.get("/login");



router.post("/auth/login", async (req, res) => {
  const data = req.body.data;
  //const
  const user = await db.get(
    "SELECT * FROM users where username = ?;",
    data.username
  );


  if (user) {
    const isSame = await bcrypt.compare(data.password, user.password);
    if (isSame) {
      req.session.username = data.username;
      req.session.isLoggedIn = true;
      if (user.role) {
        req.session.role = user.role;
        res.send({data: [{message:"success"},{role:user.role}]});
      } else {
        res.send({data: [{message:"success"}]});
      }
    }
  }
  else{
  res.send({data: [{message:"Failed"}]})};
});

router.get("/api/checklogin", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  res.json({ isLoggedIn });
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy(()=>{
    res.clearCookie("session");
    res.sendStatus(200)
  });
});

router.get("/auth/checkAdmin", (req,res) =>{
  console.log(req.session.role)


    if(req.session.role){
      res.send({data: "true"})

  }
  else{
    res.send({data:"false"})
  }
})

router.get("/auth/forgotPassword", (req, res) =>{
  sendEmail();
  res.send({})
})

export default router;
