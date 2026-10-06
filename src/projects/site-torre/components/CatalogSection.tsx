import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Heart, Sparkles, Plus, Check, Eye } from 'lucide-react';
import { Product, ProductCategory, AgeFilter, UnitId } from '../types';
import { PRODUCTS, UNITS } from '../data/mockData';

interface CatalogSectionProps {
  currentUnit: UnitId;
  onSelectUnit: (unit: UnitId) => void;
  startDate: string;
  endDate: string;
  onAddToCart: (product: Product, days: number) => void;
  onViewProduct: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  comparisonList: string[];
  onToggleCompare: (productId: string) => void;
}

const CATEGORIES: ProductCategory[] = [
  'Todos',
  'Carrinhos',
  'Bebê Conforto',
  'Cadeirinhas',
  'Berços',
  'Alimentação',
  'Banho & Cuidados',
  'Brinquedos',
  'Andadores',
];

const AGE_FILTERS: { label: string; value: AgeFilter }[] = [
  { label: 'Todas as Idades', value: 'all' },
  { label: 'Recém-nascido (0 a 3m)', value: 'newborn' },
  { label: '+3 meses', value: '3m_plus' },
  { label: '+6 meses', value: '6m_plus' },
  { label: '+8 meses', value: '8m_plus' },
  { label: '+1 ano (Toddler)', value: 'toddler' },
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  currentUnit,
  onSelectUnit,
  startDate,
  endDate,
  onAddToCart,
  onViewProduct,
  favorites,
  onToggleFavorite,
  comparisonList,
  onToggleCompare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [selectedAge, setSelectedAge] = useState<AgeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(35);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc'>('popular');

  // Calculate rental days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  // Natural Language Search and filtering
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== 'Todos' && p.category !== selectedCategory) {
        return false;
      }

      // Age filter
      if (selectedAge !== 'all' && !p.ageFilterGroup.includes(selectedAge)) {
        return false;
      }

      // Max price
      if (p.dailyPrice > maxPrice) {
        return false;
      }

      // Only available in current unit
      if (onlyAvailable && p.stockByUnit[currentUnit] !== 'available') {
        return false;
      }

      // Search query filter (supporting natural queries like "carrinho 8 meses", "berco fortaleza")
      if (query) {
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesAge = p.ageGroup.toLowerCase().includes(query);

        // Natural keywords checking
        if (query.includes('carrinho') && p.category !== 'Carrinhos') return false;
        if (query.includes('berço') || query.includes('berco')) {
          if (p.category !== 'Berços') return false;
        }
        if (query.includes('conforto') && p.category !== 'Bebê Conforto') return false;
        if (query.includes('cadeira') && !['Cadeirinhas', 'Alimentação'].includes(p.category)) return false;

        return matchesName || matchesBrand || matchesCategory || matchesDesc || matchesAge;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.dailyPrice - b.dailyPrice;
      if (sortBy === 'price_desc') return b.dailyPrice - a.dailyPrice;
      // Default: best sellers first, then rating
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.rating - a.rating;
    });
  }, [selectedCategory, selectedAge, searchQuery, maxPrice, onlyAvailable, currentUnit, sortBy]);

  const currentUnitData = UNITS[currentUnit];

  return (
    <section id="catalog" className="py-16 md:py-24 bg-[#FCFAF7] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest">
              <span>Catálogo Premium de Locação</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500 font-medium">Unidade {currentUnitData.name} ({currentUnitData.airportCode})</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Equipamentos certificados para sua viagem
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Todos os itens passam por conferência minuciosa e desinfecção a vapor hospitalar antes de cada entrega.
            </p>
          </div>

          {/* Quick city switcher */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-600 self-start md:self-auto">
            <span>Vendo estoque em:</span>
            <select
              value={currentUnit}
              onChange={(e) => onSelectUnit(e.target.value as UnitId)}
              className="font-bold text-stone-900 bg-transparent focus:outline-none cursor-pointer"
            >
              {Object.values(UNITS).map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Intelligent Search Input */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Busca inteligente: experimente 'carrinho para bebê de 8 meses' ou 'berço portátil'..."
              className="w-full bg-white border border-stone-200/90 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Interactive segmented buttons adhering to design constitution) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Age, Price, Availability, Sort */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Age dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Faixa Etária:</span>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value as AgeFilter)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 font-semibold text-stone-800 focus:outline-none"
              >
                {AGE_FILTERS.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability checkbox */}
            <label className="flex items-center gap-2 cursor-pointer text-stone-700 select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="rounded text-orange-600 focus:ring-orange-500"
              />
              <span>Apenas disponíveis em {currentUnitData.name}</span>
            </label>

            {/* Price slider */}
            <div className="flex items-center gap-2 text-stone-600">
              <span>Até R$ {maxPrice}/dia</span>
              <input
                type="range"
                min="10"
                max="35"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-orange-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Sort order */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 font-semibold text-stone-800 focus:outline-none"
            >
              <option value="popular">Mais Alugados / Avaliados</option>
              <option value="price_asc">Menor Preço de Diária</option>
              <option value="price_desc">Maior Preço de Diária</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid - 3 Columns Desktop as required in design constitution */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Nenhum produto encontrado com estes filtros
            </h3>
            <p className="text-xs text-stone-500">
              Tente redefinir a faixa de preço ou selecionar "Todas as Idades" para encontrar opções compatíveis.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSelectedAge('all');
                setSearchQuery('');
                setMaxPrice(35);
                setOnlyAvailable(false);
              }}
              className="px-4 py-2 bg-orange-600 text-white text-xs font-semibold rounded-xl hover:bg-orange-700"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product.id);
              const isCompared = comparisonList.includes(product.id);
              const stockStatus = product.stockByUnit[currentUnit];
              const totalDaysPrice = product.dailyPrice * days;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-orange-200 transition-all duration-200 flex flex-col group text-left"
                >
                  {/* Image Container with solid neutral tone & zero-pill design */}
                  <div className="relative aspect-[4/3] bg-stone-50 overflow-hidden border-b border-stone-100">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Stock Status indicator (Clean, non-spammy) */}
                    <div className="absolute top-3 left-3">
                      {stockStatus === 'available' ? (
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-emerald-200/60">
                          Disponível em {currentUnitData.airportCode}
                        </span>
                      ) : stockStatus === 'low_stock' ? (
                        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-amber-200/60">
                          Última unidade
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-stone-500 bg-stone-100/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-stone-200">
                          Indisponível nesta data
                        </span>
                      )}
                    </div>

                    {/* Favorite and Compare Actions */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleFavorite(product.id)}
                        className={`p-2 rounded-xl backdrop-blur-md transition-colors ${
                          isFav
                            ? 'bg-rose-50 text-rose-600'
                            : 'bg-white/80 text-stone-600 hover:text-rose-600 hover:bg-white'
                        }`}
                        title={isFav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                      >
                        <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Card Content with strict unboxed metadata discipline */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Unboxed Metadata with dot separators */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <span className="font-semibold text-stone-700">{product.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.ageGroup}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.weightLimit}</span>
                      </div>

                      {/* Product Title */}
                      <h3
                        onClick={() => onViewProduct(product)}
                        className="font-serif text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors cursor-pointer leading-snug"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Pricing baseline with tabular numerals */}
                    <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                      <div>
                        <div className="text-[11px] text-stone-400 font-medium">Diária a partir de</div>
                        <div className="text-lg font-bold text-stone-900 tabular-nums">
                          R$ {product.dailyPrice.toFixed(2).replace('.', ',')}
                          <span className="text-xs font-normal text-stone-500">/dia</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-stone-400 font-medium">Total ({days} dias)</div>
                        <div className="text-sm font-bold text-orange-700 tabular-nums">
                          R$ {totalDaysPrice.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onViewProduct(product)}
                        className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-500" />
                        <span>Detalhes</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(product, days)}
                        disabled={stockStatus === 'out_of_stock'}
                        className={`py-2.5 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          stockStatus === 'out_of_stock'
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm shadow-orange-600/20'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{stockStatus === 'out_of_stock' ? 'Esgotado' : 'Reservar'}</span>
                      </button>
                    </div>

                    {/* Compare toggle link */}
                    <div className="text-center pt-1">
                      <button
                        onClick={() => onToggleCompare(product.id)}
                        className={`text-[11px] font-medium transition-colors ${
                          isCompared ? 'text-orange-700 font-bold' : 'text-stone-400 hover:text-stone-700'
                        }`}
                      >
                        {isCompared ? '✓ Adicionado ao comparador' : '+ Comparar com outro item'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
