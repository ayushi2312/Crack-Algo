export interface UserProgress {
  userId: string;
  completedQuestions: number[];
  currentLevel: number;
  totalXP: number;
  streak: number;
  lastActiveDate: string;
  achievements: Achievement[];
  badges: Badge[];
  statistics: UserStatistics;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  xpReward: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface UserStatistics {
  totalQuestionsSolved: number;
  totalSubmissions: number;
  averageExecutionTime: number;
  favoriteTopics: string[];
  longestStreak: number;
  currentStreak: number;
  accuracy: number;
}

class ProgressTracker {
  private storageKey = 'crackalgo_user_progress';

  // Initialize or get user progress
  getUserProgress(userId: string): UserProgress {
    const stored = localStorage.getItem(`${this.storageKey}_${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }

    // Default progress for new user
    return {
      userId,
      completedQuestions: [],
      currentLevel: 1,
      totalXP: 0,
      streak: 0,
      lastActiveDate: new Date().toISOString(),
      achievements: [],
      badges: [],
      statistics: {
        totalQuestionsSolved: 0,
        totalSubmissions: 0,
        averageExecutionTime: 0,
        favoriteTopics: [],
        longestStreak: 0,
        currentStreak: 0,
        accuracy: 0
      }
    };
  }

  // Save user progress
  saveUserProgress(progress: UserProgress): void {
    localStorage.setItem(`${this.storageKey}_${progress.userId}`, JSON.stringify(progress));
  }

  // Complete a question
  completeQuestion(userId: string, questionId: number, xpEarned: number, executionTime: number): UserProgress {
    const progress = this.getUserProgress(userId);
    
    // Add to completed questions if not already completed
    if (!progress.completedQuestions.includes(questionId)) {
      progress.completedQuestions.push(questionId);
      progress.totalXP += xpEarned;
      progress.statistics.totalQuestionsSolved++;
    }

    // Update statistics
    progress.statistics.totalSubmissions++;
    progress.statistics.averageExecutionTime = 
      (progress.statistics.averageExecutionTime * (progress.statistics.totalSubmissions - 1) + executionTime) / 
      progress.statistics.totalSubmissions;

    // Update current level
    progress.currentLevel = Math.max(progress.currentLevel, questionId + 1);

    // Update streak
    const today = new Date().toDateString();
    const lastActive = new Date(progress.lastActiveDate).toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    if (lastActive === today) {
      // Already active today, maintain streak
    } else if (lastActive === yesterday) {
      // Consecutive day, increase streak
      progress.streak++;
      progress.statistics.currentStreak++;
      progress.statistics.longestStreak = Math.max(progress.statistics.longestStreak, progress.streak);
    } else {
      // Break in streak, reset
      progress.streak = 1;
      progress.statistics.currentStreak = 1;
    }

    progress.lastActiveDate = new Date().toISOString();

    // Check for achievements
    this.checkAchievements(progress);

    // Save and return
    this.saveUserProgress(progress);
    return progress;
  }

  // Check and unlock achievements
  private checkAchievements(progress: UserProgress): void {
    const achievements = this.getAvailableAchievements();
    
    achievements.forEach(achievement => {
      if (!progress.achievements.find(a => a.id === achievement.id)) {
        if (this.hasUnlockedAchievement(progress, achievement)) {
          progress.achievements.push({
            ...achievement,
            unlockedAt: new Date().toISOString()
          });
          progress.totalXP += achievement.xpReward;
        }
      }
    });
  }

  // Check if user has unlocked an achievement
  private hasUnlockedAchievement(progress: UserProgress, achievement: Achievement): boolean {
    switch (achievement.id) {
      case 'first_solve':
        return progress.statistics.totalQuestionsSolved >= 1;
      case 'streak_3':
        return progress.streak >= 3;
      case 'streak_7':
        return progress.streak >= 7;
      case 'streak_30':
        return progress.streak >= 30;
      case 'solve_10':
        return progress.statistics.totalQuestionsSolved >= 10;
      case 'solve_50':
        return progress.statistics.totalQuestionsSolved >= 50;
      case 'perfect_accuracy':
        return progress.statistics.accuracy >= 95;
      case 'speed_demon':
        return progress.statistics.averageExecutionTime <= 1000; // 1 second
      default:
        return false;
    }
  }

  // Get available achievements
  private getAvailableAchievements(): Achievement[] {
    return [
      {
        id: 'first_solve',
        name: 'First Steps',
        description: 'Solve your first question',
        icon: '🎯',
        unlockedAt: '',
        xpReward: 50
      },
      {
        id: 'streak_3',
        name: 'Getting Started',
        description: 'Maintain a 3-day streak',
        icon: '🔥',
        unlockedAt: '',
        xpReward: 100
      },
      {
        id: 'streak_7',
        name: 'Week Warrior',
        description: 'Maintain a 7-day streak',
        icon: '⚡',
        unlockedAt: '',
        xpReward: 250
      },
      {
        id: 'streak_30',
        name: 'Consistency King',
        description: 'Maintain a 30-day streak',
        icon: '👑',
        unlockedAt: '',
        xpReward: 1000
      },
      {
        id: 'solve_10',
        name: 'Problem Solver',
        description: 'Solve 10 questions',
        icon: '🧩',
        unlockedAt: '',
        xpReward: 200
      },
      {
        id: 'solve_50',
        name: 'DSA Master',
        description: 'Solve 50 questions',
        icon: '🏆',
        unlockedAt: '',
        xpReward: 500
      },
      {
        id: 'perfect_accuracy',
        name: 'Perfect Coder',
        description: 'Maintain 95%+ accuracy',
        icon: '💎',
        unlockedAt: '',
        xpReward: 300
      },
      {
        id: 'speed_demon',
        name: 'Speed Demon',
        description: 'Average execution time under 1 second',
        icon: '🚀',
        unlockedAt: '',
        xpReward: 400
      }
    ];
  }

  // Get user level and rank
  getUserLevel(totalXP: number): { level: number; title: string; nextLevelXP: number } {
    const levels = [
      { level: 1, title: 'Novice Coder', xpRequired: 0 },
      { level: 2, title: 'Beginner', xpRequired: 100 },
      { level: 3, title: 'Apprentice', xpRequired: 300 },
      { level: 4, title: 'Intermediate', xpRequired: 600 },
      { level: 5, title: 'Advanced', xpRequired: 1000 },
      { level: 6, title: 'Expert', xpRequired: 1500 },
      { level: 7, title: 'Master', xpRequired: 2200 },
      { level: 8, title: 'Grandmaster', xpRequired: 3000 },
      { level: 9, title: 'Legend', xpRequired: 4000 },
      { level: 10, title: 'Mythic', xpRequired: 5000 }
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalXP >= levels[i].xpRequired) {
        const nextLevel = levels[i + 1] || { xpRequired: levels[i].xpRequired };
        return {
          level: levels[i].level,
          title: levels[i].title,
          nextLevelXP: nextLevel.xpRequired - totalXP
        };
      }
    }

    return { level: 1, title: 'Novice Coder', nextLevelXP: 100 - totalXP };
  }

  // Get leaderboard data
  getLeaderboard(): UserProgress[] {
    // In a real app, this would fetch from a database
    // For now, return mock data
    return [
      {
        userId: 'user1',
        completedQuestions: [1, 2, 3, 4, 5],
        currentLevel: 6,
        totalXP: 1250,
        streak: 15,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        badges: [],
        statistics: {
          totalQuestionsSolved: 5,
          totalSubmissions: 8,
          averageExecutionTime: 1200,
          favoriteTopics: ['Arrays', 'Strings'],
          longestStreak: 15,
          currentStreak: 15,
          accuracy: 87.5
        }
      },
      {
        userId: 'user2',
        completedQuestions: [1, 2, 3],
        currentLevel: 4,
        totalXP: 750,
        streak: 8,
        lastActiveDate: new Date().toISOString(),
        achievements: [],
        badges: [],
        statistics: {
          totalQuestionsSolved: 3,
          totalSubmissions: 5,
          averageExecutionTime: 1800,
          favoriteTopics: ['Arrays'],
          longestStreak: 8,
          currentStreak: 8,
          accuracy: 60
        }
      }
    ];
  }

  // Get user analytics
  getUserAnalytics(userId: string) {
    const progress = this.getUserProgress(userId);
    const level = this.getUserLevel(progress.totalXP);
    
    return {
      progress,
      level,
      completionRate: (progress.completedQuestions.length / 10) * 100, // Assuming 10 total questions
      averageXPPerQuestion: progress.statistics.totalQuestionsSolved > 0 
        ? progress.totalXP / progress.statistics.totalQuestionsSolved 
        : 0,
      favoriteTopics: progress.statistics.favoriteTopics,
      recentActivity: this.getRecentActivity(userId)
    };
  }

  // Get recent activity
  private getRecentActivity(userId: string) {
    // Mock recent activity
    return [
      { date: '2024-01-15', action: 'Completed Level 3', xp: 100 },
      { date: '2024-01-14', action: 'Completed Level 2', xp: 75 },
      { date: '2024-01-13', action: 'Completed Level 1', xp: 50 }
    ];
  }
}

export default new ProgressTracker(); 