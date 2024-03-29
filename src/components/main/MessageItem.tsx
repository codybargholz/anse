import { For, Show } from 'solid-js/web'
import { createSignal } from 'solid-js'
import { useStore } from '@nanostores/solid'
import { useClipboardCopy } from '@/hooks'
import { deleteMessageByConversationId, spliceMessageByConversationId, spliceUpdateMessageByConversationId } from '@/stores/messages'
import { conversationMap } from '@/stores/conversation'
import { handlePrompt } from '@/logics/conversation'
import { scrollController } from '@/stores/ui'
import { globalAbortController } from '@/stores/settings'
import StreamableText from '../StreamableText'
import { DropDownMenu, Tooltip } from '../ui/base'
import Button from '../ui/Button'
import type { MenuItem } from '../ui/base'
import type { MessageInstance } from '@/types/message'

interface Props {
  conversationId: string
  message: MessageInstance
  index: number
  handleStreaming?: () => void
}

export default (props: Props) => {
  let inputRef: HTMLTextAreaElement

  // const [icon, setIcon] = createSignal('')
  const $conversationMap = useStore(conversationMap)

  const [showRawCode, setShowRawCode] = createSignal(false)
  const [copied, setCopied] = createSignal(false)
  const [isEditing, setIsEditing] = createSignal(false)
  const [inputPrompt, setInputPrompt] = createSignal(props.message.content)

  const currentConversation = () => {
    return $conversationMap()[props.conversationId]
  }
  const personalityName = currentConversation().personalityName

  const handleCopyMessageItem = () => {
    const [Iscopied, copy] = useClipboardCopy(props.message.content)
    copy()
    setCopied(Iscopied())
    setTimeout(() => setCopied(false), 1000)
  }

  const handleDeleteMessageItem = () => {
    deleteMessageByConversationId(props.conversationId, props.message)
  }

  const handleRetryMessageItem = () => {
    const controller = new AbortController()
    globalAbortController.set(controller)
    spliceMessageByConversationId(props.conversationId, props.message)
    handlePrompt(currentConversation(), '', controller.signal)
    // TODO: scrollController seems not working
    scrollController().scrollToBottom()
  }

  const handleEditMessageItem = () => {
    setIsEditing(true)
    inputRef.focus()
  }

  const handleSend = () => {
    if (!inputRef.value)
      return
    const controller = new AbortController()
    const currentMessage: MessageInstance = {
      ...props.message,
      content: inputPrompt(),
    }

    globalAbortController.set(controller)
    spliceUpdateMessageByConversationId(props.conversationId, currentMessage)
    setIsEditing(false)
    handlePrompt(currentConversation(), '', controller.signal)
    scrollController().scrollToBottom()
  }

  const [menuList, setMenuList] = createSignal<MenuItem[]>([
    { id: 'retry', label: 'Retry send', icon: 'i-carbon:restart', role: 'all', action: handleRetryMessageItem },
    { id: 'raw', label: 'Show raw code', icon: 'i-carbon-code', role: 'system', action: () => setShowRawCode(!showRawCode()) },
    // TODO: Share message
    // { id: 'share', label: 'Share message', icon: 'i-carbon:share' },
    { id: 'edit', label: 'Edit message', icon: 'i-carbon:edit', role: 'user', action: handleEditMessageItem },
    { id: 'copy', label: 'Copy message', icon: 'i-carbon-copy', role: 'all', action: handleCopyMessageItem },
    { id: 'delete', label: 'Delete message', icon: 'i-carbon-trash-can', role: 'all', action: handleDeleteMessageItem },
  ])

  if (props.message.role === 'user')
    setMenuList(menuList().filter(item => ['all', 'user'].includes(item.role!)))
  else
    setMenuList(menuList().filter(item => ['all', 'system'].includes(item.role!)))

  // onMount(() => {
  //  const conversation = $conversationMap()[props.conversationId]
  //  if (conversation)
  //    setIcon(conversation.personalityName)
  // })

  const roleClass = {
    system: "background: url('/self.png'); background-size: cover; background-position: center;",
    user: "background: url('/Monroe.png'); background-size: cover; background-position: center;",
    assistant: personalityName === 'Marvin'
      ? "background: url('/Marvin.png'); background-size: cover; background-repeat: no-repeat;"
      : personalityName === 'Feynman'
        ? "background: url('/Feynman.png'); background-size: cover; background-repeat: no-repeat;"
        : personalityName === 'Barenboim'
          ? "background: url('/Barenboim.jpg'); background-size: cover; background-repeat: no-repeat;"
          : personalityName === 'Yomiko'
            ? "background: url('/Yomiko.png'); background-size: cover; background-repeat: no-repeat;"
            : personalityName === 'Charlie'
              ? "background: url('/Charlie2.jpg'); background-size: cover; background-repeat: no-repeat;"
              : personalityName === 'Sowell'
                ? "background: url('/Sowell.jpg'); background-size: cover; background-repeat: no-repeat;"
                : personalityName === 'Churchhill'
                  ? "background: url('/winston.png'); background-size: cover; background-repeat: no-repeat;"
                  : personalityName === 'Adam Smith'
                    ? "background: url('/adamsmith.png'); background-size: cover; background-repeat: no-repeat;"
                    : personalityName === 'Steve Jobs'
                      ? "background: url('/stevejobs.png'); background-size: cover; background-repeat: no-repeat;"
                      : personalityName === 'Dennis Ritchie'
                        ? "background: url('/dennisritchie.png'); background-size: cover; background-repeat: no-repeat;"
                        : personalityName === 'Jordan'
                          ? "background: url('/jordan.jpg'); background-size: cover; background-repeat: no-repeat;"
                          : personalityName === 'Lee'
                            ? "background: url('/lee.jpg'); background-size: cover; background-repeat: no-repeat;"
                            : personalityName === 'Michael'
                              ? "background: url('/michael.jpg'); background-size: cover; background-repeat: no-repeat;"
                              : personalityName === 'Joscha'
                                ? "background: url('/joscha.jpg'); background-size: cover; background-repeat: no-repeat;"
                                : personalityName === 'Dan'
                                  ? "background: url('/dan.jpg'); background-size: cover; background-repeat: no-repeat;"
                                  : personalityName === 'Joe'
                                    ? "background: url('/joe.jpg'); background-size: cover; background-repeat: no-repeat;"
                                    : personalityName === 'Elon Musk'
                                      ? "background: url('/elon.png'); background-size: cover; background-repeat: no-repeat;"
                                      : personalityName === 'Hubert Dreyfus'
                                        ? "background: url('/bert.png'); background-size: cover; background-repeat: no-repeat;"
                                        : personalityName === 'Shirley Taylor'
                                          ? "background: url('/shirleytaylor.png'); background-size: cover; background-repeat: no-repeat;"
                                          : personalityName === 'Terry Wahls'
                                            ? "background: url('/Terry2.jpg'); background-size: cover; background-repeat: no-repeat;"
                                            : personalityName === 'Lawrence'
                                              ? "background: url('/grant.jpg'); background-size: cover; background-repeat: no-repeat;"
                                              : "background: url('/self.png'); background-size: cover; background-position: center;",

  }

  return (
    <div
      class="p-6 break-words group relative"
      classList={{
        'bg-base-100': props.message.role === 'user',
      }}
    >
      <div class="max-w-base flex gap-4 overflow-hidden">
        <div class={`shrink-0 w-7 h-7 rounded-md op-80 ${roleClass[props.message.role]}`} />
        <div style={`${roleClass[props.message.role]}`} class="shrink-0 w-12 h-12 rounded-md op-80" />
        <div id="menuList-wrapper" class={`sm:hidden block absolute bottom-2 right-4 z-10 op-70 cursor-pointer ${isEditing() && '!hidden'}`}>
          <DropDownMenu menuList={menuList()}>
            <div class="text-xl i-carbon:overflow-menu-horizontal" />
          </DropDownMenu>
        </div>
        <div class={`hidden sm:block absolute right-6 -top-4 ${!props.index && 'top-0'} ${isEditing() && '!hidden'}`}>
          <div class="op-0 group-hover:op-80 fcc space-x-2 !bg-base px-2 py-1 rounded-md border border-base transition-opacity">
            <For each={menuList()}>
              {item => (
                <Tooltip tip={item.label} handleChildClick={item.action}>
                  {
                    item.id === 'copy'
                      ? <div class={`menu-icon ${copied() ? 'i-carbon-checkmark !text-emerald-400' : 'i-carbon-copy'}`} />
                      : <div class={`${item.icon} menu-icon`} />
                  }
                </Tooltip>)}
            </For>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <Show when={isEditing()} >
            <textarea
              ref={inputRef!}
              value={inputPrompt()}
              autocomplete="off"
              onInput={() => { setInputPrompt(inputRef.value) }}
              onKeyDown={(e) => {
                e.key === 'Enter' && !e.isComposing && !e.shiftKey && handleSend()
              }}
              class="op-70 bg-darker py-4 px-[calc(max(1.5rem,(100%-48rem)/2))] w-full inset-0 scroll-pa-4 input-base rounded-md"
            />

            <div class="flex justify-end space-x-2 mt-1">
              <Button size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button size="sm" onClick={() => handleSend()}>Submit</Button>
            </div>
          </Show>
          <Show when={!isEditing()}>
            <StreamableText
              text={props.message.content}
              streamInfo={props.message.stream
                ? () => ({
                    conversationId: props.conversationId,
                    messageId: props.message.id || '',
                    handleStreaming: props.handleStreaming,
                  })
                : undefined}
              showRawCode={showRawCode()}
            />
          </Show>

        </div>

      </div>
    </div>
  )
}
