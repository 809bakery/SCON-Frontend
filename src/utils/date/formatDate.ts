/**
 * 주어진 날짜 문자열을 'XXXX. XX. XX. (요일) OO:OO' 형식으로 포맷팅합니다.
 *
 * @param {string} dateString - 포맷팅할 날짜를 나타내는 문자열입니다.
 *                              이 문자열은 Date 객체로 변환 가능해야 합니다.
 * @returns {string} 포맷팅된 날짜와 시간을 나타내는 문자열을 반환합니다.
 */

export default function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ko-KR', options)
    .format(date)
    .replace(/\.\s?/, '. ')
    .replace(',', '')
    .trim()
}
