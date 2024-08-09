type CategoryObjType = {
  [key: string]: string
}

export const DAY_MAP = ['일', '월', '화', '수', '목', '금', '토']
export const CATEGORY_MAP = ['PERFORMANCE', 'LECTURE', 'CLUB', 'ETC']
export const CATEGORY_OBJ_MAP: CategoryObjType = {
  PERFORMANCE: '공연',
  LECTURE: '강연',
  CLUB: '소모임',
  ETC: '기타',
}
