'use strict';

import {createBrowserHistory} from 'history';

/**
 * The React Router offers a low-level API for manipulating history.
 * This is a layer above the history of the React Router with
 * integration with Senna.js.
 *
 * @example
 * <Router history={Liferay.SPA.unstable_history.ReactRouter}></Router>
 */

const History = (sennaInstance) => {
	const history = createBrowserHistory();

	const updateState = (path, state) => {
		const newPath = typeof path === 'object' ?
			(path.pathname || '') + (path.search || '') :
			path;
		const newState = typeof state === 'object' ? state : {};

		sennaInstance.setOriginActive(true);

		return Object.assign(
			newState,
			{
				origin: 'space',
				path: newPath,
				scrollLeft: sennaInstance.popstateScrollLeft,
				scrollTop: sennaInstance.popstateScrollTop
			}
		);
	};

	const push = (path, state) => {
		const newState = updateState(path, state);
		history.push(path, newState);
	};

	const replace = (path, state) => {
		const newState = updateState(path, state);
		history.replace(path, newState);
	};

	return {
		action: history.action,
		block: history.block,
		createHref: history.createHref,
		go: history.go,
		goBack: history.goBack,
		goForward: history.goForward,
		length: history.length,
		listen: history.listen,
		location: history.location,
		push,
		replace
	};
};

export default History;