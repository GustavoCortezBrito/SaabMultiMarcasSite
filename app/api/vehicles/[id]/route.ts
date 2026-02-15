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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const vehicles = getVehicles();
  const vehicle = vehicles.find((v: any) => v.id === parseInt(params.id));
  
  if (!vehicle) {
    return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
  }
  
  return NextResponse.json(vehicle);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const vehicles = getVehicles();
    const index = vehicles.findIndex((v: any) => v.id === parseInt(params.id));
    
    if (index === -1) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    
    vehicles[index] = { ...vehicles[index], ...updates };
    saveVehicles(vehicles);
    
    return NextResponse.json(vehicles[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const vehicles = getVehicles();
    const filteredVehicles = vehicles.filter((v: any) => v.id !== parseInt(params.id));
    
    if (vehicles.length === filteredVehicles.length) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    
    saveVehicles(filteredVehicles);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete vehicle' }, { status: 500 });
  }
}
