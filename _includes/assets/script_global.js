/*** LIBRARY ***/
(function(){
	function intobinary(victory){ return document.querySelector(victory); }
	function classProgressStat() {
		var arrImages = Array.from(document.images),
			arrScripts = Array.from(document.scripts).filter(s => s.src),
			arrStylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')),
			arrVideos = Array.from(document.querySelectorAll('video')),
			iProgressBar = 0, iResources = 0,
			itemsIMG = document.images,
			itemsIMGsize = itemsIMG.length,
			tagOverlay = intobinary("#overlay"),
			tagProgress = intobinary("#progress"),
			tagStat = intobinary("#progstat"),
			totalResources = arrImages.length + arrScripts.length + (arrStylesheets.length - 1) + arrVideos.length;

		tagOverlay.style.display = "block";
		tagProgress.style.width = '1%';
		tagStat.textContent = `Loading 1%`;
		if(totalResources === 0) { return resourcesComplete(); }
		
		var testResourceType = "";
		arrImages.forEach(tagIMG => {
			testResourceType = "IMG";
			if (tagIMG.complete) { resourceLoaded(); }
			else {
				tagIMG.addEventListener('load', resourceLoaded);
				tagIMG.addEventListener('error', resourceFailed);
			}
		});
		arrScripts.forEach(tagSCRIPT => {
			testResourceType = "SCRIPT";
			if (tagSCRIPT.readyState && (tagSCRIPT.readyState === "complete" || tagSCRIPT.readyState === "loaded")) { resourceLoaded(); }
			else if (tagSCRIPT.hasAttribute('data-loaded-marker')) { resourceLoaded(); /* Prevent double counting if dynamically re-run (unlikely here) */ }
			else {
				tagSCRIPT.addEventListener('load', resourceLoaded);
				tagSCRIPT.addEventListener('error', resourceFailed);
			}
		});
		arrStylesheets.forEach(tagSTYLESHEET => {
			testResourceType = "STYLESHEET";
			if (tagSTYLESHEET.sheet) { resourceLoaded(); }
			else {
				tagSTYLESHEET.addEventListener('load', resourceLoaded);
				tagSTYLESHEET.addEventListener('error', resourceFailed);
			}
		});
		arrVideos.forEach(tagVIDEO => {
			testResourceType = "VIDEO";
			if (tagVIDEO.readyState >= 3) { resourceLoaded(); }
			else {
				tagVIDEO.addEventListener('loadeddata', resourceLoaded);
				tagVIDEO.addEventListener('error', resourceFailed);
			}
		});
		if(totalResources === 0) { return resourcesComplete(); }
		
		function resourceFailed() {
			alert("Resource Failed!");
		}
		async function resourceLoaded() {
			iResources++;
			var vStat = Math.floor((iResources / totalResources) * 100);
			
//			animateProgressBar(vStat);

			while (iProgressBar <= vStat) {
				if(iProgressBar > vStat) break;
				
				tagProgress.style.width = iProgressBar + '%';
				tagStat.textContent = `Loading ${iProgressBar}%`;
				await new Promise(resolve => setTimeout(resolve, 100));
				
				iProgressBar++;
			}
			
			  if ((iProgressBar > 99) && (iResources >= totalResources)) { return resourcesComplete(); }
		}
		function resourcesComplete() {
		  setTimeout(function() { tagOverlay.style.display = "none";
		  }, 1200);
		}
		
		/*
		var iProgressBarFROM = 0, iProgressBarUNTIL = 0;
		async function animateProgressBar(vUntilStat) {
			iProgressBarUNTIL = vUntilStat;
			
//			for (i = iProgressBarFROM; i <= iProgressBarUNTIL; i++) {
			while (iProgressBarFROM < iProgressBarUNTIL) {
				if(iProgressBarFROM >= iProgressBarUNTIL) break;
//				alert("for (i="+iProgressBarFROM+"; i<"+iProgressBarUNTIL+"; i++) { i="+i+"; }");
				tagProgress.style.width = iProgressBarFROM + '%';
				tagStat.textContent = `Loading ${iProgressBarFROM}%`;
				await new Promise(resolve => setTimeout(resolve, 50));
				iProgressBarFROM++;
			}
			iProgressBarFROM = vUntilStat;
		}
		*/
  }
  document.addEventListener('DOMContentLoaded', classProgressStat, false);
}());
/*** END LIBRARY ***/