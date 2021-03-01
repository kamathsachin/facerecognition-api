const handleregister = (req, res, db, bcrypt) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json("Invalid credentials entered");
  }

  const hash = bcrypt.hashSync(password);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: username,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json(err));
};

//export default handleregister;
module.exports = {
  handleregister: handleregister,
};
