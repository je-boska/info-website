import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Release } from '../types/shared';

export default function ReleaseNav({
  current,
  next,
  prev,
  first,
  last,
}: {
  current: Release;
  next: Release;
  prev: Release;
  first: Release;
  last: Release;
}) {
  const router = useRouter();

  const nextPath = `/releases/${prev ? prev.slug : last.slug}`;
  const prevPath = `/releases/${next ? next.slug : first.slug}`;

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.isComposing || e.keyCode === 39) {
        router.push(nextPath);
      }
      if (e.isComposing || e.keyCode === 37) {
        router.push(prevPath);
      }
    });

    return () => {
      document.removeEventListener('keydown', (e) => {
        if (e.isComposing || e.keyCode === 39) {
          router.push(nextPath);
        }
        if (e.isComposing || e.keyCode === 37) {
          router.push(prevPath);
        }
      });
    };
  });

  return (
    <div className='text-lg md:text-xl lg:text-2xl flex'>
      <Link href={prevPath}>←</Link>
      <p className='px-2'>{current.catalogNumber}</p>
      <Link href={nextPath}>→</Link>
    </div>
  );
}
