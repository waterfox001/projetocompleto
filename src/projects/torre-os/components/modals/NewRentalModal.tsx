import React, { useState } from 'react';
import { X, CalendarCheck, Package, Users, Truck, DollarSign, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NewRentalModal: React.FC = () => {
  const {
    isNewRentalModalOpen,
    setIsNewRentalModalOpen,
    customers,
    products,
    createRental
  } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [startDate, setStartDate] = useState('2026-10-06');
  const [returnDate, setReturnDate] = useState('2026-10-13');
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada'>('entrega');
  const [deliveryFee, setDeliveryFee] = useState(40);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [notes, setNotes] = useState('');

  if (!isNewRentalModalOpen) return null;

  const availableProducts = products.filter(p => p.status === 'DISPONIVEL');
  const selectedProduct = products.find(p => p.id === (selectedProductId || availableProducts[0]?.id));
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const dailyRate = selectedProduct?.dailyRate || 35;
  const rentalValue = diffDays >= 30 ? (selectedProduct?.monthlyRate || 320) : diffDays >= 7 ? (selectedProduct?.weeklyRate || 150) * Math.ceil(diffDays / 7) : dailyRate * diffDays;
  const depositValue = selectedProduct?.depositValue || 200;
  const totalToPay = rentalValue + (deliveryType === 'entrega' ? deliveryFee : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedCustomer) return;

    createRental({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      customerCpf: selectedCustomer.cpf,
      items: [
        {
          productId: selectedProduct.id,
          productCode: selectedProduct.code,
          productName: selectedProduct.name,
          category: selectedProduct.category,
          dailyRate: selectedProduct.dailyRate
        }
      ],
      startDate,
      expectedReturnDate: returnDate,
      totalAmount: totalToPay,
      depositAmount: depositValue,
      paymentMethod,
      deliveryType,
      address: deliveryType === 'entrega' ? selectedCustomer.address : 'Retirada no balcão da loja',
      notes
    });

    setIsNewRentalModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-white text-slate-900 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Criar Nova Locação</h2>
              <div className="text-[11px] text-slate-500">Vínculo automático de contrato, estoque e caução</div>
            </div>
          </div>
          <button
            onClick={() => setIsNewRentalModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Customer Selection */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
              1. Cliente Contratante
            </label>
            <select
              value={selectedCustomerId}
              onChange={e => setSelectedCustomerId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none font-medium"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} · CPF: {c.cpf} {c.isRecurring ? '(VIP)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Product Selection */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
              2. Equipamento Selecionado (Disponíveis)
            </label>
            {availableProducts.length === 0 ? (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                Não há produtos disponíveis no momento. Todos estão alugados ou em higienização.
              </div>
            ) : (
              <select
                value={selectedProductId || availableProducts[0].id}
                onChange={e => setSelectedProductId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 outline-none font-medium font-mono"
              >
                {availableProducts.map(p => (
                  <option key={p.id} value={p.id}>
                    [{p.code}] {p.name} · Diária R$ {p.dailyRate} ({p.brand})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Data de Início
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium font-mono focus:bg-white focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Data Prevista de Retorno
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium font-mono focus:bg-white focus:border-blue-500"
              />
            </div>
          </div>

          {/* Delivery Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Modalidade de Entrega
              </label>
              <select
                value={deliveryType}
                onChange={e => setDeliveryType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium focus:bg-white focus:border-blue-500"
              >
                <option value="entrega">Entrega em Domicílio (+ R$ 40)</option>
                <option value="retirada">Retirada na Loja (Grátis)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Forma de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none font-medium focus:bg-white focus:border-blue-500"
              >
                <option value="pix">Pix Instantâneo</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="dinheiro">Dinheiro na Entrega</option>
              </select>
            </div>
          </div>

          {/* Breakdown summary card */}
          <div className="p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-lg space-y-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Composição da Locação ({diffDays} dias)
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span className="truncate max-w-[280px]">Aluguel ({selectedProduct?.name}):</span>
              <strong className="text-slate-900 font-mono tabular-nums">R$ {rentalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            </div>
            {deliveryType === 'entrega' && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Taxa Logística de Entrega:</span>
                <strong className="text-slate-900 font-mono tabular-nums">R$ {deliveryFee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
              </div>
            )}
            <div className="flex justify-between text-xs text-blue-700 pt-1.5 border-t border-slate-200/80">
              <span>Caução Retida (Reembolsável):</span>
              <strong className="font-mono tabular-nums">R$ {depositValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-1.5 border-t border-slate-200/80">
              <span>Total da Locação:</span>
              <span className="text-blue-600 font-mono tabular-nums">R$ {totalToPay.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewRentalModalOpen(false)}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={availableProducts.length === 0}
              className="flex items-center space-x-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Confirmar & Emitir Contrato</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
