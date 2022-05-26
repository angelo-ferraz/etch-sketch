const gameArea = document.getElementById("gamearea");
const colorKnob = document.getElementById("colorknob");
const colorKnobRotate = document.getElementById("color");
const resetKnob = document.getElementById("resetdiv");
const sliderText = document.getElementById("slidertext");
const gridSlider = document.getElementById("gridsizeslider");

let gridRange = 18;
let toggle = 0;
let penColor = 'rgb(0,0,0)';

document.onload = createCells(gridRange);
document.onload = changeColor(penColor);

// Setting Grid Size 
function createCells (gridRange) {
    for (c=1; c <= gridRange*gridRange; c++){
        cell = document.createElement('div');
        cell.classList.add('cells');
        cell.style.border = "1px red groove";
        gameArea.appendChild(cell);
        toggle = 0;
    }
    adjustGrid();
}

function clearGrid(gridRange) {
    for (let g=1; g <= gridRange*gridRange; g++){
        const cells = document.querySelector('.cells')
        gameArea.removeChild(cells);
    }
}

function adjustGrid() {
    gameArea.style.gridTemplateRows = `repeat(${gridRange}, 1fr)`;
    gameArea.style.gridTemplateColumns = `repeat(${gridRange}, 1fr)`;}

// Slider functionality
gridSlider.addEventListener('input', function(e) {
    clearGrid(gridRange);
    gridRange = this.value;
    sliderText.innerText = `${gridRange}x${gridRange}`;
    console.log(gridRange);
    createCells(gridRange);
    adjustGrid();
    changeColor(penColor);

    // Knob animation
    let a = gridRange * 3;
    colorKnobRotate.style.transform = `rotate(${a}deg)`;
    resetKnob.style.transform = `rotate(-${a}deg)`;
    
});

// Coloring
colorKnob.addEventListener('input', e => {
    changeColor(colorKnob.value);
})

function changeColor(penColor) {
    const babydivs = document.querySelectorAll('.cells');
    babydivs.forEach(baby => {
        baby.addEventListener('mousedown', (e) => {
            e.target.style.background = penColor;
            });
        // Highlight cursor cell
        baby.addEventListener('mouseenter', (e) => {
            e.target.style.border = `1px solid black`;
            });
        baby.addEventListener('mouseout', (e) => {
            if (toggle === 0) {
                e.target.style.border = '1px red groove';}
            else {e.target.style.border = 'none';}
        });
        // Mobile Support
        baby.addEventListener('ontouchmove', (e) => {
            e.target.style.background = penColor;
            e.target.style.border = `1px solid black`;
        });
        baby.addEventListener('ontouchend', (e) => {
            if (toggle === 0) {
                e.target.style.border = '1px red groove';}
            else {e.target.style.border = 'none';}
        });
    });
}

// Reset Button
resetKnob.addEventListener('click', e => {
    babydiv = document.getElementsByClassName('cells');
    for (b = 0; b < babydiv.length; b++){babydiv[b].style.background = 'rgb(255,255,255)';}
}); 

// Hide grid lines when clicking 18x18 text
sliderText.addEventListener('mouseenter', e => {
    toggletext = document.getElementById('hideme');
    toggletext.innerText = '';
});

sliderText.addEventListener('click', e => {
    babydiv = document.getElementsByClassName('cells');
    switch (toggle) {
        case 0:
            for (b = 0; b < babydiv.length; b++){babydiv[b].style.border = 'none'; toggle = 1};
            console.log(toggle);
            break;
        case 1:
            for (b = 0; b < babydiv.length; b++){babydiv[b].style.border = '1px red groove'; toggle = 0};
            console.log(toggle);
            break;
    }
});

