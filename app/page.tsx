"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import comicFilenames from '@/lib/comicFilenames.json'; // Import the generated JSON

// Generate initial comic data using the imported filenames
const initialComics = comicFilenames.map((filename, i) => ({
  id: i + 1,
  src: `/comics/${filename}`, // Construct the correct URL
  alt: filename.split("_generate_")[0].replace(/-/g, " ").replace(/_/g, " ") || `Comic ${i + 1}`, // Basic alt text from filename
}))

export default function Home() {
  const [comics, setComics] = useState(initialComics)
  const [selectedComic, setSelectedComic] = useState<number | null>(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedComic === null) return

      if (e.key === "Escape") {
        setSelectedComic(null)
      } else if (e.key === "ArrowRight") {
        setSelectedComic((prev) => (prev !== null && prev < comics.length - 1 ? prev + 1 : prev))
      } else if (e.key === "ArrowLeft") {
        setSelectedComic((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedComic, comics.length])

  const shuffleComics = () => {
    // Fisher-Yates shuffle algorithm
    const shuffled = [...comics]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    setComics(shuffled)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">MK Comix</h1>
          <p className="text-gray-600 mb-4">A synthetic sense of humor—MK&apos;s AI-born comic experiments.</p>
          <Button onClick={shuffleComics} className="bg-purple-600 hover:bg-purple-700 text-white">
            <Shuffle className="h-4 w-4 mr-2" />
            Randomize
          </Button>
        </header>

        {/* Comic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {comics.map((comic, index) => (
            <div
              key={comic.id}
              className="aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer bg-white"
              onClick={() => setSelectedComic(index)}
            >
              <Image
                src={comic.src || "/placeholder.svg"}
                alt={comic.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedComic !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full"
                onClick={() => setSelectedComic(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                <Image
                  src={comics[selectedComic].src || "/placeholder.svg"}
                  alt={comics[selectedComic].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full ml-2"
                  onClick={() => setSelectedComic((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
                  disabled={selectedComic === 0}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full mr-2"
                  onClick={() =>
                    setSelectedComic((prev) => (prev !== null && prev < comics.length - 1 ? prev + 1 : prev))
                  }
                  disabled={selectedComic === comics.length - 1}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                {selectedComic + 1} / {comics.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
