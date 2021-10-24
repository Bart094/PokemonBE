export interface TranslationResponse{
    success: {
      total: Number
    },
    contents: {
      translated: string;
      text: string;
      translation: string;
    }
  }