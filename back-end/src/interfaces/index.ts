export interface ContentBlock {
  id: string;
  originalText: string;
  translatedText: string;
  audioUrl: string;
  order: number;
  partId?: string;
}

export interface GradedReader {
  id: string;
  title: string;
  parts?: ReaderPart[];
  deleted: boolean;
}

export interface ReaderPart {
  id: string;
  title: string;
  gradedReader?: GradedReader;
  gradedReaderId?: string;
  contents?: ContentBlock[]; // Made optional
}