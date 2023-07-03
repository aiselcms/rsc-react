import React from 'react';
import lightTheme from './style/light';
import darkTheme from './style/dark';

const Theme = ({ variant }) => (
    <style suppressHydrationWarning>{variant === 'dark' ? darkTheme : lightTheme}</style>
);

export default Theme;