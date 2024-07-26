import {
  DUMMY_COMMENT_DATA,
  SCON_COMMENT_DATA,
} from '@/constants/stage/comment/index.ts'
import StageDetailCommentCard from '@/features/stage/detail/components/card/comment/index.tsx'
import StageCommentInputCard from '@/features/stage/detail/components/card/comment/input/index.tsx'
import StageDetailCard from '@/features/stage/detail/components/card/index.tsx'
import DummyOvenProfile from '@/static/img/dummy/stage/dummy-oven-profile6.jpg'

function StageTabComment() {
  return (
    <div className="w-full px-7 py-5 flex flex-col gap-y-5">
      <StageDetailCard title="@주의사항" content={SCON_COMMENT_DATA.caution} />
      <StageCommentInputCard
        user={{
          nickname: '르르땅 fan',
          profile: DummyOvenProfile,
        }}
      />
      {DUMMY_COMMENT_DATA.content.map((comment) => (
        <StageDetailCommentCard
          key={comment.eventBoardId}
          comment={comment.content}
          createdAt={comment.createdAt}
          liked={comment.liked}
          user={{
            nickname: comment.nickname,
            profile: comment.profile,
            isWrite: comment.isWrite,
          }}
        />
      ))}
    </div>
  )
}

export default StageTabComment
