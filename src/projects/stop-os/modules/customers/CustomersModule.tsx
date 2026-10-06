import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Search,
  Plus,
  Star
} from 'lucide-react';

export const CustomersModule: React.FC = () => {
  const {
    customers,
    setSelectedCustomerId,
    setIsQuickCreateOpen,
    setQuickCreateType
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('todos');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.document.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    const matchesSegment = selectedSegment === 'todos' || c.segment === selectedSegment;

    return matchesSearch && matchesSegment;
  });

  const vipCount = customers.filter((c) => c.segment === 'VIP').length;
  const corporateCount = customers.filter((c) => c.segment === 'Corporativo').length;
  const totalLtv = customers.reduce((acc, c) => acc + c.totalSpent, 0);

  return (
    <div className="space-y-4 pb-10">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Gestão de Clientes & Customer 360°
            </h2>
            <span className="text-[11px] text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              Base de Passageiros & Empresas
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            setQuickCreateType('customer');
            setIsQuickCreateOpen(true);
          }}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-medium rounded transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* KPI Metrics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Total de Clientes</div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            {customers.length}
          </div>
        </div>

        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Clientes VIP</div>
          <div className="text-lg font-bold font-mono text-amber-800 tabular-nums mt-0.5">
            {vipCount}
          </div>
        </div>

        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">Contas Corporativas</div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            {corporateCount}
          </div>
        </div>

        <div className="bg-white p-3 border border-slate-200 rounded">
          <div className="text-[11px] text-slate-500 font-medium">LTV Consolidado</div>
          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            R$ {totalLtv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, CPF, telefone ou email..."
            className="w-full pl-8 pr-2.5 py-1 bg-white border border-slate-200 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[11px]">Segmento:</span>
          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700 cursor-pointer focus:outline-none focus:border-amber-600"
          >
            <option value="todos">Todos os Segmentos</option>
            <option value="VIP">VIP</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Frequente">Frequente</option>
            <option value="Ocasional">Ocasional</option>
          </select>
        </div>
      </div>

      {/* Enterprise Customers Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-slate-600 font-semibold">
                <th className="py-2 px-3">Código</th>
                <th className="py-2 px-3">Nome do Cliente</th>
                <th className="py-2 px-3">CPF</th>
                <th className="py-2 px-3">Telefone</th>
                <th className="py-2 px-3">Cidade/UF</th>
                <th className="py-2 px-3">Segmento</th>
                <th className="py-2 px-3">Reservas</th>
                <th className="py-2 px-3">LTV Gasto</th>
                <th className="py-2 px-3">NPS</th>
                <th className="py-2 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-3 font-mono text-slate-500">
                    {cust.id}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">
                    {cust.name}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                    {cust.document}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                    {cust.phone}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">
                    {cust.city}/{cust.state}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border font-medium ${
                      cust.segment === 'VIP'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : cust.segment === 'Corporativo'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {cust.segment}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-800">
                    {cust.reservationsCount}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-medium text-slate-900">
                    R$ {cust.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1 font-mono text-slate-700">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{cust.npsScore || 10}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => setSelectedCustomerId(cust.id)}
                      className="text-xs text-amber-700 hover:underline font-medium cursor-pointer"
                    >
                      Perfil 360°
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
