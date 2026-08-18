// 1. Dummy Data representing the entire user base
export const dummyUsersDB = [
  {
    id: "USR-001",
    name: "Aman Srivastava",
    issuesRaised: 12,
    resolved: 8,
    upvotes: 110,
    ward: "Ward 7",
  },
  {
    id: "USR-002",
    name: "Rahul Verma",
    issuesRaised: 2,
    resolved: 1,
    upvotes: 5,
    ward: "Ward 12",
  },
  {
    id: "USR-003",
    name: "Priya Singh",
    issuesRaised: 45,
    resolved: 40,
    upvotes: 600,
    ward: "Ward 7",
  },
  {
    id: "USR-004",
    name: "Amit Kumar",
    issuesRaised: 5,
    resolved: 2,
    upvotes: 20,
    ward: "Ward 15",
  },
  {
    id: "USR-005",
    name: "Sneha Gupta",
    issuesRaised: 8,
    resolved: 5,
    upvotes: 45,
    ward: "Ward 3",
  },
];

// 2. The Logic Engine
export const calculateUserImpact = (targetUserId) => {
  // Map and calculate baseline scores
  const scoredUsers = dummyUsersDB.map((user) => ({
    ...user,
    total_civic_score:
      user.issuesRaised * 10 + user.resolved * 50 + user.upvotes * 2,
  }));

  // Sort descending
  scoredUsers.sort((a, b) => b.total_civic_score - a.total_civic_score);

  const userIndex = scoredUsers.findIndex((u) => u.id === targetUserId);
  if (userIndex === -1) return null;

  const currentUser = scoredUsers[userIndex];
  const totalUsers = scoredUsers.length;

  // Calculate clean, rounded bracket values
  const rawTopPercentage = ((userIndex + 1) / totalUsers) * 100;
  let topPercentage = Math.round(rawTopPercentage);

  // Structural classification assignment rules
  if (topPercentage < 1) topPercentage = 1;
  else if (topPercentage <= 5) topPercentage = 5;
  else if (topPercentage <= 10) topPercentage = 10;
  else topPercentage = Math.round(topPercentage); // Added assignment operator

  // Prevent divide-by-zero layout errors on profile cards
  const raised = currentUser.issuesRaised || 1;
  const resolutionRate = Math.round((currentUser.resolved / raised) * 100);

  return {
    score: currentUser.total_civic_score,
    impactPopulation: currentUser.resolved * 300,
    topPercentage,
    primaryWard: currentUser.ward,
    user: {
      name: currentUser.name,
      level: "Level 4 Citizen",
      location: "Prayagraj, Uttar Pradesh",
    },
    stats: {
      totalRaised: currentUser.issuesRaised,
      resolved: currentUser.resolved,
      inProgress: Math.max(
        0,
        currentUser.issuesRaised - currentUser.resolved - 1,
      ),
      escalated: 1,
      resolutionRate,
    },
  };
};
