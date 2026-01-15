const express = require('express');
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.post('/guardar-datos', (req, res) => {
    try {
        const datos = req.body;
        
        const ws = XLSX.utils.json_to_sheet([datos]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Mantenimiento");
        XLSX.writeFile(wb, "datos.xlsx");
        
        res.json({success: true, message: "Datos guardados correctamente"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
