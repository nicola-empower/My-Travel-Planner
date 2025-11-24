'use client';
import { useState } from 'react';
import { FileText, Link as LinkIcon, Save } from 'lucide-react';

interface DocumentsProps {
    documents: {
        passportNumber: string;
        passportExpiry: string;
        travelInsurance: string;
        localEmergency: string;
        importantLinks: { description: string; url: string }[];
    };
    onUpdate: (newDocs: any) => void;
}

export default function Documents({ documents, onUpdate }: DocumentsProps) {
    const [docs, setDocs] = useState(documents);
    const [linkDesc, setLinkDesc] = useState('');
    const [linkUrl, setLinkUrl] = useState('');

    const handleChange = (field: string, value: string) => {
        setDocs({ ...docs, [field]: value });
    };

    const handleSaveDocs = () => {
        onUpdate(docs);
    };

    const addLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (!linkDesc || !linkUrl) return;
        const newLinks = [...(docs.importantLinks || []), { description: linkDesc, url: linkUrl }];
        const newDocs = { ...docs, importantLinks: newLinks };
        setDocs(newDocs);
        onUpdate(newDocs);
        setLinkDesc('');
        setLinkUrl('');
    };

    return (
        <section id="documents" className="glass-panel p-6 mb-8">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/30 pb-2">
                <FileText className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-montserrat font-bold text-primary">Essential Documents</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Passport Number:</label>
                    <input
                        type="text"
                        value={docs.passportNumber || ''}
                        onChange={(e) => handleChange('passportNumber', e.target.value)}
                        className="glass-input w-full p-2 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block font-bold text-gray-700 mb-1">Passport Expiry:</label>
                    <input
                        type="date"
                        value={docs.passportExpiry || ''}
                        onChange={(e) => handleChange('passportExpiry', e.target.value)}
                        className="glass-input w-full p-2 rounded-lg"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Travel Insurance:</label>
                    <textarea
                        value={docs.travelInsurance || ''}
                        onChange={(e) => handleChange('travelInsurance', e.target.value)}
                        className="glass-input w-full p-2 rounded-lg h-20"
                        placeholder="Policy number, company name..."
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block font-bold text-gray-700 mb-1">Local Emergency Numbers:</label>
                    <textarea
                        value={docs.localEmergency || ''}
                        onChange={(e) => handleChange('localEmergency', e.target.value)}
                        className="glass-input w-full p-2 rounded-lg h-20"
                        placeholder="Police, Ambulance..."
                    />
                </div>
                <div className="md:col-span-2">
                    <button onClick={handleSaveDocs} className="glass-button px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Save className="w-4 h-4" /> Save Documents
                    </button>
                </div>
            </div>

            <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-xl text-gray-700 mb-4 flex items-center gap-2">
                    <LinkIcon className="w-5 h-5" /> Important Links
                </h3>
                <form onSubmit={addLink} className="flex flex-col md:flex-row gap-3 mb-4">
                    <input
                        type="text"
                        value={linkDesc}
                        onChange={(e) => setLinkDesc(e.target.value)}
                        placeholder="Description (e.g. Hotel Booking)"
                        className="glass-input flex-1 p-2 rounded-lg"
                    />
                    <input
                        type="url"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        placeholder="URL"
                        className="glass-input flex-1 p-2 rounded-lg"
                    />
                    <button type="submit" className="glass-button px-4 py-2 rounded-lg font-bold">Add Link</button>
                </form>
                <ul className="space-y-2">
                    {docs.importantLinks?.map((link, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
                                <LinkIcon className="w-3 h-3" /> {link.description}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
