// 이메일 정규표현식
export const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 비밀번호 정규표현식(8자 이상, 영문, 숫자, 특수문자 허용)
export const passwordRegExp =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/

// 닉네임 정규표현식(2~8자 한글, 영문, 숫자만 허용)
export const nicknameRegExp = /^[a-zA-Z0-9가-힣]{2,8}$/
