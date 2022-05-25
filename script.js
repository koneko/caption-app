const app = new PIXI.Application()
let prepared = false
let barSize = 65; // px
let loadedImage = null
let topCaption = null
let botCaption = null
document.querySelector("div.canvas").appendChild(app.view);

let options = {
    fontFamily: 'Impact',
    fontSize: 40,
    fill: '#000000',
    stroke: "white",
    strokeThickness: 5,
    align: 'center',
    wordWrap: true,
    wordWrapWidth: app.renderer.width
}

function setWidth (width) {
    app.renderer.resize(width, app.renderer.height);
}
function setHeight (height) {
    app.renderer.resize(app.renderer.width, height);
}
function loadImage (url) {
    if (loadedImage == null) {
        // loads and draw image across whole screen
        let image = new PIXI.Sprite.from(url);
        app.stage.addChild(image);
        image.x = 0;
        image.y = 0;
        loadedImage = image
    } else {
        // replace image
        loadedImage.texture = PIXI.Texture.from(url);
    }

}
function setImageX (x) {
    app.stage.children[0].x = x;
}
function setImageY (y) {
    app.stage.children[0].y = y;
}

function imageToCanvas () {
    // measures and sets the image to the size of the canvas
    let image = app.stage.children[0];
    let width = app.renderer.width;
    let height = app.renderer.height;
    image.width = width;
    image.height = height;
}

function canvasToImage () {
    // measures and sets the canvas to the size of the image
    let image = app.stage.children[0];
    //get image height and width
    let width = image.width;
    let height = image.height;
    //set canvas width and height
    app.renderer.resize(width, height);
    //set image x and y
    image.x = 0;
    image.y = 0;
}

function readyImageForCaption () {
    if (prepared == true) return
    let parent = document.querySelector("div.controls");
    let image = app.stage.children[0];
    let canvas = app.renderer;
    let cHeight = canvas.height;
    cHeight += barSize;
    canvas.resize(canvas.width, cHeight);
    image.y += barSize;
    //add white space in the bar size
    let whiteSpace = new PIXI.Graphics();
    whiteSpace.beginFill(0xffffff);
    whiteSpace.drawRect(0, 0, canvas.width, barSize);
    app.stage.addChild(whiteSpace);
    prepared = true
    document.querySelector("div.canvas").style.backgroundColor = "gray";
}

function setTopCaptionText (text) {
    // if text already exists, remove it
    if (topCaption != null) {
        app.stage.removeChild(topCaption);
    }
    topCaption = new PIXI.Text(text, options);
    // set the position to the middle of the screen
    topCaption.x = (app.renderer.width - topCaption.width) / 2;
    topCaption.y = 0
    app.stage.addChild(topCaption);
}

function setBotCaptionText (text) {
    // if text already exists, remove it
    if (botCaption != null) {
        app.stage.removeChild(botCaption);
    }
    botCaption = new PIXI.Text(text, options);
    // set the position to the middle of the screen
    botCaption.x = (app.renderer.width - botCaption.width) / 2;
    botCaption.y = app.renderer.height - botCaption.height;
    app.stage.addChild(botCaption);
}

function addControls () {
    let parent = document.querySelector("div.controls");
    createResetBox(parent)
    createWidthBox(parent)
    createHeightBox(parent)
    createXBox(parent)
    createYBox(parent)
    createURLBox(parent)
    createCanvasControlsBox(parent)
    createCaptionPrepBox(parent)
    createTopCaptionTextBox(parent)
    createBotCaptionTextBox(parent)
}

function createWidthBox (parent) {
    let widthDiv = document.createElement("div");
    parent.appendChild(widthDiv)
    parent = widthDiv
    // add label
    let widthLabel = document.createElement("label");
    widthLabel.innerHTML = "Width: ";
    parent.appendChild(widthLabel);
    // add input
    let widthbox = document.createElement("input");
    widthbox.type = "number";
    widthbox.value = app.renderer.width;
    widthbox.onchange = function () {
        setWidth(this.value);
    }
    widthDiv.appendChild(widthbox);
}

function createHeightBox (parent) {
    let heightDiv = document.createElement("div");
    parent.appendChild(heightDiv)
    parent = heightDiv
    // add label
    let heightLabel = document.createElement("label");
    heightLabel.innerHTML = "Height: ";
    parent.appendChild(heightLabel);
    // add input
    let heightbox = document.createElement("input");
    heightbox.type = "number";
    heightbox.value = app.renderer.height;
    heightbox.onchange = function () {
        setHeight(this.value);
    }
    heightDiv.appendChild(heightbox);
}

function createURLBox (parent) {
    let urlDiv = document.createElement("div");
    parent.appendChild(urlDiv)
    parent = urlDiv
    // add label
    let urlLabel = document.createElement("label");
    urlLabel.innerHTML = "URL: ";
    parent.appendChild(urlLabel);
    // add input
    let urlbox = document.createElement("input");
    urlbox.type = "text";
    urlbox.value = "https://hub.koneko.link/cdn/icons/black.png";
    loadImage(urlbox.value);
    urlbox.onchange = function () {
        loadImage(this.value);
    }
    urlDiv.appendChild(urlbox);
}

function createXBox (parent) {
    let xDiv = document.createElement("div");
    parent.appendChild(xDiv)
    parent = xDiv
    // add label
    let xLabel = document.createElement("label");
    xLabel.innerHTML = "X: ";
    parent.appendChild(xLabel);
    // add input
    let xbox = document.createElement("input");
    xbox.type = "number";
    xbox.value = 0;
    xbox.onchange = function () {
        setImageX(this.value);
    }
    xDiv.appendChild(xbox);
}

// create ybox function
function createYBox (parent) {
    let yDiv = document.createElement("div");
    parent.appendChild(yDiv)
    parent = yDiv
    // add label
    let yLabel = document.createElement("label");
    yLabel.innerHTML = "Y: ";
    parent.appendChild(yLabel);
    // add input
    let ybox = document.createElement("input");
    ybox.type = "number";
    ybox.value = 0;
    ybox.onchange = function () {
        setImageY(this.value);
    }
    yDiv.appendChild(ybox);
}

function createCanvasControlsBox (parent) {
    // creates 2 buttons with text "Canvas to Image" and "Image to Canvas" and their respective functions
    let canvasControlsDiv = document.createElement("div");
    canvasControlsDiv.classList.add("canvasControls");
    let canvasToImageButton = document.createElement("button");
    canvasToImageButton.innerHTML = "Canvas to Image";
    canvasToImageButton.onclick = canvasToImage;
    canvasControlsDiv.appendChild(canvasToImageButton);
    let imageToCanvasButton = document.createElement("button");
    imageToCanvasButton.innerHTML = "Image to Canvas";
    imageToCanvasButton.onclick = imageToCanvas;
    canvasControlsDiv.appendChild(imageToCanvasButton);
    //append to parent
    parent.appendChild(canvasControlsDiv);
}

function createResetBox (parent) {
    let resetDiv = document.createElement("div");
    parent.appendChild(resetDiv)
    parent = resetDiv
    // add input
    let resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    //reload page on click
    resetButton.onclick = function () {
        location.reload();
    }
    resetDiv.appendChild(resetButton);
}

function createCaptionPrepBox (parent) {
    let captionPrepDiv = document.createElement("div");
    parent.appendChild(captionPrepDiv)
    parent = captionPrepDiv
    // add input
    let captionPrepButton = document.createElement("button");
    captionPrepButton.innerHTML = "White Caption Border";
    captionPrepButton.onclick = function () {
        readyImageForCaption()
        captionPrepDiv.remove()
    };
    captionPrepDiv.appendChild(captionPrepButton);
}

function createTopCaptionTextBox (parent) {
    let captionTextDiv = document.createElement("div");
    parent.appendChild(captionTextDiv)
    parent = captionTextDiv
    // add label
    let captionTextLabel = document.createElement("label");
    captionTextLabel.innerHTML = "Top Text: ";
    captionTextDiv.appendChild(captionTextLabel);
    // add input
    let captionTextbox = document.createElement("input");
    captionTextbox.type = "text";
    captionTextbox.value = "";
    captionTextbox.style.placeholder = "Enter text here";
    captionTextbox.onchange = function () {
        setTopCaptionText(this.value);
    }
    captionTextDiv.appendChild(captionTextbox);
}
function createBotCaptionTextBox (parent) {
    let captionTextDiv = document.createElement("div");
    parent.appendChild(captionTextDiv)
    parent = captionTextDiv
    // add label
    let captionTextLabel = document.createElement("label");
    captionTextLabel.innerHTML = "Bottom Text: ";
    captionTextDiv.appendChild(captionTextLabel);
    // add input
    let captionTextbox = document.createElement("input");
    captionTextbox.type = "text";
    captionTextbox.value = "";
    captionTextbox.style.placeholder = "Enter text here";
    captionTextbox.onchange = function () {
        setBotCaptionText(this.value);
    }
    captionTextDiv.appendChild(captionTextbox);
}

addControls()