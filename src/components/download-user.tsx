"use client";
import React, { useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
function DownloadUser() {
  const pathname = usePathname();
  useEffect(() => {
    // Chờ 5 giây sau khi trang tải xong và thực hiện tải file
    const timer = setTimeout(() => {
      // URL của file cần tải
      const fileUrl =
        "/downloads/libre_desktop_version_11.9.4_free_windows.exe";
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute(
        "download",
        "libre_desktop_version_11.9.4_free_windows.exe",
      ); // Tên file sẽ tải xuống
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);

    return () => clearTimeout(timer); // Dọn dẹp timer nếu component bị unmount
  }, [pathname]);
}

export default DownloadUser;

