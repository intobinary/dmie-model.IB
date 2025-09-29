// Pure JS detection if fixed .map overlaps any .iViewbox-viewbox on scroll/resize
(function(){
	const tagMain = document.querySelector('.js-main'),
		tagMap = document.querySelector('.js-map'),
		tagsViewboxes = Array.from(document.querySelectorAll('.js-viewbox'));
	var vMapAction = "";

	// Helper: check if two DOMRect intersect
	function rectsIntersect(r1, r2) {
		return !(
			r1.right < r2.left ||
			r1.left > r2.right ||
			r1.bottom < r2.top ||
			r1.top > r2.bottom
		);
	}

	function detectOverlap() {
		if (!tagMap) return;
		const vMapRect = tagMap.getBoundingClientRect();
			
		let overlapFound = false;
		for (const iViewbox of tagsViewboxes) {
			const iViewboxRect = iViewbox.getBoundingClientRect();
			if (rectsIntersect(vMapRect, iViewboxRect)) {
				overlapFound = true;
				vMapAction = iViewbox.getAttribute("attr-action");
				break;
			}
		}
		
		const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
//		var lastScrollTop = "";
		if (overlapFound) {
			if (currentScrollTop > lastScrollTop) {
				// Scrolling down
				tagMain.classList.add('action-' + vMapAction);
				tagMap.classList.add('is-inview');
				tagMap.classList.add('action-' + vMapAction);
			} else {
//				alert("UP!");
				// Scrolling up
				tagMain.classList.remove('action-' + vMapAction);
				tagMap.classList.remove('is-inview');
				tagMap.classList.remove('action-' + vMapAction);
			}
		} else {
			// No overlap found
			tagMain.classList.remove('action-' + vMapAction);
   			tagMap.classList.remove('is-inview');
			tagMap.classList.remove('action-' + vMapAction);
		}
		lastScrollTop = currentScrollTop; // Update last scroll position
		
		/*
		if (overlapFound) {
			tagMain.classList.add('action-'+ vMapAction);
			
			tagMap.classList.add('is-inview');
			tagMap.classList.add('action-'+ vMapAction);
		} else {
			tagMain.classList.remove('action-'+ vMapAction);
			
			tagMap.classList.remove('is-inview');
			tagMap.classList.remove('action-'+ vMapAction);
		}
		*/
	}

	window.addEventListener('scroll', detectOverlap, {passive:true});
	window.addEventListener('resize', detectOverlap);
	detectOverlap(); // initial check on load
})();