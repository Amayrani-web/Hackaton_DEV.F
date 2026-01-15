const dataDiaria = { total: 10, resueltos: 7, pendientes: 3 };
const dataMensual = { total: 50, resueltos: 35, pendientes: 15 };
const dataAnual = { total: 200, resueltos: 140, pendientes: 60 };

let chart;

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('reportes-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total', 'Resueltos', 'Pendientes'],
            datasets: [{
                label: 'Reportes',
                data: [dataDiaria.total, dataDiaria.resueltos, dataDiaria.pendientes],
                backgroundColor: ['#bfcf0a', '#8fe51e', '#ff6b6b'],
            }]
        },
        options: {
            indexAxis: 'y', // horizontal
            responsive: true,
            maintainAspectRatio: false,
            backgroundColor: 'white',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: 'black'
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            }
        }
    });
});

window.updateChart = function(period) {
    let data;
    if (period === 'Diaria') data = dataDiaria;
    else if (period === 'Mensual') data = dataMensual;
    else data = dataAnual;
    chart.data.datasets[0].data = [data.total, data.resueltos, data.pendientes];
    chart.update();
};