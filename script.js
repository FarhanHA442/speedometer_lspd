let elements = {};
let speedMode = 1;
let indicators = 0;
let isEngineOn = false;

function setIconState(element, state) {
    if(state) element.classList.add('active');
    else element.classList.remove('active');
}

function setEngine(state) {
    isEngineOn = state;
    if (state) {
        elements.dial.classList.add('engine-on');
        elements.dial.classList.remove('engine-off');
    } else {
        elements.dial.classList.add('engine-off');
        elements.dial.classList.remove('engine-on');
    }
}

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

function setRPM(rpm) {
    elements.rpmBar.style.width = `${(rpm * 100)}%`;
}

function setFuel(fuel) {
    let fuelPercent = Math.round(fuel * 100);
    elements.fuelBar.style.width = `${fuelPercent}%`;
    elements.fuelVal.innerText = `${fuelPercent}%`;

    if (fuelPercent >= 90) { elements.fuelBar.style.background = '#00ff00'; } 
    else if (fuelPercent >= 80) { elements.fuelBar.style.background = '#32cd32'; } 
    else if (fuelPercent >= 70) { elements.fuelBar.style.background = '#7fff00'; } 
    else if (fuelPercent >= 60) { elements.fuelBar.style.background = '#adff2f'; } 
    else if (fuelPercent >= 50) { elements.fuelBar.style.background = '#ffff00'; } 
    else if (fuelPercent >= 40) { elements.fuelBar.style.background = '#ffd700'; } 
    else if (fuelPercent >= 30) { elements.fuelBar.style.background = '#ffa500'; } 
    else if (fuelPercent >= 20) { elements.fuelBar.style.background = '#ff8c00'; } 
    else if (fuelPercent >= 10) { elements.fuelBar.style.background = '#ff4500'; } 
    else { elements.fuelBar.style.background = '#ff0000'; }
}

function setHealth(health) {
    let healthPercent = Math.round(health * 100);
    elements.healthBar.style.width = `${healthPercent}%`;
    elements.healthVal.innerText = `${healthPercent}%`;
    
    if(health > 0.6) { elements.healthBar.style.background = '#00ff00'; } 
    else if(health > 0.3) { elements.healthBar.style.background = '#ffff00'; } 
    else { elements.healthBar.style.background = '#ff0000'; }
}

function setGear(gear) {
    let gearText = 'N';
    if (gear === 0) gearText = 'R';
    else if (gear > 0) gearText = gear;
    elements.gear.innerText = gearText;
}

function setHeadlights(state) {
    elements.headlights.classList.remove('active');
    if (state > 0) elements.headlights.classList.add('active');
}

function setLeftIndicator(state) {
    indicators = (indicators & 0b10) | (state ? 0b01 : 0b00);
    setIconState(elements.indL, state);
}
function setRightIndicator(state) {
    indicators = (indicators & 0b01) | (state ? 0b10 : 0b00);
    setIconState(elements.indR, state);
}

function setSeatbelts(state) {
    setIconState(elements.seatbelt, state);
}

function setSpeedMode(mode) {
    speedMode = mode;
}

function setOdometer(distance) {
    elements.odometer.innerText = distance.toFixed(1) + ' mi';
}

function playStartupAnimation() {
    elements.dial.classList.add('engine-on');
    elements.dial.classList.remove('engine-off');

    elements.needle.style.transition = 'transform 0.8s ease-in-out';
    elements.rpmBar.style.transition = 'width 0.8s ease-in-out';
    
    elements.needle.style.transform = `rotate(120deg)`; 
    elements.rpmBar.style.width = '100%';
    
    let allIcons = document.querySelectorAll('.icon');
    allIcons.forEach(icon => icon.classList.add('active'));

    setTimeout(() => {
        elements.needle.style.transform = `rotate(-120deg)`; 
        elements.rpmBar.style.width = '0%';
        
        allIcons.forEach(icon => icon.classList.remove('active'));
        
        setEngine(isEngineOn);
        
        setTimeout(() => {
            elements.needle.style.transition = 'transform 0.1s linear';
            elements.rpmBar.style.transition = 'width 0.1s linear';
        }, 800);
    }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    elements = {
        dial: document.querySelector('.speedo-dial'),
        needle: document.getElementById('needle'),
        digSpeed: document.getElementById('digital-speed'),
        speedUnit: document.getElementById('speed-unit'),
        gear: document.getElementById('gear'),
        
        fuelBar: document.getElementById('fuel-bar'),
        fuelVal: document.getElementById('fuel-val'),     
        healthBar: document.getElementById('health-bar'), 
        healthVal: document.getElementById('health-val'), 
        rpmBar: document.getElementById('rpm-bar'),       
        
        headlights: document.getElementById('icon-lights'),
        indL: document.getElementById('icon-ind-l'),
        indR: document.getElementById('icon-ind-r'),
        seatbelt: document.getElementById('icon-seatbelt'),
        
        odometer: document.getElementById('odometer'),
    };

    setTimeout(playStartupAnimation, 200);
});