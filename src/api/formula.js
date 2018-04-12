export const Impression = (followerCount, repostCount) => {
  return +(followerCount + Math.pow(Math.max(Math.log10(followerCount / 30000 + 1), 1), 2) * repostCount * 360).toFixed(0)
}
