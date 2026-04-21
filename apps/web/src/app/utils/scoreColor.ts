// Utility for score color logic used in multiple components
export function getScoreColor(score: number): string {
  if (score >= 7) return "text-blue-600 bg-blue-50"; // High
  if (score >= 4) return "text-yellow-700 bg-yellow-50"; // Medium
  return "text-gray-400 bg-gray-100"; // Low
}
