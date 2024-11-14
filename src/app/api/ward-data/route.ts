// app/api/ward-data/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

type WardData = {
  properties: {
    name: string;
  };
  value: number;
};

export async function GET() {
  // Read the CSV file from the public folder
  const csvFilePath = path.join(process.cwd(), 'public', 'population.csv');
  const csvData = await fs.promises.readFile(csvFilePath, 'utf8');

  // Parse the CSV data into an array of objects
  const data = parse(csvData, {
    columns: true,
    skip_empty_lines: true,
  }) as WardData[];

  return NextResponse.json(data);
}