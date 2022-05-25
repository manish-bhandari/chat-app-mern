const User = require('../model/UserModel')
const bcrypt = require('bcrypt');

module.exports.register = async (req,res,next) => {
    console.log(req.body);

    try{
            const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({username});
    if (usernameCheck) 
        return res.json({msg:"Username already used", status: false})
    const emailCheck = await User.findOne({email});
    if (emailCheck)
        return res.json({msg:"Email already used", status: false});
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        username, 
        password: hashedPassword,
    });
    delete user.password;
    return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });
    delete user.password;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect username or password", status: false });
      
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};