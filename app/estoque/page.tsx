"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Calendar, Gauge, Fuel, Settings, ArrowLeft, MessageCircle, X, Search, Filter, Info, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { vehicleAPI, Vehicle } from "@/lib/api";

function EstoqueContent() {
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [selectedYear, setSelectedYear] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
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
      <main className="min-h-screen bg-surface">
        {/* Header Section */}
        <section className="bg-primary pt-40 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent transition-all mb-8 group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs uppercase font-black tracking-widest">Voltar para Início</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
                Nosso <span className="text-gradient-gold">Estoque</span>
              </h1>
              <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
                Explore nossa seleção exclusiva de veículos revisados com o selo de qualidade SAAB Multimarcas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="sticky top-[80px] z-30 px-6 -mt-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-xl border border-white p-6 md:p-8 rounded-[2.5rem] shadow-premium grid md:grid-cols-12 gap-6 items-end"
            >
              <div className="md:col-span-4">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">O que você procura?</label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-accent transition-colors" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Marca ou modelo..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent focus:bg-white focus:outline-none transition-all text-primary font-medium"
                  />
                </div>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Marca</label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent focus:bg-white focus:outline-none cursor-pointer appearance-none text-primary font-medium"
                  >
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Ano</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-accent focus:bg-white focus:outline-none cursor-pointer appearance-none text-primary font-medium"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <div className="bg-primary/5 rounded-2xl p-4 flex items-center justify-between border border-primary/5">
                  <span className="text-[10px] font-black text-primary/50 uppercase tracking-widest">Resultado</span>
                  <span className="text-2xl font-black text-primary">{filteredVehicles.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Grid Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-40">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <p className="text-xl text-slate-400 font-light">Sincronizando estoque...</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % 6) * 0.1, duration: 0.6 }}
                      className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-premium transition-all duration-500"
                    >
                      {/* Image Area */}
                      <div className="relative h-64 bg-primary overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center p-8 z-0">
                          <div className="text-center">
                            <span className="block text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-2">{vehicle.brand}</span>
                            <h3 className="text-white text-3xl font-black tracking-tight">{vehicle.model}</h3>
                          </div>
                        </div>
                        <div className="absolute top-6 right-6 z-20">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] text-white font-bold uppercase tracking-widest">Disponível</span>
                          </div>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="p-8">
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Calendar size={16} />
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Ano</p>
                              <p className="text-primary font-bold text-sm">{vehicle.year}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Gauge size={16} />
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Km</p>
                              <p className="text-primary font-bold text-sm">{vehicle.km}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Fuel size={16} />
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Combustível</p>
                              <p className="text-primary font-bold text-sm">{vehicle.fuel}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Settings size={16} />
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">Câmbio</p>
                              <p className="text-primary font-bold text-sm">{vehicle.transmission}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mb-8">
                          <div>
                            <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Investimento</span>
                            <span className="text-3xl font-black text-primary tracking-tight">{vehicle.price}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          <motion.button
                            onClick={() => handleWhatsAppContact(vehicle)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-premium btn-gold w-full"
                          >
                            <MessageCircle size={20} />
                            Negociar agora
                          </motion.button>
                          <button
                            onClick={() => setSelectedVehicle(vehicle)}
                            className="w-full py-4 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:text-accent transition-colors flex items-center justify-center gap-2"
                          >
                            <Info size={14} />
                            Ver todos os detalhes
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredVehicles.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-slate-200"
                  >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Search size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Nenhum veículo encontrado</h3>
                    <p className="text-slate-400 font-light">Tente outros termos ou remova os filtros aplicados.</p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Modern Detailed Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedVehicle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[3rem] max-w-6xl w-full max-h-full overflow-hidden flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white md:text-primary md:bg-slate-100 md:border-none hover:rotate-90 transition-all duration-500"
              >
                <X size={24} />
              </button>

              {/* Left Side: Dynamic Visual */}
              <div className="md:w-[45%] bg-primary relative p-12 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-accent/5 blur-3xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-accent text-[10px] font-black uppercase tracking-widest mb-10">
                    <ShieldCheck size={14} />
                    <span>Qualidade Garantida SAAB</span>
                  </div>
                  <span className="block text-slate-500 text-sm font-bold uppercase tracking-[0.3em] mb-4">{selectedVehicle.brand}</span>
                  <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
                    {selectedVehicle.model}
                  </h2>
                  <div className="text-gradient-gold text-4xl font-black tracking-tight">{selectedVehicle.price}</div>
                </div>

                <div className="relative z-10 mt-auto">
                   <p className="text-slate-500 text-xs leading-relaxed max-w-xs font-light">
                      Todos os nossos veículos passam por um rigoroso processo de revisão e perícia cautelar para sua total segurança.
                   </p>
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="md:w-[55%] p-10 md:p-16 overflow-y-auto">
                <div className="grid grid-cols-2 gap-8 mb-12">
                   {[
                     { icon: <Calendar />, label: "Ano Modelo", value: selectedVehicle.year },
                     { icon: <Gauge />, label: "Kilometragem", value: `${selectedVehicle.km} km` },
                     { icon: <Fuel />, label: "Combustível", value: selectedVehicle.fuel },
                     { icon: <Settings />, label: "Transmissão", value: selectedVehicle.transmission }
                   ].map((item, i) => (
                     <div key={i} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-accent">
                          {item.icon}
                        </div>
                        <div>
                          <span className="block text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">{item.label}</span>
                          <span className="text-primary font-bold">{item.value}</span>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="space-y-10">
                  <div>
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-accent" />
                      Descrição do Veículo
                    </h4>
                    <p className="text-slate-500 leading-relaxed font-light">{selectedVehicle.description}</p>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <div className="w-8 h-[1px] bg-accent" />
                      Destaques & Opcionais
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedVehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-accent/30 transition-all">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform" />
                          <span className="text-sm text-primary/80 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <motion.button
                    onClick={() => handleWhatsAppContact(selectedVehicle)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-premium btn-gold w-full !py-6 text-lg"
                  >
                    <MessageCircle size={24} />
                    Consultar Disponibilidade
                  </motion.button>
                </div>
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

export default function EstoquePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <EstoqueContent />
    </Suspense>
  );
}

