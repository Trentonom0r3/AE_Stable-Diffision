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
var mWidth = 512;
var mHeight = 512;
var panelWidth = 350;
var panelHeight = 467;
var inputFieldWidth = panelWidth - 10;
var labelColor = [255 / 255, 255 / 255, 255 / 255];


var myPanel = new Window("palette", "Title", undefined, {resizeable:true});
myPanel.preferredSize = [panelWidth, panelHeight];

// Create a tabbed panel
var tabbedPanel = myPanel.add("tabbedpanel"); // Move tabbedPanel to be a child of myPanel
tabbedPanel.orientation = "row";
tabbedPanel.preferredSize.width = 200; 

// Add first tab
var mainPanelTab = tabbedPanel.add("tab", undefined, "Main");
mainPanelTab.orientation = "column";
mainPanelTab.alignChildren = ["fill", "top"];
mainPanelTab.preferredSize = [200, panelHeight];


var promptLabel = mainPanelTab.add("statictext", undefined, "Prompt:");
promptLabel.graphics.foregroundColor = promptLabel.graphics.newPen(promptLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var promptInput = mainPanelTab.add("edittext", undefined, "", {multiline: true, scrolling: true, wantReturn: true});
promptInput.preferredSize.width = 345.3; 
promptInput.onChange = function () {
    console.log("promptInput value:", promptInput.text);
};

var negPromptLabel = mainPanelTab.add("statictext", undefined, "Negative Prompt:");
negPromptLabel.graphics.foregroundColor = negPromptLabel.graphics.newPen(negPromptLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);
var negPromptInput = mainPanelTab.add("edittext", undefined, "", {multiline: true, scrolling: true, wantReturn: true});
negPromptInput.preferredSize.width = 345.3; 

var samplingSizeGroup = mainPanelTab.add("group");
var samplingSizeLabel = samplingSizeGroup.add("statictext", undefined, "Sample:");
samplingSizeLabel.graphics.foregroundColor = samplingSizeLabel.graphics.newPen(samplingSizeLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var samplingSizeSlider = samplingSizeGroup.add("slider", undefined, 20, 1, 150);

var samplingSize = samplingSizeGroup.add("statictext", undefined, "20");

samplingSizeSlider.onChange = function () {
    samplingSize.text = Math.round(samplingSizeSlider.value);
};

var batchSizeGroup = mainPanelTab.add("group");
var batchSizeLabel = batchSizeGroup.add("statictext", undefined, "Batch Size:");
batchSizeLabel.graphics.foregroundColor = batchSizeLabel.graphics.newPen(batchSizeLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var batchSizeSlider = batchSizeGroup.add("slider", undefined, 1, 1, 100);

var batchSize = batchSizeGroup.add("statictext", undefined, "1");

batchSize.readonly = true;

batchSizeSlider.onChange = function () {
    batchSize.text = Math.round(batchSizeSlider.value);
};

var batchCountGroup = mainPanelTab.add("group");
var batchCountLabel = batchCountGroup.add("statictext", undefined, "Batch Count:");
batchCountLabel.graphics.foregroundColor = batchCountLabel.graphics.newPen(batchCountLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var batchCountSlider = batchCountGroup.add("slider", undefined, 1, 1, 10);

var batchCount = batchCountGroup.add("statictext", undefined, "1");

batchCount.readonly = true;

batchCountSlider.onChange = function () {
    batchCount.text = Math.round(batchCountSlider.value);
};

var cfgScaleGroup = mainPanelTab.add("group");
var cfgScaleLabel = cfgScaleGroup.add("statictext", undefined, "CFG Scale:");
cfgScaleLabel.graphics.foregroundColor = cfgScaleLabel.graphics.newPen(cfgScaleLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var cfgScaleSlider = cfgScaleGroup.add("slider", undefined, 10.0,0.0,30.0);

var cfgScale = cfgScaleGroup.add("statictext", undefined, "10.0");

cfgScale.readonly = true;
cfgScaleSlider.onChange = function () {
    cfgScale.text = (Math.round(cfgScaleSlider.value * 2) / 2).toFixed(1);
};
 
var denoisingStrengthGroup = mainPanelTab.add("group");
var denoisingStrengthLabel = denoisingStrengthGroup.add("statictext", undefined, "Denoising Strength:");

denoisingStrengthLabel.graphics.foregroundColor = denoisingStrengthLabel.graphics.newPen(denoisingStrengthLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var denoisingStrengthSlider = denoisingStrengthGroup.add("slider", undefined, 0.50, 0.00, 1.00);

var denoisingStrength = denoisingStrengthGroup.add("statictext", undefined, "0.50");


denoisingStrengthSlider.onChange = function () {
denoisingStrength.text = (denoisingStrengthSlider.value * 1).toFixed(2);
};

var checkBoxGroup = mainPanelTab.add("group");
checkBoxGroup.orientation = "row";

var enableBatchCheckbox = checkBoxGroup.add("checkbox", undefined, "Enable Batch?");


var restoreFacesCheckbox = checkBoxGroup.add("checkbox", undefined, "Restore Faces");

var seedLabel = checkBoxGroup.add("statictext", undefined, "Seed:");
seedLabel.graphics.foregroundColor = seedLabel.graphics.newPen(seedLabel.graphics.PenType.SOLID_COLOR, labelColor, 1);

var seedInput = checkBoxGroup.add("edittext", undefined, "-1");
seedInput.characters = 25;


var resetSeedButton = checkBoxGroup.add("button", undefined, "Reset");
resetSeedButton.onClick = function () {
    seedInput.text = "-1";
};


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
buttonGroup.alignment = ["left", "center"];

function roundToNearestStep(value, step) {
    return Math.round(value / step) * step;
}

// Add width slider and label
var widthGroup = buttonGroup.add("group");
widthGroup.orientation = "row";
var widthLabel = widthGroup.add("statictext");
widthLabel.text = "Width:";

var widthInput = widthGroup.add("edittext");
widthInput.text = "512";

var widthSlider = widthGroup.add("slider", undefined, 512, 0, 1280);


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

// Add height slider and label
var heightGroup = buttonGroup.add("group");
heightGroup.orientation = "row";
var heightLabel = heightGroup.add("statictext");
heightLabel.text = "Heighth:";

var heightInput = heightGroup.add("edittext");
heightInput.text = "512";

var heightSlider = heightGroup.add("slider", undefined, 512, 0, 1024);


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


// Add Get Mask button
var getMaskButton = buttonGroup.add("button", undefined, "Get Mask");


getMaskButton.onClick = function() {
    mWidth = parseInt(widthInput.text);
    mHeight = parseInt(heightInput.text);
    if (getMaskButton.text == "Get Mask") {
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
        existingComp.width = mWidth;
        existingComp.height = mHeight;
        existingComp.pixelAspect = 1;
        existingComp.resolutionFactor = [1,1];
        solidLayer.property("Position").setValue([mWidth/2, mHeight/2, 0]);
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
	  width: mWidth,
	  height: mHeight,
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
	command += ' "' + data.width + '"';
	command += ' "' + data.height + '"';
    system.callSystem(command);
};


var sendToImg2ImgButton = customButtonGroup.add("button", undefined, "Send to img2img");


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
	
    // Initialize data object and assign values
    var data = {
		process_type: enableBatchV,
        prompt: promptV,
        negative_prompt: negPromptV,
        seed: seedV,
        batch_size: batchSizeV,
        steps: samplingSizeV,
        cfg_scale: roundedCfgScaleV,
        restore_faces: restoreFaces,
        denoising_strength: roundedDenoisingStrengthV,
		width: mWidth,
	    height: mHeight	
    };

    if (enableControlnetCheckbox.value) {
        var lowVram = lowVramCheckbox.value ? true : false;
        var weightV = weightSlider.value;
        var processorResV = processorResSlider.value;
     
        data.weight = weightV;
        data.low_vram = lowVram;
        data.processor_res = processorResV;
    }

    // Call the Img2IMG.py script with the data as a system call
    var command = 'python "' + img2imgScriptFile.fsName + '"';
    command += ' "' + data.process_type + '"';
	command += ' "' + data.prompt + '"';
    command += ' "' + data.seed + '"';
    command += ' "' + data.batch_size + '"';
    command += ' "' + data.steps + '"';
    command += ' "' + data.cfg_scale + '"';
    command += ' "' + data.restore_faces + '"';
    command += ' "' + data.negative_prompt + '"';
    command += ' "' + data.denoising_strength + '"';
	command += ' "' + data.width + '"';
	command += ' "' + data.height + '"';
	
//add command line argument for controlnet_on = True/False
    if (enableControlnetCheckbox.value) {

		command += ' --controlnet_on ';
    }

		alert(command);

		system.callSystem(command);
};
//Depnding on checkbox clicked, will set resize mode checkbox value
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

// Add second tab
var secondPanelTab = tabbedPanel.add("tab", undefined, "Controlnet");
secondPanelTab.orientation = "column";
secondPanelTab.alignChildren = ["fill", "top"];
secondPanelTab.preferredSize = [panelWidth, panelHeight];

// Enable Controlnet and Low VRAM checkboxes
var checkboxesGroup = secondPanelTab.add("group");
checkboxesGroup.orientation = "row";
var enableControlnetCheckbox = checkboxesGroup.add("checkbox", undefined, "Enable Controlnet");
var lowVramCheckbox = checkboxesGroup.add("checkbox", undefined, "Low VRAM");

// Module and Model dropdowns
var moduleModelGroup = secondPanelTab.add("group");
moduleModelGroup.orientation = "row";
moduleModelGroup.alignChildren = ["left", "center"];
var moduleLabel = moduleModelGroup.add("statictext", undefined, "Module:");
var moduleDropdown = moduleModelGroup.add("dropdownlist", undefined, ["Module 1", "Module 2", "Module 3"]);
var modelLabel = moduleModelGroup.add("statictext", undefined, "Model:");
var modelDropdown = moduleModelGroup.add("dropdownlist", undefined, ["Model 1", "Model 2", "Model 3"]);

// Weight, Guidance Start, and Guidance End sliders
var weightGuidanceGroup = secondPanelTab.add("group");
weightGuidanceGroup.orientation = "column";
var weightLabel = weightGuidanceGroup.add("statictext", undefined, "Weight: 1");
weightLabel.alignment = ["left", "center"];
var weightSlider = weightGuidanceGroup.add("slider", undefined, 1, 0, 2);
weightSlider.alignment = ["fill", "center"];
var guidanceStartLabel = weightGuidanceGroup.add("statictext", undefined, "Guidance Start: 0");
guidanceStartLabel.alignment = ["left", "center"];
var guidanceStartSlider = weightGuidanceGroup.add("slider", undefined, 0, 0, 1);
guidanceStartSlider.alignment = ["fill", "center"];
var guidanceEndLabel = weightGuidanceGroup.add("statictext", undefined, "Guidance End: 1");
guidanceEndLabel.alignment = ["left", "center"];
var guidanceEndSlider = weightGuidanceGroup.add("slider", undefined, 1, 0, 1);
guidanceEndSlider.alignment = ["fill", "center"];

// Resize mode checkboxes
var resizeModeGroup = secondPanelTab.add("group");
resizeModeGroup.orientation = "column";
resizeModeGroup.alignChildren = ["left", "top"];
var resizeModeLabel = resizeModeGroup.add("statictext", undefined, "Resize Mode:");
var justResizeCheckbox = resizeModeGroup.add("checkbox", undefined, "Just Resize");
var innerFitCheckbox = resizeModeGroup.add("checkbox", undefined, "Scale to Fit (Inner Fit)");
var outerFitCheckbox = resizeModeGroup.add("checkbox", undefined, "Envelope (Outer Fit)");

// Processor Res slider
var processorResGroup = secondPanelTab.add("group");
processorResGroup.orientation = "column";
var processorResLabel = processorResGroup.add("statictext", undefined, "Processor Res:");
processorResLabel.alignment = ["left", "center"];
var processorResSlider = processorResGroup.add("slider", undefined, 64, 64, 2048);
processorResSlider.alignment = ["fill", "center"];

// Round slider values to nearest integer and update the labels
weightSlider.onChange = function () {
  weightSlider.value = Math.round(weightSlider.value);
  weightLabel.text = "Weight: " + weightSlider.value;
};
guidanceStartSlider.onChange = function () {
  guidanceStartSlider.value = Math.round(guidanceStartSlider.value);
  guidanceStartLabel.text = "Guidance Start: " + guidanceStartSlider.value;
};
guidanceEndSlider.onChange = function () {
  guidanceEndSlider.value = Math.round(guidanceEndSlider.value);
  guidanceEndLabel.text = "Guidance End: " + guidanceEndSlider.value;
};
processorResSlider.onChange = function () {
  processorResSlider.value = Math.round(processorResSlider.value);
  processorResLabel.text = "Processor Res: " + processorResSlider.value;
};

// Checkbox event listeners
enableControlnetCheckbox.onClick = function () {
};


// Resize mode event listeners
justResizeCheckbox.onClick = function () {
if (justResizeCheckbox.value) {
innerFitCheckbox.value = false;
outerFitCheckbox.value = false;
}
};
innerFitCheckbox.onClick = function () {
if (innerFitCheckbox.value) {
justResizeCheckbox.value = false;
outerFitCheckbox.value = false;
}
};
outerFitCheckbox.onClick = function () {
if (outerFitCheckbox.value) {
justResizeCheckbox.value = false;
innerFitCheckbox.value = false;
}
};

// Show the panel
myPanel.show();


