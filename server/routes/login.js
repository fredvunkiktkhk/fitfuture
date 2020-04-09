/*
router.post('/login', (req, res)=> {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        db.query('SELECT password FROM users WHERE email = ?', [email],
            (error, results, fields)=> {
                if (bcrypt.compareSync(password, {hash from db})) {
                    res.send("Successful");
                } else {
                    res.send('Incorrect Email and/or Password!');
                }
                res.end();
            });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});*/
