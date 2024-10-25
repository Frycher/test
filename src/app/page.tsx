'use client';

import { ROUTES } from '@/constants/routes';
import { usePosts } from '@/hooks/use-posts';
import { Post } from '@/types/post';
import { Button, Card, CardBody, CardFooter, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const { data, error, isLoading } = usePosts();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = (post: Post) => {
    setSelectedPost(post);
    onOpen();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className="gap-4 grid grid-cols sm:grid-cols-2 md:grid-cols-3">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{selectedPost?.title}</ModalHeader>
          <ModalBody>
            <p>{selectedPost?.body}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
      {data.map((post) => (
        <Card shadow="sm" key={post.id} className="p-4">
          <CardBody className="font-bold text-lg pb-0">
            <Link href={`${ROUTES.POST}/${post.id}`}>{post.title}</Link>
          </CardBody>
          <CardFooter className="text-small justify-between">{post.body.slice(0, 70)}...</CardFooter>
          <Button onPress={() => handleOpen(post)}>Open Modal</Button>
        </Card>
      ))}
    </div>
  );
}
