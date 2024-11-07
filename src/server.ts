import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
// const port = 3000;
const port = process.env.PORT;

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error('RESEND_API_KEY no está definida en el archivo .env');
  process.exit(1);
}

const resend = new Resend(resendApiKey);


app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const emailTemplate = fs.readFileSync(path.join(__dirname, 'template', 'email.html'), 'utf8');

app.post('/send-email', async (req: Request, res: Response) => {

    // Esto lo agregue de manera adicional ya que si fuera usada en una app real necesitaria algun dato del front.
  const { to, subject, message } = req.body;   
  const htmlContent = message || emailTemplate;

  try {
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev',
    //   to: to || 'nassahel.elias@gmail.com',      esto está comentado por que estuve haciendo pruebas enviandolo a mi correo personal
      to: to || 'anthony@customerscoops.com',
      subject: subject || 'Hola Antony!',
      html: htmlContent,
    });
    
    res.status(200).json({ message: 'Email enviado', emailResponse });
  } catch (error) {
    console.error('Error al enviar el email:', error);
    res.status(500).json({ error: 'Error al enviar el email' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
