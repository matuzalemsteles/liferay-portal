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

import React, {useRef} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import classNames from 'classnames';
import {EVENT_TYPES} from '../../custom/form/eventTypes';
import {useForm} from '../hooks/useForm.es';


const FieldRepeatableDND = ({
	children,
	field,
	index,
	nestedFieldIndex,
}) => {
	const ref = useRef(null);
	const dispatch = useForm();

	const [{isDragging}, dragRef] = useDrag({
		canDrop() {
			return true;
		},
		item: {
			index,
			id: field.fieldName,
			nestedFieldIndex: nestedFieldIndex,
			type: "DND",
		},
	});

	const [dropProps, dropRef] = useDrop({
		accept: "DND",
		collect(monitor) {
			return {canDrop: monitor.canDrop()}
		},
		canDrop() {
			return true;
		},
		drop(item, monitor) {

			if (!ref.current) {
				return;
			}

			const draggedIndex = item.index;
			const targetIndex = index;
			const sourceFieldName = item.id;
			const sourceNestedFieldIndex = item.nestedFieldIndex;
			const targetNestedFieldIndex = nestedFieldIndex;

			if (draggedIndex === targetIndex) {
				return;
			}

			const targetSize = ref.current.getBoundingClientRect();
			const targetCenter = (targetSize.bottom - targetSize.top) / 2;

			const draggedOffset = monitor.getClientOffset();

			if (!draggedOffset) {
				return;
			}

			const draggedTop = draggedOffset.y - targetSize.top;

			if (
				(draggedIndex < targetIndex && draggedTop < targetCenter) ||
				(draggedIndex > targetIndex && draggedTop > targetCenter)
			) {
				return;
			}

			dispatch({
				payload: {draggedIndex, sourceFieldName, sourceNestedFieldIndex, targetIndex, targetNestedFieldIndex},
				type: EVENT_TYPES.FORM_VIEW.REPEATABLE_FIELD.CHANGE_ORDER,
			});

			item.index = targetIndex;
		},
	});

	console.log(dropProps);

	dragRef(dropRef(ref));

	return (
		<div className={classNames(
			'lfr-forms__form-view-field-repeatable-dnd',
			{
				'lfr-forms__form-view-field-repeatable-dnd--dragging': isDragging,
			}
		)} ref={ref}>
			{typeof children === 'function'
				? children({field, index})
				: children}
		</div>
	);
};

export default FieldRepeatableDND;
