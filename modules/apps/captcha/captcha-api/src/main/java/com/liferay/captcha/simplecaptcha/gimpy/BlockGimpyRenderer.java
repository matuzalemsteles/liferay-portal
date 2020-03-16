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

package com.liferay.captcha.simplecaptcha.gimpy;

import static nl.captcha.util.ImageUtil.applyFilter;

import com.jhlabs.image.BlockFilter;

import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageFilter;

import nl.captcha.gimpy.GimpyRenderer;

/**
 * Copy of nl.captcha.gimpy.BlockGimpyRenderer modified to work with the last
 * version of com.jhlabs filters
 *
 * @author James Childers
 * @author Jorge Díaz
 */
public class BlockGimpyRenderer implements GimpyRenderer {

	public BlockGimpyRenderer() {
		this(_DEF_BLOCK_SIZE);
	}

	public BlockGimpyRenderer(int blockSize) {
		_blockSize = blockSize;
	}

	@Override
	public void gimp(BufferedImage image) {
		BlockFilter blockFilter = new BlockFilter();

		blockFilter.setBlockSize(_blockSize);

		applyFilter(image, new BufferedImageFilter(blockFilter));
	}

	private static final int _DEF_BLOCK_SIZE = 3;

	private final int _blockSize;

}