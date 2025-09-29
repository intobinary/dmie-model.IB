/*** DATA ***/
var vDataSelected = "", vDataToUse = "";
var isFormEmpty = true, isFormValid = false;
var countManualRDBS = 1, countSavedRDBs = 0, currentManualIndex = "",
	tagContainer4newManualRDBs = document.querySelector(".js-RDBs-container");
var tagForm = document.querySelector(".calculator"),
	tagFormBtnAdd = document.querySelector(".js-btnAdd"),
	tagFormBtnCalculate = document.querySelector(".js-btnCalculate"),
	tagFormBtnDelete = document.querySelector(".js-btnDelete"),
	tagFormBtnRefresh = document.querySelector(".js-btnRefresh"),
	tagFormBtnSave = document.querySelector(".js-btnSave"),
	tagFormNav = document.querySelector(".js-manualNav"),
	tagsFormInputs = document.querySelectorAll(".calculator-fieldset input");
var aData4DRC = ["DRC", "2025", "100", "100", "100", "100", "100", "100", "100"],
	aData4SA = ["SA", "2025", "0", "0", "0", "0", "0", "0", "0"];
var {% for i in (1..100) %}aData4Manual{{ i }} = []{% if forloop.last == false %}, {% endif %}{% endfor %};
	
var tagFormInputIDcountry = document.querySelector("form fielset input[id='Country']"),
	tagFormInputIDyear = document.querySelector("form fielset input[id='Year']"),
	tagFormInputIDwf = document.querySelector("form fielset input[id='WF']"),
	tagFormInputIDfw = document.querySelector("form fielset input[id='FW']"),
	tagFormInputIDif = document.querySelector("form fielset input[id='IF']"),
	tagFormInputIDyof = document.querySelector("form fielset input[id='Yof']"),
	tagFormInputIDfp = document.querySelector("form fielset input[id='FP']"),
	tagFormInputIDip = document.querySelector("form fielset input[id='IP']"),
	tagFormInputIDol = document.querySelector("form fielset input[id='OL']");
/*** END DATA ***/

/*** EVENTS ***/
setupForm();

tagForm.addEventListener("submit", (e)=>{
	e.preventDefault();

	validateFormInputs();
	setupForm();
	currentManualIndex = document.querySelector(".js-RDBs-container input:checked").getAttribute("id").replace("rdb4dataManual", "");
	
	/*
	var vCountry = tagFormInputIDcountry,
		vYear = tagFormInputIDyear,
		vWF = tagFormInputIDwf,
		vFW = tagFormInputIDfw,
		vIF = tagFormInputIDif,
		vYof = tagFormInputIDyof,
		vFP = tagFormInputIDfp,
		vIP = tagFormInputIDip,
		vOL = tagFormInputIDol;
	var aDataToSave = { vCountry, vWF, vFW, vIF, vYof, vFP, vIP, vOL },
		aDataToSave = JSON.stringify(aDataToSave);
	
//	localStorage.setItem('')
	*/
});
tagFormBtnAdd.addEventListener("click", ()=>{
	if(countManualRDBS > 99) {
		alert("Too many inputs. Please upload a cvs file for simplicity.");
	}
	else {
		doEmptyForm();
		countManualRDBS++;
		
		const newRDB4ManualInput = document.createElement("label");
		newRDB4ManualInput.innerHTML = "<input type='radio' id='rdb4dataManual" + countManualRDBS + "' name='rdb4data' onclick='rdbBtnIsClicked(this)' />" + countManualRDBS;

		tagContainer4newManualRDBs.appendChild(newRDB4ManualInput);
		
		document.querySelector("#rdb4dataManual" + countManualRDBS).checked = true;
		currentManualIndex = countManualRDBS;
	}
});

var tempElement;
tagFormBtnDelete.addEventListener("click", ()=>{
	checkIsFormEmpty();
	tempElement = document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")");
	if(tempElement.classList.contains("is-saved")) {
		tempElement.classList.remove("is-saved");
		countSavedRDBs--;
	}
	window["aData4Manual" + currentManualIndex].length = 0;
	
	if(isFormEmpty == false) {
		doEmptyForm();
	}
	if((isFormEmpty == true) && (countManualRDBS > 1)) {
		tempElement.classList.add("is-deleted");
		tagsFormInputs.forEach(iTag=>{ iTag.readOnly = true; });
	}
	setupForm();
});

tagFormBtnRefresh.addEventListener("click", ()=>{
	if(countManualRDBS > 1) {
		countManualRDBS = 0;
		tagContainer4newManualRDBs.innerHTML = "";
		
		var k;
		for(var i=0; i< countSavedRDBs; i++) {
			k = i+1;
			const newRDB4ManualInput = document.createElement("label");
			newRDB4ManualInput.innerHTML = "<input type='radio' id='rdb4dataManual" + k + "' name='rdb4data' onclick='rdbBtnIsClicked(this)' />" + k;
			if(countSavedRDBs > 0) { newRDB4ManualInput.classList.add("is-saved"); }
			alert("Step: " + k);

			tagContainer4newManualRDBs.appendChild(newRDB4ManualInput);
			countManualRDBS++;
		}

		for(var i=1; i<= countSavedRDBs; i++) {
			if(window["aData4Manual" + i] == "") {
				for(var j=i+1; j<=100; j++) {
					if(window["aData4Manual" + j] != "") {
						window["aData4Manual" + i] = window["aData4Manual" + j];
						break;
					}
				}
			}
		}
	}
	
	if(countSavedRDBs > 0) { loadDataSelected("rdb4dataManual1"); }
	tagsFormInputs.forEach(iTag=>{ iTag.readOnly = false; });
	document.querySelector(".js-RDBs-container label:nth-child(1) input").checked = 2;
	currentManualIndex = 1;
});
tagFormBtnSave.addEventListener("click", ()=>{
	if(isFormValid == true) {
		if(document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")").classList.contains("is-saved")) {}
		else {
			saveNewManualInputs(currentManualIndex);
			countSavedRDBs++;
		
			document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")").classList.add("is-saved");
		}
		setupForm();
	}
});
/*** END EVENTS ***/

/*** FUNCTIONS ***/
function validateFormInputs() {
	tagsFormInputs.forEach((iTag, i)=>{
		if((iTag.value != "") && (iTag.value !== "")) { isFormValid = true; } else { isFormValid = false; return; }
	});
}
function checkIsFormEmpty() {
	tagsFormInputs.forEach((iTag, i)=>{
		if(iTag.value == "") { isFormEmpty = true; } else { isFormEmpty = false; return; }
	});
}
function setupForm() {
	if(countSavedRDBs == 0) { tagFormBtnCalculate.value = "CALCULATE"; }
	else if(countSavedRDBs == 1) { tagFormBtnCalculate.value = "CALCULATE FOR\n 1 COUNTRY"; }
	else { tagFormBtnCalculate.value = "CALCULATE FOR\n ALL "+ countSavedRDBs +" COUNTRIES"; }
}

function rdbBtnIsClicked(theTag) {
	doEmptyForm();

	vDataSelected = theTag.getAttribute("id");

	if(vDataSelected.includes("Manual")) {
		currentManualIndex = theTag.getAttribute("id").replace("rdb4dataManual", "");
	}

	if(vDataSelected.includes("Preset")) { tagFormNav.style.display = "none"; } else { tagFormNav.style.display = "inline-block"; }
		
	loadDataSelected(vDataSelected);
}

function loadDataSelected(vDataSelected) {
	var tempArray = [];
	vDataToUse = vDataSelected.replace("rdb4data", "aData4").replace("Preset", "");

	if(vDataSelected.includes("Preset")) { tagsFormInputs.forEach(input=>{ input.readOnly = true; }); } else { tagsFormInputs.forEach(input=>{ input.readOnly = false; }); }
	if(document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")").classList.contains("is-deleted")) { tagsFormInputs.forEach(iTag=>{ iTag.readOnly = true; }); }
	
	tempArray = window[vDataToUse];
	if(tempArray != "") { tagsFormInputs.forEach((iTag, i)=>{ iTag.value = tempArray[i]; }); }
}

function saveNewManualInputs(i) {
	var tempArray = [];
//	globalThis[`var${i}`] = `Value${i}`;
//	alert(window["aData4Manual" + i]);
	
	tempArray = [];
	tagsFormInputs.forEach((iTag, i)=>{
		tempArray.push(iTag.value);
	});
	window["aData4Manual" + i] = tempArray;
}

function doEmptyForm() {
	tagsFormInputs.forEach(iTag=>{ iTag.value = ""; });
}
/*** END FUNCTIONS ***/