import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const dataString = formData.get('data') as string
    const pdfFile = formData.get('pdf') as File | null

    if (!dataString) {
      return NextResponse.json(
        { error: 'Nedostaju podaci o prijavi' },
        { status: 400 }
      )
    }

    const data = JSON.parse(dataString)
    
    // Validate required fields
    const requiredFields = ['ime_prezime', 'email', 'telefon', 'lokacija']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Nedostaje obavezno polje: ${field}` },
          { status: 400 }
        )
      }
    }

    // Save application to Sanity
    const applicationDoc = {
      _type: 'franchiseApplicationSubmission',
      name: data.ime_prezime,
      email: data.email,
      phone: data.telefon,
      location: data.lokacija,
      occupation: data.zanimanje,
      education: data.obrazovanje,
      experience: data.iskustvo,
      motivation: data.motivacija_razlog,
      educationExperience: data.iskustvo_edukacija,
      goals: data.ciljevi_godina,
      availableTime: data.dostupno_vreme,
      budget: data.budjet,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    }

    const savedApplication = await client.create(applicationDoc)
    console.log('Application saved to Sanity:', savedApplication._id)

    // Setup email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send confirmation email to applicant
    const applicantEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #5DBFDB 0%, #FDD835 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Hvala vam na prijavi!</h1>
        </div>
        
        <div style="padding: 40px 20px; background: white;">
          <p style="font-size: 18px; color: #3E4C59; margin-bottom: 20px;">
            Poštovani/a ${data.ime_prezime},
          </p>
          
          <p style="font-size: 16px; color: #666; line-height: 1.6; margin-bottom: 20px;">
            Uspešno ste poslali prijavu za franšizu Srećno učenje. Vaša prijava je primljena i biće razmotrena u najkraćem mogućem roku.
          </p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 30px 0;">
            <h3 style="color: #3E4C59; margin-top: 0;">Sledeći koraci:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Proverićemo vašu prijavu i dokumentaciju</li>
              <li>Zakazaćemo uvodni razgovor preko video poziva</li>
              <li>Poslati ćemo vam detaljne informacije o franšizi</li>
              <li>Organizovati ćemo upoznavanje sa lokalnim franšizama</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; color: #666; line-height: 1.6;">
            Kontaktiraćemo vas na email adresu <strong>${data.email}</strong> ili telefon <strong>${data.telefon}</strong> u roku od 48 sati.
          </p>
          
          <div style="text-align: center; margin-top: 40px;">
            <p style="color: #666; font-size: 14px;">
              Srećno učenje tim<br>
              📞 +381 11 234 5678<br>
              ✉️ fransiza@srecno-ucenje.rs
            </p>
          </div>
        </div>
      </div>
    `

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@srecno-ucenje.rs',
        to: data.email,
        subject: 'Potvrda prijave za franšizu Srećno učenje',
        html: applicantEmailHtml,
        attachments: pdfFile ? [{
          filename: `franchise-application-${savedApplication._id}.pdf`,
          content: await pdfFile.arrayBuffer()
        }] : undefined
      })
      console.log('Confirmation email sent to applicant')
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
    }

    // Send notification email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #3E4C59; padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Nova prijava za franšizu</h1>
        </div>
        
        <div style="padding: 30px 20px; background: white;">
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h3 style="color: #3E4C59; margin-top: 0;">Podaci o kandidatu:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #3E4C59;">Ime i prezime:</td>
                <td style="padding: 8px 0; color: #666;">${data.ime_prezime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #3E4C59;">Email:</td>
                <td style="padding: 8px 0; color: #666;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #3E4C59;">Telefon:</td>
                <td style="padding: 8px 0; color: #666;">${data.telefon}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #3E4C59;">Lokacija:</td>
                <td style="padding: 8px 0; color: #666;">${data.lokacija}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #3E4C59;">Zanimanje:</td>
                <td style="padding: 8px 0; color: #666;">${data.zanimanje}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #3E4C59;">Obrazovanje:</td>
                <td style="padding: 8px 0; color: #666;">${data.obrazovanje}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #3E4C59;">Iskustvo:</td>
                <td style="padding: 8px 0; color: #666;">${data.iskustvo}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #5DBFDB20; padding: 20px; border-radius: 12px;">
            <h3 style="color: #3E4C59; margin-top: 0;">Motivacija:</h3>
            <p style="color: #666; line-height: 1.6;">${data.motivacija_razlog || 'Nije uneseno'}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/sanity/desk/franchiseApplicationSubmission;${savedApplication._id}" 
               style="background: #5DBFDB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
              Pogledaj u Sanity Studio
            </a>
          </div>
        </div>
      </div>
    `

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@srecno-ucenje.rs',
        to: process.env.EMAIL_TO || 'fransiza@srecno-ucenje.rs',
        subject: `Nova prijava za franšizu - ${data.ime_prezime}`,
        html: adminEmailHtml,
        attachments: pdfFile ? [{
          filename: `franchise-application-${savedApplication._id}.pdf`,
          content: await pdfFile.arrayBuffer()
        }] : undefined
      })
      console.log('Admin notification email sent')
    } catch (emailError) {
      console.error('Error sending admin email:', emailError)
    }

    return NextResponse.json({
      success: true,
      applicationId: savedApplication._id,
      message: 'Prijava je uspešno poslata'
    })

  } catch (error) {
    console.error('Error processing franchise application:', error)
    return NextResponse.json(
      { error: 'Greška pri obradi prijave. Molimo pokušajte ponovo.' },
      { status: 500 }
    )
  }
}