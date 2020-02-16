import React from 'react'
import Sun from '../icon/Sun'
import Moon from '../icon/Moon'
import { ThemeContext } from '../provider/ThemeProvider'
import { THEMES } from '../../utils/constants'

const ThemeToggler = () => (
    <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
            <button className="theme-toggle-button" onClick={toggleTheme}>
                {theme === THEMES.DARK ? <Sun /> : <Moon />}
            </button>
        )}
    </ThemeContext.Consumer>
)

export default ThemeToggler