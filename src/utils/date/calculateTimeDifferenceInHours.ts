/**
 * 두 날짜 사이의 시간 차이를 시간 단위로 계산합니다.
 *
 * @param {Date} date1 - 첫 번째 날짜입니다.
 * @param {Date} date2 - 두 번째 날짜입니다.
 * @returns {number} 두 날짜 사이의 시간 차이를 시간 단위로 반환합니다.
 */
export default function calculateTimeDifferenceInHours(
  date1: Date,
  date2: Date,
): number {
  return (date1.getTime() - date2.getTime()) / 1000 / 60 / 60
}
