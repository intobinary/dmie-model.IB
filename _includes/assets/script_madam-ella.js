        // Counter to track how many elements are currently in view
        let inViewCount = 0;
		var tagMain = document.querySelector(".js-main");

        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const sectionId = element.getAttribute('attr-action');
                
                if (entry.isIntersecting) {
                    // Element is in view
                    element.classList.add('in-view');
                    inViewCount++;
                    console.log(`✅ ${sectionId} entered viewport`);
					
					
					tagMain.setAttribute("attr-step", sectionId);
                } else {
                    // Element left view
                    element.classList.remove('in-view');
                    inViewCount--;
                    console.log(`❌ ${sectionId} left viewport`);
                }
                
                // Update counter display
//                document.getElementById('counter').textContent = inViewCount;
            });
        }, {
            threshold: 0.5, // Trigger when 50% of element is visible
            rootMargin: '0px' // No additional margin
        });

        // Observe all elements with the class
        const viewElements = document.querySelectorAll('.js-viewbox');
        viewElements.forEach(element => {
            observer.observe(element);
        });

        // Optional: Log initial state
        console.log('Scroll detection initialized. Observing', viewElements.length, 'elements.');


/*
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
	}

	window.addEventListener('scroll', detectOverlap, {passive:true});
	window.addEventListener('resize', detectOverlap);
	detectOverlap(); // initial check on load
})();
*/