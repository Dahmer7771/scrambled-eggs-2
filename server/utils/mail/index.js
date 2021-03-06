const mailer = require('nodemailer');
const { welcome } = require("./welcome_template");
const { resetPass } = require("./resetpass_template");
require('dotenv').config();


const getEmailData = (to,name,token,template,actionData) =>{
    let data = null;

    switch(template){
        case "welcome":
            data = {
                from: "ScrambledEggs <nikitaholub1999@gmail.com>",
                to,
                subject: `Welcome to waves ${name}`,
                html: welcome()
            }
        break;
        case "reset_password":
            data = {
                from: "ScrambledEggs <nikitaholub1999@gmail.com>",
                to,
                subject: `Привет, ${name}, восстанови доступ к профилю`,
                html: resetPass(actionData)
            }
        break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to,name,token,type,actionData = null) => {

    const smtpTransport = mailer.createTransport({
        service:"gmail",
        auth: {
            user: "nikitaholub1999@gmail.com",
            pass: process.env.EMAIL_PASS
        }
    });

    const mail = getEmailData(to,name,token,type,actionData)

    smtpTransport.sendMail(mail,function(error,response){
        if(error){
            console.log(error);
        } else {
            cb()
        }
        smtpTransport.close();
    })
}

module.exports = { sendEmail }