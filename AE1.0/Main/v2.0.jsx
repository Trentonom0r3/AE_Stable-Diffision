var panelGlobal = this;

var inputFolderPath = new Folder("..//Inputs");
var outputFolderPath = new Folder("..//Outputs");
var inpaintFolderPath = new Folder("..//Inpaint");
var scriptsFolder = new Folder("..//Scripts");
var serverFolder = new Folder("..//Server");


var pythonScriptPath = new File(scriptsFolder.parent.fullName + "//Server//serverMain.py");


var initialSolidLayerPosition;
var initialVideoLayerPosition;
var modelnameV;
var process_type;
var payload;
var mWidth = 512;
var mHeight = 512;

var scriptFile = new File($.fileName);
var scriptFolder = scriptFile.parent;
var projectFolder = scriptFolder.parent;
var files = [];
var currentIndex = -1;


#target "After Effects"

function sendRequest(request) {
    var connection = new Socket();
    var host = "127.0.0.1";
    var port = 5000;

    if (connection.open(host + ":" + port, "UTF-8")) {
        connection.write(JSON.stringify(request));
        var response = connection.read(999999);
        connection.close();
        return JSON.parse(response);
    } else {
        return {"error": "Unable to connect to server"};
    }
}

function sendRequestWithoutData(request_type) {
    var request = {
        "type": request_type
    };

    return sendRequest(request);
}

// Function to send request with payload
function sendRequestWithPayload(request_type, payload) {
     var request = {
      "type": request_type,
      "payload": payload,
      
  };

    return sendRequest(request);
}

function handleButtonClick(request_type) {
    var response = sendRequestWithoutData(request_type);

    if (response.error) {
        alert("Error: " + response.error);
    } else {
        alert("Response: " + JSON.stringify(response));
    }
}

function handleButton(request_type, payload) {
    var response = sendRequestWithPayload(request_type, payload);

    if (response.error) {
        alert("Error: " + response.error);
    } else {
        alert("Response: " + JSON.stringify(response));
    }
}


// PALETTE
// =======
var palette = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette", undefined, undefined, {resizeable: true}); 
  if ( !(panelGlobal instanceof Panel) ) palette.text = "AE Stable Diffusion"; 
  palette.preferredSize.width = 350; 
  palette.preferredSize.height = 467; 
  palette.orientation = "row"; 
  palette.alignChildren = ["center","top"]; 
  palette.spacing = 9; 
  palette.margins = 1; 

// TPANEL1
// =======
var tpanel1 = palette.add("tabbedpanel", undefined, undefined, {name: "tpanel1"}); 
  tpanel1.alignChildren = "fill"; 
  tpanel1.preferredSize.width = 362.362; 
  tpanel1.margins = 0; 

// TAB1
// ====
var tab1 = tpanel1.add("tab", undefined, undefined, {name: "tab1"}); 
  tab1.text = "Main"; 
  tab1.orientation = "column"; 
  tab1.alignChildren = ["center","top"]; 
  tab1.spacing = 10; 
  tab1.margins = 12; 

// GROUP1
// ======
var group1 = tab1.add("group", undefined, {name: "group1"}); 
  group1.orientation = "column"; 
  group1.alignChildren = ["left","center"]; 
  group1.spacing = 4; 
  group1.margins = 0; 

// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
  group2.orientation = "row"; 
  group2.alignChildren = ["center","center"]; 
  group2.spacing = 19; 
  group2.margins = 5; 

// GROUP3
// ======
var group3 = group2.add("group", undefined, {name: "group3"}); 
  group3.orientation = "column"; 
  group3.alignChildren = ["left","center"]; 
  group3.spacing = 10; 
  group3.margins = 0; 
  
function roundToNearestStep(value, step) {
    return Math.round(value / step) * step;
}
// GROUP4
// ======
var group4 = group3.add("group", undefined, {name: "group4"}); 
  group4.orientation = "row"; 
  group4.alignChildren = ["left","center"]; 
  group4.spacing = 10; 
  group4.margins = 0; 

var widthLabel = group4.add("statictext", undefined, undefined, {name: "widthLabel"}); 
  widthLabel.text = "Width:"; 
  widthLabel.preferredSize.height = 15; 

var widthInput = group4.add('edittext {properties: {name: "widthInput"}}'); 
  widthInput.text = "512"; 
  widthInput.preferredSize.width = 40; 

// GROUP3
// ======
var widthSlider = group3.add("slider", undefined, undefined, undefined, undefined, {name: "widthSlider"}); 
  widthSlider.minvalue = 8; 
  widthSlider.maxvalue = 1024; 
  widthSlider.value = 512; 
  widthSlider.preferredSize.width = 90; 


widthInput.onChange = function() {
    var inputValue = parseInt(this.text);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 1280) {
        inputValue = roundToNearestStep(inputValue, 8);
        widthSlider.value = inputValue;
        this.text = inputValue;
    } else {
        alert("Please enter a value between 0 and 1280.");
    }
};

widthSlider.onChanging = function() {
    widthInput.text = Math.round(this.value);
};

// GROUP5
// ======
var group5 = group2.add("group", undefined, {name: "group5"}); 
  group5.preferredSize.height = 40; 
  group5.orientation = "column"; 
  group5.alignChildren = ["left","center"]; 
  group5.spacing = 10; 
  group5.margins = 0; 

// GROUP6
// ======
var group6 = group5.add("group", undefined, {name: "group6"}); 
  group6.orientation = "row"; 
  group6.alignChildren = ["left","center"]; 
  group6.spacing = 10; 
  group6.margins = 0; 

var heightLabel = group6.add("statictext", undefined, undefined, {name: "heightLabel"}); 
  heightLabel.text = "Height:"; 
  heightLabel.preferredSize.height = 15; 

var heightInput = group6.add('edittext {properties: {name: "heightInput"}}'); 
  heightInput.text = "512"; 
  heightInput.preferredSize.width = 40; 

// GROUP5
// ======
var heightSlider = group5.add("slider", undefined, undefined, undefined, undefined, {name: "heightSlider"}); 
  heightSlider.minvalue = 8; 
  heightSlider.maxvalue = 1024; 
  heightSlider.value = 512; 
  heightSlider.preferredSize.width = 90; 

heightInput.onChange = function() {
    var inputValue = parseInt(this.text);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 1024) {
        inputValue = roundToNearestStep(inputValue, 8);
        heightSlider.value = inputValue;
        this.text = inputValue;
    } else {
        alert("Please enter a value between 0 and 1024.");
    }
};

heightSlider.onChanging = function() {
    heightInput.text = Math.round(this.value);
};

// GROUP7
// ======
var group7 = group2.add("group", undefined, {name: "group7"}); 
  group7.orientation = "column"; 
  group7.alignChildren = ["left","center"]; 
  group7.spacing = 3; 
  group7.margins = 3; 

var getMask = group7.add("button", undefined, undefined, {name: "getMask"}); 
  getMask.text = "Get Mask"; 
  getMask.preferredSize.width = 90; 

getMask.onClick = function() {
    mWidth = parseInt(widthInput.text);
    mHeight = parseInt(heightInput.text);
	        app.beginUndoGroup('Export 512x512 Mask');
        // Get the existing comp
        var existingComp = app.project.activeItem;
        
        var solidLayer = existingComp.layers.addSolid([1, 1, 1], 'Mask', mWidth, mHeight, 1);
        solidLayer.position.setValue([960, 540]); // Adjust position as needed
        solidLayer.property("Opacity").expression = "100";
         // Set track matte for the clip layer
        var clipLayer = existingComp.layer(2);
        clipLayer.trackMatteType = TrackMatteType.ALPHA;
        app.endUndoGroup();
};

var maskport = group7.add("button", undefined, undefined, {name: "maskport"}); 
  maskport.text = "Set Export"; 
  maskport.preferredSize.width = 90; 

	
maskport.onClick = function() {
	app.beginUndoGroup('Link and Center');
        // Get the existing comp
        var existingComp = app.project.activeItem;
        // Get the solid layer (assuming it's the first layer)
        var solidLayer = existingComp.layer(1);
        // Get the video layer (assuming it's the second layer)
        var videoLayer = existingComp.layer(2);
        // Get the position of the solid layer when "Confirm?" is clicked
        var solidLayerPosition = solidLayer.position.value;
        // Link video layer's position to solid layer's position
        var expression = "var solidLayerPosition = [" + solidLayerPosition[0] + ", " + solidLayerPosition[1] + "];\n";
        expression += "var offset = thisComp.layer('" + solidLayer.name + "').transform.position - solidLayerPosition;\n";
        expression += "value + offset;";
        videoLayer.property("Position").expression = expression;
        // Align the solid layer horizontally and vertically
        solidLayer.property("Position").setValue([existingComp.width/2, existingComp.height/2, 0]);
        var xOffset = solidLayerPosition[0] - existingComp.width/2;
        solidLayer.property("Position").setValue([solidLayerPosition[0] - xOffset, existingComp.height/2, 0]);
        app.endUndoGroup();
        
        // Change the size of the existing composition
        app.beginUndoGroup('Change Comp Size');
        existingComp.width = mWidth;
        existingComp.height = mHeight;
        existingComp.pixelAspect = 1;
        existingComp.resolutionFactor = [1,1];
        solidLayer.property("Position").setValue([mWidth/2, mHeight/2, 0]);
        app.endUndoGroup();      
        
        exportPNGSequence(existingComp);
    }


function exportPNGSequence() {
  // Get the active composition
  var comp = app.project.activeItem;
  if (comp !== null && (comp instanceof CompItem)) {
    // Define the video name and output paths
    var videoName = comp.name.split(".")[0]; // Assumes video file name has no dots other than extension
    var pluginFolderPath = $.fileName.split("/").slice(0, -2).join("/") + "/";
    var inputsPath = pluginFolderPath + 'Inputs';
    var inpaintPath = pluginFolderPath + 'Inpaint';
    // Create the output folders if they don't exist
    var inputsFolder = new Folder(inputsPath);
    if (!inputsFolder.exists) {
      inputsFolder.create();
    }
    var inpaintFolder = new Folder(inpaintPath);
    if (!inpaintFolder.exists) {
      inpaintFolder.create();
    }
    // Add a timestamp to the folder names
    var timestamp = new Date().getTime();
    var inputExportPath = inputsPath + "/input_" + timestamp;
    var inpaintExportPath = inpaintPath + "/inpaint_" + timestamp;

    var inputExportFolder = new Folder(inputExportPath);
    var inpaintExportFolder = new Folder(inpaintExportPath);
    if (!inputExportFolder.exists) {
      inputExportFolder.create();
    }
    if (!inpaintExportFolder.exists) {
      inpaintExportFolder.create();
    }
    // Set the render settings
    var renderQueue = app.project.renderQueue;
    var render1 = renderQueue.items.add(comp);
    var outputModule = render1.outputModule(1);
    outputModule.fileType = "PNG";
    outputModule.applyTemplate("SD"); // Updated output module
    // Set the output file name and folder for the input sequence
    var fileName = videoName + "_input_" + comp.workAreaStart.toFixed(3);
    var file = new File(inputExportPath + "/" + fileName);
    outputModule.file = file;
    render1.applyTemplate("SD1"); // Updated render settings without effects

    // Set the output file name and folder for the inpaint sequence
    var render2 = renderQueue.items.add(comp);
    outputModule = render2.outputModule(1);
    outputModule.fileType = "PNG";
    outputModule.includeSourceXMP = false;
    outputModule.applyTemplate("SD_Mask"); // Updated output module

    // Set the output file name and folder for the inpaint sequence
    fileName = videoName + "_inpaint_" + comp.workAreaStart.toFixed(3);
    file = new File(inpaintExportPath + "/" + fileName);
    outputModule.file = file;

    // Start the render and wait for it to finish
    renderQueue.render();
    while (render1.status != RenderStatus.DONE || render2.status != RenderStatus.DONE) {
        $.sleep(100);
    }

    // Show a message when rendering is complete
    alert("Render complete!");
  } else {
    alert("Please select a composition first.");
  }
};
  

// GROUP8
// ======
var group8 = tab1.add("group", undefined, {name: "group8"}); 
  group8.preferredSize.height = 26; 
  group8.orientation = "column"; 
  group8.alignChildren = ["left","center"]; 
  group8.spacing = 0; 
  group8.margins = 5; 

var statictext1 = group8.add("statictext", undefined, undefined, {name: "statictext1"}); 
  statictext1.text = "Model"; 
  statictext1.preferredSize.height = 15; 

// GROUP9
// ======
var group9 = group8.add("group", undefined, {name: "group9"}); 
group9.orientation = "row"; 
group9.alignChildren = ["left","center"]; 
group9.spacing = 10; 
group9.margins = 0; 

// Specify the path to the JSON file using the path variables
var jsonFilePath = new File(serverFolder.fsName + "/output_payload.json");

// Initialize the dropdown list with an empty array
var modelList_array = [];
var modelList = group9.add("dropdownlist", undefined, undefined, {name: "modelList", items: modelList_array}); 
modelList.preferredSize.width = 143; 
modelList.preferredSize.height = 23; 
modelList.alignment = ["left","center"]; 
// Add an event listener for the modelList dropdown
modelList.onChange = function() {
    if (modelList.selection) {
        modelnameV = modelList.selection.text;
    }
};

var modelrefresh = group9.add("button", undefined, undefined, {name: "modelrefresh"}); 
modelrefresh.text = "Refresh"; 

modelrefresh.onClick = function() {
    handleButtonClick("get_sd_models");

    var response = sendRequestWithoutData("get_sd_models");

    if (response.error) {
        alert("Error: " + response.error);
    } else {
        var payload = response;
        modelList.removeAll();
        modelList_array = payload.map(function(item) {
            return item.title;
        });

        for (var i = 0; i < modelList_array.length; i++) {
            modelList.add("item", modelList_array[i]);
        }
        
        // Set the first item as the default selected item
        if (modelList.items.length > 0) {
            modelList.selection = modelList.items[0];
        }
    }
}

var modelupdate = group9.add("button", undefined, undefined, {name: "modelupdate"}); 
modelupdate.text = "Update"; 

modelupdate.onClick = function() {
  // Get the selected model's title
  var modelT = modelList.selection.text;
  
  // Send the swap_model request with the selected model's title as the payload
  var payload = {
    "title": modelT,
  };

  alert('Sending request: ' + JSON.stringify(payload));
  
  handleButton("swap_model", payload);
};


var group10 = tab1.add("group", undefined, {name: "group10"}); 
  group10.preferredSize.height = 40; 
  group10.orientation = "column"; 
  group10.alignChildren = ["left","center"]; 
  group10.spacing = 0; 
  group10.margins = 2; 

var promptLabel = group10.add("statictext", undefined, undefined, {name: "promptLabel"}); 
  promptLabel.text = "Prompt"; 
  promptLabel.preferredSize.height = 15; 

var promptInput = group10.add('edittext {properties: {name: "promptInput", multiline: true}}'); 
  promptInput.preferredSize.width = 304; 
  promptInput.preferredSize.height = 38; 
  promptInput.alignment = ["center","center"]; 

// GROUP11
// =======
var group11 = tab1.add("group", undefined, {name: "group11"}); 
  group11.preferredSize.height = 42; 
  group11.orientation = "column"; 
  group11.alignChildren = ["left","center"]; 
  group11.spacing = 0; 
  group11.margins = 2; 

var negPromptLabel = group11.add("statictext", undefined, undefined, {name: "negPromptLabel"}); 
  negPromptLabel.text = "Negative Prompt:"; 
  negPromptLabel.preferredSize.height = 16; 

var negPromptInput = group11.add('edittext {properties: {name: "negPromptInput", multiline: true}}'); 
  negPromptInput.preferredSize.width = 304; 
  negPromptInput.preferredSize.height = 40; 

// GROUP12
// =======
var group12 = tab1.add("group", undefined, {name: "group12"}); 
  group12.preferredSize.width = 300; 
  group12.orientation = "row"; 
  group12.alignChildren = ["left","center"]; 
  group12.spacing = 30; 
  group12.margins = 5; 

// GROUP13
// =======
var group13 = group12.add("group", undefined, {name: "group13"}); 
  group13.orientation = "column"; 
  group13.alignChildren = ["left","center"]; 
  group13.spacing = 0; 
  group13.margins = 0; 

var samplingSizeLabel = group13.add("statictext", undefined, undefined, {name: "samplingSizeLabel"}); 
  samplingSizeLabel.text = "Sample Size"; 

var samplingSizeSlider = group13.add("slider", undefined, undefined, undefined, undefined, {name: "samplingSizeSlider"}); 
  samplingSizeSlider.minvalue = 1; 
  samplingSizeSlider.maxvalue = 100;  
  samplingSizeSlider.value = 20; 
  samplingSizeSlider.preferredSize.width = 80; 

var samplingSize = group13.add("statictext", undefined, undefined, {name: "samplingSize"}); 
  samplingSize.text = "20"; 

samplingSizeSlider.onChange = function () {
    samplingSize.text = Math.round(samplingSizeSlider.value);
};

// GROUP14
// =======
var group14 = group12.add("group", undefined, {name: "group14"}); 
  group14.orientation = "column"; 
  group14.alignChildren = ["left","center"]; 
  group14.spacing = 0; 
  group14.margins = 0; 

var batchSizeLabel = group14.add("statictext", undefined, undefined, {name: "batchSizeLabel"}); 
  batchSizeLabel.text = "Batch Size"; 

var batchSizeSlider = group14.add("slider", undefined, undefined, undefined, undefined, {name: "batchSizeSlider"}); 
  batchSizeSlider.minvalue = 1; 
  batchSizeSlider.maxvalue = 100; 
  batchSizeSlider.value = 1; 
  batchSizeSlider.preferredSize.width = 80; 

var batchSize = group14.add("statictext", undefined, undefined, {name: "batchSize"}); 
  batchSize.text = "1"; 

batchSizeSlider.onChange = function () {
    batchSize.text = Math.round(batchSizeSlider.value);
};

// GROUP15
// =======
var group15 = group12.add("group", undefined, {name: "group15"}); 
  group15.orientation = "column"; 
  group15.alignChildren = ["left","center"]; 
  group15.spacing = 0; 
  group15.margins = 0; 

var batchCountlabel = group15.add("statictext", undefined, undefined, {name: "batchCountlabel"}); 
  batchCountlabel.text = "Batch Count"; 

var batchCountSlider = group15.add("slider", undefined, undefined, undefined, undefined, {name: "batchCountSlider"}); 
  batchCountSlider.minvalue = 1; 
  batchCountSlider.maxvalue = 100;  
  batchCountSlider.value = 1; 
  batchCountSlider.preferredSize.width = 80; 

var batchCount = group15.add("statictext", undefined, undefined, {name: "batchCount"}); 
  batchCount.text = "1"; 

batchCountSlider.onChange = function () {
    batchCount.text = Math.round(batchCountSlider.value);
};

// GROUP16
// =======
var group16 = tab1.add("group", undefined, {name: "group16"}); 
  group16.orientation = "row"; 
  group16.alignChildren = ["left","center"]; 
  group16.spacing = 25; 
  group16.margins = 5; 

var seedLabel = group16.add("statictext", undefined, undefined, {name: "seedLabel"}); 
  seedLabel.text = "Seed:"; 

var seedInput = group16.add('edittext {properties: {name: "seedInput"}}'); 
  seedInput.text = "-1"; 
  seedInput.preferredSize.width = 132; 

var resetSeed = group16.add("button", undefined, undefined, {name: "resetSeed"}); 
  resetSeed.text = "Reset Seed"; 
  resetSeed.preferredSize.width = 90; 
  
resetSeed.onClick = function () {
    seedInput.text = "-1";
};

// GROUP17
// =======
var group17 = tab1.add("group", undefined, {name: "group17"}); 
  group17.orientation = "column"; 
  group17.alignChildren = ["left","center"]; 
  group17.spacing = 0; 
  group17.margins = 5; 

var cfgScaleLabel = group17.add("statictext", undefined, undefined, {name: "cfgScaleLabel"}); 
  cfgScaleLabel.text = "CFG Scale"; 

// GROUP18
// =======
var group18 = group17.add("group", undefined, {name: "group18"}); 
  group18.orientation = "row"; 
  group18.alignChildren = ["left","center"]; 
  group18.spacing = 10; 
  group18.margins = 0; 

var cfgScaleSlider = group18.add("slider", undefined, undefined, undefined, undefined, {name: "cfgScaleSlider"}); 
  cfgScaleSlider.minvalue = 0; 
  cfgScaleSlider.maxvalue = 30;
  cfgScaleSlider.value = 10;   
  cfgScaleSlider.preferredSize.width = 275; 

var cfgScale = group18.add('statictext {properties: {name: "cfgScale"}}'); 
  cfgScale.text = "10.0"; 

cfgScaleSlider.onChange = function () {
    cfgScale.text = (Math.round(cfgScaleSlider.value * 2) / 2).toFixed(1);
};

// GROUP17
// =======
var denoisingStrengthLabel = group17.add("statictext", undefined, undefined, {name: "denoisingStrengthLabel"}); 
  denoisingStrengthLabel.text = "Denoising Strength"; 

// GROUP19
// =======
var group19 = group17.add("group", undefined, {name: "group19"}); 
  group19.orientation = "row"; 
  group19.alignChildren = ["left","center"]; 
  group19.spacing = 10; 
  group19.margins = 0; 

var denoisingStrengthSlider = group19.add("slider", undefined, 0.50, 0.00, 1.00);  
  denoisingStrengthSlider.preferredSize.width = 275; 

var denoisingStrength = group19.add("statictext", undefined, "0.50");

denoisingStrengthSlider.onChange = function () {
denoisingStrength.text = (denoisingStrengthSlider.value * 1).toFixed(2);
};

// GROUP20
// =======
var group20 = tab1.add("group", undefined, {name: "group20"}); 
  group20.orientation = "row"; 
  group20.alignChildren = ["left","center"]; 
  group20.spacing = 10; 
  group20.margins = 0; 

var restoreFacesCheckbox = group20.add("checkbox", undefined, undefined, {name: "restoreFacesCheckbox"}); 
  restoreFacesCheckbox.text = "Restore Faces"; 

var divider1 = group20.add("panel", undefined, undefined, {name: "divider1"}); 
  divider1.alignment = "fill"; 

var enableBatchCheckbox = group20.add("checkbox", undefined, undefined, {name: "enableBatchCheckbox"}); 
  enableBatchCheckbox.text = "Enable Batch"; 

var divider2 = group20.add("panel", undefined, undefined, {name: "divider2"}); 
  divider2.alignment = "fill"; 

var enableControlnetCheckbox = group20.add("checkbox", undefined, undefined, {name: "enableControlnetCheckbox"}); 
  enableControlnetCheckbox.text = "Controlnet"; 

// GROUP21
// =======
var group21 = tab1.add("group", undefined, {name: "group21"}); 
  group21.orientation = "row"; 
  group21.alignChildren = ["center","center"]; 
  group21.spacing = 30; 
  group21.margins = 0; 

var sendToTxt2IMGButton = group21.add("button", undefined, undefined, {name: "sendToTxt2IMGButton"}); 
  sendToTxt2IMGButton.text = "TXT2IMG"; 
  sendToTxt2IMGButton.preferredSize.width = 80; 

sendToTxt2IMGButton.onClick = function () {
	var promptV = promptInput.text;
    var negPromptV = negPromptInput.text;
    var samplingSizeV = Math.round(samplingSizeSlider.value);
    var batchSizeV = Math.round(batchSizeSlider.value);
    var batchCountV = batchCountSlider.value;
	var cfgScaleV = cfgScaleSlider.value;
	var roundedCfgScaleV = Math.round(cfgScaleV * 2) / 2; // Round to the nearest 0.5
    var seedV = seedInput.text;
    var restoreFaces = restoreFacesCheckbox.value ? true : false;

    // Gather payload
     var payload = {
        prompt: promptV,
        negative_prompt: negPromptV,
        seed: seedV,
        batch_size: batchSizeV,
        steps: samplingSizeV,
        cfg_scale: roundedCfgScaleV,
        restore_faces: restoreFaces,
		width: mWidth,
	    height: mHeight,	
	}
  alert('Sending request: ' + JSON.stringify(payload));
  
  handleButton("txt2ImgHandle", payload);
};


var sendToImg2ImgButton = group21.add("button", undefined, undefined, {name: "sendToImg2ImgButton"}); 
  sendToImg2ImgButton.text = "IMG2IMG"; 
  sendToImg2ImgButton.preferredSize.width = 80; 

sendToImg2ImgButton.onClick = function () {
	var enableBatchV = enableBatchCheckbox.value ? true : false;
    var promptV = promptInput.text;
    var negPromptV = negPromptInput.text;
    var samplingSizeV = Math.round(samplingSizeSlider.value);
    var batchSizeV = Math.round(batchSizeSlider.value);
    var batchCountV = batchCountSlider.value;
    var cfgScaleV = cfgScaleSlider.value;
    var roundedCfgScaleV = Math.round(cfgScaleV * 2) / 2; // Round to the nearest 0.5
    var denoisingStrengthV = denoisingStrengthSlider.value;
    var roundedDenoisingStrengthV = Math.round(denoisingStrengthV * 100) / 100; // Round to the nearest 0.01
    var seedV = seedInput.text;
    var restoreFaces = restoreFacesCheckbox.value ? true : false;
	 // Mode 1,2,3,4,5 --- 0= img2img 1=img2img sketch 2=Inpaint 3=Inpaint sketch 4= inpaint upload mask 5=batch
 //only need 0,4,5 currently. 
 //INPAINTING_FILL 0=fill 1= original 2=latent noise 3= latent nothing
    // Initialize payload object and assign values
    var payload = {
		mode: 4,
        prompt: promptV,
        negative_prompt: negPromptV,
        seed: seedV,
        batch_size: batchSizeV,
        steps: samplingSizeV,
        cfg_scale: roundedCfgScaleV,
        restore_faces: restoreFaces,
        denoising_strength: roundedDenoisingStrengthV,
		width: mWidth,
	    height: mHeight,	
		inpainting_fill: 1,
		process_type: enableBatchV,
	}
	
 
  alert('Sending request: ' + JSON.stringify(payload));
  
  handleButton("img2img_handle", payload);
};


var importButton = group21.add("button", undefined, undefined, {name: "importButton"}); 
importButton.text = "Impose"; 
importButton.preferredSize.width = 80; 
importButton.onClick = function () {
    app.beginUndoGroup("Import PNG Sequence");
    importPngSequence();
    app.endUndoGroup();
};

// TAB2
// ====
var tab2 = tpanel1.add("tab", undefined, undefined, {name: "tab2"});
tab2.text = "Review";
tab2.orientation = "column";
tab2.alignChildren = ["center", "top"];
tab2.spacing = 8;
tab2.margins = 12;

// GROUP22
// =======
var group22 = tab2.add("group", undefined, {name: "group22"});
group22.orientation = "column";
group22.alignChildren = ["center", "center"];
group22.spacing = 8;
group22.margins = 12;

// SCROLL PANEL
// ============
var scrollPanel = group22.add("panel", undefined, undefined, {name: "scrollPanel"});
scrollPanel.size = [256, 256];
scrollPanel.alignChildren = ["center", "center"];
scrollPanel.margins = 0;

// IMAGE BUTTON
var imageButton = scrollPanel.add("iconbutton", undefined, undefined, {name: "imageButton"});
imageButton.helpTip = "Click to view the full-size image";
imageButton.size = [256, 256];
imageButton.alignment = ["center", "center"];

// ARROW BUTTONS
var arrowGroup = scrollPanel.add("group", undefined);
arrowGroup.alignment = ["center", "bottom"];

var arrowLeft = arrowGroup.add("button", undefined, "◄");
arrowLeft.size = [20, 20];

var arrowRight = arrowGroup.add("button", undefined, "►");
arrowRight.size = [20, 20];

// UPDATE BUTTON
var updateButton = group22.add("button", undefined, "Update", {name: "updateButton"});

// SET MARGINS AND SPACING
group22.margins.top = 20;
group22.spacing = 10;


function loadImage(file) {
  var image = ScriptUI.newImage(file);
  var width = image.width / 4;
  var height = image.height / 4;
  if (width > 256 || height > 256) {
    var ratio = Math.min(256 / width, 256 / height);
    width *= ratio;
    height *= ratio;
    image.resize(width, height);
    imageButton.image = ScriptUI.newImage(file);
  } else {
    imageButton.image = image;
  }
}

arrowLeft.onClick = function() {
  if (currentIndex > 0) {
    currentIndex--;
    loadImage(files[currentIndex]);
  }
}

arrowRight.onClick = function() {
  if (currentIndex < files.length - 1) {
    currentIndex++;
    loadImage(files[currentIndex]);
  }
}

updateButton.onClick = function() {
  updateFiles();
}


// SET FOCUS TO SCROLL PANEL
// =========================
scrollPanel.active = true;




// ADD EVENT LISTENERS
// ===================
imageButton.addEventListener("click", function() {
  var fullSizeImageWindow = new Window("dialog", "Full Size Image");
  fullSizeImageWindow.margins = [0, 0, 0, 0];
  fullSizeImageWindow.alignChildren = ["center", "center"];
  var fullSizeImage = fullSizeImageWindow.add("image", undefined, undefined, {name: "fullSizeImage"});
  fullSizeImage.image = ScriptUI.newImage(imagePath);
  fullSizeImageWindow.show();
});

// SET FOCUS TO SCROLL PANEL
// =========================
scrollPanel.active = true;


// TAB3
// ====
var tab3 = tpanel1.add("tab", undefined, undefined, {name: "tab3"}); 
  tab3.text = "Extras"; 
  tab3.orientation = "column"; 
  tab3.alignChildren = ["center","top"]; 
  tab3.spacing = 10; 
  tab3.margins = 12; 

// TAB4
// ====
var tab4 = tpanel1.add("tab", undefined, undefined, {name: "tab4"}); 
  tab4.text = "Options"; 
  tab4.orientation = "column"; 
  tab4.alignChildren = ["center","top"]; 
  tab4.spacing = 10; 
  tab4.margins = 12; 

// TPANEL1
// =======
tpanel1.selection = tab4; 

// GROUP34
// =======
var group34 = tab4.add("group", undefined, {name: "group34"}); 
  group34.orientation = "row"; 
  group34.alignChildren = ["left","center"]; 
  group34.spacing = 10; 
  group34.margins = 0; 

var StartServer = group34.add("button", undefined, undefined, {name: "StartServer"}); 
  StartServer.text = "Start Server"; 
 
StartServer.onClick = function() {
    pythonScriptPath.execute();
};


// TPANEL1
// =======
tpanel1.selection = tab1; 

palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () { this.layout.resize(); }

if ( palette instanceof Window ) palette.show();
