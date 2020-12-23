//gestione errore 404 intercetto tutte le request che non matchano con la route /api/products, sollevo l'errore e imposto lo status a 404 quindi ad ES: /test mi sollevera' un errore con status 404 e passo l'errore al prossimo midlleware (che gestisce gli errori)
const notFound = (req, res, next) => {
    const error = new Error(`Sorry ${req.originalUrl} not Found`);
    res.status(404);
    next(error); //passo l'errore al prossimo middleware con status 404
};

//gestore degli errori
const errorHandler = (err, req, res, next) => {
    //qui gestisco gli errori dopo /api/products
    //alle volte capita di ritornare uno status 200 anche se c'e' un errore, quindi evitiamolo impostando noi lo statuscode
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "null" : err.stack,
    });
};

export { notFound, errorHandler };
