const dataDiaria = { total: 10, resueltos: 7, pendientes: 3 };
const dataMensual = { total: 50, resueltos: 35, pendientes: 15 };
const dataAnual = { total: 200, resueltos: 140, pendientes: 60 };

const dataEntregasDiaria = { asignadas: 20, completadas: 15, pendientes: 5 };
const dataEntregasMensual = { asignadas: 100, completadas: 80, pendientes: 20 };
const dataEntregasAnual = { asignadas: 400, completadas: 350, pendientes: 50 };

const dataKilometrosDiaria = 150;
const dataKilometrosMensual = 4500;
const dataKilometrosAnual = 55000;

const dataConsumoDiaria = 8;
const dataConsumoMensual = 250;
const dataConsumoAnual = 3000;

const dataServiciosDiaria = 1;
const dataServiciosMensual = 12;
const dataServiciosAnual = 50;

let chart;
let chartEntregas;

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
            maintainAspectRatio: true,
            aspectRatio: 4,
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

    const ctxEntregas = document.getElementById('entregas-chart').getContext('2d');
    chartEntregas = new Chart(ctxEntregas, {
        type: 'doughnut',
        data: {
            labels: ['Asignadas', 'Completadas', 'Pendientes'],
            datasets: [{
                data: [dataEntregasDiaria.asignadas, dataEntregasDiaria.completadas, dataEntregasDiaria.pendientes],
                backgroundColor: ['#bfcf0a', '#8fe51e', '#ff6b6b'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1,
            backgroundColor: 'white',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: 'black'
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

window.updateEntregasChart = function(period) {
    let data;
    if (period === 'Diaria') data = dataEntregasDiaria;
    else if (period === 'Mensual') data = dataEntregasMensual;
    else data = dataEntregasAnual;
    chartEntregas.data.datasets[0].data = [data.asignadas, data.completadas, data.pendientes];
    chartEntregas.update();
};

window.updateKilometros = function(period) {
    let km;
    if (period === 'Diaria') km = dataKilometrosDiaria;
    else if (period === 'Mensual') km = dataKilometrosMensual;
    else km = dataKilometrosAnual;
    document.getElementById('kilometros-display').textContent = km + ' Km';
};

window.updateConsumo = function(period) {
    let consumo;
    if (period === 'Diaria') consumo = dataConsumoDiaria;
    else if (period === 'Mensual') consumo = dataConsumoMensual;
    else consumo = dataConsumoAnual;
    document.getElementById('consumo-display').textContent =  consumo + ' L';
};

window.updateServicios = function(period) {
    let servicios;
    if (period === 'Diaria') servicios = dataServiciosDiaria;
    else if (period === 'Mensual') servicios = dataServiciosMensual;
    else servicios = dataServiciosAnual;
    document.getElementById('servicios-display').textContent =  servicios;
};