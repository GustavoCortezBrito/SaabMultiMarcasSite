"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { Lock, User } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credenciais simples (em produção, usar autenticação real)
    if (credentials.username === "admin" && credentials.password === "saab2026") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F5FA8] to-[#0a4580] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Logo size="md" className="mb-4" />
          <h1 className="text-3xl font-bold text-[#0F5FA8] mb-2">Admin Login</h1>
          <p className="text-gray-600">Acesso restrito ao painel administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Usuário
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                placeholder="Digite seu usuário"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-[#D4A853] focus:outline-none"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#D4A853] to-[#f4d084] text-[#0F5FA8] py-3 rounded-lg font-bold hover:shadow-lg transition-shadow cursor-pointer"
          >
            Entrar
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Credenciais padrão:</p>
          <p className="font-mono bg-gray-100 p-2 rounded mt-2">
            Usuário: admin | Senha: saab2026
          </p>
        </div>
      </motion.div>
    </div>
  );
}
