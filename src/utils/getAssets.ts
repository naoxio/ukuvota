interface Icon {
    name: string
    src: string
}

export function getAssets(globs: any[]) {
    const assets: Icon[] = []
    globs.forEach(glob => {
        const path = glob.default.src;
        assets.push({
            name: path.split('/').pop().split('.').shift(),
            src: path
        });
    });
    return assets;
}
