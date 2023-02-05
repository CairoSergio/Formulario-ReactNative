import  express from "express";
import { getUsers, addUsers } from "../controllers/users.js"
import {db} from "../db.js"
const router = express.Router()

router.get('/', getUsers)
router.post('/', addUsers)
router.post('/verify', (req, res) => {
    const q = "SELECT * FROM usuarios WHERE email = ? and senha = ?"
    const values = [req.body.email, req.body.senha]
    db.query(q, values, (err, result) => {
      if (err) {
        return res.json(err)
      }
      if (result.length > 0) {
        return res.status(200).json('verificado')
      } else {
        return res.status(401).json(values)
      }
    })
})


export default router