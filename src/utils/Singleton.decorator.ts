// eslint-disable-next-line @typescript-eslint/naming-convention
export function Singleton<T>(): any {
  let instance: any
  return (targetClass: any, targetMethodKey: string, descriptor: PropertyDescriptor) => ({
    ...descriptor,
    value: () => {
      if (!instance) {
        instance = descriptor.value()
      }
      return instance
    }
  })
}
