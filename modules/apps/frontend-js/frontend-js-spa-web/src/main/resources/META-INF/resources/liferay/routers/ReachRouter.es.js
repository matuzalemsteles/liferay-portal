'use strict';

/**
 * The Reach Router provides a low-level API to create a
 * representative window.history API. This layer is made over
 * the window.history with integration with Senna.js.
 *
 * @example
 * const history = createHistory(Liferay.SPA.unstable_history.ReachRouter)
 * <LocationProvider history={history}></LocationProvider>
 */

const History = (sennaInstance) => {
	const updateHistory = (state, uri) => {
		const newState = Object.assign(
			state,
			{
				origin: 'space',
				path: uri,
				scrollLeft: sennaInstance.popstateScrollLeft,
				scrollTop: sennaInstance.popstateScrollTop
			}
		);

		sennaInstance.setOriginActive(true);
		sennaInstance.updateHistory_(null, uri, newState, false);
	};

	return {
		addEventListener(name, fn) {
			window.addEventListener(...arguments);
		},
		get location() {
			return window.location;
		},
		removeEventListener(name, fn) {
			window.removeEventListener(...arguments);
		},
		history: {
			get entries() {
				return window.history.entries;
			},
			get index() {
				return window.history.index;
			},
			pushState(state, _, uri) {
				updateHistory(state, uri);
			},
			replaceState(state, _, uri) {
				updateHistory(state, uri);
			},
			get state() {
				return window.history.state;
			}
		}
	};
};

export default History;