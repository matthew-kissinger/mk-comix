import fs from "fs"
import path from "path"

// This function would be used in a getStaticProps context
// but since we're using a static export, we'll use client-side loading instead
export function getComics() {
  const comicsDirectory = path.join(process.cwd(), "public/comics")

  // Check if directory exists
  if (!fs.existsSync(comicsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(comicsDirectory)

  const comics = filenames
    .filter((filename) => {
      const ext = path.extname(filename).toLowerCase()
      return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)
    })
    .map((filename, index) => {
      return {
        id: index + 1,
        src: `/comics/${filename}`,
        alt: `Comic ${index + 1}`,
      }
    })

  return comics
}
