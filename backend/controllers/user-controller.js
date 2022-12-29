const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class UserController {
    async signup(req, res) {
        try {

            const { name, email, level, profession, password, confirmPassword } = req.body;

            if (password == confirmPassword) {
                const user = await userService.findUser({ email });

                if (!user) {

                    const hashPass = await userService.hashPassword(password);
                    const newUser = await userService.createUser({ name, email, level, profession, password: hashPass });

                    res.status(201).json({
                        user: {
                            id: newUser.id,
                            name: newUser.name,
                            email: newUser.email,
                            level: newUser.level,
                            profession: newUser.profession,
                            reportCount: newUser.reportCount
                        },
                        message: "User Signup Successfully"
                    });
                }
                else {
                    res.status(409).json({ message: "Email is already registered" });
                }
            } else {
                res.status(400).json({ message: "Password does not match with confirm password" })
            }

        } catch (error) {
            res.status(500).json({ message: "Database error" });
        }

    }


    async login(req, res) {

        const { email, password } = req.body;

        console.log(email, password);
        try {
            const user = await userService.findUser({ email });
            console.log(user);
            if (user) {

                const comparePass = await userService.comparePassword(password, user.password);

                if (comparePass) {
                    const token = tokenService.generateTokens({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        level: user.level,
                        profession: user.profession,
                        reportCount: user.reportCount,
                    });


                    res.status(200).json({
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            level: user.level,
                            profession: user.profession,
                            reportCount: user.reportCount
                        },
                        message: "User Login Successfully",
                        isAuth: true,
                        token
                    });

                } else {
                    res.status(400).json({ message: "Password does not match" });
                }

            } else {
                res.status(400).json({ message: "Could not find user!!!" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Database error" });
        }
    }
}

module.exports = new UserController();


