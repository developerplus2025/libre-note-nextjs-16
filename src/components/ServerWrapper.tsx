// ServerWrapper.tsx (server component)
import ClientComponent from './ClientComponent';

export default async function ServerWrapper() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();

  return <ClientComponent data={data} />;
}
