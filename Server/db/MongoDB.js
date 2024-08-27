import mongoose from "mongoose";


const mongoConnect = (url) => {
    mongoose.connect(url)
        .then(() => console.log('Databae are connect'))
        .catch(err => console.error('error occured', err));
}



export default mongoConnect

