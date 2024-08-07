/**
 * 현재 시각을 'YYYY-MM-DDTHH:MM' 형식으로 포맷팅하여 리턴합니다.
 *
 * @returns {string} 포맷팅된 현재 시각 문자열
 */
export default function getFormattedCurrentDate(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}
