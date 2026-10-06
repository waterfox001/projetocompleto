import React from 'react';
import { useApp } from '../../context/AppContext';
import {
 X,
 Calendar,
 Luggage,
 User,
 CreditCard,
 Building2,
 Clock,
 Printer,
 AlertTriangle,
 ArrowRight,
 ShieldCheck
} from 'lucide-react';

export const ReservationDetailDrawer: React.FC = () => {
 const {
 selectedReservationId,
 setSelectedReservationId,
 reservations,
 volumes,
 units,
 setSelectedVolumeId,
 setSelectedCustomerId,
 showToast
 } = useApp();

 if (!selectedReservationId) return null;

 const res = reservations.find((r) => r.id === selectedReservationId);
 if (!res) return null;

 const unit = units.find((u) => u.id === res.unitId);
 const relatedVolumes = volumes.filter((v) => res.volumes.includes(v.id) || v.reservationId === res.id);

 return (
 <div
 className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
 onClick={() => setSelectedReservationId(null)}
 >
 <div
 className="w-full max-w-xl bg-white border-l border-slate-200 shadow-lg h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
 onClick={(e) => e.stopPropagation()}
 >
 {/* Drawer Header */}
 <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
 <div className="flex items-center gap-2">
 <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
 {res.id}
 </span>
 <span className="text-xs text-slate-500">· {unit?.shortName}</span>
 </div>
 <div className="flex items-center gap-2">
 <button
 onClick={() => showToast('Impressão', `Comprovante da reserva ${res.id} enviado para impressora térmica.`, 'info')}
 className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded cursor-pointer"
 title="Imprimir comprovante e tags"
 >
 <Printer className="w-4 h-4" />
 </button>
 <button
 onClick={() => setSelectedReservationId(null)}
 className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 </div>
 </div>

 {/* Drawer Body */}
 <div className="flex-1 overflow-y-auto p-5 space-y-5">
 {/* Main Status & Client Lockup */}
 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-3">
 <div className="flex items-center justify-between">
 <div>
 <div className="text-[10px] font-mono uppercase text-slate-500">Passageiro / Cliente</div>
 <div
 onClick={() => {
 setSelectedReservationId(null);
 setSelectedCustomerId(res.customerId);
 }}
 className="text-base font-bold text-slate-900 hover:text-amber-700 cursor-pointer transition-colors"
 >
 {res.customerName}
 </div>
 <div className="text-xs text-slate-500 font-mono mt-0.5">{res.customerPhone}</div>
 </div>
 <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
 {res.status.toUpperCase()}
 </span>
 </div>

 {res.flightNumber && (
 <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
 <span>Voo de Conexão:</span>
 <span className="font-mono font-semibold text-amber-700">
 {res.airline} · {res.flightNumber}
 </span>
 </div>
 )}
 </div>

 {/* Time & Dates */}
 <div className="grid grid-cols-2 gap-3 text-xs">
 <div className="p-3 bg-slate-50/70 rounded border border-slate-200">
 <div className="text-[10px] font-mono text-slate-500 uppercase">Início (Check-in)</div>
 <div className="font-bold text-slate-800 mt-1">{new Date(res.startDate).toLocaleString('pt-BR')}</div>
 </div>
 <div className="p-3 bg-slate-50/70 rounded border border-slate-200">
 <div className="text-[10px] font-mono text-slate-500 uppercase">Previsão Retirada</div>
 <div className="font-bold text-slate-800 mt-1">{new Date(res.expectedEndDate).toLocaleString('pt-BR')}</div>
 </div>
 </div>

 {/* Volumes Associated */}
 <div className="space-y-2">
 <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
 <span>Volumes Vinculados ({relatedVolumes.length})</span>
 </div>

 {relatedVolumes.map((vol) => (
 <div
 key={vol.id}
 onClick={() => {
 setSelectedReservationId(null);
 setSelectedVolumeId(vol.id);
 }}
 className="p-3 rounded bg-slate-50/70 border border-slate-200 hover:border-amber-500/60 cursor-pointer transition-all flex items-center justify-between"
 >
 <div className="flex items-center gap-3">
 <Luggage className="w-5 h-5 text-amber-600 shrink-0" />
 <div>
 <div className="text-xs font-bold text-slate-800 font-mono">{vol.id}</div>
 <div className="text-[11px] text-slate-500">{vol.description}</div>
 </div>
 </div>
 <div className="text-right">
 <div className="text-xs font-bold font-mono text-amber-700">{vol.locationPosition}</div>
 <div className="text-[10px] text-slate-500 font-mono">{vol.locationLocker}</div>
 </div>
 </div>
 ))}
 </div>

 {/* Financial Breakdown */}
 <div className="p-4 bg-slate-50/70 rounded border border-slate-200 space-y-2 text-xs">
 <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-2">
 Detalhes Financeiros
 </div>
 <div className="flex justify-between text-slate-500">
 <span>Subtotal:</span>
 <span className="font-mono text-slate-800">R$ {res.totalAmount.toFixed(2)}</span>
 </div>
 {res.discountAmount > 0 && (
 <div className="flex justify-between text-emerald-700 font-medium">
 <span>Desconto concedido:</span>
 <span className="font-mono">-R$ {res.discountAmount.toFixed(2)}</span>
 </div>
 )}
 <div className="flex justify-between text-slate-500">
 <span>Forma de Pagamento:</span>
 <span className="text-slate-800">{res.paymentMethod}</span>
 </div>
 <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-200">
 <span>Total Pago:</span>
 <span className="font-mono text-amber-800">R$ {res.finalAmount.toFixed(2)}</span>
 </div>
 </div>

 {/* Notes */}
 {res.notes && (
 <div className="p-3 bg-slate-50/50 rounded border border-slate-200 text-xs">
 <span className="text-slate-500 font-semibold">Observações: </span>
 <span className="text-slate-700">{res.notes}</span>
 </div>
 )}

 {/* Creation Metadata */}
 <div className="text-[11px] text-slate-500 border-t border-slate-200/80 pt-3">
 Registrado em {new Date(res.createdAt).toLocaleString('pt-BR')} por {res.createdBy}.
 </div>
 </div>
 </div>
 </div>
 );
};
