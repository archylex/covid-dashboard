import Info from './Info';

const info = new Info();
info.getCountries().then(printCountries);

function printCountries(data) {
    console.log(data);
}
