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

import com.jhlabs.image.RippleFilter;

import java.awt.image.BufferedImage;
import java.awt.image.BufferedImageFilter;
import java.awt.image.ImageFilter;

import nl.captcha.gimpy.GimpyRenderer;

/**
 * Copy of nl.captcha.gimpy.RippleGimpyRenderer modified to work with the last
 * version of com.jhlabs filters
 *
 * @author James Childers
 * @author Jorge Díaz
 */
public class RippleGimpyRenderer implements GimpyRenderer {

	/**
	 * Apply a RippleFilter to the image.
	 *
	 * @param image The image to be distorted
	 */
	@Override
	public void gimp(BufferedImage image) {
		RippleFilter rippleFilter = new RippleFilter();

		rippleFilter.setXAmplitude(2.6F);
		rippleFilter.setYAmplitude(1.7F);
		rippleFilter.setXWavelength(15);
		rippleFilter.setYWavelength(5);

		rippleFilter.setEdgeAction(RippleFilter.CLAMP);

		ImageFilter imageFilter = new BufferedImageFilter(rippleFilter);

		applyFilter(image, imageFilter);
	}

}