"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Plus, Edit, Trash2, LogOut, Save, X, Settings, Car, ChevronRight, Hash } from "lucide-react";
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
      } catch (error) {
        console.error("Erro ao excluir veículo:", error);
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
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
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
    <div className="min-h-screen bg-surface">
      <header className="bg-primary border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
            <div className="hidden md:flex items-center gap-2 text-slate-400">
               <Settings size={14} className="text-accent" />
               <span className="text-[10px] uppercase font-black tracking-widest">Painel Administrativo</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <span className="text-[10px] uppercase font-black tracking-widest">Sair do Sistema</span>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-red-500/10 group-hover:text-red-500 transition-all">
                <LogOut size={18} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-primary tracking-tight mb-2">
              Gestão de <span className="text-gradient-gold">Estoque</span>
            </h1>
            <p className="text-slate-500 font-light text-sm">Controle total sobre os veículos exibidos no site.</p>
          </div>
          <motion.button
            onClick={handleAddVehicle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-premium btn-gold"
          >
            <Plus size={20} />
            Cadastrar Veículo
          </motion.button>
        </div>

        {loading ? (
          <div className="text-center py-40">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 font-light">Carregando base de dados...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-premium transition-all duration-500"
              >
                <div className="flex items-center gap-6 flex-1 w-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                    <Car size={32} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-accent text-[10px] font-black uppercase tracking-widest">{vehicle.brand}</span>
                       <div className="w-1 h-1 bg-slate-200 rounded-full" />
                       <span className="text-slate-400 text-[10px] font-bold">{vehicle.year}</span>
                    </div>
                    <h3 className="text-xl font-black text-primary truncate tracking-tight">
                      {vehicle.model}
                    </h3>
                  </div>
                  <div className="hidden lg:grid grid-cols-3 gap-12 text-right px-12 border-x border-slate-50">
                    <div>
                      <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Preço</span>
                      <span className="text-primary font-bold">{vehicle.price}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">KM</span>
                      <span className="text-primary font-bold">{vehicle.km}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Câmbio</span>
                      <span className="text-primary font-bold">{vehicle.transmission}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleEditVehicle(vehicle)}
                    className="flex-1 md:flex-none h-12 px-6 bg-slate-50 text-slate-600 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
                  >
                    <Edit size={16} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    className="w-12 h-12 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Modern Editor Modal */}
      <AnimatePresence>
        {isEditing && editingVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 z-[100]"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-[3rem] max-w-5xl w-full max-h-full overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Plus size={20} />
                  </div>
                  <h2 className="text-2xl font-black text-primary tracking-tight">
                    {vehicles.find(v => v.id === editingVehicle.id) ? "Editar" : "Novo"} Veículo
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingVehicle(null);
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:rotate-90 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-10 overflow-y-auto space-y-10">
                {/* Form Sections */}
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-6 md:col-span-2">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marca</label>
                          <input
                            type="text"
                            value={editingVehicle.brand}
                            onChange={(e) => setEditingVehicle({ ...editingVehicle, brand: e.target.value })}
                            placeholder="Ex: Toyota"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent focus:bg-white outline-none transition-all font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modelo</label>
                          <input
                            type="text"
                            value={editingVehicle.model}
                            onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                            placeholder="Ex: Corolla"
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent focus:bg-white outline-none transition-all font-bold"
                          />
                        </div>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Ano</label>
                          <input
                            type="text"
                            value={editingVehicle.year}
                            onChange={(e) => setEditingVehicle({ ...editingVehicle, year: e.target.value })}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent outline-none font-bold text-center"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Quilometragem</label>
                          <input
                            type="text"
                            value={editingVehicle.km}
                            onChange={(e) => setEditingVehicle({ ...editingVehicle, km: e.target.value })}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent outline-none font-bold text-center"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cor</label>
                          <input
                            type="text"
                            value={editingVehicle.color}
                            onChange={(e) => setEditingVehicle({ ...editingVehicle, color: e.target.value })}
                            className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent outline-none font-bold text-center"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Preço</label>
                          <input
                            type="text"
                            value={editingVehicle.price}
                            onChange={(e) => setEditingVehicle({ ...editingVehicle, price: e.target.value })}
                            className="w-full px-4 py-4 bg-accent/5 border border-accent/10 rounded-2xl focus:border-accent outline-none font-bold text-accent text-center"
                          />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrição</label>
                        <textarea
                          value={editingVehicle.description}
                          onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                          rows={4}
                          placeholder="Fale sobre o estado do veículo, revisões e diferenciais..."
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent focus:bg-white outline-none transition-all font-medium resize-none"
                        />
                     </div>
                  </div>

                  <div className="space-y-8 bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Combustível</label>
                      <select
                        value={editingVehicle.fuel}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, fuel: e.target.value })}
                        className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-accent outline-none font-bold appearance-none cursor-pointer"
                      >
                        <option value="Flex">Flex</option>
                        <option value="Gasolina">Gasolina</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Elétrico">Elétrico</option>
                        <option value="Híbrido">Híbrido</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Câmbio</label>
                      <select
                        value={editingVehicle.transmission}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, transmission: e.target.value })}
                        className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-accent outline-none font-bold appearance-none cursor-pointer"
                      >
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Opcionais do Veículo</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                          placeholder="Ar Condicionado..."
                          className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-accent outline-none text-xs"
                        />
                        <button
                          onClick={handleAddFeature}
                          className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-accent transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {editingVehicle.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200"
                          >
                            <span className="text-[10px] font-bold text-slate-600">{feature}</span>
                            <button
                              onClick={() => handleRemoveFeature(index)}
                              className="text-slate-300 hover:text-red-500 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex gap-4 justify-end shrink-0">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingVehicle(null);
                  }}
                  className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors"
                >
                  Descartar Alterações
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="btn-premium btn-gold !px-12"
                >
                  <Save size={18} />
                  Salvar Veículo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

