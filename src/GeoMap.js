import Info from './Info';

export default class GeoMap {
  constructor() {
    this.info = new Info();
    this.maxAmount = 1;
    this.countriesCoords = {};
    this.circles = [];

    this.getCountriesCoords();

    this.list = document.querySelector('.map__dropdown-content');
    this.list.addEventListener('click', this.startById.bind(this));

    this.mapHTML = document.createElement('div');
    this.mapHTML.id = 'map';

    const mapOptions = {
      center: [43.0590235, 141.3459553],
      zoom: 5,
      maxZoom: 5,
      minZoom: 2,
      zoomControl: true,
      attributionControl: false,
    };

    this.map = new L.map('map', mapOptions);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      id: 'mapbox/dark-v9',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this.map);

    this.geoJSON();

    this.legend = L.control({ position: 'bottomleft', clear: 'none' });
    this.legendHTML = L.DomUtil.create('div', 'info legend');
    this.legend.onAdd = this.createLegendHTML.bind(this);

    this.displayInfo = L.control({ position: 'topleft', clear: 'none' });
    this.displayInfo.onAdd = this.showInfo;
    this.displayInfo.update = this.updateInfo;
    this.displayInfo.addTo(this.map);
    this.legend.addTo(this.map);
  }

  showInfo() {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  }

  updateInfo(props) {
    this._div.innerHTML = props ? `
            <h2>${props.formal_en}</h2>
            <h3>${props.covid_title}</h3>
            <b>${props.covid} cases<br />` : 'COVID-19';
  }

  createLegendHTML() {
    const piece = this.maxAmount * 0.2;
    const grades = Array(6).fill(piece).map((e, i) => e * i);

    this.legendHTML.innerHTML = '';

    for (let i = 0; i < grades.length; i++) {
      this.legendHTML.innerHTML += `<i style="background:${this.getColorByCount(grades[i])}"></i>${grades[i]}<br>`;
    }
    return this.legendHTML;
  }

  startById(element) {
    document.querySelector('.map__dropdown-button').textContent = element.target.textContent;
    switch (element.target.id) {
      case 'list_total_confirmed':
        this.drawTotalConfirmed();
        break;
      case 'list_total_death':
        this.drawTotalDeaths();
        break;
      case 'list_total_recovered':
        this.drawTotalRecovered();
        break;
      case 'list_new_confirmed':
        this.drawNewConfirmed();
        break;
      case 'list_new_deaths':
        this.drawNewDeaths();
        break;
      case 'list_new_recovered':
        this.drawNewRecovered();
        break;
      default:
        break;
    }
  }

  drawCircle(point) {
    const circleCenter = [point.latitude, point.longitude];
    const circleOptions = {
      color: '#00000077',
      fillColor: this.getColorByCount(point.amount),
      fillOpacity: 1,
    };
    const piece = point.amount / this.maxAmount;
    const circle = L.circle(circleCenter, 100000 * piece + 10000, circleOptions);
    circle.addTo(this.map);
    this.circles.push(circle);
  }

  clearCircles() {
    this.circles.forEach((circle) => {
      if (circle !== undefined) {
        this.map.removeLayer(circle);
      }
    });
  }

  async geoJSON() {
    this.geodata = await this.info.getGeoJSON();

    this.geodata.features.forEach((feature) => {
      feature.properties.covid = 0;
      feature.properties.covid_title = '';
    });

    this.geojson = new L.geoJson(this.geodata, {
      style: this.style.bind(this),
      onEachFeature: this.onEachFeature.bind(this),
    });
    this.geojson.addTo(this.map);
  }

  async getCountriesCoords() {
    const coords = await this.info.getCountriesCoords();
    for (let i = 0; i < coords.length; i++) {
      this.countriesCoords[coords[i].country_code] = coords[i];
    }
  }

  getColorByCount(count) {
    const shiftAngle = 180;
    const hue = (360 - shiftAngle) * (count / this.maxAmount) + shiftAngle;
    const saturation = 255;
    return `hsla(${hue}, ${saturation}%, 50%, 1)`;
  }

  style(feature) {
    return {
      fillColor: this.getColorByCount(feature.properties.covid),
      weight: 1,
      opacity: 0,
      color: '#ffffff',
      fillOpacity: 0,
    };
  }

  highlight(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      color: '#ffffff',
      opacity: 0.3,
      fillOpacity: 0.3,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    this.displayInfo.update(layer.feature.properties);
  }

  reset(e) {
    this.geojson.resetStyle(e.target);
    this.displayInfo.update();
  }

  zoomToCountry(e) {
    this.map.fitBounds(e.target.getBounds());
  }

  onEachFeature(feature, layer) {
    layer.on({
      mouseover: this.highlight.bind(this),
      mouseout: this.reset.bind(this),
      click: this.zoomToCountry.bind(this),
    });
  }

  async drawTotal(status) {
    const data = await this.info.getSummary();
    const allCountries = data.Countries;
    const statusNames = {
      TotalConfirmed: 'Total Confirmed',
      TotalDeaths: 'Total Deaths',
      TotalRecovered: 'Total Recovered',
      NewConfirmed: 'New Confirmed',
      NewDeaths: 'New Deaths',
      NewRecovered: 'New Recovered',
    };
    const points = [];
    for (let i = 0; i < allCountries.length; i++) {
      const point = {
        amount: allCountries[i][status],
        country: allCountries[i].Country,
        latitude: this.countriesCoords[allCountries[i].CountryCode].latlng[0],
        longitude: this.countriesCoords[allCountries[i].CountryCode].latlng[1],
      };

      points.push(point);
      const amount = allCountries[i][status];
      this.maxAmount = this.maxAmount < amount ? amount : this.maxAmount;

      this.geodata.features.forEach((feature) => {
        if (feature.properties.iso_a2 === allCountries[i].CountryCode) {
          feature.properties.covid = allCountries[i][status];
          feature.properties.covid_title = statusNames[status];
        }
      });
    }

    for (let i = 0; i < points.length; i++) {
      this.drawCircle(points[i]);
    }

    this.createLegendHTML();
  }

  drawTotalConfirmed() {
    this.clearCircles();
    this.drawTotal('TotalConfirmed');
  }

  drawTotalDeaths() {
    this.clearCircles();
    this.drawTotal('TotalDeaths');
  }

  drawTotalRecovered() {
    this.clearCircles();
    this.drawTotal('TotalRecovered');
  }

  drawNewConfirmed() {
    this.clearCircles();
    this.drawTotal('NewConfirmed');
  }

  drawNewDeaths() {
    this.clearCircles();
    this.drawTotal('NewDeaths');
  }

  drawNewRecovered() {
    this.clearCircles();
    this.drawTotal('NewRecovered');
  }
}
