import Info from './Info';

export default class Table {
    constructor() {
        this.info = new Info();        
        this.tableHTML = document.querySelector('.table__info');     
        this.isShow = false;
        this.showTotalConfirmed();
    }
    
    async getInfoByStatus(status) {
        const data = await this.info.getSummary();
        this.tableHTML.innerHTML = '';
        if (data.Countries) {
            const all = data.Countries;
            for (let i = 0; i < all.length; i++) {
                this.tableHTML.innerHTML += `<p class="table__info-line">
                    <span class="left">${all[i].Country}</span>
                    <span class="right">${all[i][status]}</span>
                </p>`;                
            }
        }
    }
    
    toggleShow() {
        console.log(this)
        this.isShow = !this.isShow;
        if (this.isShow) {
            this.tableHTML.classList.add('table__info-active');
        } else {
            this.tableHTML.classList.remove('table__info-active');
        }
    }
    
    showTotalConfirmed() {
        this.getInfoByStatus('TotalConfirmed');
    }
    
    showTotalDeaths() {
        this.getInfoByStatus('TotalDeaths');
    }
    
    showTotalRecovered() {
        this.getInfoByStatus('TotalRecovered');
    }
    
    showNewConfirmed() {
        this.getInfoByStatus('NewConfirmed');
    }
    
    showNewDeaths() {
        this.getInfoByStatus('NewDeaths');
    }
    
    showNewRecovered() {
        this.getInfoByStatus('NewRecovered');
    }
}
