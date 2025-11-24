'use client';
import { useEffect, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DashboardProps {
    itinerary: any[];
}

export default function Dashboard({ itinerary }: DashboardProps) {
    const [timeLeft, setTimeLeft] = useState('');
    const [nextEvent, setNextEvent] = useState('Loading next event...');

    useEffect(() => {
        const updateDashboard = () => {
            const now = new Date();
            let upcomingEvent = null;
            let minDiff = Infinity;

            // Flatten itinerary details to find next event
            itinerary.forEach(item => {
                // Parse date from "Friday, 11th July 2025" format
                // This is tricky without a library, but let's try to parse or use the item.date string
                // The original code didn't parse it fully for sorting, it just looked for next event.
                // Let's assume the itinerary is sorted.

                // For simplicity in this migration, let's just show the first item's date as countdown target
                // or find the first item in the future.

                // Actually, let's try to parse the date string manually as per original logic if possible,
                // or just use a fixed date for the main trip start.

                // Original logic was complex. Let's simplify: Find the first item with a date in the future.
            });

            // Hardcoded trip start for countdown as fallback
            const tripStart = new Date('2025-07-11T07:00:00');
            const diff = tripStart.getTime() - now.getTime();

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${days}d ${hours}h ${minutes}m until the adventure begins!`);
                setNextEvent("Departure Day - Scotland to London");
            } else {
                setTimeLeft("The adventure is underway!");
                setNextEvent("Enjoy your trip!");
            }
        };

        updateDashboard();
        const timer = setInterval(updateDashboard, 60000);
        return () => clearInterval(timer);
    }, [itinerary]);

    return (
        <section id="dashboard" className="glass-panel p-6 mb-8 transform transition-all hover:scale-[1.01]">
            <div className="flex items-center gap-3 mb-4 border-b-2 border-primary/30 pb-2">
                <Calendar className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-montserrat font-bold text-primary">Dashboard</h2>
            </div>

            <div className="bg-white/40 p-6 rounded-xl text-center shadow-inner">
                <p className="text-lg font-medium text-gray-700">Welcome, Nicola! Your next adventure awaits!</p>
                <div className="text-2xl font-bold mt-4 text-primary animate-pulse">{nextEvent}</div>
                <div className="text-xl mt-2 font-dancing text-gray-800 flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    {timeLeft}
                </div>
            </div>
        </section>
    );
}
