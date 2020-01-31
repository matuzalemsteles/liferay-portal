/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import ClayButton from '@clayui/button';
import classNames from 'classnames';
import {useEventListener} from 'frontend-js-react-web';
import React, {useContext, useCallback, useMemo} from 'react';

import {LAYOUT_DATA_ITEM_DEFAULT_CONFIGURATIONS} from '../../config/constants/layoutDataItemDefaultConfigurations';
import {LAYOUT_DATA_ITEM_TYPES} from '../../config/constants/layoutDataItemTypes';
import {useSelector} from '../../store/index';
import ResizingContext from './ResizingContext';

function getColumnInfo({item, layoutData}) {
	const rowColumns = layoutData.items[item.parentId].children;
	const colIndex = rowColumns.indexOf(item.itemId);
	const nextColumnIndex = colIndex + 1;
	const currentColumn = item;
	const currentColumnConfig = currentColumn.config;
	const nextColumn = {...layoutData.items[rowColumns[nextColumnIndex]]};
	const nextColumnConfig =
		typeof nextColumn === 'object' && Object.keys(nextColumn).length
			? nextColumn.config
			: {};

	return {
		colIndex,
		currentColumn,
		currentColumnConfig,
		isLastColumn: rowColumns.indexOf(item.itemId) === rowColumns.length - 1,
		nextColumn: nextColumn ? nextColumn : {},
		nextColumnConfig: nextColumn ? nextColumnConfig : {},
		nextColumnIndex: colIndex + 1,
		rowColumns
	};
}

const Column = React.forwardRef(
	({children, className, item, ...props}, ref) => {
		const {
			config: {
				size = LAYOUT_DATA_ITEM_DEFAULT_CONFIGURATIONS[
					LAYOUT_DATA_ITEM_TYPES.column
				].size
			}
		} = item;

		const layoutData = useSelector(state => state.layoutData);

		const {onResizeEnd, onResizeStart, onResizing} = useContext(
			ResizingContext
		);

		const columnInfo = useMemo(() => getColumnInfo({item, layoutData}), [
			item,
			layoutData
		]);

		const onResizingSafe = useCallback(
			event => onResizing(event, columnInfo),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[columnInfo]
		);

		const resizeHandler = (
			<div>
				{children}
				<ClayButton
					className="page-editor__col-resizer"
					onMouseDown={() => {
						onResizeStart(true);

						document.body.addEventListener(
							'mousemove',
							onResizingSafe
						);
					}}
				/>
			</div>
		);

		useEventListener(
			'mouseup',
			event => {
				document.body.removeEventListener('mousemove', onResizingSafe);
				onResizeEnd(event);
			},
			true,
			document.body
		);

		return (
			<>
				<div
					className={classNames(className, 'col', {
						[`col-${size}`]: size
					})}
					ref={ref}
					{...props}
				>
					{!columnInfo.isLastColumn ? resizeHandler : children}
				</div>
			</>
		);
	}
);

export default Column;
