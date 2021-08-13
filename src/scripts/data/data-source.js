import Chart from 'chart.js/auto';

const baseUrl = 'https://covid19.mathdro.id';

const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Novermber', 'Desember'];

class DataSource {
  static async getData() {
    try {
      const response = await fetch(`${baseUrl}/api`);
      const responseJson = await response.json();
      
      const date = new Date();
      const yesterday = `${date.getMonth() + 1}-${(date.getDate() - 3)}-${date.getFullYear()}`;
      const yesterdaySummary = await fetch(`${baseUrl}/api/daily/${yesterday}`);
      const yesterdaySummaryJson = await yesterdaySummary.json();

      let totalPastYesterdayConfirmed = 0;

      for (let i = 0; i < yesterdaySummaryJson.length; i++) {
        totalPastYesterdayConfirmed += parseInt(yesterdaySummaryJson[i].confirmed);
      }
      
      if (response.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderDate(responseJson.lastUpdate);
        renderConfirmed(responseJson.confirmed.value);
        renderRecovered(responseJson.recovered.value);
        renderPercentageRecovered(responseJson.recovered.value, responseJson.confirmed.value);
        renderDeaths(responseJson.deaths.value);
        renderPercentageDeaths(responseJson.deaths.value, responseJson.confirmed.value);
        renderConfirmedUpdate(responseJson.confirmed.value, totalPastYesterdayConfirmed);
      }
    } catch(error) {
      console.error(error)
    }
  }
  
  static async getVisualReport() {
    try {
      const response = await fetch(`${baseUrl}/api/daily`);
      const responseJson = await response.json();

      const listDate = [];
      for (let i = 0; i < responseJson.length; i++) {
        listDate.push(responseJson[i].reportDate);
      }

      const listConfirmed = [];
      for (let i = 0; i < responseJson.length; i++) {
        listConfirmed.push(responseJson[i].totalConfirmed);
      }

      const listRecovered = [];
      for (let i = 0; i < responseJson.length; i++) {
        listRecovered.push(responseJson[i].totalRecovered);
      }

      const listDeaths = [];
      for (let i = 0; i < responseJson.length; i++) {
        listDeaths.push(responseJson[i].deaths.total);
      }
      
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        renderVisualReport(listDate, listConfirmed, listRecovered, listDeaths);
      }
    } catch(error) {
      console.error(error);
    }
  }

  static async searchCountry(country) {
    try {
      const response = await fetch(`${baseUrl}/api/countries/${country}`);
      const responseJson = await response.json();
      
      if (responseJson.error) {
        return Promise.reject(`${country} tidak ditemukan`);
      } else {
        return Promise.resolve(responseJson);
      }
    } catch(error) {
      console.error(error);
    }
  }
}

const renderDate = (date) => {
  const lastDate = new Date(date);
  const lastDateValue = `${lastDate.getDate()} ${(monthNames[lastDate.getMonth()])} ${lastDate.getFullYear()} ${lastDate.getHours()}:${lastDate.getMinutes()}:${lastDate.getSeconds()} WIB`;
  const dateElement = document.createElement('p');
  const textDateValue = document.createTextNode(`Data per ${lastDateValue}`);

  dateElement.appendChild(textDateValue);
  document.getElementById('infoBar').appendChild(dateElement);
}

const renderConfirmed = (confirmed) => {
  const confirmedElement = document.createElement('h5');
  const textConfirmedValue = document.createTextNode(`${(confirmed).toLocaleString()}`);

  confirmedElement.appendChild(textConfirmedValue);
  document.getElementById('confirmedBar').appendChild(confirmedElement).parentElement.children[0];
}

const renderConfirmedUpdate = (todayValue, yesterdayValue) => {
  const confirmedUpdateElement = document.createElement('p');
  confirmedUpdateElement.innerText = `↗ `
  const textconfirmedUpdateElement = document.createTextNode(`${(todayValue - yesterdayValue).toLocaleString()}`);

  confirmedUpdateElement.appendChild(textconfirmedUpdateElement);
  document.getElementById('confirmedBar').appendChild(confirmedUpdateElement);
}

const renderRecovered = (recovered) => {
  const recoveredElement = document.createElement('h5');
  const textRecoveredValue = document.createTextNode(`${(recovered).toLocaleString()}`);

  recoveredElement.appendChild(textRecoveredValue);
  document.getElementById('recoveredBar').appendChild(recoveredElement);
}

const renderPercentageRecovered = (recoveredValue, confirmedValue) => {
  const percentageRecovered = document.createElement(`p`);
  const textPercentageRecoveredValue = document.createTextNode(`${Math.round(recoveredValue/confirmedValue * 100)}%`);

  percentageRecovered.appendChild(textPercentageRecoveredValue);
  document.getElementById('recoveredBar').appendChild(percentageRecovered);
}

const renderDeaths = (deaths) => {
  const deathsElement = document.createElement('h5');
  const textDeathsValue = document.createTextNode(`${(deaths).toLocaleString()}`);

  deathsElement.appendChild(textDeathsValue);
  document.getElementById('deathsBar').appendChild(deathsElement);
}

const renderPercentageDeaths = (deathsValue, confirmedValue) => {
  const percentageDeaths = document.createElement(`p`);
  const textPercentageDeathsValue = document.createTextNode(`${Math.round(deathsValue/confirmedValue * 100)}%`);
  
  percentageDeaths.appendChild(textPercentageDeathsValue);
  document.getElementById('deathsBar').appendChild(percentageDeaths);
}

const renderVisualReport = (listDate, labelConfirmed, labelRecovered, labelDeaths) => {
  let ctx = document.getElementById('canvas').getContext('2d');
  let canvas = new Chart(ctx, {
      type: 'line',
      data: {
          labels: listDate,
          datasets: [{
              label: 'Positif',
              data: labelConfirmed,
              backgroundColor: '#ff9800',
              borderColor: '#ff9800'
          },
          {
            label: 'Sembuh',
            data: labelRecovered,
            backgroundColor: 'rgb(5, 181, 132)',
            borderColor: 'rgb(5, 181, 132)'
          },
          {
            label: 'Meninggal',
            data: labelDeaths,
            backgroundColor: 'rgb(236, 49, 75)',
            borderColor: 'rgb(236, 49, 75)',
            borderWidth: 3,
            tension: .3
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

const showResponseMessage = (message = 'Cek koneksi internet kamu!') => {
  alert(message);
}

export default DataSource;