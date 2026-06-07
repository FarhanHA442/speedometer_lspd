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

// 4. FUEL (Warna dinamis per 10%)
function setFuel(fuel) {
    let fuelPercent = Math.round(fuel * 100);
    elements.fuelBar.style.width = `${fuelPercent}%`;
    elements.fuelVal.innerText = `${fuelPercent}%`;

    // Mengubah warna bar berdasarkan persentase (setiap turun 10%)
    if (fuelPercent >= 90) {
        elements.fuelBar.style.background = '#00ff00'; // 90-100% (Hijau)
    } else if (fuelPercent >= 80) {
        elements.fuelBar.style.background = '#32cd32'; // 80-89% (Hijau Muda)
    } else if (fuelPercent >= 70) {
        elements.fuelBar.style.background = '#7fff00'; // 70-79% (Hijau Kekuningan)
    } else if (fuelPercent >= 60) {
        elements.fuelBar.style.background = '#adff2f'; // 60-69% (Kuning Kehijauan)
    } else if (fuelPercent >= 50) {
        elements.fuelBar.style.background = '#ffff00'; // 50-59% (Kuning)
    } else if (fuelPercent >= 40) {
        elements.fuelBar.style.background = '#ffd700'; // 40-49% (Emas)
    } else if (fuelPercent >= 30) {
        elements.fuelBar.style.background = '#ffa500'; // 30-39% (Oranye)
    } else if (fuelPercent >= 20) {
        elements.fuelBar.style.background = '#ff8c00'; // 20-29% (Oranye Tua)
    } else if (fuelPercent >= 10) {
        elements.fuelBar.style.background = '#ff4500'; // 10-19% (Merah Oranye)
    } else {
        elements.fuelBar.style.background = '#ff0000'; // 0-9% (Merah Kritis)
    }
}

// 5. HEALTH BAR
function setHealth(health) {
    let healthPercent = Math.round(health * 100);
    elements.healthBar.style.width = `${healthPercent}%`;
    elements.healthVal.innerText = `${healthPercent}%`;
    
    if(health > 0.6) {
        elements.healthBar.style.background = '#00ff00'; 
    } else if(health > 0.3) {
        elements.healthBar.style.background = '#ffff00'; 
    } else {
        elements.healthBar.style.background = '#ff0000'; 
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

// --- ANIMASI SAAT BARU MASUK KENDARAAN (GAUGE SWEEP) ---
function playStartupAnimation() {
    // Transisi diperlambat untuk animasi
    elements.needle.style.transition = 'transform 0.8s ease-in-out';
    elements.rpmBar.style.transition = 'width 0.8s ease-in-out';
    
    // Sweep jarum dan RPM ke full
    elements.needle.style.transform = `rotate(120deg)`; 
    elements.rpmBar.style.width = '100%';
    
    // Nyalakan semua lampu
    let allIcons = document.querySelectorAll('.icon');
    allIcons.forEach(icon => icon.classList.add('active'));
    elements.strobeL.classList.add('active');
    elements.strobeR.classList.add('active');

    // Kembalikan ke nol setelah 0.8 detik
    setTimeout(() => {
        elements.needle.style.transform = `rotate(-120deg)`; 
        elements.rpmBar.style.width = '0%';
        
        allIcons.forEach(icon => icon.classList.remove('active'));
        elements.strobeL.classList.remove('active');
        elements.strobeR.classList.remove('active');
        
        // Kembalikan transisi ke cepat (normal) setelah animasi selesai
        setTimeout(() => {
            elements.needle.style.transition = 'transform 0.1s linear';
            elements.rpmBar.style.transition = 'width 0.1s linear';
        }, 800);
    }, 800);
}

// DOM Binding
document.addEventListener('DOMContentLoaded', () => {
    elements = {
        needle: document.getElementById('needle'),
        digSpeed: document.getElementById('digital-speed'),
        speedUnit: document.getElementById('speed-unit'),
        gear: document.getElementById('gear'),
        
        fuelBar: document.getElementById('fuel-bar'),
        fuelVal: document.getElementById('fuel-val'),     
        healthBar: document.getElementById('health-bar'), 
        healthVal: document.getElementById('health-val'), 
        rpmBar: document.getElementById('rpm-bar'),       
        
        engine: document.getElementById('icon-engine'),   
        headlights: document.getElementById('icon-lights'),
        indL: document.getElementById('icon-ind-l'),
        indR: document.getElementById('icon-ind-r'),
        seatbelt: document.getElementById('icon-seatbelt'),
        lock: document.getElementById('icon-lock'),
        handbrake: document.getElementById('icon-handbrake'), 
        
        strobeL: document.getElementById('strobe-l'),
        strobeR: document.getElementById('strobe-r'),
        
        odometer: document.getElementById('odometer'),
    };

    // Jalankan animasi saat UI dimuat (saat masuk mobil)
    setTimeout(playStartupAnimation, 200);
});