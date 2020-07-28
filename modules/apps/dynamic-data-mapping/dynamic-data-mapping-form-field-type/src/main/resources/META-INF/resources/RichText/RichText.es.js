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

import {ClassicEditor} from 'frontend-editor-ckeditor-web';
import React from 'react';

import {FieldBase} from '../FieldBase/ReactFieldBase.es';
import {useSyncValue} from '../hooks/useSyncValue.es';

const CKEDITOR_CONFIG = {
	resize_enabled: true,
};

const RichText = ({
	editorConfig,
	id,
	name,
	onChange,
	predefinedValue,
	readOnly,
	value,
	...otherProps
}) => {
	const [currentValue, setCurrentValue] = useSyncValue(
		value ? value : predefinedValue
	);

	return (
		<FieldBase {...otherProps} id={id} name={name} readOnly={readOnly}>
			<ClassicEditor
				contents={currentValue}
				editorConfig={{
					...editorConfig.editorConfig,
					...CKEDITOR_CONFIG,
					toolbar: editorConfig.editorConfig.toolbar_liferay,
				}}
				name={name}
				onChange={(data) => {
					setCurrentValue(data);

					onChange({}, data);
				}}
				readOnly={readOnly}
				style={readOnly ? {pointerEvents: 'none'} : {}}
			/>

			<input
				defaultValue={currentValue}
				id={id || name}
				name={name}
				type="hidden"
			/>
		</FieldBase>
	);
};

export default RichText;
