# Weekly Calendar Features

## 📅 **Weekly Habit Tracker**

### **Key Features:**

#### **1. Smart Habit Scheduling**
- **Flexible Frequency**: Set habits for specific days (e.g., "Clean room" on Sundays, "Run" on Mon/Wed/Fri)
- **Custom Patterns**: Choose any combination of days for each habit
- **Visual Day Selection**: Click days of the week when creating habits

#### **2. Calendar Grid Layout**
- **7-Day View**: Full week layout with Monday-Sunday columns
- **Today Highlighting**: Current day is highlighted with accent border
- **Date Display**: Shows month/day for each column
- **Responsive Design**: Adapts to different screen sizes

#### **3. Habit Management**
- **Add Habits**: Click "Add Habit" button to create new weekly habits
- **Edit Habits**: Edit existing habits (name and days)
- **Delete Habits**: Remove habits you no longer need
- **Habit Examples**:
  - Clean room (1/week on Sundays)
  - Exercise (3/week on Mon, Wed, Fri)
  - Read (daily)
  - Meal prep (2/week on Sun, Wed)

#### **4. Progress Tracking**
- **Daily Completion**: Check off habits as you complete them each day
- **Weekly Persistence**: Completions are tracked per week
- **Visual Progress**: Completed habits show with checkmarks and reduced opacity
- **Week Summary**: See total habits, completed count, and weekly goals

#### **5. Data Persistence**
- **Firebase Storage**: All habits and completions saved to your account
- **Week-based Tracking**: Each week's progress is tracked separately
- **Auto-save**: Changes are automatically saved as you interact

#### **6. User Experience**
- **Modal Forms**: Clean popup forms for adding/editing habits
- **Toast Notifications**: Success messages for actions
- **Glass Morphism UI**: Consistent with app design
- **Smooth Animations**: Hover effects and transitions

### **How to Use:**

1. **Navigate to Calendar**: Click "Weekly Habits" from the main dashboard
2. **Add a Habit**: 
   - Click "Add Habit"
   - Enter habit name (e.g., "Morning jog")
   - Select days when you want to do this habit
   - Click "Add Habit"
3. **Complete Habits**: Check the boxes next to habits on their scheduled days
4. **Edit/Delete**: Use the edit and trash icons on habit cards
5. **Track Progress**: View your weekly summary at the bottom

### **Data Structure:**

```javascript
// Habit Object
{
  id: 1234567890,
  name: "Clean room",
  days: ["sunday"],           // Array of day keys
  frequency: 1,               // Number of days per week
  totalPerWeek: 1,           // Same as frequency
  createdAt: "2024-01-01T00:00:00.000Z"
}

// Completion Tracking
// Key format: "{habitId}-{dayKey}-{weekStartDate}"
habitCompletions: {
  "1234567890-sunday-2024-01-01": true,
  "1234567890-monday-2024-01-01": false
}
```

### **Benefits:**
- **Consistency**: Visual reminder of which habits to do each day
- **Flexibility**: Different habits can have different schedules
- **Motivation**: See your progress throughout the week
- **Organization**: Clear separation between daily and weekly goals
- **Accountability**: Track completion rates over time

The Weekly Calendar integrates seamlessly with your existing quest and goal system, providing a dedicated space for recurring weekly habits while maintaining the gamification elements of the main app.