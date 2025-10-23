import React from 'react'

export default function DashBoardPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center rounded-xl p-[2rem]">
      <iframe
        className="h-full w-full rounded-xl"
        src="https://docs.google.com/spreadsheets/d/1bsilw8KCHnso8Eu1zvk9_tUFTvXpkgpE5FWUnSGaYmw/edit?gid=0#gid=0"
      ></iframe>
    </div>
  );
}
