const API_URL = typeof window !== 'undefined' ? '/api' : 'http://localhost:3000/api';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: string;
  km: string;
  price: string;
  fuel: string;
  transmission: string;
  color: string;
  description: string;
  features: string[];
  images: string[];
}

export const vehicleAPI = {
  // Get all vehicles
  async getAll(): Promise<Vehicle[]> {
    const response = await fetch(`${API_URL}/vehicles`, {
      cache: 'no-store'
    });
    return response.json();
  },

  // Get single vehicle
  async getById(id: number): Promise<Vehicle> {
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      cache: 'no-store'
    });
    return response.json();
  },

  // Create vehicle
  async create(vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    const response = await fetch(`${API_URL}/vehicles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });
    return response.json();
  },

  // Update vehicle
  async update(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    const response = await fetch(`${API_URL}/vehicles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicle),
    });
    return response.json();
  },

  // Delete vehicle
  async delete(id: number): Promise<void> {
    await fetch(`${API_URL}/vehicles/${id}`, {
      method: 'DELETE',
    });
  },
};
