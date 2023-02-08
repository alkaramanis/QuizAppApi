// const nodemailer = require('nodemailer');

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firestName = user.name.split('')[0];
//     this.url = url;
//     this.from = `alex karamanis <${process.env.EMAIL_FROM}>`;
//   }

//   createTransport() {
//     if (process.env.NODE_ENV === 'production') {
//       //sendGrid
//       return 1;
//     }
//     return nodemailer.createTransport({
//       //service: 'Gmail'
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       //ACTIVATE IN GMAIL "Less secure app" option
//     });
//   }

//   //  sent the actual email
//   send(template, subject) {
//     // 1) Render HTML based on pug template

//     // 2) Define email options
//     const mailOptions = {
//       from: 'alex karamanis <alexandroskaramanis@hotmail.com>',
//       to: options.email,
//       subject: options.subject,
//       text: options.message,
//       //html
//     };
//     // 3) Create transport and send email
//   }

//   sendWelcome() {
//     this.send('welcome', 'welcome to the Natours Family!');
//   }
// };
// const sendEmail = async (options) => {
//   //2) define the email options

//   // 3)Sending email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
