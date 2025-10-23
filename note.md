<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-sm  ">
            <Guitar className="w-4 h-4 text-[#a1a1a1]" />
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#a1a1a1] -translate-x-1/2  rounded-sm  ">
            <ListMusic className="w-4 h-4" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#a1a1a1] translate-y-1/2 rounded-sm  ">
            <Library className="w-4 h-4" />
          </div>
          <div className="absolute rounded-sm right-0 top-1/2 translate-x-1/2 text-[#a1a1a1] -translate-y-1/2  ">
            <Podcast className="w-8 h-8" />

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html
lang="en"
className={`${GeistSans.className} dark_black`}
style={{ colorScheme: "dark" }} >
<body className="dark:scheme-dark overflow-x-hidden relative">
<ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
{children}
</ThemeProvider>
</body>
</html>
);
}
