import  express from "express";
import { getUsers, addUsers, deleteLink,getUsersId,getUsersLInks, updateLink,addLink ,getLinks} from "../controllers/users.js"
import {db} from "../db.js"
const router = express.Router()

router.get('/', getUsers)
router.get('/viewlinks', getLinks)
router.get('/links/:id', getUsersLInks)
router.post('/', addUsers)
router.post('/newlink', addLink)
router.post('/delete/:id', deleteLink)
router.post('/atualizar', updateLink)
router.post('/getid', getUsersId)
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