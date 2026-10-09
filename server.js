const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORTA = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

const CONFIG = path.join(__dirname, 'config.json');

if (!fs.existsSync(CONFIG)) {
  fs.writeFileSync(CONFIG, JSON.stringify({
    hs_alto: false,
    hs_pescoco: false,
    hs_peito: false,
    aim_pro: false,
    speed_run: false,
    high_jump: false,
    backjump: false,
    zigzag: false,
    bypass: false,
    hp_max: false,
    esp_radar: false
  }, null, 2));
}

app.get('/config.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(CONFIG);
});

app.post('/salvar', (req, res) => {
  fs.writeFileSync(CONFIG, JSON.stringify(req.body, null, 2));
  res.json({ ok: true });
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORTA, '0.0.0.0', () => console.log('✅ ARTHUR PROX ONLINE!'));
