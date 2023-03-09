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

import ClayLayout from '@clayui/layout';
import classnames from 'classnames';
import React, {forwardRef} from 'react';
import {useFormState} from '../../hooks/useForm.es';
import FieldRepeatableDND from '../FieldRepeatableDND';

import './WebContentVariant.scss';

const DDM_FORM_ADMIN_PORTLET_NAMESPACE =
	'com_liferay_dynamic_data_mapping_form_web_portlet_DDMFormAdminPortlet';

export const Column = forwardRef(
	(
		{
			children,
			className,
			column,
			columnClassName,
			index,
			onClick,
			onMouseLeave,
			onMouseOver,
			pageIndex,
			rowIndex,
			viewMode,
		},
		ref
	) => {
		const {portletId} = useFormState();

		const addr = {
			'data-ddm-field-column': index,
			'data-ddm-field-page': pageIndex,
			'data-ddm-field-row': rowIndex,
		};

		const firstField = column.fields[0];
		const isFieldSetOrGroup = firstField?.type === 'fieldset';
		const isFieldSet = firstField?.ddmStructureId && isFieldSetOrGroup;

		return (
			<ClayLayout.Col
				{...addr}
				className={classnames('col-ddm', columnClassName)}
				key={index}
				md={column.size}
				onClick={onClick}
				onMouseLeave={onMouseLeave}
				onMouseOver={onMouseOver}
				ref={ref}
			>
				{!!column.fields.length && (
					<div
						className={classnames(
							'ddm-field-container ddm-target h-100',
							{
								'ddm-fieldset': !!isFieldSet,
								'fields-group': !!isFieldSetOrGroup,
							},
							className
						)}
						data-field-name={firstField.fieldName}
					>
						{column.fields.map((field, index) => {
							if (
								viewMode &&
								portletId.includes(
									DDM_FORM_ADMIN_PORTLET_NAMESPACE
								)
							) {
								field.predefinedValue = '';
							}

							if (field.repeatable) {
								return (
									<FieldRepeatableDND
										field={field}
										index={index}
										nestedFieldIndex={field.nestedFieldIndex}
									>
										{children}
									</FieldRepeatableDND>
								);
							}

							return typeof children === 'function'
								? children({field, index})
								: children;
						})}
					</div>
				)}
			</ClayLayout.Col>
		);
	}
);

Column.displayName = 'WebContentVariant.Column';
