'use client';
import { useState } from 'react';
import { NotebookPen, Gift, Baby, Save } from 'lucide-react';

interface NotesProps {
    notes: {
        general: string;
        souvenirs: { item: string; budget: number }[];
        kiddoInfo: any;
    };
    onUpdate: (newNotes: any) => void;
}

export default function Notes({ notes, onUpdate }: NotesProps) {
    const [general, setGeneral] = useState(notes.general);
    const [souvenirItem, setSouvenirItem] = useState('');
    const [souvenirBudget, setSouvenirBudget] = useState('');

    // Kiddo state
    const [kiddo, setKiddo] = useState(notes.kiddoInfo || { meals: {} });

    const handleSaveGeneral = () => {
        onUpdate({ ...notes, general });
    };

    const addSouvenir = (e: React.FormEvent) => {
        e.preventDefault();
        if (!souvenirItem) return;
        const newSouvenirs = [...notes.souvenirs, { item: souvenirItem, budget: parseFloat(souvenirBudget) || 0 }];
        onUpdate({ ...notes, souvenirs: newSouvenirs });
        setSouvenirItem('');
        setSouvenirBudget('');
    };

    const handleSaveKiddo = () => {
        onUpdate({ ...notes, kiddoInfo: kiddo });
    };

    return (
        <section id="notes" className="glass-panel p-6 mb-8">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/30 pb-2">
                <NotebookPen className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-montserrat font-bold text-primary">Miscellaneous Notes</h2>
            </div>

            <div className="mb-8">
                <label className="block font-bold text-gray-700 mb-2">Your Thoughts & Reminders:</label>
                <textarea
                    value={general}
                    onChange={(e) => setGeneral(e.target.value)}
                    className="glass-input w-full p-3 rounded-lg min-h-[100px]"
                    placeholder="Jot down anything important..."
                />
                <button onClick={handleSaveGeneral} className="glass-button mt-2 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Notes
                </button>
            </div>

            <div className="mb-8 bg-pink-50/50 p-5 rounded-xl border border-pink-100">
                <h3 className="font-bold text-xl text-pink-600 mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5" /> Souvenir Ideas
                </h3>
                <form onSubmit={addSouvenir} className="flex flex-col md:flex-row gap-3 mb-4">
                    <input
                        type="text"
                        value={souvenirItem}
                        onChange={(e) => setSouvenirItem(e.target.value)}
                        placeholder="Souvenir Idea"
                        className="glass-input flex-1 p-2 rounded-lg"
                    />
                    <input
                        type="number"
                        value={souvenirBudget}
                        onChange={(e) => setSouvenirBudget(e.target.value)}
                        placeholder="Budget (£)"
                        className="glass-input w-32 p-2 rounded-lg"
                    />
                    <button type="submit" className="glass-button px-4 py-2 rounded-lg font-bold">Add</button>
                </form>
                <ul className="space-y-2">
                    {notes.souvenirs.map((s, i) => (
                        <li key={i} className="flex justify-between bg-white/60 p-2 rounded border-b border-white/20">
                            <span>{s.item}</span>
                            <span className="font-bold text-pink-500">£{Number(s.budget).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                <h3 className="font-bold text-xl text-blue-600 mb-4 flex items-center gap-2">
                    <Baby className="w-5 h-5" /> Kiddo Corner
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600">Carer's Contact Info:</label>
                        <input
                            type="text"
                            value={kiddo.carerContact || ''}
                            onChange={(e) => setKiddo({ ...kiddo, carerContact: e.target.value })}
                            className="glass-input w-full p-2 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600">Allergies/Meds:</label>
                        <textarea
                            value={kiddo.allergies || ''}
                            onChange={(e) => setKiddo({ ...kiddo, allergies: e.target.value })}
                            className="glass-input w-full p-2 rounded-lg h-20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600">Routine/Notes:</label>
                        <textarea
                            value={kiddo.routine || ''}
                            onChange={(e) => setKiddo({ ...kiddo, routine: e.target.value })}
                            className="glass-input w-full p-2 rounded-lg h-20"
                        />
                    </div>

                    <h4 className="font-bold text-blue-500 mt-2">Easy Meals:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                            type="text"
                            placeholder="Friday Meal"
                            value={kiddo.meals?.friday || ''}
                            onChange={(e) => setKiddo({ ...kiddo, meals: { ...kiddo.meals, friday: e.target.value } })}
                            className="glass-input p-2 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Saturday Meal"
                            value={kiddo.meals?.saturday || ''}
                            onChange={(e) => setKiddo({ ...kiddo, meals: { ...kiddo.meals, saturday: e.target.value } })}
                            className="glass-input p-2 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Sunday Meal"
                            value={kiddo.meals?.sunday || ''}
                            onChange={(e) => setKiddo({ ...kiddo, meals: { ...kiddo.meals, sunday: e.target.value } })}
                            className="glass-input p-2 rounded-lg"
                        />
                    </div>
                    <button onClick={handleSaveKiddo} className="glass-button mt-2 px-4 py-2 rounded-lg text-sm font-bold w-full md:w-auto">
                        Save Kiddo Info
                    </button>
                </div>
            </div>
        </section>
    );
}
