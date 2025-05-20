const baseURL = 'http://localhost:3000/api';

async function fetchData(endpoint) {
  const res = await fetch(`${baseURL}/${endpoint}`);
  return res.json();
}

async function drawCharts() {
  // Line Chart
  const trendData = await fetchData('global-trends');
  new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
      labels: trendData.map(row => row.date),
      datasets: [
        {
          label: 'Confirmed',
          data: trendData.map(r => r.confirmed),
          borderColor: 'orange'
        },
        {
          label: 'Deaths',
          data: trendData.map(r => r.deaths),
          borderColor: 'red'
        },
        {
          label: 'Recovered',
          data: trendData.map(r => r.recovered),
          borderColor: 'green'
        }
      ]
    }
  });

  // Bar Chart
  const topCountries = await fetchData('top-countries');
  new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
      labels: topCountries.map(c => c.name),
      datasets: [{
        label: 'Confirmed Cases',
        data: topCountries.map(c => c.confirmed),
        backgroundColor: 'blue'
      }]
    }
  });

  // Pie Chart
  const regions = await fetchData('region-distribution');
  new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: {
      labels: regions.map(r => r.region),
      datasets: [{
        data: regions.map(r => r.confirmed),
        backgroundColor: ['red', 'green', 'blue', 'orange', 'purple']
      }]
    }
  });

  // Radar Chart
  const recoveryDeath = await fetchData('recovery-vs-death');
  new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
      labels: recoveryDeath.map(r => r.name),
      datasets: [
        {
          label: 'Recovered',
          data: recoveryDeath.map(r => r.recovered),
          backgroundColor: 'rgba(0, 255, 0, 0.2)',
          borderColor: 'green'
        },
        {
          label: 'Deaths',
          data: recoveryDeath.map(r => r.deaths),
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          borderColor: 'red'
        }
      ]
    }
  });
}

drawCharts();
