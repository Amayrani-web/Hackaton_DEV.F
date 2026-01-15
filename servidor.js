const express = require('express');
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); 

const app = express();
app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// --- BASE DE CONOCIMIENTO EXPANDIDA (Basada en Formato Traxión 2026) ---
const baseConocimiento = {
    especificaciones: {
        "urea": "Nivel de DEF (Urea): Mantener >25% para evitar cristalización[cite: 17].",
        "dpf": "Saturación DPF (SPN 3251): Programar regeneración si llega al 60%[cite: 17].",
        "bateria": "Estado de Baterías (SPN 168): Si es <12.4V en reposo, cargar baterías[cite: 17].",
        "direccion": "Dirección: Máximo 30° de juego en volante (Norma NOM-068)[cite: 24].",
        "frenos": "Presión de Aire: Manómetro >90 PSI. No mover si la alarma sonora está activa[cite: 26].",
        "llantas": "Llantas: Dibujo > 3mm. Rotación cada 10,000 km recomendada[cite: 27].",
        "aceite": "Lubricación: No sobrepasar el nivel máximo para no dañar los sellos[cite: 21].",
        "anticongelante": "Enfriamiento: Revisar mangueras por grietas o fugas[cite: 21].",
        "bolsas": "Bolsas de Aire: Una unidad desnivelada daña la estructura[cite: 24].",
        "amortiguadores": "Amortiguadores: Un amortiguador fallido 'muerde' la llanta[cite: 24].",
        "clima": "Climatización: Limpiar filtros evita forzar el compresor[cite: 26].",
        "eje_dual": "Eje Dual: Retirar objetos entre llantas para evitar explosión[cite: 24]."
    },
    codigosFalla: {
        "spn 1761": "SPN 1761: Nivel de DEF (Urea) bajo. Mantener >25%[cite: 17].",
        "spn 3251": "SPN 3251: Saturación DPF. Programar regeneración al 60%[cite: 17].",
        "spn 102": "SPN 102: Presión de Boost (Turbo). Reportar silbidos extraños de inmediato[cite: 17].",
        "spn 168": "SPN 168: Voltaje de Baterías <12.4V. Cargar baterías[cite: 17].",
        "p0501": "P0501: Falla en Radar/Cámaras ADAS. Limpiar lentes de lodo o insectos[cite: 18]."
    },
    prioridades: {
        "azul": "AZUL (Informativo): Atender en próximo mantenimiento preventivo[cite: 43].",
        "amarillo": "AMARILLO (Advertencia): Programar ingreso a taller al finalizar turno[cite: 46].",
        "rojo": "ROJO (Urgente): Riesgo de daño mayor. No realizar viajes largos[cite: 46].",
        "negro": "NEGRO (Crítico): UNIDAD FUERA DE SERVICIO. Riesgo de accidente o multa federal[cite: 47]."
    },
    consejosPreventivos: {
        "turbo": "Hábito: Dejar 3 min de ralentí antes de apagar para proteger líneas de aceite[cite: 21].",
        "diesel": "Hábito: Asegura el tapón para evitar entrada de agua al tanque de diésel.",
        "bandas": "Hábito: Revisar tensión y desgaste para prevenir paros por rotura de banda de bomba.",
        "rines": "Hábito: Revisar calor excesivo en rines para detectar balatas pegadas tras la ruta.",
        "seguridad": "Emergencia: Martillos y salidas son obligatorios por normativa de transporte."
    }
};

app.post('/chat', (req, res) => {
    try {
        const { mensaje } = req.body;
        if (!mensaje) return res.status(400).json({ success: false });

        const msg = mensaje.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let respuesta = "";

        // 1. Detección de Códigos de Falla
        if (msg.includes("spn") || msg.includes("p0")) {
            const codigo = Object.keys(baseConocimiento.codigosFalla).find(c => msg.includes(c));
            respuesta = codigo ? baseConocimiento.codigosFalla[codigo] : "Código no identificado en el manual 2026. Reportar a taller para diagnóstico.";
        }
        // 2. Módulo Mecánico y Fluidos
        else if (msg.includes("aceite")) respuesta = baseConocimiento.especificaciones.aceite;
        else if (msg.includes("anticongelante") || msg.includes("fuga")) respuesta = baseConocimiento.especificaciones.anticongelante;
        else if (msg.includes("banda")) respuesta = baseConocimiento.consejosPreventivos.bandas;
        else if (msg.includes("diesel") || msg.includes("tapon")) respuesta = baseConocimiento.consejosPreventivos.diesel;
        
        // 3. Chasis y Suspensión
        else if (msg.includes("bolsa") || msg.includes("desnivel")) respuesta = baseConocimiento.especificaciones.bolsas;
        else if (msg.includes("amortiguador")) respuesta = baseConocimiento.especificaciones.amortiguadores;
        else if (msg.includes("piedra") || msg.includes("eje")) respuesta = baseConocimiento.especificaciones.eje_dual;
        
        // 4. Frenos y Confort
        else if (msg.includes("aire") || msg.includes("psi") || msg.includes("freno")) respuesta = baseConocimiento.especificaciones.frenos;
        else if (msg.includes("rin") || msg.includes("calor")) respuesta = baseConocimiento.consejosPreventivos.rines;
        else if (msg.includes("clima") || msg.includes("aire acondicionado")) respuesta = baseConocimiento.especificaciones.clima;
        
        // 5. Otros (Urea, Dirección, Llantas, Prioridades)
        else if (msg.includes("urea") || msg.includes("def")) respuesta = baseConocimiento.especificaciones.urea;
        else if (msg.includes("volante") || msg.includes("direccion")) respuesta = baseConocimiento.especificaciones.direccion;
        else if (msg.includes("llanta") || msg.includes("dibujo")) respuesta = baseConocimiento.especificaciones.llantas;
        else if (msg.includes("prioridad") || msg.includes("urgente") || msg.includes("color")) {
            const color = ["azul", "amarillo", "rojo", "negro"].find(col => msg.includes(col));
            respuesta = color ? baseConocimiento.prioridades[color] : "Niveles: Azul (Preventivo), Amarillo (Fin turno), Rojo (Urgente), Negro (Fuera de servicio) [cite: 42-47].";
        }
        else if (msg.includes("turbo") || msg.includes("ralenti")) respuesta = baseConocimiento.consejosPreventivos.turbo;
        else if (msg.includes("martillo") || msg.includes("emergencia")) respuesta = baseConocimiento.consejosPreventivos.seguridad;
        
        else {
            respuesta = "Soy tu Asistente Traxión. ¿Necesitas apoyo con algo? ¿Puedes consultarme y reportame cualquier incidente? ";
        }

        res.json({ success: true, respuesta: respuesta });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Ruta para guardar datos (sin cambios)
app.post('/guardar-datos', (req, res) => {
    try {
        const datos = req.body;
        const ws = XLSX.utils.json_to_sheet([datos]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inspeccion_Traxion");
        XLSX.writeFile(wb, "datos_inspeccion.xlsx");
        res.json({ success: true, message: "Inspección guardada correctamente." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Asistente Traxión 2026 (Full) listo en puerto ${PORT}`));