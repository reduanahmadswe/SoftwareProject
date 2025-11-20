# Frontend - Git & GitHub Workshop

Registration website frontend for the Git & GitHub Workshop.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client
- **Lucide React** - Icons

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
VITE_API_URL=http://localhost:4000
VITE_DISCORD_INVITE=https://discord.gg/your-invite
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Hero banner section
│   ├── RegistrationForm.tsx  # Main registration form
│   ├── GitHubVideoSection.tsx # GitHub tutorial video
│   └── Footer.tsx            # Footer with links
├── pages/
│   ├── Home.tsx              # Main page
│   └── ThankYou.tsx          # Success page
├── api/
│   └── client.ts             # API client setup
├── utils/
│   └── validation.ts         # Form validation schemas
├── App.tsx                   # Router setup
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## Features

### 1. Hero Section
- Eye-catching gradient background
- Animated elements
- Call-to-action button
- Feature highlights

### 2. GitHub Tutorial
- Embedded YouTube video
- Links to GitHub signup
- Documentation references

### 3. Registration Form
- Real-time validation
- Error messages
- Loading states
- Rate limiting protection

### 4. Thank You Page
- Success confirmation
- Discord join button
- Next steps guide
- Email confirmation notice

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Text Content

Edit component files directly:
- `src/components/Hero.tsx` - Hero section text
- `src/components/Footer.tsx` - Footer content
- `src/pages/ThankYou.tsx` - Success page content

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting
```

## Environment Variables for Production

```env
VITE_API_URL=https://your-backend-api.com
VITE_DISCORD_INVITE=https://discord.gg/your-invite
```

## Troubleshooting

### Issue: API calls fail
- Check `VITE_API_URL` in `.env`
- Verify backend is running
- Check CORS settings in backend

### Issue: Build fails
- Clear `node_modules` and reinstall
- Check for TypeScript errors
- Verify all dependencies are installed

### Issue: Styles not loading
- Run `npm install` again
- Check Tailwind CSS configuration
- Clear browser cache

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2.5s

## Accessibility

- ARIA labels on form elements
- Keyboard navigation support
- Screen reader friendly
- Focus visible styles

## License

MIT
