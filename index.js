const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
//# traer todos los paises
const { Countries } = require('./src/db');

// Syncing all the models at once.
const CreateBd = async () => {
  const countries = await axios.get('https://restcountries.com/v3.1/all')
  //await Promise.all(countries.data.map((country) => {
  await countries.data.map((country) => {
    //@ guardar spa en la base de datos, obtengo nombres en español de cada pais
    caseInsensitivity = function(obj) {
      Object.keys(obj).forEach(k => {
          if(typeof obj[k] == 'string') {
                  obj[k] = obj[k].toLowerCase();
          }
          else if(typeof obj[k] == 'object') {
              caseInsensitivity(obj[k]);
          }
      });
      return obj;
    }
    let data = {
      id_country: country.cca3,
      name: caseInsensitivity(country.translations.spa), //@ 'name' nombre es un array debido q puede tener varios nombres
      imagen_bandera: country.flags.png,
      continente: country.continents,
      capital: country.capital,
      region: country.region,
      subregion: country.subregion,
      poblacion: country.population,
      area: country.area,
      maps: country.maps,
      escudo: country.coatOfArms
    }
    Countries.findOrCreate({where: {id_country: country.cca3}, defaults: data})
    //console.log(data);
  });
}

CreateBd()
console.log('creada perro')

conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});