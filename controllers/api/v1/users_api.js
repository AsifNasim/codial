const jwt = require('jsonwebtoken');
const User = require('../../../models/user');


module.exports.createSession = async function(req, res){
    // find the user and then create token

    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            });
        }

        return res.json(200,{
            message : 'Sign in successful, here is your token, please keep it safe.',
            data: {
                //  user.toJSON() this part get encrypted
                token: jwt.sign(user.toJSON(), 'codial', {expiresIn: ' 100000'})
            }
        });
    } catch (err) {
        console.log('***************', err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }

    
}