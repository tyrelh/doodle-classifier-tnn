
const IMG_DIM = 28;
const IMG_SIZE = 784;
const NUM_TO_DISPLAY = 10;
const TRAINING_RATIO = 0.9;
const NUM_EPOCHS = 6;
const LEARNING_RATE = 0.14;

// options: 100, 1000, 10000, 100000
let NUM_DATA = 100; // training on 100,000 will take a long time.

let nn;
let rawData = [];
let preparedData = [];
let trainingData = [];
let testingData = [];

let nnJSON;

function preload() {
    // load data set binaries
    for (label of LABELS) {
        rawData.push(loadBytes('data/' + label + 's' + NUM_DATA + '.bin'));
    }

    // load pre-trained nn json
    var requestURL = 'nineitems.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        nnJSON = request.response;
    }
}

function setup() {
    let canvas = createCanvas(280, 280);
    canvas.parent('sketch');
    background(0);

    for (let i = 0; i < rawData.length; i++) {
        prepared_data.push(prepareData(rawData[i], i));
    }
    let numHiddenLayers = floor((IMG_SIZE + LABELS.length) / 2)
    nn = new NeuralNetwork(IMG_SIZE, numHiddenLayers, LABELS.length);
    nn.setLearningRate(LEARNING_RATE);

    sortData();

    let trainButton = select('#train');
    let epochCounter = 0;
    trainButton.mousePressed(function () {
        epochCounter++;
        trainEpoch(epochCounter);
    });

    let testButton = select('#test');
    testButton.mousePressed(function () {
        testRound(testingData);
    });

    let clearButton = select('#clear');
    clearButton.mousePressed(function() {
        background(0);
    });

    let guessButton = select('#guess');
    guessButton.mousePressed(function () {
        let inputs = [];
        let img = get();
        img.resize(28, 28);
        img.loadPixels();
        for (let i = 0; i < IMG_SIZE; i++) {
            let val = img.pixels[i * 4];
            inputs[i] = val / 255.0;
        }
        let guess = nn.predict(inputs)
        // find highest probability output (guess)
        let highestProb = max(guess);
        // check if quess was correct
        let classification = guess.indexOf(highestProb)
        console.log("Its a " + LABELS[classification] + "!");
    });

    let loadButton = select('#loadjsonnn');
    loadButton.mousePressed(function() {
        nn = NeuralNetwork.deserialize(nnJSON);
    });
}

// function buildUI() {

// }

function sortData() {
    for (datum of prepared_data) {
        trainingData = trainingData.concat(datum.training);
        testingData = testingData.concat(datum.testing)
    }
}

function prepareData(data, label) {
    training = [];
    testing = [];
    let ratio = NUM_DATA * TRAINING_RATIO;
    for (let i = 0; i < NUM_DATA; i++) {
        let offset = i * IMG_SIZE;
        if (i < ratio) {
            training[i] = data.bytes.subarray(offset, offset + IMG_SIZE);
            training[i].label = label;
        }
        else {
            testing[i - ratio] = data.bytes.subarray(offset, offset + IMG_SIZE);
            testing[i - ratio].label = label;
        }
    }
    let obj = {}
    obj.training = training;
    obj.testing = testing;
    return obj;
}
// TODO: count epoch
function trainEpoch(counter) {
    console.log("Training epoch " + counter + " on " + trainingData.length + " pieces of data...");
    // randomize order of training data
    shuffle(trainingData, true);
    // train on each piece of training data
    for (let i = 0; i < trainingData.length; i++) {
        // get current data
        let data = trainingData[i];
        // normalize input
        let inputs = Array.from(data).map(x => x / 255);
        // get current label / target output       
        let label = trainingData[i].label;
        let targets = [];
        for (let i = 0; i < LABELS.length; i++) {
            targets.push(0);
        }
        targets[label] = 1;
        // train on input with label
        nn.train(inputs, targets);
    }
    console.log("Done.");
}

// TODO: count testing round?
function testRound(testing) {
    console.log("Testing on " + testingData.length + " pieces of data...")
    let correct = 0;
    // test for one round of the testing data
    for (let i = 0; i < testing.length; i++) {
        // get current data
        let data = testing[i];
        let inputs = Array.from(data).map(x => x / 255);
        // get current label / target      
        let label = testing[i].label;
        // guess on current data
        let guess = nn.predict(inputs)
        // find highest probability output (guess)
        let m = max(guess);
        // check if quess was correct
        let classification = guess.indexOf(m)
        if (classification === label) {
            correct++;
        }
    }
    // calculate percent of correct guesses
    let percent_correct = correct / testing.length;
    console.log("Correct: " + nf(percent_correct * 100, 2, 2) + "%");
    return percent_correct;
}

function draw() {
    strokeWeight(8);
    stroke(255);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}










// function drawSomeCats() {
//     let total = NUM_TO_DISPLAY * NUM_TO_DISPLAY;
//     for (let n = 0; n < total; n++) {
//         let img = createImage(IMG_DIM, IMG_DIM);
//         img.loadPixels();
//         let offset = n * IMG_SIZE;
//         for (let i = 0; i < IMG_SIZE; i++) {
//             let val = cats.bytes[i + offset];
//             img.pixels[i * 4] = val;
//             img.pixels[i * 4 + 1] = val;
//             img.pixels[i * 4 + 2] = val;
//             img.pixels[i * 4 + 3] = 255;
//         }
//         img.updatePixels();
//         let x = (n % NUM_TO_DISPLAY) * 28;
//         let y = floor(n / NUM_TO_DISPLAY) * 28;
//         image(img, x, y);
//     }
// }