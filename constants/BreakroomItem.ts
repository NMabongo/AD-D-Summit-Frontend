export interface Room {
  id: number;
  eventId: number;
  breakoutRoomTitle: string | null;
  topic: string | null;
  roomName: string | null;
  participants?: number;
}
