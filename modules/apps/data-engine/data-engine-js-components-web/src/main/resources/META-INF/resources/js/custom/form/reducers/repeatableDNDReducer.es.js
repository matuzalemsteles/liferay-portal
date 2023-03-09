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

import {EVENT_TYPES} from '../eventTypes';

import {getFieldIndexes, getColumn} from '../../../utils/FormSupport.es';

import {
	isNestedFieldName,
	generateName,
	generateNestedFieldName,
	parseName,
	parseNestedFieldName,
	updateNestedFieldNameIndex,
} from '../../../utils/repeatable.es';

import {PagesVisitor} from '../../../utils/visitors.es';

/**
 * This reducer was created to reorder
 * repeatable fields inside the FormView on Web Content
 */

 export function updateNestedFieldNames(parentFieldName, nestedFields) {
	return (nestedFields || []).map((nestedField) => {
		const newNestedFieldName = generateNestedFieldName(
			nestedField.name,
			parentFieldName
		);

		return {
			...nestedField,
			...(nestedField.editorConfig && {
				editorConfig: updateEditorConfigFieldName(
					nestedField.editorConfig,
					newNestedFieldName
				),
			}),
			name: newNestedFieldName,
			nestedFields: updateNestedFieldNames(
				newNestedFieldName,
				nestedField.nestedFields
			),
			...parseNestedFieldName(newNestedFieldName),
		};
	});
}

function updateEditorConfigFieldName(editorConfig, name) {
	const updatedEditorConfig = {...editorConfig};
	for (const [key, value] of Object.entries(updatedEditorConfig)) {
		if (typeof value === 'string') {
			const parsedName = parseName(decodeURIComponent(value));

			if (Object.keys(parsedName).length) {
				const currentName = encodeURIComponent(
					generateName(null, parsedName)
				);

				updatedEditorConfig[key] = value.replace(
					currentName,
					encodeURIComponent(name) + 'selectItem'
				);
			}
		}
	}

	return updatedEditorConfig;
}

function updateFieldName(name, repeatedIndex) {

	return isNestedFieldName(name) 
	? updateNestedFieldNameIndex(name, repeatedIndex) 
	: generateName(name, {repeatedIndex});
}

export default function repeatableDNDReducer(state, action) {
	switch (action.type) {
		case EVENT_TYPES.FORM_VIEW.REPEATABLE_FIELD.CHANGE_ORDER: {
			const {
				draggedIndex, 
				sourceFieldName, 
				sourceNestedFieldIndex, 
				targetIndex, 
				targetNestedFieldIndex
			} = action.payload;

			const {pages} = state;

			const pageVisitor = new PagesVisitor(pages);

			return {
				pages: pageVisitor.mapColumns((column) => {
					const reorderRepeatedField = (fields) => { 

						let newFields = [...fields];

						if (!fields.find((field) => field.fieldName === sourceFieldName)) {

							return fields.map((field) => {
								if (field.nestedFields) {
									return {
										...field,
										nestedFields: reorderRepeatedField(field.nestedFields),
									}
								}
								return field;
							});
						}
						
						const draggedField = newFields[sourceNestedFieldIndex ?? draggedIndex];
						const newDraggedName = updateFieldName(draggedField.name,
							targetIndex,
						);

						const targetField = newFields[targetNestedFieldIndex ?? targetIndex];
						const newTargetName = updateFieldName(targetField.name,  
							draggedIndex);	

						// target indo para o dragged

						newFields[sourceNestedFieldIndex ?? draggedIndex] = {
							...targetField,
							name: newTargetName,
						}

						// dragged indo para o target

						newFields[targetNestedFieldIndex ?? targetIndex] = {
							...draggedField,
							name: newDraggedName,
						}

						return newFields.map((field) => {
							return {
								...field,
								nestedFields: field.nestedFields
									? updateNestedFieldNames(
										field.name,
										field.nestedFields
									)
									: [],
							};
						}) 
					}
				
					return {
						...column,
						fields: reorderRepeatedField(column.fields),
					};
				
				}),
			};
		}
		default:
			return state;
	}
}
