import bcrypt from "bcryptjs";

//! solitamente l'hash delle password andrebbe fatto asincrono, ma visto che sono dati che stiamo importando e non costruendo da un form possiamo usare hashSync

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Jane White",
        email: "jane@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

export default users;
