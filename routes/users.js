// User routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router


// import the user mongoose model
const { User } = require('../models/user')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");

/*** User API routes ****************/
// Set up a POST route to create a user of your web app (*not* a student).
router.post('/api/users', mongoChecker, async (req, res) => {
	// log(req.body)

	// Create a new user
	const user = new User({
		email: req.body.email,
		password: req.body.password
	})

	try {
		// Save the user
		const newUser = await user.save()
		res.send(newUser)
	} catch (error) {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') // bad request for changing the student.
		}
	}
})

//////////////

/*** Login and Logout routes ***/
// A route to login and create a session
router.post('/users/login', mongoChecker, async (req, res) => {
	const email = req.body.email
    const password = req.body.password

    try {
    	// Use the static method on the User model to find a user
	    // by their email and password.
		const user = await User.findByEmailPassword(email, password);
		if (!user) {
            res.redirect('/login');
        } else {
            // Add the user's id and email to the session.
            // We can check later if the session exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email
            res.redirect('/dashboard');
        }
    } catch (error) {
    	// redirect to login if can't login for any reason
    	if (isMongoError(error)) { 
			res.status(500).redirect('/login');
		} else {
			log(error)
			res.status(400).redirect('/login');
		}
    }

})

// A route to logout a user
router.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})




// export the router
module.exports = router
