import mongoose from 'mongoose';
import CONFIG from '../config.js';

async function connection() {
    await mongoose.connect(CONFIG.MONGODB_LINK)
    .then(() => { console.log('Db is connected!'); })
    .catch(error => console.log(error));
}

export { connection }