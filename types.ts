
export interface InterviewConfig {
  role: string;
  domain?: string;
  type: 'Technical' | 'Behavioral';
}

export interface AnswerEvaluation {
  feedback: string;
  score: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  evaluation?: AnswerEvaluation;
  isError?: boolean;
}

export interface SummaryReport {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  suggestedResources: string[];
}
