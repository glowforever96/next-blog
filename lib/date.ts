import { differenceInDays, format, isToday, isYesterday } from "date-fns";
import { ko } from "date-fns/locale";

export function formatRelativeDate(date: string): string {
  const targetDate = new Date(date);
  const now = new Date();

  if (isToday(targetDate)) {
    return "오늘";
  }

  if (isYesterday(targetDate)) {
    return "1일 전";
  }

  const daysDifference = differenceInDays(now, targetDate);

  if (daysDifference > 0 && daysDifference <= 30) {
    return `${daysDifference}일 전`;
  }

  return format(targetDate, "yyyy년 MM월 dd일", { locale: ko });
}
