interface WeightingOptions {
    value: string
    label: string
  }
const options: WeightingOptions[] = []
  
  for (let i = 1; i <= 6; i++) {
    options.push({
      value: String(i),
      label: `x${i}`,
    })
  }

  options.push({
    value: '-1',
    label: '',
  })

export default options