var admin = require("firebase-admin");
var serviceAccount = process.env.FIREBASE_CONFIG;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ringed-magpie-285413.firebaseio.com"
})

verifyToken = (req, res, next) => {
    const headerBody = req.header('Authorization')
    if (!headerBody) {
        return res.status(401).send({ error: true, msg: "no token, authorization denied" });
    }
    const token = headerBody.split(' ')[1]
    try {
        admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            let uid = decodedToken.uid;
            admin.auth().getUser(uid).then(user=>{
                req.user = {
                    uid: uid,
                    username: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                };
                console.log(req.user.displayName)
                next();
            }).catch((error)=>{
                console.log(error);
                return res.status(401).json({ error: true, msg: 'token is not valid' });
            })
        }).catch(function(error) {
            console.log(error);
            return res.status(401).json({ error: true, msg: 'token is not valid' });
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = verifyToken