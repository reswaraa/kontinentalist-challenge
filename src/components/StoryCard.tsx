import { Story } from '@/lib/types';
import Image from 'next/image';

type StoryCardProps = {
  story: Story;
};
export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-56 w-full rounded-lg overflow-hidden">
        <Image
          src={story.hero_image.url}
          alt={story.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
        <div
          className="text-white line-clamp-4"
          dangerouslySetInnerHTML={{ __html: story.dek }}
        />
      </div>
    </div>
  );
}
