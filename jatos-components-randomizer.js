/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

window.jatosComponentsRandomizer = {
	randomizeComponents: function(lastComponentId) {
			var ignoreComponents = [];
			ignoreComponents.push(jatos.componentId);
			
			if (lastComponentId)
				ignoreComponents.push(lastComponentId.toString());

			var componentsOrder = jatos.componentList
                .filter(component => !ignoreComponents.includes(component.id.toString()))
                .map(component => component.id.toString());
            shuffle(componentsOrder);

            if (lastComponentId)
            	componentsOrder.push(lastComponentId.toString());

            sessionStorage.setItem('jatosComponentsOrder', JSON.stringify(componentsOrder));
	},	
	startNextComponent: function () {
		var componentsOrder = JSON.parse(sessionStorage.getItem('jatosComponentsOrder'));
		
		if (componentsOrder) {
			var currIdx = componentsOrder.findIndex(c => c == jatos.componentId);

			if (currIdx == -1) 
				return jatos.startComponent(componentsOrder[0], ...arguments);	

			var nextIdx = currIdx + 1;

			if (nextIdx >= componentsOrder.length)
				return jatos.endStudy(...arguments);	
			else 
				return jatos.startComponent(componentsOrder[nextIdx], ...arguments);	
		} else {
			return jatos.startNextComponent(...arguments);
		}
	}
};
