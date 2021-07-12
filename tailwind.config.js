module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.htm'],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
        },
    },
    plugins: [
        require('@headlessui/react'),
        require('@tailwindcss/forms'),
    ],
}
