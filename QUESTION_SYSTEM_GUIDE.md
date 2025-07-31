# 🎯 Complete Question System Guide

## 📋 **Current Question Mapping (Levels 1-10)**

| Level | Question ID | Title | Difficulty | Topic |
|-------|-------------|-------|------------|-------|
| 1 | 1 | Array Basics - 1 | Easy | Arrays |
| 2 | 2 | Two Pointers - 1 | Easy | Arrays |
| 3 | 3 | Sliding Window - 1 | Medium | Arrays |
| 4 | 4 | Binary Search - 1 | Medium | Search |
| 5 | 5 | Valid Parentheses | Easy | Stack |
| 6 | 6 | First Non-Repeating | Medium | Queue |
| 7 | 7 | Reverse Linked List | Easy | Linked List |
| 8 | 8 | Inorder Traversal | Medium | Tree |
| 9 | 9 | DFS Traversal | Medium | Graph |
| 10 | 10 | Fibonacci Number | Easy | Dynamic Programming |

## 🔄 **How Questions Are Loaded**

### **Step 1: User Clicks Level**
```
Dashboard → Click Level 3 → SoloTaskPage(levelId=3)
```

### **Step 2: Question Loading Process**
```typescript
// In SoloTaskPage.tsx
const getProblemData = (levelId: number) => {
  const question = getQuestionById(levelId); // Gets question with ID=3
  return {
    title: question.title,        // "Sliding Window - 1"
    statement: question.statement, // Problem description
    testCases: question.testCases, // Test cases
    // ... other properties
  };
};
```

### **Step 3: Code Template Loading**
```typescript
const getCodeTemplate = (levelId: number) => {
  const question = getQuestionById(levelId); // Gets question with ID=3
  return question?.codeTemplate; // Returns Python template for sliding window
};
```

## 🚀 **How to Add More Questions**

### **Method 1: Add to Existing Database**

1. **Open**: `src/data/questions.ts`

2. **Add new question** (example for Level 11):
```typescript
{
  id: 11, // Next available ID
  title: "Bubble Sort Implementation",
  tags: ["Arrays", "Sorting"],
  difficulty: "Easy",
  statement: "Implement bubble sort algorithm to sort an array in ascending order.",
  note: "Print the array after each pass.",
  input: "First line contains N (array size). Second line contains N integers.",
  constraints: "1 <= N <= 100, -10^9 <= arr[i] <= 10^9",
  example: {
    input: "5\n64 34 25 12 22",
    output: "12 22 25 34 64"
  },
  testCases: [
    { input: "5\n64 34 25 12 22", output: "12 22 25 34 64", status: "pending" },
    { input: "3\n3 1 2", output: "1 2 3", status: "pending" }
  ],
  codeTemplate: `def bubble_sort(arr):
    """Implement bubble sort algorithm"""
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Read input
n = int(input())
arr = list(map(int, input().split()))

# Sort and print
sorted_arr = bubble_sort(arr)
print(' '.join(map(str, sorted_arr)))`,
  hint: "Use two nested loops. Compare adjacent elements and swap if needed.",
  xpReward: 400,
  timeLimit: 1800
}
```

3. **Update Dashboard** to show new level:
```typescript
// In Dashboard.tsx, add to levelData array:
{ id: 11, name: "Bubble Sort", category: "Sorting", difficulty: "Easy", xp: 400, status: "available" }
```

### **Method 2: Create Question Categories**

You can organize questions by difficulty or topic:

```typescript
// Easy Questions (Levels 1-5)
const easyQuestions = getQuestionsByDifficulty('Easy');

// Array Questions (Levels 1-3)
const arrayQuestions = getQuestionsByTag('Arrays');

// All Questions
const allQuestions = getAllQuestions();
```

### **Method 3: Dynamic Question Assignment**

Create a system that assigns random questions:

```typescript
// In SoloTaskPage.tsx
const getRandomQuestion = (levelId: number) => {
  const questions = getQuestionsByDifficulty('Easy'); // Get all easy questions
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};
```

## 📊 **Question Sources**

### **1. Create Your Own Questions**
- **Custom DSA problems**
- **Interview-style questions**
- **Educational problems**

### **2. Import from External Sources**
- **LeetCode**: Convert LeetCode problems
- **HackerRank**: Import HackerRank challenges
- **CodeForces**: Use competitive programming problems

### **3. Use Question Banks**
- **University DSA courses**
- **Programming textbooks**
- **Online coding platforms**

## 🛠️ **Advanced Question Management**

### **Question Categories System**
```typescript
// Create question categories
const questionCategories = {
  arrays: [1, 2, 3],           // Level IDs for array questions
  strings: [5, 6],             // Level IDs for string questions
  linkedLists: [7],            // Level IDs for linked list questions
  trees: [8],                  // Level IDs for tree questions
  graphs: [9],                 // Level IDs for graph questions
  dynamicProgramming: [10]     // Level IDs for DP questions
};
```

### **Progressive Difficulty System**
```typescript
// Questions organized by difficulty
const difficultyLevels = {
  beginner: [1, 2, 5, 7, 10],     // Easy questions
  intermediate: [3, 4, 6, 8, 9],  // Medium questions
  advanced: []                     // Hard questions (to be added)
};
```

### **Topic-Based Learning Paths**
```typescript
// Learning paths for different topics
const learningPaths = {
  arrays: [1, 2, 3],              // Array basics → Two pointers → Sliding window
  dataStructures: [5, 6, 7, 8, 9], // Stack → Queue → Linked List → Tree → Graph
  algorithms: [4, 10]             // Binary Search → Dynamic Programming
};
```

## 🔧 **Question Validation System**

### **Test Case Management**
```typescript
// Each question has multiple test cases
testCases: [
  { input: "5", output: "1\n2\n3\n4\n5", status: "pending" },
  { input: "3", output: "1\n2\n3", status: "pending" },
  { input: "10", output: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", status: "pending" }
]
```

### **Input Validation**
- **Format checking**: Ensures input matches expected format
- **Constraint validation**: Checks input within specified limits
- **Edge case testing**: Tests boundary conditions

### **Output Validation**
- **Exact matching**: Compares output character by character
- **Whitespace handling**: Manages newlines and spaces
- **Error detection**: Identifies runtime errors

## 📈 **Scaling the Question System**

### **Database Integration**
```typescript
// Future: Store questions in database
const getQuestionFromDB = async (levelId: number) => {
  const response = await fetch(`/api/questions/${levelId}`);
  return response.json();
};
```

### **Admin Panel**
```typescript
// Future: Admin interface for question management
const AdminPanel = () => {
  return (
    <div>
      <QuestionCreator />
      <TestCaseManager />
      <PerformanceAnalytics />
    </div>
  );
};
```

### **User Progress Tracking**
```typescript
// Track which questions user has completed
const userProgress = {
  completedQuestions: [1, 2, 5],
  currentLevel: 3,
  totalXP: 275,
  streak: 5
};
```

## 🎯 **Best Practices for Question Management**

### **Creating Good Questions**
1. **Clear Problem Statement**: Be specific and unambiguous
2. **Realistic Constraints**: Set appropriate input limits
3. **Multiple Test Cases**: Cover edge cases and normal cases
4. **Good Examples**: Show input/output clearly
5. **Helpful Hints**: Guide without giving away solution
6. **Progressive Difficulty**: Build from easy to hard

### **Question Organization**
1. **Logical Progression**: Arrange questions in learning order
2. **Topic Grouping**: Group related questions together
3. **Difficulty Scaling**: Increase complexity gradually
4. **Variety**: Mix different types of problems

### **Quality Control**
1. **Test Thoroughly**: Verify all test cases work
2. **Review Solutions**: Ensure problems are solvable
3. **User Feedback**: Collect and act on user suggestions
4. **Regular Updates**: Keep content fresh and relevant

## 🚀 **Quick Start: Add Your First Question**

### **Step 1: Add Question to Database**
```typescript
// In src/data/questions.ts, add:
{
  id: 11,
  title: "Your First Question",
  tags: ["Arrays"],
  difficulty: "Easy",
  statement: "Your problem description here...",
  // ... rest of the properties
}
```

### **Step 2: Update Dashboard**
```typescript
// In Dashboard.tsx, add to levelData:
{ id: 11, name: "Your First Question", category: "Arrays", difficulty: "Easy", xp: 400, status: "available" }
```

### **Step 3: Test the Question**
1. Start the app: `npm run dev`
2. Go to Dashboard
3. Click on the new level
4. Verify question loads correctly
5. Test the compiler with your solution

## 🎉 **Your Question System is Ready!**

You now have:
- ✅ **10 pre-built questions** covering major DSA topics
- ✅ **Easy question addition** through the database
- ✅ **Automatic question loading** based on level selection
- ✅ **Comprehensive testing** with multiple test cases
- ✅ **Scalable architecture** for future expansion

**🚀 Start adding your own questions and build the ultimate DSA learning platform!** 