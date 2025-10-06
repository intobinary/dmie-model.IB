/*** DATA ***/
var aArray1=[], aArray2 = [], tempArray = [], tempVar ="", tempElement = "";
var vDataSelected = "", vDataToUse = "";
var isFormEmpty = true, isFormValid = false;
var countManualRDBS = 1, countSavedRDBs = 0, currentManualIndex = "",
	tagContainer4newManualRDBs = document.querySelector(".js-RDBs-container");
var tagForm = document.querySelector(".calculator"),
	tagFormBtnAdd = document.querySelector(".js-btnAdd"),
	tagFormBtnCalculate = document.querySelector(".js-btnCalculate"),
	tagFormBtnDelete = document.querySelector(".js-btnDelete"),
	tagFormBtnDownload = document.querySelector(".js-btnDownload"),
	tagFormBtnRefresh = document.querySelector(".js-btnRefresh"),
	tagFormBtnSave = document.querySelector(".js-btnSave"),
	tagFormBtnUpload = document.querySelector(".js-btnUpload"),
	tagFormInput = document.querySelector(".js-inputFile"),
	tagFormNav = document.querySelector(".js-manualNav"),
	tagsFormInputs = document.querySelectorAll(".calculator-fieldset input"),
	tagBtnResultsDownload = document.querySelector(".js-btnResultsDownload"),
	tagBtnResultsClose = document.querySelector(".js-btnResultsClose");
var aData4DRC = ["DRC", "2025", "100", "100", "100", "100", "100", "100", "100"],
	aData4SA = ["SA", "2025", "0", "0", "0", "0", "0", "0", "0"];
var {% for i in (1..100) %}aData4Manual{{ i }} = []{% if forloop.last == false %}, {% endif %}{% endfor %};
var {% for i in (1..100) %}aData4Result{{ i }} = ["DRC", "2025", "100", "100", "100"]{% if forloop.last == false %}, {% endif %}{% endfor %};
	
var tagFormInputIDcountry = document.querySelector("form fielset input[id='Country']"),
	tagFormInputIDyear = document.querySelector("form fielset input[id='Year']"),
	tagFormInputIDwf = document.querySelector("form fielset input[id='WF']"),
	tagFormInputIDfw = document.querySelector("form fielset input[id='FW']"),
	tagFormInputIDif = document.querySelector("form fielset input[id='IW']"),
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
		vIW = tagFormInputIDiw,
		vYof = tagFormInputIDyof,
		vFP = tagFormInputIDfp,
		vIP = tagFormInputIDip,
		vOL = tagFormInputIDol;
	var aDataToSave = { vCountry, vWF, vFW, vIW, vYof, vFP, vIP, vOL },
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

tagFormBtnCalculate.addEventListener("click", ()=>{
	if(countSavedRDBs >= 1) {
		tagFormBtnRefresh.click();

//		alert(countSavedRDBs);
		doDMIEcalculations();
		
		document.querySelector(".calculator-results").classList.add("is-open");
		
		document.querySelector(".calculator-results-design .js-here").innerHTML = "";
		for(var i=1;i<=countSavedRDBs;i++) {
			const newResultRow = document.createElement("div");
			newResultRow.innerHTML = "";
			newResultRow.innerHTML = '<hgroup><h4>'+ window["aData4Result" + i][0] +': </h4><h5>'+ window["aData4Result" + i][1] +'</h5></hgroup><div class="calculator-results-design-data-numbers"><div class="calculator-results-design-data-numbers-lines"><div class="calculator-results-design-data-numbers-lines-div"><span class="calculator-results-design-data-numbers-lines-div-span">Yin: '+ window["aData4Result" + i][2] +'</span></div><div class="calculator-results-design-data-numbers-lines-div"><span class="calculator-results-design-data-numbers-lines-div-span">Yt: '+ window["aData4Result" + i][3] +'</span></div></div><div class="calculator-results-design-data-numbers-pie"><span class="calculator-results-design-data-numbers-pie-span">Yin%:<br />'+ window["aData4Result" + i][4] +'%</span></div></div>';

			newResultRow.classList.add("calculator-results-design-data");	document.querySelector(".calculator-results-design .js-here").appendChild(newResultRow);
			
			/*
			const newResultRow = document.createElement("tr");
			newResultRow.innerHTML = "";
			for(var j=0; j<5; j++) { newResultRow.innerHTML += "<th>"+ window["aData4Result" + i][j] +"</th>"; }
			document.querySelector(".calculator-results-table tbody").appendChild(newResultRow);
			*/
		}
	} else { alert("Please save your data, at least one country."); }
});

tagFormBtnDelete.addEventListener("click", ()=>{
	tempElement = "";
	checkIsFormEmpty();
	tempElement = document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")");
	if(tempElement.classList.contains("is-saved")) {
		tempElement.classList.remove("is-saved");
		countSavedRDBs--;
	}
	window["aData4Manual" + currentManualIndex] = [];
//	window["aData4Manual" + currentManualIndex].length = 0;
	
	if(isFormEmpty == false) {
		doEmptyForm();
	}
	if((isFormEmpty == true) && (countManualRDBS > 1)) {
		tempElement.classList.add("is-deleted");
		tagsFormInputs.forEach(iTag=>{ iTag.readOnly = true; });
	}
	setupForm();
});

tagBtnResultsDownload.addEventListener("click", ()=>{
	aArray1 = [
				["Country", "Year", "Yin", "Yt", "Yin-Percent"]
			];
	for(var i = 1; i <= countSavedRDBs; i++) {
		aArray1.push([window["aData4Result" + i]]);
	}
	exportCSV(aArray1, "dmie-model_calculator-results.csv");
});
tagFormBtnDownload.addEventListener("click", ()=>{
//	aArray1 = [["Country", "Year", "WF (Workforce)", "FW (Formal Workforce)", "IW (Informal Workforce)", "Yof (Official GDP)", "FP (Formal Productivity)", "IP (Informal Productivity)", "OL (Obligatory Levies / Tax Burden)"]];
	aArray1 = [
				["Country", "Year", "WF", "FW", "IW", "Yof", "FP", "IP", "OL"]
			];
	for(var i = 1; i <= countManualRDBS; i++) {
		aArray1.push([window["aData4Manual" + i]]);
	}
	exportCSV(aArray1, "dmie-model_calculator-inputs.csv");
});
function exportCSV(aArray1, filename) {
	var csvContent = "data:text/csv;charset=utf-8,";
	aArray1.forEach(function(array){
		var vRow = array.join(",");
		csvContent += vRow + "\r\n";
	});
	var vEncodeURI = encodeURI(csvContent);
	
	tempElement = "";
	tempElement = document.createElement("a");
	tempElement.setAttribute("href", vEncodeURI);
	tempElement.setAttribute("download", filename);
	tempElement.click();
}

tagBtnResultsClose.addEventListener("click", ()=>{
	/*
	countManualRDBS=0;
	countSavedRDBs=0;
	
	for(var i=1; i<=100; i++) {
		window["aData4Manual" + i] = [];
		window["aData4Result" + i] = [];
	}
	
	tagFormBtnRefresh.click();
	doEmptyForm();
	setupForm();
	*/
	
	document.querySelector(".calculator-results").classList.remove("is-open");
});

tagFormBtnRefresh.addEventListener("click", ()=>{
	countManualRDBS = 0;
	tagContainer4newManualRDBs.innerHTML = "";
	
	var k = 0;
	var iNewTag = 0;
	do {
		k = iNewTag+1;
		const newRDB4ManualInput = document.createElement("label");
		newRDB4ManualInput.innerHTML = "<input type='radio' id='rdb4dataManual" + k + "' name='rdb4data' onclick='rdbBtnIsClicked(this)' />" + k;
		if(countSavedRDBs > 0) {
			newRDB4ManualInput.classList.add("is-saved");
			
			if(window["aData4Manual" + k] != "") {
				isFormValid = true;
				tempVar = "";
				
				for(var j=0; j<9; j++) {
					tempVar = window["aData4Manual" + k][j];
					if(j==8){ tempVar.trim(); }
					if((j==0) && (!isNaN(tempVar))) { isFormValid = false; return; }
					else if ((j>0) && (isNaN(tempVar))) { isFormValid = false; }
				}

				if(isFormValid == false) { newRDB4ManualInput.classList.add("is-deleted"); }
			}
		}
		
		tagContainer4newManualRDBs.appendChild(newRDB4ManualInput);
		iNewTag++;
		countManualRDBS++;
	} while (iNewTag < countSavedRDBs);

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

	tagsFormInputs.forEach(iTag=>{ iTag.readOnly = false; });
	currentManualIndex = 1;
	document.querySelector(".js-RDBs-container label:nth-child(1) input").checked = true;
	if(countSavedRDBs > 0) { loadDataSelected("rdb4dataManual1"); }
});
tagFormBtnSave.addEventListener("click", ()=>{
	isFormValid = true;
	validateFormInputs();
	if(isFormValid == true) {
		currentManualIndex = document.querySelector(".js-RDBs-container input:checked").getAttribute("id").replace("rdb4dataManual", "");
		
		if(document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")").classList.contains("is-saved")) {
			saveEditedManualInputs(currentManualIndex);
		}
		else {
			saveNewManualInputs(currentManualIndex);
			countSavedRDBs++;
		
			document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")").classList.add("is-saved");
		}
		setupForm();
	}
});

/*
tagFormBtnUpload.addEventListener("click", ()=>{
	countManualRDBS = 0;
	countSavedRDBs = 0;
	
	tempElement = "";
	tempElement = document.createElement("input");
	tempElement.type = "file";
	tempElement.style.display = "none";
	document.body.appendChild(tempElement);
	tempElement.click();
	
	tempElement.addEventListener("change",(e)=>{
		var vFile = tempElement.files[0];
		if(vFile) {
			aArray1 = [], tempArray = [];
			var vFileReader = new FileReader();
			vFileReader.onload = ()=>{
				var csvData = vFileReader.result;
				var rows = csvData.split("\n");
				rows.forEach((row)=>{
					var columns = row.split("/");
					aArray1.push([columns]);
				});
			};
			vFileReader.readAsText(vFile);
		}
		aArray1.splice(0, 1);
		aArray1.pop();
		alert(aArray1);
	});
	
	setupForm();
	tempElement.body.removeChild(tempElement);
});
*/

tagFormInput.addEventListener("change",(e)=>{
	var vFile = tagFormInput.files[0];
	if(vFile) {
		tempArray = [];
		var vFileReader = new FileReader();
		vFileReader.onload = ()=>{
			var csvData = vFileReader.result;
			var rows = csvData.split("\n");
			rows.forEach((row)=>{
				aArray1 = [];
				var columns = row.split(",");
				
				var iColumns = columns;
				for(var i = 0; i<=iColumns.length; i++){
					aArray1.push(iColumns[i]);
//					alert(aArray1);
				}
				aArray1.pop();
//				alert(aArray1 +"Vs\n"+columns);
//				alert(columns.length);
				tempArray.push([aArray1]);
//				alert(tempArray);
			});
			
			tempArray.splice(0, 1);
			tempArray.pop();
//			alert(tempArray);
//			alert(tempArray.length);
			
			countSavedRDBs = tempArray.length;
			for(var i=1; i<=100; i++) {
				if(i<=countSavedRDBs) {
					aArray1 = [];
					var k = i-1;
					window["aData4Manual" + i] = tempArray[k];
					
					aArray1 = window["aData4Manual" + i];
					if((aArray1 != "") && (aArray1[1] == undefined)) {
						aArray2 = [];
						aArray2 = aArray1[0];
				//		aArray1 = aArray1.split(",");
				//		alert(aArray1);
						aArray1 = aArray2;
					}
					window["aData4Manual" + i] = aArray1;
					
					/*
					aArray1 = window["aData4Manual" + i];
					if(aArray1 != "") {
						aArray2 = aArray1;
						aArray1 = [];
						tempVar = "";
						for(var i=0; i<aArray2.length; i++) {
							tempVar = aArray2[i];
//							tempVar = tempVar.replace(/\/r/g, "");
							tempVar = tempVar.trim();
							alert(tempVar);

							aArray1.push(tempVar);
						}
					}
					window["aData4Manual" + i] = aArray1;
					*/
				}
				else { window["aData4Manual" + i] = []; }
			}
			
			tagFormBtnRefresh.click();
			setupForm();
		};
	
		vFileReader.readAsText(vFile);
	}
});
/*** END EVENTS ***/

/*** FUNCTIONS ***/
function doDMIEcalculations() {
	tempArray = [];
	var iCountry, iYear, iWF, iFW, iIW, iYof, iFP, iIP, iOL;
	var iLPG, iA, iB, iC, iXo, iYo, iK, iX, iY, iYin, iYt, iYinPercent;
	for(var i=1; i<=countSavedRDBs; i++) {
		tempArray = window["aData4Manual" + i];
		
		iCountry = tempArray[0], iYear = tempArray[1];
		
		iWF = parseFloat(tempArray[2]), iFW = parseFloat(tempArray[3]), iIW = parseFloat(tempArray[4]), iYof = parseFloat(tempArray[5]), iFP = parseFloat(tempArray[6]), iIP = parseFloat(tempArray[7]), iOL = parseFloat(tempArray[8]);
		
		iLPG = iFP / iIP; //2.8115942
		iA = (iLPG * (iWF / iIW)).toFixed(); //3.1022048
		iB = 1;
		iC = iOL * (iWF / iFW) * iYof; // 8594354716.9778085
		iXo = -(iC); // 
		iYo = (1 - iA) * iC; // -17188709433.955617
//		iK = ((iA * iYo) - iC) / 10
		iK = ((Math.abs(iA) * iYo) + (iB * iXo)) / (iA**2 + iB**2)
		// -6016048301.88446595
		iX = iXo - iK; // -2578306415.0933425
		iY = iYo - Math.abs(iA) * iK; // 859,435,471.69778085
		iYin = Math.abs(iX);
//		alert(iYin);
		iYt = iYin + iYof;
		iYinPercent = (iYin / iYof) * 100;
		
//		alert(iYin +", "+ iYt +", "+ iYinPercent)
		window["aData4Result" + i] = [iCountry, iYear, iYin.toFixed(2), iYt.toFixed(2), iYinPercent.toFixed(2)];
	}
}

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

	if(vDataSelected.includes("Preset")) { tagFormNav.style.visibility = "hidden"; } else { tagFormNav.style.visibility = "visible"; }
		
	loadDataSelected(vDataSelected);
}

function loadDataSelected(vDataSelected) {
	tempArray = [];
	vDataToUse = vDataSelected.replace("rdb4data", "aData4").replace("Preset", "");

	if(vDataSelected.includes("Preset")) { tagsFormInputs.forEach(input=>{ input.readOnly = true; }); } else { tagsFormInputs.forEach(input=>{ input.readOnly = false; }); }
//	alert(currentManualIndex);
	if(countManualRDBS>1){
		if(document.querySelector(".js-RDBs-container label:nth-child("+ currentManualIndex +")").classList.contains("is-deleted")) { tagsFormInputs.forEach(iTag=>{ iTag.readOnly = true; }); }
	}
	
	tempArray = window[vDataToUse];
	if(tempArray != "") {
		aArray1 = [];
		tempVar = "";
		for(var i=0; i<tempArray.length; i++) {
			tempVar = tempArray[i];
//			tempVar = tempVar.replace(/\/r/g, "");
			tempVar = tempVar.trim();

			aArray1.push(tempVar);
		}
		tempArray = aArray1;
	}
	if(tempArray != "") { tagsFormInputs.forEach((iTag, i)=>{ iTag.value = tempArray[i]; }); }
}

function saveEditedManualInputs(i) {
	tempArray = [];
	
	tempArray = [];
	tagsFormInputs.forEach((iTag, i)=>{
		tempArray.push(iTag.value);
	});
	window["aData4Manual" + i] = tempArray;
}

function saveNewManualInputs(i) {
	tempArray = [];
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