'use client';
import { useState } from 'react';
import { Wallet, PlusCircle } from 'lucide-react';

interface Expense {
    description: string;
    amount: number;
    category?: string;
}

interface BudgetProps {
    budget: {
        fixedCosts: Expense[];
        expenses: Expense[];
    };
    onUpdate: (newBudget: any) => void;
}

export default function Budget({ budget, onUpdate }: BudgetProps) {
    const [desc, setDesc] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const totalFixed = budget.fixedCosts.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalVariable = budget.expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

    const addExpense = (e: React.FormEvent) => {
        e.preventDefault();
        if (!desc || !amount) return;

        const newExpense = { description: desc, amount: parseFloat(amount), category };
        const newBudget = {
            ...budget,
            expenses: [...budget.expenses, newExpense]
        };
        onUpdate(newBudget);

        setDesc('');
        setAmount('');
        setCategory('');
    };

    return (
        <section id="budget" className="glass-panel p-6 mb-8">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-primary/30 pb-2">
                <Wallet className="text-primary w-8 h-8" />
                <h2 className="text-3xl font-montserrat font-bold text-primary">Budget Tracker</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/60 p-4 rounded-xl text-center shadow-sm">
                    <h3 className="text-gray-600 font-bold mb-1">Total Fixed Costs</h3>
                    <p className="text-2xl font-bold text-primary">£{totalFixed.toFixed(2)}</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl text-center shadow-sm">
                    <h3 className="text-gray-600 font-bold mb-1">Total Variable Spending</h3>
                    <p className="text-2xl font-bold text-pink-600">£{totalVariable.toFixed(2)}</p>
                </div>
            </div>

            <form onSubmit={addExpense} className="bg-white/40 p-5 rounded-xl mb-6">
                <h3 className="font-bold text-lg mb-3 text-gray-700">Add New Expense</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Description"
                        className="glass-input p-2 rounded-lg"
                        required
                    />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount (£)"
                        step="0.01"
                        className="glass-input p-2 rounded-lg"
                        required
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="glass-input p-2 rounded-lg"
                    >
                        <option value="">Select Category</option>
                        <option value="meals">Meals & Drinks</option>
                        <option value="shopping">Shopping</option>
                        <option value="activities">Activities</option>
                        <option value="transport">Transport</option>
                        <option value="souvenirs">Souvenirs</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </select>
                </div>
                <button type="submit" className="glass-button w-full mt-3 py-2 rounded-lg font-bold flex justify-center items-center gap-2">
                    <PlusCircle className="w-5 h-5" /> Add Expense
                </button>
            </form>

            <div className="space-y-2">
                <h3 className="font-bold text-lg text-gray-700">Expense Breakdown:</h3>
                {budget.expenses.map((expense, index) => (
                    <div key={index} className="flex justify-between items-center bg-white/50 p-3 rounded-lg border-b border-white/20">
                        <span>{expense.description} <span className="text-xs text-gray-500 ml-2">({expense.category || 'General'})</span></span>
                        <span className="font-bold text-pink-600">£{Number(expense.amount).toFixed(2)}</span>
                    </div>
                ))}
                {budget.expenses.length === 0 && <p className="text-gray-500 italic text-sm">No expenses added yet.</p>}
            </div>
        </section>
    );
}
