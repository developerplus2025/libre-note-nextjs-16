export default function TocHeading() {
    return (
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-[#a1a1a1]">On this page</p>
        <div className="flex flex-col gap-2">
          <span className="text-[#a1a1a1]">Installation Steps</span>
          <span className="text-[#a1a1a1]"> Post-Installation Checklist</span>
          <span className="text-[#a1a1a1]">
            Troubleshooting Installation Issues
          </span>
          <span className="text-[#a1a1a1]">Next Steps</span>
        </div>
      </div>
    );
}