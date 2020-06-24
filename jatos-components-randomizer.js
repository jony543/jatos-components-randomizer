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
	sessionStorageKeyName: 'jatosComponentsOrder',
	startNextComponent: function () {
		var componentsOrder = JSON.parse(sessionStorage.getItem(this.sessionStorageKeyName));
		var next = componentsOrder[jatos.componentId.toString()];

		if (next)
			return jatos.startComponent(next, ...arguments);	
		else
			return jatos.endStudy(...arguments);	
	}
};
