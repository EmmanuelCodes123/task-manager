
const generatedNumbers = new Set();

export default function UseGeneratedId(min = 2, max = 999999) {
  if (generatedNumbers.size >= max - min + 1) {
    throw new Error("All possible unique numbers have been generated.");
  }

  let rand;
  do {
    rand = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (generatedNumbers.has(rand));

  generatedNumbers.add(rand);

  return rand;
}
