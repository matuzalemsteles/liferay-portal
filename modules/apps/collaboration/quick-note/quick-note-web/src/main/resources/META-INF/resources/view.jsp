<%--
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
--%>

<%@ include file="/init.jsp" %>

<h1>Clay ActionsDropdown</h1>

<!-- TODO -->

<h1>Clay Alert</h1>

<!-- TODO -->

<h1>Clay Badge</h1>

<clay:badge label="hello clay!!" />
<clay:badge label="success clay!!" style="success" />

<h1>Clay Button</h1>

<%
Map<String, Object> buttonIcon = new HashMap<>();
buttonIcon.put("symbol", "plus");
%>
<clay:button label="My Button" />
<clay:button icon="<%= buttonIcon %>" label="My Button" />

<h1>Clay Checkbox</h1>

<clay:checkbox label="My Checkbox" />

<h1>Clay Dropdown</h1>

<!-- TODO -->

<h1>Clay Icon</h1>

<clay:icon symbol="adjust" />
<clay:icon symbol="archive" />
<clay:icon symbol="columns" />
<clay:icon symbol="dynamic-data-list" />
<clay:icon symbol="exclamation-circle" />
<clay:icon symbol="mark-as-answer" />

<h1>Clay Label</h1>

<clay:label label="My Label" />
<clay:label closeable="<%= true %>" label="My Label" />
