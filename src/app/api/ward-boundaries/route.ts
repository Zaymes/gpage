// app/api/ward-boundaries/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Read the GeoJSON file from the public folder
  const geoJsonFilePath = path.join(process.cwd(), 'public', 'tulsipur_wards.geojson');
  const geoJsonData = await fs.promises.readFile(geoJsonFilePath, 'utf8');

  return NextResponse.json(JSON.parse(geoJsonData));
}