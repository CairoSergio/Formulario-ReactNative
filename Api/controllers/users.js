import {db} from "../db.js"

export const getUsers = (_, res) =>{
    const q = "SELECT * FROM usuarios"



    db.query(q, (err, data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data)
    })
}
 
export const addUsers =(req, res)=>{
    const q = "INSERT INTO usuarios(nome, email,telefone,senha) VALUES(?)"

    const  Values =[
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.senha,
    ]

    db.query(q, [Values], (err) =>{
        if(err) return res.json(err)

        return res.status(200).json("Usuario cadastrado com sucesso.");
    })
}
