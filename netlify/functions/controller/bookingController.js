// controller/bookingController.js
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const OWNER_EMAIL = process.env.OWNER_EMAIL || EMAIL; // Use a dedicated env var, default to business email

const sendBookingConfirmation = async (req, res) => {
    const { name, email, phone, service, package: bookedPackage, addons, vehicle, date, time, message: specialInstructions } = req.body; // Renamed the message from req.body to avoid conflict

    let config = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Bridge Auto Detailing',
            link: 'https://www.bridgeautodetailing.com/'
        }
    });

    let response = {
        body: {
            greeting: `Dear ${name}`,
            intro: 'Thank you for your booking with Bridge Auto Detailing!',
            table: {
                data: [
                    { key: 'Service', value: service },
                    { key: 'Package', value: bookedPackage || 'Not Selected' },
                    { key: 'Ad-ons', value: Array.isArray(addons) ? addons.join(', ') : addons || 'None' },
                    { key: 'Vehicle', value: vehicle },
                    { key: 'Preferred Date', value: date },
                    { key: 'Preferred Time', value: time },
                    { key: 'Phone', value: phone },
                    { key: 'Email', value: email },
                    { key: 'Special Instructions', value: specialInstructions || 'None' }
                ]
            },
            outro: 'We will contact you shortly to confirm your booking details. If you have any questions, please do not hesitate to contact us.'
        }
    };

    let mailToUser = MailGenerator.generate(response);

    let messageToUser = { // More descriptive variable name
        from: EMAIL,
        to: email,
        subject: 'Your Car Detailing Booking Confirmation',
        html: mailToUser
    };

    try {
        await transporter.sendMail(messageToUser);
        console.log('Confirmation email sent to user:', messageToUser.to);

        // --- Send email to the owner ---
        const mailToOwner = `
            <h2>New Booking Details:</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${req.body.address || 'Not Provided'}</p>
            <p><strong>City:</strong> ${req.body.city || 'Not Provided'}</p>
            <p><strong>Vehicle:</strong> ${vehicle}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Package (if applicable):</strong> ${bookedPackage || 'Not Selected'}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Special Instructions:</strong> ${specialInstructions || 'None'}</p>
            <p><strong>Add-ons (if any):</strong> ${Array.isArray(addons) ? addons.join(', ') : addons || 'None'}</p>
        `;

        let messageToOwner = {
            from: EMAIL,
            to: OWNER_EMAIL,
            subject: 'New Booking Received!',
            html: mailToOwner
        };

        const infoOwner = await transporter.sendMail(messageToOwner);
        console.log('Booking details sent to owner:', messageToOwner.to);

        return res.status(200).json({ msg: 'Booking confirmation email sent successfully!' });

    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
        return res.status(500).json({ error: 'Failed to send booking confirmation email.' });
    }
};

module.exports = {
    sendBookingConfirmation
};