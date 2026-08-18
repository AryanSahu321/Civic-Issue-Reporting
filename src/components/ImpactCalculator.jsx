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

// 2. The Logic Engine (Simulating the Database)
export const calculateUserImpact = (targetUserId) => {
  // Step A: Calculate total score for everyone based on our formula
  const scoredUsers = dummyUsersDB.map((user) => {
    const total_civic_score =
      user.issuesRaised * 10 + user.resolved * 50 + user.upvotes * 2;
    return { ...user, total_civic_score };
  });

  // Step B: Sort users by score descending (Highest score first)
  scoredUsers.sort((a, b) => b.total_civic_score - a.total_civic_score);

  // Step C: Find the target user and calculate their stats
  const userIndex = scoredUsers.findIndex((u) => u.id === targetUserId);

  if (userIndex === -1) return null; // User not found

  const currentUser = scoredUsers[userIndex];

  // Percentile Logic: (Number of people you beat / Total people) * 100
  // Since array is sorted highest to lowest, the people you beat are below you (length - rank)
  const rank = userIndex + 1;
  const totalUsers = scoredUsers.length;
  const peopleBeat = totalUsers - rank;

  let percentile = (peopleBeat / totalUsers) * 100;
  let topPercentage = 100 - percentile;

  // Formatting for UI (e.g., Top 5%, Top 20%)
  if (topPercentage < 1)
    topPercentage = 1; // "Top 1%"
  else if (topPercentage <= 5) topPercentage = 5;
  else if (topPercentage <= 10) topPercentage = 10;
  else Math.round(topPercentage);

  // Impacted Population (Resolved * 300 residents)
  const impactPopulation = currentUser.resolved * 300;

  return {
    score: currentUser.total_civic_score,
    impactPopulation: impactPopulation,
    topPercentage: Math.round(topPercentage),
    primaryWard: currentUser.ward,
  };
};
