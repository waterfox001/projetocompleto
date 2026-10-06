import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AirportUnitId, DatePeriod, UserProfile } from '../../types';
import {
  Search,
  Bell,
  Plus,
  Building2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const {
    userProfile,
    setUserProfile,
    selectedUnitId,
    setSelectedUnitId,
    selectedPeriod,
    setSelectedPeriod,
    setIsCommandPaletteOpen,
    setIsQuickCreateOpen,
    setQuickCreateType,
    notifications,
    toggleNotificationRead,
    markAllNotificationsAsRead,
    units
  } = useApp();

  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pathTitles: Record<string, { title: string; section: string }> = {
    '/': { title: 'Dashboard Executivo', section: 'Geral' },
    '/strategy': { title: 'Estratégia & OKRs', section: 'Metas' },
    '/commercial': { title: 'Pipeline Comercial & CRM', section: 'Comercial' },
    '/customers': { title: 'Gestão de Clientes', section: 'Clientes' },
    '/reservations': { title: 'Controle de Reservas', section: 'Operação' },
    '/operation': { title: 'Central Operacional', section: 'Operação' },
    '/volumes': { title: 'Rastreabilidade de Volumes', section: 'Operação' },
    '/units': { title: 'Unidades Aeroportuárias', section: 'Bases' },
    '/finance': { title: 'Fluxo Financeiro & DRE', section: 'Controladoria' },
    '/reports': { title: 'Relatórios & Inteligência', section: 'Analytics' },
    '/team': { title: 'Escala & Produtividade', section: 'Equipe' },
    '/assets': { title: 'Manutenção de Ativos', section: 'Infraestrutura' },
    '/partners': { title: 'Concessões & Parcerias', section: 'Contratos' },
    '/knowledge': { title: 'Base de Conhecimento (SOPs)', section: 'Qualidade' },
    '/documents': { title: 'Documentos & Contratos', section: 'Compliance' },
    '/occurrences': { title: 'Registro de Ocorrências', section: 'Qualidade' },
    '/audit': { title: 'Logs de Auditoria & Segurança', section: 'Auditoria' },
    '/settings': { title: 'Configurações do Sistema', section: 'Administração' },
    '/mywork': { title: 'Minhas Tarefas', section: 'Produtividade' }
  };

  const currentInfo = pathTitles[currentPath] || { title: 'STOPCASE OS', section: 'Sistema' };

  const profileLabels: Record<UserProfile, { title: string; badge: string }> = {
    diretor: { title: 'Diretoria Executiva', badge: 'Admin' },
    gestor: { title: 'Gestão Operacional', badge: 'Gestor' },
    financeiro: { title: 'Controladoria & Finanças', badge: 'Financeiro' },
    comercial: { title: 'Comercial & Parcerias', badge: 'Comercial' },
    operacional: { title: 'Operador de Balcão', badge: 'Operador' },
    atendimento: { title: 'Atendimento ao Passageiro', badge: 'Atendimento' },
    auditor: { title: 'Auditor & Compliance', badge: 'Auditor' }
  };

  return (
    <header className="sticky top-0 z-30 h-13 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-3 shrink-0">
      {/* Breadcrumb Title */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          {currentInfo.section}
        </span>
        <span className="text-slate-300 hidden sm:inline">/</span>
        <h1 className="text-sm font-semibold text-slate-900 truncate tracking-tight">
          {currentInfo.title}
        </h1>
      </div>

      {/* Enterprise Operational Bar */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Search */}
        <div
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 h-8 text-xs text-slate-500 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded cursor-pointer transition-colors w-44 sm:w-64"
          title="Busca rápida no sistema (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate flex-1">Buscar reserva, volume...</span>
          <kbd className="hidden md:inline text-[10px] font-mono text-slate-400 border border-slate-200 px-1 rounded bg-white">
            ⌘K
          </kbd>
        </div>

        {/* Airport Unit Selector */}
        <div className="relative">
          <select
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value as AirportUnitId)}
            className="appearance-none pl-7 pr-6 h-8 text-xs font-medium bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded cursor-pointer focus:outline-none focus:border-amber-600 transition-colors"
          >
            <option value="all">Todas as Bases (5)</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.airportCode} · {u.shortName}
              </option>
            ))}
          </select>
          <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5 pointer-events-none" />
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Date Period Filter */}
        <div className="relative hidden xl:block">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as DatePeriod)}
            className="appearance-none pl-7 pr-6 h-8 text-xs font-medium bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded cursor-pointer focus:outline-none focus:border-amber-600 transition-colors"
          >
            <option value="today">Hoje (05/10)</option>
            <option value="yesterday">Ontem (04/10)</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="month">Este Mês (Outubro)</option>
            <option value="prev_month">Mês Anterior</option>
            <option value="quarter">Este Trimestre (Q4)</option>
            <option value="year">Ano Atual (2026)</option>
          </select>
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5 pointer-events-none" />
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            setQuickCreateType('reservation');
            setIsQuickCreateOpen(true);
          }}
          className="flex items-center gap-1.5 h-8 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap active:scale-[0.99]"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">Nova Reserva</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifDropdownOpen((prev) => !prev)}
            className="relative p-1.5 h-8 w-8 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded flex items-center justify-center transition-colors cursor-pointer"
            title="Alertas e notificações operacionais"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-600 rounded-full" />
            )}
          </button>

          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-80 sm:w-96 bg-white border border-slate-200 rounded-md shadow-lg z-50 overflow-hidden">
              <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Notificações</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-amber-700 hover:underline font-medium cursor-pointer"
                  >
                    Marcar todas lidas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      toggleNotificationRead(n.id);
                      if (n.link) {
                        onNavigate(n.link);
                        setIsNotifDropdownOpen(false);
                      }
                    }}
                    className={`p-3 text-left transition-colors cursor-pointer flex gap-2.5 ${
                      n.read ? 'bg-white hover:bg-slate-50 opacity-70' : 'bg-slate-50/70 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {n.severity === 'critical' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      ) : n.severity === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      ) : n.severity === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-semibold text-slate-900 truncate">{n.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Role Switcher */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 h-8 pl-1.5 pr-2 bg-white hover:bg-slate-50 border border-slate-200 rounded transition-colors cursor-pointer text-xs"
          >
            <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-white font-semibold text-[10px]">
              {userProfile.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left leading-none">
              <span className="font-medium text-slate-800">
                {profileLabels[userProfile].title.split(' ')[0]}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-md shadow-lg z-50 p-1.5 text-xs">
              <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1 text-slate-500 text-[11px]">
                Simulação de Perfil de Acesso:
              </div>

              {(Object.keys(profileLabels) as UserProfile[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setUserProfile(role);
                    setIsProfileDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                    userProfile === role
                      ? 'bg-amber-50 text-slate-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{profileLabels[role].title}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {profileLabels[role].badge}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
