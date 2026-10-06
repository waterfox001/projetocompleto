import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
 X,
 Luggage,
 MapPin,
 Clock,
 User,
 ShieldCheck,
 CheckCircle2,
 Move,
 History,
 AlertTriangle
} from 'lucide-react';

export const VolumeDetailDrawer: React.FC = () => {
 const {
 selectedVolumeId,
 setSelectedVolumeId,
 volumes,
 units,
 checkOutVolume,
 updateVolumePosition,
 setSelectedReservationId,
 setSelectedCustomerId,
 customers,
 showToast
 } = useApp();

 const [isEditingPosition, setIsEditingPosition] = useState(false);
 const [newPosition, setNewPosition] = useState('');

 if (!selectedVolumeId) return null;

 const vol = volumes.find((v) => v.id === selectedVolumeId);
 if (!vol) return null;

 const unit = units.find((u) => u.id === vol.unitId);
 const customer = customers.find((c) => c.name === vol.customerName);

 const handleCheckout = () => {
 checkOutVolume(vol.id);
 setSelectedVolumeId(null);
 };

 const handleSavePosition = () => {
 if (!newPosition.trim()) return;
 updateVolumePosition(vol.id, newPosition.toUpperCase().trim());
 setIsEditingPosition(false);
 setNewPosition('');
 };

 return (
 <div
 className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
 onClick={() => setSelectedVolumeId(null)}
 >
 <div
 className="w-full max-w-xl bg-white border-l border-slate-200 shadow-lg h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Drawer Header */}
 <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
 {vol.id}
 </span>
 <span className="text-xs text-slate-500">· Tag: {vol.tagNumber}</span>
 </div>
 <button
 onClick={() => setSelectedVolumeId(null)}
 className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 </div>

 {/* Drawer Body */}
 <div className="flex-1 overflow-y-auto p-5 space-y-5">
 {/* Main Info Box */}
 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-3">
 <div className="flex items-start justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Volume Descrição</div>
 <h3 className="text-base font-bold text-slate-900">{vol.description}</h3>
 <div className="text-xs text-slate-500 mt-1">
 Categoria: <strong className="text-slate-800">{vol.category}</strong> · Unidade: {unit?.name}
 </div>
 </div>
 <span
 className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
 vol.status === 'stored'
 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
 : 'bg-slate-100 text-slate-600 border border-slate-200'
 }`}
 >
 {vol.status === 'stored' ? 'ARMAZENADO' : 'RETIRADO'}
 </span>
 </div>

 <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
 <span className="text-slate-500">Titular da Bagagem:</span>
 <span
 onClick={() => {
 if (customer) {
 setSelectedVolumeId(null);
 setSelectedCustomerId(customer.id);
 }
 }}
 className="font-semibold text-slate-800 hover:text-amber-700 cursor-pointer"
 >
 {vol.customerName}
 </span>
 </div>

 <div className="flex items-center justify-between text-xs">
 <span className="text-slate-500">Reserva Vinculada:</span>
 <span
 onClick={() => {
 setSelectedVolumeId(null);
 setSelectedReservationId(vol.reservationId);
 }}
 className="font-mono font-semibold text-amber-700 hover:underline cursor-pointer"
 >
 #{vol.reservationId}
 </span>
 </div>
 </div>

 {/* Internal Location Card (Armário e Posição) */}
 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-3">
 <div className="flex items-center justify-between">
 <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
 <MapPin className="w-4 h-4 text-amber-600" />
 <span>Localização Interna no Aeroporto</span>
 </div>
 {vol.status === 'stored' && (
 <button
 onClick={() => setIsEditingPosition(!isEditingPosition)}
 className="text-xs text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
 >
 {isEditingPosition ? 'Cancelar' : 'Alterar Posição'}
 </button>
 )}
 </div>

 <div className="grid grid-cols-3 gap-2 text-center">
 <div className="p-2.5 bg-white rounded border border-slate-200">
 <div className="text-[10px] text-slate-500 uppercase font-mono">Área</div>
 <div className="font-bold text-slate-800 text-xs mt-0.5">{vol.locationArea}</div>
 </div>
 <div className="p-2.5 bg-white rounded border border-slate-200">
 <div className="text-[10px] text-slate-500 uppercase font-mono">Armário</div>
 <div className="font-bold text-slate-800 text-xs mt-0.5">{vol.locationLocker}</div>
 </div>
 <div className="p-2.5 bg-amber-50 rounded border border-amber-200">
 <div className="text-[10px] text-amber-800 uppercase font-mono font-semibold">Posição</div>
 <div className="font-bold text-amber-900 text-base font-mono mt-0.5">{vol.locationPosition}</div>
 </div>
 </div>

 {isEditingPosition && (
 <div className="pt-2 flex items-center gap-2">
 <input
 type="text"
 value={newPosition}
 onChange={(e) => setNewPosition(e.target.value)}
 placeholder="Nova posição (ex: B04)"
 className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs text-slate-900 font-mono uppercase focus:outline-none focus:ring-1 focus:ring-amber-500"
 />
 <button
 onClick={handleSavePosition}
 className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded cursor-pointer"
 >
 Salvar
 </button>
 </div>
 )}
 </div>

 {/* Special Care */}
 {vol.specialCare && (
 <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs flex items-start gap-2">
 <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
 <div>
 <span className="font-semibold text-amber-900">Atenção Especial: </span>
 <span className="text-slate-700">{vol.specialCare}</span>
 </div>
 </div>
 )}

 {/* Operational Timeline (Rastreabilidade) */}
 <div className="space-y-3">
 <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
 <History className="w-4 h-4 text-amber-600" />
 <span>Linha do Tempo de Rastreabilidade ({vol.timeline.length})</span>
 </div>

 <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
 {vol.timeline.map((evt) => (
 <div key={evt.id} className="relative text-xs">
 <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white" />
 <div className="flex items-center justify-between text-[11px] mb-0.5">
 <span className="font-bold text-slate-800">{evt.action}</span>
 <span className="font-mono text-slate-500">{new Date(evt.timestamp).toLocaleString('pt-BR')}</span>
 </div>
 <p className="text-slate-600 text-[11px] leading-relaxed">{evt.details}</p>
 <div className="text-[10px] text-slate-400 mt-0.5">
 Operador: {evt.user} ({evt.unit})
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Action: Checkout / Retirada */}
 {vol.status === 'stored' && (
 <div className="pt-4 border-t border-slate-200">
 <button
 onClick={handleCheckout}
 className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-98"
 >
 <CheckCircle2 className="w-4 h-4" />
 <span>Realizar Retirada & Liberar Armário ({vol.locationPosition})</span>
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};
