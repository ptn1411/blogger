const admin = require("firebase-admin");
const config = require('../config');

const serviceAccount = config.firestore;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function registerUser(name, email, password) {
    await db.collection('Users').add({
        name: name,
        email: email,
        password: password,
        date: Date.now()
    })
}


async function loginGG(name, email, accessToken, picture) {
    await db.collection('Users').where('email', '==', email.toLowerCase()).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            db.collection("Users").doc(doc.id).update({
                name: name,
                email: email,
                accessToken: accessToken,
                picture: picture,
                date: Date.now()
            });
        });
    });
}

async function loginUser(search) {
    return new Promise(async (resolve, reject) => {
        let jsonPush = [];
        await db.collection('Users').where('email', '==', search.toLowerCase()).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const json = {
                    id: doc.id,
                    data: doc.data()
                }
                jsonPush.push(json);
            });
        });
        resolve(jsonPush);
    });
}

async function getUser(email) {
    return new Promise(async (resolve, reject) => {
        let jsonPush = [];
        await db.collection('Users').where('email', '==', email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const json = {
                    id: doc.id,
                    data: doc.data()
                }
                jsonPush.push(json);
            });
        });
        resolve(jsonPush);
    });
}

async function getApi(email) {
        let jsonPush = [];
        await db.collection('Users').where('email', '==', email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const json = {
                    id: doc.id,
                    data: doc.data()
                }
                jsonPush.push(json);
            });
        });
        return jsonPush;
}

async function addApiBlogger(idUser, idBlogger) {
    await db.collection("Users").doc(idUser).update({
        idBlogger: idBlogger
    });
}


module.exports = {
    loginUser, registerUser, loginGG, getUser,addApiBlogger,getApi
}