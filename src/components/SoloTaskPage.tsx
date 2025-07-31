import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Lightbulb, Play, X, Share, Zap, Trophy, Star } from 'lucide-react';
import CodeExecutor from '../services/CodeExecutor';
import { getQuestionById } from '../data/questions';
import ProgressTracker from '../services/ProgressTracker';

interface SoloTaskPageProps {
  onNavigate: (page: string) => void;
  levelId: number;
}

const SoloTaskPage: React.FC<SoloTaskPageProps> = ({ onNavigate, levelId }) => {
  // Get problem data from the questions database
  const getProblemData = (levelId: number) => {
    const question = getQuestionById(levelId);
    if (!question) {
      // Fallback to default question if not found
      return {
        title: "Default Question",
        tags: ["Basic"],
        statement: "This is a default question. Please check the level ID.",
        note: "Contact support if you see this message.",
        input: "No input specified",
        constraints: "No constraints",
        example: {
          input: "example",
          output: "example"
        },
        testCases: [
          { input: "test", output: "test", status: "pending" }
        ]
      };
    }
    
    return {
      title: question.title,
      tags: question.tags,
      statement: question.statement,
      note: question.note,
      input: question.input,
      constraints: question.constraints,
      example: question.example,
      testCases: question.testCases
    };
  };

  // Get code template from the questions database
  const getCodeTemplate = (levelId: number) => {
    const question = getQuestionById(levelId);
    return question?.codeTemplate || `# Default template for level ${levelId}
# Write your solution here

def solve_problem():
    """Your solution goes here"""
    pass

# Read input and call your function
# Add your code here`;
  };

  const problemData = getProblemData(levelId);
  const [code, setCode] = useState(getCodeTemplate(levelId));
  const [language, setLanguage] = useState('Python (3.8.1)');
  const [theme, setTheme] = useState('Night Owl');
  const [activeTab, setActiveTab] = useState('code');
  const [testTab, setTestTab] = useState('testcase');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [testResult, setTestResult] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResults, setExecutionResults] = useState<any>(null);
  const [syntaxError, setSyntaxError] = useState<string | null>(null);
  const [showAchievement, setShowAchievement] = useState(false);
  const [achievementData, setAchievementData] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRun = async () => {
    setIsRunning(true);
    setTestTab('testresult');
    setSyntaxError(null);
    
    try {
      // Validate syntax first
      const syntaxCheck = await CodeExecutor.validateSyntax(code);
      if (!syntaxCheck.valid) {
        setSyntaxError(syntaxCheck.error || 'Syntax error');
        setTestResult(`Syntax Error: ${syntaxCheck.error}`);
        setIsRunning(false);
        return;
      }

      // Execute code with test cases
      const result = await CodeExecutor.executeCode(code, problemData.testCases as any);
      setExecutionResults(result);
      
      if (result.success) {
        setTestResult(`✅ All test cases passed! (${result.executionTime.toFixed(2)}ms)`);
      } else {
        const failedTests = result.testCases.filter((tc: any) => tc.status === 'failed');
        setTestResult(`❌ ${failedTests.length} test case(s) failed. Check the results below.`);
      }
    } catch (error) {
      setTestResult(`❌ Execution error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

    const handleSubmit = async () => {
    setIsRunning(true);
    setTestTab('testresult');
    setAttempts(prev => prev + 1);
    setSyntaxError(null);

    try {
      // Validate syntax first
      const syntaxCheck = await CodeExecutor.validateSyntax(code);
      if (!syntaxCheck.valid) {
        setSyntaxError(syntaxCheck.error || 'Syntax error');
        setTestResult(`Syntax Error: ${syntaxCheck.error}`);
        setIsRunning(false);
        return;
      }

      // Execute code with test cases
      const result = await CodeExecutor.executeCode(code, problemData.testCases as any);
      setExecutionResults(result);

      if (result.success) {
        setTestResult(`🎉 Congratulations! All test cases passed! Your solution is correct! (${result.executionTime.toFixed(2)}ms)`);
        
        // Track progress and check for achievements
        const userId = 'current-user'; // In real app, get from auth context
        const question = getQuestionById(levelId);
        const xpEarned = question?.xpReward || 100;
        
        const updatedProgress = ProgressTracker.completeQuestion(
          userId, 
          levelId, 
          xpEarned, 
          result.executionTime
        );

        // Check for new achievements
        const newAchievements = updatedProgress.achievements.filter(
          (achievement: any) => !achievementData?.achievements?.some((a: any) => a.id === achievement.id)
        );

        if (newAchievements.length > 0) {
          setAchievementData({
            achievements: newAchievements,
            totalXP: updatedProgress.totalXP,
            level: ProgressTracker.getUserLevel(updatedProgress.totalXP)
          });
          setShowAchievement(true);
        }
      } else {
        const failedTests = result.testCases.filter((tc: any) => tc.status === 'failed');
        setTestResult(`❌ Submission failed. ${failedTests.length} test case(s) failed. Review your solution.`);
      }
    } catch (error) {
      setTestResult(`❌ Submission error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getHintForLevel = (levelId: number) => {
    const question = getQuestionById(levelId);
    return question?.hint || "No hint available for this level. Try to think about the problem step by step.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-purple-500/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <div className="h-6 w-px bg-purple-500/30"></div>
            <div>
              <h1 className="text-xl font-semibold text-white">Level {levelId}</h1>
              <p className="text-sm text-gray-300">Solo Practice Mode</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 bg-black/20 backdrop-blur-lg border-r border-purple-500/20 overflow-y-auto">
          <div className="p-6">
            {/* Problem Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{problemData.title}</h2>
                <div className="flex gap-2">
                  {problemData.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Problem Statement */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Problem Statement</h3>
              <p className="text-gray-300 leading-relaxed">{problemData.statement}</p>
            </div>

            {/* Note */}
            <div className="mb-6 p-4 bg-yellow-500/10 border-l-4 border-yellow-400 rounded-r">
              <p className="text-yellow-300 font-medium">{problemData.note}</p>
            </div>

            {/* Input */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Input</h3>
              <p className="text-gray-300">{problemData.input}</p>
            </div>

            {/* Constraints */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Constraints</h3>
              <p className="text-gray-300 font-mono">{problemData.constraints}</p>
            </div>

            {/* Example */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Example</h3>
              <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-500/20">
                <div className="mb-3">
                  <span className="font-semibold text-purple-300">Sample Input:</span>
                  <div className="bg-gray-800 border border-gray-600 rounded p-2 mt-1 font-mono text-sm text-gray-300">
                    {problemData.example.input}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-purple-300">Sample Output:</span>
                  <div className="bg-gray-800 border border-gray-600 rounded p-2 mt-1 font-mono text-sm text-gray-300 whitespace-pre">
                    {problemData.example.output}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
              <div className="flex gap-2">
                <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                  ← Previous
                </button>
                <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                  Next →
                </button>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-purple-800/30 text-purple-300 rounded hover:bg-purple-800/50 transition-colors border border-purple-500/30">
                  Question List
                </button>
                <button className="px-4 py-2 bg-purple-800/30 text-purple-300 rounded hover:bg-purple-800/50 transition-colors border border-purple-500/30">
                  All Problems
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 bg-gray-900 flex flex-col">
          {/* Editor Header */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === 'code' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('code')}
                  >
                    Code
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === 'details' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === 'submissions' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('submissions')}
                  >
                    Submissions
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      activeTab === 'notes' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('notes')}
                  >
                    Notes
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600"
                >
                  <option>Night Owl</option>
                  <option>Light</option>
                  <option>Monokai</option>
                </select>
                
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-gray-700 text-white text-sm rounded px-2 py-1 border border-gray-600"
                >
                  <option>Python (3.8.1)</option>
                  <option>JavaScript</option>
                  <option>Java</option>
                  <option>C++</option>
                </select>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 p-4">
            <div className="bg-gray-800 rounded-lg border border-gray-700 h-full">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-gray-800 text-green-400 font-mono text-sm p-4 resize-none border-none outline-none"
                placeholder="Write your code here..."
              />
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="bg-gray-800 border-t border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1">
                <button 
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    testTab === 'testcase' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setTestTab('testcase')}
                >
                  Testcase
                </button>
                <button 
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    testTab === 'testresult' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setTestTab('testresult')}
                >
                  Test Result
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-400">
                  Attempts: {attempts}
                </div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hint
                </button>
              </div>
            </div>

            {/* Test Cases or Results */}
            <div className="bg-gray-900 rounded-lg p-3 mb-3 min-h-[80px]">
              {testTab === 'testcase' ? (
                <div className="space-y-2">
                  {problemData.testCases.map((testCase, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Test Case {index + 1}: {testCase.input}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        testCase.status === 'passed' ? 'bg-green-600 text-white' : 
                        testCase.status === 'failed' ? 'bg-red-600 text-white' : 'bg-gray-600 text-white'
                      }`}>
                        {testCase.status === 'passed' ? '✓ Passed' : 
                         testCase.status === 'failed' ? '✗ Failed' : '⏳ Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-300 text-sm">
                  {isRunning ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                      Running code...
                    </div>
                  ) : (
                    <div>
                      <div className="mb-2">{testResult || 'Run your code to see results...'}</div>
                      {executionResults && (
                        <div className="space-y-2">
                          {executionResults.testCases.map((testCase: any, index: number) => (
                            <div key={index} className="text-xs">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded ${
                                  testCase.status === 'passed' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                                }`}>
                                  {testCase.status === 'passed' ? '✓' : '✗'} Test {index + 1}
                                </span>
                                <span className="text-gray-400">Input: {testCase.input}</span>
                              </div>
                              {testCase.status === 'failed' && (
                                <div className="ml-4 text-red-400">
                                  Expected: {testCase.output} | Got: {testCase.actualOutput || 'No output'}
                                  {testCase.error && <div>Error: {testCase.error}</div>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                Run
              </button>
              <button
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

                    {/* Hint Modal */}
              {showHint && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-4 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Hint for Level {levelId}</h3>
                      <button
                        onClick={() => setShowHint(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-gray-300 mb-4">
                      {getHintForLevel(levelId)}
                    </p>
                    <button
                      onClick={() => setShowHint(false)}
                      className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
                    >
                      Got it!
                    </button>
                  </div>
                </div>
              )}

              {/* Achievement Modal */}
              {showAchievement && achievementData && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-8 max-w-md mx-4 border border-yellow-500/30 backdrop-blur-lg">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🏆</div>
                      <h3 className="text-2xl font-bold text-white mb-2">Achievement Unlocked!</h3>
                      
                      {achievementData.achievements.map((achievement: any) => (
                        <div key={achievement.id} className="mb-4 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                          <div className="text-3xl mb-2">{achievement.icon}</div>
                          <h4 className="text-white font-semibold text-lg">{achievement.name}</h4>
                          <p className="text-yellow-200 text-sm mb-2">{achievement.description}</p>
                          <div className="flex items-center justify-center gap-4">
                            <div className="text-yellow-400 font-bold">+{achievement.xpReward} XP</div>
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">
                              <span>🪙</span>
                              <span>+{achievement.coinReward || 25} Coins</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="bg-purple-500/20 rounded-lg p-4 mb-4 border border-purple-500/30">
                        <div className="text-white font-semibold">Total XP: {achievementData.totalXP}</div>
                        <div className="text-purple-300 text-sm">
                          Level {achievementData.level.level} - {achievementData.level.title}
                        </div>
                        <div className="text-purple-300 text-sm">
                          {achievementData.level.nextLevelXP} XP to next level
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setShowAchievement(false)}
                        className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                      >
                        Awesome! 🎉
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        };

export default SoloTaskPage; 