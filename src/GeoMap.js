export default class GeoMap {
    constructor() {
        const mapOptions = {
            center: [43.0590235, 141.3459553],
            zoom: 10
        };
        this.map = new L.map('map', mapOptions);
        const layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        this.map.addLayer(layer);        
    }
    
    drawCircle() {
        const circleCenter = [43.0590235, 141.3459553];
        const circleOptions = {
            color: this.getColorByCount(600),
            fillColor: this.getColorByCount(600),
            fillOpacity: 1
        };
        const circle = L.circle(circleCenter, 5000, circleOptions);
        circle.addTo(this.map);
    }
    
    getColorByCount(count) {
        const hue = 360 * (count / 1000);
        const saturation = 255;
        return `hsla(${hue}, ${saturation}%, 50%, 1)`;
    }        
};

