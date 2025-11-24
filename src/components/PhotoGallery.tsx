'use client';
import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

interface PhotoGalleryProps {
    photos: string[];
    onUpdate: (newPhotos: string[]) => void;
}

export default function PhotoGallery({ photos, onUpdate }: PhotoGalleryProps) {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // In a real app, upload to Firebase Storage and get URL
                // For now, storing base64 (limitations apply)
                onUpdate([...photos, base64String]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section id="photos" className="glass-panel p-6 mb-8">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/30 pb-2">
                <Camera className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-montserrat font-bold text-primary">Photo Dump</h2>
            </div>

            <div className="mb-6">
                <label className="glass-button cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold">
                    <Upload className="w-5 h-5" />
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-md border-2 border-white/50 hover:scale-105 transition-transform">
                        <img src={photo} alt={`Trip photo ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                ))}
                {photos.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500 bg-white/30 rounded-xl border-dashed border-2 border-gray-300">
                        <p>No photos uploaded yet. Get snapping!</p>
                    </div>
                )}
            </div>
        </section>
    );
}
