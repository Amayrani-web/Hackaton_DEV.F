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
        });
    });
});

// Initialize displays
if (window.updateKilometros) {
    window.updateKilometros('Diaria');
}