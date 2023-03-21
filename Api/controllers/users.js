import {db} from "../db.js"

export const getUsers = (_, res) =>{
    const q = "SELECT * FROM usuarios"
    db.query(q, (err, data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data)
    })
}
export const getLinks = (_, res) =>{
    const q = "SELECT * FROM links"
    db.query(q, (err, data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data)
    })
}
 
export const getUsersLInks = (req, res) =>{
    const q = "SELECT * FROM links WHERE id_pessoa = ?"
    
    db.query(q, req.params.id ,(err, data)=>{
        if(err) return res.json(err);

        return res.status(200).json(data)
    })
}
 
export const getUsersId = (req, res) =>{
    const q = "SELECT id FROM usuarios WHERE email = ? AND senha = ?"

    const Values = [
        req.body.email,
        req.body.senha,
    ]
    db.query(q,[...Values],(err, data)=>{
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
 
export const addLink =(req, res)=>{
    const q = "INSERT INTO links (id_pessoa, nome,link) VALUES (?,?,?)"

    const  Values =[
        req.body.id,
        req.body.nome,
        req.body.url,
    ]

    db.query(q, [...Values], (err) =>{
        if(err) return res.json(err)

        return res.status(200).json("Usuario cadastrado com sucesso.");
    })
}

export const updateLink = (req, res) => {
    const q = "UPDATE links SET nome = ?, link = ? WHERE id = ?"
    const values = [
        req.body.nome,
        req.body.url,
        req.body.id
    ]
    
    db.query(q, [...values], (err)=>{
        if(err) return res.json(err)
        
        return res.status(200).json("Usuario cadastrado com sucesso.");

    })

};
  
export const deleteLink = (req, res) => {
    const q = "DELETE FROM links WHERE id = ?"
    
    db.query(q, req.params.id, (err)=>{
        if(err) return res.json(err)
        
        return res.status(200).json("Usuario cadastrado com sucesso.");

    })

};
  