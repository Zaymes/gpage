// src/lib/api/ckan.ts
import { cache } from 'react';

const CKAN_BASE_URL = 'https://data.tulsipurmun.gov.np/';
// const RESOURCE_IDS = {
//   wardData: '9f5f3673-ed24-4f9d-ac55-da769264e1c3',
//   categoryData: 'a80e6f91-718e-4af5-a0ac-cfafc2858bad',
//   yearlyData: 'YOUR_THIRD_RESOURCE_ID',
//   mainBannerData: 'f8791dae-3839-4e9d-9dd0-f68edd0ade75'
// };
export const fetchResourceData = cache(async (resourceId: string) => {
  try {
    const response = await fetch(`${CKAN_BASE_URL}/api/v1/data_search?id=${resourceId}&limit=10000`, {
      next: { revalidate: 10 } // Cache for 1 hour make 3600 later
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from CKAN');
    }

    const data = await response.json();
    return data.result.records;
  } catch (error) {
    console.error(`Error fetching resource ${resourceId}:`, error);
    throw error;
  }
});
export const fetchUniqueColumnValues = cache(async (
  resourceId: string,
  columnName: string,
  category?: string
) => {
  try {
    let sqlQuery = `SELECT DISTINCT "${columnName}" FROM "${resourceId}"`;
    if (category) {
      sqlQuery += ` WHERE "category" = '${category}'`;
    }
    // sqlQuery += ` ORDER BY ID \"_id\"`;
    const encodedQuery = encodeURIComponent(sqlQuery);

    const response = await fetch(`https://dms.tulsipurmun.gov.np/api/v1/datastore_search_sql?sql=${encodedQuery}`, {
      method: 'GET'
    });

    const responseData = await response.json();

    if (!responseData.success) {
      throw new Error(responseData.error?.info?.orig?.[0] || 'Unknown API error');
    }

    return responseData.result.records.map((record: []) => record[columnName]);
  } catch (error) {
    console.error(`Error fetching unique values:`, error);
    throw error;
  }
});