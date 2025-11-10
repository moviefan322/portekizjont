export const pronouns = ['eu', 'você', 'ele', 'ela', 'nós', 'vocês', 'eles', 'elas']

export const randomPronoun = (): string => {
  const index = Math.floor(Math.random() * pronouns.length)
  return pronouns[index]
}
