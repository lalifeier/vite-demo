export function random(m: number, n: number): number {
  return Math.floor(Math.random() * (m - n) + n)
}

export function getRandomFileName(): string {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '')
  const random = `${Math.random()}`.substring(2, 8)
  const random_number = timestamp + random
  return random_number
}
