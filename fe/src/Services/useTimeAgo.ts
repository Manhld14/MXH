// src/composables/useTimeAgo.ts
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

export function useTimeAgo() {
  function timeAgo(date: string | Date) {
    return dayjs(date).fromNow();
  }

  return { timeAgo };
}
