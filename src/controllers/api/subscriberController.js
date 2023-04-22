const Subscriber = require('../../models/subscriber');
const Log = require('../../models/log');

//handle errors
const handleErrors = (err) => {
    
    let errors = { 
        email: '',
        name: ''
    }

    //duplicates error code
    if (err.code == 11000) {
        errors.email = 'That email has already subscribed';
        return errors;
    }

    //subscriber validation errors
    if (err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        });
    }

    return errors;
}

const subscriber_mail_save = (req, res) => {
    const subscriber = new Subscriber(req.body);
    const email = {
        To: req.body.email,
        Subject: 'Subscribed To News Letter',
        Body: `Dear ${req.body.name.split(' ')[0]},\n\nThank you for subscribing to our newsletter. We at Kagaba are committed to providing you with useful and helpful content that is relevant to your interests. You can expect to receive updates on a regular basis and we'll do our best to make sure they are interesting and informative.\n\nWe understand that your time is valuable and we will strive to provide you with quality updates that you can benefit from. We hope that our updates will be a valuable addition to your life.\n\nWe look forward to hearing your feedback and suggestions on how we can improve our services. Please let us know if there is anything we can do to make your experience with us even better.\n\nThank you again for signing up!`
    };
    subscriber.save()
    .then(result => {
        Subscriber.send(email)
        .then( result1 => {
            const logBody = {
                action: 'New subcriber',
                subject: `${result.email} <${result.email}>`
            }
            const log = new Log(logBody);
            log.save()
                .then(result1 => {
                    res.status(200).send({ status: "success", message: "The operation was successful." });
                })
                .catch(err1 => {
                    res.status(500).send({ status: "fail", message: "Encountered server error" } );
                });
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        const errors = handleErrors(err);
        if (err.code == 11000) {
            res.status(304).send({ status: "fail", message: 'Already subscribed on our news letter'});   
        } else {
            res.status(400).send({status: "fail", message: "The operation was not successful, encountered errors.", data: errors});
        }
    });
};

module.exports = {
    subscriber_mail_save
}