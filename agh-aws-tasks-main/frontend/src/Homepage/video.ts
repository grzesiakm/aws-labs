import { Channel } from "./channel";

export interface Video {
  id: string;
  thumbnail: string;
  duration: string;
  channel: Channel;
  title: string;
  views: number;
  date: string;
}
