import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

const auth = (handler) => {
    return async(req, res) => {
        if(req.method === "GET"){
            return handler(req, res)
        }

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbm90ZWluLmNvbSIsImlhdCI6MTY1MDYwNzMxMCwiZXhwIjoxNjUwNjkwMTEwfQ.lX7ZEuaiI_4b20X5E1kfwYkv6ofCti3dHDZ2oS1EwhE"
        
        //await req.headers.authorization.split(" ")[1]
        
        if(!token){
            return res.status(401).json({message: "トークンがありません"})
        }

        try{
            const decoded = jwt.verify(token, secret_key)
            req.body.email = decoded.email 
            return handler(req, res)
        }catch(err){
            return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
        } 
    
    }
}

export default auth