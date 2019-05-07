import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCc-KlR74bePIKV9SnuPrsSO43c2dph8ss",
    authDomain: "chatapplicationreactnative.firebaseapp.com",
    databaseURL: "https://chatapplicationreactnative.firebaseio.com",
    projectId: "chatapplicationreactnative",
    storageBucket: "chatapplicationreactnative.appspot.com",
    messagingSenderId: "49724932981",
    appId: "1:49724932981:web:b266e46857c4178f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;