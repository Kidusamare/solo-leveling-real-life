# Solo Leveling: Real Life 🎮

A gamified self-improvement web application that transforms daily habits and goals into an RPG-style progression system. Users level up by completing real-life quests, manage weekly habits, and track their personal growth journey. Inspired by the *Solo Leveling* manhwa, this app brings game mechanics to real-world productivity.

![Solo Leveling Real Life Dashboard](https://img.shields.io/badge/Status-Production%20Ready-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-cyan)

## 🌟 Key Features

### 🎯 **Quest Management System**
- **Daily Quest Tracker**: Complete quests to earn XP and level up
- **Smart Quest Generation**: AI-powered quest suggestions based on your goals
- **Context-Aware Recommendations**: Intelligent advice to prevent overwhelm
- **Custom Quest Creation**: Add your own personalized quests
- **Quest Removal**: Delete quests you no longer need

### 📅 **Weekly Habit Calendar**
- **Visual Calendar Layout**: 7-day grid showing Monday through Sunday
- **Flexible Scheduling**: Set habits for specific days (e.g., "Clean room on Sundays", "Run on Mon/Wed/Fri")
- **Habit Completion Tracking**: Check off habits as you complete them daily
- **Weekly Progress Summary**: View completion statistics and goals
- **Full CRUD Operations**: Create, edit, and delete habits with ease

### 🎯 **Goal Management**
- **Habit Goals**: Long-term behavioral changes (daily study, exercise)
- **Material Goals**: Achievement-based objectives (buy laptop, learn skill)
- **AI Quest Generation**: Convert goals into actionable daily quests
- **Smart Advice System**: Get contextual tips to stay motivated

### 🎮 **RPG Progression System**
- **XP & Leveling**: Gain experience points and level up by completing quests
- **Attribute System**: Five core stats (Mindset, Health & Wellness, Charisma, Spirituality, Education)
- **Stat Progression**: Quests boost specific attributes based on their nature
- **Visual Progress Tracking**: Circular progress bars and level displays

### 🔐 **User Authentication & Persistence**
- **Firebase Authentication**: Secure login and registration system
- **Cloud Data Storage**: All progress synced across devices via Firestore
- **Real-time Updates**: Changes save automatically
- **User Profiles**: Personalized experience with individual progress tracking

### 🎨 **Modern UI/UX**
- **Glass Morphism Design**: Modern, translucent interface elements
- **Dark/Light Theme Support**: Customizable theme preferences
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Polished interactions and transitions
- **Neon Glow Effects**: Cyberpunk-inspired visual feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Firebase project (for authentication and database)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/solo-leveling-real-life.git
   cd solo-leveling-real-life
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Firebase Setup**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication with Email/Password
   - Create a Firestore database
   - Add your web app and copy the config keys to `.env`

5. **Start the development server**
   ```bash
   npm start
   ```

6. **View the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser


## 📱 How to Use

### Getting Started
1. **Sign Up/Login**: Create an account to get started
2. **Dashboard Overview**: View your current level, XP, attributes, and daily quests
3. **Complete Quests**: Check off quests as you complete them to earn XP

### Managing Goals
1. **Navigate to Goals**: Click "Manage Goals" from the dashboard
2. **Add Goals**: Create habit goals (daily activities) or material goals (achievements)
3. **Generate Quests**: Click "Quests" button to convert goals into actionable tasks
4. **Smart Advice**: Receive contextual tips to optimize your goal management

### Weekly Habits
1. **Access Calendar**: Click "Weekly Habits" from the dashboard
2. **Create Habits**: Add habits with specific day schedules
   - Example: "Clean room (1/week on Sundays)"
   - Example: "Exercise (3/week on Mon, Wed, Fri)"
3. **Track Progress**: Check off habits on their scheduled days
4. **View Summary**: Monitor your weekly completion rates

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern component-based UI framework
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, customizable icon library
- **React Hot Toast** - Elegant notification system
- **React Router** - Client-side routing and navigation

### Backend & Services
- **Firebase Authentication** - Secure user authentication
- **Firestore Database** - NoSQL cloud database for real-time data
- **OpenAI API** - AI-powered quest generation and advice system

### Development Tools
- **Create React App** - Zero-config React development environment
- **ESLint** - Code linting and quality assurance
- **Git** - Version control and collaboration

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── GoalManagement.js    # Goal creation and management
│   ├── WeeklyCalendar.js    # Habit calendar interface
│   └── Settings.js          # User preferences
├── hooks/              # Custom React hooks
│   └── useTheme.js         # Theme management
├── firebase.js         # Firebase configuration
├── firestoreHelpers.js # Database utility functions
├── openaiHelpers.js    # AI integration utilities
├── App.js             # Main dashboard component
├── Router.js          # Application routing
└── index.js           # Application entry point
```

## 🎯 Features in Detail

### Quest System
- **Dynamic Generation**: AI creates contextual quests from your goals
- **XP Calculation**: Earn 10-100 XP based on task difficulty
- **Attribute Bonuses**: Each quest boosts specific character attributes
- **Completion Tracking**: Visual feedback with animations and progress bars

### Goal Management
- **Two Goal Types**: Differentiate between habits and material goals
- **Smart Recommendations**: AI analyzes your current load and provides advice
- **Context Awareness**: Prevents quest overwhelm with intelligent suggestions
- **Firebase Integration**: All goals sync across devices in real-time

### Weekly Calendar
- **Flexible Scheduling**: Set habits for any combination of days
- **Visual Progress**: Clear indicators for completed vs. pending habits
- **Week-based Tracking**: Each week's progress is tracked separately
- **Responsive Grid**: Mobile-optimized calendar layout

### Progression System
- **Five Attributes**: Mindset, Health & Wellness, Charisma, Spirituality, Education
- **Level Progression**: XP thresholds increase with each level
- **Visual Feedback**: Animated attribute circles and level-up effects
- **Persistent Progress**: All advancement saved to your profile

## 🚧 Future Enhancements

- **Social Features**: Friend system and leaderboards
- **Advanced Analytics**: Detailed progress reports and insights
- **Mobile App**: React Native version for iOS and Android
- **Gamification**: Achievements, badges, and special challenges
- **Integration**: Connect with fitness trackers and productivity apps
- **Team Challenges**: Collaborative goals and group competitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Bemnet Beshah** - Full Stack Developer

---

*Transform your daily routine into an epic quest. Level up your life, one quest at a time.* ⚡