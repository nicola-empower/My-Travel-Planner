'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Itinerary from '@/components/Itinerary';
import PackingList from '@/components/PackingList';
import Budget from '@/components/Budget';
import Notes from '@/components/Notes';
import Documents from '@/components/Documents';
import PhotoGallery from '@/components/PhotoGallery';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

// Define types
interface TravelData {
  itinerary: any[];
  packingList: any[];
  budget: {
    fixedCosts: any[];
    expenses: any[];
  };
  notes: {
    general: string;
    souvenirs: any[];
    kiddoInfo: any;
  };
  documentsAndLinks: any;
  photos: any[];
}

const defaultData: TravelData = {
  itinerary: [],
  packingList: [],
  budget: { fixedCosts: [], expenses: [] },
  notes: { general: '', souvenirs: [], kiddoInfo: { meals: {} } },
  documentsAndLinks: { importantLinks: [] },
  photos: []
};

export default function Home() {
  const [data, setData] = useState<TravelData>(defaultData);
  const [loading, setLoading] = useState(true);
  const userId = 'ysAsrVtD6CPB8fTVq0EQRH4A9Lx2'; // Hardcoded as per request

  useEffect(() => {
    const docRef = doc(db, 'travelPlans', userId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log("Data loaded:", docSnap.data());
        setData(docSnap.data() as TravelData);
      } else {
        console.log("No data found, initializing defaults...");
        // In a real scenario, we might want to seed this from the original hardcoded data
        // For now, we'll just keep the default state or save it
        // If we want to preserve the original data, we should have migrated it.
        // Assuming the user has data in Firebase already from the old app.
      }
      setLoading(false);
    }, (error) => {
      console.error("Error loading data:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveData = async (newData: TravelData) => {
    setData(newData); // Optimistic update
    try {
      await setDoc(doc(db, 'travelPlans', userId), newData);
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-pink-300">
        <div className="text-white text-2xl font-dancing animate-bounce">Loading your adventure...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />

      <Dashboard itinerary={data.itinerary} />

      <Itinerary
        itinerary={data.itinerary}
        onUpdate={(newItinerary) => saveData({ ...data, itinerary: newItinerary })}
      />

      <PackingList
        packingList={data.packingList || []}
        onUpdate={(newList) => saveData({ ...data, packingList: newList })}
      />

      <Budget
        budget={data.budget || { fixedCosts: [], expenses: [] }}
        onUpdate={(newBudget) => saveData({ ...data, budget: newBudget })}
      />

      <Notes
        notes={data.notes || { general: '', souvenirs: [], kiddoInfo: {} }}
        onUpdate={(newNotes) => saveData({ ...data, notes: newNotes })}
      />

      <Documents
        documents={data.documentsAndLinks || {}}
        onUpdate={(newDocs) => saveData({ ...data, documentsAndLinks: newDocs })}
      />

      <PhotoGallery
        photos={data.photos || []}
        onUpdate={(newPhotos) => saveData({ ...data, photos: newPhotos })}
      />

      <footer className="mt-12 text-center text-white/80 p-4 bg-gray-900/50 rounded-lg backdrop-blur-sm">
        <p>© 2025 My Wee Wander Planner. Nicola Berry</p>
      </footer>
    </main>
  );
}
