# 📚 Questions Management Guide

## 🎯 **How to Get Questions in CrackAlgo**

### **Current System Overview**
Your CrackAlgo platform now has a **comprehensive question management system** with 10 pre-built DSA problems covering various difficulty levels and topics!

## 📋 **Available Questions (Levels 1-10)**

### **🎯 Level 1: Array Basics**
- **Problem**: Print numbers from 1 to N
- **Difficulty**: Easy
- **Tags**: Arrays, Looping
- **XP Reward**: 50

### **🎯 Level 2: Two Pointers**
- **Problem**: Find two numbers that sum to target
- **Difficulty**: Easy
- **Tags**: Arrays, Two Pointers
- **XP Reward**: 75

### **🎯 Level 3: Sliding Window**
- **Problem**: Maximum sum of subarray of size K
- **Difficulty**: Medium
- **Tags**: Arrays, Sliding Window
- **XP Reward**: 100

### **🎯 Level 4: Binary Search**
- **Problem**: Find target in sorted array
- **Difficulty**: Medium
- **Tags**: Search, Binary Search
- **XP Reward**: 125

### **🎯 Level 5: Stack Operations**
- **Problem**: Valid Parentheses
- **Difficulty**: Easy
- **Tags**: Stack, String
- **XP Reward**: 150

### **🎯 Level 6: Queue Operations**
- **Problem**: First Non-Repeating Character
- **Difficulty**: Medium
- **Tags**: Queue, String, Hash Map
- **XP Reward**: 175

### **🎯 Level 7: Linked List**
- **Problem**: Reverse Linked List
- **Difficulty**: Easy
- **Tags**: Linked List, Recursion
- **XP Reward**: 200

### **🎯 Level 8: Tree Traversal**
- **Problem**: Inorder Traversal
- **Difficulty**: Medium
- **Tags**: Tree, Recursion, DFS
- **XP Reward**: 250

### **🎯 Level 9: Graph Basics**
- **Problem**: DFS Traversal
- **Difficulty**: Medium
- **Tags**: Graph, DFS, Adjacency List
- **XP Reward**: 300

### **🎯 Level 10: Dynamic Programming**
- **Problem**: Fibonacci Number
- **Difficulty**: Easy
- **Tags**: Dynamic Programming, Recursion
- **XP Reward**: 350

## 🔧 **How Questions Work**

### **1. Question Structure**
Each question contains:
- **Title**: Descriptive name
- **Tags**: Categories (Arrays, Stack, etc.)
- **Difficulty**: Easy/Medium/Hard/Expert
- **Statement**: Problem description
- **Note**: Important clarifications
- **Input**: Input format specification
- **Constraints**: Problem limits
- **Example**: Sample input/output
- **Test Cases**: Multiple test scenarios
- **Code Template**: Starting code
- **Hint**: Solution guidance
- **XP Reward**: Points earned
- **Time Limit**: Maximum execution time

### **2. Accessing Questions**
1. **Dashboard**: Click on any level (1-10)
2. **SoloTaskPage**: Automatically loads the question
3. **Problem Panel**: Left side shows question details
4. **Code Editor**: Right side for writing solutions

### **3. Question Flow**
```
Dashboard → Click Level → SoloTaskPage → Question + Code Editor
```

## 🚀 **How to Add New Questions**

### **Method 1: Add to Questions Database**

1. **Open the file**: `src/data/questions.ts`

2. **Add a new question object**:
```typescript
{
  id: 11, // Next available ID
  title: "Your Problem Title",
  tags: ["Arrays", "Sorting"],
  difficulty: "Medium",
  statement: "Your problem description...",
  note: "Important notes...",
  input: "Input format...",
  constraints: "1 <= N <= 10^5",
  example: {
    input: "sample input",
    output: "expected output"
  },
  testCases: [
    { input: "test1", output: "result1", status: "pending" },
    { input: "test2", output: "result2", status: "pending" }
  ],
  codeTemplate: `# Your code template
def solve_problem():
    pass`,
  hint: "Your hint here...",
  xpReward: 200,
  timeLimit: 1800
}
```

### **Method 2: Create Question Categories**

You can organize questions by:
- **Difficulty**: Easy, Medium, Hard, Expert
- **Tags**: Arrays, Stack, Tree, Graph, etc.
- **Topics**: Data Structures, Algorithms, etc.

### **Method 3: Import from External Sources**

You can import questions from:
- **LeetCode**: Convert LeetCode problems
- **HackerRank**: Import HackerRank challenges
- **Custom**: Create your own problems

## 📊 **Question Management Features**

### **Helper Functions Available**
```typescript
// Get question by ID
const question = getQuestionById(1);

// Get questions by difficulty
const easyQuestions = getQuestionsByDifficulty('Easy');

// Get questions by tag
const arrayQuestions = getQuestionsByTag('Arrays');

// Get all questions
const allQuestions = getAllQuestions();
```

### **Question Validation**
- **Syntax checking**: Validates code before execution
- **Test case validation**: Ensures correct input/output
- **Performance tracking**: Measures execution time
- **Error handling**: Provides clear error messages

## 🎮 **How Users Get Questions**

### **Step-by-Step Process**

1. **Login to Dashboard**
   - User logs in and sees the level map
   - Available levels are highlighted
   - Locked levels show 🔒 icon

2. **Select a Level**
   - Click on any available level box
   - System navigates to SoloTaskPage
   - Question loads automatically

3. **Read the Problem**
   - Left panel shows problem details
   - Statement, constraints, examples
   - Input/output specifications

4. **Write Solution**
   - Right panel has code editor
   - Pre-filled with code template
   - Supports Python syntax

5. **Test Solution**
   - Click "Run" to test against sample cases
   - Click "Submit" for final evaluation
   - View results and performance

6. **Get Results**
   - ✅ Passed: All test cases successful
   - ❌ Failed: Some test cases failed
   - Performance metrics shown

## 🔍 **Question Types Supported**

### **Data Structures**
- ✅ **Arrays**: Basic operations, searching, sorting
- ✅ **Strings**: Manipulation, validation
- ✅ **Stacks**: LIFO operations, parentheses matching
- ✅ **Queues**: FIFO operations, character counting
- ✅ **Linked Lists**: Node manipulation, reversal
- ✅ **Trees**: Traversal, construction
- ✅ **Graphs**: DFS, BFS, path finding

### **Algorithms**
- ✅ **Searching**: Linear, Binary search
- ✅ **Sorting**: Basic sorting algorithms
- ✅ **Two Pointers**: Array manipulation
- ✅ **Sliding Window**: Subarray problems
- ✅ **Dynamic Programming**: Optimization problems
- ✅ **Recursion**: Tree/graph traversal

## 📈 **Scaling the Question System**

### **Future Enhancements**

1. **Question Categories**
   - Beginner, Intermediate, Advanced
   - Topic-based collections
   - Company-specific problems

2. **Question Features**
   - Multiple language support
   - Video explanations
   - Discussion forums
   - Solution sharing

3. **Admin Panel**
   - Question creation interface
   - Test case management
   - Performance analytics
   - User progress tracking

## 🛠️ **Technical Implementation**

### **File Structure**
```
src/
├── data/
│   └── questions.ts          # Questions database
├── services/
│   └── CodeExecutor.ts       # Code execution engine
└── components/
    └── SoloTaskPage.tsx      # Question interface
```

### **Data Flow**
```
Questions Database → SoloTaskPage → CodeExecutor → Results
```

## 🎯 **Best Practices**

### **Creating Good Questions**
1. **Clear Problem Statement**: Be specific and unambiguous
2. **Realistic Constraints**: Set appropriate limits
3. **Multiple Test Cases**: Cover edge cases
4. **Good Examples**: Show input/output clearly
5. **Helpful Hints**: Guide without giving away solution
6. **Progressive Difficulty**: Build from easy to hard

### **Managing Questions**
1. **Regular Updates**: Add new questions periodically
2. **Quality Control**: Test all questions thoroughly
3. **User Feedback**: Collect and act on user suggestions
4. **Performance Monitoring**: Track success rates
5. **Content Diversity**: Cover various topics and difficulty levels

---

## 🎉 **Ready to Use!**

Your CrackAlgo platform now has a **complete question management system** with:
- ✅ **10 pre-built questions** covering major DSA topics
- ✅ **Easy question addition** through the database
- ✅ **Automatic question loading** based on level selection
- ✅ **Comprehensive testing** with multiple test cases
- ✅ **Performance tracking** and error handling
- ✅ **Scalable architecture** for future expansion

**🚀 Start coding! Click on any level in the Dashboard to access questions!** 