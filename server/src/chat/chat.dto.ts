export interface CreateMessageDTO {
  chatId: number
  text: string
}

export interface AddMessageDTO extends CreateMessageDTO {
  senderId: number
}
