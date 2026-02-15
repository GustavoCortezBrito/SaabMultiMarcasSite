"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Plus, Edit, Trash2, LogOut, Save, X } from "lucide-react";
import { vehicleAPI, Vehicle } from "@/lib/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.push("/admin/login");
      return;
    }
    loadVehicles();
  }, [router]);

  const loadVehicles = async () => {
    try {
      const data = await vehicleAPI.getAll();
      setVehicles(data);
    } catch (error) {
      console.error("Erro ao carregar veículos:", error);
      alert("Erro ao carregar veículos. Certifique-se de que o servidor JSON está rodando (npm run db).");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const handleAddVehicle = () => {
    setEditingVehicle({
      id: Date.now(),
      brand: "",
      model: "",
      year: new Date().getFullYear().toString(),
      km: "0",
      price: "R$ 0",
      fuel: "Flex",
      transmission: "Manual",
      color: "",
      description: "",
      features: [],
      images: []
    });
    setIsEditing(true);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle({ ...vehicle });
    setIsEditing(true);
  };

  const handleDeleteVehicle = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
      try {
        await vehicleAPI.delete(id);
        await loadVehicles();
        alert("Veículo excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir veículo:", error);
        alert("Erro ao excluir veículo.");
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingVehicle) return;

    if (!editingVehicle.brand || !editingVehicle.model) {
      alert("Preencha pelo menos marca e modelo!");
      return;
    }

    try {
      const existingVehicle = vehicles.find(v => v.id === editingVehicle.id);
      
      if (existingVehicle) {
        await vehicleAPI.update(editingVehicle.id, editingVehicle);
      } else {
        const { id, ...vehicleData } = editingVehicle;
        await vehicleAPI.create(vehicleData);
      }

      await loadVehicles();
      setIsEditing(false);
      setEditingVehicle(null);
      alert("Veículo salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      alert("Erro ao salvar veículo.");
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && editingVehicle) {
      setEditingVehicle({
        ...editingVehicle,
        features: [...editingVehicle.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    if (editingVehicle) {
      setEditingVehicle({
        ...editingVehicle,
        features: editingVehicle.features.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F5FA8] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">Admin</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#0F5FA8]">
            Gerenciar Veículos
          </h1>
          <motion.button
            onClick={handleAddVehicle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#D4A853] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#c49843] transition-colors cursor-pointer"
          >
            <Plus size={20} />
            Adicionar Veículo
          </motion.button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">Carregando veículos...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0F5FA8] mb-2">
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold">Ano:</span> {vehicle.year}
                    </div>
                    <div>
                      <span className="font-semibold">KM:</span> {vehicle.km}
                    </div>
                    <div>
                      <span className="font-semibold">Preço:</span> {vehicle.price}
                    </div>
                    <div>
                      <span className="font-semibold">Combustível:</span> {vehicle.fuel}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modal de Edição */}
      {isEditing && editingVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0F5FA8]">
                {vehicles.find(v => v.id === editingVehicle.id) ? "Editar" : "Adicionar"} Veículo
              </h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingVehicle(null);
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marca</label>
                <input
                  type="text"
                  value={editingVehicle.brand}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Modelo</label>
                <input
                  type="text"
                  value={editingVehicle.model}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ano</label>
                <input
                  type="text"
                  value={editingVehicle.year}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, year: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">KM</label>
                <input
                  type="text"
                  value={editingVehicle.km}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, km: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Preço</label>
                <input
                  type="text"
                  value={editingVehicle.price}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Combustível</label>
                <select
                  value={editingVehicle.fuel}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, fuel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none cursor-pointer"
                >
                  <option value="Flex">Flex</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Elétrico">Elétrico</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Câmbio</label>
                <select
                  value={editingVehicle.transmission}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, transmission: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none cursor-pointer"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automático">Automático</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Cor</label>
                <input
                  type="text"
                  value={editingVehicle.color}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, color: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição</label>
              <textarea
                value={editingVehicle.description}
                onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Equipamentos</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  placeholder="Digite um equipamento..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
                <button
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-[#D4A853] text-white rounded-lg hover:bg-[#c49843] transition-colors cursor-pointer"
                >
                  Adicionar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editingVehicle.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{feature}</span>
                    <button
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingVehicle(null);
                }}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-3 bg-[#0F5FA8] text-white rounded-lg font-semibold hover:bg-[#0a4580] transition-colors cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
