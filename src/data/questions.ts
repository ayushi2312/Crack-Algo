export interface Question {
  id: number;
  title: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  statement: string;
  note: string;
  input: string;
  constraints: string;
  example: {
    input: string;
    output: string;
  };
  testCases: {
    input: string;
    output: string;
    status: 'pending' | 'passed' | 'failed';
  }[];
  codeTemplate: string;
  hint: string;
  solution?: string;
  xpReward: number;
  coinReward: number;
  timeLimit: number; // in seconds
}

export const questionsDatabase: Question[] = [
  // Level 1: Array Basics
  {
    id: 1,
    title: "Array Basics - 1",
    tags: ["Arrays", "Looping"],
    difficulty: "Easy",
    statement: "Print numbers from 1 to N using any looping technique.",
    note: "Every number should be printed on a new line.",
    input: "A single line with integer N.",
    constraints: "1 <= N <= 1000",
    example: {
      input: "5",
      output: "1\n2\n3\n4\n5"
    },
    testCases: [
      { input: "5", output: "1\n2\n3\n4\n5", status: "pending" },
      { input: "3", output: "1\n2\n3", status: "pending" },
      { input: "10", output: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10", status: "pending" }
    ],
    codeTemplate: `def print_series(n):
    """Print the following series
    1 2 3 4 5 to n. Note print all the numbers in a separate line"""
    for i in range(1, n + 1):
        print(i)

# Test the function
n = int(input())
print_series(n)`,
    hint: "Use a for loop to iterate from 1 to N. Remember to print each number on a new line using the print() function.",
              xpReward: 50,
          coinReward: 15,
          timeLimit: 1800
  },

  // Level 2: Two Pointers
  {
    id: 2,
    title: "Two Pointers - 1",
    tags: ["Arrays", "Two Pointers"],
    difficulty: "Easy",
    statement: "Given an array of integers, find two numbers that add up to a target value.",
    note: "You may assume that each input would have exactly one solution.",
    input: "First line contains N (array size) and target. Second line contains N integers.",
    constraints: "2 <= N <= 10^4, -10^9 <= nums[i] <= 10^9",
    example: {
      input: "4 9\n2 7 11 15",
      output: "0 1"
    },
    testCases: [
      { input: "4 9\n2 7 11 15", output: "0 1", status: "pending" },
      { input: "3 6\n3 2 4", output: "1 2", status: "pending" },
      { input: "2 6\n3 3", output: "0 1", status: "pending" }
    ],
    codeTemplate: `def two_sum(nums, target):
    """Find two numbers that add up to target"""
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Read input
n, target = map(int, input().split())
nums = list(map(int, input().split()))

# Get result
result = two_sum(nums, target)
print(result[0], result[1])`,
    hint: "Use a hash map to store visited elements. For each number, check if its complement (target - num) exists in the map.",
    xpReward: 75,
    timeLimit: 1800
  },

  // Level 3: Sliding Window
  {
    id: 3,
    title: "Sliding Window - 1",
    tags: ["Arrays", "Sliding Window"],
    difficulty: "Medium",
    statement: "Given an array of integers and a window size k, find the maximum sum of any contiguous subarray of size k.",
    note: "Use sliding window technique to optimize the solution.",
    input: "First line contains N (array size) and K (window size). Second line contains N integers.",
    constraints: "1 <= N <= 10^5, 1 <= K <= N",
    example: {
      input: "5 3\n1 2 3 4 5",
      output: "12"
    },
    testCases: [
      { input: "5 3\n1 2 3 4 5", output: "12", status: "pending" },
      { input: "4 2\n2 1 3 4", output: "7", status: "pending" },
      { input: "3 3\n1 2 3", output: "6", status: "pending" }
    ],
    codeTemplate: `def max_sum_subarray(arr, k):
    """Find maximum sum of subarray of size k using sliding window"""
    if len(arr) < k:
        return 0
    
    # Calculate sum of first window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Read input
n, k = map(int, input().split())
arr = list(map(int, input().split()))

# Get result
result = max_sum_subarray(arr, k)
print(result)`,
    hint: "Use a sliding window approach. Keep track of the current window sum and update it by adding the new element and removing the old one.",
    xpReward: 100,
    timeLimit: 1800
  },

  // Level 4: Binary Search
  {
    id: 4,
    title: "Binary Search - 1",
    tags: ["Search", "Binary Search"],
    difficulty: "Medium",
    statement: "Given a sorted array of integers and a target value, find the index of the target using binary search.",
    note: "If target is not found, return -1.",
    input: "First line contains N (array size). Second line contains N sorted integers. Third line contains target value.",
    constraints: "1 <= N <= 10^5, -10^9 <= arr[i] <= 10^9",
    example: {
      input: "5\n1 3 5 7 9\n5",
      output: "2"
    },
    testCases: [
      { input: "5\n1 3 5 7 9\n5", output: "2", status: "pending" },
      { input: "4\n1 2 3 4\n6", output: "-1", status: "pending" },
      { input: "3\n1 2 3\n1", output: "0", status: "pending" }
    ],
    codeTemplate: `def binary_search(arr, target):
    """Find index of target in sorted array using binary search"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Read input
n = int(input())
arr = list(map(int, input().split()))
target = int(input())

# Get result
result = binary_search(arr, target)
print(result)`,
    hint: "Binary search works on sorted arrays. Compare the middle element with the target and eliminate half of the array in each iteration.",
    xpReward: 125,
    timeLimit: 1800
  },

  // Level 5: Stack Operations
  {
    id: 5,
    title: "Stack - Valid Parentheses",
    tags: ["Stack", "String"],
    difficulty: "Easy",
    statement: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    note: "An input string is valid if: 1) Open brackets must be closed by the same type of brackets. 2) Open brackets must be closed in the correct order.",
    input: "A single line containing the string of parentheses.",
    constraints: "1 <= s.length <= 10^4, s consists of parentheses only '()[]{}'",
    example: {
      input: "()[]{}",
      output: "true"
    },
    testCases: [
      { input: "()[]{}", output: "true", status: "pending" },
      { input: "([)]", output: "false", status: "pending" },
      { input: "{[]}", output: "true", status: "pending" }
    ],
    codeTemplate: `def is_valid(s):
    """Check if parentheses string is valid using stack"""
    stack = []
    brackets = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in '({[':
            stack.append(char)
        elif char in ')}]':
            if not stack or stack.pop() != brackets[char]:
                return False
    
    return len(stack) == 0

# Read input
s = input().strip()

# Get result
result = is_valid(s)
print(str(result).lower())`,
    hint: "Use a stack to keep track of opening brackets. When you encounter a closing bracket, check if it matches the top of the stack.",
    xpReward: 150,
    timeLimit: 1800
  },

  // Level 6: Queue Operations
  {
    id: 6,
    title: "Queue - First Non-Repeating Character",
    tags: ["Queue", "String", "Hash Map"],
    difficulty: "Medium",
    statement: "Given a string, find the first non-repeating character in it and return its index. If it doesn't exist, return -1.",
    note: "You can assume the string contains only lowercase letters.",
    input: "A single line containing the string.",
    constraints: "1 <= s.length <= 10^5, s consists of only lowercase English letters",
    example: {
      input: "leetcode",
      output: "0"
    },
    testCases: [
      { input: "leetcode", output: "0", status: "pending" },
      { input: "loveleetcode", output: "2", status: "pending" },
      { input: "aabb", output: "-1", status: "pending" }
    ],
    codeTemplate: `from collections import Counter

def first_uniq_char(s):
    """Find first non-repeating character"""
    count = Counter(s)
    
    for i, char in enumerate(s):
        if count[char] == 1:
            return i
    
    return -1

# Read input
s = input().strip()

# Get result
result = first_uniq_char(s)
print(result)`,
    hint: "Use a hash map to count the frequency of each character, then iterate through the string to find the first character with count 1.",
    xpReward: 175,
    timeLimit: 1800
  },

  // Level 7: Linked List
  {
    id: 7,
    title: "Linked List - Reverse List",
    tags: ["Linked List", "Recursion"],
    difficulty: "Easy",
    statement: "Given the head of a singly linked list, reverse the list and return the reversed list.",
    note: "You need to reverse the links between nodes, not just print the values in reverse order.",
    input: "First line contains N (number of nodes). Second line contains N space-separated values.",
    constraints: "1 <= N <= 5000, -5000 <= Node.val <= 5000",
    example: {
      input: "5\n1 2 3 4 5",
      output: "5 4 3 2 1"
    },
    testCases: [
      { input: "5\n1 2 3 4 5", output: "5 4 3 2 1", status: "pending" },
      { input: "2\n1 2", output: "2 1", status: "pending" },
      { input: "1\n1", output: "1", status: "pending" }
    ],
    codeTemplate: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    """Reverse a linked list iteratively"""
    prev = None
    current = head
    
    while current:
        next_temp = current.next
        current.next = prev
        prev = current
        current = next_temp
    
    return prev

def print_list(head):
    """Print linked list values"""
    values = []
    current = head
    while current:
        values.append(str(current.val))
        current = current.next
    print(' '.join(values))

# Read input
n = int(input())
values = list(map(int, input().split()))

# Create linked list
head = None
for val in reversed(values):
    head = ListNode(val, head)

# Reverse the list
reversed_head = reverse_list(head)

# Print result
print_list(reversed_head)`,
    hint: "Use three pointers: prev, current, and next. In each iteration, reverse the link and move the pointers forward.",
    xpReward: 200,
    timeLimit: 1800
  },

  // Level 8: Tree Traversal
  {
    id: 8,
    title: "Tree - Inorder Traversal",
    tags: ["Tree", "Recursion", "DFS"],
    difficulty: "Medium",
    statement: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    note: "Inorder traversal visits nodes in the order: left subtree, root, right subtree.",
    input: "First line contains N (number of nodes). Next N lines contain node values in level-order format (use -1 for null).",
    constraints: "1 <= N <= 100, -100 <= Node.val <= 100",
    example: {
      input: "3\n1\n-1\n2",
      output: "1 2"
    },
    testCases: [
      { input: "3\n1\n-1\n2", output: "1 2", status: "pending" },
      { input: "1\n1", output: "1", status: "pending" },
      { input: "5\n1\n2\n3\n-1\n-1", output: "2 1 3", status: "pending" }
    ],
    codeTemplate: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    """Perform inorder traversal recursively"""
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    
    inorder(root)
    return result

def build_tree(values, index=0):
    """Build binary tree from level-order array"""
    if index >= len(values) or values[index] == -1:
        return None
    
    root = TreeNode(values[index])
    root.left = build_tree(values, 2 * index + 1)
    root.right = build_tree(values, 2 * index + 2)
    return root

# Read input
n = int(input())
values = []
for _ in range(n):
    val = int(input())
    values.append(val)

# Build tree
root = build_tree(values)

# Perform inorder traversal
result = inorder_traversal(root)

# Print result
print(' '.join(map(str, result)))`,
    hint: "Use recursion to traverse the tree. Visit left subtree, then root, then right subtree.",
    xpReward: 250,
    timeLimit: 1800
  },

  // Level 9: Graph Basics
  {
    id: 9,
    title: "Graph - DFS Traversal",
    tags: ["Graph", "DFS", "Adjacency List"],
    difficulty: "Medium",
    statement: "Given an undirected graph, perform a Depth-First Search starting from vertex 0 and print the traversal order.",
    note: "The graph is represented as an adjacency list. Start DFS from vertex 0.",
    input: "First line contains N (number of vertices) and M (number of edges). Next M lines contain edge pairs.",
    constraints: "1 <= N <= 100, 0 <= M <= N*(N-1)/2",
    example: {
      input: "4 3\n0 1\n1 2\n2 3",
      output: "0 1 2 3"
    },
    testCases: [
      { input: "4 3\n0 1\n1 2\n2 3", output: "0 1 2 3", status: "pending" },
      { input: "3 2\n0 1\n1 2", output: "0 1 2", status: "pending" },
      { input: "2 1\n0 1", output: "0 1", status: "pending" }
    ],
    codeTemplate: `from collections import defaultdict

def dfs(graph, start, visited):
    """Perform DFS traversal"""
    visited.add(start)
    result = [start]
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result

# Read input
n, m = map(int, input().split())

# Build adjacency list
graph = defaultdict(list)
for _ in range(m):
    u, v = map(int, input().split())
    graph[u].append(v)
    graph[v].append(u)  # Undirected graph

# Perform DFS
visited = set()
result = dfs(graph, 0, visited)

# Print result
print(' '.join(map(str, result)))`,
    hint: "Use a recursive approach with a visited set to avoid cycles. Visit all unvisited neighbors of the current vertex.",
    xpReward: 300,
    timeLimit: 1800
  },

  // Level 10: Dynamic Programming
  {
    id: 10,
    title: "DP - Fibonacci Number",
    tags: ["Dynamic Programming", "Recursion"],
    difficulty: "Easy",
    statement: "Calculate the nth Fibonacci number. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) for n > 1.",
    note: "Use dynamic programming to avoid recalculating the same values.",
    input: "A single line with integer N.",
    constraints: "0 <= N <= 30",
    example: {
      input: "4",
      output: "3"
    },
    testCases: [
      { input: "4", output: "3", status: "pending" },
      { input: "5", output: "5", status: "pending" },
      { input: "6", output: "8", status: "pending" }
    ],
    codeTemplate: `def fibonacci(n):
    """Calculate nth Fibonacci number using DP"""
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Read input
n = int(input())

# Calculate result
result = fibonacci(n)
print(result)`,
    hint: "Use a bottom-up approach with an array to store previously calculated Fibonacci numbers.",
    xpReward: 350,
    timeLimit: 1800
  }
];

// Helper function to get question by ID
export const getQuestionById = (id: number): Question | undefined => {
  return questionsDatabase.find(q => q.id === id);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: Question['difficulty']): Question[] => {
  return questionsDatabase.filter(q => q.difficulty === difficulty);
};

// Helper function to get questions by tag
export const getQuestionsByTag = (tag: string): Question[] => {
  return questionsDatabase.filter(q => q.tags.includes(tag));
};

// Helper function to get all questions
export const getAllQuestions = (): Question[] => {
  return questionsDatabase;
}; 