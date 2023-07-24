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
      'Your job is to review the question and determine the context of the question which persona category to activate. ',
      'Based on the context of the input or a persona name categorize the input as Science, Medicine, History, Philosophy, Writing, Computer, Business, Engineering, Music, Economics, Yomiko, Charlie, Marvin or Other.',
      'The output must be one word only. Do not add any other content.',
      'If a name is reference respond with the context category which cooresponds with that name.',
      'Here are the names associated with each context category:',
      'Richard Feynman: Science',
      'Terry Wahls: Medicine',
      'Winston Churchill: History',
      'Dennis Ritchie: Computer',
      'Elon Musk: Business',
      'Shirley Taylor: Writing',
      'Hubert "Bert" Dreyfus: Philosophy',
      'Daniel Barenboim: Music',
      'Charlie Day: Charlie',
      'Marvin The Paranoid Android: Marvin',
      'Yomiko Readman "The Paper": Yomiko',
      'Thomas Sowell: Economics',
      'The use of any of these names supercedes all other context information in determining the category',
      'If any of these names are activated output the name instead of context category described above',
      'Charlie can only be activated when the user addresses you with the name Charlie',
      'Yomiko can only be activated when the user addresses you with the name Yomiko',
      'Marvin can only be activated when the user addresses you with the name Marvin',
      'The input is:',
      text,
    ].join('\n')
  },
}

// export const promptCategoryHelper = {
//   summarizeText: (text: string) => {
//     return [
//       'Analyze the input and categorize it into Science, Medicine, History, Philosophy, Writing, Computer, Business, Ideas, Economics, Yomiko, Charlie or Other.',
//       'Output should be a single category.',
//       'This categorization is used to decide which persona would most effectively answer the user\'s question.',
//       'If appears to be addressing a persona specifically by name, use the corresponding category.',
//       'Here are the categories and their corresponding names:',
//       'Science: Marvin, Medicine: Terry Wahls, History: Winston Churchill, Computer: Dennis Ritchie, Business: Elon Musk',
//       'Writing: Shirley Taylor, Philosophy: Hubert "Bert" Dreyfus, Ideas: Steve Jobs, Charlie: Charlie, Yomiko: Yomiko Readman "The Paper", Economics: Adam Smith',
//       'Naming takes precedence over other contexts.',
//       'If a name is triggered, output the name instead of the category.',
//       'Charlie and Yomiko can only be triggered when directly addressed.',
//       'Received input:',
//       'The input is:',
//       text,
//     ].join('\n')
//   },
// }

// export const promptCategoryHelper = {
//   summarizeText: (text: string) => {
//     return [
//       'You are about to perform a categorization task. The context of the prompt is crucial for this task. ',
//       'The prompt is: ',
//       text,
//       'Your task is to determine the correct persona to activate based on the context of the prompt.',
//       'The output should contain only the first name of appropriate persona with the first letter of the first name capatalized.',
//       'The correct persona is selected based on the name the user refers to the assistant as or the context of the prompt.',
//       'Here are the names you can select from and the categories they are associated with:',
//       '- Marvin: science',
//       '- Terry Wahls: medicine',
//       '- Winston Churchill: history',
//       '- Dennis Ritchie: computers, programming',
//       '- Elon Musk: business',
//       '- Shirley Taylor: business writing',
//       '- Hubert "Bert" Dreyfus: philosophy',
//       '- Steve Jobs: ideas',
//       '- Adam Smith: economics',
//       '- Yomiko Readman "The Paper": ',
//       '- Charlie Kelly: ',
//       'If any of these names are mentioned in the prompt, prioritize the associated category over the general context.',
//     ].join('\n')
//   },
// }
