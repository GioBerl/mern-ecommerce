//!SEEDER DA USARE SOLO PER CARICARE DATI SUL DB

import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

//!config leggerà il tuo file .env, analizzerà il contenuto, lo assegnerà a process.env e restituirà un oggetto con una chiave analizzata contenente il contenuto caricato o una chiave di errore se fallisce
dotenv.config();

connectDB();

//?creo funzione per caricare i dati nel DB
const importData = async () => {
    try {
        //pulisco tutti documents dentro le collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //popolo la collection users e li metto dentro una costante che mi servira' per recuperare l'id dell'admin (che so essere quella in prima posizione)
        const createdUsers = await User.insertMany(users); //questa promise ritorna un array

        const adminUser = createdUsers[0]._id;

        //creo sampleProducts e voglio sapere quale user ha creato quel product (nel nostro caso l'admin) quindi per ogni product inserisco il mio adminUser(id dell'admin)
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        //adesso che ho il nuovo array con il collegamento fra prodotto e admin che ha creato il prodotto posso popolare la collection products
        await Product.insertMany(sampleProducts);

        console.log("Data Imported".green.inverse);
        // !* esco da Node
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        //!* esco da Node con codice 'failure'
        process.exit(1);
    }
};

//? creo funzione per cancellare tutte le collections nel DB
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data Destroyed".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
};

//! IMPOSTO I COMANDI DA TERMINALE PER CREARE E DISTRUGGERE I DATI NEL DB
//* node back/seeder -d ---> distrugge i dati
if (process.argv[2] === "-d") {
    destroyData();
} else {
    //* node back/seeder ---> importa i dati
    importData();
}

//questi comandi li ho messi sugli script di package.json cosi posso scrivere:
//npm run data:import
//npm run data:destroy
