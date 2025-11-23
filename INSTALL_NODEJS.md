# Installing Node.js on Windows

Your system doesn't have Node.js installed yet. Follow these steps to install it:

## Option 1: Official Installer (Recommended)

1. **Download Node.js**
   - Visit: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Run the Installer**
   - Double-click the downloaded .msi file
   - Follow the installation wizard
   - Accept the license agreement
   - Keep default installation path: `C:\Program Files\nodejs\`
   - Make sure "Add to PATH" is checked
   - Click Install

3. **Verify Installation**
   - Open a NEW Command Prompt or PowerShell window
   - Run: `node --version`
   - Run: `npm --version`
   - Both should display version numbers

## Option 2: Using Chocolatey (Package Manager)

If you have Chocolatey installed:

```powershell
choco install nodejs-lts
```

## Option 3: Using Winget (Windows Package Manager)

If you have Windows 10/11 with winget:

```powershell
winget install OpenJS.NodeJS.LTS
```

## After Installation

1. **Close and reopen** your terminal/PowerShell
2. **Navigate to your project**:
   ```powershell
   cd C:\myshop
   ```

3. **Install project dependencies**:
   ```powershell
   npm install
   ```

4. **Start the development server**:
   ```powershell
   npm run dev
   ```

5. **Open your browser** to: http://localhost:3000

## Troubleshooting

### "npm is not recognized" after installation
- Close ALL terminal windows
- Open a NEW PowerShell/Command Prompt
- Try again

### Permission Issues
- Run PowerShell as Administrator
- Or use: `npm install --legacy-peer-deps`

### Slow Installation
- This is normal for first install (can take 5-10 minutes)
- npm is downloading all dependencies

## What Gets Installed

When you run `npm install`, these packages will be installed:
- Next.js 14 (React framework)
- React 18 (UI library)
- TypeScript (type safety)
- Tailwind CSS (styling)
- Supabase client (database)
- Zod (validation)
- React Hook Form (forms)
- Lucide React (icons)
- And more...

Total size: ~500MB in node_modules folder

## Next Steps

After Node.js is installed and `npm install` completes successfully:
1. Follow the steps in `SETUP.md` to configure environment variables
2. Set up your Supabase database using `DATABASE.md`
3. Run `npm run dev` to start developing!
