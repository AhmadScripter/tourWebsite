const jwt = require('jsonwebtoken');

const adminLogin = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(email != process.env.ADMIN_EMAIL){
            return res.status(404).json({message: "Admin not Found with this email"})
        }
        if(password != process.env.ADMIN_PASSWORD){
            return res.status(400).json({message: "Incorrect Password"})
        }

        const payload = {email};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.json({token, message: "Login successfull"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {adminLogin};