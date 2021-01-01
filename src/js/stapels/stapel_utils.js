// Uitility functions for the stapels

// const debugTag = 'STAPEL_UTILS:';

// This will properly resize a rectangle without scaling the stroke
export function resizeRect (rect, w, h) {
	// Resize the rectangle and its geometry
	rect.geom.setSize(w, h);
	rect.setSize(w, h);

	// update internal data
	rect.updateDisplayOrigin().updateData();

	// console.debug(debugTag, 'consolidated resizeRect() was called');
}
