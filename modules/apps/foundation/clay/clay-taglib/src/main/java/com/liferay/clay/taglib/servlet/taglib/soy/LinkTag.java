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

package com.liferay.clay.taglib.servlet.taglib.soy;

import com.liferay.frontend.taglib.soy.servlet.taglib.TemplateRendererTag;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.util.WebKeys;

import java.util.Map;

/**
 * @author Matuzalem Teles
 */
public class LinkTag extends TemplateRendererTag {

	@Override
	public int doStartTag() {
		Map<String, Object> context = getContext();

		Map<String, Object> icon = (Map<String, Object>)context.get("icon");

		if (Validator.isNotNull(icon)) {
			if (Validator.isNull(icon.get("spritemap"))) {
				ThemeDisplay themeDisplay = (ThemeDisplay)request.getAttribute(
					WebKeys.THEME_DISPLAY);

					icon.put(
						"spritemap",
						themeDisplay.getPathThemeImages().concat("/clay/icons.svg"));
			}
		}

		setTemplateNamespace("ClayLink.render");

		return super.doStartTag();
	}

	@Override
	public String getModule() {
		return "clay-taglib/clay-link/src/ClayLink";
	}

	public void setAriaLabel(String ariaLabel) {
		putValue("ariaLabel", ariaLabel);
	}

	public void setButtonStyle(String buttonStyle) {
		putValue("buttonStyle", buttonStyle);
	}

	public void setDownload(String download) {
		putValue("download", download);
	}

	public void setHref(String href) {
		putValue("href", href);
	}

	public void setIcon(Map<String, Object> icon) {
		putValue("icon", icon);
	}

	public void setId(String id) {
		putValue("id", id);
	}

	public void setLabel(String label) {
		putValue("label", label);
	}

	public void setStyle(String style) {
		putValue("style", style);
	}

	public void setTarget(String target) {
		putValue("target", target);
	}
}