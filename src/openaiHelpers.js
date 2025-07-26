import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Store in .env file
  dangerouslyAllowBrowser: true // Note: In production, this should be handled server-side
});

export async function getQuestSuggestions(goalText, goalType = "habit", existingQuests = [], userGoals = []) {
  // Context analysis
  const totalQuests = existingQuests.length;
  const completedQuests = existingQuests.filter(q => q.completed).length;
  const questsFromGoal = existingQuests.filter(q => q.sourceGoal === goalText).length;
  const totalGoals = userGoals.length;
  
  // Determine appropriate number of quests and advice
  let questCount = 2; // Default for habit goals
  let contextAdvice = "";
  
  if (goalType === "material") {
    questCount = 3;
  } else if (goalType === "habit") {
    // For habit goals, be more conservative
    if (questsFromGoal >= 2) {
      questCount = 1;
      contextAdvice = "You already have quests for this goal. Adding one focused quest to maintain momentum.";
    } else if (totalQuests >= 8) {
      questCount = 1;
      contextAdvice = "You have many active quests. Consider focusing on fewer goals to stay motivated.";
    } else if (totalGoals >= 5) {
      questCount = 1;
      contextAdvice = "You have many goals. Consider setting realistic expectations and focusing on consistency.";
    }
  }
  
  const prompt = `The user has a ${goalType} goal: "${goalText}". 

Context:
- Total active quests: ${totalQuests}
- Completed quests: ${completedQuests}
- Existing quests for this goal: ${questsFromGoal}
- Total goals: ${totalGoals}

Suggest ${questCount} specific daily quests that help with this goal. Each quest should be actionable, measurable, and realistic for daily completion.

Requirements:
- Each quest should include an XP value (10-100, higher for more challenging tasks)
- Each quest should target one relevant attribute: mindset, healthWellness, charisma, spirituality, or education
- Quests should be specific and actionable (not vague like "study more")
- Consider the user's current quest load when suggesting difficulty
- Return valid JSON format

Return JSON like this exact format:
[
  { "text": "Review notes for 1 hour", "xp": 25, "stats": { "education": 3 } },
  { "text": "Attend office hours", "xp": 30, "stats": { "charisma": 2 } }
]

Only return the JSON array, no other text.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;

    try {
      const quests = JSON.parse(content);
      
      // Validate and format the quests
      const formattedQuests = quests.map((quest, index) => ({
        id: Date.now() + index, // Generate unique ID
        text: quest.text,
        xp: parseInt(quest.xp) || 20,
        stats: quest.stats || { education: 1 }, // Default to education if no stats provided
        completed: false,
        aiGenerated: true, // Flag to identify AI-generated quests
        sourceGoal: goalText
      }));
      
      return { quests: formattedQuests, advice: contextAdvice };
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", parseError);
      console.error("Raw response:", content);
      return { quests: [], advice: "" };
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate quest suggestions. Please try again.");
  }
}

// Helper function to validate quest format
export function validateQuestFormat(quest) {
  return (
    quest &&
    typeof quest.text === "string" &&
    quest.text.length > 0 &&
    typeof quest.xp === "number" &&
    quest.xp >= 10 &&
    quest.xp <= 100 &&
    quest.stats &&
    typeof quest.stats === "object"
  );
}

// Fallback quests if OpenAI fails
export function getFallbackQuests(goalText, goalType = "habit", existingQuests = [], userGoals = []) {
  const totalQuests = existingQuests.length;
  const questsFromGoal = existingQuests.filter(q => q.sourceGoal === goalText).length;
  const totalGoals = userGoals.length;
  
  let advice = "";
  if (totalQuests >= 8) {
    advice = "You have many active quests. Consider focusing on fewer goals to stay motivated and build consistent habits.";
  } else if (totalGoals >= 5) {
    advice = "You have many goals. Consider setting realistic expectations to avoid burnout and maintain motivation.";
  } else if (questsFromGoal >= 2) {
    advice = "You already have quests for this goal. Focus on completing existing quests before adding more.";
  }
  
  const fallbackQuests = {
    habit: [
      { text: `Set aside 30 minutes for ${goalText}`, xp: 20, stats: { education: 2 } },
      { text: `Create a checklist for ${goalText}`, xp: 15, stats: { mindset: 1 } }
    ],
    material: [
      { text: `Research best practices for ${goalText}`, xp: 30, stats: { education: 2 } },
      { text: `Create a plan to achieve ${goalText}`, xp: 25, stats: { mindset: 2 } },
      { text: `Set milestones for ${goalText}`, xp: 20, stats: { education: 1 } }
    ]
  };

  const baseQuests = fallbackQuests[goalType] || fallbackQuests.habit;
  
  // Limit number of quests for habit goals if they already have many
  let questsToReturn = baseQuests;
  if (goalType === "habit" && (questsFromGoal >= 2 || totalQuests >= 8)) {
    questsToReturn = baseQuests.slice(0, 1);
  }
  
  return {
    quests: questsToReturn.map((quest, index) => ({
      ...quest,
      id: Date.now() + index,
      completed: false,
      aiGenerated: false,
      sourceGoal: goalText
    })),
    advice
  };
} 