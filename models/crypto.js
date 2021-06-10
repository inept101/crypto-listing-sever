import mongoose  from 'mongoose';


const cryptoSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true
    }
});

const Crypto = mongoose.model('Crypto',cryptoSchema);

export default Crypto;