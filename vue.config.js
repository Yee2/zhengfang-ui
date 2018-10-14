let production = {
    outputDir:"dist",
    baseUrl:"/static/"
};
let development ={

};
module.exports = process.env.NODE_ENV === 'production' ? production:development;