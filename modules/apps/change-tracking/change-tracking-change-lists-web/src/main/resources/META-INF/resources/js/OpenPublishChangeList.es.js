import {PublishChangeList} from './PublishChangeList.es';

function openPublishChangeList({
	changeListDescription,
	changeListHasCollision,
	changeListName,
	spritemap,
	urlChangeListsHistory,
	urlCheckoutProduction,
	urlPublishChangeList
}) {
	
	let publishChangeList = new PublishChangeList({
		changeListDescription: changeListDescription,
		changeListHasCollision: changeListHasCollision,
		changeListName: changeListName,
		events: {
			close: function(event) {
				event.target.dispose();
			},
		},
		spritemap: spritemap,
		urlChangeListsHistory: urlChangeListsHistory,
		urlCheckoutProduction: urlCheckoutProduction,
		urlPublishChangeList: urlPublishChangeList
	});
	
	return publishChangeList;

}

export {openPublishChangeList};
export default openPublishChangeList;
