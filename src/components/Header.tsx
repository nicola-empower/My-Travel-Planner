import Link from 'next/link';

export default function Header() {
    return (
        <>
            <header className="bg-primary/90 text-white py-5 text-center shadow-md backdrop-blur-sm">
                <h1 className="text-4xl md:text-5xl font-dancing text-white drop-shadow-md">My Wee Wander Planner</h1>
            </header>

            <nav className="flex flex-wrap justify-center bg-gray-800/80 p-3 rounded-xl mx-auto my-4 max-w-4xl shadow-lg backdrop-blur-md sticky top-4 z-50">
                <Link href="#itinerary" className="text-white no-underline px-4 py-2 mx-1 rounded-lg transition-colors hover:bg-primary font-bold">Itinerary</Link>
                <Link href="#packing" className="text-white no-underline px-4 py-2 mx-1 rounded-lg transition-colors hover:bg-primary font-bold">Packing</Link>
                <Link href="#budget" className="text-white no-underline px-4 py-2 mx-1 rounded-lg transition-colors hover:bg-primary font-bold">Budget</Link>
                <Link href="#notes" className="text-white no-underline px-4 py-2 mx-1 rounded-lg transition-colors hover:bg-primary font-bold">Notes</Link>
                <Link href="#documents" className="text-white no-underline px-4 py-2 mx-1 rounded-lg transition-colors hover:bg-primary font-bold">Documents</Link>
                <Link href="#photos" className="text-white no-underline px-4 py-2 mx-1 rounded-lg transition-colors hover:bg-primary font-bold">Photos</Link>
            </nav>
        </>
    );
}
