"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Calendar, Gauge, Fuel, Settings, ArrowLeft, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { vehicleAPI, Vehicle } from "@/lib/api";

export default function EstoquePage() {
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [selectedYear, setSelectedYear] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar veículos da API
  useEffect(() => {
    loadVehicles();
    
    // Aplicar filtros da URL
    const brandParam = searchParams.get("brand");
    const yearParam = searchParams.get("year");
    
    if (brandParam) setSelectedBrand(brandParam);
    if (yearParam) setSelectedYear(yearParam);
  }, [searchParams]);

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

  const brands = ["Todas", ...Array.from(new Set(vehicles.map(v => v.brand)))];
  const years = ["Todos", ...Array.from(new Set(vehicles.map(v => v.year))).sort().reverse()];

  const filteredVehicles = vehicles.filter(vehicle => {
    const brandMatch = selectedBrand === "Todas" || vehicle.brand === selectedBrand;
    const yearMatch = selectedYear === "Todos" || vehicle.year === selectedYear;
    const searchMatch = searchTerm === "" || 
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    return brandMatch && yearMatch && searchMatch;
  });

  const handleWhatsAppContact = (vehicle: Vehicle) => {
    const message = `Olá, vim pelo site e tenho interesse no veículo:%0A%0A${vehicle.brand} ${vehicle.model}%0AAno: ${vehicle.year}%0AKM: ${vehicle.km}%0APreço: ${vehicle.price}%0A%0AGostaria de mais informações!`;
    const whatsappUrl = `https://wa.me/5518997251860?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-[#0F5FA8] pt-32 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-[#D4A853] transition-colors mb-6 cursor-pointer">
              <ArrowLeft size={20} />
              Voltar para Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Nosso <span className="text-[#D4A853]">Estoque</span>
              </h1>
              <p className="text-white text-lg">
                Veículos seminovos, usados e zero km com procedência garantida
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 px-4 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Marca ou modelo..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Marca</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none cursor-pointer"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ano</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-[#D4A853] focus:outline-none cursor-pointer"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <div className="text-center w-full">
                  <p className="text-sm text-gray-600 mb-2">Veículos encontrados</p>
                  <p className="text-3xl font-bold text-[#0F5FA8]">{filteredVehicles.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400">Carregando veículos...</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-56 bg-gradient-to-br from-[#0F5FA8] to-[#0a4580] flex items-center justify-center">
                    <div className="text-white text-center">
                      <p className="text-3xl font-bold">{vehicle.brand}</p>
                      <p className="text-lg">{vehicle.model}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#0F5FA8] mb-4">
                      {vehicle.brand} {vehicle.model}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{vehicle.year}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge size={16} />
                        <span>{vehicle.km} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel size={16} />
                        <span>{vehicle.fuel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Settings size={16} />
                        <span>{vehicle.transmission}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Preço</p>
                        <p className="text-3xl font-bold text-[#D4A853]">
                          {vehicle.price}
                        </p>
                      </div>
                    </div>

                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppContact(vehicle);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#25D366] text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-[#20BA5A] transition-colors cursor-pointer mb-2"
                    >
                      <MessageCircle size={20} />
                      Tenho Interesse
                    </motion.button>

                    <button
                      onClick={() => setSelectedVehicle(vehicle)}
                      className="w-full bg-[#0F5FA8] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0a4580] transition-colors cursor-pointer text-sm"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">Nenhum veículo encontrado</p>
                <p className="text-gray-500">Tente ajustar os filtros de busca</p>
              </div>
            )}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Modal de Detalhes */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
                <h2 className="text-3xl font-bold text-[#0F5FA8]">
                  {selectedVehicle.brand} {selectedVehicle.model}
                </h2>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Images */}
                <div className="mb-6">
                  <div className="h-96 bg-gradient-to-br from-[#0F5FA8] to-[#0a4580] rounded-xl flex items-center justify-center mb-4">
                    <div className="text-white text-center">
                      <p className="text-5xl font-bold">{selectedVehicle.brand}</p>
                      <p className="text-2xl">{selectedVehicle.model}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-[#D4A853]/10 p-6 rounded-xl mb-6">
                  <p className="text-sm text-gray-600 mb-1">Preço</p>
                  <p className="text-5xl font-bold text-[#D4A853]">{selectedVehicle.price}</p>
                </div>

                {/* Specs */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="text-[#0F5FA8]" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Ano</p>
                        <p className="font-bold text-gray-800">{selectedVehicle.year}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Gauge className="text-[#0F5FA8]" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Quilometragem</p>
                        <p className="font-bold text-gray-800">{selectedVehicle.km} km</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Fuel className="text-[#0F5FA8]" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Combustível</p>
                        <p className="font-bold text-gray-800">{selectedVehicle.fuel}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Settings className="text-[#0F5FA8]" size={24} />
                      <div>
                        <p className="text-sm text-gray-500">Câmbio</p>
                        <p className="font-bold text-gray-800">{selectedVehicle.transmission}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#0F5FA8] mb-3">Descrição</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedVehicle.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-[#0F5FA8] mb-3">Equipamentos</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedVehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-[#D4A853] rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handleWhatsAppContact(selectedVehicle)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#25D366] text-white px-6 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#20BA5A] transition-colors cursor-pointer"
                >
                  <MessageCircle size={24} />
                  Tenho Interesse - Falar no WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
