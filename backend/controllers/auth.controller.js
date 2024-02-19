export const signup = (req, res) => {
   try {
    const {fullName, username, password, confirmPassword, gender} = req.body;
   } catch (error){

   }
}

export const login = (req, res) => {
    res.send("Login User");
    console.log("loginUser");
}

export const logout = (req, res) => {
    res.send("Logout User");
    console.log("logoutUser");
}

