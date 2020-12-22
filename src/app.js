import GeoMap from './GeoMap';
import Table from './Table';

const geoMap = new GeoMap();
geoMap.drawTotalConfirmed();

const table = new Table();
const tableButton = document.querySelector('#table-button');
tableButton.addEventListener('click', table.toggleShow.bind(table));

const list = document.querySelector('.map__dropdown-content');
list.addEventListener('click', updateInfo);

function updateInfo(event) {
    switch (event.target.id) {
      case 'list_total_confirmed':
        geoMap.drawTotalConfirmed();
        table.showTotalConfirmed();
        break;
      case 'list_total_death':
        geoMap.drawTotalDeaths();
        table.showTotalDeaths();
        break;
      case 'list_total_recovered':        
        geoMap.drawTotalRecovered();
        table.showTotalRecovered();
        break;
      case 'list_new_confirmed':
        geoMap.drawNewConfirmed();
        table.showNewConfirmed();
        break;
      case 'list_new_deaths':
        geoMap.drawNewDeaths();
        table.showNewDeaths();
        break;
      case 'list_new_recovered':
        geoMap.drawNewRecovered();
        table.showNewRecovered();
        break;
      default:
        break;
    }
}
