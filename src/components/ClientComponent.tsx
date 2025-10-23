'use client';

interface Props {
  data: {
    id: number;
    title: string;
    body: string;
  };
}
export default function ClientComponent({ data }: Props) {
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
