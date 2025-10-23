/**
 * 초 단위 시간을 MM:SS 형식의 문자열로 변환합니다.
 *
 * @param {number} sec - 변환할 초 단위 시간
 * @returns {string} MM:SS 형식의 시간 문자열 (예: "03:45", "12:08")
 * @example
 * toMMSS(185) // "03:05"
 * toMMSS(65)  // "01:05"
 * toMMSS(5)   // "00:05"
 */
export const toMMSS = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const toHHMM = (isoString: string): string => {
  const date = new Date(isoString);

  const localDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  let hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // 0시는 12시로 표시

  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${paddedMinutes} ${ampm}`;
};
