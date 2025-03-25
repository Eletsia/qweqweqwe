import { useQuery } from '@tanstack/react-query';
import { getReviewsByItemId } from '@/api/reviewsApi';
import { Review } from '@/types/reviewType';

interface ReviewListProps {
  itemId: number;
}

export const ReviewList = ({ itemId }: ReviewListProps) => {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery<Review[]>({
    queryKey: ['reviews', itemId],
    queryFn: () => getReviewsByItemId(itemId),
    enabled: !!itemId,
  });

  if (isLoading) return <p>리뷰 불러오는 중...</p>;
  if (isError) return <p>에러: {(error as Error).message}</p>;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold">리뷰</h2>
      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">아직 작성된 리뷰가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.review_id} className="rounded border p-4 shadow-sm">
              <p className="text-sm text-gray-800">{review.content}</p>
              <p className="mt-2 text-right text-xs text-gray-400">
                작성일: {new Date(review.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
