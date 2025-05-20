const baseURL = 'http://localhost:3000/api';

async function fetchData(endpoint) {
  const res = await fetch(`${baseURL}/${endpoint}`);
  return res.json();
}

// Chart configurations
const chartConfigs = {
  line: {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          beginAtZero: true
        }
      }
    }
  },
  bar: {
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  },
  pie: {
    type: 'pie',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  },
  radar: {
    type: 'radar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        r: {
          beginAtZero: true
        }
      }
    }
  }
};

// Initialize charts
async function initializeCharts() {
  // Line Chart - Global Trends
  const trendData = await fetchData('global-trends');
  new Chart(document.getElementById('chartLine'), {
    ...chartConfigs.line,
    data: {
      labels: trendData.map(row => row.date),
      datasets: [
        {
          label: 'Confirmed',
          data: trendData.map(r => r.confirmed),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Deaths',
          data: trendData.map(r => r.deaths),
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        },
        {
          label: 'Recovered',
          data: trendData.map(r => r.recovered),
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }
      ]
    }
  });

  // Bar Chart - Top Countries
  const topCountries = await fetchData('top-countries');
  new Chart(document.getElementById('chartBar'), {
    ...chartConfigs.bar,
    data: {
      labels: topCountries.map(c => c.name),
      datasets: [{
        label: 'Confirmed Cases',
        data: topCountries.map(c => c.confirmed),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',   // Red
          'rgba(54, 162, 235, 0.8)',   // Blue
          'rgba(255, 206, 86, 0.8)',   // Yellow
          'rgba(75, 192, 192, 0.8)',   // Teal
          'rgba(153, 102, 255, 0.8)'   // Purple
        ]
      }]
    }
  });

  // Pie Chart - Regional Distribution
  const regions = await fetchData('region-distribution');
  new Chart(document.getElementById('chartPie'), {
    ...chartConfigs.pie,
    data: {
      labels: regions.map(r => r.region),
      datasets: [{
        data: regions.map(r => r.confirmed),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ]
      }]
    }
  });

  // Radar Chart - Recovery vs Death
  const recoveryDeath = await fetchData('recovery-vs-death');
  new Chart(document.getElementById('chartRadar'), {
    ...chartConfigs.radar,
    data: {
      labels: recoveryDeath.map(r => r.name),
      datasets: [
        {
          label: 'Recovered',
          data: recoveryDeath.map(r => r.recovered),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)'
        },
        {
          label: 'Deaths',
          data: recoveryDeath.map(r => r.deaths),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)'
        }
      ]
    }
  });
} 