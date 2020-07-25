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
import ClayIcon from '@clayui/icon';
import classNames from 'classnames';
import React, {useCallback, useEffect, useRef} from 'react';

import {FieldBase} from '../FieldBase/ReactFieldBase.es';
import {useSyncValue} from '../hooks/useSyncValue.es';

class NoRender extends React.Component {
	shouldComponentUpdate() {
		return false;
	}

	render() {
		const {forwardRef, ...otherProps} = this.props;

		return <div ref={forwardRef} {...otherProps} />;
	}
}

const AlloyEditor = ({
	editingLanguageId,
	name,
	onChange,
	placeholder,
	readOnly,
	spritemap,
	uploadURL,
	value,
}) => {
	const alloyEditorRef = useRef();
	const containerRef = useRef();

	// Normalizes the field name, YUI internally uses `querySelector` and the id
	// with dollar sign is an invalid selector.

	name = name.replace(/\$/g, '');

	const setValue = useCallback(
		(value, force) => {
			const alloyEditor = alloyEditorRef.current;

			if (alloyEditor && alloyEditor.getHTML() !== value) {
				const nativeEditor = alloyEditor.getNativeEditor();
				const {hasFocus} = nativeEditor.focusManager;

				if (force || !hasFocus) {
					nativeEditor.setData(value);
				}
			}
		},
		[alloyEditorRef]
	);

	useEffect(() => {
		if (!readOnly && containerRef.current) {
			AUI().use(
				'liferay-alloy-editor',
				'liferay-editor-image-uploader',
				'liferay-alloy-editor-source',
				(A) => {
					containerRef.current.innerHTML = value;

					window[name] = {};

					const plugins = [A.Plugin.LiferayAlloyEditorSource];
					const buttons = ['embedVideo', 'hline', 'table'];

					if (uploadURL) {
						plugins.push({
							cfg: {
								uploadItemReturnType: 'null',
								uploadUrl, // eslint-disable-line no-undef
							},
							fn: A.Plugin.LiferayEditorImageUploader,
						});
						buttons.push('image');
					}

					alloyEditorRef.current = new A.LiferayAlloyEditor({
						contents: value,
						editorConfig: {
							extraPlugins:
								'ae_autolink,ae_dragresize,ae_addimages,ae_imagealignment,ae_placeholder,ae_selectionregion,ae_tableresize,ae_tabletools,ae_uicore,itemselector,media,embedurl',
							htmlEncodeOutput: true,
							removePlugins:
								'contextmenu,elementspath,floatingspace,image,link,liststyle,resize,table,tabletools,toolbar,ae_embed',
							skin: 'moono-lisa',
							spritemap,
							srcNode: A.one(containerRef.current),
							title: false,
							toolbars: {
								add: {buttons},
								styles: {
									selections: window.AlloyEditor.Selections,
									tabIndex: 1,
								},
							},
						},
						namespace: name,
						onChangeMethod: (event) =>
							onChange(event, alloyEditorRef.current.getHTML()),
						plugins,
						textMode: false,
					}).render();
				}
			);
		}

		return () => {
			if (alloyEditorRef.current) {
				alloyEditorRef.current.destroy();
			}
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (readOnly) {
			containerRef.current.innerHTML = value;
		}
		else {
			setValue(value);
		}
	}, [containerRef, setValue, value, readOnly]);

	useEffect(() => {
		setValue(editingLanguageId, true);
	}, [setValue, editingLanguageId]);

	return (
		<NoRender className="alloy-editor-container" id={`${name}Container`}>
			<div
				className={classNames({'alloy-editor-wrapper': !readOnly})}
				id={`${name}Wrapper`}
			>
				<div className="wrapper">
					<div
						className="alloy-editor alloy-editor-placeholder form-control"
						contentEditable="false"
						data-placeholder={placeholder}
						id={`${name}EditorContainer`}
						name={`${name}Editor`}
						ref={containerRef}
					>
						{value}
					</div>

					<ClayIcon
						className="alloy-editor-icon"
						spritemap={spritemap}
						symbol="text-editor"
					/>

					<div id={`${name}Source`}>
						<div className="lfr-source-editor-code" />
					</div>
				</div>
			</div>

			<div className="alloy-editor-switch hide">
				<ClayButton
					className="hide lfr-portal-tooltip"
					data-title={Liferay.Language.get('fullscreen')}
					displayType="secondary"
					id={`${name}Fullscreen`}
					small
				>
					<ClayIcon spritemap={spritemap} symbol="expand" />
				</ClayButton>

				<ClayButton
					className="hide lfr-portal-tooltip"
					data-title={Liferay.Language.get('dark-theme')}
					displayType="secondary"
					id={`${name}SwitchTheme`}
					small
				>
					<ClayIcon spritemap={spritemap} symbol="moon" />
				</ClayButton>

				<ClayButton
					className="lfr-portal-tooltip"
					data-title={Liferay.Language.get('code-view')}
					displayType="secondary"
					id={`${name}Switch`}
					small
				>
					<ClayIcon spritemap={spritemap} symbol="code" />
				</ClayButton>
			</div>
		</NoRender>
	);
};

const RichText = ({
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
			<AlloyEditor
				name={name}
				onChange={(event, newValue) => {
					setCurrentValue(newValue);

					onChange(event, newValue);
				}}
				readOnly={readOnly}
				value={currentValue}
				{...otherProps}
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
