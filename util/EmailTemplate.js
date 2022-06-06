const formatEmail = (email, password) => {
    return {
        Source: process.env.EMAIL_SENDER,
        Destination: {
            ToAddresses: [
                email
            ],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: 'Beste, <br>' +
                        'Vanaf nu is het mogelijk om op ingestelde tijdstippen het landgoed Ter Horsten te betreden. <br>' +
                        'Met de bijgevoegde inloggegevens kan via de app {{LINK}} toegang worden verkregen<br>' +
                        `emailadres: ${email}<br>
                        wachtwoord: ${password}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Toegang tot Landgoed Ter Horst`,
            }
        },
    };

}
module.exports = formatEmail;
