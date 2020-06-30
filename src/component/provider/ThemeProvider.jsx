import React, { useState, useEffect, createContext } from 'react'
import { THEMES } from '../../utils/constants'
// import { analytics } from '../../firebase'

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const defaultTheme = THEMES.LIGHT
    const oppositeTheme = theme => theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK

    const preferredTheme = window.matchMedia(`(prefers-color-scheme: ${defaultTheme})`).matches ? defaultTheme : oppositeTheme(defaultTheme)
    const dataTheme = document.documentElement.getAttribute('data-theme')
    const currentTheme = (dataTheme === THEMES.DARK || dataTheme === THEMES.LIGHT) ? dataTheme : preferredTheme

    const [ theme, setTheme ] = useState(currentTheme || preferredTheme)

    const changeTheme = theme => {
        document.documentElement.setAttribute('data-theme', theme)
        setTheme(theme)
        // analytics.logEvent('toggle_theme', { theme })
    }

    const toggleTheme = () => {
        document.documentElement.classList.add('theme-transition')
        changeTheme(oppositeTheme(theme))
        window.setTimeout(() => document.documentElement.classList.remove('theme-transition'), 200)
    }

    useEffect(() => changeTheme(theme), [])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider