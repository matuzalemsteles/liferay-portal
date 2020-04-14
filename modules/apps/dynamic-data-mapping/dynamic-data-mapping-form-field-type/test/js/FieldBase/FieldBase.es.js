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

import {cleanup, render} from '@testing-library/react';
import React from 'react';

import FieldBase from '../../../src/main/resources/META-INF/resources/FieldBase/FieldBase.es';

const spritemap = 'icons.svg';

const connectMock = Base => {
	const dispatch = jest.fn();
	const store = {
		editingLanguageId: 'en_US',
	};

	return props => <Base {...props} dispatch={dispatch} store={store} />;
};

const FieldBaseWithMock = connectMock(FieldBase);

describe('FieldBase', () => {
	afterEach(cleanup);

	it('renders the default markup', () => {
		const {container} = render(<FieldBaseWithMock spritemap={spritemap} />);

		expect(container).toMatchSnapshot();
	});

	it('renders the FieldBase with required', () => {
		const {container} = render(
			<FieldBaseWithMock required spritemap={spritemap} />
		);

		expect(container.querySelector('.reference-mark')).toBeTruthy();
	});

	it('renders the FieldBase with help text', () => {
		const {container} = render(
			<FieldBaseWithMock spritemap={spritemap} tip="Type something!" />
		);

		expect(container.querySelector('.form-text').textContent).toBe(
			'Type something!'
		);
	});

	it('renders the FieldBase with label', () => {
		const {container} = render(
			<FieldBaseWithMock label="Text" spritemap={spritemap} />
		);

		expect(container.querySelector('.ddm-label').textContent).toBe('Text');
	});

	it('does not render the label if showLabel is false', () => {
		const {container} = render(
			<FieldBaseWithMock
				label="Text"
				showLabel={false}
				spritemap={spritemap}
			/>
		);

		expect(container.querySelector('.ddm-label')).toBeFalsy();
	});

	it('renders the FieldBase with children', () => {
		const {container} = render(
			<FieldBaseWithMock spritemap={spritemap}>
				<div>
					<h1>Foo bar</h1>
				</div>
			</FieldBaseWithMock>
		);

		expect(container).toMatchSnapshot();
	});
});
