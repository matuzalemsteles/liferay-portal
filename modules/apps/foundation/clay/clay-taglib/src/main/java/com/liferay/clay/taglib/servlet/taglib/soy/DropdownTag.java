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

import java.util.List;
import java.util.Map;

/**
 * @author Carlos Lancha
 */
public class DropdownTag extends TemplateRendererTag {

	@Override
	public int doStartTag() {
        Map<String, Object> context = getContext();

        if (Validator.isNull(context.get("spritemap"))) {
          ThemeDisplay themeDisplay = (ThemeDisplay)request.getAttribute(
            WebKeys.THEME_DISPLAY);
  
              putValue(
                  "spritemap", 
                  themeDisplay.getPathThemeImages().concat("/clay/icons.svg"));
          }
		
        setTemplateNamespace("ClayDropdown.render");

		return super.doStartTag();
	}

	@Override
	public String getModule() {
		return "clay-taglib/clay-dropdown/src/ClayDropdown";
  }
  
  public void setButton(Map <String, Object> button) {
    putValue("button", button);
  }

  public void setExpanded(Boolean expanded) {
    putValue("expanded", expanded);
  }
  
  public void setIndicatorsPosition(String indicatorsPosition) {
    putValue("indicatorsPosition", indicatorsPosition);
  }

	public void setItems(List<Object> items) {
		putValue("items", items);
  }
  
  public void setSearchable(Boolean searchable) {
    putValue("searchable", searchable);
  }

	public void setSpritemap(String spritemap) {
		putValue("spritemap", spritemap);
  }
  
  public void setTriggerLabel(String triggerLabel) {
    putValue("triggerLabel", triggerLabel);
  }
  
  public void setTriggerStyle(String triggerStyle) {
    putValue("triggerStyle", triggerStyle);
  }
  
  public void setType(String type) {
    putValue("type", type);
  }
}