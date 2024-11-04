/** @type {import('tailwindcss').Config} */
import { keepTheme } from "keep-react/keepTheme"

const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "basic-gradient":
          "linear-gradient(to top, #121212 0, #1c222b 100%), var(--background-noise)",
        "afer-gradient":
          "linear-gradient(rgba(251, 140, 60, 0.4) 0, #161c27 100%), var(--background-noise)",
      },
      container: {
        screens: {
          sm: {
            min: "640px",
          },
          md: {
            min: "768px",
          },
          lg: {
            min: "1024px",
          },
          xl: {
            min: "1280px",
          },
          "2xl": {
            min: "1280px",
          },
        },
      },
      colors: {
        'afer-error': '#e41e1e',
        'afer-success': '#05b000',
        'afer': {
          '50': '#fff8ed',
          '100': '#feefd6',
          '200': '#fcdbac',
          '300': '#fac177',
          '400': '#f79b40',
          '500': '#f58220',
          '600': '#e66410',
          '700': '#bf4b0f',
          '800': '#973c15',
          '900': '#7a3314',
          '950': '#421808',
        },
        'afer-gray': {
          '50': '#fafafa',
          '100': '#f3f4f4',
          '200': '#e9eaeb',
          '300': '#d7dadb',
          '400': '#bdc1c3',
          '500': '#9da2a5',
          '600': '#8a8f93',
          '700': '#74797c',
          '800': '#616568',
          '900': '#4f5254',
          '950': '#333638',
        },
      },
      fontFamily: {
        openSans: '"Open Sans", sans-serif',
        dmSans: '"DM Sans", sans-serif',
        workSans: '"Work Sans", sans-serif',
      },
    },
  },
  plugins: [],
}

export default keepTheme(config)
