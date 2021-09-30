'use strict'

module.exports = {
    title: 'Phạm Thành Nam',
    description:'Phạm Thành Nam',
    JWTsecret: 'ptnsecret',
    PassSecret:'ptnpassword',
    mailer: {
        service: 'Gmail',
        auth: {
            user: 'phamthanhnamdev@gmail.com',
            pass: 'nguyenxuantrung2'
        }
    },
    authGoogle: {
        clientId: '674364994939-02cji51agp3j0fadohas1tmpfnkgfaoo.apps.googleusercontent.com',
        clientSecret: 'jUTLqVZmJCeASBHmjrEWmm3j',
        redirectUri: 'http://localhost:3000/auth'
    },
    firestore:{
        "type": "service_account",
        "project_id": "fir-92245",
        "private_key_id": "fd266512495a76d1592874c7c0b17660c86ef4ac",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC9WKRbYZHTrNRK\nhEN2K+WZq7umgIn7yAKuR+y77gcAIAbFepFtPJVlevp4DiaI+KQVXvcG/+eHATdJ\nCOGubsuISGe0ByMjYAlsg7ndUQSBGc+x37lxaLnAs4zlQjLZOIJV42QUB86eK5Vv\nCsQ3tQadBWiQZhNf3XHCGbk8TTwvXnkhWmNPZbCUUBLXENiLVwyBK823uhg0verR\nzj3dgvIujsq5EmLap4di/Ig5Eyw2XXagsO8zlq0Hszg7DOKOlCVf0nm2Y7HjPOKM\nIZeR8vRGbtjcmPuk1L24CG3GPK08OL+Ww4Dtme10BZ5ceLd4FafBUpGsLw7RAPGL\nw4TtcHzNAgMBAAECggEABwEM69PGwJGcCk67NMkizKQMlj83VFqb4P/6OgWo5BQE\nGI1wpZ2jtjsfvjhiAVDBt8DiRWygDy2w8pLYelHfOW9LyPqMnCXjBulPZr2YicgG\nexaRJ+/A9tl/PZgFy9Z4dgHi9VaBQr5AiwcP/BX/QSFgXVP03hJ1W8HoZWi04i4S\n4QEpa1bF1+qYxEQ8KdbEfjnHR9bB5iS8QGzuljBZXu4V4pYXf/Wcx67ITnmI1Hqa\nLWjI8LCraBrDZFGsXJxDvKsNDzJ7kWuFMk+uymILOKxtUAXo1Cfm5n5oLSwD3tZ+\nr0M+x/Zd49cnMbzPETXnyezWmrjNP5znWUgXfALrpwKBgQD58XoC6KwfmTbCo1r7\njleOR7v8dEi40dBSNECSZSAyyYEubeb1t08BHrqQd6d6PwKXXGUwUlwmFyjF70j4\nBVYI+lf94BLcrB0jPfnQWjyBNZHaX4+p536EkNkzKEHGCOs3AXy118Dc0qc9arVx\n2+TKLLCNJfqD0hNkfBmhTjCfmwKBgQDB70B0q5QHwNabyKsog0ASkUQa2OnY2MwI\nZFu576v90KUfbcRt7LXQIwRUKYi53fo4p5d8wpxvnU4vcYWHiXPD43ZS4ryacUUl\na1A0rlu6uIa1uwFPOMfP2mNIY65l/6Ts9OLAceWEiDhOiO04kpET2kX8SX18O5cE\nYq6Z68n/twKBgGOMD6JU9SjopuzCjxwdxzV90Jtt3QDvX989vHISIM7Zfr/1OcWn\nqqmxiXC8l1GTAv8x54Nlahopoy2ibheKWIfe3WjZ8+k8C6bbqkGXjv2PTnYBFYEA\nGF3IKxm68Odk6fnQd9EdC01oAP/vHjEo+Wikf/TXqX0TEHI3EyYxtB/9AoGAc7uZ\nlYaHEpFsAQ+hxM1+wRXbtMHZ28SVDjUF4FI9K30F7VmOLaNjZNBg1vDqXTExD/pD\nlvp0bM9NR1bRvu6yHSZzCEezEd+iyg/ej3G14Boamfz9bQ+PfmTvdtW1z7zd6WLC\npuHRfGPmZkekeWxOE7DgrwwUTL0rBDz3wXdK1sUCgYAEsKaMt6B1HjvOwy1GEPhJ\ntCz7lMaHLAcH/T5QezkIwe6pjXxmweMYDMhcLVawr4C2IIMLyNZUF/2sujUl9hq3\nkwcwAnP9ySQGMiLdQiAkxsrDRLxKnmaHCGmEhQ8EQX4r8OXgLIHlUFf9/qSTc6rl\nbHgbB+n/2QYot0AQhpLTOA==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-5ibnq@fir-92245.iam.gserviceaccount.com",
        "client_id": "113941405881699223958",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5ibnq%40fir-92245.iam.gserviceaccount.com"
    },
    sessionKey: 'phamthanhnam',
    APIkey:'AIzaSyDp59CYB74jNp6PL07rdnCwuFK3meSJAv4'
}