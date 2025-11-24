'use client';
import { useState } from 'react';
import { Plane, MapPin, ShoppingBag, Music } from 'lucide-react';

interface ItineraryProps {
    itinerary: any[];
}

export default function Itinerary({ itinerary, onUpdate }: ItineraryProps & { onUpdate?: (newItinerary: any[]) => void }) {
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({
        date: '',
        title: '',
        time: '',
        description: ''
    });

    const handleAddItem = () => {
        if (!newItem.date || !newItem.title) return;

        const itemToAdd = {
            date: newItem.date,
            title: newItem.title,
            details: newItem.time && newItem.description ? [{ time: newItem.time, description: newItem.description }] : []
        };

        const updatedItinerary = [...itinerary, itemToAdd];
        if (onUpdate) {
            onUpdate(updatedItinerary);
        }

        setNewItem({ date: '', title: '', time: '', description: '' });
        setIsAdding(false);
    };

    return (
        <section id="itinerary" className="glass-panel p-6 mb-8">
            <div className="flex items-center justify-between mb-6 border-b-2 border-primary/30 pb-2">
                <div className="flex items-center gap-3">
                    <MapPin className="text-primary w-8 h-8" />
                    <h2 className="text-3xl font-montserrat font-bold text-primary">Your Itinerary</h2>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="glass-button px-4 py-2 rounded-lg text-sm font-bold"
                >
                    {isAdding ? 'Cancel' : 'Add Item'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white/60 rounded-xl p-5 mb-6 shadow-sm border border-white/40 animate-fade-in">
                    <h3 className="text-lg font-bold text-primary mb-4">Add New Event</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="text"
                                placeholder="e.g., Friday, 11th July 2025"
                                className="w-full p-2 rounded-lg glass-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                                value={newItem.date}
                                onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                            <input
                                type="text"
                                placeholder="e.g., Flight to London"
                                className="w-full p-2 rounded-lg glass-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                                value={newItem.title}
                                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g., 07:00"
                                className="w-full p-2 rounded-lg glass-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                                value={newItem.time}
                                onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g., Departure from Edinburgh"
                                className="w-full p-2 rounded-lg glass-input focus:outline-none focus:ring-2 focus:ring-primary/50"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleAddItem}
                        className="w-full glass-button py-2 rounded-lg font-bold"
                    >
                        Save Event
                    </button>
                </div>
            )}

            <div className="space-y-6">
                {itinerary.map((item, index) => (
                    <div key={index} className="bg-white/60 rounded-xl p-5 shadow-sm border border-white/40 hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-primary-dark mb-3 flex items-center gap-2">
                            <span className="bg-primary/10 p-1 rounded text-sm text-primary-dark">{item.date}</span>
                            {item.title}
                        </h3>

                        <div className="space-y-2 text-gray-700">
                            {item.details?.map((detail: any, i: number) => (
                                <div key={i} className="flex gap-2">
                                    <span className="font-bold min-w-[100px] text-primary">{detail.time}:</span>
                                    <span>{detail.description}</span>
                                </div>
                            ))}
                        </div>

                        {item.flight && (
                            <div className="mt-4 bg-blue-50/80 p-4 rounded-lg border border-blue-100">
                                <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
                                    <Plane className="w-5 h-5" /> Flight Details
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                    <p><strong>Flight:</strong> {item.flight.airline} {item.flight.number}</p>
                                    <p><strong>Route:</strong> {item.flight.departure} → {item.flight.arrival}</p>
                                    <p><strong>Confirmation:</strong> {item.flight.confirmation}</p>
                                    <p className="col-span-1 md:col-span-2"><strong>Notes:</strong> {item.flight.notes}</p>
                                </div>
                            </div>
                        )}

                        {/* Add other sections like shopping, connecting flights etc. similarly */}
                        {item.shopping && (
                            <div className="mt-3 pl-4 border-l-4 border-pink-300">
                                <div className="flex items-center gap-2 text-pink-600 font-bold mb-1">
                                    <ShoppingBag className="w-4 h-4" /> Shopping
                                </div>
                                {item.shopping.map((shop: any, i: number) => (
                                    <p key={i} className="text-sm"><strong className="text-pink-500">{shop.time}:</strong> {shop.description}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                {itinerary.length === 0 && <p className="text-center text-gray-500 italic">No itinerary items found.</p>}
            </div>
        </section>
    );
}
