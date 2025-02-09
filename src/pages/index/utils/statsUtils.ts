
export const getRandomChange = () => {
  return (Math.random() * 2 - 1) * 0.5;
};

export const calculateTokenChange = (currentTokens: number) => {
  const baseGrowthRate = 0.005 + (Math.random() * 0.015);
  const growthMultiplier = currentTokens < 1000000 ? 2 : 1;
  const change = currentTokens * baseGrowthRate * growthMultiplier;
  return Math.min(210000000, currentTokens + change);
};

export const calculateUserNodeChange = (current: number) => {
  const changePercentage = getRandomChange() * 0.1;
  const change = current * changePercentage;
  return Math.max(current * 0.8, current + change);
};

export const calculateSupplyPercentage = (currentTokens: number) => {
  const maxSupply = 210000000; // 210 million max supply
  return ((currentTokens / maxSupply) * 100).toFixed(4);
};
