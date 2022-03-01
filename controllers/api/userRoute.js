const router = require("express").Router();
const { User } = require("../../models");

// POST route to create a new user.
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.user_id = userData.id;
    req.session.password = userData.password;

    // Save user responses to a new User object.
    req.session.save(() => {
      req.session.logged_in = true;
console.log("different different string")
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_name: req.body.username },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    req.session.user_id = userData.id;
    req.session.logged_in = true;

    req.session.save(() => {

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
