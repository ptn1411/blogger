'use strict'

module.exports = {
    title: 'Phạm Thành Nam',
    description:'Phạm Thành Nam',
    JWTsecret: 'ptnsecret',
    PassSecret:'ptnpassword',
    mailer: {
        service: 'Gmail',
        auth: {
            user: '',
            pass: ''
        }
    },
    authGoogle: {
        clientId: '',
        clientSecret: '',
        redirectUri: 'http://localhost:3000/auth'
    },
    firestore:{
        "type": "service_account",
        "project_id": "",
        "private_key_id": "",
        "private_key": "",
        "client_id": "",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5ibnq%40fir-92245.iam.gserviceaccount.com"
    },
    sessionKey: 'phamthanhnam',
    APIkey:''
}