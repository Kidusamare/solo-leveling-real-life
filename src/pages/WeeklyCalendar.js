import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { loadUserData, saveUserData } from "../firestoreHelpers";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Calendar, Plus, ArrowLeft, Check, X, Edit2, Trash2 } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { Toaster } from "react-hot-toast";

// Days of the week
const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Mon', fullName: 'Monday' },
  { key: 'tuesday', label: 'Tue', fullName: 'Tuesday' },
  { key: 'wednesday', label: 'Wed', fullName: 'Wednesday' },
  { key: 'thursday', label: 'Thu', fullName: 'Thursday' },
  { key: 'friday', label: 'Fri', fullName: 'Friday' },
  { key: 'saturday', label: 'Sat', fullName: 'Saturday' },
  { key: 'sunday', label: 'Sun', fullName: 'Sunday' }
];

// Habit Card Component
function HabitCard({ habit, dayKey, isCompleted, onToggle, onEdit, onDelete }) {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`glass-card p-3 mb-2 transition-all duration-300 hover:scale-[1.02] ${
      isCompleted ? 'opacity-60 bg-green-500/10' : 'neon-glow'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* Completion checkbox */}
          <label className="relative flex items-center cursor-pointer group">
            <input
              className="peer sr-only"
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggle(habit.id, dayKey)}
            />
            <div className="w-6 h-6 rounded-lg bg-white border-2 border-theme-accent transition-all duration-300 ease-in-out peer-checked:bg-gradient-theme peer-checked:border-0 peer-checked:rotate-12 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:opacity-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=')] after:bg-contain after:bg-no-repeat peer-checked:after:opacity-100 after:transition-opacity after:duration-300"></div>
          </label>
          
          <div className="flex-1">
            <span className={`font-medium text-sm ${
              isCompleted 
                ? `line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}` 
                : 'text-theme-primary'
            }`}>
              {habit.name}
            </span>
            <div className="text-xs text-theme-secondary mt-1">
              {habit.frequency}/{habit.totalPerWeek} per week
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(habit)}
            className="p-1 text-theme-secondary hover:text-theme-accent transition-colors"
            title="Edit habit"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-1 text-red-400 hover:text-red-300 transition-colors"
            title="Delete habit"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Add/Edit Habit Modal
function HabitModal({ isOpen, onClose, onSave, editingHabit }) {
  const { isDarkMode } = useTheme();
  const [habitName, setHabitName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingHabit) {
      setHabitName(editingHabit.name);
      setSelectedDays(editingHabit.days);
    } else {
      setHabitName("");
      setSelectedDays([]);
    }
    setError("");
  }, [editingHabit, isOpen]);

  const handleDayToggle = (dayKey) => {
    setSelectedDays(prev => 
      prev.includes(dayKey) 
        ? prev.filter(d => d !== dayKey)
        : [...prev, dayKey]
    );
  };

  const handleSave = () => {
    if (!habitName.trim()) {
      setError("Please enter a habit name");
      return;
    }
    if (selectedDays.length === 0) {
      setError("Please select at least one day");
      return;
    }

    const habitData = {
      id: editingHabit?.id || Date.now(),
      name: habitName.trim(),
      days: selectedDays,
      frequency: selectedDays.length,
      totalPerWeek: selectedDays.length,
      createdAt: editingHabit?.createdAt || new Date().toISOString()
    };

    onSave(habitData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-panel p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-theme-accent">
          {editingHabit ? 'Edit Habit' : 'Add New Habit'}
        </h3>
        
        <div className="space-y-4">
          {/* Habit Name Input */}
          <div>
            <label className="block text-sm font-medium mb-2 text-theme-primary">
              Habit Name
            </label>
            <input
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="e.g., Clean room, Exercise, Read"
              className="glass-card p-3 rounded-lg text-theme-primary placeholder-theme-muted focus:outline-none focus:neon-border transition-all duration-300 w-full"
            />
          </div>

          {/* Days Selection */}
          <div>
            <label className="block text-sm font-medium mb-2 text-theme-primary">
              Select Days ({selectedDays.length}/week)
            </label>
            <div className="grid grid-cols-7 gap-1">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day.key}
                  onClick={() => handleDayToggle(day.key)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    selectedDays.includes(day.key)
                      ? 'bg-theme-accent text-white neon-glow'
                      : 'glass-card text-theme-secondary hover:text-theme-primary'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 glass-card text-theme-secondary hover:text-theme-primary rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-theme hover:shadow-theme-glow-hover rounded-lg font-bold text-white transition-all duration-300 neon-glow"
            >
              {editingHabit ? 'Update' : 'Add'} Habit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeeklyCalendar() {
  const { isDarkMode } = useTheme();
  const [habits, setHabits] = useState([]);
  const [habitCompletions, setHabitCompletions] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Get current week dates
  const getCurrentWeek = () => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const currentWeek = getCurrentWeek();
  const weekKey = currentWeek[0].toISOString().split('T')[0]; // Use Monday's date as week identifier

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await loadUserData(user.uid);
          if (data) {
            setHabits(data.weeklyHabits || []);
            setHabitCompletions(data.habitCompletions || {});
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load habits");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save data to Firebase
  const saveData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userData = await loadUserData(user.uid);
      await saveUserData(user.uid, {
        ...userData,
        weeklyHabits: habits,
        habitCompletions: habitCompletions
      });
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data");
    }
  };

  // Auto-save when data changes
  useEffect(() => {
    if (!loading && habits.length >= 0) {
      saveData();
    }
  }, [habits, habitCompletions, loading]);

  const handleAddHabit = () => {
    setEditingHabit(null);
    setShowModal(true);
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setShowModal(true);
  };

  const handleSaveHabit = (habitData) => {
    if (editingHabit) {
      setHabits(prev => prev.map(h => h.id === habitData.id ? habitData : h));
      toast.success(`Updated habit: "${habitData.name}"`);
    } else {
      setHabits(prev => [...prev, habitData]);
      toast.success(`Added habit: "${habitData.name}"`);
    }
  };

  const handleDeleteHabit = (habitId) => {
    const habit = habits.find(h => h.id === habitId);
    setHabits(prev => prev.filter(h => h.id !== habitId));
    
    // Remove completions for this habit
    const updatedCompletions = { ...habitCompletions };
    Object.keys(updatedCompletions).forEach(key => {
      if (key.startsWith(`${habitId}-`)) {
        delete updatedCompletions[key];
      }
    });
    setHabitCompletions(updatedCompletions);
    
    if (habit) {
      toast.success(`Deleted habit: "${habit.name}"`);
    }
  };

  const handleToggleCompletion = (habitId, dayKey) => {
    const completionKey = `${habitId}-${dayKey}-${weekKey}`;
    setHabitCompletions(prev => ({
      ...prev,
      [completionKey]: !prev[completionKey]
    }));
  };

  // Get habits for a specific day
  const getHabitsForDay = (dayKey) => {
    return habits.filter(habit => habit.days.includes(dayKey));
  };

  // Check if habit is completed for a specific day
  const isHabitCompleted = (habitId, dayKey) => {
    const completionKey = `${habitId}-${dayKey}-${weekKey}`;
    return habitCompletions[completionKey] || false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-base flex items-center justify-center">
        <div className="glass-panel p-8 flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-theme-primary font-medium">Loading calendar...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-base text-theme-primary p-4 sm:p-6 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className={`fixed inset-0 ${isDarkMode ? 'bg-gradient-theme-radial-opacity-05' : 'bg-gradient-theme-radial-opacity-1'} pointer-events-none`}></div>
      <div className={`fixed top-0 right-0 w-96 h-96 ${isDarkMode ? 'bg-theme-accent opacity-20' : 'bg-theme-accent opacity-10'} rounded-full blur-3xl pointer-events-none`}></div>
      <div className={`fixed bottom-0 left-0 w-96 h-96 ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/1'} rounded-full blur-3xl pointer-events-none`}></div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            color: isDarkMode ? '#fff' : '#1a1a1a',
            backdropFilter: 'blur(10px)',
            border: `1px solid var(--theme-border)`,
          },
        }}
      />

      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 glass-card rounded-lg hover:neon-glow transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-glow">Weekly Habits</h1>
              <p className="text-theme-secondary">Track your weekly habits</p>
            </div>
          </div>
          
          <button
            onClick={handleAddHabit}
            className="bg-gradient-theme hover:shadow-theme-glow-hover rounded-lg font-bold text-white px-4 py-2 transition-all duration-300 neon-glow flex items-center gap-2"
          >
            <Plus size={18} />
            Add Habit
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {DAYS_OF_WEEK.map((day, index) => {
            const date = currentWeek[index];
            const dayHabits = getHabitsForDay(day.key);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={day.key}
                className={`glass-panel p-4 ${
                  isToday ? 'border-2 border-theme-accent neon-glow' : ''
                }`}
              >
                {/* Day Header */}
                <div className="text-center mb-4">
                  <h3 className={`font-bold text-lg ${
                    isToday ? 'text-theme-accent' : 'text-theme-primary'
                  }`}>
                    {day.fullName}
                  </h3>
                  <p className="text-sm text-theme-secondary">
                    {date.getMonth() + 1}/{date.getDate()}
                  </p>
                  {isToday && (
                    <span className="inline-block px-2 py-1 bg-theme-accent/20 text-theme-accent text-xs rounded-full mt-1">
                      Today
                    </span>
                  )}
                </div>

                {/* Habits for this day */}
                <div className="space-y-2">
                  {dayHabits.length > 0 ? (
                    dayHabits.map((habit) => (
                      <HabitCard
                        key={habit.id}
                        habit={habit}
                        dayKey={day.key}
                        isCompleted={isHabitCompleted(habit.id, day.key)}
                        onToggle={handleToggleCompletion}
                        onEdit={handleEditHabit}
                        onDelete={handleDeleteHabit}
                      />
                    ))
                  ) : (
                    <div className="text-center text-theme-muted text-sm py-4">
                      No habits for {day.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        {habits.length > 0 && (
          <div className="glass-panel p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 text-theme-accent">This Week's Progress</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-primary">
                  {habits.length}
                </div>
                <div className="text-sm text-theme-secondary">Total Habits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Object.values(habitCompletions).filter(Boolean).length}
                </div>
                <div className="text-sm text-theme-secondary">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-theme-accent">
                  {habits.reduce((total, habit) => total + habit.totalPerWeek, 0)}
                </div>
                <div className="text-sm text-theme-secondary">Weekly Goals</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Habit Modal */}
      <HabitModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveHabit}
        editingHabit={editingHabit}
      />
    </div>
  );
}