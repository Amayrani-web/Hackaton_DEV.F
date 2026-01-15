document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const period = this.dataset.period;
            document.querySelector('.right-section h2').textContent = 'Tu actividad ' + period;
            if (window.updateChart) {
                window.updateChart(period);
            }
            if (window.updateEntregasChart) {
                window.updateEntregasChart(period);
            }
            if (window.updateKilometros) {
                window.updateKilometros(period);
            }
            if (window.updateConsumo) {
                window.updateConsumo(period);
            }
            if (window.updateServicios) {
                window.updateServicios(period);
            }
        });
    });
});

// Initialize displays
if (window.updateKilometros) {
    window.updateKilometros('Diaria');
}
if (window.updateConsumo) {
    window.updateConsumo('Diaria');
}
if (window.updateServicios) {
    window.updateServicios('Diaria');
}