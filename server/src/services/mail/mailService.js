import nodemailer from "nodemailer";
const mailTemplate = ({ username, message, url }) => {
    return `
      <div
          style="margin:0;padding:0;font-family:'Nunito Sans','Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;width:100%!important;height:100%!important;background-color:#f8f9fa">
          <div style="margin:0 auto;max-width:600px;padding:24px;background: #fff;">
              <p style="margin: 0;font-size:18px;font-weight:500;">Hi ${username}</p>
              <p style="margin: 0;">${message}</p>
              <p>
                  <a href="${url}" target="_blank"style="text-decoration: none;background-color: #1f8feb;color: white;padding: 12px 24px;border-radius: 4px;margin: 20px 0;">Football League Management</a>
              </p>
              <p>- The Football League Management Team <img style="margin:0 0.2ex;vertical-align:middle;max-height:24px" alt="🖖" src="https://mail.google.com/mail/e/1f596"></p>
          </div>
          <div style="clear: both;text-align: center;padding:20px">
              <span style="color:#95a1ac;font-size:12px;">© Bản quyền thuộc về Football League Management</span>
          </div>
      </div>
      `;
};
const send = ({
    email = "",
    subject = "",
    username = "",
    message = "",
    url = "",
}) => {
    const _name = "Football League Management";
    const _subject = `${subject} | ${_name}`;
    var transporter = nodemailer.createTransport({
        // config mail server
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    var mainOptions = {
        from: _name,
        to: email,
        subject: _subject,
        html: mailTemplate({ username, message, url }),
    };
    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Message sent: " + info.response);
        }
    });
};

const MailService = {
    send,
};
export default MailService;
