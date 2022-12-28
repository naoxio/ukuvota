interface Icon {
    name: string
    src: string
}
export function getAssets(globs: any[]) {
    const assets: Icon[] = []
    globs.forEach(glob => {
        console.log(glob.default.split('/').pop())
        assets.push({
            name: glob.default.split('/').pop().split('.').shift(),
            src: glob.default
        })
    })
    return assets
}