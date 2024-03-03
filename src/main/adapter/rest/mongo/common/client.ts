import { mongoose, ConnectOptions } from "./loader.js";
// import { logger } from '../../../logger/log4js.js'

const connect = async () => {
  const optionals = '?retryWrites=true&w=majority'
  const db = process.env.MONGO_DB as string
  const uri = process.env.MONGO_CLIENT + db + optionals
  try {
    return await mongoose.connect(uri, {
      maxPoolSize: 10,
    } as ConnectOptions);
  } catch (err) {
    console.error(`Failed while connecting to MongoDB: ${err}`)
    throw err;
  }
};

export { connect };