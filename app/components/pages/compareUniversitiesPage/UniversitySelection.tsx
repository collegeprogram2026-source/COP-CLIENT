import React, { useState } from 'react';
import { IconLayoutGrid, IconMinus, IconPlus, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { IconMenu2 } from '@tabler/icons-react';
interface University {
    id: string;
    name: string;
    fee: string;
    feeDescription: string;
    logo: string;
}

interface UniversitySelectionProps {
    universities: University[];
    selectedUniversities: string[];
    onToggle: (id: string) => void;
    onCompare: () => void;
    isTableOpen?: boolean;
}

const UniversitySelection = ({ universities, selectedUniversities, onToggle, onCompare, isTableOpen }: UniversitySelectionProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedUniversities = [...filteredUniversities].sort((a, b) => {
        const aSelected = selectedUniversities.includes(a.id);
        const bSelected = selectedUniversities.includes(b.id);
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;
        return 0;
    });

    return (
        <section className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12 shadow-sm max-w-[1240px] mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-6 sm:mb-10 border-b-[1px] border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                    <div className="bg-[#EEF2FF] p-2 rounded-xl text-white flex-shrink-0">
                        <IconMenu2 stroke={2} color='#7C3AED' />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#111827]">Compare with similar Universities</h3>
                </div>

                <div className="relative w-full sm:w-72">
                    <input
                        type="text"
                        placeholder="Search universities..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#803AF2] focus:bg-white focus:border-transparent text-sm transition-all"
                    />
                    <IconSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-12">
                {sortedUniversities.map((uni) => (
                    <div
                        key={uni.id}
                        className={`flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4 bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${selectedUniversities.includes(uni.id)
                            ? 'border-[#803AF2] bg-white shadow-md'
                            : 'border-transparent hover:border-gray-200 hover:shadow-sm'
                            }`}
                        onClick={() => onToggle(uni.id)}
                    >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#EEF2FF] rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                            <img src={uni.logo} alt={uni.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-grow text-center sm:text-left w-full sm:w-auto">
                            <h4 className="font-bold text-[#111827] text-base sm:text-lg mb-0.5 sm:mb-1 line-clamp-1">{uni.name}</h4>
                            <div className="flex flex-col sm:flex-col items-center sm:items-start">
                                <span className="text-[#803AF2] font-black text-lg sm:text-xl leading-none">{uni.fee}</span>
                                <span className="text-gray-400 text-[10px] mt-1 uppercase font-bold tracking-tight">{uni.feeDescription}</span>
                            </div>
                        </div>
                        <div className={`flex-shrink-0 w-full sm:w-24 py-2 rounded-xl text-sm font-bold transition-colors text-center mt-2 sm:mt-0 ${selectedUniversities.includes(uni.id)
                            ? 'bg-red-50 text-red-600 border border-red-100'
                            : 'bg-[#FFFFFF] text-gray-700 border border-[#E2E8F0] hover:bg-[#803AF2] hover:text-white'
                            }`}>
                            {selectedUniversities.includes(uni.id) ? (
                                <span className="flex items-center justify-center gap-1">
                                    <IconMinus size={16} /> Remove
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-1">
                                    Compare
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center flex-col items-center">
                <button
                    onClick={onCompare}
                    className={`w-full sm:w-auto px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg text-white shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${selectedUniversities.length >= 2
                        ? 'bg-[#803AF2] hover:bg-[#6D28D9] hover:scale-[1.01] cursor-pointer'
                        : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    disabled={selectedUniversities.length < 2}
                >
                    <IconArrowRight size={20} className={isTableOpen ? 'rotate-90 transition-transform' : 'transition-transform'} />
                    {isTableOpen ? 'Close Comparison Table' : 'Open Comparison Table'}
                </button>
                {selectedUniversities.length < 2 && (
                    <p className="mt-4 text-gray-400 text-sm font-medium italic">
                        * Please select at least 2 universities to compare
                    </p>
                )}
            </div>
        </section>
    );
};

export default UniversitySelection;
