'use client';
import { useState } from 'react';
import { CheckSquare, Plus } from 'lucide-react';

interface PackingItem {
    item: string;
    packed: boolean;
    category: string;
}

interface PackingListProps {
    packingList: PackingItem[];
    onUpdate: (newList: PackingItem[]) => void;
}

export default function PackingList({ packingList, onUpdate }: PackingListProps) {
    const [newItem, setNewItem] = useState('');

    const toggleItem = (index: number) => {
        const newList = [...packingList];
        newList[index].packed = !newList[index].packed;
        onUpdate(newList);
    };

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        const newList = [...packingList, { item: newItem, packed: false, category: 'misc' }];
        onUpdate(newList);
        setNewItem('');
    };

    return (
        <section id="packing" className="glass-panel p-6 mb-8">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/30 pb-2">
                <CheckSquare className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-montserrat font-bold text-primary">Packing List</h2>
            </div>

            <form onSubmit={addItem} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="e.g., Mini shampoo, Comfy shoes"
                    className="glass-input flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button type="submit" className="glass-button px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packingList.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center p-3 rounded-lg transition-all cursor-pointer ${item.packed ? 'bg-green-100/50 opacity-70' : 'bg-white/50 hover:bg-white/80'}`}
                        onClick={() => toggleItem(index)}
                    >
                        <input
                            type="checkbox"
                            checked={item.packed}
                            readOnly
                            className="w-5 h-5 text-primary rounded focus:ring-primary mr-3 cursor-pointer"
                        />
                        <span className={`text-lg ${item.packed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {item.item}
                        </span>
                    </div>
                ))}
            </div>

            <p className="mt-6 font-bold text-orange-500 text-center animate-bounce">
                *Remember to check mobile roaming costs & consider a local eSIM!*
            </p>
        </section>
    );
}
