"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simula delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (credentials.username === "admin" && credentials.password === "saab2026") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Usuário ou senha incorretos");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F5FA8] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F5FA8] via-[#0a4580] to-[#062d54]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[480px]"
      >
        {/* Card Principal */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Header com Logo */}
          <div className="bg-gradient-to-r from-[#0F5FA8] to-[#0a4580] px-8 py-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Logo size="lg" className="mb-4" />
              <h1 className="text-2xl font-bold text-white mb-1">Painel Administrativo</h1>
              <p className="text-white/80 text-sm">Acesso restrito</p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="px-8 py-10">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Campo Usuário */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Usuário
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4A853] transition-colors" size={20} />
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#D4A853] focus:outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Digite seu usuário"
                    required
                    disabled={isLoading}
                  />
                </div>
              </motion.div>

              {/* Campo Senha */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4A853] transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#D4A853] focus:outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="Digite sua senha"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </motion.div>

              {/* Mensagem de Erro */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
                >
                  <span className="font-semibold">Erro:</span>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Botão de Login */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-[#D4A853] to-[#f4d084] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Autenticando...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Acessar Painel</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#f4d084] to-[#D4A853] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </>
                )}
              </motion.button>
            </form>

            {/* Info de Credenciais (remover em produção) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <p className="text-xs text-gray-500 text-center mb-2">Credenciais de teste:</p>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm font-mono text-gray-700">
                  <span className="font-semibold">Usuário:</span> admin
                </p>
                <p className="text-sm font-mono text-gray-700">
                  <span className="font-semibold">Senha:</span> saab2026
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-white/60 text-sm mt-6"
        >
          © 2026 SAAB Multimarcas. Todos os direitos reservados.
        </motion.p>
      </motion.div>
    </div>
  );
}
