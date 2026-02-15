import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ensureDbExists } from '@/lib/initDb';

const dbPath = path.join(process.cwd(), 'db.json');

function getVehicles() {
  try {
    ensureDbExists();
    const data = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(data);
    return db.vehicles || [];
  } catch (error) {
    console.error('Error reading vehicles:', error);
    return [];
  }
}

function saveVehicles(vehicles: any[]) {
  try {
    const db = { vehicles };
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving vehicles:', error);
    return false;
  }
}

export async function GET() {
  const vehicles = getVehicles();
  return NextResponse.json(vehicles);
}

export async function POST(request: Request) {
  try {
    const newVehicle = await request.json();
    const vehicles = getVehicles();
    
    // Generate new ID
    const newId = vehicles.length > 0 ? Math.max(...vehicles.map((v: any) => v.id)) + 1 : 1;
    const vehicleWithId = { ...newVehicle, id: newId };
    
    vehicles.push(vehicleWithId);
    saveVehicles(vehicles);
    
    return NextResponse.json(vehicleWithId);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vehicle' }, { status: 500 });
  }
}
