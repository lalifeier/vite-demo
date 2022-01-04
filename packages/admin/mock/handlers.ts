const modules = import.meta.globEager('./modules/*.ts')

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  mockModules.push(...modules[key].default)
})

export const handlers = mockModules
