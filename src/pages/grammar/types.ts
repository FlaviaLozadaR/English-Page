// src/grammar/types.ts
export interface GrammarExample {
  english: string;
  spanish: string;
}

export interface GrammarTopic {
  id: number;
  title: string;
  category: string;
  explanation: string;
  rules: string[];
  examples: GrammarExample[];
}
