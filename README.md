# React Post Office

A small React web app for looking up Indian post offices by PIN code. Enter a six-digit PIN code to retrieve matching post office details, then filter the results by office name.

**Live demo:** [react-post-office-r67y.vercel.app](https://react-post-office-r67y.vercel.app)

## Features

- Look up post offices by a six-digit PIN code.
- View each result's name, branch type, delivery status, district, and division.
- Filter returned post offices by name as you type.
- Show loading and error states for lookups.
- Responsive results layout for desktop and mobile.

## Built with

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/)
- CSS
- [India Post PIN Code API](https://api.postalpincode.in/)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)

### Install and run

```bash
git clone https://github.com/ranjith1807/react-post-office.git
cd react-post-office
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal (usually `http://localhost:5173`). Enter a six-digit PIN code and select **Lookup**. When results appear, use the filter field to narrow the list by post office name.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

## API and availability

The app requests PIN code data from `https://api.postalpincode.in/pincode/<PINCODE>`. Lookups require an internet connection and depend on the availability of this public API. The service may return an error or no post offices for a PIN code.

## Production build

```bash
npm run build
npm run preview
```

The generated static site is in `dist/` and can be deployed to a static hosting provider such as Vercel.
