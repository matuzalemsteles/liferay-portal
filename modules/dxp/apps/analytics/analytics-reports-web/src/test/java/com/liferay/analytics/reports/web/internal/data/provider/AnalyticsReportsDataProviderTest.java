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

package com.liferay.analytics.reports.web.internal.data.provider;

import com.liferay.analytics.reports.web.internal.client.AsahFaroBackendClient;
import com.liferay.analytics.reports.web.internal.model.TrafficSource;
import com.liferay.portal.kernel.exception.NestableRuntimeException;
import com.liferay.portal.kernel.exception.PortalException;
import com.liferay.portal.kernel.test.util.RandomTestUtil;
import com.liferay.portal.kernel.util.FileUtil;
import com.liferay.portal.util.FileImpl;

import java.util.List;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

/**
 * @author David Arques
 */
public class AnalyticsReportsDataProviderTest {

	@Before
	public void setUp() {
		new FileUtil().setFile(new FileImpl());
	}

	@Test
	public void testGetTrafficSources() throws Exception {
		String response = _read("traffic_sources.json");

		AnalyticsReportsDataProvider analyticsReportsDataProvider =
			new AnalyticsReportsDataProvider(
				new AsahFaroBackendClient() {

					@Override
					public String doGet(long companyId, String path) {
						return response;
					}

				});

		List<TrafficSource> trafficSources =
			analyticsReportsDataProvider.getTrafficSources(
				RandomTestUtil.randomLong(), RandomTestUtil.randomString());

		Assert.assertEquals(
			trafficSources.toString(), 1, trafficSources.size());

		TrafficSource trafficSource = trafficSources.get(0);

		Assert.assertEquals("search", trafficSource.getName());
		Assert.assertEquals(3856, trafficSource.getTrafficAmount());
		Assert.assertEquals(100, trafficSource.getTrafficShare(), 0D);
	}

	@Test(expected = PortalException.class)
	public void testGetTrafficSourcesWithAsahFaroBackendError()
		throws Exception {

		AnalyticsReportsDataProvider analyticsReportsDataProvider =
			new AnalyticsReportsDataProvider(
				new AsahFaroBackendClient() {

					@Override
					public String doGet(long companyId, String path) {
						throw new NestableRuntimeException();
					}

				});

		analyticsReportsDataProvider.getTrafficSources(
			RandomTestUtil.randomLong(), RandomTestUtil.randomString());
	}

	private String _read(String fileName) throws Exception {
		return new String(
			FileUtil.getBytes(getClass(), "dependencies/" + fileName));
	}

}