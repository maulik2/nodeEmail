var express    = require('express'); 
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var config = require('../config/config');

var router = express.Router();              // get an instance of the express Router


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with 
//app.use('/email', router); - this is set on indexjs
//test changes


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our email!' });   
});
// more routes for our API will happen here

router.post('/send', sendEmail); //handled at localhost:3001/email/send


 function sendEmail(req, res) {
    

    
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;

    //create re usalbe transporter for SMTP
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.user,
            pass: config.password
        }
    }) ;


    var emailtext = 'This is where you can put your message to email address. \n\n' 
                    + 'name: ' + name + '\n'
                    + 'email: ' + email + '\n'
                    + 'message: ' + message ; 
    //create email data
    var mailOptions = {
        from:'"Contact us" <donotreply@gmail.com>', //senders address
        to: 'your_message_receiving_email@gmail.com',// list of receivers
        subject: 'Messgae from Node email service',
        text: emailtext
    };

    //send email
    transporter.sendMail(mailOptions,function(err, info){
        if (err) {
            return res.json(err);
        }
        //res.json('message sent: ' + info.response);
        res.json('message sent' );
    });

}





module.exports = router; 