import Note from '../components/Note/Note';
import Link from 'next/link';
export default function Home({objects}) {
  return (
    <div className="container mx-auto ">
      <Link href="createNote">
      <a className="grid justify-items-center underline text-purple-600 font-semibold"> Create note</a>
      </Link>
      {objects.objects.map((object) => (
        <Note
        key={object.id}
        title={object?.title}
        thumbnail={object?.thumbnail}
        content={object.content}
        date={object?.created_at.slice(0,10)}
        id={object?.id}
        />
      ))}
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  const cosmicReadKey = process.env.cosmicReadKey;
    const cosmicBucketSlug = process.env.cosmicBucketSlug;
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://api.cosmicjs.com/v2/buckets/${cosmicBucketSlug}/objects?read_key=${cosmicReadKey}`)
  const objects = await res.json()
  console.log(objects)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      objects,
    },
  }
}