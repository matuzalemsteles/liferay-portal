/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 *
 *
 *
 */

package com.liferay.analytics.reports.web.internal.model;

/**
 * @author David Arques
 */
public class TrafficSource {

	public TrafficSource() {
	}

	public TrafficSource(String name, int trafficAmount, float trafficShare) {
		_name = name;
		_trafficAmount = trafficAmount;
		_trafficShare = trafficShare;
	}

	public String getName() {
		return _name;
	}

	public int getTrafficAmount() {
		return _trafficAmount;
	}

	public double getTrafficShare() {
		return _trafficShare;
	}

	public void setName(String name) {
		_name = name;
	}

	public void setTrafficAmount(int trafficAmount) {
		_trafficAmount = trafficAmount;
	}

	public void setTrafficShare(float trafficShare) {
		_trafficShare = trafficShare;
	}

	private String _name;
	private int _trafficAmount;
	private double _trafficShare;

}