const gameArea = document.getElementById("gamearea");
const colorKnob = document.getElementById("colorknob");
const colorKnobRotate = document.getElementById("color");
const resetKnob = document.getElementById("resetdiv");
const sliderText = document.getElementById("slidertext");
const gridSlider = document.getElementById("gridsizeslider");

let gridRange = 18;
let penColor = "black";
document.onload = createCells(gridRange);
document.onload = changeColor(penColor);


// Setting Grid Size 
function createCells (gridRange) {
    for (c=1; c <= gridRange*gridRange; c++){
        cell = document.createElement('div');
        cell.classList.add('cells');
        gameArea.appendChild(cell);
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
    console.log(colorKnob.value);
    penColor = colorKnob.value;
    changeColor(penColor);
})

function changeColor(penColor) {
    const babydivs = document.querySelectorAll('#gamearea > div');
    babydivs.forEach(baby => {
        baby.addEventListener('click', e => {
            e.target.style.background = penColor;});
        baby.addEventListener('mouseenter', (e) => {
            e.target.style.opacity = 0.2;});
        baby.addEventListener('mouseleave', (e) => {
            e.target.style.opacity = 1;});
    });
}

// Reset Button
resetKnob.addEventListener('click', e => {
    babydiv = document.getElementsByClassName('cells');
    for (b = 0; b < babydiv.length; b++){babydiv[b].style.background = 'white';}
}); 

// Hide grid lines when clicking XxX
let toggle = 0
sliderText.addEventListener('mouseenter', e => {
    toggletext = document.getElementById('tickingbomb');
    toggletext.innerText = '';
});

sliderText.addEventListener('click', e => {
    babydiv = document.getElementsByClassName('cells');
    switch (toggle) {
        case 0:
            for (b = 0; b < babydiv.length; b++){babydiv[b].style.border = 'none'; toggle = 1};
            break;
        case 1:
            for (b = 0; b < babydiv.length; b++){babydiv[b].style.border = '1px red groove'; toggle = 0};
            break;
    }
});

