const nodemailer = require('nodemailer');
const shortid = require('shortid');

const emailConfig = {
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: 'carlos4desk@outlook.com',
    pass: '4desk123'
  }
};

const transporter = nodemailer.createTransport(emailConfig);

function gerarToken() {
  //Gera um token de 6 caracteres usando shortid
  shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#');
  return shortid.generate().substring(0, 6)
}

export async function enviarEmailComToken(emailDestinatario) {
    try {
      const token = gerarToken();
  
      const mailOptions = {
        from: 'carlos4desk@outlook.com',
        to: emailDestinatario,
        subject: 'Greeneat - Token para validação de e-mail',
        html: `<h3>Token para validação de e-mail no sistema da Greeneat.</h3></br><h4>Seu token é: <b>${token}</b></h4>`
      };
  
      await transporter.sendMail(mailOptions);
  
      return {
        isSuccess: true,
        messages: ['E-mail enviado com sucesso.'],
        token: token
      };
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      return {
        isSuccess: false,
        messages: ['Erro ao enviar o e-mail.'],
        token: null
      };
    }
  }