import { getSettingsByProviderId } from '@/stores/settings'
import type { HandlerPayload } from '@/types/provider'

export const generateRapidProviderPayload = (prompt: string, providerId: string) => {
  const payload = {
    conversationId: 'temp',
    conversationType: 'chat_single',
    botId: 'temp',
    globalSettings: getSettingsByProviderId(providerId),
    botSettings: {},
    prompt,
    messages: [],
  } as HandlerPayload
  return payload
}

export const promptHelper = {
  summarizeText: (text: string) => {
    return [
      'Summarize a short and relevant title of input with no more than 5 words.',
      'Rules:',
      '1. Must use the same language as input.',
      '2. Output the title directly, do not add any other content.',
      'The input is:',
      text,
    ].join('\n')
  },
}

export const generatePromptCategoryPayload = (prompt: string, providerId: string) => {
  const payload = {
    conversationId: 'promptcategory',
    conversationType: 'chat_single',
    botId: 'promptcategory',
    globalSettings: getSettingsByProviderId(providerId),
    botSettings: {},
    prompt,
    messages: [],
  } as HandlerPayload
  return payload
}

export const promptCategoryHelper = {
  summarizeText: (text: string) => {
    return [
      'Your job is to review the input and determine the context of the input. ',
      'Based on the context of the input categorize it as Science, History, Computer, Economics, Charlie or Other.',
      'The output must be one word only. Do not add any other content.',
      'The purpose of this categorization is to determine which persona to activate',
      'If a name is reference respond with the cooresponding context category',
      'Here are the names associated with each context category:',
      'Science: Marvin',
      'History: Winston Churchill',
      'Computer: Data',
      'Economics: Adam Smith',
      'Charlie: Charlie',
      'Other: Michelle',
      'The use of any of these names trumps all other context information',
      'Charlie can only be activated when the user addresses you with the name Charlie',
      'The input is:',
      text,
    ].join('\n')
  },
}
