import { JSX } from "react";

export interface AgendaItem {
  id: string;
  icon: JSX.Element;
  title: string;
  desc: string;
  time: string;
  startTime: string;
  endTime: string;
  location: string;
  color: string;
  iconBg: string;
  iconColor: string;
  date: string;
  category: string;
}