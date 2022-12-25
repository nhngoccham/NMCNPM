import helper from "@/helper/index";


import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDBiZJl1PLAO25DDWX9OBnP4XJOvlQ9XZo",
    authDomain: "football-league-manageme-f964e.firebaseapp.com",
    projectId: "football-league-manageme-f964e",
    storageBucket: "football-league-manageme-f964e.appspot.com",
    messagingSenderId: "113983211938",
    appId: "1:113983211938:web:9a5efbcb24ec6be7f84afb",
    measurementId: "G-78CTBM4NQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadFile = async (file) => {
    const name = `${helper.genId()}_${file?.name || ""}`
    const storageRef = ref(storage, `/uploads/${name}`);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);

}


const uploadMultipleFiles = async (files) => {
    let urls = []
    for (const file of files) {
        const url = await uploadFile(file)
        urls.push(url)
    }
    return urls
}

const firebaseAPIs = {
    uploadFile,
    uploadMultipleFiles
}

export default firebaseAPIs