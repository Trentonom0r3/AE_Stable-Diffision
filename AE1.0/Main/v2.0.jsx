var panelGlobal = this;

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":true},"text":"AE Stable Diffusion","preferredSize":[350,467],"margins":1,"orientation":"row","spacing":9,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"TabbedPanel","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,480],"margins":12,"alignment":null,"selection":2}},"item-2":{"id":2,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":null,"text":"Main","orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-3":{"id":3,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":null,"text":"Review","orientation":"column","spacing":8,"alignChildren":["center","top"]}},"item-7":{"id":7,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":null,"text":"Extras","orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-8":{"id":8,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":null,"text":"Options","orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-9":{"id":9,"type":"EditText","parentId":10,"style":{"enabled":true,"varName":"promptInput","creationProps":{"noecho":false,"readonly":false,"multiline":true,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[304,38],"alignment":"center","helpTip":""}},"item-10":{"id":10,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,40],"margins":2,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-11":{"id":11,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":"promptLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Prompt","justify":"left","preferredSize":[0,15],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"Group","parentId":2,"style":{"enabled":true,"varName":"","preferredSize":[0,42],"margins":2,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-13":{"id":13,"type":"StaticText","parentId":12,"style":{"enabled":true,"varName":"negPromptLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Negative Prompt:","justify":"left","preferredSize":[0,16],"alignment":null,"helpTip":null}},"item-14":{"id":14,"type":"EditText","parentId":12,"style":{"enabled":true,"varName":"negPromptInput","creationProps":{"noecho":false,"readonly":false,"multiline":true,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"","justify":"left","preferredSize":[304,40],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,26],"margins":5,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-16":{"id":16,"type":"DropDownList","parentId":18,"style":{"enabled":true,"varName":"modelList","text":"DropDownList","listItems":"Item 1, -, Item 2","preferredSize":[143,23],"alignment":"center","selection":0,"helpTip":null}},"item-17":{"id":17,"type":"StaticText","parentId":15,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Model","justify":"left","preferredSize":[0,15],"alignment":null,"helpTip":null}},"item-18":{"id":18,"type":"Group","parentId":15,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-19":{"id":19,"type":"Button","parentId":18,"style":{"enabled":true,"varName":"modelrefresh","text":"Refresh","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"Button","parentId":18,"style":{"enabled":true,"varName":"modelupdate","text":"Update","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-26":{"id":26,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":4,"alignChildren":["left","center"],"alignment":null}},"item-27":{"id":27,"type":"Group","parentId":26,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":5,"orientation":"row","spacing":19,"alignChildren":["center","center"],"alignment":null}},"item-29":{"id":29,"type":"StaticText","parentId":75,"style":{"enabled":true,"varName":"widthLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Width:","justify":"left","preferredSize":[0,15],"alignment":null,"helpTip":null}},"item-30":{"id":30,"type":"StaticText","parentId":76,"style":{"enabled":true,"varName":"heightLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Height:","justify":"left","preferredSize":[0,19],"alignment":null,"helpTip":null}},"item-31":{"id":31,"type":"Group","parentId":27,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":3,"alignChildren":["left","center"],"alignment":null}},"item-32":{"id":32,"type":"Slider","parentId":31,"style":{"enabled":true,"varName":"widthSlider","preferredSize":[90,25],"alignment":null,"helpTip":null}},"item-33":{"id":33,"type":"Group","parentId":27,"style":{"enabled":true,"varName":null,"preferredSize":[0,40],"margins":0,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-34":{"id":34,"type":"Slider","parentId":33,"style":{"enabled":true,"varName":"heightSlider","preferredSize":[90,0],"alignment":null,"helpTip":null}},"item-35":{"id":35,"type":"Button","parentId":36,"style":{"enabled":true,"varName":"getMask","text":"Get Mask","justify":"center","preferredSize":[90,0],"alignment":null,"helpTip":null}},"item-36":{"id":36,"type":"Group","parentId":27,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":3,"alignChildren":["left","center"],"alignment":null}},"item-37":{"id":37,"type":"Button","parentId":36,"style":{"enabled":true,"varName":"Export","text":"Set Export","justify":"center","preferredSize":[90,0],"alignment":null,"helpTip":null}},"item-38":{"id":38,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":5,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-39":{"id":39,"type":"StaticText","parentId":38,"style":{"enabled":true,"varName":"cfgScaleLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"CFG Scale","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-40":{"id":40,"type":"Slider","parentId":81,"style":{"enabled":true,"varName":"cfgScaleSlider","preferredSize":[275,0],"alignment":null,"helpTip":null}},"item-41":{"id":41,"type":"StaticText","parentId":38,"style":{"enabled":true,"varName":"denoisingStrengthLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Denoising Strength","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-42":{"id":42,"type":"Slider","parentId":82,"style":{"enabled":true,"varName":"denoisingStrengthSlider","preferredSize":[275,0],"alignment":null,"helpTip":null}},"item-43":{"id":43,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[300,0],"margins":5,"orientation":"row","spacing":30,"alignChildren":["left","center"],"alignment":null}},"item-44":{"id":44,"type":"Group","parentId":43,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-45":{"id":45,"type":"Group","parentId":43,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-46":{"id":46,"type":"Group","parentId":43,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-47":{"id":47,"type":"StaticText","parentId":44,"style":{"enabled":true,"varName":"samplingSizeLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Sample Size","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-48":{"id":48,"type":"Slider","parentId":44,"style":{"enabled":true,"varName":"samplingSizeSlider","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-49":{"id":49,"type":"StaticText","parentId":46,"style":{"enabled":true,"varName":"batchSizeLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Batch Size","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-50":{"id":50,"type":"Slider","parentId":46,"style":{"enabled":true,"varName":"batchSizeSlider","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-51":{"id":51,"type":"StaticText","parentId":45,"style":{"enabled":true,"varName":"batchCountlabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Batch Count","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-52":{"id":52,"type":"Slider","parentId":45,"style":{"enabled":true,"varName":"batchCountSlider","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-53":{"id":53,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-54":{"id":54,"type":"Checkbox","parentId":53,"style":{"enabled":true,"varName":"restoreFacesCheckbox","text":"Restore Faces","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-55":{"id":55,"type":"Checkbox","parentId":53,"style":{"enabled":true,"varName":"enableBatchCheckbox","text":"Enable Batch","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-56":{"id":56,"type":"Checkbox","parentId":53,"style":{"enabled":true,"varName":"enableControlnetCheckbox","text":"Controlnet","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-57":{"id":57,"type":"Divider","parentId":53,"style":{"enabled":true,"varName":null}},"item-58":{"id":58,"type":"Divider","parentId":53,"style":{"enabled":true,"varName":null}},"item-62":{"id":62,"type":"Group","parentId":3,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":30,"alignChildren":["center","center"],"alignment":null}},"item-63":{"id":63,"type":"Button","parentId":62,"style":{"enabled":true,"varName":"sendToTxt2IMGButton","text":"TXT2IMG","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-64":{"id":64,"type":"Button","parentId":62,"style":{"enabled":true,"varName":"sendToImg2ImgButton","text":"IMG2IMG","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-65":{"id":65,"type":"Button","parentId":62,"style":{"enabled":true,"varName":null,"text":"Impose","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-66":{"id":66,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":30,"alignChildren":["center","center"],"alignment":null}},"item-67":{"id":67,"type":"Button","parentId":66,"style":{"enabled":true,"varName":"sendToTxt2IMGButton","text":"TXT2IMG","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-68":{"id":68,"type":"Button","parentId":66,"style":{"enabled":true,"varName":"sendToImg2ImgButton","text":"IMG2IMG","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-69":{"id":69,"type":"Button","parentId":66,"style":{"enabled":true,"varName":"importButton","text":"Impose","justify":"center","preferredSize":[80,0],"alignment":null,"helpTip":null}},"item-70":{"id":70,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":5,"orientation":"row","spacing":25,"alignChildren":["left","center"],"alignment":null}},"item-71":{"id":71,"type":"StaticText","parentId":70,"style":{"enabled":true,"varName":"seedLabel","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Seed:","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-72":{"id":72,"type":"EditText","parentId":70,"style":{"enabled":true,"varName":"seedInput","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"-1","justify":"left","preferredSize":[132,0],"alignment":null,"helpTip":null}},"item-73":{"id":73,"type":"Button","parentId":70,"style":{"enabled":true,"varName":"resetSeed","text":"Reset Seed","justify":"center","preferredSize":[90,0],"alignment":null,"helpTip":null}},"item-74":{"id":74,"type":"EditText","parentId":75,"style":{"enabled":true,"varName":"widthInput","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"512","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-75":{"id":75,"type":"Group","parentId":31,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-76":{"id":76,"type":"Group","parentId":33,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-77":{"id":77,"type":"EditText","parentId":76,"style":{"enabled":true,"varName":"heightInput","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"512","justify":"left","preferredSize":[40,0],"alignment":null,"helpTip":null}},"item-78":{"id":78,"type":"StaticText","parentId":46,"style":{"enabled":true,"varName":"batchSize","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"1","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-79":{"id":79,"type":"StaticText","parentId":44,"style":{"enabled":true,"varName":"samplingSize","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"20","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-80":{"id":80,"type":"StaticText","parentId":45,"style":{"enabled":true,"varName":"batchCount","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"1","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-81":{"id":81,"type":"Group","parentId":38,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-82":{"id":82,"type":"Group","parentId":38,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-83":{"id":83,"type":"EditText","parentId":81,"style":{"enabled":true,"varName":"cfgScale","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"10.0","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-84":{"id":84,"type":"EditText","parentId":82,"style":{"enabled":true,"varName":"denoisingSrength","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"0.50","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,1,2,26,27,31,75,29,74,32,33,76,30,77,34,36,35,37,15,17,18,16,19,20,10,11,9,12,13,14,43,44,47,48,79,46,49,50,78,45,51,52,80,70,71,72,73,38,39,81,40,83,41,82,42,84,53,54,57,55,58,56,66,67,68,69,3,62,63,64,65,7,8],"settings":{"importJSON":true,"indentSize":true,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":true,"itemReferenceList":"none"},"activeId":70}
*/ 

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

function saveJSONToFile(jsonData, filePath) {
    var file = new File(filePath);
    file.encoding = "UTF-8";
    file.open("w");
    file.write(JSON.stringify(jsonData, null, 2));
    file.close();
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
  group3.spacing = 3; 
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
  widthSlider.preferredSize.height = 25; 

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
  group5.spacing = 0; 
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
  heightLabel.preferredSize.height = 19; 

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
        
        getMaskButton.text = "Get Mask";
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

var modelList_array = ["Item 1","-","Item 2"]; 
var modelList = group9.add("dropdownlist", undefined, undefined, {name: "modelList", items: modelList_array}); 
  modelList.selection = 0; 
  modelList.preferredSize.width = 143; 
  modelList.preferredSize.height = 23; 
  modelList.alignment = ["left","center"]; 

var modelrefresh = group9.add("button", undefined, undefined, {name: "modelrefresh"}); 
  modelrefresh.text = "Refresh"; 

var modelupdate = group9.add("button", undefined, undefined, {name: "modelupdate"}); 
  modelupdate.text = "Update"; 

// GROUP10
// =======
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
  samplingSizeSlider.minvalue = 0; 
  samplingSizeSlider.maxvalue = 100;  
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
  batchSizeSlider.minvalue = 0; 
  batchSizeSlider.maxvalue = 100; 
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
  batchCountSlider.minvalue = 0; 
  batchCountSlider.maxvalue = 100;  
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

var importButton = group21.add("button", undefined, undefined, {name: "importButton"}); 
  importButton.text = "Impose"; 
  importButton.preferredSize.width = 80; 

// TAB2
// ====
var tab2 = tpanel1.add("tab", undefined, undefined, {name: "tab2"}); 
  tab2.text = "Review"; 
  tab2.orientation = "column"; 
  tab2.alignChildren = ["center","top"]; 
  tab2.spacing = 8; 
  tab2.margins = 12; 

// GROUP22
// =======
var group22 = tab2.add("group", undefined, {name: "group22"}); 
  group22.orientation = "row"; 
  group22.alignChildren = ["center","center"]; 
  group22.spacing = 30; 
  group22.margins = 0; 

var button1 = group22.add("button", undefined, undefined, {name: "button1"}); 
  button1.text = "Impose"; 
  button1.preferredSize.width = 80; 

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
tpanel1.selection = tab1; 

palette.layout.layout(true);
palette.layout.resize();
palette.onResizing = palette.onResize = function () { this.layout.resize(); }

if ( palette instanceof Window ) palette.show();

