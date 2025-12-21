import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { Language } from '../types';

interface AdminLoginProps {
  onLogin: (password: string) => void;
  onClose: () => void;
  lang: Language;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onClose, lang }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
    setPassword('');
  };

  const content = {
    ar: {
      title: 'تسجيل الدخول للإدارة',
      passwordPlaceholder: 'أدخل كلمة المرور',
      loginButton: 'دخول',
    },
    fr: {
      title: 'Connexion Administrateur',
      passwordPlaceholder: 'Entrez le mot de passe',
      loginButton: 'Se connecter',
    },
  };

  const text = content[lang];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-full">
              <Lock className="text-white" size={32} />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
            {text.title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={text.passwordPlaceholder}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              {text.loginButton}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
