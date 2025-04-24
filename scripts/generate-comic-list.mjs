import fs from 'fs';
import path from 'path';

const comicsDirectory = path.join(process.cwd(), 'public/comics');
const outputFile = path.join(process.cwd(), 'lib/comicFilenames.json');
const outputDir = path.dirname(outputFile);

try {
  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filenames = fs.readdirSync(comicsDirectory);
  // Filter for common image file extensions (adjust if needed)
  const imageFilenames = filenames.filter(file =>
    /\.(png|jpe?g|gif|webp)$/i.test(file)
  );

  fs.writeFileSync(outputFile, JSON.stringify(imageFilenames, null, 2));
  console.log(`Successfully generated ${outputFile} with ${imageFilenames.length} comics.`);

} catch (error) {
  console.error('Error generating comic list:', error);
  // Create an empty file if reading fails, so the import doesn't break
  if (!fs.existsSync(outputFile)) {
     if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
     }
    fs.writeFileSync(outputFile, '[]');
    console.log(`Created empty ${outputFile} due to error.`);
  }
} 