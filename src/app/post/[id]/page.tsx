'use client';

import { usePost } from '@/hooks/use-post';
import { Button, Card, CardBody, CardFooter } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function PostPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const { data, error, isLoading } = usePost(+id);
  const router = useRouter();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Button color="primary" onClick={() => router.back()} className="mb-2">
        Back
      </Button>
      <div>
        <h1 className="text-4xl font-bold mb-4">Post #{id}</h1>
      </div>
      <Card shadow="sm" className="p-4">
        <CardBody className="font-bold text-2xl pb-0">{data?.title}</CardBody>
        <CardFooter className="text-small justify-between">{data?.body}</CardFooter>
      </Card>
    </>
  );
}
