let elements = {};
let speedMode = 1;
let indicators = 0;

function setIconState(element, state) {
    if(state) element.classList.add('active');
    else element.classList.remove('active');
}

// 1. ENGINE
function setEngine(state) {
    setIconState(elements.engine, state);
}

// 2. SPEED
function setSpeed(speed) {
    let speedVal, unitText, maxSpeedVisual;
    switch(speedMode) {
        case 1: speedVal = Math.round(speed * 2.236936); unitText = 'MPH'; maxSpeedVisual = 140; break;
        case 2: speedVal = Math.round(speed * 1.943844); unitText = 'KTS'; maxSpeedVisual = 120; break;
        default: speedVal = Math.round(speed * 3.6); unitText = 'KMH'; maxSpeedVisual = 160;
    }
    elements.digSpeed.innerText = speedVal;
    elements.speedUnit.innerText = unitText;

    let speedPercentage = speedVal / maxSpeedVisual;
    if (speedPercentage > 1) speedPercentage = 1; 

    let needleAngle = (speedPercentage * 240) - 120;
    elements.needle.style.transform = `rotate(${needleAngle}deg)`;
}

// 3. RPM BAR
function setRPM(rpm) {
    elements.rpmBar.style.width = `${(rpm * 100)}%`;
}

// 4. FUEL
function setFuel(fuel) {
    // Memperbarui ukuran bar dan angka persentase di bawahnya
    let fuelPercent = Math.round(fuel * 100);
    elements.fuelBar.style.width = `${fuelPercent}%`;
    elements.fuelVal.innerText = `${fuelPercent}%`;
}

// 5. HEALTH BAR
function setHealth(health) {
    // Memperbarui ukuran bar dan angka persentase di bawahnya
    let healthPercent = Math.round(health * 100);
    elements.healthBar.style.width = `${healthPercent}%`;
    elements.healthVal.innerText = `${healthPercent}%`;
    
    // Warna otomatis berubah sesuai kondisi mobil
    if(health > 0.6) {
        elements.healthBar.style.background = '#00ff00'; // Hijau
    } else if(health > 0.3) {
        elements.healthBar.style.background = '#ffff00'; // Kuning
    } else {
        elements.healthBar.style.background = '#ff0000'; // Merah
    }
}

// 6. GEAR
function setGear(gear) {
    let gearText = 'N';
    if (gear === 0) gearText = 'R';
    else if (gear > 0) gearText = gear;
    elements.gear.innerText = gearText;
}

// 7. LIGHTS
function setHeadlights(state) {
    elements.headlights.classList.remove('active');
    if (state > 0) elements.headlights.classList.add('active');
}

// 8. INDICATORS
function setLeftIndicator(state) {
    indicators = (indicators & 0b10) | (state ? 0b01 : 0b00);
    setIconState(elements.indL, state);
}
function setRightIndicator(state) {
    indicators = (indicators & 0b01) | (state ? 0b10 : 0b00);
    setIconState(elements.indR, state);
}

// 9. SEATBELT
function setSeatbelts(state) {
    setIconState(elements.seatbelt, state);
}

// 10. SPEED MODE
function setSpeedMode(mode) {
    speedMode = mode;
}

// 11. ODOMETER
function setOdometer(distance) {
    elements.odometer.innerText = distance.toFixed(1) + ' mi';
}

// 12. VEHICLE LOCK
function setVehicleLock(state) {
    setIconState(elements.lock, state);
}

// 13. HANDBRAKE / REM TANGAN
function setHandbrake(state) {
    setIconState(elements.handbrake, state);
}

// 14. POLICE SIREN / STROBE
function setSiren(state) {
    if(state) {
        elements.strobeL.classList.add('active');
        elements.strobeR.classList.add('active');
    } else {
        elements.strobeL.classList.remove('active');
        elements.strobeR.classList.remove('active');
    }
}

// DOM Binding
document.addEventListener('DOMContentLoaded', () => {
    elements = {
        needle: document.getElementById('needle'),
        digSpeed: document.getElementById('digital-speed'),
        speedUnit: document.getElementById('speed-unit'),
        gear: document.getElementById('gear'),
        
        // Bar dan Text Value Bawah
        fuelBar: document.getElementById('fuel-bar'),
        fuelVal: document.getElementById('fuel-val'),     // Baru
        healthBar: document.getElementById('health-bar'), 
        healthVal: document.getElementById('health-val'), // Baru
        rpmBar: document.getElementById('rpm-bar'),       
        
        // Ikon
        engine: document.getElementById('icon-engine'),   
        headlights: document.getElementById('icon-lights'),
        indL: document.getElementById('icon-ind-l'),
        indR: document.getElementById('icon-ind-r'),
        seatbelt: document.getElementById('icon-seatbelt'),
        lock: document.getElementById('icon-lock'),
        handbrake: document.getElementById('icon-handbrake'), 
        
        // Strobo LSPD
        strobeL: document.getElementById('strobe-l'),
        strobeR: document.getElementById('strobe-r'),
        
        odometer: document.getElementById('odometer'),
    };
});