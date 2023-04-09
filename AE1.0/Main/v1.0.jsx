// Relative paths
var inputFolderPath = new Folder("..//Inputs");
var outputFolderPath = new Folder("..//Outputs");
var inpaintFolderPath = new Folder("..//Inpaint");
var scriptsFolder = new Folder("..//Scripts");
var serverFolder = new Folder("..//Server");

var txt2imgScriptFile = new File(scriptsFolder.parent.fullName + "//Server//Txt2IMG.py");
var img2imgScriptFile = new File(scriptsFolder.parent.fullName + "//Server//Img2Img.py");

var initialSolidLayerPosition;
var initialVideoLayerPosition;

var panelWidth = 300;
var panelHeight = 300;

var labelColor = [255 / 255, 255 / 255, 255 / 255];

var myPanel = new Window("palette", "Stable Diffusion", undefined, {resizeable: true});
myPanel.preferredSize = [panelWidth, panelHeight];

var mainGroup = myPanel.add("group");
mainGroup.orientation = "row";

var mainPanelTab = mainGroup.add("group");
mainPanelTab.orientation = "column";
mainPanelTab.alignChildren = ["fill", "top"];

var promptLabel = mainPanelTab.add("statictext", undefined, "Prompt:");
promptLabel.graphics.foregroundColor = promptLabel.graphics.newPen(promptLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var promptInput = mainPanelTab.add("edittext", undefined, "", {multiline: true, scrolling: true, wantReturn: true});
promptInput.size = [panelWidth - 30, (panelHeight - 20) * 0.2];
promptInput.onChange = function () {
    console.log("promptInput value:", promptInput.text);
};

var negPromptLabel = mainPanelTab.add("statictext", undefined, "Negative Prompt:");
negPromptLabel.graphics.foregroundColor = negPromptLabel.graphics.newPen(negPromptLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var negPromptInput = mainPanelTab.add("edittext", undefined, "", {multiline: true, scrolling: true, wantReturn: true});
negPromptInput.size = [panelWidth - 30, (panelHeight - 20) * 0.2];

var samplerMethodLabel = mainPanelTab.add("statictext", undefined, "Sampler Method:");
samplerMethodLabel.graphics.foregroundColor = samplerMethodLabel.graphics.newPen(samplerMethodLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
mainPanelTab.add("dropdownlist", undefined, ["Method 1", "Method 2", "Method 3"]).size = [panelWidth - 30, (panelHeight - 20) * 0.05];

var restoreFacesCheckbox = mainPanelTab.add("checkbox", undefined, "Restore Faces");

var samplingSizeLabel = mainPanelTab.add("statictext", undefined, "Sample:");
samplingSizeLabel.graphics.foregroundColor = samplingSizeLabel.graphics.newPen(samplingSizeLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var samplingSizeSlider = mainPanelTab.add("slider", undefined, 20, 1, 150);
samplingSizeSlider.size = [panelWidth - 30, (panelHeight - 20) * 0.05];
var samplingSize = mainPanelTab.add("statictext", undefined, "20");


samplingSizeSlider.onChange = function () {
    samplingSize.text = Math.round(samplingSizeSlider.value);
};


var batchSizeLabel = mainPanelTab.add("statictext", undefined, "Batch Size:");
batchSizeLabel.graphics.foregroundColor = batchSizeLabel.graphics.newPen(batchSizeLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var batchSizeSlider = mainPanelTab.add("slider", undefined, 1, 1, 100);
batchSizeSlider.size = [panelWidth - 30, (panelHeight - 20) * 0.05];
var batchSize = mainPanelTab.add("statictext", undefined, "1");
batchSize.size = [50, 20];
batchSize.readonly = true;


batchSizeSlider.onChange = function () {
    batchSize.text = Math.round(batchSizeSlider.value);
};


var batchCountLabel = mainPanelTab.add("statictext", undefined, "Batch Count:");
batchCountLabel.graphics.foregroundColor = batchCountLabel.graphics.newPen(batchCountLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var batchCountSlider = mainPanelTab.add("slider", undefined, 1, 1, 10);
batchCountSlider.size = [panelWidth - 30, (panelHeight - 20) * 0.05];
var batchCount = mainPanelTab.add("statictext", undefined, "1");
batchCount.size = [50, 20];
batchCount.readonly = true;

batchCountSlider.onChange = function () {
    batchCount.text = Math.round(batchCountSlider.value);
};

var cfgScaleLabel = mainPanelTab.add("statictext", undefined, "CFG Scale:");
cfgScaleLabel.graphics.foregroundColor = cfgScaleLabel.graphics.newPen(cfgScaleLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var cfgScaleSlider = mainPanelTab.add("slider", undefined, 10, 1, 30);
cfgScaleSlider.size = [panelWidth - 30, 20];
var cfgScale = mainPanelTab.add("statictext", undefined, "10");
cfgScale.size = [50, 20];
cfgScale.readonly = true;
cfgScaleSlider.onChange = function () {
    cfgScale.text = Math.round(cfgScaleSlider.value);
};

var denoisingStrengthLabel = mainPanelTab.add("statictext", undefined, "Denoising Strength:");
denoisingStrengthLabel.graphics.foregroundColor = denoisingStrengthLabel.graphics.newPen(denoisingStrengthLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var denoisingStrengthSlider = mainPanelTab.add("slider", undefined, 0.5, 0.0, 1);
denoisingStrengthSlider.size = [panelWidth - 30, 20];
var denoisingStrength = mainPanelTab.add("statictext", undefined, "0.0");
denoisingStrength.size = [50, 20];
denoisingStrength.readonly = true;
denoisingStrengthSlider.onChange = function () {
    denoisingStrength.text = (denoisingStrengthSlider.value * 1).toFixed(1);
};

var checkBoxGroup = mainPanelTab.add("group");
checkBoxGroup.orientation = "row";

var processModeLabel = checkBoxGroup.add("statictext", undefined, "Process Mode:");
processModeLabel.graphics.foregroundColor = processModeLabel.graphics.newPen(processModeLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var processModeDropDown = checkBoxGroup.add("dropdownlist", undefined, ["Single Process", "Batch Process"]);
processModeDropDown.selection = 0;

var seedLabel = checkBoxGroup.add("statictext", undefined, "Seed:");
seedLabel.graphics.foregroundColor = seedLabel.graphics.newPen(seedLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var seedInput = checkBoxGroup.add("edittext", undefined, "-1");
seedInput.characters = 15;

var resetSeedButton = checkBoxGroup.add("button", undefined, "Reset");
resetSeedButton.onClick = function () {
    seedInput.text = "-1";
};



function updatePanelSize() {
    var extraHeight = expandedPanel.visible ? expandedPanel.size[1] : 0;
    var contentHeight = mainPanelTab.children[0].size[1] + mainPanelTab.children[1].size[1] + mainPanelTab.children[2].size[1] + mainPanelTab.children[3].size[1] + mainPanelTab.children[4].size[1] + mainPanelTab.children[5].size[1] + buttonGroup.size[1] + 25 + extraHeight;
    myPanel.preferredSize = [contentWidth, contentHeight];
    myPanel.layout.resize();
}


function saveJSONToFile(jsonData, filePath) {
    var file = new File(filePath);
    file.encoding = "UTF-8";
    file.open("w");
    file.write(JSON.stringify(jsonData, null, 2));
    file.close();
}

var buttonGroup = mainPanelTab.add("group");
buttonGroup.orientation = "row";
buttonGroup.alignChildren = ["fill", "top"]; // Set the alignment of the children to fill the available space

var getMaskButton = buttonGroup.add("button", undefined, "Get Mask");
getMaskButton.size = [(panelWidth - 30) / 2, 25];

getMaskButton.onClick = function () {
    if (getMaskButton.text == "Get Mask") {
        app.beginUndoGroup('Export 512x512 Mask');
        // Get the existing comp
        var existingComp = app.project.activeItem;
        // Create 512x512 solid layer
        var solidLayer = existingComp.layers.addSolid([1, 1, 1], 'Mask', 512, 512, 1);
        solidLayer.position.setValue([960, 540]); // Adjust position as needed
        solidLayer.property("Opacity").expression = "100";
         // Set track matte for the clip layer
        var clipLayer = existingComp.layer(2);
        clipLayer.trackMatteType = TrackMatteType.ALPHA;
        app.endUndoGroup();
        getMaskButton.text = "Confirm?";
    } else if (getMaskButton.text == "Confirm?") {
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
        existingComp.width = 512;
        existingComp.height = 512;
        existingComp.pixelAspect = 1;
        existingComp.resolutionFactor = [1,1];
        solidLayer.property("Position").setValue([256, 256, 0]);
        app.endUndoGroup();
        
        getMaskButton.text = "Get Mask";
        exportPNGSequence(existingComp);
    }
};

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
// Add two new buttons below the 'generate' button
var customButtonGroup = mainPanelTab.add("group");
customButtonGroup.orientation = "row";
customButtonGroup.alignChildren = ["fill", "top"];

var scriptFile = new File($.fileName);
var scriptFolder = scriptFile.parent;
var projectFolder = scriptFolder.parent;

// Set the inpaint and output directories as relative paths
var inpaintDir = new Folder(projectFolder.fsName + '/Inpaint');
var outputDir = new Folder(projectFolder.fsName + '/Outputs');

function getMostRecentFolder(path) {
    var folder = new Folder(path);
    var folders = folder.getFiles(function (file) {
        return file instanceof Folder;
    });

    if (folders.length === 0) {
        return null;
    }

    folders.sort(function (a, b) {
        return b.modified - a.modified;
    });

    return folders[0];
}


var sendToTxt2ImgButton = customButtonGroup.add("button", undefined, "Send to txt2img");
sendToTxt2ImgButton.size = [(panelWidth - 30) / 2, 25];

sendToTxt2ImgButton.onClick = function () {
	var promptV = promptInput.text;
    var negPromptV = negPromptInput.text;
    var samplingSizeV = Math.round(samplingSizeSlider.value);
    var batchSizeV = Math.round(batchSizeSlider.value);
    var batchCountV = batchCountSlider.value;
	var cfgScaleV = cfgScaleSlider.value;
	var roundedCfgScaleV = Math.round(cfgScaleV * 2) / 2; // Round to the nearest 0.5
    var seedV = seedInput.text;
    var restoreFaces = restoreFacesCheckbox.value ? true : false;

    // Gather data
    var data = {
      prompt: promptV,
	  seed: seedInput.text,
	  batch_size: batchSizeV,
	  steps: samplingSizeV,
	  cfg_scale: roundedCfgScaleV,
	  restore_faces: restoreFaces,
	  negative_prompt: negPromptV,
	 };
	 
    // Call the Txt2IMG.py script with the data as a system call
    var command = 'python "' + txt2imgScriptFile.fsName + '"';
    data.prompt = promptInput.text;
    data.negative_prompt = negPromptInput.text;
    command += ' "' + data.prompt + '"';
    command += ' "' + data.seed + '"';
    command += ' "' + data.batch_size + '"';
    command += ' "' + data.steps + '"';
    command += ' "' + data.cfg_scale + '"';
    command += ' "' + (typeof data.restore_faces !== 'undefined' ? data.restore_faces : '') + '"';
    command += ' "' + data.negative_prompt + '"';

    system.callSystem(command);
};


var sendToImg2ImgButton = customButtonGroup.add("button", undefined, "Send to img2img");
sendToImg2ImgButton.size = [(panelWidth - 30) / 2, 25];

sendToImg2ImgButton.onClick = function () {
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

    // Initialize data object and assign values
    var data = {
        prompt: promptV,
        negative_prompt: negPromptV,
        seed: seedV,
        batch_size: batchSizeV,
        steps: samplingSizeV,
        cfg_scale: roundedCfgScaleV,
        restore_faces: restoreFaces,
        denoising_strength: roundedDenoisingStrengthV
    };

    // Call the Img2IMG.py script with the data as a system call
		var command = 'python "' + img2imgScriptFile.fsName + '"';
		command += ' "' + data.prompt + '"';
		command += ' "' + data.seed + '"';
		command += ' "' + data.batch_size + '"';
		command += ' "' + data.steps + '"';
		command += ' "' + data.cfg_scale + '"';
		command += ' "' + data.restore_faces + '"';
		command += ' "' + data.negative_prompt + '"';
		command += ' "' + data.denoising_strength + '"';

		alert(command);

		system.callSystem(command);
};

// Function to import the .png sequence from a selected file
function importPngSequence(file) {
    if (!file) {
        return;
    }

    var importOptions = new ImportOptions(file);
    importOptions.sequence = true;
    importOptions.forceAlphabetical = true;

    var importedSequence = app.project.importFile(importOptions);

    // 1. Place the imported sequence into the active composition as a new layer.
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem) {
        var sequenceLayer = activeComp.layers.add(importedSequence, activeComp.duration);

        // Find the video layer, assuming it's the second layer in the composition
        var videoLayer = activeComp.layer(3);

        // 2. Resize the composition to the size of the video layer.
        if (videoLayer) {
            activeComp.width = videoLayer.width;
            activeComp.height = videoLayer.height;
        }

        // 3. Align the Solid layer 
        var solidLayer = activeComp.layer(2);
        var xOffset = 0;
        var yOffset = 0;
        solidLayer.position.setValue([initialSolidLayerPosition[0] + xOffset, initialSolidLayerPosition[1] + yOffset]);

        // 4. Adjust the position of the newly imported sequence to the 'var initialSolidLayerPosition;' global variable.
        sequenceLayer.position.setValue(initialSolidLayerPosition);
    

    return importedSequence;
}
}

// Add a new group below the 'generate' button
var customButtonGroup = mainPanelTab.add("group");
customButtonGroup.orientation = "row";
customButtonGroup.alignChildren = ["fill", "top"];

// Add the 'Select and Import PNG Sequence' button to the customButtonGroup
var importButton = customButtonGroup.add("button", undefined, "Impose");
importButton.onClick = function () {
    var selectedFile = File.openDialog("Select the first .png file of the sequence", "PNG files: *.png", false);
    if (selectedFile) {
        app.beginUndoGroup("Import PNG Sequence");
        importPngSequence(selectedFile);
        app.endUndoGroup();
    }
};


// Create a button for clearing the AE disk cache and the render queue
var clearCacheButton = myPanel.add('button', undefined, 'Clear Cache and Render Queue');
clearCacheButton.onClick = function () {
    // Clear the render queue
    while (app.project.renderQueue.numItems > 0) {
        app.project.renderQueue.item(1).remove();
    }

};




var expandedPanel = mainPanelTab.add("panel", undefined, "");
expandedPanel.size = [panelWidth - 30, 100];
expandedPanel.visible = false;

myPanel.layout.layout(true); // Force the initial layout

myPanel.onResizing = myPanel.onResize = function () {
this.layout.resize();
};

// Force the initial layout
myPanel.layout.layout(true);

// Resize the panel if its content changes
myPanel.onResizing = myPanel.onResize = function () {
this.layout.resize();
};

// Show the panel
myPanel.show();


