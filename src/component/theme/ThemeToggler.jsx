import React, { useContext } from 'react'
import Sun from '../icon/Sun'
import Moon from '../icon/Moon'
import { ThemeContext } from '../provider/ThemeProvider'
import { THEMES } from '../../utils/constants'

const ThemeToggler = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    
    return (
        <button className="theme-toggle-button" onClick={toggleTheme}>
            {theme === THEMES.DARK ? <Sun /> : <Moon />}
        </button>
    )
}

export default ThemeToggler