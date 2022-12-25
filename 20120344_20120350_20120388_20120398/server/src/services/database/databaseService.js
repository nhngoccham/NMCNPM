import mongoose from 'mongoose';

const useDatabase = () => {
    mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@footballleaguemanagemen.0hxofud.mongodb.net/${process.env.MONGODB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    // mongodb+srv://petshop:${process.env.MONGODB_PASSWORD}@cluster0.x6ffe.mongodb.net/${process.env.MONGODB_NAME}
    mongoose.connection.on('error', err => console.log(err));
    mongoose.connection.once('open', () => console.log('> MongoDB Running...')).on('error', (e) => { throw e });
};

export default useDatabase;
