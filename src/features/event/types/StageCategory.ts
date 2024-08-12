// StageCategory 설명:
// all: 전체
// performance: 공연
// lecture: 강연
// club: 소모임
// etc: 기타

export enum StageCategory {
  all = 'all',
  performance = 'performance',
  lecture = 'lecture',
  club = 'club',
  etc = 'etc',
}

export const StageCategoryMap: { [key in StageCategory]: string } = {
  all: '전체',
  performance: '공연',
  lecture: '강연',
  club: '소모임',
  etc: '기타',
}
