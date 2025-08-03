import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, type } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Ime, email i poruka su obavezni' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Neispravna email adresa' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Novi kontakt sa sajta - ${type || 'Opšte pitanje'}`,
      html: `
        <h2>Nova poruka sa kontakt forme</h2>
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Tip upita:</strong> ${type || 'Opšte pitanje'}</p>
        <p><strong>Poruka:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMail = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Hvala na vašem upitu - Srećno učenje',
      html: `
        <h2>Poštovani ${name},</h2>
        <p>Hvala što ste nas kontaktirali. Primili smo vašu poruku i odgovorićemo vam u najkraćem mogućem roku.</p>
        <p>Vaša poruka:</p>
        <blockquote style="border-left: 3px solid #3B82F6; padding-left: 15px; margin: 15px 0;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Srdačan pozdrav,<br>Tim Srećno učenje</p>
      `,
    };

    await transporter.sendMail(confirmationMail);

    return NextResponse.json(
      { message: 'Poruka je uspešno poslata' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Greška prilikom slanja poruke' },
      { status: 500 }
    );
  }
}