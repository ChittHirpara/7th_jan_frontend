export type InputType = 'code' | 'api' | 'sql' | 'config';

export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Vulnerability {
  _id: string;
  type: string;
  severity: Severity;
  location: string;
  description: string;
  attackerLogic: string;
  defenderLogic: string;
  secureCodeFix: string;
  simulatedPayload: string;
  killChainStage: string;
  impact: {
    technical: string;
    business: string;
  };
}

export interface AnalysisResult {
  _id: string;
  inputType: InputType;
  content: string;
  riskScore: number;
  vulnerabilities: Vulnerability[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalysisRequest {
  inputType: InputType;
  content: string;
}

export interface DashboardMetrics {
  totalScans: number;
  totalVulnerabilities: number;
  severityDistribution: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    CRITICAL: number;
  };
  riskTrend: Array<{
    date: string;
    averageRisk: number;
  }>;
  recentScans: AnalysisResult[];
}

export interface EthicalNotice {
  title: string;
  content: string;
  lastUpdated: string;
}

