import { fetchNoteById } from '@/lib/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import QUERY_KEYS from '@/const/queryKeys';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.NOTE, id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
