import React from 'react';
import { useApp } from '../../context/AppContext';
import { StopcaseLogo } from '../common/StopcaseLogo';
import {
  LayoutDashboard,
  Target,
  Briefcase,
  Users,
  CalendarDays,
  Luggage,
  Box,
  Building2,
  DollarSign,
  BarChart3,
  UserCheck,
  Wrench,
  FileSpreadsheet,
  BookOpen,
  FolderLock,
  AlertOctagon,
  ShieldCheck,
  Settings,
  CheckSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface NavGroup {
  label: string;
  items: {
    title: string;
    path: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
    permission?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    can,
    occurrences,
    followUps,
    volumes,
    reservations
  } = useApp();

  const openOccurrencesCount = occurrences.filter((o) => o.status === 'Aberta' || o.status === 'Em Resolução').length;
  const overdueFollowUpsCount = followUps.filter((f) => f.status === 'overdue').length;
  const storedVolumesCount = volumes.filter((v) => v.status === 'stored').length;
  const activeReservationsCount = reservations.filter((r) => r.status === 'active').length;

  const navGroups: NavGroup[] = [
    {
      label: 'Estratégia & Vendas',
      items: [
        {
          title: 'Dashboard Geral',
          path: '/',
          icon: LayoutDashboard,
          permission: 'dashboard.view'
        },
        {
          title: 'Estratégia & Metas (OKRs)',
          path: '/strategy',
          icon: Target,
          permission: 'strategy.view'
        },
        {
          title: 'Comercial & CRM',
          path: '/commercial',
          icon: Briefcase,
          badge: overdueFollowUpsCount > 0 ? overdueFollowUpsCount : undefined,
          badgeColor: 'bg-amber-50 text-amber-800 border border-amber-200',
          permission: 'commercial.view'
        },
        {
          title: 'Clientes & 360°',
          path: '/customers',
          icon: Users,
          permission: 'customers.view'
        },
        {
          title: 'Reservas',
          path: '/reservations',
          icon: CalendarDays,
          badge: activeReservationsCount,
          badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200',
          permission: 'reservations.view'
        }
      ]
    },
    {
      label: 'Operação Aeroportuária',
      items: [
        {
          title: 'Central Operacional',
          path: '/operation',
          icon: Luggage,
          permission: 'operation.view'
        },
        {
          title: 'Volumes & Rastreabilidade',
          path: '/volumes',
          icon: Box,
          badge: storedVolumesCount,
          badgeColor: 'bg-slate-100 text-slate-700 border border-slate-200',
          permission: 'volumes.view'
        },
        {
          title: 'Unidades Aeroportos',
          path: '/units',
          icon: Building2,
          permission: 'units.view'
        }
      ]
    },
    {
      label: 'Gestão & Performance',
      items: [
        {
          title: 'Financeiro & Fluxo',
          path: '/finance',
          icon: DollarSign,
          permission: 'finance.view'
        },
        {
          title: 'Relatórios & BI',
          path: '/reports',
          icon: BarChart3,
          permission: 'reports.view'
        },
        {
          title: 'Equipe & Escalas',
          path: '/team',
          icon: UserCheck,
          permission: 'team.view'
        },
        {
          title: 'Ativos & Manutenção',
          path: '/assets',
          icon: Wrench,
          permission: 'assets.view'
        },
        {
          title: 'Parceiros & Concessões',
          path: '/partners',
          icon: FileSpreadsheet,
          permission: 'partners.view'
        }
      ]
    },
    {
      label: 'Governança & Qualidade',
      items: [
        {
          title: 'Central de SOPs',
          path: '/knowledge',
          icon: BookOpen,
          permission: 'knowledge.view'
        },
        {
          title: 'Documentos',
          path: '/documents',
          icon: FolderLock,
          permission: 'documents.view'
        },
        {
          title: 'Ocorrências',
          path: '/occurrences',
          icon: AlertOctagon,
          badge: openOccurrencesCount > 0 ? openOccurrencesCount : undefined,
          badgeColor: 'bg-rose-50 text-rose-700 border border-rose-200',
          permission: 'occurrences.view'
        },
        {
          title: 'Auditoria & Logs',
          path: '/audit',
          icon: ShieldCheck,
          permission: 'audit.view'
        },
        {
          title: 'Configurações',
          path: '/settings',
          icon: Settings,
          permission: 'settings.view'
        },
        {
          title: 'Meu Trabalho',
          path: '/mywork',
          icon: CheckSquare,
          permission: 'mywork.view'
        }
      ]
    }
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-slate-200 flex flex-col transition-all duration-200 ease-in-out select-none ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Brand Header */}
      <div className="h-13 flex items-center justify-between px-3.5 border-b border-slate-200 bg-white shrink-0">
        {!sidebarCollapsed ? (
          <div
            className="flex items-center gap-2.5 overflow-hidden cursor-pointer"
            onClick={() => onNavigate('/')}
            title="STOPCASE OS · Painel Principal"
          >
            <StopcaseLogo className="w-7 h-7 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold tracking-tight text-slate-900 flex items-center gap-1.5 leading-none">
                <span>STOPCASE</span>
                <span className="text-[10px] px-1 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded font-mono font-medium">
                  OS
                </span>
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">
                Aeroportos & Bagagens
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full flex justify-center cursor-pointer"
            onClick={() => onNavigate('/')}
            title="STOPCASE OS"
          >
            <StopcaseLogo className="w-7 h-7 shrink-0" />
          </div>
        )}

        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className={`p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ${
            sidebarCollapsed ? 'hidden' : ''
          }`}
          title="Recolher menu lateral"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
        {navGroups.map((group, gIdx) => {
          const visibleItems = group.items.filter((item) => !item.permission || can(item.permission));
          if (visibleItems.length === 0) return null;

          return (
            <div key={gIdx} className="space-y-0.5">
              {!sidebarCollapsed && (
                <div className="px-2.5 pt-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {group.label}
                </div>
              )}
              {visibleItems.map((item) => {
                const isActive = currentPath === item.path;
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    title={sidebarCollapsed ? item.title : undefined}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors group cursor-pointer ${
                      isActive
                        ? 'bg-amber-50/70 text-slate-900 font-semibold border-l-[3px] border-amber-600 rounded-l-none'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-amber-700' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1 text-left">{item.title}</span>
                    )}
                    {!sidebarCollapsed && item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-medium tabular-nums ${
                          item.badgeColor || 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Status & Toggle */}
      <div className="h-10 px-3 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500 shrink-0">
        {!sidebarCollapsed ? (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-[11px] text-slate-600 font-medium">5 Bases Ativas</span>
            </div>
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Recolher menu"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="w-full flex justify-center p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            title="Expandir menu"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
