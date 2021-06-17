import { useState } from 'react';
import {SaveIcon} from '@heroicons/react/solid';
import Link from 'next/link';

const CreateNote = ({title, content, date,}) => {

  const [state, setState] = useState(' ');
  const [note, setNote] = useState(' ');

  const onSubmit = () =>{
    const cosmicWriteKey = process.env.cosmicWriteKey;
    const cosmicBucketSlug = process.env.cosmicBucketSlug;
    const data = { 
      title: state,
      content: note,
      type: "notes",
    };
  

  fetch(`https://api.cosmicjs.com/v2/buckets/${cosmicBucketSlug}/objects`, {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${cosmicWriteKey}`
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

}
  
  return (
    <>
    <Link href="/">
    <a className="grid justify-items-center underline text-purple-600 font-semibold"> Go back</a>
    </Link>
  <form className="grid my-6 place-self-center h-80 border-green-400 border-2 border-opacity-25 rounded-md bg-green-300 max-w-sm mx-auto">
     <input type="file" />
    <SaveIcon  onClick={()=> onSubmit()} className="h-8 w-8 text-blue-500 grid place-self-end"/>

      <label className="font-medium">Title</label>     
        <textarea 
        className="border-dotted border-2 border-light-blue-500 my-1 bg-green-200 h-6"
        defaultValue={title} 
        onChange={(event)=>setState(event.target.value)}>
        </textarea>

      <label className="font-medium">Text</label>     
        <textarea 
        className="border-dotted border-2 border-light-blue-500 my-1 bg-green-200"
        defaultValue={content} 
        onChange={(event)=>setNote(event.target.value)}>
        </textarea>
        <span className="text-purple-600 ">Created: {date}</span>
    </form>
    </>
  )
}

export default CreateNote;