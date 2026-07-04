export interface RsiResult { score: number; band: "cold" | "warm" | "strong" | "champion" }

export function relationshipStrengthIndex(input: {
  lastInteractionDays?: number;
  totalInteractions?: number;
  sentimentScore?: number;
}): RsiResult {
  const recency = input.lastInteractionDays != null ? Math.max(0, 100 - input.lastInteractionDays * 3) : 50;
  const frequency = Math.min(100, (input.totalInteractions || 0) * 5);
  const sentiment = input.sentimentScore ?? 50;
  const score = Math.round(recency * 0.35 + frequency * 0.25 + sentiment * 0.2);
  const band: RsiResult["band"] = score >= 80 ? "champion" : score >= 60 ? "strong" : score >= 35 ? "warm" : "cold";
  return { score, band };
}

export interface LeadPriorityResult { score: number; tier: "low" | "medium" | "high" | "top" }

export function leadPriorityScore(input: {
  intentScore?: number;
  fitScore?: number;
  engagementScore?: number;
  urgencyScore?: number;
  valueScore?: number;
}): LeadPriorityResult {
  const { intentScore = 50, fitScore = 50, engagementScore = 50, urgencyScore = 50, valueScore = 50 } = input;
  const score = Math.round(intentScore * 0.25 + fitScore * 0.25 + engagementScore * 0.2 + urgencyScore * 0.15 + valueScore * 0.15);
  const tier: LeadPriorityResult["tier"] = score >= 85 ? "top" : score >= 65 ? "high" : score >= 40 ? "medium" : "low";
  return { score, tier };
}

export interface ChurnRiskResult { score: number; band: "low" | "elevated" | "high" | "critical" }

export function churnRiskScore(input: {
  lastInteractionDays?: number;
  engagementTrend?: number;
  sentimentScore?: number;
  supportTicketsOpen?: number;
  recentMomentum?: number;
}): ChurnRiskResult {
  const recencyRisk = input.lastInteractionDays != null ? Math.min(100, input.lastInteractionDays * 2.5) : 30;
  const engagementRisk = input.engagementTrend != null ? Math.max(0, 50 - input.engagementTrend * 0.5) : 25;
  const sentimentRisk = input.sentimentScore != null ? Math.max(0, 50 - input.sentimentScore * 0.5) : 20;
  const supportRisk = Math.min(100, (input.supportTicketsOpen || 0) * 15);
  const momentumRisk = input.recentMomentum != null ? Math.max(0, 50 - input.recentMomentum * 0.5) : 25;
  const score = Math.round(recencyRisk * 0.3 + engagementRisk * 0.25 + sentimentRisk * 0.2 + supportRisk * 0.15 + momentumRisk * 0.1);
  const band: ChurnRiskResult["band"] = score >= 75 ? "critical" : score >= 55 ? "high" : score >= 30 ? "elevated" : "low";
  return { score, band };
}

export interface HealthResult { score: number; band: "at-risk" | "fair" | "good" | "excellent" }

export function customerHealthScore(input: {
  usageScore?: number;
  satisfactionScore?: number;
  engagementScore?: number;
  renewalProbability?: number;
}): HealthResult {
  const { usageScore = 50, satisfactionScore = 50, engagementScore = 50, renewalProbability = 50 } = input;
  const score = Math.round(usageScore * 0.3 + satisfactionScore * 0.3 + engagementScore * 0.2 + renewalProbability * 0.2);
  const band: HealthResult["band"] = score >= 80 ? "excellent" : score >= 60 ? "good" : score >= 35 ? "fair" : "at-risk";
  return { score, band };
}

export interface NextBestAction { action: string; score: number; reasoning: string; estimatedEffort: "low" | "medium" | "high"; estimatedImpact: "low" | "medium" | "high" }

export function suggestNextBestAction(input: {
  dealStage?: string;
  daysInStage?: number;
  dealValue?: number;
  contactRsi?: number;
  openTasks?: number;
}): NextBestAction {
  const { dealStage, daysInStage = 0, dealValue = 0, contactRsi = 50, openTasks = 0 } = input;
  if (dealStage === "Negotiation" && daysInStage > 14)
    return { action: "Send revised proposal with concession on payment terms", score: 88, reasoning: "Deal has been in Negotiation for 14+ days. Stalling.", estimatedEffort: "low", estimatedImpact: "high" };
  if (contactRsi < 35 && dealValue > 10000)
    return { action: "Executive check-in call with sponsor + decision maker", score: 82, reasoning: "RSI is cold but deal value is high.", estimatedEffort: "medium", estimatedImpact: "high" };
  if (openTasks > 5)
    return { action: "Batch-complete or delegate stale tasks", score: 72, reasoning: "5+ open tasks creating drag.", estimatedEffort: "low", estimatedImpact: "medium" };
  if (dealStage === "Discovery" && daysInStage < 7)
    return { action: "Send tailored case study matching their industry", score: 68, reasoning: "Early in discovery. Social proof accelerates trust.", estimatedEffort: "low", estimatedImpact: "medium" };
  return { action: "Follow up with value-add content (no ask)", score: 55, reasoning: "Default: maintain relationship without pressure.", estimatedEffort: "low", estimatedImpact: "low" };
}

export interface MomentumResult { score: number; band: "stalled" | "steady" | "active" | "hyper" }

export function businessMomentum(input: {
  tasksCompletedThisWeek?: number;
  dealsMovedThisWeek?: number;
  followupsSentThisWeek?: number;
}): MomentumResult {
  const { tasksCompletedThisWeek = 0, dealsMovedThisWeek = 0, followupsSentThisWeek = 0 } = input;
  const score = Math.min(100, Math.round(tasksCompletedThisWeek * 5 + dealsMovedThisWeek * 15 + followupsSentThisWeek * 4));
  const band: MomentumResult["band"] = score >= 80 ? "hyper" : score >= 50 ? "active" : score >= 20 ? "steady" : "stalled";
  return { score, band };
}

export interface ForecastResult { confidence: number; label: "low" | "moderate" | "high" | "very-high" }

export function forecastConfidence(input: {
  verifiedDeals?: number;
  activeDeals?: number;
  totalTouches?: number;
  volatility?: number;
  staleDays?: number;
}): ForecastResult {
  const { verifiedDeals = 0, activeDeals = 0, totalTouches = 0, volatility = 50, staleDays = 0 } = input;
  const verificationWeight = verifiedDeals / Math.max(activeDeals, 1) * 40;
  const touchWeight = Math.min(30, totalTouches * 2);
  const volatilityPenalty = volatility * 0.3;
  const stalePenalty = Math.min(20, staleDays * 0.5);
  const confidence = Math.round(Math.max(0, Math.min(100, verificationWeight + touchWeight - volatilityPenalty - stalePenalty)));
  const label: ForecastResult["label"] = confidence >= 80 ? "very-high" : confidence >= 60 ? "high" : confidence >= 35 ? "moderate" : "low";
  return { confidence, label };
}

export interface CampaignROIResult { roi: number; revenue: number; cost: number; profitable: boolean }

export function campaignROI(input: { attributedRevenue: number; totalCost: number }): CampaignROIResult {
  const { attributedRevenue, totalCost } = input;
  const roi = totalCost > 0 ? Math.round(((attributedRevenue - totalCost) / totalCost) * 100) : 0;
  return { roi, revenue: attributedRevenue, cost: totalCost, profitable: attributedRevenue > totalCost };
}

export interface PipelineVelocityResult { velocity: number; avgDealSize: number; cycleLengthDays: number; wonDeals: number }

export function pipelineVelocity(input: { wonDeals: Array<{ value: number; cycleDays: number }> }): PipelineVelocityResult {
  const { wonDeals } = input;
  if (wonDeals.length === 0) return { velocity: 0, avgDealSize: 0, cycleLengthDays: 0, wonDeals: 0 };
  const totalValue = wonDeals.reduce((sum, d) => sum + d.value, 0);
  const avgCycle = wonDeals.reduce((sum, d) => sum + d.cycleDays, 0) / wonDeals.length;
  return { velocity: Math.round(totalValue / Math.max(avgCycle, 1)), avgDealSize: Math.round(totalValue / wonDeals.length), cycleLengthDays: Math.round(avgCycle), wonDeals: wonDeals.length };
}

export interface AgentEfficiencyResult { efficiency: number; usefulActions: number; errors: number; escalations: number }

export function agentEfficiency(input: { totalActions: number; usefulActions: number; errors: number; escalations: number; timeSpentMinutes: number }): AgentEfficiencyResult {
  const { totalActions, usefulActions, errors, escalations, timeSpentMinutes } = input;
  if (totalActions === 0) return { efficiency: 0, usefulActions: 0, errors: 0, escalations: 0 };
  const successRate = usefulActions / totalActions;
  const errorPenalty = errors / totalActions * 30;
  const escalationPenalty = escalations / totalActions * 20;
  const timeFactor = timeSpentMinutes > 0 ? Math.min(1, 60 / timeSpentMinutes) : 1;
  const efficiency = Math.round(Math.max(0, Math.min(100, successRate * 100 - errorPenalty - escalationPenalty) * timeFactor));
  return { efficiency, usefulActions, errors, escalations };
}
