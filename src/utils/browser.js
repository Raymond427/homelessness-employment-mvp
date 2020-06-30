export const isIOS = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test( userAgent )
}

export const isInStandaloneMode = () => window.navigator.standalone
  