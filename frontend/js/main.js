// Format numbers with commas
function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update summary cards
async function updateSummaryCards() {
  try {
    console.log('Fetching summary data...');
    const response = await fetch('http://localhost:3000/api/summary');
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const summary = await response.json();
    console.log('Received summary data:', summary);
    
    if (!summary || typeof summary !== 'object') {
      throw new Error('Invalid summary data received');
    }
    
    // Update each card with actual numbers
    const confirmedElement = document.getElementById('totalConfirmed');
    const deathsElement = document.getElementById('totalDeaths');
    const recoveredElement = document.getElementById('totalRecovered');
    const activeElement = document.getElementById('totalActive');
    
    // Set values with proper formatting
    confirmedElement.textContent = formatNumber(summary.confirmed);
    deathsElement.textContent = formatNumber(summary.deaths);
    recoveredElement.textContent = formatNumber(summary.recovered);
    activeElement.textContent = formatNumber(summary.active);
    
    // Update last updated time
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleString();
  } catch (error) {
    console.error('Error updating summary cards:', error);
    // Set default values instead of 'Error'
    document.getElementById('totalConfirmed').textContent = '0';
    document.getElementById('totalDeaths').textContent = '0';
    document.getElementById('totalRecovered').textContent = '0';
    document.getElementById('totalActive').textContent = '0';
  }
}

// Refresh data
async function refreshData() {
  try {
    await updateSummaryCards();
    await initializeCharts();
  } catch (error) {
    console.error('Error refreshing data:', error);
  }
}

// Auto refresh toggle
let autoRefreshInterval = null;

function toggleAutoRefresh() {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
    document.getElementById('autoRefresh').textContent = 'Auto Refresh';
  } else {
    autoRefreshInterval = setInterval(refreshData, 300000); // Refresh every 5 minutes
    document.getElementById('autoRefresh').textContent = 'Stop Auto Refresh';
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  console.log('Page loaded, initializing...');
  // Initial load
  refreshData();
  
  // Refresh button
  document.getElementById('refreshNow').addEventListener('click', refreshData);
  
  // Auto refresh toggle
  document.getElementById('autoRefresh').addEventListener('click', toggleAutoRefresh);
}); 